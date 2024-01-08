<style lang="scss" scoped>
	#main {
		width: 50vw;
		height: 50vh;
	}
</style>

<template>
	<div id="main">
		<ChartsSmoothCurve
			:config="smoothCurveConfig"
		></ChartsSmoothCurve>
	</div>
</template>

<script setup lang="ts">
	import type {
		Config as SmoothCurve
	} from '@/components/ChartsSmoothCurve.vue';

	import ChartsSmoothCurve from '@/components/ChartsSmoothCurve.vue';

	import {
		reactive
	} from 'vue';

	const smoothCurveConfig = reactive<SmoothCurve>({
		designWidth: 3840,
		data: [
			['item1', 820, 1320],
			['item2', 932, 1290],
			['item3', 901, 934],
			['item4', 820, 1290],
			['item5', 1290, 820],
		],
		gridOptions: {
			top: 90,
			left: 10,
			right: 10,
			bottom: 10
		},
		legendOptions: {
			gap: 25,
			grid: {
				right: 480,
			},
			fontOptions: {
				size: 24,
				family: 'Source Han Sans CN',
				color: '#FFFFFF'
			},
			data: [
				{
					name: '光照强度',
					colorGroup: [
						'rgba(253, 255, 65, 1)',
						'rgba(253, 255, 65, 0.4)',
					]
				},
				{
					name: '平均光照强度',
					colorGroup: [
						'rgba(0, 204, 255, 1)',
						'rgba(0, 204, 255, 0.4)',
					]
				}
			]
		},
		tooltipOptions: {
			data: new Map([
				['光照强度', ['功率', 'p']],
				['平均光照强度', ['辐射', 'gy']],
			]),
			fill: 'rgba(0, 228, 255, 0.3)',
			borderColor: '#00E4FF',
			borderWidth: 1,
		},
		xAxis: {
			offset: 10,
			fontOptions: {
				size: 19,
				family: 'DIN',
				color: '#FFFFFF',
			},
			lineOptions: {
				show: true,
				color: '#CCCCCC',
			},
			tickOptions: {
				show: true,
				inside: true,
				color: '#CCCCCC',
			}
		},
		yAxisGroup: [
			{
				name: 'kW',
				nameOptions: {
					padding: [0, 0, 30, 0],
					fontOptions: {
						size: 24,
						family: 'Adobe Heiti Std',
						color: '#FFFFFF',
					}
				},
				lineOptions: {
					show: false,
				},
				offset: 17,
				fontOptions: {
					size: 24,
					family: 'DIN',
					color: '#FFFFFF',
				},
			},
			{
				name: 'W/㎡',
				nameOptions: {
					padding: [0, 0, 30, 0],
					fontOptions: {
						size: 24,
						family: 'Adobe Heiti Std',
						color: '#FFFFFF',
					}
				},
				lineOptions: {
					show: false,
				},
				offset: 17,
				fontOptions: {
					size: 24,
					family: 'DIN',
					color: '#FFFFFF',
				},
			},
		],
		series: {
			symbolOptions: {
				size: 16,
				borderWidth: 16,
			},
			lineOptions: {
				width: 5
			}
		},
	});
</script>