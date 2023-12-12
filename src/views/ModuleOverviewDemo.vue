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
			<img :src="item.img">
		</div>
	</template>
</template>

<script setup lang="ts">
	import {
		model
	} from '@/store/overview';

	import {
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

	const imageGroup = {
		default: [
			{
				img: require<string>('@images/园区面积.png'),
				size: [686, 494],
				position: [32, 192]
			},
			{
				img: require<string>('@images/设备构成.png'),
				size: [686, 668],
				position: [32, 716]
			},
			{
				img: require<string>('@images/区域分布.png'),
				size: [686, 530],
				position: [32, 1414]
			},
			{
				img: require<string>('@images/用电总量.png'),
				size: [686, 936],
				position: [3121, 192]
			},
						{
				img: require<string>('@images/监控画面.png'),
				size: [686, 794],
				position: [3121, 1150]
			},
		],
		photovoltaic: [
			{
				img: require<string>('@images/光伏发电量.png'),
				size: [686, 730],
				position: [32, 192]
			},
			{
				img: require<string>('@images/单日电量.png'),
				size: [686, 428],
				position: [32, 954]
			},
			{
				img: require<string>('@images/光照强度.png'),
				size: [686, 532],
				position: [32, 1412]
			},
			{
				img: require<string>('@images/光照模拟.png'),
				size: [686, 223],
				position: [3121, 192]
			},
			{
				img: require<string>('@images/上网统计.png'),
				size: [686, 715],
				position: [3121, 446]
			},
			{
				img: require<string>('@images/收益数据.png'),
				size: [686, 751],
				position: [3121, 1193]
			},
		],
		energyStorage: [
			{
				img: require<string>('@images/电池电量.png'),
				size: [686, 428],
				position: [32, 192]
			},
			{
				img: require<string>('@images/电池电量百分比.png'),
				size: [686, 730],
				position: [32, 652]
			},
			{
				img: require<string>('@images/功率.png'),
				size: [686, 530],
				position: [32, 1412]
			},
			{
				img: require<string>('@images/充放电次数.png'),
				size: [686, 584],
				position: [3121, 192]
			},
			{
				img: require<string>('@images/储能寿命.png'),
				size: [686,510],
				position: [3121, 808]
			},
			{
				img: require<string>('@images/电池温度监控.png'),
				size: [686, 594],
				position: [3121, 1350]
			},
		],
		chargingPost: [],
		agriculture: [],
	}

	const getImageList = computed(() => {
		const targetKey = Object.keys(imageGroup)
			.find(key => key === props.message);

		if(targetKey) return imageGroup[targetKey as keyof typeof imageGroup];
		return imageGroup.default;
	})

	onUnmounted(() => {
		model.value = undefined;
	});
</script>