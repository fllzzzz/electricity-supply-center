<style lang="scss" scoped>
	#main {
		width: 50vw;
		height: 50vh;
		border: 2px dotted red;
	}
</style>

<template>
	<div id="main">
		<ChartsBarDoubeRow
			:config="barDoubeConfig"
		></ChartsBarDoubeRow>
	</div>
</template>

<script setup lang="ts">
	import type {
		Config as BarDoube
	} from '@/components/ChartsBarDoubeRow.vue';

	import ChartsBarDoubeRow from '@/components/ChartsBarDoubeRow.vue';
	import { reactive } from 'vue';

	const barDoubeConfig = reactive<BarDoube>({
		designWidth: 3840,
		data: [
			['item1', 10],
			['item2', 20],
			['item3', 30],
			['item4', 40],
			['item5', 50],
		].reverse(),
		colorMap: new Map<
			string,
			Required<BarDoube>['colorMap'] extends
				Map<string, infer P>
				? P
				: never
		>([
			['barHeader', '#FFFFFF'],
			['barBody', {
				type: 'linear',
				x: 1, y: 0, x2: 0, y2: 0,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(0, 255, 255, 1)'
					},
					{
						offset: 1,
						color: 'rgba(0, 255, 255, 0.3)'
					}
				]
			}]
		]),
		gridOptions: {
			top: 75,
			left: 15,
			right: 20,
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
				color: 'red'
			}
		},
		yAxis: {
			offset: 20,
			name: '单位/kW·h',
			nameOptions: {
				fontOptions: {
					size: 24,
					family: 'Source Han Sans CN',
					color: 'red'
				},
				padding: [0, 0, 15, 0]
			},
			lineOptions: {
				show: true,
				color: '#CCCCCC',
				width: 2,
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: 'red'
			}
		},
		series: {
			width: 6,
			fontOptions: {
				size: 28,
				family: 'DIN',
				color: 'red',
			}
		}
	});
</script>