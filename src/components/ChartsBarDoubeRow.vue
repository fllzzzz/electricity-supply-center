<style lang="scss" scoped>

</style>

<template>
	<Echarts
		:config="{
			chartsOptions: options, 
			chartsUseList: useList
		}"
		@rezise="builder()"
	></Echarts>
</template>

<script setup lang="ts">
	import type {
		ChartsOptions
	} from '@/types';

	import type {
		PropType
	} from 'vue';

	import type {
		CustomSeriesOption,
	} from 'echarts/charts';

	import type {
		DatasetComponentOption,
		GridComponentOption,
		LegendComponentOption
	} from 'echarts/components';

	import type {
		ComposeOption
	} from 'echarts/core';

	import ChartsService from '@/services/ChartsService';
	import Echarts from '@/components/Echarts.vue';

	import {
		ref,
		watchEffect,
	} from 'vue';

	import {
		CustomChart,
	} from 'echarts/charts';

	import {
		DatasetComponent,
		GridComponent,
		LegendComponent
	} from 'echarts/components';

	import {
		SVGRenderer,
	} from 'echarts/renderers';

	export type Config = ChartsOptions<(string | number)[][]>;

	type ECOption = ComposeOption<
	 	| GridComponentOption
		| DatasetComponentOption
		| CustomSeriesOption
		| LegendComponentOption
	>;

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		},
	});

	const options = ref<ECOption>({});
	const canvasCtx = document.createElement('canvas').getContext('2d');
	const config = ref<Config | undefined>();
	const chartsSrv = new ChartsService({
		designWidth: props.config.designWidth
	});
	const useList = [
		GridComponent,
		DatasetComponent,
		CustomChart,
		LegendComponent,
		SVGRenderer,
	];

	const builder = () => {
		const barWidth = chartsSrv.sizeConverter(
			config.value?.series?.width
		)!;

		options.value = {
			dataset: {
				sourceHeader: false,
				source: config.value?.data
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
				type: 'value',
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
				splitLine: {
					lineStyle: {
						type: [
							chartsSrv.sizeConverter(10)!,
							chartsSrv.sizeConverter(10)!
						],
						dashOffset: chartsSrv.sizeConverter(5),
						color: 'rgba(204, 204, 204, 0.4)'
					}
				},
				axisTick: {show: false},
			},
			yAxis: {
				type: 'category',
				max: extent => extent.max + (config.value?.yAxis?.max ?? 0),
				name: config.value?.yAxis?.name,
				nameTextStyle: {
					color: config.value?.yAxis?.nameOptions?.fontOptions?.color,
					fontFamily: config.value?.yAxis?.nameOptions?.fontOptions?.family,
					fontSize: chartsSrv.sizeConverter(config.value?.yAxis?.nameOptions?.fontOptions?.size),
					padding: config.value?.yAxis?.nameOptions?.padding ? 
					[
						chartsSrv.sizeConverter(
							config.value.yAxis.nameOptions.padding[0]
						)!,
						chartsSrv.sizeConverter(
							config.value.yAxis.nameOptions.padding[1]
						)!,
						chartsSrv.sizeConverter(
							config.value.yAxis.nameOptions.padding[2]
						)!,
						chartsSrv.sizeConverter(
							config.value.yAxis.nameOptions.padding[3]
						)!,
					] : undefined,
				},
				axisLabel: {
					formatter: config.value?.yAxis?.formatter,
					color: config.value?.yAxis?.fontOptions?.color,
					fontFamily: config.value?.yAxis?.fontOptions?.family,
					fontSize: chartsSrv.sizeConverter(config.value?.yAxis?.fontOptions?.size),
					margin: chartsSrv.sizeConverter(config.value?.yAxis?.offset),
				},
				axisLine: {
					show: config.value?.yAxis?.lineOptions?.show ?? false,
					lineStyle: {
						color: config.value?.yAxis?.lineOptions?.color,
						width: chartsSrv.sizeConverter(
							config.value?.yAxis?.lineOptions?.width
						),
					}
				},
				axisTick: {
					show: false
				},
			},
			series: {
				type: 'custom',
				encode: {
					y: 0,
					x: 1
				},
				renderItem: (params, api) => {
					if (!canvasCtx) throw new Error('@echarts => canvas context is not available');

					canvasCtx.textAlign = 'center';
					canvasCtx.textBaseline = 'middle';

					canvasCtx.font =
						`
							${config.value?.series?.fontOptions?.size} 
							${config.value?.series?.fontOptions?.family}
						`;

					const values = [
						api.value(params.encode.x[0]),
						api.value(params.encode.y[0])
					];

					const [
						points, originPoints
					] = [
						api.coord(values),
						api.coord([0, 0])
					];

					const mst = canvasCtx.measureText(`${values[1]}`);

					const [
						w, h
					] = [
						Math.abs(mst.actualBoundingBoxLeft) +
						Math.abs(mst.actualBoundingBoxRight),

						Math.abs(mst.fontBoundingBoxAscent) +
						Math.abs(mst.fontBoundingBoxDescent)
					];

					const barHeaderInfo = {
						height: chartsSrv.sizeConverter(4)!,
						width: chartsSrv.sizeConverter(16)!,
						color: config.value?.colorMap?.get('barHeader'),
					};

					return {
						type: 'group',
						children: [
							{
								type: 'rect',
								style: {
									fill: config.value?.colorMap
										?.get('barBody')
								},
								shape: {
									x: originPoints[0],
									y: points[1],
									width: Math.abs(points[0] - originPoints[0]) - barHeaderInfo.height,
									height: barWidth
								}
							},
							{
								type: 'path',
								style: {
									fill: '#FFFFFF',
									stroke: '#FFFFFF'
								},
								shape: {
									pathData: `
										M 
											${
												originPoints[0] + 
												Math.abs(points[0] - originPoints[0]) - 
												(barHeaderInfo.height / 2)
											},
											${
												points[1] + 
												(barHeaderInfo.width / 1.25)
											}
										l 
											${
												-(barHeaderInfo.height / 2)
											}, 0
										l
											0,${
												-(barHeaderInfo.width)
											}
										l
											${
												barHeaderInfo.height
											}, 0
										z
									`
								}
							}
						]
					}
				}
			}
		};
	};

	watchEffect(() => {
		config.value = props.config;

		builder();
	});
</script>