<style lang="scss" scoped>
	.light-simulation {
		width: vw(621);
		height: vw(48);
		display: flex;
		flex-flow: row nowrap;
		justify-content: space-between;
		align-items: center;
		position: auto;
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
				<div class="light-simulation__wrapper" id="option"></div>
			</div>
		</template>
	</Card>
</template>
<script setup lang="ts">
	import useDebdounce from '@/utils/debounce';

	import Card from '@/components/Card.vue';

	import {
		NSlider
	} from 'naive-ui';

	import {
		ref,
		reactive,
		watchEffect,
		Ref,
		inject,
		PropType
	} from 'vue';

	type Config = {
		startTime :number;
		endTime :number;
	};

	const props = defineProps({
		ifRece: {
			type: Object
		}
	});

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
	
	watchEffect((() => {
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

		return function() {
			const index = targetList.indexOf(sliderValue.value);

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
	})());

	const sliderToipFormater = (value :number) => {
		return sliderToipStr;
	};
</script>