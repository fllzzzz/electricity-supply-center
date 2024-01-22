<style scoped lang="scss">
	@font-face {
		font-family: Myriad Pro;
		src: url('@fonts/DIN-Regular.otf');
	}

	.charging-count {
		width: 100%;height: 100%;
		padding: vw(44) 0 0 vw(65);

		&__wrapper {
			width: 100%;height: 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
		}

		.block {
			height: vw(186);
			margin-right: vw(68);
			&:last-child {margin-right: unset;}
			display: flex;
			flex-flow: column nowrap;
			align-items: center;
			.row:nth-child(1) {
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-end;
				align-items: flex-end;
				margin-bottom: vw(10);
				span:nth-child(1) {
					height: vw(47);
					font-size: vw(47);
					font-family: Myriad Pro;
					font-weight: 400;
					color: #FFFFFF;
					margin-right: vw(40);
				}
				span:nth-child(2) {
					height: vw(20);
					font-size: vw(20);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					margin-bottom: vw(8);
				}
			}
			.row:nth-child(2) {
				position: relative;
				width: vw(241);
				height: vw(129);
				img {
					width: 100%;height: 100%;
					object-fit: fill;
					position: absolute;
					top: 0;left: 0;
				}
				span {
					position: absolute;
					height: vw(24);
					font-size: vw(24);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.7;
					top: vw(6);
					left: vw(54);
				}
			}
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '充电次数'
		}"
	>
		<div class="charging-count">
			<div class="charging-count__wrapper">
				<div v-for="d, i in config.dataList" :key="i"
					class="block"
				>
					<div class="row">
						<span>{{ d.value }}</span>
						<span>{{ d.util }}</span>
					</div>
					<div class="row">
						<span>{{ d.name }}</span>
						<img :src="d.image">
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	interface Data {
		name :string;
		value :number;
		util :string;
		image :string;
	};

	interface Config {
		dataList :Data[];
	};

	const config = reactive<Config>({
		dataList: [
			{
				name: '今日TODAY',
				value: 78,
				util: '次',
				image: require<string>('@images/底座.png')
			},
			{
				name: '总计TOTAL',
				value: 388,
				util: '万次',
				image: require<string>('@images/底座2.png')
			},
		]
	});
</script>

