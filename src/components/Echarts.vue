<style lang="scss" scoped>
	.app-charts {
		display: flex;
		width: 100%;
		height: 100%;
		&__wrapper {
			width: 100%;
			height: 100%;
		}
	}
</style>
	
<template>
	<div class="app-charts" ref="elCharts">
		<div class="app-charts__wrapper"></div>
	</div>
</template>

<script setup lang="ts">
	import debdounce from '@/utils/debounce';
	import * as echarts from 'echarts/core';

	import {
		PropType,
		ref,
		onMounted,
		onUnmounted
	} from 'vue';

	import type {
		EChartsOption
	} from 'echarts';

	type EChartsExtensions = 
		(typeof echarts.use extends 
		((...args :infer P) => void) ? P : never)[0];

	type Config = {
		chartsOptions :unknown;
		chartsUseList :EChartsExtensions;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true
		}
	});

	let instance :echarts.ECharts;

	const elCharts = ref<HTMLElement | undefined>(undefined);

	const observer = new ResizeObserver(debdounce<
		((
			entryList :ResizeObserverEntry[],
			observer :ResizeObserver
		) => void)
	>((entryList, observer) => {
		for(const entry of entryList) {
			const {inlineSize: w, blockSize: h} = entry.borderBoxSize[0];

			if(w === 0 && h === 0) {
				observer.unobserve(entry.target);
				return;
			}

			const _instance = 
				echarts.getInstanceByDom(entry.target as HTMLElement);

			_instance && _instance.resize();
		}
	}, 20));

	
	const isEchartOption = (x :unknown) :x is EChartsOption => {
		if(
			x &&
			typeof x  === 'object' &&
			'series' in x
		) return true;
		return false;
	};

	onMounted(() => {
		elCharts.value &&
		(el => {
			const elWrapper :HTMLElement | null = 
				el.querySelector('.app-charts__wrapper');

			if(! elWrapper) {
				throw new Error('@charts.vue => wrapper is not fond');
			};

			if(isEchartOption(props.config.chartsOptions)) {
				echarts.use(props.config.chartsUseList);

				instance = echarts.init(elWrapper);
				instance.setOption(props.config.chartsOptions);
			}else {
				throw new Error('@charts.vue => the config is not EchartOptions');
			}

			observer.observe(elWrapper);
		})(elCharts.value);
	});

	onUnmounted(() => {
		observer && observer.disconnect();
		instance && instance.dispose();
	});
</script>