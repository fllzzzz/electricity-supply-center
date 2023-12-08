<style lang="scss" scoped>
	iframe {
		position: fixed;
		top: 0;left: 0;
		width: 100vw;
		height: 100vh;
		z-index: 4000;
	}
</style>

<template>
	<Header></Header>
	<Body></Body>
	<Footer></Footer>
	<iframe
		src="http://192.168.1.114:18901"
	></iframe>
</template>

<script setup lang="ts">
	import Body from '@/components/Body.vue';
	import Footer from '@/components/Footer.vue';
	import Header from '@/components/Header.vue';
</script>