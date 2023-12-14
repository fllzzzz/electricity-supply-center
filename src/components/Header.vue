<style lang="scss" scoped>
	@font-face {
		font-family: YouSheBiaoTiHei;
		src: url('@fonts/优设标题黑.TTF');
	}

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
			span#name {
				letter-spacing: 10px;
				display: inline-block;
				width: 672px;
				font-size: 80px;
				font-family: YouSheBiaoTiHei;
				font-weight: 400;
				color: #FFFFFF;
				text-shadow: 0px 6px 4px rgba(2,37,36,0.8);
				line-height: 1;
				position: fixed;
				left: 50%;
				top: 57px;
				transform: translateX(-50%);
			}
		}
	}

	.header-options {
		position: absolute;
		left: 3129px;
		top: 35px;
	}

	.header-weather {
		position: absolute;
		left: 36px;
		top: 10px;
	}

	.header-clock {
		position: absolute;
		right: 33px;
		top: 28px;
	}
</style>

<template>
	<div class="app-header">
		<div class="wrapper">
			<span id="name"
				@click="$router.push({name: 'standby-video'})"
			>调河头零碳供电所</span>
			<HeaderWeather></HeaderWeather>
			<HeaderOptions></HeaderOptions>
			<HeaderClock></HeaderClock>
		</div>
	</div>
</template>

<script setup lang="ts">
	import HeaderClock from './HeaderClock.vue';
	import HeaderWeather from './HeaderWeather.vue';
	import HeaderOptions from './HeaderOptions.vue';

	import {
		onMounted
	} from 'vue';
</script>