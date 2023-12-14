<style lang="scss" scoped>
	.video-box {
		position: absolute;
		right: 100px;
		top: 200px;
		.wrapper {
			width: vw(990);
			height: vw(627);
			display: flex;
			flex-flow: column nowrap;
			.item {
				width: 100%;
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			#header {
				height: vw(58);
				background-image: url('@images/视频框-标题-小.png');
			}
			#body {
				flex: 1;
				background-image: url('@images/视频框-小.png');
			}
		}
	}
</style>

<template>
	<div class="video-box">
		<div class="wrapper">
			<div class="item" id="header"></div>
			<div class="item" id="body"></div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		inject,
		Ref,ref,
		onUnmounted,
		onMounted
	} from 'vue';

	const iframeReceMsg :Ref<unknown> | undefined = inject('iframeReceMsg');
	const iframeSendMsg :Ref<unknown> | undefined = inject('iframeSendMsg');

	const msg = {
		ctid: 12911,
		state: 'open'
	};

	iframeReceMsg && ((t, m) => t.value = m)(
		iframeReceMsg, msg
	);

	onMounted(() => {
		msg.state = 'close';
		iframeReceMsg && ((t, m) => t.value = m)(
			iframeReceMsg, msg
		);
	});
</script>