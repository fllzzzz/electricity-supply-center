<style scoped lang="scss">
	.crop-generation-index {
		width: 100%;height: 100%;
		display: flex;
		flex-flow: row nowrap;
		justify-content: center;
		align-items: center;

		&__wrapper {
			display: flex;
			flex-flow: row nowrap;
			justify-content: center;
			align-items: center;
		}

		.block {
			display: flex;
			flex-flow: row nowrap;
			align-items: center;
			margin-right: vw(40);
			&:last-child {margin-right: unset;}
			span {
				height: vw(27);
				font-size: vw(30);
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				margin-right: vw(9);
			}
		}

		:deep(.n-switch) {
			width: vw(65);
			height: vw(32);
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '设备模拟',
			disableLeftIcon: true
		}"
	>
		<div class="crop-generation-index">
			<div class="crop-generation-index__wrapper">
				<div v-for="s, i in config?.switchList"
					:key="i"
					class="block"
				>
					<span>{{ s.name }}</span>
					<NSwitch 
						:checked-value="s.name"
						:rail-style="handleSwitchRailStyle(s.color)"
					>
					</NSwitch>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import type {
		CSSProperties
	} from 'vue';

	import {
		NSwitch
	} from 'naive-ui';

	import Card from './Card.vue';

	import {
		ref
	} from 'vue';

	interface Switch {
		name :string;
		color :string;
		state :number;
	};

	interface Config {
		switchList :Switch[]
	};

	const config = ref<Config | undefined>({
		switchList: [
			{
				name: '通风器',
				color: '#00FBFF',
				state: 0
			},
			{
				name: '补光灯',
				color: '#00FBFF',
				state: 0
			},
			{
				name: '微喷器',
				color: '#00FBFF',
				state: 0
			},
		],
	});

	const handleSwitchRailStyle = (
		color: string
	) => (info: {
		focused: boolean;
		checked: boolean;
	}) => {
		const style :CSSProperties = {};


		style.background = '#637178';
		if(info.checked) {
			style.background = color;
		};

		return style;
	}
</script>

