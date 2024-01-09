<style scoped lang="scss">
.ernings-overview {
	width: 100%;
	height: 100%;
	padding: vw(30) 0 0 vw(66);
	
	&__wrapper {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: row nowrap;
	}

	.block {
		max-width: calc(50% - vw(85));
		height: vw(236);
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: center;
		margin-right: vw(85);
		&:last-child {margin-right: unset;}
		.row {
			width: 100%;
			display: flex;
			flex-flow: row nowrap;
			&:nth-child(1) {
				align-items: flex-end;
				justify-content: flex-end;
				margin-bottom: vw(5);
				span {
					color: #FFFFFF;
					&:nth-child(1) {
						overflow: hidden;
						text-overflow: ellipsis;
						height: vw(53);
						font-size: vw(53);
						font-family: DIN;
						font-weight: bold;
					}
					&:nth-child(2) {
						white-space: nowrap;
						height: vw(28);
						font-size: vw(28);
						font-family: Source Han Sans CN;
						font-weight: 400;
						opacity: 0.6;
						margin-left: vw(14);
						margin-bottom: vw(10);
					}
				}
			}
			&:nth-child(2) {
				justify-content: center;
				width: vw(218);
				height: vw(129);
				margin-bottom: vw(19);
				img {
					width: 100%;height: 100%;
					object-fit: fill;
				}
			}
			&:nth-child(3) {
				align-items: center;
				justify-content: center;
				span {
					overflow: hidden;
					text-overflow: ellipsis;
					height: vw(32);
					font-size: vw(32);
					font-family: Source Han Sans CN;
					font-weight: 400;
					color: #FFFFFF;
				}
			}
		}
	}
}
</style>

<template>
	<Card :config="{
		title: '收益统计'
	}">
		<div class="ernings-overview">
			<div class="ernings-overview__wrapper">
				<div v-for="(data, i) in config?.data" :key="i"
					class="block"
				>
					<div class="row">
						<span>{{ data.value }}</span>
						<span>万元</span>
					</div>
					<div class="row">
						<img src="@images/收益icon.png">
					</div>
					<div class="row">
						<span>{{ data.name }}</span>
					</div>
				</div>
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
import Card from '@/components/Card.vue';
import {
	ref
} from 'vue';

interface Config {
	data :{
		name :string;
		value :number;
	}[]
};

const config = ref<Config | undefined>({
	data: [
		{
			name: '日收益额',
			value: 22
		},
		{
			name: '总收益额',
			value: 190
		},
	]
});

</script>

