<style lang="scss" scoped>

</style>

<template>
	<template
		v-if="props.config?.src"
	>
		<iframe
			ref="elIframe"
			:src="props.config.src"
		></iframe>
	</template>
</template>

<script setup lang="ts">
	import MessageObserver from '@/services/MessageObserver';

	import {
		UEScreenMessage
	} from '@/types';

	import {
		PropType,
		ref,
		computed,
		onMounted,
		onUnmounted
	} from 'vue';

	type Config = {
		src :string;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>
		}
	});

	const elIframe = ref<HTMLIFrameElement | undefined>(undefined);
	const toWebMessage = MessageObserver.createObservation<{
		value :Partial<UEScreenMessage>
	}>('toWebScreen', {
		value: {}
	});

	const getIframeSrc = computed(() => {
		const result = props.config?.src.match(
			new RegExp('(?:http|https)://(?:.*[0-9])', 'g')
		);

		return result ? result[0] : '';
	});

	const isString = (x :unknown) :x is string => {
		if(typeof x === 'string') return true;
		return false;
	};

	const isUEScreenMessage = (x :object) :x is UEScreenMessage => {
		if('ctid' in x) return true;
		return false;
	};

	const messageEventHandler = (
		event :MessageEvent<unknown>
	) => {
		if(isString(event.data)) {
			const data = JSON.parse(event.data);
			if(isUEScreenMessage(data)) {
				toWebMessage.value = data;
			}
		}
	};

	onMounted(() => {
		elIframe.value &&
		elIframe.value.contentWindow &&
		(window => {
			MessageObserver.registObserver<(
				(message :{value :unknown}) => void
			)>(
				message => window.postMessage(
					message.value, getIframeSrc.value
				), 'toUEScreen'
			);
		})
		(elIframe.value.contentWindow);

		window.addEventListener('message', messageEventHandler);
	});

	onUnmounted(() => {
		window.removeEventListener('message', messageEventHandler);
	});
</script>