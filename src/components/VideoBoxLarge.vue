<style lang="scss" scoped>
	.jx-video {
		width: rem(1980);
		height: rem(1248);
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;

		.jx-video__item {
			width: 100%;
			display: flex;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			&#header {
				height: rem(118);
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				background-image: url('@images/视频框-标题-小.png');
			}
			&#body {
				flex: 1;
				flex-flow: column nowrap;
				justify-content: center;
				align-items: center;
				padding: rem(13) rem(15) rem(15) rem(15);
				background-image: url('@images/视频框-小.png');
			}
		}

		.header-wrapper {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			&#title {
				justify-content: flex-start;
				margin-left: rem(18);
				img {
					width: rem(50);
					height: rem(50);
					object-fit: fill;
					margin-right: rem(13);
				}
				span {
					height: rem(31);
					font-size: rem(32);
					line-height: 1;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
			&#options {
				justify-content: flex-end;
				img {
					width: rem(50);
					height: rem(50);
					object-fit: fill;
					margin-left: rem(14);
					&:first-child {
						margin-left: unset;
					}
				}
			}
		}

		.body-wrapper {
			display: flex;
			justify-content: center;
			align-items: center;
			&#main {
				width: 100%;height: 100%;
			}
		}
	}
</style>

<template>
	<div class="jx-video">
		<div class="jx-video__item" id="header">
			<div class="header-wrapper" id="title">
				<img src="">
				<span>default title</span>
			</div>
			<div class="header-wrapper" id="options"
				@click="headerOptionsHandler"
			>
				<template
					v-for="item in headerOptionInfoList"
					:key="item.id"
				>
					<img :src="item.image" :flg="item.id">
				</template>
			</div>
		</div>
		<div class="jx-video__item" id="body">
			<div class="body-wrapper" id="main">
				<slot></slot>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive,
	} from 'vue';

	const emits = defineEmits([
		'sizeDown', 'close'
	]);

	const headerOptionInfoList = reactive([
		{
			id: 'sizeDown',
			image: require<string>('@images/缩小.png')
		},
		{
			id: 'close',
			image: require<string>('@images/关闭.png')
		},
	]);

	const headerOptionsHandlerMap = new Map<string, ((
		event? :MouseEvent,
		...args :any[]
	) => void)>([
		['sizeDown', () => emits('sizeDown')],
		['close', () => emits('close')],
	]);

	const headerOptionsHandler = (event :MouseEvent) => {
		const {target: el} = event as {target :HTMLElement | null};

		el &&
		(el => {
			const flg = el.getAttribute('flg');
			if(! flg) return;

			const fn = headerOptionsHandlerMap.get(flg);

			fn && fn(event);
		})(el);
	};
</script>