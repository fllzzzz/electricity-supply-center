<style lang="scss" scoped>
	@font-face {
		font-family: D-DIN;
		src: url('@/assets/fonts/DIN-Light.otf');
	}

	.charts-wrapper {
		width: 100%;
		height: 100%;
		.charts {
			width: 100%;
			height: 100%;
		}
	}
</style>

<template>
	<div class="charts-wrapper">
		<div class="charts" id="main"
			:ref="el =>elMapping.set(
					'.charts#main',
					el as HTMLElement | null
				)"
		></div>
	</div>
</template>

<script setup lang="ts">
	import * as echarts from 'echarts';

	import {
		onMounted,
		watchEffect,
	} from 'vue';

	import type {
		PropType
	} from 'vue';

	const elMapping :Map<string, null | HTMLElement> = new Map();

	const props = defineProps({
		title: {
			type: String,
			default: 'default title'
		},
		value: {
			type: [Number, Array] as PropType<number[][]>,
			default: 0
		},
	});

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
				data: [] as  number[][],
				type: 'line',
				symbol: 'circle',
				symbolSize: 4, // 8
				itemStyle: {
					color: '#ffff',
					borderWidth: 1, // 2
					borderColor: '#00FFFF',
				},
				lineStyle: {
					width: 2, // 4
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
		echarts.init(elMapping.get('.charts#main'));

		watchEffect(() => {
			if(
				((x :any) :x is {
					[key :string] :any
				}[] => true)
				(options.series[0].data)
			) {
				options.series[0].data = props.value;

				echarts
					.getInstanceByDom(elMapping.get('.charts#main')!)
					?.setOption(options);
			}
		});
	});
</script>


<!-- 

						value: [
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


 -->