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
		</component>
		<template
			v-if="targetInfo.src"
		>
			<Teleport
				:to="telpTarget"
			>
				<video
					muted autoplay
					ref="elVideo"
					v-show="telpTarget !== 'body'"
				></video>
			</Teleport>
		</template>
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
	const telpTarget = ref<string | HTMLElement>('body');
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
			type: 'mp4',
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

	const loadingManager = {
		open(
			el :HTMLMediaElement
		) {

		},
		close(
			el :HTMLMediaElement
		) {
			
		}
	};

	const sizeUpHandler = () => {
		telpTarget.value = 'body';
		targetInfo.type = 'large'
	};
	const sizeDownHandler = () => {
		telpTarget.value = 'body';
		targetInfo.type = 'small'
	};
	const mountedHandler = (elTelpTarget :HTMLElement) => {
		telpTarget.value = elTelpTarget;
	};
	const closeHandler = () => {
		targetInfo.type = undefined
		emits('close');
	};

	watchEffect(() => {

		elVideo.value &&
		targetInfo.src &&
		((el, src) => {
			player = creatPlayer(el, src);
		})(elVideo.value, targetInfo.src);
	});

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