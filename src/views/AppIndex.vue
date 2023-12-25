<style lang="scss" scoped>
	iframe.UEScreen {
		position: fixed;
		top: 0;left: 0;
		z-index: 4000;
		width: 100%;
		height: 100%;
	}
</style>

<template>
	<Header></Header>
	<Body></Body>
	<Footer></Footer>
	<Iframe
		class="UEScreen"
		:config="{
			src: 'http://192.168.1.114:18901'
		}"
	></Iframe>
</template>

<script setup lang="ts">
	import Iframe from '@/components/Iframe.vue';
	import Body from '@/components/Body.vue';
	import Footer from '@/components/Footer.vue';
	import Header from '@/components/Header.vue';
</script>