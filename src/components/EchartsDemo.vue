<style lang="scss" scoped>

</style>

<template>
	<Echarts
		:config="{
			chartsOptions: options, 
			chartsUseList: useList
		}"
	></Echarts>
</template>

<script setup lang="ts">
	import Echarts from '@/components/Echarts.vue';
	import * as echarts from 'echarts/core';

	import {
		CustomChart,
		PieChart,
		BarChart,
		LineChart
	} from 'echarts/charts';

	import {
		DatasetComponent,
		GridComponent,
	} from 'echarts/components';

	import {
		SVGRenderer,
	} from 'echarts/renderers';

	import {
		reactive,
		computed
	} from 'vue';

	import type {
		PropType
	} from 'vue';

	import type{
		CustomSeriesRenderItemAPI,
		CustomSeriesRenderItemParams,
	} from 'echarts';

	import type {
		CustomSeriesOption,
		PieSeriesOption,
		BarSeriesOption,
		LineSeriesOption
	} from 'echarts/charts';

	import type{
		DatasetComponentOption,
		GridComponentOption
	} from 'echarts/components';

	import type {
		ComposeOption
	} from 'echarts/core';

	type ECOption = ComposeOption<
		| CustomSeriesOption
		| DatasetComponentOption
		| PieSeriesOption
		| GridComponentOption
		| BarSeriesOption
		| LineSeriesOption
	>;

	type Config = {
		data :[string, (string | number)][],
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
			default: []
		}
	});

	const useList = [
		CustomChart,
		DatasetComponent,
		SVGRenderer,
		PieChart,
		GridComponent,
		BarChart,
		LineChart,
	];

	const chartsDataList = computed(() => {
		const result :Config['data'] = props.config?.data ?
			props.config?.data : [
				['item1', 'item2'],
				['2', 	10],
				['4',	20],
				['6',	30],
				['8',   30],
			];

		result.splice(1 ,0 ,['cover1', 0]);
		result.push(['cover2', 0]);

		return result;
	});



	const options :ECOption = {
		dataset: {
			sourceHeader: true,
			source: chartsDataList.value
		},
		grid: {
			containLabel: true,
			top: '5%',
			right: 0,
			bottom: 0,
			left: 0,
		},
		xAxis: {
			type: 'category',
			axisLabel: {
				formatter: value => {
					if(value.slice(0, value.length - 1) !== 'cover')
						return value;
					return '';
				},
			},
			axisTick: {
				show: false
			}
		},
		yAxis: {},
		series: [
			{
				type: 'custom',
				encode: {
					x: 0,
					y: 1
				},
				renderItem: (params, api) => {
					let _pathData :string = '';

					if(
						params.dataIndex >= 1 &&
						params.dataIndex <= params.dataInsideLength - 2
					) {
						const [
							Ox, Oy, x, y,
						] = [
							...api.coord([0, 0]),
							...api.coord([
								api.value(params.encode.x[0]), 
								api.value(params.encode.y[0])
							])
						];

						const nextXAsixPoint = 
							api.coord(
								[chartsDataList.value[params.dataIndex + 1][0], 0]
							)[0];
	
						const xAxisDiff = Math.abs(x - nextXAsixPoint);
								
						_pathData = `
							M
								${x - xAxisDiff} ${Oy}
							C
								${x - (xAxisDiff / 2)} ${Oy},
								${x} ${Oy},
								${x} ${y}
							C
								${x} ${Oy},
								${x + (xAxisDiff / 2)} ${Oy},
								${x + xAxisDiff} ${Oy}
							Z
						`;

						console.log(
							'@jx', '\r\n',
							'path: ', _pathData
						);
					}


					return {
						type: 'path',
						style: {
							stroke: 'rgba(248, 181, 81, 1)',
							fill: 'none'
/* 							fill: (() => {
								return new echarts.graphic.LinearGradient(
									0, 0, 0, 1, [
										{
											offset: 0,
											color: 'rgba(248, 181, 81, 1)'
										},
										{
											offset: 1,
											color: 'rgba(248, 181, 81, 0.6)'
										},
									]
								);
							})(), */
						},
						shape: {
							d: _pathData
						}
					}
				}
			}
		]
	}
</script>