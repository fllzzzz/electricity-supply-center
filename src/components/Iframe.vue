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
		PropType,
		onMounted,
		onUnmounted,
		watchEffect
	} from 'vue';

	type Config = {
		src :string;
		message :unknown;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	let iframeSrv :IframeService;
	const elIframe = ref<HTMLIFrameElement | undefined>(undefined);


	const init = (
		element :HTMLIFrameElement
	) => {
		IframeService.addListener();

		iframeSrv = new IframeService(
			props.config!.src,
			element
		);

		watchEffect(() => iframeSrv.sender(props.config?.message));
	};

	onMounted(() => {
		if(! elIframe.value)
			throw new Error('iframe is not load');

		if(! elIframe.value.contentWindow)
			throw new Error('contentWindow is not load');

		init(elIframe.value);
	});

	onUnmounted(() => {
		IframeService.removeListener();
		iframeSrv.removeReveicer();
	});
</script>