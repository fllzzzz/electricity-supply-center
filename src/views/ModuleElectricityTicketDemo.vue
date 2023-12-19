<style lang="scss" scoped>

	img:nth-of-type(1) {
		position: absolute;
		top: 0;left: 0;
		width: 100vw;
		height: 100vh;
	}

	img:nth-of-type(2) {
		position: absolute;
		top: 50%;left: 50%;
		transform: translate(-50%, -50%);
		width: vw(3280);height: vw(1357);
		object-fit: fill;
	}
</style>

<template>
	<img :src="image1">
	<img :src="image2">
</template>

<script setup lang="ts">
	import {
		iframe
	} from '@/store';

	import {
		onMounted, 
		onUnmounted
	} from 'vue';

	const image1 = require<string>('@images/底.png');
	const image2 = require<string>('@images/组 1954.png');

	const elAppBody = document.querySelector('.app-body') as HTMLElement;

	onMounted(() => {
		elAppBody!.style.zIndex = '4500';
		iframe.toUEMessage.value = {
			ctid: 12611
		};
	});

	onUnmounted(() => {
		elAppBody!.style.zIndex = '6000';
	});
</script>