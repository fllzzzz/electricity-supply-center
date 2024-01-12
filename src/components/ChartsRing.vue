<style lang="scss" scoped>
	.charts-ring {
		width: 100%;
		height: 100%;
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

	import debdounce from '@/utils/debounce';
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
		onMounted,
		onUnmounted
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
		}[]],
	}>();

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		}
	});
	
	let observer :ResizeObserver;
	let decorateData :(string | number)[][];
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
				source: decorateData
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

		if (!config.value?.data) return;

		const hundredth = (config.value?.data?.map(
			row => row.slice(1)
		) as number[][]).reduce(
			(a, b) => [a[0] + b[0]]
		)[0] / 100;

		emits('percent', config.value.data.map(row => {
			return {
				name: row[0] as string,
				percent: (row[1] as number) / hundredth
			};
		}))

		decorateData = config.value.data.map(
			(row, i) => [row, [`cover${i}`, hundredth]]
		).reduce((a, b) => a.concat(b));

		builder();
	});

	onMounted(() => {
		element.value && (el => {
			observer = new ResizeObserver(debdounce<
				((
					entryList: ResizeObserverEntry[],
					observer: ResizeObserver
				) => void)
			>((entryList, observer) => {
				for (const entry of entryList) {
					const { inlineSize: w, blockSize: h } = entry.borderBoxSize[0];

					if (w === 0 && h === 0) {
						observer.unobserve(entry.target);
						return;
					}

					const el = entry.target as HTMLElement;
					el.style.fontSize = `${el.clientWidth / 100}px`;
				}
			}, 20))

			el.style.fontSize = `${el.clientWidth / 100}px`;
			observer.observe(el);
		})(element.value)
	});

	onUnmounted(() => {
		observer.disconnect();
	});
</script>