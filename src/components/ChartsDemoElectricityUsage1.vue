<style lang="scss" scoped>
	@font-face {
		font-family: DIN;
		src: url('@fonts/DIN-Regular.otf');
	}

	.container {
		width: vw(583);
		height: vw(365);
		background-color: rgba(128,128,128,0.3);
	}
</style>

<template>
	<div class="container">
		<ChartsBarCoverGroup
			:config="config"
		></ChartsBarCoverGroup>
	</div>
</template>

<script setup lang="ts">
	import type {
		Config as BarCoverGroup
	} from '@/components/ChartsBarCoverGroup.vue';

	import ChartsBarCoverGroup from '@/components/ChartsBarCoverGroup.vue';

	import {
		reactive
	} from 'vue';

	const config = reactive<BarCoverGroup>({
		designWidth: 3840,
		data: [
			['item1', 10, 20],
			['item2', 10, 20],
			['item3', 10, 20],
			['item4', 10, 20],
			['item5', 10, 20],
		],
		legendOptions: {
			gap: 49,
			grid: {
				right: 1,
			},
			data: [
				{
					name: 'a',
					color: {
						type: 'linear',
						x: 0, y: 0, x2: 0, y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(0, 144, 255, 1)'
							},
							{
								offset: 1,
								color: 'rgba(0, 144, 255, 0.2)'
							}
						]
					}
				},
				{
					name: 'b',
					color: {
						type: 'linear',
						x: 0, y: 0, x2: 0, y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(0, 255, 174, 1)'
							},
							{
								offset: 1,
								color: 'rgba(0, 255, 174, 0.2)'
							}
						]
					}
				}
			]
		},
		gridOptions: {
			top: 75,
			right: 15,
			left: 10,
			bottom: 5,
		},
		xAxis: {
			offset: 22,
			fontOptions: {
				size: 24,
				family: 'Source Han Sans CN',
				color: '#FFFFFF'
			},
			lineOptions: {
				show: true,
				color: '#CCCCCC'
			}
		},
		yAxis: {
			offset: 20,
			max: 10,
			name: 'kW·h',
			nameOptions: {
				fontOptions: {
					size: 20,
					family: 'Source Han Sans CN',
					color: '#FFFFFF'
				},
				padding: [0, 0, 20, 0]
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: '#FFFFFF'
			},
			lineOptions: {
				show: true,
				color: '#CCCCCC'
			}
		},
		series: {
			fontOptions: {
				size: 20,
				family: 'DIN',
				color: '#FFFFFF'
			}
		}
	});
</script>