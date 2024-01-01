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
		AxisOptions,
		SerieOptions
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

	export type Config = {
		designWidth :number;
		data? :number[][];
		xAxis? :AxisOptions;
		yAxis? :AxisOptions;
		series? :SerieOptions;
	};

	type ECOption = ComposeOption<
		| LineSeriesOption
		| GridComponentOption
		| DatasetComponentOption
	>;

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		}
	});
	
	const options = ref<ECOption>({});
	const config = ref<Config | undefined>();
	const chartsSrv = new ChartsService({
		designWidth: props.config.designWidth
	});

	const builder = () => {	
		options.value = {
			dataset: {
				sourceHeader: false,
				source: config.value?.data
			},
			grid: {
				containLabel: true,
				top: chartsSrv.sizeConverter(80),
				right: chartsSrv.sizeConverter(15),
				bottom: chartsSrv.sizeConverter(1),
				left: chartsSrv.sizeConverter(10),
			},
			xAxis: {
				scale: true,
				axisLabel: {
					formatter: config.value?.xAxis?.formatter,
					color: config.value?.xAxis?.fontOptions?.color,
					fontFamily: config.value?.xAxis?.fontOptions?.family,
					fontSize: chartsSrv.sizeConverter(config.value?.xAxis?.fontOptions?.size),
					margin: chartsSrv.sizeConverter(config.value?.xAxis?.offset),
				},
				axisLine: {show: false},
				axisTick: {show: false},
				splitLine: {show: false},
			},
			yAxis: {
				name: config.value?.yAxis?.name,
				nameTextStyle: {
					color: config.value?.yAxis?.nameOptions?.fontOptions?.color,
					fontFamily: config.value?.yAxis?.nameOptions?.fontOptions?.family,
					fontSize: chartsSrv.sizeConverter(config.value?.yAxis?.nameOptions?.fontOptions?.size),
				},
				axisLabel: {
					formatter: config.value?.yAxis?.formatter,
					color: config.value?.yAxis?.fontOptions?.color,
					fontFamily: config.value?.yAxis?.fontOptions?.family,
					fontSize: chartsSrv.sizeConverter(config.value?.yAxis?.fontOptions?.size),
					margin: chartsSrv.sizeConverter(config.value?.yAxis?.offset),
				},
				axisLine: {show: false},
				axisTick: {show: false},
				splitLine: {
					lineStyle: {
						type: [
							chartsSrv.sizeConverter(10)!,
							chartsSrv.sizeConverter(10)!
						],
						dashOffset: chartsSrv.sizeConverter(5),
						color: 'rgba(204, 204, 204, 0.4)'
					}
				}
			},
			series: {
				type:'line',
				encode: {
					x: 0,
					y: 1
				},
				symbol: 'circle',
				symbolSize: chartsSrv.sizeConverter(config.value?.series?.symbolOptions?.size),
				itemStyle: {
					color: config.value?.series?.symbolOptions?.color,
					borderWidth: chartsSrv.sizeConverter(config.value?.series?.symbolOptions?.borderWidth),
					borderColor: config.value?.series?.symbolOptions?.borderColor
				},
				lineStyle: {
					color: config.value?.series?.stroke,
					width: chartsSrv.sizeConverter(config.value?.series?.lineOptions?.width)
				},
				areaStyle: {
					opacity: 0.3,
					color:  config.value?.series?.fill
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

	watchEffect(() => {
		config.value = props.config;

		builder();
	});
</script>