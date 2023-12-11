<style lang="scss" scoped>

</style>

<template>
	<div class="header-clock">
		<div class="wrapper">

		</div>
	</div>
</template>
<script setup lang="ts">
	import {
		reactive,
		onMounted,
		onUnmounted
	} from 'vue';

	let timer :number | undefined = undefined;
	const dateTime = reactive<number[]>([]);

	const init = () => {
		const date = new Date();

		date.toLocaleDateString().split('/')
			.map(item => parseInt(item))
			.concat(
				date.toLocaleTimeString().split(':')
					.map(item => parseInt(item))
			).forEach((item, index) => {
				dateTime[index] = item;
			});
	};

	onMounted(() => {
		timer = setInterval(init, 1000);
	});

	onUnmounted(() => {
		clearInterval(timer);
	});
</script>