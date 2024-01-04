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
	} from 'echarts/components';

	import {
		SVGRenderer,
	} from 'echarts/renderers';

	export type Config = ChartsOptions<(string | number)[][]>;

	type ECOption = ComposeOption<
	 	| GridComponentOption
		| DatasetComponentOption
		| CustomSeriesOption
	>;

	type DistanceJudgesConfig = {
		margin :[number, number];
		widht :[number, number];
		ratios :number;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		},
	});

	let maxData :number;
	const options = ref<ECOption>({});
	const canvasCtx = document.createElement('canvas').getContext('2d');
	const config = ref<Config | undefined>();
	const chartsSrv = new ChartsService({
		designWidth: props.config.designWidth
	});
	const barSizeConfig :DistanceJudgesConfig = {
		margin: [22, 6],
		widht: [14, 7],
		ratios: 8 / 10,
	};

	const createDistanceAdapter = (
		config :DistanceJudgesConfig
	) => {
		let [_margin, _width, _requireDistance] = [0, 0, 0];

		return (
			count :number,
			distance :number,
		) => {
			_requireDistance = (config.widht[0] * count) + (config.margin[0] * (count - 1));

			if(_requireDistance <= distance * config.ratios) return {
				widht: config.widht[0],
				margin: config.margin[0],
				requireDistance: _requireDistance
			};

			_margin = config.margin[0] - (Math.abs(_requireDistance - (distance * config.ratios)) / (count - 1));

			if(_margin >= config.margin[1]) return {
				widht: config.widht[0],
				margin: _margin,
				requireDistance: (config.widht[0] * count) + (_margin * (count - 1)),
			};

			_width = config.widht[0] - (Math.abs(_margin - config.margin[1]) * (count - 1));
			_margin = config.margin[1];
			
			if(_width >= config.widht[1]) return {
				widht: _width,
				margin: _margin,
				requireDistance: (_width * count) + (_margin * (count - 1)),
			};

			throw new Error('to much data');
		};
	};

	const dimensionsAdapter = (
		data :unknown[][],
		useRow? :boolean
	) => {
		if(data.length === 0) return undefined;

		if(! useRow) return data.sort((a, b) => a.length > b.length ? -1 : 1)[0]
			.slice(1).map((_, index) => index + 1);
		
		return data.slice(1).map((_, index) => index + 1);
	};

	const builder = () => {
		const distanceAdapter = createDistanceAdapter({
			ratios: barSizeConfig.ratios,
			margin: [
				chartsSrv.sizeConverter(barSizeConfig.margin[0])!,
				chartsSrv.sizeConverter(barSizeConfig.margin[1])!
			],
			widht: [
				chartsSrv.sizeConverter(barSizeConfig.widht[0])!,
				chartsSrv.sizeConverter(barSizeConfig.widht[1])!
			],
		});
		
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
				type: 'category',
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
				axisTick: {show: false},
				splitLine: {show: false},
			},
			yAxis: {
				type: 'value',
				max: extent => {
					maxData = extent.max + (config.value?.yAxis?.max ?? 0);

					return maxData;
				},
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
				type: 'custom',
				encode: {
					x: 0,
					y: dimensionsAdapter(config.value?.data ?? [])
				},
				renderItem: (params, api) => {
					const [
						xAxisValues,
						yAxisValues,
						nextXAxisValues,
						preXAxisValues
					] = [
						params.encode.x.map(dis => api.value(dis)),
						params.encode.y.map(dis => api.value(dis)),
						params.encode.x.map(dis => api.value(dis, params.dataIndexInside + 1)),
						params.encode.x.map(dis => api.value(dis, params.dataIndexInside ? params.dataIndexInside - 1 : 0)),
					];

					const [
						x, y, originY, nextX, preX, maxY
					] = [
						xAxisValues.map(value => api.coord([value, 0])[0]),
						yAxisValues.map(value => api.coord([0, value])[1]),
						api.coord([0, 0])[1],
						nextXAxisValues.map(value => api.coord([value, 0])[0]),
						preXAxisValues.map(value => api.coord([value, 0])[0]),
						api.coord([0, maxData])[1],
					];

					const xAxisDiff = Math.abs((nextX[0] ? nextX[0] : preX[0]) - x[0]);

					const {
						widht: dataBarWidht,
						margin: dataBarMargin,
						requireDistance
					} = distanceAdapter(params.encode.y.length, xAxisDiff);

					const [
						coverBarX, coverBarY, coverBarWidth, coverBarHeight,
					] = [
						x[0] - (requireDistance / 2),
						maxY,
						requireDistance,
						Math.abs(maxY - originY),
					];

					if (!canvasCtx) throw new Error('@echarts => canvas context is not available');
					canvasCtx.font = `
						${chartsSrv.sizeConverter(
							config.value?.series?.fontOptions?.size
						)} 
						${config.value?.series?.fontOptions?.family}
					`;

					const itemList :any[] = yAxisValues.map((value, index) => {
						const mst = canvasCtx.measureText(`${value}`);

						const [
							w, h
						] = [
							Math.abs(mst.actualBoundingBoxLeft) +
							Math.abs(mst.actualBoundingBoxRight),

							Math.abs(mst.actualBoundingBoxAscent) +
							Math.abs(mst.actualBoundingBoxDescent)
						];

						return {
							type: 'group',
							children: [
								{
									type: 'rect',
									style: {
										fill: 'red'
									},
									shape: {
										x: coverBarX + (index * (dataBarWidht + dataBarMargin)),
										y: api.coord([0, value])[1],
										width: dataBarWidht,
										height: Math.abs(api.coord([0, value])[1] - originY)
									}
								},
								{
									type: 'text',
									x: coverBarX + 
									(dataBarWidht / 2) +
									(index * (dataBarWidht + dataBarMargin)) -
									w,
									y: api.coord([0, value])[1] - (h * 3),
									style: {
										text: value,
										fill: config.value?.series?.fontOptions?.color,
										fontSize: chartsSrv.sizeConverter(
											config.value?.series?.fontOptions?.size
										),
										fontFamily: config.value?.series?.fontOptions?.family,
									}
								}
							]
						};
					});

					return {
						type: 'group',
						children: [
							{
								type: 'rect',
								style: {
									fill: 'rgba(128,128,128,0.3)'
								},
								shape: {
									x: coverBarX,
									y: coverBarY,
									width: coverBarWidth,
									height: coverBarHeight
								}
							},
							...itemList
						]
					}
				}
			},
		};
	};

	const useList = [
		GridComponent,
		DatasetComponent,
		CustomChart,
		SVGRenderer,
	];

	watchEffect(() => {
		config.value = props.config;

		builder();
	});
</script>