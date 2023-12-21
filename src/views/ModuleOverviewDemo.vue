<style lang="scss" scoped>
	$leftTopList: 191 716 1414;
	$leftHeightList: 494 668 530;
	$rightTopList: 191 1150;
	$rightHeightList: 936 794;
	.card {
		position: absolute;
		pointer-events: auto;
		z-index: 6000;
	}
</style>

<template>
	<template
		v-for="(item, index) in getImageList"
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

	const props = defineProps({
		message: {
			type: String,
		}
	});

	const imageGroup :{
		[key :string] :{
			position :[number, number],
			size :[number, number],
			instance :unknown
		}[]
	}= {
		default: [
			{
				position: [3122, 198],
				size: [684, 428],
				instance: defineAsyncComponent(
					() => import('@/components/ElectricityUsageOfDay.vue')
					
					/* () => import('@/components/LightSimulation.vue') */
					/* () => import('@/components/DeviceInfo/index.vue') */
					/* () => import('@/components/EmphasisMonitor.vue') */
					/* () => import('@/components/ElectricityUsage.vue') */
				)
			},
		],
	}

	const modelNameMap = new Map<string, string>([
		['光伏区域', 'photovoltaic'],
		['储能区域', 'energyStorage'],
		['充电桩', 'chargingPost'],
		['智慧农业', 'agriculture'],
	]);

	const getImageList = computed(() => {
		const mapName = modelNameMap.get(overview.store.model as string);

		const targetKey = Object.keys(imageGroup)
			.find(key => key === mapName);

		if(targetKey) return imageGroup[targetKey as keyof typeof imageGroup];
		return imageGroup.default;
	});

	onMounted(() => {
		iframe.toUEMessage.value = {
			ctid: 10111
		};
	});

	onUnmounted(() => {
		overview.store.model = undefined;
	});
</script>