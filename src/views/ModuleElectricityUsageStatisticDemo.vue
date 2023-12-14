<style lang="scss" scoped>
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
		v-for="(item, index) in imageList"
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
		ref,Ref,
		inject
	} from 'vue';

	const imageList = [
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
			img: require<string>('@images/上网统计.png'),
			size: [686, 936],
			position: [3122, 192]
		},		{
			img: require<string>('@images/收益数据.png'),
			size: [686, 794],
			position: [3122, 1150]
		},
	];

	const iframeReceMsg :Ref<unknown> | undefined = inject('iframeReceMsg');
	const iframeSendMsg :Ref<unknown> | undefined = inject('iframeSendMsg');

	const msg = {
		ctid: 12711
	};

	iframeReceMsg && ((t, m) => t.value = m)(
		iframeReceMsg, msg
	);
</script>