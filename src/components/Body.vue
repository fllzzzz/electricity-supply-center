<style lang="scss" scoped>
	.app-body {
		position: fixed;
		top: 0;left: 0;
		z-index: 6000;
		&, & > .wrapper {
			pointer-events: none;
		}
		.wrapper {
			width: 100vw;
			height: 100vh;
			position: relative;
			& > * {
				z-index: 6000;
				pointer-events: auto;
			}
		}
	}
</style>

<template>
	<div class="app-body">
		<div class="wrapper">
			<RouterView
				v-slot="{Component}"
			>
				<component
					:is="Component"
				/>
			</RouterView>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive		
	} from 'vue';
</script>