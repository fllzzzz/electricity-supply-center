<style scoped lang="scss">
	.card-data-switch {
		width: 100%;
		height: 100%;
		padding-left: vw(12);
		padding-right: vw(37);
		background-color: rgba(81, 248, 222, 0.1);

		&__wrapper {
			width: 100%;
			height: 100%;
			display: flex;
			flex-flow: row nowrap;
			justify-content: space-between;
			align-items: center;
			span {
				line-height: 1;
			}
		}

		&__wrapper__title {
			span {
				height: vw(32);
				font-size: vw(32);
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
			}
		}

		&__wrapper__options {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-end;
			align-items: center;
			& > span {
				height: vw(28);
				font-size: vw(28);
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #FFFFFF;
				margin-left: vw(36);
				&:first-child {margin-left: unset;}
				&.is-active {color: #00FFFF;}
			}
		}

		&__wrapper__title,
		&__wrapper__options {
			max-width: 50%;
			overflow: hidden;
		}
	}
</style>

<template>
	<div class="card-data-switch">
		<div class="card-data-switch__wrapper">
			<div class="card-data-switch__wrapper__title">
				<span>{{ config?.name }}</span>
			</div>
			<div class="card-data-switch__wrapper__options"
				@click="handleOptionClick"
			>
				<span v-for="(opt, i) in config?.optionList" :key="i"
					:data-name="opt"
					:class="[
						setOptionState(i),
					]"
				>
					{{ opt }}
				</span>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
	import type { 
		PropType
	} from 'vue';

	 import {
		ref,
		watchEffect,
		computed,
	} from 'vue';

	export interface Config {
		name :string;
		optionList :string[];
	};

	const emits = defineEmits([
		'select',
	]);

	const props = defineProps({
		config: {
			type: Object as PropType<Config>,
			required: true,
		},
		defaultActive: {
			type :Number
		},
	});

	const config = ref<Config | undefined>();
	const setOptionState = computed(() => (index :number) => {
		if(props.defaultActive === index) return 'is-active';

		return '';
	});
	
	const handleOptionClick = (e :MouseEvent) => {
		const attr = (e.target as HTMLElement).getAttribute('data-name');
		if(! attr) return;

		for (
			const el of (
				(e.target as HTMLElement).parentElement?.children
				?? []
			)
		) {
			if(el.getAttribute('data-name') === attr) {
				el.classList.toggle('is-active');
			}else {
				el.classList.remove('is-active');
			};
		}

		emits('select', attr);
	};

	watchEffect(() => config.value = props.config);
</script>
