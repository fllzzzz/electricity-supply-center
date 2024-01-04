<style lang="scss" scoped>
	@font-face {
		font-family: DIN;
		src: url('@fonts/DIN-Regular.otf');
	}

	.container {
		width: vw(583);
		height: vw(365);
		border: 1px solid red;
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
			['item1', 10, 10],
			['item2', 10, 10],
			['item3', 10, 10],
			['item4', 10, 10],
			['item5', 10, 10],
		],
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
				color: 'red'
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
					color: 'red'
				},
				padding: [0, 0, 20, 0]
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: 'red'
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
				color: 'red' /* #FFFFFF; */
			}
		}
	});
</script>