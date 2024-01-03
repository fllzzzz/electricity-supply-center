<style lang="scss" scoped>
	.container {
		width: 50vw;
		height: 50vh;
		border: 1px solid red;
	}
</style>

<template>
	<div class="container">
		
	</div>
</template>

<script setup lang="ts">
	import type {
		EChartsOption
	} from 'echarts';

	import * as echarts from 'echarts';

	import {
		onMounted
	} from 'vue';

	onMounted(() => {
		echarts.init(
			document.querySelector('.container') as HTMLElement
		).setOption({
			dataset: {
				sourceHeader: false,
				source: [
					['item1', 10, 20],
					['item2', 20, 30],
					['item3', 30, 40],
				]
			},
			xAxis: {
				type: 'category'
			},
			yAxis: {
				type: 'value'
			},
			series: [
				{
					type: 'bar',
					encode: {
						x: 0,
						y: [1, 2]
					},
				},
			]
		} as EChartsOption);
	});
</script>