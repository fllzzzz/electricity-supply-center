<style lang="scss" scoped>
	@font-face {
		font-family: 'D-DIN';
		src: url('@fonts/DIN-Regular.otf');
	}

	.container {
		width: 50vw;
		height: 50vh;
	}
</style>

<template>
	<div class="container">
		<ChartsLineDot
			:config="chartsLineDotConfig"
		></ChartsLineDot>
	</div>
</template>

<script setup lang="ts">
	import type {
		Config as ChartsLineDotType
	} from '@/components/ChartsLineDot.vue';

	import ChartsLineDot from '@/components/ChartsLineDot.vue';

	import {
		reactive
	} from 'vue';

	const chartsLineDotConfig = reactive<ChartsLineDotType>({
		designWidth: 3840,
		grid: {
			top: 80,
			right: 15,
			left: 10,
			bottom: 10,
		},
		xAxis: {
			offset: 31,
			fontOptions: {
				size: 24,
				family: 'D-DIN',
				color: '#E3E3E3',
			}
		},
		yAxis: {
			name: '单位：kW·h',
			nameOptions: {
				padding: [0, 0, 21, 0],
				fontOptions: {
					size: 24,
					family: 'Adobe Heiti Std',
					color: '#FFFFFF',
				}
			},
			offset: 17,
			fontOptions: {
				size: 24,
				family: 'D-DIN',
				color: '#E3E3E3',
			}
		},
		series: {
			opacity: 0.3,
			stroke: '#0EF1EF',
			fill: {
				type: 'linear',
				x: 0, y: 0, x2: 0, y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(0, 255, 255, 1)'
					},
					{
						offset: 1,
						color: 'rgba(255, 255, 255, 0)'
					}
				]
			},
			symbolOptions: {
				size: 15,
				color: '#ffff',
				borderWidth: 3,
				borderColor: '#0EF1EF',
			},
			lineOptions: {
				width: 5
			}
		},
		data: [
			[1, 150],
			[2, 230],
			[3, 224],
			[4, 500],
			[5, 166],
			[6, 150],
			[7, 230],
			[8, 224],
			[9, 500],
			[10, 166],
			[11, 150],
			[12, 230],
			[13, 224],
			[14, 500],
			[15, 166],
			[16, 150],
			[17, 230],
			[18, 224],
			[19, 500],
			[20, 166],
		]
	});
</script>