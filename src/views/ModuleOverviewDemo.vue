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
				position: [32, 198],
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
				position: [3122, 198],
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
				position: [32, 198],
				size: [684, 730],
				instance: defineAsyncComponent(
					() => import('@/components/PhotovoltaicGeneratingCapacity.vue')
				)
			},
			{
				position: [32, 954],
				size: [684, 428],
				instance: defineAsyncComponent(
					() => import('@/components/EarningsOverview.vue')
				)
			},
			{
				position: [32, 1412],
				size: [684, 532],
				instance: defineAsyncComponent(
					() => import('@/components/RealTimePowerAndIrradiance.vue')
				)
			},
			{
				position: [3122, 198],
				size: [684, 715],
				instance: defineAsyncComponent(
					() => import('@/components/InternetAccessStatistics.vue')
				)
			},
			{
				position: [3122, 945],
				size: [684, 751],
				instance: defineAsyncComponent(
					() => import('@/components/EnergyConservation.vue')
				)
			},
			{
				position: [3122, 1728],
				size: [684, 223],
				instance: defineAsyncComponent(
					() => import('@/components/LightSimulation.vue')
				)
			},
		],
		energyStorage: [
			{
				position: [32, 198],
				size: [684, 962],
				instance: defineAsyncComponent(
					() => import('@/components/ElectricityStorage.vue')
				)
			},
			{
				position: [32, 1192],
				size: [684, 758],
				instance: defineAsyncComponent(
					() => import('@/components/ImpulseDischargeStatistics.vue')
				)
			},
			{
				position: [3122, 198],
				size: [684, 569],
				instance: defineAsyncComponent(
					() => import('@/components/ActiveAndReactivePower.vue')
				)
			},
			{
				position: [3122, 799],
				size: [684, 564],
				instance: defineAsyncComponent(
					() => import('@/components/EnergyStorageTemperature.vue')
				)
			},
			{
				position: [3122, 1395],
				size: [684, 555],
				instance: defineAsyncComponent(
					() => import('@/components/AlarmStatus.vue')
				)
			},
		],
		chargingPost: [
			{
				position: [32, 198],
				size: [684, 420],
				instance: defineAsyncComponent(
					() => import('@/components/ChargingTime.vue')
				)
			},
			{
				position: [32, 1562],
				size: [686, 352],
				instance: defineAsyncComponent(
					() => import('@/components/ChargingTime.vue')
				)
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
				instance: defineAsyncComponent(
					() => import('@/components/ChargingTime.vue')
				)
			},
		],
		agriculture: [
			{
				position: [32, 198],
				size: [686, 420],
				instance: defineAsyncComponent(
					() => import('@/components/SoilData.vue')
				)
			},
			{
				position: [32, 650],
				size: [686, 538],
				instance: defineAsyncComponent(
					() => import('@/components/EnvironmentalData.vue')
				)
			},
			{
				position: [32, 1220],
				size: [686, 730],
				instance: defineAsyncComponent(
					() => import('@/components/EnergyConservation.vue')
				)
			},
			{
				position: [3122, 198],
				size: [686, 214],
				instance: defineAsyncComponent(
					() => import('@/components/CropGenerationIndex.vue')
				)
			},
			{
				position: [3122, 444],
				size: [686, 738],
				instance: defineAsyncComponent(
					() => import('@/components/GreenhousePhotovoltaicElectricityStatistics.vue')
				)
			},
			{
				position: [3122, 1214],
				size: [686, 483],
				instance: defineAsyncComponent(
					() => import('@/components/AgriculturalLoad.vue')
				)
			},
			{
				position: [3122, 1729],
				size: [686, 221],
				instance: defineAsyncComponent(
					() => import('@/components/EquipmentSimulation.vue')
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