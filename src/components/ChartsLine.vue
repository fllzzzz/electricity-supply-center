<style lang="scss" scoped>
	@font-face {
		font-family: D-DIN;
		src: url('@fonts/DIN-Light.otf');
	}

	.jx-charts {
		.jx-charts__wrapper {
			width: 100%;
			height: 100%;
		}
	}
</style>

<template>
	<div class="jx-charts">
		<div 
			class="jx-charts__wrapper"
			ref="elChartsWrapper"
		></div>
	</div>
</template>

<script setup lang="ts">
	import useDebdounce from '@/utils/debounce';
	import * as echarts from 'echarts';

	import {
		ref,
		onMounted
	} from 'vue';

	let charts :echarts.ECharts | undefined;
	const elChartsWrapper = ref<HTMLElement | undefined>(undefined);

	const options = {
		grid: {
			top: 10,
			bottom: 20,
			left: 30,
			right: 5
		},
		xAxis: {
			type: 'category',
			boundaryGap: false,
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			splitLine: {
				show: false
			},
			axisLabel: {
				show: true,
				fontSize: 12,
				fontFamily: 'D-DIN',
				color: 'rgba(227, 227, 227, 1)'
			},
		},
		yAxis: {
			type: 'value',
			axisLine: {
				show: false
			},
			axisTick: {
				show: false
			},
			axisLabel: {
				show: true,
				fontSize: 12,
				fontFamily: 'D-DIN',
				color: 'rgba(227, 227, 227, 1)'
			},
			splitLine: {
				show: true,
				lineStyle: {
					color: 'rgba(204, 204, 204, 1)',
					type: [5, 5],
					opacity: 0.4
				}
			},
		},
		series: [
			{
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
					],
				type: 'line',
				symbol: 'circle',
				symbolSize: 4,
				itemStyle: {
					color: '#ffff',
					borderWidth: 1,
					borderColor: '#00FFFF',
				},
				lineStyle: {
					width: 2,
					color: '#0EF1EF',
				},
				areaStyle: {
					opacity: 0.2,
					color: {
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
					}
				}
			}
		]
	};

	onMounted(() => {
		elChartsWrapper.value && 
		(el => {
			charts = echarts.init(el);

			charts.setOption(options);

			new ResizeObserver(useDebdounce<ResizeObserver, (
				entryList :ResizeObserverEntry[],
				observer :ResizeObserver
			) => void>((entryList, observer) => {
				charts?.resize();
			}, 20)).observe(el);
		})(elChartsWrapper.value);
	});
</script>

