<style lang="scss" scoped>
	.light-simulation {
		width: vw(621);
		height: vw(48);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		position: auto;
		pointer-events: none;
	}

	.light-simulation__wrapper {
		&#start-time,
		&#end-time {
			span {
				height: vw(24);
				font-size: vw(32);
				line-height: 1;
				font-family: DIN;
				font-weight: bold;
				color: #51F8DE;
			}
		}
		&#start-time {
			margin-right: vw(16);
		}
		&#slider {
			flex: 1;
			height: vw(20);
			position: relative;
			pointer-events: auto;
		}
		&#end-time {
			margin-left: vw(14);
		}
		&#option {
			width: vw(84);
			height: 100%;
			margin-left: vw(18);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@images/按钮底.png');
			display: flex;
			align-items: center;
			justify-content: center;
			pointer-events: auto;
			img {
				width: vw(24);
				height: vw(24);
				object-fit: fill;
			}
		}
	}

	:deep(.n-slider) {
		width: 100%;height: 100%;
		position: absolute;
		top: 0;left: 0;
		display: flex;
		align-items: center;
		.n-slider-rail {
			background-color: rgba(81, 248, 222, 0.1) !important;
			height: vw(2);
		}
		.n-slider-rail__fill {
			background-color: rgba(81, 248, 222, 1) !important;
			height: vw(4);
		}
		.n-slider-handle {
			background-color: rgba(81, 248, 222, 1) !important;
		}
	}
</style>

<style lang="scss">
	.n-slider-handle-indicator {
		width: unset !important;
		height: unset !important;
		padding:  unset !important;
		box-shadow: unset !important;
		background: transparent !important;
		margin-top: vw(8) !important;
		height: vw(24) !important;
		font-size: vw(32)!important;
		font-family: DIN !important;
		font-weight: 400 !important;
		color: #FFFFFF !important;
		line-height: 1 !important;
		/* opacity: 0.5 !important; */
	}

	.v-binder-follower-container {
		z-index: 5000 !important;
	}
</style>

<template>
	<Card
		id="light-simulation"
		:config="{
			title: '光照模拟'
		}"
	>
		<template #default>
			<div class="light-simulation">
				<div class="light-simulation__wrapper" id="start-time">
					<span>{{ config.startTime + ':00' }}</span>
				</div>
				<div class="light-simulation__wrapper" id="slider">
					<NSlider
						v-model:value="sliderValue"
						:style="sliderStyle"
						:tooltip="true"
						:show-tooltip="sliderToipAwaysShow"
						placement="bottom"
						:format-tooltip="sliderToipFormater"
					></NSlider>
				</div>
				<div class="light-simulation__wrapper" id="end-time">
					<span>{{ config.endTime + ':00' }}</span>
				</div>
				<div class="light-simulation__wrapper" id="option">
					<img :src="playerManager.img.value"
						@click="playerManager.clickHandler"
					>
				</div>
			</div>
		</template>
	</Card>
</template>
<script setup lang="ts">
	import useDebdounce from '@/utils/debounce';
	import MessageObserver from '@/services/MessageObserver';

	import Card from '@/components/Card.vue';

	import {
		iframe
	} from '@/store';

	import {
		NSlider
	} from 'naive-ui';

	import {
		ref,Ref,
		reactive,
		watchEffect,
		computed,
	} from 'vue';

	type Config = {
		startTime :number;
		endTime :number;
	};

	const config = reactive<Partial<Config>>({
		startTime: 6,
		endTime: 18
	});

	const sliderStyle = {
		'--n-handle-size': (20 / 3840 * 100).toString() + 'vw',
	};
	
	const sliderToipAwaysShow = ref(false);
	const sliderValue = ref(0);
	let sliderToipStr :string;

	const playerManager = {
		count: 0,
		isPlayer: ref(false),
		imgMap: new Map([
			['play', require<string>('@images/播放.png')],
			['pause', require<string>('@images/暂停.png')],
		]),
		get img() {
			return computed(() => {
				if(this.isPlayer.value) return this.imgMap.get('pause')!;
				return this.imgMap.get('play')!;
			});
		},
		interval: Math.ceil(10000 / 100),
		repeatHandler() {
			sliderValue.value ++;
		},
		timer: -1,
		clickHandler() {
			this.count++;
			this.isPlayer.value = ! this.isPlayer.value;

			if(this.isPlayer) {
				sliderValue.value = 0;
				sliderToipAwaysShow.value = ! sliderToipAwaysShow.value;
				this.repeatHandler();
				this.timer = setInterval(() => {
					if(sliderValue.value >= 100) {
						clearInterval(this.timer);
						this.isPlayer.value = ! this.isPlayer.value;
						sliderToipAwaysShow.value = ! sliderToipAwaysShow.value;
						return;
					}
					this.repeatHandler();
				}, this.interval); 
			}else {
				clearInterval(this.timer);
				sliderValue.value = 0;
			}
		}
	};



	
	const init = () => {
		const lapse = Math.ceil(100 / 12);
		let targetList :number[] = [];

		let i = 100;
		while(true) {
			i -= lapse;

			if(i <= 0) {
				targetList = targetList.reverse();
				targetList.push(100);
				break;
			}else {
				targetList.push(i);
			}
		}

		sliderToipStr = '06:00'
		let flg10 = 0;

		return function(sliderValue :Ref<number>) {
			flg10++;

			const index = targetList.indexOf(sliderValue.value);
			
			const autoHandler = () => {
				if(index !== -1) {
					sliderToipStr = `${config.startTime! + index +1}:00`;
				}
			};

			const clickHandler = () => {
					if(index === -1) {
					const maxList = 
						targetList.filter(item => item > sliderValue.value);
					const smallList =
						targetList.filter(item => item < sliderValue.value);
					
					smallList.sort((a, b) => {
						if(a > b) return -1;
						if(a < b) return 1;
						if(a === b) return 0;
						return 0;
					});

					maxList.sort((a, b) => {
						if(a > b) return 1;
						if(a < b) return -1;
						if(a === b) return 0;
						return 0;
					});

					const maxNum = maxList[0];
					const minNum = smallList[0];

					const maxDiff = Math.abs(maxNum - sliderValue.value);
					const minddiff = Math.abs(minNum - sliderValue.value);

					const target = maxDiff > minddiff ? maxNum : minNum;

					const _index = targetList.indexOf(target);

					sliderToipStr = `${config.startTime! + _index +1}:00`;
				}else {
					sliderToipStr = `${config.startTime! + index +1}:00`;
				}
			};

			if(flg10 >= 2) {
				if(playerManager.isPlayer.value) {
					autoHandler();
				}else {
					clickHandler();
				}

				try {
					
				} catch (error) {
					console.log('jx',error);
				}
			}
		};
	};

	const hndler = init();

	watchEffect(() => hndler(sliderValue));

	const sliderToipFormater = (value :number) => {
		return sliderToipStr;
	};
</script>