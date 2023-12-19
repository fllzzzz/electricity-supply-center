<style lang="scss" scoped></style>

<template>
	<div></div>
</template>

<script setup lang="ts">
	import {
		ref,
		watchEffect
	} from 'vue';

	const u = ref(0);

	watchEffect((() => {
		let i = 0;
		console.log('closePackage');

		return () => {
			i++;
			u.value = 100;
			console.log(u.value, i);
		};
	})());


	setTimeout(() => u.value = 50, 3000);
</script>