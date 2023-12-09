<style lang="scss" scoped>
	iframe.UEScreen {
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
	<zIframe
		class="UEScreen"
		:config="UEScreen"
	></zIframe>
</template>

<script setup lang="ts">
	import zIframe from '@/components/Iframe.vue';
	import Body from '@/components/Body.vue';
	import Footer from '@/components/Footer.vue';
	import Header from '@/components/Header.vue';

	import {
		reactive
	} from 'vue';

	const UEScreen = {
		src: 'http://192.168.1.114:18901',
		message: 'saSAsa'
	};
</script>