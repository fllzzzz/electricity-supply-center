<style lang="scss" scoped>
	.card {
		position: absolute;
		pointer-events: auto;
		z-index: 6000;
		img {
			width: 100%;
			height: 100%;
			object-fit: fill;
		}
	}
</style>

<template>
	<template
		v-for="(item, index) in getCardGroup"
		:key="index"
	>
		<div class="card" :style="{
				width: (item.size[0] / 3840 * 100).toString() + 'vw',
				height: (item.size[1] / 3840 * 100).toString() + 'vw',
				left: (item.position[0] / 3840 * 100).toString() + 'vw',
				top: (item.position[1] / 3840 * 100).toString() + 'vw',
			}">
			<template
				v-if="typeof item.instance === 'string'"
			>
				<img :src="item.instance">
			</template>
			<template
				v-else
			>
				<component :is="item.instance"></component>
			</template>
		</div>
	</template>
</template>

<script setup lang="ts">
	import {
		overview,
		iframe
	} from '@/store';

	import {
		computed,
		onMounted,
		onUnmounted,
		defineAsyncComponent
	} from 'vue';

	const getCardGroup = computed(() => {
		const cardGroupName = cardGroupNameMap.get(overview.store.model as string);

		const targetKey = Object.keys(cardGroupList)
			.find(key => key === cardGroupName);

		if(targetKey) return cardGroupList[targetKey as keyof typeof cardGroupList];
		return cardGroupList.default;
	});

	const cardGroupNameMap = new Map<string, string>([
		['光伏区域', 'photovoltaic'],
		['储能区域', 'energyStorage'],
		['充电桩', 'chargingPost'],
		['智慧农业', 'agriculture'],
	]);

	const cardGroupList :{
		[key :string] :{
			position :[number, number],
			size :[number, number],
			instance :unknown
		}[]
	} = {
		default: [
			{
				position: [32, 197],
				size: [684, 488],
				instance: defineAsyncComponent(
					() => import('@/components/SpaceOverview.vue')
				)
			},
			{
				position: [32, 724],
				size: [684, 486],
				instance: defineAsyncComponent(
					() => import('@/components/DeviceInfo.vue')
				)
			},
			{
				position: [3122, 191],
				size: [684, 926],
				instance: defineAsyncComponent(
					() => import('@/components/ElectricityUsage.vue')
				)
			},
			{
				position: [3122, 1156],
				size: [684, 790],
				instance: defineAsyncComponent(
					() => import('@/components/EmphasisMonitor.vue')
				)
			},
		],
		photovoltaic: [
			{
				position: [32, 192],
				size: [686, 730],
				instance: defineAsyncComponent(
					() => import('@/components/PhotovoltaicGeneratingCapacity.vue')
				)
			},
			{
				position: [32, 954],
				size: [686, 428],
				instance: defineAsyncComponent(
					() => import('@/components/EarningsOverview.vue')
				)
			},
			{
				position: [32, 1412],
				size: [686, 532],
				instance: defineAsyncComponent(
					() => import('@/components/RealTimePowerAndIrradiance.vue')
				)
			},
			{
				position: [3122, 192],
				size: [686, 715],
				instance: defineAsyncComponent(
					() => import('@/components/InternetAccessStatistics.vue')
				)
			},
			{
				position: [3122, 945],
				size: [686, 751],
				instance: defineAsyncComponent(
					() => import('@/components/EnergyConservation.vue')
				)
			},
			{
				position: [3122, 1728],
				size: [686, 223],
				instance: defineAsyncComponent(
					() => import('@/components/LightSimulation.vue')
				)
			},
		],
		energyStorage: [
			{
				position: [32, 192],
				size: [686, 428],
				instance: require<string>('@images/电池电量.png')
			},
			{
				position: [32, 652],
				size: [686, 730],
				instance: defineAsyncComponent(
					() => import('@/components/ImpulseDischargeStatistics.vue')
				)
			},
			{
				position: [32, 1414],
				size: [686, 530],
				instance: require<string>('@images/功率.png')
			},
			{
				position: [3122, 192],
				size: [686, 584],
				instance: require<string>('@images/充放电次数.png')
			},
			{
				position: [3122, 808],
				size: [686, 510],
				instance: require<string>('@images/储能寿命.png')
			},
			{
				position: [3122, 1350],
				size: [686, 594],
				instance: require<string>('@images/电池温度监控.png')
			},
		],
		chargingPost: [
			{
				position: [32, 194],
				size: [686, 1366],
				instance: require<string>('@images/充电桩用电量.png')
			},
			{
				position: [32, 1562],
				size: [686, 352],
				instance: require<string>('@images/充电次数.png')
			},
			{
				position: [3122, 191],
				size: [686, 526],
				instance: defineAsyncComponent(
					() => import('@/components/ChargingTime.vue')
				)
			},
			{
				position: [3122, 563],
				size: [686, 760],
				instance: require<string>('@images/充电桩收益.png')
			},
			{
				position: [3122, 1350],
				size: [686, 594],
				instance: require<string>('@images/充电桩铭牌.png')
			},
		],
		agriculture: [
			{
				position: [32, 194],
				size: [686, 418],
				instance: require<string>('@images/传感器数据.png')
			},
			{
				position: [32, 644],
				size: [686, 730],
				instance: require<string>('@images/光伏总发电量.png')
			},
			{
				position: [32, 1406],
				size: [686, 428],
				instance: defineAsyncComponent(
					() => import('@/components/EnergyConservation.vue')
				)
			},
			{
				position: [3122, 192],
				size: [686, 637],
				instance: require<string>('@images/灌溉次数-时长.png')
			},
			{
				position: [3122, 861],
				size: [686, 547],
				instance: defineAsyncComponent(
					() => import('@/components/GreenhousePhotovoltaicElectricityStatistics.vue')
				)
			},
			{
				position: [3122, 1440],
				size: [686, 504],
				instance: defineAsyncComponent(
					() => import('@/components/AgriculturalLoad.vue')
				)
			},
		],
	}

	onMounted(() => {
		iframe.toUEMessage.value = {
			ctid: 10111
		};
	});

	onUnmounted(() => {
		overview.store.model = undefined;
	});
</script>