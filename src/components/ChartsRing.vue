<style lang="scss" scoped>
	.charts-ring {
		width: 100%;
		height: 100%;
		position: relative;
		background-size: 100% 100%;
		background-image: url('@images/ring-bkg.png');
		position: relative;

		&__main,
		&__content {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}

		&__main {
			width: 75.60135em;
			height: 75.60135em;
		}

		&__content {
			max-width: 27em;
			max-height: 27em;
			overflow: hidden;
		}
	}
</style>

<template>
	<div class="charts-ring" ref="element">
		<div class="charts-ring__main">
			<Echarts
				:config="{
					chartsOptions: options,
					chartsUseList: useList,
				}"
				@rezise="builder()"
			></Echarts>
		</div>
		<div class="charts-ring__content">
			<slot></slot>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type {
		ChartsOptions
	} from '@/types';

	import type {
		ComposeOption
	} from 'echarts/core';

	import type {
		DatasetComponentOption,
	} from 'echarts/components';

	import type {
		PieSeriesOption
	} from 'echarts/charts';

	import type {
		PropType
	} from 'vue';

	import ChartsService from '@/services/ChartsService';
	import Echarts from '@/components/Echarts.vue';

	import {
		SVGRenderer
	} from 'echarts/renderers';	

	import {
		DatasetComponent,
	} from 'echarts/components';

	import {
		PieChart,
	} from 'echarts/charts';

	import {
		ref,
		watchEffect,
		onMounted
	} from 'vue';

	export type Config = ChartsOptions<(string | number)[][]>

	type ECOption = ComposeOption<
		| DatasetComponentOption
		| PieSeriesOption
	>;

	const emits = defineEmits<{
		percent: [percents :{
			name :string;
			percent :number;
		}],
	}>();

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		}
	});
	
	const element = ref<HTMLElement | undefined>();
	const options = ref<ECOption>({});
	const config = ref<Config | undefined>();
	const chartsSrv = new ChartsService({
		designWidth: props.config.designWidth
	});
	const useList = [
		DatasetComponent,
		PieChart,
		SVGRenderer
	];

	const builder = () => {	
		options.value = {
			dataset: {
				sourceHeader: false,
				source: config.value?.data
			},
			series: {
				type: 'pie',
				radius: ['78%', '93%'],
				encode: {value: 1},
				label: {show: false},
				startAngle: -90,
				itemStyle: {
					borderWidth: chartsSrv.sizeConverter(5),
					borderColor: config.value?.series?.stroke,
					color: params => {
						emits('percent', {
							name: (params.data as [string, unknown])[0],
							percent: params.percent
						});
						
						return props.config.colorMap?.get(
							(params.data as [string, unknown])[0]
						) ?? 'rgba(0, 0, 0, 0)';
					}
				}
			}
		}
	};

	watchEffect(() => {
		config.value = props.config;

		builder();
	});

	onMounted(() => {
		element.value && (el => {
			el.style.fontSize = `${el.clientWidth / 100}px`;
		})(element.value)
	});
</script>