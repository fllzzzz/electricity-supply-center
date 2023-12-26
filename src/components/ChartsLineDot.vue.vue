<style lang="scss" scoped>
	@font-face {
		font-family: 'D-DIN';
		src: url('@fonts/DIN-Regular.otf');
	}
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
		Color
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
		fill :Color;
		stroke :Color;
		dataList :number[][];
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
				stroke: 'rgba(240, 255, 0, 1)',
				fill: {
					type: 'linear',
					x: 0, y: 0, x2: 0, y2: 1,
					colorStops: [
						{
							offset: 0,
							color: 'rgba(240, 255, 0, 1)'
						},
						{
							offset: 1,
							color: 'rgba(255, 255, 255, 0)'
						}
					]
				},
				dataList: [
					[1, 150],
					[2, 230],
					[3, 224],
					[4, 500],
					[5, 166],
					[6, 150],
					[7, 230],
					[8, 224],
					[9, 500],
					[10, 166],
					[11, 150],
					[12, 230],
					[13, 224],
					[14, 500],
					[15, 166],
					[16, 150],
					[17, 230],
					[18, 224],
					[19, 500],
					[20, 166],
				],
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
			grid: {
				containLabel: true,
				top: chartsSrv.sizeConverter(80),
				right: chartsSrv.sizeConverter(15),
				bottom: 0,
				left: chartsSrv.sizeConverter(10),
			},
			xAxis: {
				scale: true,
				axisLabel: {
					color: '#E3E3E3',
					fontFamily: 'D-DIN',
					fontSize: chartsSrv.sizeConverter(24),
					margin: chartsSrv.sizeConverter(31),
				},
				axisLine: {show: false},
				axisTick: {show: false},
				splitLine: {show: false},
			},
			yAxis: {
				name: '单位：kW·h',
				nameTextStyle: {
					color: '#FFFFFF',
					fontFamily: 'Adobe Heiti Std',
					fontSize: chartsSrv.sizeConverter(24),
					padding: chartsSrv.sizeConverter(22),
				},
				axisLabel: {
					color: '#E3E3E3',
					fontFamily: 'D-DIN',
					fontSize: chartsSrv.sizeConverter(24),
					margin: chartsSrv.sizeConverter(15),
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
				symbolSize: chartsSrv.sizeConverter(10),
				itemStyle: {
					color: '#ffff',
					borderWidth: chartsSrv.sizeConverter(2.5),
					borderColor: props.config.stroke
				},
				lineStyle: {
					color: props.config.stroke,
					width: chartsSrv.sizeConverter(5)
				},
				areaStyle: {
					opacity: 0.3,
					color: props.config.fill
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