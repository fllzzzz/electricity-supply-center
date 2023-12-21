<style lang="scss" scoped>

</style>

<template>
	<Echarts
		:config="{
			chartsOptions: options, use
		}"
	></Echarts>
</template>

<script setup lang="ts">
	import Echarts from '@/components/Echarts.vue';

	import {
		PieChart
	} from 'echarts/charts';

	import {
		TitleComponent,
		TooltipComponent,
		LegendComponent,
	} from 'echarts/components';

	import {
		CanvasRenderer
	} from 'echarts/renderers';

	import {
		reactive
	} from 'vue';

	import type {
		PieSeriesOption
	} from 'echarts/charts';

	import type {
		TitleComponentOption,
		ToolboxComponentOption,
		LegendComponentOption
	} from 'echarts/components';

	import type {
		ComposeOption
	} from 'echarts/core';


	type ECOption = ComposeOption<
		| PieSeriesOption
		| TitleComponentOption
		| ToolboxComponentOption
		| LegendComponentOption
	>;

	const options :ECOption = {
		title: {
			text: 'Referer of a Website',
			subtext: 'Fake Data',
			left: 'center'
		},
		tooltip: {
			trigger: 'item'
		},
		legend: {
			orient: 'vertical',
			left: 'left'
		},
		series: [
			{
			name: 'Access From',
			type: 'pie',
			radius: '50%',
			data: [
				{ value: 1048, name: 'Search Engine' },
				{ value: 735, name: 'Direct' },
				{ value: 580, name: 'Email' },
				{ value: 484, name: 'Union Ads' },
				{ value: 300, name: 'Video Ads' }
			],
			emphasis: {
				itemStyle: {
				shadowBlur: 10,
				shadowOffsetX: 0,
				shadowColor: 'rgba(0, 0, 0, 0.5)'
				}
			}
			}
		]
	}

	const use = [
		PieChart,
		TitleComponent,
		TooltipComponent,
		LegendComponent,
		CanvasRenderer
	];
</script>