<style scoped lang="scss">
	.active-and-reactive-power {
		width: 100%;height: 100%;
		padding: vw(22) 0 vw(24) vw(47);

		&__chart {
			width: 100%;height: 100%;
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '有/无功功率'
		}"
	>
		<div class="active-and-reactive-power">
			<div class="active-and-reactive-power__chart">
				<Echarts
					:config="{
						chartsOptions: options,
						chartsUseList: useList,
					}"
					@rezise=" builder()"
				></Echarts>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import type {
		ComposeOption
	} from 'echarts/core';

	import type {
		DatasetComponentOption,
		GridComponentOption,
		LegendComponentOption
	} from 'echarts/components';

	import type {
		LineSeriesOption
	} from 'echarts/charts';

	import type {
		PropType
	} from 'vue';

	import ChartsService from '@/services/ChartsService';
	import Echarts from '@/components/Echarts.vue';
	import Card from '@/components/Card.vue';

	import {
		SVGRenderer
	} from 'echarts/renderers';	

	import {
		DatasetComponent,
		GridComponent,
		LegendComponent
	} from 'echarts/components';

	import {
		LineChart,
	} from 'echarts/charts';

	import {
		ref,
		watchEffect
	} from 'vue';

	type ECOption = ComposeOption<
		| DatasetComponentOption
		| LineSeriesOption
		| GridComponentOption
		| LegendComponentOption
	>;

	export interface Config {
		data :([string, number])[];
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	const config = ref<Config | undefined>();
	const options = ref<ECOption>({});
	const chartsSrv = new ChartsService({
		designWidth: 3840
	});
	const useList = [
		LineChart,
		GridComponent,
		LegendComponent,
		DatasetComponent,
		SVGRenderer
	];

	const builder = () => {
		options.value = {
			dataset: {
				sourceHeader: false,
				source: [
					['06:00', 100, 120],
					['07:00', 130, 100],
					['08:00', 80, 120],
					['09:00', 150, 80],
					['10:00', 130, 120],
				]
			},
			grid: {
				top: chartsSrv.sizeConverter(95),
				right: chartsSrv.sizeConverter(15),
				bottom: chartsSrv.sizeConverter(50),
				left: chartsSrv.sizeConverter(60)
			},
			legend: {
				align:"right",
				icon: 'rect',
				itemWidth: chartsSrv.sizeConverter(16),
				itemHeight: chartsSrv.sizeConverter(2),
				itemGap: chartsSrv.sizeConverter(33),
				textStyle: {
					fontSize: chartsSrv.sizeConverter(24),
					fontFamily: 'Source Han Sans CN',
					color: '#FFFFFF',
					padding: [0, chartsSrv.sizeConverter(15)!, 0, 0]
				},
				right: chartsSrv.sizeConverter(48),
			},
			xAxis: {
				type: 'category',
				axisLabel: {
					fontSize: chartsSrv.sizeConverter(24),
					fontFamily: 'DIN',
					color: '#FFFFFF',
					margin: chartsSrv.sizeConverter(21),
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#CCCCCC'
					},
				},
				axisTick: {
					show: true,
					alignWithLabel: true,
					lineStyle: {
						color: '#CCCCCC'
					}
				}
			},
			yAxis: {
				type: 'value',
				max: enxt => {
					return enxt.max + 50;
				},
				name: '单位：kW',
				nameTextStyle: {
					fontSize: chartsSrv.sizeConverter(24),
					fontFamily: 'Source Han Sans CN',
					color: '#FFFFFF',
					padding: [0, 0, chartsSrv.sizeConverter(32)!, 0]
				},
				splitLine: {
					lineStyle: {
						type: [
							chartsSrv.sizeConverter(10)!,
							chartsSrv.sizeConverter(10)!
						],
						dashOffset: chartsSrv.sizeConverter(5),
						color: 'rgba(204, 204, 204, 0.4)'
					}
				},
				axisLabel: {
					fontSize: chartsSrv.sizeConverter(24),
					fontFamily: 'DIN',
					color: '#FFFFFF',
					margin: chartsSrv.sizeConverter(20),
				},
				axisLine: {
					show: true,
					lineStyle: {
						color: '#CCCCCC'
					}
				}
			},
			series: [
				{
					type: 'line',
					name: '有功功率',
					smooth: true,
					symbol: 'none',
					itemStyle: {
						color: '#08B3F2'
					},
					encode: {
						x: 0,
						y: 1
					}
				},
				{
					type: 'line',
					name: '无功功率',
					symbol: 'none',
					smooth: true,
					itemStyle: {
						color: '#08F2A8'
					},
					encode: {
						x: 0,
						y: 2
					}
				},
			],
		};
	};

	watchEffect(() => {
		if(props.config) {
			config.value = props.config;
		}

		builder();
	});
</script>

