<style lang="scss" scoped>
	.container {
		width: vw(683);
		height: vw(730);
	}
</style>

<template>
	<div class="container">
		<ElectricityUsage></ElectricityUsage>
	</div>
</template>

<script setup lang="ts">
	import ElectricityUsage from '@/components/ElectricityUsage.vue';
</script>