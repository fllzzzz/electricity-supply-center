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
		reactive
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

	import {
		type ComposeOption
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
		data :(string | number)[][],
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	const chartsDataList = reactive<Config['data']>([
		['item1', 'item2'],
		[2, 	10],
		[4,		20],
		[6,		30],
		[8,		40],
	]);

	const options :ECOption = {
		dataset: {
			sourceHeader: true,
			source: chartsDataList
		},
		grid: {
			containLabel: true,
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		xAxis: {
			type: 'category',
			axisLabel: {
				formatter(value, index) {
					if(index === 0) return '';
					return `${value}时`
				},
			},
			axisTick: {
				show: false
			},
			axisLine: {
				show: true
			},

		},
		yAxis: {
			
		},
		series: [
			{
				type: 'custom',
				coordinateSystem: 'cartesian2d',
				encode: {
					x: 0,
					y: 1
				},
				renderItem: (params, api) => {
					const [
						Ox, Oy, x, y,
					] = [
						...api.coord([0, 0]),
						...api.coord([api.value(0), api.value(1)])
					];
					const dimensionY = params.encode.y[0];
					const diffxAxiosPoints = Render.getDiffxAxiosPoints(x);

					console.log('@jx', diffxAxiosPoints);


					const yAxisMaxValue = chartsDataList
						.slice(1).map(row => {
							if(dimensionY >= row.length) 
								throw new Error('the dimension out of array length')
						
							return row[dimensionY];
						}).sort((a, b) => {
							if(
								typeof a === 'string' ||
								typeof b === 'string'
							) return 0;

							return a > b ? -1 : 1;
						})[0];

					if(
						! yAxisMaxValue ||
						typeof yAxisMaxValue !== 'number'
					) throw new Error('yAxisMaxValue is unknown error')

					const yAxisMaxPoint = api.coord([0, yAxisMaxValue]);

					if(y >= yAxisMaxPoint[1] / 2) {
						// 下方，未超过一半

					}else {

					}


					return {
						type: 'path',
						style: {
							stroke: 'rgba(248, 181, 81, 1)',
							fill: 'rgba(248, 181, 81, 0.3)',
						},
						shape: {
							d: `
								M	
									${x - 100} ${Oy}

								C
									${x - 100} ${Oy},
									${x} ${Oy},
									${x} ${y},

								C
									${x} ${Oy},
									${x + 100} ${Oy},
									${x + 100} ${Oy}

								Z
							`,
						}
					}
				}
			}
		]
	}

	setTimeout(() => {
		
	}, 3000);

	const useList = [
		CustomChart,
		DatasetComponent,
		SVGRenderer,
		PieChart,
		GridComponent,
		BarChart,
		LineChart,
	];


	const Render = {
		_x: 0,


		getDiffxAxiosPoints(
			x :number
		) {
			let result :number;

			if(this._x === 0) {
				result = this._x;

				this._x = x;
				return result;
			}
			
			result = Math.abs(this._x - x);
			this._x = x;
			return Math.abs(this._x - x);
		}
	};
</script>