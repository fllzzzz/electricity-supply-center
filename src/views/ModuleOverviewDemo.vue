<style lang="scss" scoped>
	$leftTopList: 191 716 1414;
	$leftHeightList: 494 668 530;
	$rightTopList: 191 1150;
	$rightHeightList: 936 794;
	.card {
		position: absolute;
		img {
			width: 100%;height: 100%;
			object-fit: fill;
		}
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
			<img :src="(item.instance as string)">
		</div>
	</template>
</template>

<script setup lang="ts">
	import {
		overview
	} from '@/store';

	import {
		ref,
		Ref,
		inject,
		reactive,
		computed,
		watchEffect,
		onUnmounted
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
				position: [32, 192],
				size: [686, 494],
				instance: require<string>('@images/园区面积.png')
			},
			{
				position: [32, 716],
				size: [686, 668],
				instance: require<string>('@images/设备构成.png')
			},
			{
				position: [32, 1414],
				size: [686, 530],
				instance: require<string>('@images/区域分布.png')
			},
			{
				position: [3122, 192],
				size: [686, 936],
				instance: require<string>('@images/用电总量.png')
			},
			{
				position: [3122, 1150],
				size: [686, 794],
				instance: require<string>('@images/监控画面.png')
			},
		],
		photovoltaic: [
			{
				position: [32, 192],
				size: [686, 730],
				instance: require<string>('@images/光伏发电量.png')
			},
			{
				position: [32, 954],
				size: [686, 428],
				instance: require<string>('@images/单日电量.png')
			},
			{
				position: [32, 1412],
				size: [686, 532],
				instance: require<string>('@images/光照强度.png')
			},
			{
				position: [3122, 192],
				size: [686, 223],
				instance: require<string>('@images/光照模拟.png')
			},
			{
				position: [3122, 446],
				size: [686, 715],
				instance: require<string>('@images/上网统计.png')
			},
			{
				position: [3122, 1193],
				size: [686, 751],
				instance: require<string>('@images/收益数据.png')
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
				instance: require<string>('@images/电池电量百分比.png')
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
				size: [686, 340],
				instance: require<string>('@images/充电时长.png')
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
				instance: require<string>('@images/光伏单日发电量.png')
			},
			{
				position: [3122, 192],
				size: [686, 637],
				instance: require<string>('@images/灌溉次数-时长.png')
			},
			{
				position: [3122, 861],
				size: [686, 547],
				instance: require<string>('@images/灌溉用水量.png')
			},
			{
				position: [3122, 1440],
				size: [686, 504],
				instance: require<string>('@images/智慧农业桩铭牌.png')
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
		console.log('==jx, modleName: ', overview.store.model);
		const mapName = modelNameMap.get(overview.store.model as string);

		const targetKey = Object.keys(imageGroup)
			.find(key => key === mapName);

		if(targetKey) return imageGroup[targetKey as keyof typeof imageGroup];
		return imageGroup.default;
	});


	const iframeReceMsg :Ref<unknown> | undefined = inject('iframeReceMsg');
	const iframeSendMsg :Ref<unknown> | undefined = inject('iframeSendMsg');

	const msg = {
		ctid: 10111
	};

	iframeReceMsg && ((t, m) => t.value = m)(
		iframeReceMsg, msg
	);

	onUnmounted(() => {
		overview.store.model = undefined;
	});
</script>