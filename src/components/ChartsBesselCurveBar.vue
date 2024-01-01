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
		AxisOptions,
		SerieOptions,
		FontOptions
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
		ComposeOption,
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

	export type Config = {
		designWidth :number;
		data? :[string, number][];
		xAxis? :AxisOptions;
		yAxis? :AxisOptions;
		series? :SerieOptions;
	};

	type ECOption = ComposeOption<
	 	| GridComponentOption
		| DatasetComponentOption
		| CustomSeriesOption
	>;

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		}
	});

	const options = ref<ECOption>({});
	const canvasCtx = document.createElement('canvas').getContext('2d');
	const config = ref<Config | undefined>();
	const chartsSrv = new ChartsService({
		designWidth: props.config.designWidth
	});

	const builder = () => {
		if(
			config.value?.data &&
			config.value?.data.length > 0
		) {
			if(
				config.value?.data[0][0] !== 'cover0'
			) {
				config.value?.data.map((row, index) => {
					if(row[0] === 'cover0') return index;
					return undefined;
				}).forEach(value => {
					if(! value && value !== 0) return;

					config.value?.data?.splice(value, 1);
				});

				config.value?.data.unshift(['cover0', 0]);
			}

			if(
				config.value?.data[config.value?.data.length - 1][0] !== 'cover1'
			) {
				config.value?.data.map((row, index) => {
					if(row[0] === 'cover1') return index;
					return undefined;
				}).forEach(value => {
					if(! value && value !== 0) return;

					config.value?.data?.splice(value, 1);
				});

				config.value?.data.push(['cover1', 0]);
			};
		};

		options.value = {
			dataset: {
				sourceHeader: false,
				source: config.value?.data
			},
			grid: {
				containLabel: true,
				top: chartsSrv.sizeConverter(60),
				right: 0,
				bottom: chartsSrv.sizeConverter(1),
				left: 0,
			},
			xAxis: {
				type: 'category',
				axisTick: {
					show: false
				},
				axisLine: {
					show: true
				},
				axisLabel: {
					interval: 0,
					margin: chartsSrv.sizeConverter(16),
					color: config.value?.xAxis?.fontOptions?.color,
					fontSize: chartsSrv.sizeConverter(config.value?.xAxis?.fontOptions?.size),
					fontFamily: config.value?.xAxis?.fontOptions?.family,
					fontWeight: config.value?.xAxis?.fontOptions?.weight,
					formatter: value => {
						if(value.slice(0, value.length -1) !== 'cover')
							return value;
						return '';
					},
				},
			},
			yAxis: {
				name: config.value?.yAxis?.name,
				nameTextStyle: {
					color: config.value?.yAxis?.nameOptions?.fontOptions?.color,
					fontSize: chartsSrv.sizeConverter(config.value?.yAxis?.nameOptions?.fontOptions?.size),
					fontFamily: config.value?.yAxis?.nameOptions?.fontOptions?.family,
					lineHeight: config.value?.yAxis?.nameOptions?.fontOptions?.lineHeight,
					verticalAlign: 'bottom',
					align: 'left'
				},
				max(extent) {
					return extent.max + 10;
				},
				axisTick: {
					show: false
				},
				splitLine: {
					show: true,
					lineStyle: {
						type: [chartsSrv.sizeConverter(5)!, chartsSrv.sizeConverter(5)!],
						dashOffset: chartsSrv.sizeConverter(5)!,
						color: 'rgba(204, 204, 204, 0.2)'
					}
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: 'rgba(204, 204, 204, 0.5)',
					}
				},
				axisLabel: {
					interval: 0,
					margin: chartsSrv.sizeConverter(8),
					color: config.value?.yAxis?.fontOptions?.color,
					fontSize: chartsSrv.sizeConverter(config.value?.yAxis?.fontOptions?.size),
					fontWeight: config.value?.yAxis?.fontOptions?.weight,
					fontFamily: config.value?.yAxis?.fontOptions?.family,
				},
			},
			series: [
				{
					type: 'custom',
					encode: {
						x: 0,
						y: 1
					},
					animationDurationUpdate: 600,
					renderItem: (params, api) => {
						let pathData :string = '';
						let textData :{
							x? :number,
							y? :number,
							text? :string;
							options :FontOptions & {
								invisible :boolean;
							}
						}= {
							options: {
								family: 'DIN',
								size: chartsSrv.sizeConverter(config.value?.series?.fontOptions?.size),
								color: config.value?.series?.fontOptions?.color,
								weight: config.value?.series?.fontOptions?.weight,
								invisible: true,
							}
						};

						if(
							params.dataIndex >= 1 &&
							params.dataIndex <= params.dataInsideLength - 2
						) {
							const [
								values, nextValues
							] = [
								[
									api.value(params.encode.x[0]),
									api.value(params.encode.y[0])
								],
								[
									api.value(params.encode.x[0], params.dataIndex + 1),
									api.value(params.encode.y[0], params.dataIndex + 1)
								]
							];

							const [
								points, originPoints, nextPoints,
							] = [
								api.coord(values),
								api.coord([0, 0]),
								api.coord(nextValues)
							];

							const xAxisDiff = Math.abs(points[0] - nextPoints[0]);
									
							pathData = `
								M
									${points[0] - xAxisDiff} ${originPoints[1]}
								C
									${points[0] - (xAxisDiff / 2)} ${originPoints[1]},
									${points[0]} ${originPoints[1]},
									${points[0]} ${points[1]}
								C
									${points[0]} ${originPoints[1]},
									${points[0] + (xAxisDiff / 2)} ${originPoints[1]},
									${points[0] + xAxisDiff} ${originPoints[1]}
								Z
							`;


							if(! canvasCtx) throw new Error('@echarts => canvas context is not available');

							canvasCtx.font = `${textData.options.size} ${textData.options.family}`;
							const mst = canvasCtx.measureText(`${values[1]}`);

							const [
								w, h
							] = [
									Math.abs(mst.actualBoundingBoxLeft) +
									Math.abs(mst.actualBoundingBoxRight),

									Math.abs(mst.actualBoundingBoxAscent) +
									Math.abs(mst.actualBoundingBoxDescent)
							];
							
							[
								textData.x,
								textData.y,
								textData.text,
								textData.options.invisible
							] = [
								points[0] - (w - (w * 0.4)),
								points[1] - (h + (h * 0.4)),
								`${values[1]}`,
								false
							];
						}

						return {
							type: 'group',
							children: [
								{
									type: 'path',
									style: {
										stroke: config.value?.series?.stroke,
										fill: config.value?.series?.fill
									},
									shape: {
										d: pathData
									}
								},
								{
									type: 'text',
									x: textData.x,
									y: textData.y,
									invisible: textData.options.invisible,
									style: {
										fill: textData.options.color,
										text: textData.text,
										fontSize: textData.options.size,
										fontFamily: textData.options.family,
										fontWeight: textData.options.weight,
									}
								}
							]
						}
					}
				}
			]
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