<style lang="scss" scoped>
	@font-face {
		font-family: DIN;
		src: url('@fonts/DIN-Light.otf');
	}

	.photovoltaic-generating-capacity {
		width: 100%;
		height: 100%;
		padding: vw(18) 0 0 vw(40);

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
					margin-right: vw(17);
					img {
						width: 100%;
						height: 100%;
						object-fit: fill;
					}
				}
				&:nth-child(2) {
					span {
						width: vw(163);
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
						width: vw(73);
						height: vw(28);
						font-size: vw(28);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
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
		id="photovoltaic-generating-capacity"
		:config="{
			title: '光伏发电量'
		}"
	>
		<div class="photovoltaic-generating-capacity">
			<div class="photovoltaic-generating-capacity__wrapper">
				<div class="photovoltaic-generating-capacity__wrapper__total-value">
					<div class="block">
						<img src="@images/发电总量.png">
					</div>
					<div class="block">
						<span>累计电总量</span>
					</div>
					<div class="block">
						<span>2813.78</span>
					</div>
					<div class="block">
						<span>kW·h</span>
					</div>
				</div>
				<div class="photovoltaic-generating-capacity__wrapper__capacit">
					<div class="block">
						<CardDataSwitch
							:default-active="1"
							:config="dataSwitchConfig"
						></CardDataSwitch>
					</div>
					<div class="block">
						<ChartsBarDoubeCol
							:config="barDoubeColConfig"
						></ChartsBarDoubeCol>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import type {
		Config as ChartsBarDoubeColType
	} from '@/components/ChartsBarDoubeCol.vue';

	import type {
		Config as DataSwitchType
	} from './CardDataSwitch.vue';

	import ChartsBarDoubeCol from '@/components/ChartsBarDoubeCol.vue';
	import CardDataSwitch from '@/components/CardDataSwitch.vue';
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	const dataSwitchConfig = reactive<DataSwitchType>({
		name: '发电量统计',
		optionList: [
			'日',
			'月',
		]
	});

	const barDoubeColConfig = reactive<ChartsBarDoubeColType>({
		designWidth: 3840,
		data: [
			['item1', 10],
			['item2', 20],
			['item3', 30],
			['item4', 40],
			['item5', 50],
		],
		colorMap: new Map<
			string,
			Required<ChartsBarDoubeColType>['colorMap'] extends
				Map<string, infer P>
				? P
				: never
		>([
			['barHeader', 'rgba(255, 153, 0, 0.95)'],
			['barBody', {
				type: 'linear',
				x: 0, y: 0, x2: 0, y2: 1,
				colorStops: [
					{
						offset: 0,
						color: 'rgba(255, 218, 163, 1)'
					},
					{
						offset: 1,
						color: 'rgba(255, 218, 163, 0.3)'
					}
				]
			}]
		]),
		gridOptions: {
			top: 75,
			left: 15,
			right: 10,
			bottom: 10
		},
		xAxis: {
			offset: 22,
			lineOptions: {
				show: true,
				color: '#CCCCCC',
				width: 2,
			},
			fontOptions: {
				size: 24,
				family: 'Source Han Sans CN',
				color: '#FFFFFF'
			}
		},
		yAxis: {
			offset: 20,
			max: 20,
			name: '单位/kW·h',
			nameOptions: {
				fontOptions: {
					size: 24,
					family: 'Source Han Sans CN',
					color: '#FFFFFF'
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
				color: '#FFFFFF'
			}
		},
		series: {
			width: 10,
			fontOptions: {
				size: 28,
				family: 'DIN',
				color: '#FFFFFF',
			}
		}
	});
</script>