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
	<Iframe
		class="UEScreen"
		:config="UEScreen"
	></Iframe>
</template>

<script setup lang="ts">
	import {
		UEMessage
	} from '@/types';

	import Iframe from '@/components/Iframe.vue';
	import Body from '@/components/Body.vue';
	import Footer from '@/components/Footer.vue';
	import Header from '@/components/Header.vue';

	import {
		ref,
		provide,
	} from 'vue';

	const iframeSendMsg = ref<unknown>();
	const iframeReceMsg = ref<unknown>();

	provide('iframeSendMsg', iframeSendMsg);
	provide('iframeReceMsg', iframeReceMsg);

	const UEScreen = {
		src: 'http://192.168.1.114:18901',
		message: iframeReceMsg,
		handler(message :unknown) {
			const isUEMessage = (
				message :unknown
			) :message is UEMessage => {
				if (
					message &&
					typeof message === 'object' &&
					'ctid' in message
				) return true;
				return false;
			};

			iframeSendMsg.value = message;
		}
	};
</script>