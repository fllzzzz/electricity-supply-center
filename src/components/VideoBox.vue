<style lang="scss" scoped>
	video {
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<component
		:is="compMap.get(targetType)"
		@sizeUp="sizeUpHandler"
		@sizeDown="sizeDownHandler"
		@close="closeHandler"
	>
		<video
			muted autoplay
			ref="elVideo"
		></video>
	</component>
</template>

<script setup lang="ts">
	import {
		PropType,
		ref,
		watchEffect,
		defineAsyncComponent,
		onUnmounted,
	} from 'vue';

	type Config = {
		type :'small' | 'large';
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			default: () => ({})
		}
	});

	const emits = defineEmits([
		'close'
	]);

	const targetType = ref<string>('');
	const elVideo = ref<HTMLVideoElement | undefined>(undefined);

	const compMap = new Map<string, unknown>([
		['small', defineAsyncComponent(
			() => import('@/components/VideoBoxSmall.vue')
		)],
		['large', defineAsyncComponent(
			() => import('@/components/VideoBoxLarge.vue')
		)]
	]);

	watchEffect(() => targetType.value = props.config.type);

	const sizeUpHandler = () => targetType.value = 'large';
	const sizeDownHandler = () => targetType.value = 'small';
	const closeHandler = () => {
		targetType.value = ''
		emits('close');
	};

	onUnmounted(() => {console.log(99999);})
</script>