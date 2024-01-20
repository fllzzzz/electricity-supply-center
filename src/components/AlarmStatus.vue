<style scoped lang="scss">
	.alarm-status {
		width: 100%;
		height: 100%;
		padding: vw(26) 0 vw(10) vw(48);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row wrap;
			.block {
				margin-bottom: vw(32);
				&.is-warning {
					.graph {
						&.circle {
							background-color: #E43333;
						}
					}
				}
				&.is-healthy {
					.graph {
						&.circle {
							background-color: #00FF96;
						}
					}
				}
				&:nth-last-child(1),
				&:nth-last-child(2) {margin-bottom: unset;}
				&:nth-child(2n-1) {margin-right: vw(80);}
				max-width: calc(50% - vw(80));
				min-width: vw(254);
				height: vw(48);
				display: flex;
				flex-flow: row nowrap;
				align-items: center;
				background: linear-gradient(
					135deg,
					rgba(0, 255, 215, 1) vw(8),
					rgba(0, 199, 217, 0.4) 0
				);
				background-size: 100% 100%;
				background-repeat: no-repeat;
				span {
					height: vw(32);
					font-size: vw(32);
					overflow: hidden;
					text-overflow: ellipsis;
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FEFFFF;
					margin-left: vw(23);
					margin-right: vw(46);
				}
				.graph {
					&.circle {
						width: vw(24);
						height: vw(24);
						border-radius: 50%;
					} 
				}
			}
		}
	}
</style>

<template>
	<Card
		:config="{
			title: '告警状态'
		}"
	>
		<div class="alarm-status">
			<div class="alarm-status__wrapper">
				<div v-for="(alarm, i) in config.alarmInfo" :key="i"
					class="block"
					:class="alarm.isWarning ? 'is-warning' : 'is-healthy'"
				>
					<span>{{ alarm.name }}</span>
					<div class="graph circle"></div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import Card from "@/components/Card.vue";

	import {
		reactive
	} from 'vue';

	interface AlarmInfo {
		name :string;
		isWarning :boolean;
	};

	interface Config {
		alarmInfo :AlarmInfo[];
	};

	const config = reactive<Partial<Config>>({
		alarmInfo: [
			{
				name: '高压告警',
				isWarning: false
			},
			{
				name: '高温告警',
				isWarning: false
			},
			{
				name: '低压告警',
				isWarning: false
			},
			{
				name: '低温告警',
				isWarning: false
			},
			{
				name: '水浸告警',
				isWarning: false
			},
			{
				name: '高湿告警',
				isWarning: false
			},
			{
				name: '烟感告警',
				isWarning: false
			},
			{
				name: '低湿告警',
				isWarning: false
			},
			{
				name: '门禁告警',
				isWarning: false
			},
		]
	});
</script>
