<style lang="scss" scoped>
	.container {
		width: vw(684);
		height: vw(488);
		border: 4px dotted red;
		position: relative;
	}
</style>

<template>
	<div class="container">
		<ChartsDemo></ChartsDemo>
	</div>
</template>

<script setup lang="ts">
	import ChartsDemo from '@/components/ChartsDemo.vue';
</script>