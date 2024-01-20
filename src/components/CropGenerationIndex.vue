<style scoped lang="scss">
	.crop-generation-index {
		width: 100%;height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;

		&__wrapper {
			width: vw(355);
			height: vw(83);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@images/组 1948.png');
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;

			span {
				height: vw(66);
				font-size: vw(66);
				font-family: Source Han Sans CN;
				font-weight: 500;
				color: #51F8DE;
			}
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '农作物生成指数',
			disableLeftIcon: true
		}"
	>
		<div class="crop-generation-index">
			<div class="crop-generation-index__wrapper">
				<span>{{ config?.target }}</span>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import Card from './Card.vue';

	import {
		ref
	} from 'vue';

	interface Config {
		target :string;
	};

	const config = ref<Config | undefined>({
		target: '优'
	});
</script>

