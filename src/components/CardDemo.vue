<style lang="scss" scoped>
	.app-card {
		position: fixed;
		.wrapper {
			background-repeat: no-repeat;
			background-size: 100% 100%;
			img {
				width: 100%;height: 100%;
				object-fit: fill;
			}
		}
	}
</style>

<template>
	<div class="app-card">
		<div class="wrapper">
			<img :src="props.config?.image">
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		CSSProperties,
		PropType
	} from 'vue';

	type Config = {
		
		image :string;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});
</script>