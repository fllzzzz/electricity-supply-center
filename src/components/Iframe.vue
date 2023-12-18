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
		message :unknown;
		handler :((message :unknown) => void)
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	let iframeSrv :IframeService;
	const elIframe = ref<HTMLIFrameElement | undefined>(undefined);

	watchEffect(() => {
		console.log('jx@iframe=>recver', props.config?.message);
	});

	onMounted(() => {

		if(! elIframe.value)
			throw new Error('iframe is not load');

		const w = elIframe.value.contentWindow;

		elIframe.value.addEventListener('load', () => {
			IframeService.addListener();

			iframeSrv = new IframeService(elIframe.value!);



			iframeSrv.receiver(message => props.config?.handler(message));

			watchEffect(() => {
				if(! props.config?.message) return;

				iframeSrv.sender(props.config?.message)
			});
		});
	});

	onUnmounted(() => {
		IframeService.removeListener();
		iframeSrv.removeReveicer();
	});
</script>