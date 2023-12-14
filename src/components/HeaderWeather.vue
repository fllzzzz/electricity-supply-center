<style lang="scss" scoped>
	.header-weather {
		& > .wrapper {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			#main-icon {
				width: 74px;
				height: 74px;
				object-fit: fill;
			}
			.box {
				align-self: flex-end;
				margin-left: 19px;
				margin-bottom: 15px;
				display: flex;
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: center;
				span {
					&#value {
						font-size: 32px;
						font-family: DINPro;
						font-weight: 400;
						color: #51F8DE;
						line-height: 1;
						margin-right: 8px;
					}
					&#utils {
						margin-top: 6px;
						font-size: 24px;
						font-family: Source Han Sans CN;
						font-weight: 400;
						color: #FFFFFF;
						line-height: 1;
						opacity: 0.6;
					}
				}
			}
		}
	}
</style>

<template>
	<div class="header-weather">
		<div class="wrapper">
			<img id="main-icon" :src="weatherInfo.mainIcon">
			<template
				v-for="(item, index) in weatherInfo.itemList"
				:key="index"
			>
				<div class="box">
					<span id="value">{{ item.value }}</span>
					<span id="utils">/{{ item.type + utilMap.get(item.type) }}</span>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		reactive
	} from 'vue';

	const mainIconMap = new Map<string, string>([
		['多云', require<string>('@images/多云.png')],
		['暴风雨', require<string>('@images/暴风雨.png')],
		['晴', require<string>('@images/晴.png')],
		['大雨', require<string>('@images/大雨.png')],
		['小雨', require<string>('@images/小雨.png')],
		['夜间暴风雨', require<string>('@images/夜间暴风雨.png')],
		['夜间小雨', require<string>('@images/夜间小雨.png')],
		['阴', require<string>('@images/阴.png')],
		['雪', require<string>('@images/雪.png')],
	]);

	const utilMap = new Map<string, string>([
		['温度', '℃'],
		['湿度', '%'],
		['降雨', 'mm'],
		['风速', 'm/s'],
	]);

	const weatherInfo = reactive({
		mainIcon: mainIconMap.get('雪'),
		itemList: [
			{
				type: '温度',
				value: '32.1',
			},
			{
				type: '湿度',
				value: '68.4',
			},
			{
				type: '降雨',
				value: '2.1',
			},
			{
				type: '风速',
				value: '10.7',
			},
		]
	});
</script>