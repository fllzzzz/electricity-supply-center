<style lang="scss" scoped></style>
<template>
	<div></div>
</template>

<script setup lang="ts">
	import {
		ref,Ref,
		inject
	} from 'vue';

	const iframeReceMsg :Ref<unknown> | undefined = inject('iframeReceMsg');
	const iframeSendMsg :Ref<unknown> | undefined = inject('iframeSendMsg');

	const msg = {
		ctid: 12611
	};

	iframeReceMsg && ((t, m) => t.value = m)(
		iframeReceMsg, msg
	);
</script>