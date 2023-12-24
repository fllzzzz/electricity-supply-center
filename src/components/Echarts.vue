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

<script setup lang="ts" generic="
	T  extends
	keyof RemoveIndex<T> extends
	keyof RemoveIndex<EChartsOption> ? unknown : never
">
	import debdounce from '@/utils/debounce';
	import * as echarts from 'echarts/core';

	import {
		PropType,
		ref,
		watchEffect,
		onMounted,
		onUnmounted
	} from 'vue';

	import type {
		EChartsOption,
	} from 'echarts';

	import type {
		RemoveIndex
	} from '@/types';

	type EChartsExtensions = 
		(typeof echarts.use extends 
		((...args :infer P) => void) ? P : never)[0];

	type Config = {
		chartsOptions :T;
		chartsUseList :EChartsExtensions;
	};

	const emits = defineEmits(['rezise']);
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

			emits('rezise');

			const _instance = 
				echarts.getInstanceByDom(entry.target as HTMLElement);

			_instance && _instance.resize();
		}
	}, 20));

	onMounted(() => {
		elCharts.value &&
		(el => {
			const elWrapper :HTMLElement | null = 
				el.querySelector('.app-charts__wrapper');

			if(! elWrapper) {
				throw new Error('@charts.vue => wrapper is not fond');
			};

			watchEffect(() => {
				if(! instance) {
					echarts.use(props.config.chartsUseList);
					instance = echarts.init(elWrapper);
				}

				instance.setOption(props.config.chartsOptions as EChartsOption);
			});

			observer.observe(elWrapper);
		})(elCharts.value);
	});

	onUnmounted(() => {
		observer && observer.disconnect();
		instance && instance.dispose();
	});
</script>