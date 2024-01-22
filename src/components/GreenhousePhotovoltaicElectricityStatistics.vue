<style lang="scss" scoped>
	@font-face {
		font-family: DIN;
		src: url('@fonts/DIN-Light.otf');
	}

	.greenhouse-photovoltaic-electricity-statistics {
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
			margin-bottom: vw(47);
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			.block {
				height: 100%;
				margin-right: vw(36);
				&:last-child {margin-right: unset;}
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				.col {
					margin-right: vw(23);
					&:last-child {margin-right: unset;}
					&:nth-child(1) {
						width: vw(67);
						height: vw(78);
						img {
							width: 100%;
							height: 100%;
							object-fit: fill;
						}
					}
					&:nth-child(2) {
						height: 100%;
						display: flex;
						flex-flow: column nowrap;
						.row {
							
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-start;
							align-items: center;
							margin-bottom: vw(24);
							&:last-child {margin-bottom: unset;}
							&:nth-child(1) {
								span {
									height: vw(32);
									font-size: vw(32);
									font-family: Source Han Sans CN;
									font-weight: 400;
									color: #FFFFFF;
								}
							}
							&:nth-child(2) {
								span {
									&:nth-child(1) {
										height: vw(36);
										font-size: vw(36);
										font-family: DIN;
										font-weight: bold;
										color: #FFFFFF;
									}
									&:nth-child(2) {
										align-self: flex-end;
										height: vw(28);
										font-size: vw(28);
										font-family: Source Han Sans CN;
										font-weight: 400;
										color: #FFFFFF;
										opacity: 0.6;
										margin-left: vw(26);
									}
								}
							}
						}
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
		id="greenhouse-photovoltaic-electricity-statistics"
		:config="{
			title: '大棚光伏电量统计'
		}"
	>
		<div class="greenhouse-photovoltaic-electricity-statistics">
			<div class="greenhouse-photovoltaic-electricity-statistics__wrapper">
				<div class="greenhouse-photovoltaic-electricity-statistics__wrapper__total-value">
					<div v-for="(data, i) in config.dataList" :key="i"
						class="block"
					>
						<div class="col">
							<img src="@images/组 1877.png">
						</div>
						<div class="col">
							<div class="row">
								<span>{{ data.name }}</span>
							</div>
							<div class="row">
								<span>{{ data.value }}</span>
								<span>kW·h</span>
							</div>
						</div>
					</div>
				</div>
				<div class="greenhouse-photovoltaic-electricity-statistics__wrapper__capacit">
					<div class="block">
						<CardDataSwitch
							:default-active="1"
							:config="dataSwitchConfig"
						></CardDataSwitch>
					</div>
					<div class="block">
						<BarCoverGroup
							:config="barCoverGroupConfig"
						></BarCoverGroup>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import type {
		Config as BarCoverGroupType
	} from '@/components/ChartsBarCoverGroup.vue';

	import type {
		Config as DataSwitchType
	} from './CardDataSwitch.vue';

	import BarCoverGroup from '@/components/ChartsBarCoverGroup.vue';
	import CardDataSwitch from '@/components/CardDataSwitch.vue';
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	interface Data {
		name :string;
		value :number;
	}

	interface Config {
		dataList :Data[]
	};

	const config = reactive<Partial<Config>>({
		dataList: [
			{
				name: '累计发电量',
				value: 900.22,
			},
			{
				name: '累计耗电量',
				value: 520.88,
			},
		]
	});

	const dataSwitchConfig = reactive<DataSwitchType>({
		name: '冲放电量统计',
		optionList: [
			'日',
			'月',
		]
	});

	const barCoverGroupConfig = reactive<BarCoverGroupType>({
		designWidth: 3840,
		data: [
			['item1', 10, 20],
			['item2', 10, 20],
			['item3', 10, 20],
			['item4', 10, 20],
			['item5', 10, 20],
		],
		legendOptions: {
			gap: 49,
			grid: {
				right: 1,
			},
			fontOptions: {
				size: 24,
				color: '#FFFFFF',
				family: 'Source Han Sans CN'
			},
			data: [
				{
					name: '发电量',
					color: {
						type: 'linear',
						x: 0, y: 0, x2: 0, y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(255, 150, 0, 1)'
							},
							{
								offset: 1,
								color: 'rgba(255, 150, 0, 0.2)'
							}
						]
					}
				},
				{
					name: '耗电量',
					color: {
						type: 'linear',
						x: 0, y: 0, x2: 0, y2: 1,
						colorStops: [
							{
								offset: 0,
								color: 'rgba(0, 255, 234, 1)'
							},
							{
								offset: 1,
								color: 'rgba(0, 255, 234, 0.2)'
							}
						]
					}
				}
			]
		},
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
				color: '#FFFFFF'
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
					color: '#FFFFFF'
				},
				padding: [0, 0, 40, 0]
			},
			fontOptions: {
				size: 24,
				family: 'DIN',
				color: '#FFFFFF'
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
				color: '#FFFFFF'
			}
		}
	});
</script>