<style lang="scss" scoped>

</style>

<template>
	<Echarts
		:config="{
			chartsOptions: options,
			chartsUseList: useList,
		}"
		@rezise="builder()"
	></Echarts>
</template>

<script setup lang="ts">
	import type {
		Color,
		FontsOptions,
		DirectExtract
	} from '@/types';

	import type {
		ComposeOption
	} from 'echarts/core';

	import type {
		GridComponentOption,
		DatasetComponentOption
	} from 'echarts/components';

	import type {
		LineSeriesOption
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
		GridComponent,
		DatasetComponent
	} from 'echarts/components';

	import {
		LineChart
	} from 'echarts/charts';

	import {
		ref,
		watchEffect
	} from 'vue';

	type Config = {
		designWidth :number;
		dataList :number[][];
		fill? :Color;
		stroke? :Color;
		xAxis? :AxisOptions;
		yAxis? :AxisOptions;
	};

	type AxisOptions = {
		fontsOptions? :FontsOptions,
		offset? :number;
		name? :Omit<AxisOptions, 'name'>
	};

	type ECOption = ComposeOption<
		| LineSeriesOption
		| GridComponentOption
		| DatasetComponentOption
	>;

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			default: () :Config => ({
				designWidth: 3840,
				dataList: [],
				fill: '',
				stroke: '',
				xAxis: {},
				yAxis: {},
			}),
		}
	});

	const options = ref<ECOption>({});
	const chartsSrv = new ChartsService({
		designWidth: props.config.designWidth
	});

	const builder = () => {		
		options.value = {
			dataset: {
				sourceHeader: false,
				source: props.config.dataList
			},
			grid: {},
			xAxis: {
				axisTick: {show: false},
				axisLine: {show: false},
				splitLine: {show: false},
				axisLabel: (() => {
					const _config :DirectExtract<
						Exclude<
							DirectExtract<ECOption, 'xAxis'>,
							unknown[]
						>, 'axisLabel'
					> = {};
					Object.assign(
						_config,
						chartsSrv.optionsCreater([
							[
								'margin', 
								props.config.xAxis?.offset,
								value => {
									return chartsSrv.sizeConverter(
										value as number
									)
								}
							]
						])
					);

					return _config;
				})()
			},
			yAxis: {
				axisTick: {show: false},
				axisLine: {show: false},
				splitLine: {
					lineStyle: {
						color: 'rgba(204, 204, 204, 0.4)',
						type: [5, 5],
						dashOffset: 5
					}
				}
			},
			series: {
				type: 'line',
				encode: {
					x: 0,
					y: 1
				}
			}
		};
	};

	const useList = [
		LineChart,
		GridComponent,
		DatasetComponent,
		SVGRenderer
	];

	watchEffect(builder);
</script>