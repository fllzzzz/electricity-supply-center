<style lang="scss" scoped>
	svg {
		width: 100%;height: 100%;
		border: 6px solid red;
	}
</style>

<template>
	<svg
		xmlns="demo"
	>
		<path
			d="
				M 200,50
				L 500,50
				C 600,50 600,150 500,150
				L 250,150
				C 150,150 150,300, 250,300
			"
			fill="none"
			stroke="rgba(128,128,128,1)" stroke-width="5"
		></path>
		<path
			d="
				M 200,50
				L 500,50
				C 600,50 600,150 500,150
				L 250,150
				C 150,150 150,300, 250,300
			"
			fill="none"
			stroke="rgba(128,128,128,0.3)" stroke-width="5"
		></path>
	</svg>
</template>

<script setup lang="ts">
	import {
		onMounted
	} from 'vue';

	onMounted(() => {
		const path = document.getElementsByTagName('path')[0];
		const path1 = document.getElementsByTagName('path')[1];

		path.style.strokeDashoffset = 
		path.style.strokeDasharray = 
			path.getTotalLength().toString();

		const u = (parseInt(path.style.strokeDashoffset)) / 100;

		setInterval(() => {
			path.style.strokeDashoffset = 
				(parseInt(path.style.strokeDashoffset) - u).toString();
		},10);
	});
</script>