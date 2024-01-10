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
		ChartsOptions
	} from '@/types';

	import type {
		ComposeOption
	} from 'echarts/core';

	import type {
		GridComponentOption,
		DatasetComponentOption,
		TooltipComponentOption,
		LegendComponentOption
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
		DatasetComponent,
		TooltipComponent,
		LegendComponent
	} from 'echarts/components';

	import {
		LineChart,
	} from 'echarts/charts';

	import {
		ref,
		watchEffect
	} from 'vue';

	export type Config = ChartsOptions<(string | number)[][]>

	type ECOption = ComposeOption<
		| GridComponentOption
		| DatasetComponentOption
		| TooltipComponentOption
		| LegendComponentOption
		| LineSeriesOption
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
	const useList = [
		LineChart,
		GridComponent,
		DatasetComponent,
		TooltipComponent,
		LegendComponent,
		SVGRenderer
	];

	const builder = () => {	
		options.value = {
			dataset: {
				sourceHeader: false,
				source: config.value?.data
			},
			legend: {
				align:"right",
				icon: 'rect',
				textStyle: {
					fontSize: chartsSrv.sizeConverter(
						config.value?.legendOptions?.fontOptions?.size
					),
					fontFamily: config.value?.legendOptions?.fontOptions?.family,
					color: config.value?.legendOptions?.fontOptions?.color
				},
				itemHeight: chartsSrv.sizeConverter(2),
				itemGap: chartsSrv.sizeConverter(
					config.value?.legendOptions?.gap
				),
				data: props.config.legendOptions?.data?.map(data => {
					return {
						name: data.name,
						width: 5,
						itemStyle: {
							color: data.color,
						},
						lineStyle: {
							width: 10
						}
					}
				}),
				top: chartsSrv.sizeConverter(
					config.value?.legendOptions?.grid?.top
				),
				right: chartsSrv.sizeConverter(
					config.value?.legendOptions?.grid?.right
				),
				bottom: chartsSrv.sizeConverter(
					config.value?.legendOptions?.grid?.bottom
				),
				left: chartsSrv.sizeConverter(
					config.value?.legendOptions?.grid?.left
				),
			},
			tooltip: {
				show: true,
				trigger: 'axis',
				axisPointer: {type: 'none'},
				borderColor: config.value?.tooltipOptions?.borderColor as string,
				borderWidth: chartsSrv.sizeConverter(
					config.value?.tooltipOptions?.borderWidth
				),
				backgroundColor: config.value?.tooltipOptions?.fill as string,
				padding: config.value?.tooltipOptions?.padding ?
					[
						chartsSrv.sizeConverter(
							config.value.tooltipOptions.padding[0]
						)!,
						chartsSrv.sizeConverter(
							config.value.tooltipOptions.padding[1]
						)!,
						chartsSrv.sizeConverter(
							config.value.tooltipOptions.padding[2]
						)!,
						chartsSrv.sizeConverter(
							config.value.tooltipOptions.padding[3]
						)!,
				] : undefined,
				textStyle: {
					fontSize: chartsSrv.sizeConverter(
						config.value?.tooltipOptions?.fontOptions?.size
					),
					fontFamily: config.value?.tooltipOptions?.fontOptions?.family,
					color: config.value?.tooltipOptions?.fontOptions?.color
				},
				formatter: params => (params as any[])
				.map(p => {
					const target = config.value?.tooltipOptions?.data
						?.get(p.seriesName);

					if(! target) return 'ERROR';

					return `
						${target[0]}：
						${p.value[p.encode.y[0]]}
						${target[1]}
					`;
				}).join('<br/>'),
			},
			grid: {
				containLabel: true,
				top: chartsSrv.sizeConverter(
					config.value?.gridOptions?.top
				),
				right: chartsSrv.sizeConverter(
					config.value?.gridOptions?.right
				),
				bottom: chartsSrv.sizeConverter(
					config.value?.gridOptions?.bottom
				),
				left: chartsSrv.sizeConverter(
					config.value?.gridOptions?.left
				),
			},
			xAxis: {
				type: 'category',
				boundaryGap: false,
				axisLabel: {
					formatter: config.value?.xAxis?.formatter,
					color: config.value?.xAxis?.fontOptions?.color,
					fontFamily: config.value?.xAxis?.fontOptions?.family,
					fontSize: chartsSrv.sizeConverter(config.value?.xAxis?.fontOptions?.size),
					margin: chartsSrv.sizeConverter(config.value?.xAxis?.offset),
				},
				axisLine: {
					show: config.value?.xAxis?.lineOptions?.show ?? false,
					lineStyle: {
						color: config.value?.xAxis?.lineOptions?.color,
						width: chartsSrv.sizeConverter(
							config.value?.xAxis?.lineOptions?.width
						),
					}
				},
				axisTick: {
					show: config.value?.xAxis?.tickOptions?.show ?? false,
					inside: config.value?.xAxis?.tickOptions?.inside,
					lineStyle: {
						color: config.value?.xAxis?.tickOptions?.color,
						width: chartsSrv.sizeConverter(
							config.value?.xAxis?.tickOptions?.width
						),
					}
				},
				splitLine: {show: false},
			},
			yAxis: config.value?.yAxisGroup ? 
				config.value.yAxisGroup.map(config => {
					return {
						type: 'value',
						name: config.name,
						nameTextStyle: {
							align: 'center',
							color: config.nameOptions?.fontOptions?.color,
							fontFamily: config.nameOptions?.fontOptions?.family,
							fontSize: chartsSrv.sizeConverter(config.nameOptions?.fontOptions?.size),
							padding: config.nameOptions?.padding ?
								[
									chartsSrv.sizeConverter(
										config.nameOptions.padding[0]
									)!,
									chartsSrv.sizeConverter(
										config.nameOptions.padding[1]
									)!,
									chartsSrv.sizeConverter(
										config.nameOptions.padding[2]
									)!,
									chartsSrv.sizeConverter(
										config.nameOptions.padding[3]
									)!,
								] : undefined,
						},
						axisLabel: {
							formatter: config.formatter,
							color: config.fontOptions?.color,
							fontFamily: config.fontOptions?.family,
							fontSize: chartsSrv.sizeConverter(config.fontOptions?.size),
							margin: chartsSrv.sizeConverter(config.offset),
						},
						axisLine: {
							show: config.lineOptions?.show ?? false,
							lineStyle: {
								color: config.lineOptions?.color,
								width: chartsSrv.sizeConverter(
									config.lineOptions?.width
								),
							}
						},
						axisTick: {
							show: config.tickOptions?.show ?? false,
							inside: config.tickOptions?.inside,
							lineStyle: {
								color: config.tickOptions?.color,
								width: chartsSrv.sizeConverter(
									config.tickOptions?.width
								),
							}
						},
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
					}
				}) : {
					type: 'value'
				},
			series: (config.value?.data?.map(row => row.slice(1)) as number[][])
				.sort((a, b) => a.length > b.length ? -1 : 1)[0]
				.map((_, i) => {
					return {
						type: 'line',
						yAxisIndex: i,
						name: (
							config.value?.legendOptions?.data
							?? []
						)[i].name,
						showSymbol: false,
						smooth: true,
						encode: {
							x: 0,
							y: i + 1
						},
						symbol: 'circle',
						symbolSize: chartsSrv.sizeConverter(
							config.value?.series?.symbolOptions?.size,
						),
						itemStyle: {
							color: ((
								props.config.legendOptions?.data
								?? []
							)[i].colorGroup ?? [])[0],
							borderColor: ((
								props.config.legendOptions?.data
								?? []
							)[i].colorGroup ?? [])[1],
							borderWidth: chartsSrv.sizeConverter(
								config.value?.series?.symbolOptions?.borderWidth
							)
						},
						lineStyle: {
							width: chartsSrv.sizeConverter(
								config.value?.series?.lineOptions?.width
							),
							color: ((
								props.config.legendOptions?.data
								?? []
							)[i].colorGroup ?? [])[0],
						}
					}
				})
		};
	};

	watchEffect(() => {
		config.value = props.config;

		builder();
	});
</script>