<style scoped lang="scss">
.share-of-green-power-3 {
	width: 100%;
	height: 100%;
	padding: vw(27) 0 0 vw(51);

	&__wrapper {
		width: 100%;
		height: 100%;
	}

	&__wrapper__ring {
		width: vw(582);
		height: vw(482);
		margin-bottom: vw(48);
		span {
			height: vw(32);
			font-size: vw(32);
			font-family: Source Han Sans CN;
			font-weight: 400;
			color: red;
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
				<div class="share-of-green-power-3__wrapper__ring">
					<ChartsRing
						:config="ringConfig"
						@percent="p => percentInfo.push(p)"
					>
						<span>电量</span>
					</ChartsRing>
				</div>
				<div class="share-of-green-power-3__wrapper__content"></div>
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
	reactive
} from 'vue';

interface PercentInfo {
	name: string;
	percent: number
};

const percentInfo = ref<PercentInfo[]>([]);
const ringConfig = reactive<RingType>({
	designWidth: 3840,
	data: [
		['可放电量', 78],
		['可充电量', 40],
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
</script>

