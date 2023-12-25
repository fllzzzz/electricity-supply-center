<style lang="scss" scoped>
	.emphasis-monitor {
		width: 100%;
		height: 100%;
		padding: vw(4) vw(4) 0 vw(4);
		position: absolute;
		top: vw(-10);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row wrap;
			justify-content: space-between;
			align-items: flex-start;
		}

		&__wrapper__item {
			height: vw(222);
			max-width: 50%;
			min-width: vw(334);
			/* overflow: hidden; */
			display: flex;
			flex-flow: column nowrap;
			justify-content: space-between;
			align-items: flex-start;
			margin-bottom: vw(4);
			&:nth-last-child(1),
			&:nth-last-child(2) {
				margin-bottom: unset;
			}

		}

		&__wrapper__item__top-side {
			video {
				width: vw(334);
				height: vw(188);
				object-fit: fill;
				border: 2px solid #067D7C;
			}
		}

		&__wrapper__item__bottom-side {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
			margin-left: vw(12);
			.graph.dot {
				width: vw(8);
				height: vw(8);
				background: #6EFFF6;
				border-radius: 50%;
				margin-right: vw(13);
			}
			span {
				line-height: 1;
				height: vw(23);
				font-size: vw(24);
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
			}
		}
	}
</style>

<template>
	<Card
		id="emphasis-monitor"
		:config="{
			title: '重点监控',
			disableLeftIcon: true
		}"
	>
		<div class="emphasis-monitor">
			<div class="emphasis-monitor__wrapper">
				<template
					v-for="(item, index) in config"
					:key="index"
				>
					<div class="emphasis-monitor__wrapper__item">
						<div class="emphasis-monitor__wrapper__item__top-side">
							<video :src="item.src"></video>
						</div>
						<div class="emphasis-monitor__wrapper__item__bottom-side">
							<div class="graph dot"></div>
							<span>{{ item.name }}</span>
						</div>
					</div>
				</template> 
			</div>
		</div>
	</Card>
</template>

<script setup lang="ts">
	import Card from '@/components/Card.vue';

	import {
		reactive
	} from 'vue';


	const config = reactive([
		{
			name: '西大门',
			src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
		},
		{
			name: '北面拐角',
			src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
		},
		{
			name: '西南口拐角',
			src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
		},
		{
			name: '中线大路',
			src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
		},
		{
			name: '供电所门口',
			src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
		},
		{
			name: '管控中心',
			src: 'https://www.w3school.com.cn/example/html5/mov_bbb.mp4'
		},
	]);
</script>