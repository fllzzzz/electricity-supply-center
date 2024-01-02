<style lang="scss" scoped>
	@font-face {
		font-family: 'D-DIN';
		src: url('@fonts/DIN-Regular.otf');
	}

	.container {
		width: 50vw;
		height: 50vh;
		border: 1px solid red;
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
			top: 90,
			right: 15,
			left: 1,
			bottom: 10,
		},
		xAxis: {
			offset: 10,
			fontOptions: {
				size: 24,
				family: 'D-DIN',
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
		yAxis: {
			name: 'kw·h',
			nameOptions: {
				padding: [0, 0, 30, 0],
				fontOptions: {
					size: 24,
					family: 'Adobe Heiti Std',
					color: '#FFFFFF',
				}
			},
			lineOptions: {
				show: true,
				color: '#CCCCCC',
			},
			offset: 17,
			fontOptions: {
				size: 24,
				family: 'D-DIN',
				color: '#FFFFFF',
			},
		},
		series: {
			opacity: 0.4,
			stroke: 'rgba(239, 206, 22, 1)',
			fill: {
				type: 'linear',
				x: 0, y: 0, x2: 0, y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(239, 206, 22, 1)'
					},
					{
						offset: 1,
						color: 'rgba(255, 198, 0, 0.2)'
					}
				]
			},
			symbolOptions: {
				size: 20,
				color: 'red',
				borderWidth: 8,
				borderColor: 'rgba(255, 228, 0, 1)',
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