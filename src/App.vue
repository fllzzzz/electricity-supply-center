<style lang="scss">
	html {
		height: 100vh;
	}
</style>

<template>
	<RouterView
		v-slot="{Component}"
	>
		<component :is="Component" />
	</RouterView>
</template>

<script setup lang="ts">
	import {
		repeatDelay
	} from '@/utils';

	import {
		onMounted
	} from 'vue';

	const designRatio = 0.56275;

	const handler = repeatDelay<((
		entryList : ResizeObserverEntry[]
	) => void)>(entryList => {
		document.documentElement.style.fontSize = 
			(Math.ceil(
				entryList[0].borderBoxSize[0].blockSize / designRatio
			) / 100).toString() + 'px';
	}, 20);

	onMounted(() => {
		new ResizeObserver(handler)
			.observe(document.documentElement);
	});
</script>