<style lang="scss" scoped>
	.electricity-usage {
		width: 100%;
		width: 100%;
		padding: vw(26) 0 0 vw(36);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: column nowrap;
			span {
				line-height: 1;
			}
		}

		&__wrapper__main {
			margin-bottom: vw(28);
			height: vw(148);
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			.block {
				&:nth-child(1) {
					display: flex;
					flex-flow: row nowrap;
					span {
						&:nth-child(2),
						&:nth-child(3) {
							margin-bottom: vw(12);
						}
						&:nth-child(1) {
							height: vw(92);
							font-size: vw(92);
							font-family: Myriad Pro;
							font-weight: 400;
							color: #51F8DE;
						}
						&:nth-child(2) {
							align-self: flex-end;
							width: vw(15);
							height: vw(15);
							background: #6EFFF6;
							border-radius: 50%;
							margin-left: vw(20);
							margin-right: vw(30);
						}
						&:nth-child(3) {
							align-self: flex-end;
							height: vw(30);
							font-size: vw(36);
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #51F8DE;
						}
					}
				}
				&:nth-child(2) {
					width: 100%;
					height: vw(46);
					background-color: rgba(81, 248, 222, 0.1);
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					span {
						height: vw(23);
						font-size: vw(24);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.7;
					}
				}
			}
		}

		&__wrapper__item {
			margin-bottom: vw(47);
			height: vw(137);
			display: flex;
			flex-flow: row nowrap;
			.block {
				height: 100%;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: center;
				margin-right: vw(48);
				:last-child {
					margin-right: unset;
				}
				.row {
					display: flex;
					flex-flow: row nowrap;
					justify-content: center;
					align-items: center;
					&:nth-child(1) {
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-image: url('@images/按钮_1.png');
						span {
							overflow: hidden;
							height: vw(32);
							font-size: vw(32);
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
							margin: vw(20) vw(30) vw(20) vw(30);
						}
					}
					&:nth-child(2) {
						height: vw(45);
						font-size: vw(60);
						font-family: DINPro;
						font-weight: 500;
						color: #FFFFFF;
					}
				}
			}
		}

		&__wrapper__history {
			width: vw(604);
			height: vw(391);
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			.block {
				&:nth-child(1) {
					width: 100%;
					height: vw(52);
					background-color: rgba(81, 248, 222, 0.1);
					display: flex;
					flex-flow: row nowrap;
					justify-content: space-between;
					align-items: center;
					margin-bottom: vw(32);
					.col {
						&:nth-child(1) {
							margin-left: vw(20);
							span {
								height: vw(30);
								font-size: vw(32);
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
							}
						}
						&:nth-child(2) {
							margin-right: vw(33);
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-end;
							align-items: center;
							span {
								height: vw(27);
								font-size: vw(28);
								font-family: Adobe Heiti Std;
								font-weight: normal;
								color: #E3E3E3;
								margin-right: vw(37);
								&:last-child {
									margin-right: unset;
								}
							}
						}
					}
				}
				&:nth-child(2) {
					flex: 1;
					width: vw(570);
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
				<div class="electricity-usage__wrapper__main">
					<div class="block">
						<span>{{ props.config.mainVlaue }}</span>
						<span></span>
						<span>kW·h</span>
					</div>
					<div class="block">
						<span>光伏总发电量</span>
					</div>
				</div>
				<div class="electricity-usage__wrapper__item">
					<template
						v-for="(item, index) in props.config.itemValue"
						:key="index"
						>
							<div class="block">
								<div class="row">
									<span>{{ item.name }}</span>
								</div>
								<div class="row">
									<span>{{ item.values }}</span>
								</div>
							</div>
						</template>
				</div>
				<div class="electricity-usage__wrapper__history">
					<div class="block">
						<div class="col">
							<span>余电上网总电量</span>
						</div>
						<div class="col">
							<template
								v-for="(item, index) in props.config.chartsInfo.dataList"
								:key="index"
							>
								<span>{{ item.name }}</span>
							</template>
						</div>
					</div>
					<div class="block">
						<ChartsLineDotVue
							:config="chartsLineDotConfig"
						></ChartsLineDotVue>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import type {
		Config as ChartsLineDotType
	} from '@/components/ChartsLineDot.vue';

	import type {
		PropType
	} from 'vue';

	import ChartsLineDotVue from '@/components/ChartsLineDot.vue';
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	type Data<T> = {
		name :string;
		values :T;
	};

	type Config = {
		mainVlaue :number;
		itemValue :Data<number>[];
		chartsInfo :{
			title :string;
			dataList :Data<number[][]>[]
		};
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			default: {
				mainVlaue: 745,
				itemValue: [
					{
						name: '储能总储电量',
						values: 255
					},
					{
						name: '充电桩总充电量',
						values: 614
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
			} as Config
		}
	});

	const chartsLineDotConfig = reactive<ChartsLineDotType>({
		designWidth: 3840,
		grid: {
			top: 80,
			right: 15,
			left: 10,
			bottom: 10,
		},
		xAxis: {
			offset: 31,
			fontOptions: {
				size: 24,
				family: 'D-DIN',
				color: '#E3E3E3',
			}
		},
		yAxis: {
			name: '单位：kW·h',
			nameOptions: {
				padding: [0, 0, 21, 0],
				fontOptions: {
					size: 24,
					family: 'Adobe Heiti Std',
					color: '#FFFFFF',
				}
			},
			offset: 17,
			fontOptions: {
				size: 24,
				family: 'D-DIN',
				color: '#E3E3E3',
			}
		},
		series: {
			opacity: 0.3,
			stroke: '#0EF1EF',
			fill: {
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
			},
			symbolOptions: {
				size: 10,
				color: '#ffff',
				borderWidth: 2.5,
				borderColor: '#0EF1EF',
			},
			lineOptions: {
				width: 5
			}
		},
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
		]
	});
</script>