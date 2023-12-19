<style lang="scss" scoped></style>
<template>
	<div></div>
</template>

<script setup lang="ts">
	import {
		iframe
	} from '@/store';

	import {
		onMounted
	} from 'vue';

	onMounted(() => {
		iframe.toUEMessage.value = {
			ctid: 12611
		};
	});
</script>