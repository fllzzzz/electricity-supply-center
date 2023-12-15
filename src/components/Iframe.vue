<style lang="scss" scoped>

</style>

<template>
	<template
		v-if="props.config && props.config.src"
	>
		<iframe
			ref="elIframe"
			:src="props.config.src"
		></iframe>
	</template>
</template>

<script setup lang="ts">
	import IframeService from '@/services/iframeService';

	import {
		ref,
		Ref,
		PropType,
		onMounted,
		onUnmounted,
		watchEffect
	} from 'vue';

	type Config = {
		src :string;
		message :Ref<unknown>;
		handler :((message :unknown) => void)
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	let iframeSrv :IframeService;
	const elIframe = ref<HTMLIFrameElement | undefined>(undefined);

	onMounted(() => {
		if(! elIframe.value)
			throw new Error('iframe is not load');

		const w = elIframe.value.contentWindow;

		console.log('jx', w?.devicePixelRatio);

		elIframe.value.addEventListener('load', () => {
			IframeService.addListener();

			iframeSrv = new IframeService(elIframe.value!);



			iframeSrv.receiver(message => props.config?.handler(message));

			watchEffect(() => {
				if(! props.config?.message.value) return;

				iframeSrv.sender(props.config?.message.value)
			});
		});
	});

	onUnmounted(() => {
		IframeService.removeListener();
		iframeSrv.removeReveicer();
	});
</script>