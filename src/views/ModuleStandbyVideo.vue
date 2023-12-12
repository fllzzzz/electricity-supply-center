<style lang="scss" scoped>
	video {
		width: 100vw;
		height: 100vh;
		object-fit: fill;
		pointer-events: auto;
	}
</style>

<template>
	<video
		muted
		autoplay
		ref="elVideo"
		src="https://media.w3.org/2010/05/sintel/trailer.mp4" 
		@click="clickHandler"
	></video>
</template>

<script setup lang="ts">
	import {	
		useRouter
	} from 'vue-router';

	import {
		ref,
		onMounted,
		onUnmounted
	} from 'vue';

	const router = useRouter();

	const elVideo = ref<HTMLVideoElement | undefined>(undefined);

	const clickHandler = () => {
		router.push({
			name: 'overview'
		});
	};

	const KeyboardHandleMap = new Map<string, ((
		event? :KeyboardEvent
	) => void)>([
		['KeyC', () => {	//replay
			elVideo.value!.currentTime = 0;
		}],
		['Space', () => {	//pause/play
			if(elVideo.value!.paused) {
				elVideo.value!.play()
			}else {
				elVideo.value!.pause()
			}
		}],
	]);

	const KeyboardHandler = (event :KeyboardEvent) => {
		const fn = KeyboardHandleMap.get(event.code);

		fn && fn();
	};

	onMounted(() => {
		window.addEventListener('keyup', KeyboardHandler);
	});

	onUnmounted(() => {
		window.removeEventListener('keyup', KeyboardHandler);
	});
</script>