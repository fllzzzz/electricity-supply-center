<style lang="scss" scoped>
	.container {
		width: 800px;
		height: 600px;
		border: 2px dotted red;
	}
</style>

<template>
	<div class="container">
		<EchartsDemo></EchartsDemo>
	</div>
</template>

<script setup lang="ts">
	import EchartsDemo from '@/components/EchartsDemo.vue';
</script>