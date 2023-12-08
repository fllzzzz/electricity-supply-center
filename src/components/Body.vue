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
			.demo-btn-group {
				pointer-events: auto;
				position: absolute;
				top: 50%;left: 50%;
				transform: translate(-50%, -50%);
				width: 600px;
				height: 500px;
				border: 4px dotted red;
				display: flex;
				flex-flow: column nowrap;
				justify-content: flex-start;
				align-items: center;
				button {
					width: 200px;
					height: 80px;
					background-color: black;
					span {
						color: aliceblue;
						font-size: 26px;
					}
				}
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
					:message="message"
				/>
			</RouterView>
<!-- 			<div class="demo-btn-group">
				<button id="guangfu"
					@click="message = 'guangfu'"
				><span>光伏</span></button>
			</div> -->
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		ref,
		reactive		
	} from 'vue';

	const message = ref('');
</script>