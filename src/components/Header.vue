<style lang="scss" scoped>
	.app-header {
		position: fixed;
		top: 0;left: 50%;
		transform: translateX(-50%);
		z-index: 5000;
		.wrapper {
			width: 100vw;
			height: rem(380);
			background-repeat: no-repeat;
			background-size: 100% 100%;
			background-image: url('@images/标题大框.png');
		}
	}
</style>

<template>
	<div class="app-header">
		<div class="wrapper">

		</div>
	</div>
</template>

<script setup lang="ts">

</script>