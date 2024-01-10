<style scoped lang="scss">
.realTime-power-and-irradiance {
	width: 100%;
	height: 100%;
	padding: vw(16) 0 0 vw(30);

	&__wrapper {
		width: 100%;
		height: 100%;
	}
}
</style>

<template>
	<Card :config="{
		title: '实时功率与辐照度'
	}">
		<div class="realTime-power-and-irradiance">
			<div class="realTime-power-and-irradiance__wrapper">
				<SmoothCurve
					:config="smoothCurveConfig"
				></SmoothCurve>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import type {
	Config as SmoothCurveType
} from '@/components/ChartsSmoothCurve.vue';

import Card from '@/components/Card.vue';

import SmoothCurve from '@/components/ChartsSmoothCurve.vue';

import {
	reactive
} from 'vue';

const smoothCurveConfig = reactive<SmoothCurveType>({
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
		left: 30,
		right: 30,
		bottom: 10
	},
	legendOptions: {
		gap: 25,
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
		fill: 'rgba(0, 85, 100, 0.3)',
		borderColor: '#00E4FF',
		borderWidth: 1,
		fontOptions: {
			color: '#FFFFFF',
			size: 24,
			family: 'Source Han Sans CN',
		},
		padding: [12, 15, 12, 15],
	},
	xAxis: {
		offset: 20,
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
				padding: [0, 90, 10, 0],
				fontOptions: {
					size: 24,
					family: 'Adobe Heiti Std',
					color: '#FFFFFF',
				}
			},
			lineOptions: {
				show: false,
			},
			offset: 25,
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: '#FFFFFF',
			},
		},
		{
			name: 'W/㎡',
			nameOptions: {
				padding: [0, 0, 10, 100],
				fontOptions: {
					size: 24,
					family: 'Adobe Heiti Std',
					color: '#FFFFFF',
				}
			},
			lineOptions: {
				show: false,
			},
			offset: 25,
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

