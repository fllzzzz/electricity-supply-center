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
	T extends 
	keyof T extends never ? 
	never : keyof RemoveIndex<T> extends keyof RemoveIndex<EChartsOption> ? 
	Omit<EChartsOption, 'baseOption' | 'options'> : never
"> 
	import type {
		EChartsOption,
	} from 'echarts';

	import type {
		RemoveIndex
	} from '@/types';

	import debdounce from '@/utils/debounce';
	import * as echarts from 'echarts/core';

	import {
		PropType,
		ref,
		watchEffect,
		onMounted,
		onUnmounted
	} from 'vue';

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

	const removeInvalid = <T extends object>(
		source :T
	) => {
		if(source instanceof Array) {
			if(source.length === 0) return undefined;

			const result :unknown[] = source.map(item => {
				if(item instanceof Object) return removeInvalid(item);
				return item;
			}).filter(
				item => item ? 
				true : item === 0 ? 
				true : item === '0' ? 
				true : item === false ?
				true : false
			);

			if(result.length === 0) return undefined;
			return result;
		}else if(source instanceof Function) {
			return source;
		}else {
			const result = Object.entries(source).map(row => {
				if(row[1] instanceof Object) {
					row[1] = removeInvalid(row[1]);
				}

				return row;
			}).filter(
				row => row[1] ? 
				true : row[1] === 0 ? 
				true : row[1] === '0' ? 
				true : row[1] === false ?
				true : false
			);

			if(result.length === 0) return undefined;
			return Object.fromEntries(result);
		}
	};

	onMounted(() => {
		elCharts.value &&
		(el => {
			const elWrapper :HTMLElement | null = 
				el.querySelector('.app-charts__wrapper');

			if(! elWrapper) {
				throw new Error('@charts.vue => wrapper is not fond');
			};

			watchEffect(() => {
				const opt = removeInvalid(props.config.chartsOptions);

				if(! opt) return;

				if(! instance) {
					echarts.use(props.config.chartsUseList);
					instance = echarts.init(elWrapper);
				}

				instance.setOption(opt as EChartsOption);
			});

			observer.observe(elWrapper);
		})(elCharts.value);
	});

	onUnmounted(() => {
		observer && observer.disconnect();
		instance && instance.dispose();
	});
</script>