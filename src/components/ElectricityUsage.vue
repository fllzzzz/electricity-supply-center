<style lang="scss" scoped>
	.electricity-usage {
		width: 100%;
		height: 100%;
		padding: vw(36) vw(40) 0 vw(40);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
			align-items: center;
		}

		&__wrapper__main-value  {
			width: vw(606);
			height: vw(148);
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			margin-bottom: vw(62);
			.row {
				&:nth-child(1) {
					width: 100%;
					height: vw(80);
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: flex-end;
					.graph.dot {
						width: vw(15);
						height: vw(15);
						background: #6EFFF6;
						border-radius: 50%;
						margin-left: vw(20);
						margin-right: vw(30);
						margin-bottom: vw(6);
					}
					span {
						line-height: 1;
						&#value {
							height: 100%;
							font-size: vw(85);
							font-family: Myriad Pro;
							font-weight: 400;
							color: #51F8DE;
						}
						&#util {
							width: vw(92);
							height: vw(30);
							font-size: vw(26);
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #51F8DE;
						}
					}
				}

				&:nth-child(2) {
					width: 100%;
					height: vw(46);
					display: flex;
					align-items: center;
					justify-content: center;
					background-color: rgba(81, 248, 222, 0.1);
					span {
						line-height: 1;
						height: vw(19);
						font-size: vw(24);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.75;
					}
				}
			}

		}

		&__wrapper__item-value {
			width: 100%;
			height: vw(133);
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: vw(67);
			.col {
				height: 100%;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
				#name {
					height: vw(62);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					background-image: url('@images/按钮_1.png');
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					span {
						display: inline-block;
						line-height: 1;
						overflow: hidden;
						height: vw(30);
						font-size: vw(32);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: vw(35);
						margin-right: vw(34);
					}
				}
				#value {
					span {
						display: inline-block;
						line-height: 1;
						height: vw(45);
						font-size: vw(60);
						font-family: DINPro;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
		}

		&__wrapper__charts {
			width: vw(604);
			height: vw(303);
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			.row {
				&:nth-child(1) {
					width: 100%;
					height: vw(52);
					background-color: rgba(81, 248, 222, 0.1);
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					align-items: center;
					span {
						line-height: 1;
					}
					.col {
						&:nth-child(1) {
							margin-left: vw(17);
							span {
								height: vw(24);
								font-size: vw(26);
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
							}
						}
						&:nth-child(2) {
							margin-right: vw(33);
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-start;
							align-items: center;
							span {
								height: vw(22);
								font-size: vw(24);
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #E3E3E3;
								margin-left: vw(33);
								&:first-child {
									margin-left: unset;
								}
							}
						}
					}
				}
				&:nth-child(2) {
					height: vw(212);
					max-width: 100%;
					min-width: vw(518);
					overflow: hidden;
				}
			}
		}
	}
</style>

<template>
	<Card
		id="electricity-usage"
		:config="{
			title: '用电情况'
		}"
	>
		<div class="electricity-usage">
			<div class="electricity-usage__wrapper">
				<div class="electricity-usage__wrapper__main-value">
					<div class="row">
						<span id="value">{{ config.mainVlaue }}</span>
						<div class="graph dot"></div>
						<span id="util">kW·h</span>
					</div>
					<div class="row">
						<span>光伏总发电量</span>
					</div>
				</div>
				<div class="electricity-usage__wrapper__item-value">
					<template
						v-for="(item, index) in config.itemValue"
						:key="index"
					>
						<div class="col">
							<div id="name">
								<span>{{ item.name }}</span>
							</div>
							<div id="value">
								<span>{{ item.value }}</span>
							</div>
						</div>
					</template>
				</div>
				<div class="electricity-usage__wrapper__charts">
					<div class="row">
						<div class="col">
							<span>{{ config.chartsInfo.title }}</span>
						</div>
						<div class="col">
							<template
								v-for="(item, index) in config.chartsInfo.dataList"
								:key="index"
							>
								<span>{{ item.name }}</span>
							</template>
						</div>
					</div>
					<div class="row">
						<ElectricityUsageCharts
						:value="config.chartsInfo.dataList[0].values"
						></ElectricityUsageCharts>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import ElectricityUsageCharts from '@/components/ElectricityUsageCharts.vue';
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	type Config = {
		mainVlaue :number;
		itemValue :{
				name :string;
				value :number;
		}[];
		chartsInfo :{
			title :string;
			dataList :{
				name :string,
				values: number[][]
			}[]
		};
	};

	const config = reactive<Config>({
		mainVlaue: 745,
		itemValue: [
			{
				name: '储能总储电量',
				value: 255
			},
			{
				name: '充电桩总充电量',
				value: 614
			},
		],
		chartsInfo: {
			title: '余电上网总电量',
			dataList: [
				{
					name: '日',
					values: [
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
				},
				{
					name: '月',
					values: []
				},
				{
					name: '年',
					values: []
				},
			]
		}

	});
</script>