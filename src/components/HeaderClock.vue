<style lang="scss" scoped>
	@font-face {
		font-family: LESLIE;
		src: url('@/assets/fonts/LESLIEB.TTF');
	}

	.header-clock {
		& > .wrapper {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: flex-start;
			#date {
				margin-right: 36px;
				span {
					font-size: 32px;
					font-family: LESLIE;
					font-weight: 400;
					color: #00AFB3;
					line-height: 1;
				}
			}
			#time {
				font-size: 44px;
				font-family: LESLIE;
				font-weight: 400;
				color: #00AFB3;
				line-height: 1;
			}
		}
	}
</style>

<template>
	<div class="header-clock">
		<div class="wrapper">
			<div id="date">
				<template
					v-for="(item, index) in dateTime.slice(0, 3)"
				>
					<span id="value">{{ item }}</span>
					<span id="split"
						v-if="! (index === dateTime.slice(0, 3).length - 1)"
					>-</span>
				</template>
			</div>
			<div id="time">
				<template
					v-for="(item, index) in dateTime.slice(3)"
				>
					<span id="value">{{ item }}</span>
					<span id="split"
						v-if="! (index === dateTime.slice(3).length - 1)"
					>:</span>
				</template>
			</div>
		</div>
	</div>
</template>
<script setup lang="ts">
	import {
		reactive,
		onMounted,
		onUnmounted
	} from 'vue';

	let timer :number | undefined = undefined;
	const dateTime = reactive<number[]>([]);

	const init = () => {
		const date = new Date();

		date.toLocaleDateString().split('/')
			.map(item => parseInt(item))
			.concat(
				date.toLocaleTimeString().split(':')
					.map(item => parseInt(item))
			).forEach((item, index) => {
				dateTime[index] = item;
			});
	};

	onMounted(() => {
		timer = setInterval(init, 1000);
	});

	onUnmounted(() => {
		clearInterval(timer);
	});
</script>