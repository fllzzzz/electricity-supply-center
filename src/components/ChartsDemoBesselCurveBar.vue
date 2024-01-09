<style scoped lang="scss">

</style>

<template>
	<div>

	</div>
</template>

<script setup lang="ts">
	import type {
		Config as ChartsBesselCurveBarType
	} from '@/components/ChartsBesselCurveBar.vue';

	import * as echarts from 'echarts/core';

	import ChartsBesselCurveBar 
	from '@/components/ChartsBesselCurveBar.vue';

	import {
		reactive
	} from 'vue';

	const config = reactive<ChartsBesselCurveBarType>({
		designWidth: 3840,
		data: [
			['0时', 50],
			['2时', 10],
			['4时',	20],
			['6时',	30],
			['8时', 40],
			['10时', 60],
			['12时', 60],
		] as [string, number][],
		xAxis: {
			fontOptions: {
				size: 24,
				family: 'Source Han Sans CN',
				color: '#FFFFFF',
				weight: 'normal'
			}
		},
		yAxis: {
			name: 't',
			nameOptions: {
				fontOptions: {
					size: 28,
					family: 'Source Han Sans CN',
					color: '#FFFFFF',
					weight: 'normal',
					lineHeight: 1,
				}
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: '#FFFFFF',
				weight: 'normal'
			}
		},
		series: {
			stroke: 'rgba(0, 255, 114, 1)',
			fill: (() => {
				return new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(0, 255, 114, 1)'
						},
						{
							offset: 1,
							color: 'rgba(0, 255, 114, 0.6)'
						},
					]
				);
			})(),
			fontOptions: {
				size: 32,
				family: 'DIN',
				color: '#FFFFFF',
				weight: 'bolder'
			},
		}
	});
</script>