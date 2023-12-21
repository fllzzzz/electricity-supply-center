<style lang="scss" scoped>
	.jx-card {
		width: 100%;
		height: 100%;
		display: flex;
		flex-flow: column nowrap;
		justify-content: flex-start;
		align-items: flex-start;

		.jx-card__item {
			width: 100%;
			display: flex;
			&#header {
				height: vw(106);
				flex-flow: row nowrap;
				justify-content: flex-start;
				align-items: flex-start;
				background-image: url('@images/card-header.png');
				background-repeat: no-repeat;
				background-size: 100% 100%;
			}
			&#body {
				flex: 1;
				flex-flow: column;
				justify-content: center;
				align-items: center;
				background-color: rgba(2, 29, 32, 0.58);
				position: relative;
			}
			&#footer {
				height: vw(22);
				background-image: url('@images/card-footer.png');
				background-repeat: no-repeat;
				background-size: 100.25% 100%;
				background-position-y: -1.75px;
			}
		}

		.header-wrapper {
			&#title {
				margin-left: vw(19);
				margin-top: rem(12);
				span {
					height: vw(38);
					font-size:vw(40);
					line-height: 1;
					font-family: Source Han Sans CN;
					font-weight: 500;
					color: #00FFD7;
					text-shadow: 0px 2px 4px #000000;
				}
			}
		}
	}
</style>

<template>
	<div class="jx-card"
	>
		<div class="jx-card__item" id="header">
			<div class="header-wrapper" id="title">
				<span>{{ props.config?.title }}</span>
			</div>
		</div>
		<div class="jx-card__item" id="body">
			<slot name="default"></slot>
		</div>
		<div class="jx-card__item" id="footer"></div>
	</div>
</template>

<script setup lang="ts">
	import {
		PropType
	} from 'vue';

	type Config = {
		title :string;
	};

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
		}
	});
</script>