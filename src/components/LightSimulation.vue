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
		opacity: 0.5 !important;
		/* transition: all 3s linear !important; */
	}

	.v-binder-follower-container {
		z-index: 6000 !important;
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
	import throttle from '@/utils/throttle';
	import Card from '@/components/Card.vue';

	import {
		iframe
	} from '@/store';

	import {
		NSlider
	} from 'naive-ui';

	import {
		ref,
		reactive,
		watch,
		computed,
	} from 'vue';

	type Config = {
		startTime :number;
		endTime :number;
	};

	const config = reactive<Config>({
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
		isPlay: ref(false),
		isPlayed: false,
		imgMap: new Map([
			['play', require<string>('@images/播放.png')],
			['pause', require<string>('@images/暂停.png')],
		]),
		get img() {
			return computed(() => {
				if(this.isPlay.value) return this.imgMap.get('pause')!;
				return this.imgMap.get('play')!;
			});
		},
		interval: Math.ceil(10000 / 100),
		repeatHandler() {
			if(sliderValue.value < 100) {
				sliderValue.value++;
				return;
			}

			clearInterval(this.timer);
			this.isPlayed = false;
			if(this.isPlay.value)
				this.isPlay.value = false;
			if(sliderToipAwaysShow.value)
				sliderToipAwaysShow.value = false;
		},
		timer: -1,
		playerHandler() {
			if(! this.isPlay.value)
				this.isPlay.value = true;

			if(! this.isPlayed) {
				sliderValue.value = 0;
				this.isPlayed = true;
			}

			if(! sliderToipAwaysShow.value)
				sliderToipAwaysShow.value = true;

			this.repeatHandler();
			this.timer = setInterval(
				() => this.repeatHandler(),
				this.interval
			); 
		},
		pasueHandler() {
			clearInterval(this.timer);
			if(this.isPlay.value)
				this.isPlay.value = false;
		},
		clickHandler() {
			if(this.isPlay.value) {
				this.pasueHandler()
			}else {
				this.playerHandler()
			};
		}
	};

	watch(sliderValue, ((
		config: {
			startTime :number
			endTime :number
		}
	) => {
		const _anchorPointList = (function() {
			const result :number[] = [];
			const lapse = Math.ceil(
				100 / Math.abs(config.endTime - config.startTime)
			);

			let i = 100;
			while(1) {
				i -= lapse;
				if(i <= 0) {
					result.unshift(100);
					result.reverse();
					break;
				}

				result.push(i);
			}

			return result;
		})();

		const _getTotipValue = (() => {
			let _result :string;

			return function (
				value :number,
				target :number[],
				startTime :number
			) :string | never {
				_result = `${startTime}:00`;

				const index = target.indexOf(value);

				if(index === -1) {
					const limits = [
						target.filter(
							item => value > item ? true : false
						).sort((a, b) => a < b ? 1 : -1)[0],
						target.filter(
							item => value > item ? false : true
						).sort((a, b) => a < b ? -1 : 1)[0],
					];

					const _target = 
						Math.abs(value - limits[0]) <
						Math.abs(value - limits[1]) ?
						limits[0] : limits[1];
					
					const _index = target.indexOf(_target);
						
					_result = `${startTime + _index + 1}:00`;

/* 					console.log(
						'@light ==>', '\r\n',
						'value: ', value, '\r\n',
						'limits: ', limits, '\r\n',
						'target: ', _target, '\r\n',
						'index: ', _index, '\r\n',
						'result: ', _result, '\r\n',
					); */

					return _result;
				} else if(index >= 0) {
					_result = `${startTime + index + 1}:00`;

					return _result;
				}else {
					throw new Error('index out of range');
				}
			}
		})();

		const _messageTransporter = throttle<
			((
				time :string
			) => Promise<boolean>)
		>(async time => {
			return await new Promise<boolean>(resolve => {
				iframe.toUEMessage.value = {
					ctid: 12121, time
				};
				resolve(true);
			}); 
		}, 100);

		return (value :number) => {
			const toptipValue = _getTotipValue(
				value,
				_anchorPointList,
				config.startTime
			);

			sliderToipStr = toptipValue;
			
			_messageTransporter(toptipValue.split(':')[0]);
		};
	})
	({
		startTime: config.startTime,
		endTime: config.endTime
	}));

	const sliderToipFormater = (value :number) => {
		return sliderToipStr;
	};
</script>