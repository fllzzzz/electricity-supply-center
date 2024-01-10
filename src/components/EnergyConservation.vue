<style lang="scss" scoped>
	@font-face {
		font-family: DIN;
		src: url('@fonts/DIN-Light.otf');
	}

	.energy-conservation {
		width: 100%;
		height: 100%;
		padding: vw(18) 0 0 vw(32);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: column nowrap;
		}

		&__wrapper__total-value {
			height: vw(70);
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			margin-bottom: vw(32);
			max-width: 100%;
			overflow: hidden;
			.block {
				display: flex;
				align-items: center;
				justify-content: center;
				&:nth-child(1) {
					width: vw(70);
					height: vw(70);
					margin-right: vw(8);
					img {
						width: 100%;
						height: 100%;
						object-fit: fill;
					}
				}
				&:nth-child(2) {
					span {
						height: vw(32);
						font-size: vw(32);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
				&:nth-child(3) {
					margin-left: vw(19);
					margin-right: vw(22);
					span {
						height: vw(72);
						font-size: vw(72);
						font-family: DINPro;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
				&:nth-child(4) {
					span {
						height: vw(28);
						font-size: vw(28);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: vw(10);
					}
				}
			}
		}

		&__wrapper__capacit {
			flex: 1;
			width: 100%;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: flex-start;
			.block {
				&:nth-child(1) {
					width: vw(612);
					height: vw(52);
					margin-bottom: vw(31);
				}
				&:nth-child(2) {
					flex: 1;
					width: 100%;
					padding-left: vw(9);
				}
			}
		}
	}

</style>

<template>
	<Card
		id="energy-conservation"
		:config="{
			title: '节能减排'
		}"
	>
		<div class="energy-conservation">
			<div class="energy-conservation__wrapper">
				<div class="energy-conservation__wrapper__total-value">
					<div class="block">
						<img src="@images/发电总量.png">
					</div>
					<div class="block">
						<span>累计减碳排量</span>
					</div>
					<div class="block">
						<span>2813.78</span>
					</div>
					<div class="block">
						<span>t</span>
					</div>
				</div>
				<div class="energy-conservation__wrapper__capacit">
					<div class="block">
						<CardDataSwitch
							:default-active="1"
							:config="dataSwitchConfig"
						></CardDataSwitch>
					</div>
					<div class="block">
						<BesselCurveBar
							:config="besselCurveBarConfig"
						></BesselCurveBar>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import type {
		Config as BesselCurveBarType
	} from '@/components/ChartsBesselCurveBar.vue';

	import type {
		Config as DataSwitchType
	} from './CardDataSwitch.vue';

	import * as echarts from 'echarts';
	import BesselCurveBar 
	from '@/components/ChartsBesselCurveBar.vue';
	import CardDataSwitch from '@/components/CardDataSwitch.vue';
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	const dataSwitchConfig = reactive<DataSwitchType>({
		name: '减碳排量统计',
		optionList: [
			'日',
			'月',
		]
	});

	const besselCurveBarConfig = reactive<BesselCurveBarType>({
		designWidth: 3840,
		data: [
			['0时', 50],
			['2时', 10],
			['4时',	20],
			['6时',	30],
			['8时', 40],
			['10时', 60],
			['12时', 60],
		] as [string, number][],
		xAxis: {
			fontOptions: {
				size: 24,
				family: 'Source Han Sans CN',
				color: '#FFFFFF',
				weight: 'normal'
			}
		},
		yAxis: {
			name: 't',
			nameOptions: {
				padding: [0, 30, 10, 0],
				fontOptions: {
					size: 28,
					family: 'Source Han Sans CN',
					color: '#FFFFFF',
					weight: 'normal',
					lineHeight: 1,
				}
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: '#FFFFFF',
				weight: 'normal'
			}
		},
		series: {
			stroke: 'rgba(0, 255, 114, 1)',
			fill: (() => {
				return new echarts.graphic.LinearGradient(
					0, 0, 0, 1, [
						{
							offset: 0,
							color: 'rgba(0, 255, 114, 1)'
						},
						{
							offset: 1,
							color: 'rgba(0, 255, 114, 0.3)'
						},
					]
				);
			})(),
			fontOptions: {
				size: 32,
				family: 'DIN',
				color: '#FFFFFF',
				weight: 'bolder'
			},
		}
	});
</script>