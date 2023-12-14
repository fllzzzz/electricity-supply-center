<style lang="scss" scoped>
</style>

<template>
	<div class="container">
		<HeaderOptions></HeaderOptions>
	</div>
</template>
<script setup lang="ts">
	import HeaderOptions from '@/components/HeaderOptions.vue';

	import {
		overview
	} from '@/store';

	overview.store.model = '光伏区域';
</script>