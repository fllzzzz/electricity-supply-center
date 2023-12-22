<style lang="scss" scoped>
	.container {
		width: vw(603);
		height: vw(367);
		display: flex;
		border: 2px dotted red;
	}
</style>

<template>
	<div class="container">
		<EchartsDemo
			:config="{
				data
			}"
		></EchartsDemo>
	</div>
</template>

<script setup lang="ts">
	import EchartsDemo from '@/components/EchartsDemo.vue';

	const data = [
		['item1', 'item2'],
		[2, 	10],
		[4,		20],
		[6,		30],
		[8,		40],
	];
</script>