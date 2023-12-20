<style lang="scss" scoped>
	.device-info {

		.device-info__wrapper {
			height: vw(304);
			display: flex;
			flex-flow: row wrap;
		}

		.device-info__item {
			height: vw(129);
			margin-bottom: vw(50);
			&:nth-child(2n-1) {
				margin-right: vw(39);
			}
			&:nth-last-child(1),
			&:nth-last-child(2) {
				margin-bottom: unset;
			}
		}

		.device-info__item__left-sider {
			width: vw(120);
			height: vw(120);
			img {
				width: 100%;height: 100%;
				object-fit: fill;
			}
		}
		.device-info__item__right-sider {
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: flex-start;
			span {
				line-height: 1;
				&#name {
					height: vw(31);
					font-size: vw(32);
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #FFFFFF;
				}
				&#title {
					height: vw(22);
					font-size: vw(24);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.8;
				}
				&#value {
					height: vw(28);
					font-size: vw(36);
					font-family: DIN;
					font-weight: bold;
					color: #00FFEA;
					margin-left: vw(13);
					margin-right: vw(15);
				}
				&#util {
					height: vw(18);
					font-size: vw(20);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.6;
				}
			}
		}
	}
</style>

<template>
	<Card
		id="device-info"
		:config="{
			title: '设备构成'
		}"
	>
		<div class="device-info">
			<div class="device-info__wrapper">
				<template
					v-for="(item, index) in config"
					:key="index"
				>
					<div class="device-info__item">
						<div class="device-info__item__left-sider">
							<img :src="item.image">
						</div>
						<div class="device-info__item__right-sider">
							<div class="row">
								<span id="name">{{ item.name }}</span>
							</div>
							<template
								v-for="(value, index) in item.value"
							>
								<div class="row">
									<span id="title">{{ value[0] }}</span>
									<span id="value">{{ value[1] }}</span>
									<span id="util">{{ value[2] }}</span>
								</div>
							</template>
						</div>
					</div>
				</template>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';

	const config = reactive([
		{
			name: '智慧光伏',
			value: [
				['面积', 354, '㎡'],
				['数量', 4, '组'],
			],
			image: require<string>('@images/光伏.png'),
		},
		{
			name: '移动储能',
			value: [
				['面积', 36, '㎡'],
				['数量', 1, '台'],
			],
			image: require<string>('@images/移动储能.png'),
		},
		{
			name: '充电桩',
			value: [
				['面积', 239, '㎡'],
				['数量', 19, '台'],
			],
			image: require<string>('@images/充电桩.png'),
		},
		{
			name: '智慧大棚',
			value: [
				['面积', 50, '㎡'],
				['数量', 1, '个'],
			],
			image: require<string>('@images/智慧大棚.png'),
		},
	]);
</script>