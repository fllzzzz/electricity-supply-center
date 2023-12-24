<style lang="scss" scoped>
	.space-overview {
		width: 100%;
		height: 100%;

		&__wrapper {
			width: 100%;
			height: 100%;
			padding: vw(12) 0 0 vw(32);
			display: flex;
			flex-flow: row nowrap;
		}

		&__wrapper__main-value {
			width: vw(366);
			height: 100%;
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@images/总计底.png');
			margin-right: vw(16);
			position: relative;
			.block {
				position: absolute;
				top: vw(30);right: vw(23);
				height: vw(126);
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				align-items: flex-start;
				.row {
					span {
						line-height: 1;
					}
					&:nth-child(1) {
						span {
							height: vw(71);
							font-size: vw(73);
							font-family: DINPro;
							font-weight: bold;
							color: #FFFFFF;
						}
					}
					&:nth-child(2) {
						span {
							width: vw(209);
							height: vw(29);
							font-size: vw(28);
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
				}
			}
		}

		&__wrapper__item-value {
			padding-top: vw(14);
			padding-bottom: vw(14);
			.block {
				height: vw(80);
				background-repeat: no-repeat;
				background-size: 100% 100%;
				background-image: url('@images/异形.png');
				display: flex;
				flex-flow: column nowrap;
				justify-content: space-between;
				margin-bottom: vw(30);
				&:last-child {
					margin-bottom: unset;
				}
				.row {
					display: flex;
					align-items: center;
					span {
						line-height: 1;
					}
					&:nth-child(1) {
						margin-left: vw(35);
						span {
							height: vw(26);
							font-size: vw(28);
							font-family: Source Han Sans CN;
							font-weight: 400;
							color: #FFFFFF;
						}
					}
					&:nth-child(2) {
						margin-left: vw(38);
						width: vw(161);
						display: flex;
						flex-flow: row nowrap;
						justify-content: space-between;
						align-items: center;
						margin-bottom: vw(15);
						span {
							&:nth-child(1) {
								height: vw(27);
								font-size: vw(36);
								font-family: DINPro;
								font-weight: bold;
								color: #00FFEA;
							}
							&:nth-child(2) {
								font-size: vw(28);
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
							}
						}
					}
				}
			}
		}
	}
</style>

<template>
	<Card
		id="space-overview"
		:config="{
			title: '空间总览'
		}"
	>
		<div class="space-overview">
			<div class="space-overview__wrapper">
				<div class="space-overview__wrapper__main-value">
					<div class="block">
						<div class="row">
							<span>{{ props.config.main.value }}</span>
						</div>
						<div class="row">
							<span>{{ props.config.main.name }}</span>
						</div>
					</div>
				</div>
				<div class="space-overview__wrapper__item-value">
					<template
						v-for="(item, index) in props.config.item"
					>
						<div class="block">
							<div class="row">
								<span>{{ item.name }}</span>
							</div>
							<div class="row">
								<span>{{ item.value }}</span>
								<span>㎡</span>
							</div>
						</div>
					</template>
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

	import type {
		PropType
	} from 'vue';

	type Data = {
		name :string;
		value :number;
	};

	type Config = {
		main :Data;
		item :Data[];
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			default: {
				main: {
					name: '供电所总面积 /m',
					value: 4677
				},
				item: [
					{
						name: '建筑面积',
						value: 1235
					},
					{
						name: '绿化面积',
						value: 420
					},
					{
						name: '室外实训场面积',
						value: 728
					},
				]
			} as Config,
		}
	});
</script>