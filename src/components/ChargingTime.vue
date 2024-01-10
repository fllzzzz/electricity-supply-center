<style scoped lang="scss">
.charging-time {
	width: 100%;
	height: 100%;
	padding: 0 0 0 vw(30);

	&__wrapper {
		width: 100%;
		height: 100%;
	}
}
</style>

<template>
	<Card :config="{
		title: '充电时长'
	}">
		<div class="charging-time">
			<div class="charging-time__wrapper">
				<LineDot
					:config="lineDotConfig"
				></LineDot>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import type {
	Config as LineDotType
} from '@/components/ChartsLineDot.vue';

import Card from '@/components/Card.vue';
import LineDot from '@/components/ChartsLineDot.vue';

import {
	reactive
} from 'vue';

const lineDotConfig = reactive<LineDotType>({
	designWidth: 3840,
	grid: {
		top: 90,
		right: 20,
		left: 10,
		bottom: 1,
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
		name: '单位：H',
		nameOptions: {
			padding: [0, 40, 10, 0],
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
			size: 10,
			color: 'rgba(255, 228, 0, 1)',
			borderWidth: 10,
			borderColor: 'rgba(255, 228, 0, 0.35)',
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

