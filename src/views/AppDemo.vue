<style lang="scss" scoped>
	#main {
		width: 50vw;
		height: 50vh;
	}
</style>

<template>
	<div id="main">
	</div>
</template>

<script setup lang="ts">
	import type {
		EChartsOption
	} from 'echarts';

	import * as echarts from 'echarts';

	import {
		ref,
		onMounted
	} from 'vue';

	const config = ref({
		data: []
	});

	onMounted(() => {
		echarts.init(document.getElementById('main'))
		.setOption({
			dataset: {
				sourceHeader: false,
				source: config.value.data
			},
			xAxis: {type: 'category'},
			yAxis: {type: 'value'},
			series: {
				type: 'custom',
				renderItem: (params, api) => {


					return {
						type: 'group',
						children: [
							
						]
					}
				}
			}
		} as EChartsOption)
	});
</script>