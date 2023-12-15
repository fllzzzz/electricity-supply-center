<style lang="scss" scoped>
	.app-player {
		& > .container-small {
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
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				& > .box {
					height: 100%;
					flex-grow: 1;
					display: flex;
					flex-flow: row nowrap;
					align-items: center;
				}
				#title {
					justify-content: flex-start;
					img {
						width: 50px;
						height: 50px;
						object-fit: fill;
						margin-right: 13px;
						margin-left: 18px;
					}
					span {
						font-size: 32px;
						height: 31px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 1;
					}
				}
				#options {
					justify-content: flex-end;
					img {
						width: 50px;
						height: 50px;
						object-fit: fill;
						margin-left: 14px;
						&:first-child {
							margin-left: 0;
						}
					}
				}
			}
			#body {
				flex: 1;
				padding: 13px 15px 15px 15px;
				background-image: url('@images/视频框-小.png');
				video {
					width: 100%;height: 100%;
					object-fit: fill;
				}
			}
		}
	}
</style>

<template>
	<div class="app-player" ref="elPlayer">
		<template
			v-if="props.config?.type === 'small'"
		>
			<div class="container-small">
				<div class="item" id="header">
					<div class="box" id="title">
						<img src="@images/摄像头-icon.png">
						<span>纳斯得去的啊啊坡道爱你爹我</span>
					</div>
					<div class="box" id="options">
						<img src="@images/关闭.png">
					</div>
				</div>
				<div class="item" id="body">
					<video
					muted autoplay></video>
				</div>
			</div>
		</template>
	</div>
</template>

<script setup lang="ts">
	import mpegjs from 'mpegts.js';

	import {
		ref,
		PropType,
		Ref,
		inject,
		onUnmounted,
		watchEffect
	} from 'vue';

	type Config = {
		type :string;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			default: () => ({
				type: 'small'
			})
		}
	});

	const elPlayer = ref<HTMLElement | undefined>(undefined);

	const player = mpegjs.createPlayer({
		type: 'mp4',
		cors: true,
		url: 'https://stream7.iqilu.com/10339/upload_transcode/202002/18/20200218093206z8V1JuPlpe.mp4'
	});

	watchEffect(() => elPlayer.value && (el => {
		const elVideo = el.getElementsByTagName('video')[0];
		
		player.attachMediaElement(elVideo);
		player.load();
		player.play();

		setTimeout(() => {
			const elClone = elVideo.cloneNode() as HTMLVideoElement;
			elClone.currentTime = elVideo.currentTime;

			elVideo.remove();

			document.body.append(elClone);
		}, 10000);
	})(elPlayer.value));

	


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