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
		ref,reactive,
		provide,
		watchEffect,
	} from 'vue';

	const iframeSendMsg = ref<unknown>();
	const iframeReceMsg = ref<unknown>();

	provide('iframeSendMsg', iframeSendMsg);
	provide('iframeReceMsg', iframeReceMsg);

	const UEScreen = reactive({
		src: 'http://192.168.1.114:18901',
		message: '' as any,
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
	})

	watchEffect(() => {
		UEScreen.message = iframeReceMsg.value;
	})
</script>