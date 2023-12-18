<style lang="scss" scoped>
	iframe.UEScreen {
		position: fixed;
		top: 0;left: 0;
		z-index: 4000;
		width: 3840px;
		height: 2160px;
	}
</style>

<template>
	<Header></Header>
	<Body></Body>
	<Footer></Footer>
	<Iframe
		class="UEScreen"
		:config="{
			src: 'https://bilibili.com'
		}"
	></Iframe>
</template>

<script setup lang="ts">
	import Iframe from '@/components/Iframe.vue';
	import Body from '@/components/Body.vue';
	import Footer from '@/components/Footer.vue';
	import Header from '@/components/Header.vue';
</script>