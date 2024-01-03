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
			<img id="main-icon" :src="config.image">
			<template
				v-for="(item, index) in config.itemInfoList"
				:key="index"
			>
				<div class="box">
					<span id="value">{{ item.value }}</span>
					<span id="utils">/{{ item.name ?? '' + item.unit ?? '' }}</span>
				</div>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		getWeather
	} from '@/api';

	import {
		reactive,
		onMounted
	} from 'vue';

	type ItemInfo = {
		name? :string;
		value? :number;
		unit? :string;
	};

	type Config = {
		image :string;
		itemInfoList :ItemInfo[];
	};

	const config = reactive<Config>({
		image: '',
		itemInfoList: []
	});
	const nameMap = new Map<string, string[]>([
		['temp', ['温度', '℃']],
		['humidity', ['湿度', '%']],
		['rain', ['降雨', 'mm']],
		['windSpeed', ['风速', 'm/s']],
	]);
	const imageMap = new Map<string, string>([
		['小雨', require<string>('@images/小雨.png')],
		['阵雨', require<string>('@images/阵雨.png')],
		['雷阵雨', require<string>('@images/雷阵雨.png')],
		['中雨', require<string>('@images/中雨.png')],
		['大雨', require<string>('@images/大雨.png')],
		['暴雨', require<string>('@images/暴雨.png')],
		['大暴雨', require<string>('@images/大暴雨.png')],
		['雨夹雪', require<string>('@images/雨夹雪.png')],
		['小雪', require<string>('@images/小雪.png')],
		['中雪', require<string>('@images/中雪.png')],
		['阵雪', require<string>('@images/阵雪.png')],
		['大雪', require<string>('@images/大雪.png')],
		['暴雪', require<string>('@images/暴雪.png')],
		['冻雨', require<string>('@images/冻雨.png')],
		['阴', require<string>('@images/阴.png')],
		['多云', require<string>('@images/多云.png')],
		['晴', require<string>('@images/晴.png')],
		['雾', require<string>('@images/雾.png')],
		['霾', require<string>('@images/霾.png')],
		['浮尘', require<string>('@images/浮尘.png')],
		['扬沙', require<string>('@images/扬沙.png')],
		['沙尘暴', require<string>('@images/沙尘暴.png')],
	]);

	const init = () => {
		getWeather().then(result => result && Object.entries(result).forEach(row => {
			if(row[0] === 'description') {
				config.image = imageMap.get(row[1] as string) ?? '';
				return;
			}

			config.itemInfoList.push({
				name: (nameMap.get(row[0]) ?? [])[0] ?? '',
				unit: (nameMap.get(row[0]) ?? [])[1] ?? '',
				value: row[1] as number ?? 0,
			});
		}));
	};

	init();
</script>