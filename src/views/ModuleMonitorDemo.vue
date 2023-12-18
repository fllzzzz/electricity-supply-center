<style lang="scss" scoped>
	.jx-video {
		position: fixed;
		top: 50%;left: 50%;
		transform: translate(-50%, -50%);
		z-index: 7000;
	}
</style>

<template>
	<template
		v-if="videoBoxState"
	>
		<VideoBox
			:config="{
				type: 'small',
				src: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
			}"
			@close="closeHandler"
		></VideoBox>
	</template>
</template>

<script setup lang="ts">
	import VideoBox from '@/components/VideoBox.vue';

	import {
		Ref,
		ref,
		inject,
		onUnmounted,
	} from 'vue';

	const videoBoxState = ref(true);

	const closeHandler = () => {
		videoBoxState.value = false;
	};

	const iframeReceMsg :Ref<unknown> | undefined = inject('iframeReceMsg');
	const iframeSendMsg :Ref<unknown> | undefined = inject('iframeSendMsg');

	const msg = {
		ctid: 12911,
		state: 'open',
	};

	iframeReceMsg && ((t, m) => t.value = m)(
		iframeReceMsg, msg
	);

	onUnmounted(() => {
		msg.state = 'close';
		iframeReceMsg && ((t, m) => t.value = m)(
			iframeReceMsg, msg
		);
	});
</script>