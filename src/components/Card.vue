<style lang="scss" scoped>
	.card {
		width: 100%;height: 100%;
	}
</style>

<template>
	<div class="card">
		<div class="item" id="header"></div>
		<div class="item" id="body"></div>
		<div class="item" id="footer"></div>
	</div>
</template>

<script setup lang="ts">
	import {
		PropType,
		onMounted,
		onBeforeUnmount
	} from 'vue';

	type InboundConfig = {
		title :string;
	};

	const props = defineProps({
		inboundConfig: {
			type: Object as PropType<InboundConfig>,
		}
	});
</script>