<style lang="scss">
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
	} from '@/utils/executeControl';

	import {
		onMounted
	} from 'vue';

	const handler = repeatDelay<((
		entryList : ResizeObserverEntry[]
	) => void)>(entryList => {
		document.documentElement.style.fontSize = 
			(entryList[0].borderBoxSize[0].inlineSize / 100)
				.toString() + 'px';
	}, 20);

	onMounted(() => {
		new ResizeObserver(handler)
			.observe(document.documentElement);
	});
</script>