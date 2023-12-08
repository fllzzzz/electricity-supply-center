<style lang="scss" scoped>
	.card {
		width: 50vw;height: 100%;
		background-color: black;
	}
</style>

<template>
	<div class="card" v-random-id v-font-size>
		<div class="item" id="header"></div>
		<div class="item" id="body"></div>
		<div class="item" id="footer"></div>
	</div>
</template>

<script setup lang="ts">
	import {
		PropType,
		CSSProperties,
		ref,
		onMounted,
		onBeforeUnmount
	} from 'vue';

	type InboundConfig = {
		designWidth :number;
		title? :string | {
			value :string;
			options :CSSProperties;
		};
		header? :CSSProperties;
		body? :CSSProperties;
		footer? :CSSProperties
	};

	const props = defineProps({
		inboundConfig: {
			type: Object as PropType<InboundConfig>,
		}
	});
</script>