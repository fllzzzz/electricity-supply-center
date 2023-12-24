<style lang="scss" scoped>
	.card {
		position: absolute;
		pointer-events: auto;
		z-index: 6000;
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
			<component :is="item.instance"></component>
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
	}= {
		default: [
			{
				position: [31, 197],
				size: [684, 488],
				instance: defineAsyncComponent(
					() => import('@/components/SpaceOverview.vue')
				)
			},
			{
				position: [31, 724],
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