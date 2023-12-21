<style lang="scss" scoped>
	.device-info {
		width: 100%;
		height: 100%;
		padding-left: vw(40);
		padding-right: vw(14);

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
			min-width: vw(283);
			overflow: hidden;
			height: vw(94);
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
		}

		&__wrapper__item__left-side {
			width: vw(95);
			height: vw(95);
			margin-right: vw(9);
			background-image: url('@images/图标底.png');
			background-repeat: no-repeat;
			background-size: 100% 100%;
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			justify-content: center;
			img {
				width: vw(48);
				height: vw(48);
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
					height: vw(27);
					font-size: vw(28);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.6;
				}
				&#value {
					height: vw(46);
					font-size: vw(48);
					font-family: DINPro;
					font-weight: 500;
					color: #FFFFFF;
					margin-right: vw(23);
				}
				&#util {
					height: vw(26);
					font-size: vw(28);
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
			title: '单日电量'
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
							<template
								v-for="(value, index) in item.value"
								:key="index"
							>
								<div class="row">
									<span id="value">{{ value[0] }}</span>
									<span id="util">{{ value[1] }}</span>
								</div>
							</template>
							<div class="row">
								<span id="name">{{ item.name }}</span>
							</div>
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
			name: '光伏区1',
			value: [
				[254, 'kW·h'],
			],
			image: require<string>('@images/光伏_1.png'),
		},
		{
			name: '光伏区2',
			value: [
				[190, 'kW·h'],
			],
			image: require<string>('@images/光伏_1.png'),
		},
		{
			name: '光伏区3',
			value: [
				[219, 'kW·h'],
			],
			image: require<string>('@images/光伏_1.png'),
		},
		{
			name: '光伏区4',
			value: [
				[25, 'kW·h'],
			],
			image: require<string>('@images/光伏_1.png'),
		},
	]);
</script>