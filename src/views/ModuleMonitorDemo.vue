<style lang="scss" scoped>
	.app-player {
		& > .container {
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
		<div class="container">
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
					muted
					autoplay
					preload="none"
					src="https://media.w3.org/2010/05/sintel/trailer.mp4" 
				></video>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ref,
		onMounted
	} from 'vue';

	const elPlayer = ref<HTMLElement | undefined>(undefined);
</script>