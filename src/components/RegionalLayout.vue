<style scoped lang="scss">
	.regional-layout {
		width: 100%;height: 100%;
		padding-left: vw(42);

		&__wrapper {
			width: 100%;height: 100%;
			img {
				width: 100%;height: 100%;
				object-fit: fill;
			}
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '区域布局'
		}"
	>
		<div class="regional-layout">
			<div class="regional-layout__wrapper">
				<img src="@images/布局图.png">
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
</script>

