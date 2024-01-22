<style scoped lang="scss">
	.revenue-from-charging-piles {
		width: 100%;height: 100%;
		padding: vw(46) 0 0 vw(61);

		&__wrapper {
			width: 100%;height: 100%;
			display: flex;
			flex-flow: column nowrap;
			justify-content: flex-start;
		}

		&__wrapper__header {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			height: vw(183);
			margin-bottom: vw(63);
			.item {
				margin-right: vw(80);
				&:last-child {margin-right: unset;}
				display: flex;
				flex-flow: column nowrap;
				align-items: center;
				justify-content: space-between;
				.block:nth-child(1) {
					display: flex;
					margin-bottom: vw(41);
					span {
						line-height: vw(22);
						font-size: vw(24);
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.6;
					}
				}
				.block:nth-child(2) {
					width: vw(227);
					height: vw(120);
					background-repeat: no-repeat;
					background-size: 100% 100%;
					background-image: var(--bg-image);
					position: relative;
					span {
						position: absolute;
						&:nth-child(1) {
							line-height: vw(55);
							font-size: vw(74);
							font-family: DINPro;
							font-weight: 500;
							color: #FFFFFF;
							top: vw(-16);
							left: 50%;
							transform: translateX(-50%);
						}
						&:nth-child(2) {
							white-space:nowrap;
							color: var(--util-color);
							line-height: vw(25);
							font-size: vw(29);
							font-family: Adobe Heiti Std;
							font-weight: normal;
							top: vw(14);
							left: vw(210);
						}
					}
				}
			}
		}

		&__wrapper__body {
			display: flex;
			flex-flow: column nowrap;
			align-items: flex-start;
			margin-left: vw(22);
			.row {
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				margin-bottom: vw(43);
				&:last-child {margin-bottom: unset;}
				.col {
					display: flex;
					align-items: center;
					&:nth-child(1) {
						width: vw(35);
						height: vw(41);
						background-repeat: no-repeat;
						background-size: 100% 100%;
						background-image: var(--bg-image);
						margin-right: vw(8);
					}
					&:nth-child(2) {
						span {
							line-height: vw(27);
							font-size: vw(28);
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
							opacity: 0.8;
						}
					}
					&:nth-child(3) {
						margin-left: vw(57);
						margin-right: vw(40);
						span {
							line-height: vw(40);
							font-size: vw(54);
							font-family: DINPro;
							font-weight: 500;
							color: #FFFFFF;
							opacity: 0.8;
						}
					}
					&:nth-child(4) {
						span {
							line-height: vw(26);
							font-size: vw(28);
							font-family: Adobe Heiti Std;
							font-weight: normal;
							color: #FFFFFF;
							opacity: 0.8;
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
			title: '充电桩收益'
		}"
	>
		<div class="revenue-from-charging-piles">
			<div class="revenue-from-charging-piles__wrapper">
				<div class="revenue-from-charging-piles__wrapper__header">
					<div v-for="d, i in config.header" :key="i"
						class="item"
					>
						<div class="block">
							<span>{{ d.name }}</span>
						</div>
						<div class="block"
							:style="{
								'--bg-image': `url(${d.image})`,
								'--util-color': d.color
							}"
						>
							<span>{{ d.value }}</span>
							<span>{{ d.util }}</span>
						</div>
					</div>
				</div>
				<div class="revenue-from-charging-piles__wrapper__body">
					<div v-for="d, i in config.body" :key="i"
						class="row"
					>
						<dic class="col"
							:style="{
								'--bg-image': `url(${d.image})`,
							}"
						></dic>
						<dic class="col">
							<span>{{ d.name }}:</span>
						</dic>
						<dic class="col">
							<span>{{ d.value }}</span>
						</dic>
						<dic class="col">
							<span>{{ d.util }}</span>
						</dic>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">	
import Card from '@/components/Card.vue';

import {
	reactive
} from 'vue';

interface Data {
	name :string;
	value :number;
	util :string;
	image :string;
	color? :string;
};

interface Config {
	header :Data[];
	body :Data[];
};

const config = reactive<Config>({
	header: [
		{
			name: '总营收',
			value: 685,
			util: '万元',
			image: require<string>('@images/总计数-图形3.png'),
			color: '#D0750C'
		},
		{
			name: '充电桩总数',
			value: 685,
			util: '台',
			image: require<string>('@images/总计数-图形.png'),
			color: '#10D20D'
		},
	],
	body: [
		{
			name: '今日营收金额',
			value: 15400,
			util: '元',
			image: require<string>('@images/当日营收金额.png'),
		},
		{
			name: '当日净入金额',
			value: 1614,
			util: '元',
			image: require<string>('@images/当日营收金额.png'),
		},
		{
			name: '充电桩数',
			value: 7,
			util: '台',
			image: require<string>('@images/充电桩数.png'),
		},
		{
			name: '充电桩使用率',
			value: 91,
			util: '%',
			image: require<string>('@images/充电桩数.png'),
		},
	]
});
</script>

