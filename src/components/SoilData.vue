<style scoped lang="scss">
	.soil-data {
		width: 100%;
		height: 100%;
		padding: vw(22) 0 0 vw(72);
		
		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row wrap;
			.block {
				max-width: calc(50% - vw(40));
				min-width: vw(274);
				height: vw(121);
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				margin-bottom: vw(30);
				position: relative;
				&:nth-last-child(1),
				&:nth-last-child(2) {margin-bottom: unset;}
				&:not(
					:nth-last-child(1),
					:nth-last-child(2)
				){
					&::after {
						content: '';
						display: inline-block;
						position: absolute;
						bottom: vw(-10);
						left: vw(16);
						width: vw(48);
						height: vw(2);
						background: linear-gradient(90deg, #5A6A6C 0%, #00FFDE 50%, #3E5155 100%);
						opacity: 0.66;
					}
				}
				&:nth-child(2n-1) {
					margin-right: vw(40);
					&::before {
						content: '';
						display: inline-block;
						position: absolute;
						right: 0;
						top: 50%;
						transform: translateY(-50%);
						width: vw(4);
						height:	vw(80);
						background: linear-gradient(0deg, #5A6A6C 0%, #00FFDE 50%, #3E5155 100%);
						opacity: 0.66;
					}
				}
				&:nth-last-child(1) {
					&::before {
						display: none;
					}
				}
				.col {
					display: flex;
					&:nth-child(1) {
						width: vw(80);
						height: vw(90);
						margin-right: vw(8);
						img {
							width: 100%;height: 100%;
							object-fit: fill;
						}
					}
					&:nth-child(2) {
						flex-flow: column nowrap;
						justify-content: center;
						span {
							&:nth-child(1) {
								margin-bottom: vw(15);
								&:nth-child(1) {
									height: vw(38);
									font-size: vw(38);
									font-family: DINPro;
									font-weight: 500;
									color: #00FFC0;
									margin-right: vw(12);
								}
								& > :nth-child(2) {
									height: vw(24);
									font-size: vw(24);
									font-family: Source Han Sans CN;
									font-weight: 400;
									color: #00FFC0;
									opacity: 0.8;
								}
							}
							&:nth-child(2) {
								height: vw(28);
								overflow: hidden;
								text-overflow: ellipsis;
								font-size: vw(28);
								font-family: Source Han Sans CN;
								font-weight: 400;
								color: #FFFFFF;
								opacity: 0.7;
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
		:config="{
			title: '土壤数据'
		}"
	>
		<div class="soil-data">
			<div class="soil-data__wrapper">
				<div v-for="(data, i) in config.dataList" :key="i"
					class="block"
				>
					<div class="col">
						<img :src="data.image">
					</div>
					<div class="col">
						<span>
							<span>{{ data.value[0] }}</span>
							<span>{{ data.value[1] }}</span>
						</span>
						<span>{{ data.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import Card from "@/components/Card.vue";

	import {
		reactive
	} from 'vue';

	interface Data {
		name :string;
		image :string;
		value :[number, string]
	};

	interface Config {
		dataList :Data[];
	};

	const config = reactive<Partial<Config>>({
		dataList: [
			{
				name: '温度',
				image: require<string>('@images/温度.png'),
				value: [3, '℃']
			},
			{
				name: '湿度',
				image: require<string>('@images/湿度.png'),
				value: [53, '%']
			},
			{
				name: '大棚土壤水分',
				image: require<string>('@images/土壤水分.png'),
				value: [41.56, '%']
			},
			{
				name: '导电率',
				image: require<string>('@images/导电.png'),
				value: [59.6, '%']
			},
		]
	});
</script>
