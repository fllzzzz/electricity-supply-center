<style lang="scss" scoped>
	@font-face {
		font-family: DIN;
		src: url('@fonts/DIN-Light.otf');
	}

	.hotovoltaic-electrical-energy {
		width: 100%;
		height: 100%;

		&__wrapper {
			width: 100%;
			height: 100%;
			padding: vw(18) 0 0 vw(30);
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: center; 
		}

		&__wrapper__all-electrical-energy {
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			height: vw(70);
			margin-bottom: vw(32);
			.col {
				height: 100%;
				span {
					line-height: 1;
				}
				&:nth-child(1) {
					width: vw(209);
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					align-items: center;
					img {
						width: vw(70);
						height: vw(70);
						object-fit: fill;
					}
					span {
						width: vw(131);
						height: vw(30);
						font-size: vw(32);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
				&:nth-child(2) {
					margin-left: vw(23);
					margin-right: vw(37);
					max-width: 100%;
					overflow: hidden;
					span {
						height: vw(53);
						font-size: vw(72);
						font-family: DINPro;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				&:nth-child(3) {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					span {
						width: vw(74);
						height: vw(24);
						font-size: vw(28);
						font-family: Source Han Sans CN;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
		}

		&__wrapper__histoty-electrical-energy {
			width: vw(612);
			height: vw(450);
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			.block {
				span {
					line-height: 1;
				}
				&:nth-child(1) {
					width: 100%;
					height: vw(52);
					background-color: rgba(81, 248, 222, 0.1);
					display: flex;
					justify-content: flex-start;
					align-items: center;
					padding-left: vw(11);
					span {
						height: vw(30);
						font-size: vw(32);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
				&:nth-child(2) {
					width: vw(603);
					height: vw(367);
				}
			}
		}
	}
</style>

<template>
	<Card
		id="hotovoltaic-electrical-energy"
		:config="{
			title: '光伏发电量'
		}"
	>
		<div class="hotovoltaic-electrical-energy">
			<div class="hotovoltaic-electrical-energy__wrapper">
				<div class="hotovoltaic-electrical-energy__wrapper__all-electrical-energy">
					<div class="col">
						<img src="@images/发电总量.png">
						<span>发电总量</span>
					</div>
					<div class="col">
						<span>{{ props.config.allElectricaEnergy.value }}</span>
					</div>
					<div class="col">
						<span>kW·h</span>
					</div>
				</div>
				<div class="hotovoltaic-electrical-energy__wrapper__histoty-electrical-energy">
					<div class="block">
						<span>历史发电量</span>
					</div>
					<div class="block">
						<BesselCurveBarChart
							:config="config"
						></BesselCurveBarChart>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import * as echarts from 'echarts/core'
	import BesselCurveBarChart 
	from '@/components/BesselCurveBarChart.vue';

	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	import type * as BesselCurveBarChartType 
	from '@/components/BesselCurveBarChart.vue';

	import type {
		PropType
	} from 'vue';

	type Config = {
		allElectricaEnergy :{
			value :number;
		}
		historyElectricaEnergy :{}
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			default: {
				allElectricaEnergy: {
					value: 2813.78
				},
				historyElectricaEnergy: {

				}
			} as Config,
		}
	});

	const config = reactive<BesselCurveBarChartType.Config>({
		designWidth: 3840,
		yAxisName: '单位/kW·h',
		fonts: {
			itemIndicator: {
				size: 32,
				family: 'DIN',
				fill: '#FFFFFF',
				weight: 'bolder'
			},
			xAxis: {
				size: 24,
				family: 'Source Han Sans CN',
				fill: '#FFFFFF',
				weight: 'normal'
			},
			yAxis: {
				size: 24,
				family: 'DIN',
				fill: '#FFFFFF',
				weight: 'normal'
			},
			yAxisName: {
				size: 24,
				family: 'Source Han Sans CN',
				fill: '#FFFFFF',
				weight: 'normal',
			}
		},
		data: [
			['0时', 50],
			['2时', 10],
			['4时',	20],
			['6时',	30],
			['8时', 40],
			['10时', 60],
			['12时', 60],
		] as [string, number][],
		stroke: 'rgba(248, 181, 81, 1)',
		fill: (() => {
			return new echarts.graphic.LinearGradient(
				0, 0, 0, 1, [
					{
						offset: 0,
						color: 'rgba(248, 181, 81, 1)'
					},
					{
						offset: 1,
						color: 'rgba(248, 181, 81, 0.6)'
					},
				]
			);
		})(),
	});
</script>