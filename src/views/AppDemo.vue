<style lang="scss" scoped>
	#main {
		width: vw(612);
		height: vw(52);
		background-color: rgba(2, 29, 32, 1);
	}
</style>

<template>
	<div id="main">
		<CardDataSwitch
			:config="dataSwitch"
			:default-active="0"
		></CardDataSwitch>
	</div>
</template>

<script setup lang="ts">
	import {
		Config as DataSwitch
	} from '@/components/CardDataSwitch.vue';

	import CardDataSwitch from '@/components/CardDataSwitch.vue';

	import {
		reactive
	} from 'vue';

	const dataSwitch = reactive<DataSwitch>({
		name: '统计',
		optionList: ['日', '月', '年']
	});
</script>