<style lang="scss" scoped>

</style>

<template>
	<Echarts
		:config="{
			chartsOptions: options,
			chartsUseList: useList,
		}"
	></Echarts>
</template>

<script setup lang="ts">
	import Echarts from '@/components/Echarts.vue';

	import {
		ref,
		watchEffect
	} from 'vue';

	import {
		LineChart
	} from 'echarts/charts';

	import {
		GridComponent,
		DatasetComponent
	} from 'echarts/components';

	import {
		SVGRenderer
	} from 'echarts/renderers';

	import type {
		LineSeriesOption
	} from 'echarts/charts';

	import type {
		GridComponentOption,
		DatasetComponentOption
	} from 'echarts/components';

	import type {
		ComposeOption
	} from 'echarts/core';

	type ECOption = ComposeOption<
		| LineSeriesOption
		| GridComponentOption
		| DatasetComponentOption
	>;

	const useList = [
		LineChart,
		GridComponent,
		DatasetComponent,
		SVGRenderer
	];

	const options :ECOption = {
		
	};
</script>