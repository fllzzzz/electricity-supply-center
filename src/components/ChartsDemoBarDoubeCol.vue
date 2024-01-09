<style lang="scss" scoped>
	#main {
		width: 50vw;
		height: 50vh;
		border: 2px dotted #FFFFFF;
	}
</style>

<template>
	<div id="main">
		<ChartsBarDoubeCol
			:config="barDoubeConfig"
		></ChartsBarDoubeCol>
	</div>
</template>

<script setup lang="ts">
	import type {
		Config as BarDoube
	} from '@/components/ChartsBarDoubeCol.vue';

	import ChartsBarDoubeCol from '@/components/ChartsBarDoubeCol.vue';
	import { reactive } from 'vue';

	const barDoubeConfig = reactive<BarDoube>({
		designWidth: 3840,
		data: [
			['item1', 10],
			['item2', 20],
			['item3', 30],
			['item4', 40],
			['item5', 50],
			['item6', 10],
			['item7', 20],
			['item8', 30],
			['item9', 40],
			['item10', 50],
			['item11', 10],
			['item22', 20],
			['item33', 30],
			['item44', 40],
			['item57', 50],
			['item65', 10],
			['item76', 20],
			['item88', 30],
			['item93', 40],
		],
		colorMap: new Map<
			string,
			Required<BarDoube>['colorMap'] extends
				Map<string, infer P>
				? P
				: never
		>([
			['barHeader', 'rgba(255, 153, 0, 0.95)'],
			['barBody', {
				type: 'linear',
				x: 0, y: 0, x2: 0, y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(255, 218, 163, 1)'
					},
					{
						offset: 1,
						color: 'rgba(255, 218, 163, 0.3)'
					}
				]
			}]
		]),
		gridOptions: {
			top: 75,
			left: 15,
			right: 10,
			bottom: 10
		},
		xAxis: {
			offset: 22,
			lineOptions: {
				color: '#CCCCCC',
				width: 2,
			},
			fontOptions: {
				size: 24,
				family: 'Source Han Sans CN',
				color: '#FFFFFF'
			}
		},
		yAxis: {
			offset: 20,
			name: '单位/kW·h',
			nameOptions: {
				fontOptions: {
					size: 24,
					family: 'Source Han Sans CN',
					color: '#FFFFFF'
				},
				padding: [0, 0, 15, 0]
			},
			lineOptions: {
				color: '#CCCCCC',
				width: 2,
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: '#FFFFFF'
			}
		},
		series: {
			width: 10,
			fontOptions: {
				size: 28,
				family: 'DIN',
				color: '#FFFFFF',
			}
		}
	});
</script>