<style lang="scss" scoped>
	video {
		width: 100%;
		height: 100%;
		object-fit: fill;
	}
</style>

<template>
	<template
		v-if="targetInfo.type"
	>
		<component
			:is="compMap.get(targetInfo.type)"
			@mounted="mountedHandler"
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
</template>

<script setup lang="ts">
	import mpegts from 'mpegts.js';

	import {
		PropType,
		ref,
		reactive,
		watchEffect,
		defineAsyncComponent,
		onMounted,
		onUnmounted,
	} from 'vue';

	type Config = {
		type :'small' | 'large';
		src :string;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
		}
	});

	const emits = defineEmits([
		'close'
	]);

	let player :mpegts.Player | undefined;
	const targetInfo = reactive<Partial<Config>>({});
	const elVideo = ref<HTMLMediaElement | undefined>(undefined);
	const compMap = new Map<string, unknown>([
		['small', defineAsyncComponent(
			() => import('@/components/VideoBoxSmall.vue')
		)],
		['large', defineAsyncComponent(
			() => import('@/components/VideoBoxLarge.vue')
		)]
	]);

	const creatPlayer = (
		el :HTMLMediaElement,
		src :string
	) => {
		if(player) {
			player.destroy();
		}

		const _player = mpegts.createPlayer({
			type: 'flv',
			cors: true,
			url: src
		});

		_player.on(mpegts.Events.ERROR, (...args :any[]) => {
			console.error(...args);
		});

		_player.attachMediaElement(el);
		_player.load();
		_player.play();

		return _player;
	};

	const sizeUpHandler = () => targetInfo.type = 'large';
	const sizeDownHandler = () => targetInfo.type = 'small';
	const mountedHandler = () => {
		elVideo.value &&
		targetInfo.src &&
		((el, src) => watchEffect(() => player = creatPlayer(
			el, src
		)))(elVideo.value, targetInfo.src);
	};
	const closeHandler = () => {
		targetInfo.type = undefined
		emits('close');
	};

	watchEffect(() => {
		[
			targetInfo.src,
			targetInfo.type
		] = [
			props.config?.src,
			props.config?.type
		]
	});
	onUnmounted(() => {
		player &&
		(player => {
			player.destroy();
		})(player)
	})
</script>