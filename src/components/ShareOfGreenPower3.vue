<style scoped lang="scss">
.share-of-green-power-3 {
	width: 100%;
	height: 100%;
	padding: vw(27) 0 0 vw(48);

	&__wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		align-items: center;
	}

	&__wrapper__header {
		width: vw(543);
		height: vw(184);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		margin-bottom: vw(21);
		.block {
			width: vw(227);
			height: 100%;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: center;
			.row {
				width: 100%;
				&:nth-child(1) {
					display: flex;
					align-items: center;
					justify-content: center;
					height: vw(32);
					font-size: vw(32);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: var(--color);
				}
				&:nth-child(2) {
					height: vw(120);
					position: relative;
					img {
						width: 100%;
						height: 100%;
						object-fit: fill;
					}
					span {
						position: absolute;
						top: vw(-11);
						left: 50%;
						transform: translateX(-50%);
						height: vw(54);
						font-size: vw(54);
						font-family: DIN;
						font-weight: bold;
						color: #FFFFFF;
					}
				}
			}
		}
	}

	&__wrapper__split-line {
		width: vw(564);
		height: vw(2);
		background: #20969D;
		opacity: 0.2;
		border-radius: vw(1);
		margin-bottom: vw(27);
	}

	&__wrapper__ring {
		width: vw(582);
		height: vw(482);
		margin-bottom: vw(28);
		span {
			height: vw(32);
			font-size: vw(32);
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: #FFFFFF;
		}
	}

	&__wrapper__footer {
		width: 100%;
		padding-right: vw(56);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		.block {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			&::before {
				content: '';
				display: inline-block;
				width: vw(16);
				height: vw(16);
				background: var(--color);
				margin-right: vw(16);
			}
			span {
				&:nth-child(1) {
					height: vw(28);
					font-size: vw(28);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.6;
					margin-right: vw(11);
				}
				&:nth-child(2) {
					height: vw(32);
					font-size: vw(32);
					font-family: DIN;
					font-weight: bold;
					color: #FFFFFF;
					opacity: 0.75;
				}
			}
		}
	}
}
</style>

<template>
	<Card 
		:config="{
			title: '3号楼绿电占比'
		}"
	>
		<div class="share-of-green-power-3">
			<div class="share-of-green-power-3__wrapper">
				<div class="share-of-green-power-3__wrapper__header">
					<div v-for="(data, i) in config.headerList" :key="i"
						class="block"
						:style="{
							'--color': data.color
						}"
					>
						<div class="row">
							<span>{{ data.name }}</span>
						</div>
						<div class="row">
							<span>{{ data.value }}%</span>
							<img :src="imageMap.get(data.color)">
						</div>
					</div>
				</div>
				<div class="share-of-green-power-3__wrapper__split-line"></div>
				<div class="share-of-green-power-3__wrapper__ring">
					<ChartsRing
						:config="ringConfig"
						@percent="p => percentList = p"
					>
						<span>电池容量</span>
					</ChartsRing>
				</div>
				<div class="share-of-green-power-3__wrapper__footer">
					<div v-for="(percents, i) in percentList" :key="i">
						<div class="block"
							:style="{
								'--color': (ringConfig.colorMap?.get(percents.name) as string ?? '')
							}"
						>
							<span>{{ percents.name }}</span>
							<span>{{ percents.percent }}%</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import type {
	Config as RingType
} from '@/components/ChartsRing.vue';

import ChartsRing from '@/components/ChartsRing.vue';
import Card from './Card.vue';

import {
	ref,
	reactive,
} from 'vue';

interface PercentInfo {
	name: string;
	percent: number
};

interface Header {
	name :string;
	value :number;
	color :string;
};

export interface Config {
	headerList :Header[];
};

const config = reactive<Partial<Config>>({
	headerList: [
		{
			name: 'SOC',
			value: 87,
			color: '#00FF72',
		},
		{
			name: 'SOH',
			value: 94,
			color: '#00EAFF',
		}
	]
});
const percentList = ref<PercentInfo[] | undefined>();
const ringConfig = reactive<RingType>({
	designWidth: 3840,
	data: [
		['可放电量', 50],
		['可充电量', 50],
	],
	colorMap: new Map<
		string,
		Required<RingType>['colorMap'] extends
		Map<string, infer P>
		? P
		: never
	>([
		['可放电量', '#00EAFF'],
		['可充电量', '#F8B551'],
	])
});
const imageMap = new Map<string, string>([
	['#00FF72', require<string>('@images/总计数-图形.png')],
	['#00EAFF', require<string>('@images/总计数-图形2.png')],
]);
</script>

