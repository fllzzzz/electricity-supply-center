<style lang="scss" scoped>

</style>

<template>
	<Echarts
		:config="{
			chartsOptions: options, 
			chartsUseList: useList
		}"
		@rezise="resizeHnalder"
	></Echarts>
</template>

<script setup lang="ts">
	import type {
		PropType
	} from 'vue';

	import type {
		CustomSeriesOption,
	} from 'echarts/charts';

	import type{
		DatasetComponentOption,
		GridComponentOption,
	} from 'echarts/components';

	import type {
		ComposeOption,
		PatternObject,
		LinearGradientObject,
		RadialGradientObject
	} from 'echarts/core';

	import Echarts from '@/components/Echarts.vue';

	import {
		ref,
		computed,
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

	type ECOption = ComposeOption<
	 	| GridComponentOption
		| DatasetComponentOption
		| CustomSeriesOption
	>;

	type Color = 
		| string 
		| PatternObject 
		| LinearGradientObject 
		| RadialGradientObject
		| InstanceType<new () => echarts.graphic.LinearGradient>;

	type FontOptions = {
		size :number;
		family :string;
		stroke? :string;
		fill? :string;
		lineHeight? :number;
		weight? :'bold' | 'bolder' | 'lighter' |'normal';
	};

	export type Config = {
		designWidth :number;
		yAxisName :string;
		data :[string, number][];
		stroke :Color;
		fill :Color;
		fonts :{
			itemIndicator :FontOptions;
			xAxis :FontOptions;
			yAxis :FontOptions;
			yAxisName :FontOptions;
		}
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		}
	});

	const useList = [
		GridComponent,
		DatasetComponent,
		CustomChart,
		SVGRenderer,
	];

	const options = ref<ECOption>({});
	const resizeBootFlag = ref<number>(0);
	const canvasCtx = document.createElement('canvas').getContext('2d');
	const getFontOptions = computed(() => {
		const {
			fonts,
			designWidth,
		} = props.config;

		const ratio = window.innerWidth / designWidth;

		return {
			itemIndicator: fonts.itemIndicator.size * ratio,
			xAxis: fonts.xAxis.size * ratio,
			yAxis: fonts.yAxis.size * ratio,
			grid: {
				top: 60 * ratio,
			},
			yAxisName: {
				size: fonts.yAxisName.size * ratio,
				lineHright: fonts.yAxisName.lineHeight ? 
				fonts.yAxisName.lineHeight * ratio : 50 * ratio,
			},
		};
	});

	const resizeHnalder = () => {
		if(resizeBootFlag.value <= 1000) {
			resizeBootFlag.value ++;
			return;
		}
		resizeBootFlag.value = 0;
	};
	
	watchEffect(() => {
		if(resizeBootFlag.value < 0 && resizeBootFlag.value > 1000) return;

		const {
			data,
			stroke,
			fill
		} = props.config;

		if(
			data &&
			data.length > 0
		) {
			if(
				data[0][0] !== 'cover0'
			) {
				data.map((row, index) => {
					if(row[0] === 'cover0') return index;
					return undefined;
				}).forEach(value => {
					if(! value) return;

					data.splice(value, 1);
				});

				data.unshift(['cover0', 0]);
			}
			if(
				data[data.length - 1][0] !== 'cover1'
			) {
				data.map((row, index) => {
					if(row[0] === 'cover1') return index;
					return undefined;
				}).forEach(value => {
					if(! value) return;

					data.splice(value, 1);
				});

				data.push(['cover1', 0]);
			};
		};

		options.value = {
			dataset: {
				sourceHeader: false,
				source: data
			},
			grid: {
				containLabel: true,
				top: getFontOptions.value.grid.top,
				right: 0,
				bottom: 0,
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
					margin: 16,
					color: props.config.fonts.xAxis.fill,
					fontSize: getFontOptions.value.xAxis,
					fontWeight: props.config.fonts.xAxis.weight,
					fontFamily: props.config.fonts.xAxis.family,
					formatter: value => {
						if(value.slice(0, value.length -1) !== 'cover')
							return value;
						return '';
					},
				},
			},
			yAxis: {
				name: props.config.yAxisName,
				nameTextStyle: {
					color: props.config.fonts.yAxisName.fill,
					fontSize: getFontOptions.value.yAxisName.size,
					fontFamily: props.config.fonts.yAxisName.family,
					lineHeight: getFontOptions.value.yAxisName.lineHright,
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
						type: [5, 5],
						dashOffset: 5,
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
					margin: 8,
					color: props.config.fonts.yAxis.fill,
					fontSize: getFontOptions.value.yAxis,
					fontWeight: props.config.fonts.yAxis.weight,
					fontFamily: props.config.fonts.yAxis.family,
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
								size: getFontOptions.value.itemIndicator,
								fill: props.config.fonts.itemIndicator.fill,
								stroke: '#F8B551',
								weight: props.config.fonts.itemIndicator.weight,
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

									Math.abs(mst.fontBoundingBoxAscent) +
									Math.abs(mst.fontBoundingBoxDescent)
							];
							
							[
								textData.x,
								textData.y,
								textData.text,
								textData.options.invisible
							] = [
								points[0] - w,
								points[1] - (h * 2.75),
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
										stroke: stroke,
										fill: fill
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
										fill: textData.options.fill,
										stroke: textData.options.stroke,
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
	});
</script>