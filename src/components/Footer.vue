<style lang="scss" scoped>
	.app-footer {
		position: fixed;
		bottom: 0;left: 50%;
		transform: translateX(-50%);
		z-index: 5000;
		.wrapper {
			position: relative;
			width: 100rem;
			height: rem(298);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@images/按钮底框.png');
			.box {
				position: absolute;
				width: rem(1792);
				height: rem(100);
				bottom: rem(12);
				left: rem(1024);
				display: flex;
				flex-flow: row nowrap;
				justify-content: space-between;
				align-items: center;
				pointer-events: none;
				img {
					pointer-events: auto;
					width: rem(308);
					height: 100%;
					object-fit: fill;
				}
			}
		}
	}
</style>

<template>
	<div class="app-footer">
		<div class="wrapper">
			<div class="box"
				@click="moduleEntry"
			>
				<img src="@images/1总览-未选.png"
					route='overview'
				>
				<img src="@images/4能源管网-未选.png"
					route='electricity-grids'
				>
				<img src="@images/3耗电概览-未选.png"
					route='electricity-usageStatistic'
				>
				<img src="@images/3保电工单-未选.png"
					route='electricity-ticket'
				>
				<img src="@images/2实时监控-未选.png"
					route='monitor'
				>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		useRouter
	} from 'vue-router';

	const router = useRouter();

	const moduleEntry = (event :MouseEvent) => {
		const route = (event.target as HTMLElement).getAttribute('route');
	
		router.push({
			name: route!
		});
	};
</script>