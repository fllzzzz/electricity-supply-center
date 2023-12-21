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
	import * as echarts from 'echarts';
	import Echarts from '@/components/Echarts.vue';

	import {
		CustomChart,
		PieChart,
		BarChart,
	} from 'echarts/charts';

	import {
		DatasetComponent,
		GridComponent,
	} from 'echarts/components';

	import {
		SVGRenderer,
	} from 'echarts/renderers';

	import { LabelLayout, UniversalTransition } from 'echarts/features';

	import {
		reactive
	} from 'vue';

	import type {
		CustomSeriesOption,
		PieSeriesOption,
		BarSeriesOption
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
	>;

	const options :ECOption = {
		dataset: {
			sourceHeader: true,
			source: [
				['item1', 'item2', 'item3'],
				[10, 		20,			30],
				[40,		50,			60],
				[70,		80,			90],
			]
		},
		grid: {
			containLabel: true,
			top: 0,
			right: 0,
			bottom: 0,
			left: 0,
		},
		xAxis: {
			axisLabel: {
				align: 'right',
			}
		},
		yAxis: {},
		series: [
			{
				type: 'custom',
				coordinateSystem: 'cartesian2d',
				encode: {
					value: 0
				},
				renderItem: (params, api) => {
					const [
						Ox, Oy, x, y,
					] = [
						...api.coord([0, 0]),
						...api.coord([api.value(0), api.value(1)])
					];
					
					console.log(Ox, Oy, x, y);

					return {
						type:'path',
						style: {
							stroke: 'red',
							fill: 'red'
						},
						shape: {
							d: `
							M ${x}, ${y}
							L ${x}, ${Oy}
							M ${x}, ${y}
							L ${x + 50}, ${y}
							L ${x + 50}, ${Oy}
							L ${x}, ${Oy}
							`,
						}
					}
				}
			}
		]
	}

	const useList = [
		CustomChart,
		DatasetComponent,
		SVGRenderer,
		PieChart,
		GridComponent,
		BarChart,
		LabelLayout,
		UniversalTransition
	];
</script>