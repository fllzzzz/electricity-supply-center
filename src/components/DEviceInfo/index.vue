<style lang="scss" scoped>
	.device-info {
		width: 100%;
		height: 100%;
		padding-left: vw(38);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: center;
		}

		&__wrapper__item {
			max-width: 50%;
			min-width: vw(298);
			overflow: hidden;
			height: vw(129);
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
		}

		&__wrapper__item__left-side {
			img {
				width: vw(120);
				height: vw(120);
				margin-right: vw(17);
				object-fit: fill;
			}
		}

		&__wrapper__item__right-side {
			height: 100%;
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: flex-start;
			.row {
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
			}
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
					width: vw(48);
					height: vw(22);
					font-size: vw(24);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.8;
				}
				&#value {
					height: vw(34);
					font-size: vw(36);
					font-family: DIN;
					font-weight: bold;
					color: #00FFEA;
					margin-left: vw(13);
					margin-right: vw(15);
				}
				&#util {
					height: vw(16);
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
		<div class="device-info"
		>
			<div class="device-info__wrapper">
				<template
					v-for="(item, index) in config"
					:key="index"
				>
					<div class="device-info__wrapper__item">
						<div class="device-info__wrapper__item__left-side">
							<img :src="item.image">
						</div>
						<div class="device-info__wrapper__item__right-side">
							<div class="row">
								<span id="name">{{ item.name }}</span>
							</div>
							<template
								v-for="(value, index) in item.value"
								:key="index"
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
	import config from './config';
</script>