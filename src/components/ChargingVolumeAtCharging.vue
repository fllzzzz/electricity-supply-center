<style scoped lang="scss">
	.charging-volume-at-charging {
		width: 100%;height: 100%;
		padding: vw(36) vw(37) vw(10) vw(44);

		&__wrapper {
			width: 100%;height: 100%;
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
		}

		&__wrapper__header {
			max-width: 100%;
			height: vw(190);
			margin-bottom: vw(66);
			display: flex;
			flex-flow: row nowrap;
			.item {
				width: vw(295);
				height: 100%;
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-around;
				margin-right: vw(19);
				&:last-child {margin-right: unset;}
				position: relative;
				.block {
					display: flex;
					&:nth-child(1) {
						flex-flow: row nowrap;
						margin-bottom: vw(36);
						.col:nth-child(1) {
							width: vw(80);
							height: vw(90);
							background-image: var(--bg-image);
							background-repeat: no-repeat;
							background-size: 100% 100%;
							margin-right: vw(8);
						}
						.col:nth-child(2) {
							margin-top: vw(10);
							display: flex;
							flex-flow: column nowrap;
							& > span {
								line-height: vw(27);
								font-size: vw(28);
								font-family: Source Han Sans CN;
								font-weight: 500;
								color: #FFFFFF;
								opacity: 0.8;
								margin-bottom: vw(16);
							}
							& > .wrapper {
								display: flex;
								flex-flow: row nowrap;
								align-items: center;
								span:nth-child(1) {
									line-height: vw(28);
									font-size: vw(38);
									font-family: DINPro;
									font-weight: 500;
									color: #00FFC0;
									margin-right: vw(6);
								}
								span:nth-child(2) {
									line-height: vw(18);
									font-size: vw(24);
									font-family: Source Han Sans CN;
									font-weight: 400;
									color: #00FFC0;
									opacity: 0.8;
									margin-top: vw(5);
								}
							}
						}
					}
					&:nth-child(2) {
						align-self: flex-end;
						margin-right: vw(2);
						display: flex;
						flex-flow: column nowrap;
						.row {
							display: flex;
							flex-flow: row nowrap;
							justify-content: flex-start;
							align-items: center;
							margin-bottom: vw(18);
							&:last-child {margin-bottom: unset;}
							span:nth-child(1) {
								line-height: vw(23);
								font-size: vw(24);
								font-family: Source Han Sans CN;
								font-weight: 500;
								color: #FFFFFF;
								opacity: 0.8;
								margin-right: vw(15);
							}
						}
						.row.--is-normal {
							span:nth-child(2) {
								display: none;
							}
							span:nth-child(3) {
								line-height: vw(18);
								font-size: vw(24);
								font-family: DINPro;
								font-weight: 500;
								color: #FFFFFF;
							}
						}
						.row.--is-upper {
							span:nth-child(2) {
								width: 0;
								height: 0;
								border-bottom: vw(15) solid #FF3232;
								border-left: vw(8) solid transparent;
								border-right: vw(8) solid transparent;
								margin-right: vw(7);
							}
							span:nth-child(3) {
								line-height: vw(18);
								font-size: vw(24);
								font-family: DINPro;
								font-weight: 500;
								color: #FF3232;
								opacity: 0.8;
							}
						}
						.row.is-lower {
							span:nth-child(2) {
								width: 0;
								height: 0;
								border-top: vw(15) solid #00FFCC;
								border-left: vw(8) solid transparent;
								border-right: vw(8) solid transparent;
								margin-right: vw(7);
							}
							span:nth-child(3) {
								line-height: vw(18);
								font-size: vw(24);
								font-family: DINPro;
								font-weight: 500;
								color: #00FFCC;
								opacity: 0.8;
							}
						}
					}
				}
			}
			.item:nth-child(2n-1) {
				.split-line {
					position: absolute;
					right: 0;
					top: 0;
					width: vw(2);
					height: vw(80);
					background: linear-gradient(0deg, #5A6A6C 0%, #00FFDE 50%, #3E5155 100%);
					opacity: 0.66;
				}
			}
		}

		&__wrapper__body {
			height: vw(1296);
			width: 100%;
			max-height: 100%;
			overflow: hidden;
		}

		&__wrapper__body__item {
			width: 100%;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			margin-bottom: vw(44);
			&:last-child {margin-bottom: unset;}
			.row {
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				&:nth-child(1) {
					height: vw(45);
					background: rgba(0,199,217,0.4);
					margin-bottom: vw(25);
					.graph.line {
						margin-left: vw(17);
						margin-right: vw(12);
						width: vw(3);
						height: vw(20);
						background: #00FFFF;
						border-radius: vw(1);
					}
					span {
						line-height: vw(25);
						font-size: vw(26);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						margin-top: vw(5);
					}
				}
				&:nth-child(2) {
					.col {
						margin-right: vw(51);
						&:last-child {margin-right: unset;}
						display: flex;
						flex-flow: row nowrap;
						.block {
							display: flex;
							&:nth-child(1) {
								width: vw(78);
								height: vw(78);
								background-image: var(--bg-image);
								background-repeat: no-repeat;
								background-size: 100% 100%;
								margin-right: vw(15);
							}
							&:nth-child(2) {
								display: flex;
								flex-flow: column nowrap;
								& > .wrapper {
									display: flex;
									flex-flow: row nowrap;
									align-items: center;
									margin-bottom: vw(17);
									span {
										&:nth-child(1) {
											line-height: vw(28);
											font-size: vw(38);
											font-family: DINPro;
											font-weight: 500;
											color: #00FFFF;
											margin-right: vw(6);
										}
										&:nth-child(2) {
											line-height: vw(18);
											font-size: vw(24);
											font-family: Source Han Sans CN;
											font-weight: 400;
											color: #00FFFF;
											opacity: 0.8;
											margin-top: vw(8);
										}
									}
								}
								& > span {
									white-space: nowrap;
									line-height: vw(23);
									font-size: vw(24);
									font-family: Source Han Sans CN;
									font-weight: 400;
									color: #FFFFFF;
									opacity: 0.8;
								}
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '充电桩充电量'
		}"
	>
		<div class="charging-volume-at-charging">
			<div class="charging-volume-at-charging__wrapper">
				<div class="charging-volume-at-charging__wrapper__header">
					<div v-for="d, i in config.main" :key="i"
						class="item"
					>
						<div class="block">
							<div class="col"
								:style="{
									'--bg-image': `url(${d.image})`
								}"
							></div>
							<div class="col">
								<span>{{ d.name }}</span>
								<div class="wrapper">
									<span>{{ d.value }}</span>
									<span>kw·h</span>
								</div>
							</div>
						</div>
						<div class="block">
							<div class="row"
								:class="getDoDAndYoYClass(d.YOY)"
							>
								<span>同比</span>
								<span></span>
								<span>{{ d.YOY }}%</span>
							</div>
							<div class="row"
							:class="getDoDAndYoYClass(d.DOD)"
							>
								<span>环比</span>
								<span></span>
								<span>{{ d.DOD }}%</span>
							</div>
						</div>
						<div class="split-line"></div>
					</div>
				</div>
				<div class="charging-volume-at-charging__wrapper__body">
					<NScrollbar style="max-height: 100%" trigger="hover">
						<div v-for="d, i in config.item" :key="i"
							class="charging-volume-at-charging__wrapper__body__item"
						>
							<div class="row">
								<div class="graph line"></div>
								<span>{{ d.title }}</span>
							</div>
							<div class="row">
								<div v-for="_d, _i in d.dataList" :key="_i"
									class="col"
								>
									<div class="block"
										:style="{
											'--bg-image': `url(${_d.image})`
										}"
									></div>
									<div class="block">
										<div class="wrapper">
											<span>{{ _d.value }}</span>
											<span>kw·h</span>
										</div>
										<span>{{ _d.name }}</span>
									</div>
								</div>
							</div>
						</div>
					</NScrollbar>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';

import {
	NScrollbar
} from 'naive-ui';

import {
	reactive
} from 'vue';

interface Data {
	name :string;
	value :number;
	image :string;
};

interface Main extends Data {
	YOY :number;	/* 同比 */
	DOD :number;	/* 环比 */
};

interface Item {
	title :string;
	dataList :Data[];
};

interface Config {
	main :Main[];
	item :Item[];
};

const config = reactive<Config>({
	main: [
		{
			name: '总充电量',
			value: 88639,
			image: require<string>('@images/充电桩icon.png'),
			DOD: -18.64,
			YOY: 3.72
		},
		{
			name: '单日总充电量',
			value: 2463,
			image: require<string>('@images/充电桩icon.png'),
			DOD: 26.57,
			YOY: -33.03
		},
	],
	item: [
		{
			title: '1号充电桩',
			dataList: [
				{
					name: '充电桩总充电量',
					value: 12952,
					image: require<string>('@images/充电.png')
				},
				{
					name: '充电桩单日充电量',
					value: 463,
					image: require<string>('@images/充电.png')
				},
			]
		}
	].map(item => {
		const result :(typeof item)[] = [];

		for(let i=0; i <= 7; i++) {
			result.push(item);
		}

		return result;
	}).reduce((a, b) => a.concat(b))
});


const getDoDAndYoYClass = (
	number :number
) => {
	if(number === 0) return '--is-normal';
	if(number > 0) return '--is-upper';
	if(number < 0) return 'is-lower';
}
</script>

