<style lang="scss" scoped>
	.header-options {
		& > .wrapper {
			display: flex;
			flex-flow: row nowrap;
			justify-content: flex-start;
			align-items: center;
		}
	}

	.el-select {
		:deep(.el-input) {
			.el-input__wrapper {
				padding: 0 !important;
				box-shadow: none !important;
				border-radius: 0 !important;
				background: transparent !important;
			}
			.el-input__inner {
				font-size: calc(var(--fontSize) * 1px);
				color: unset;
				user-select: none;
			}
		}
	}
	.first-class {
		font-size: calc(var(--fontSize) * 1px);
	}

	.first-class.is-out {
		&:hover {
			color: red;
		}
	}
	
	.split-symbol {
		margin: 0 8px 0 8px;
		font-size: calc(var(--fontSize) * 1px);
	}
</style>

<template>
	<div class="header-options">
		<div class="wrapper"
			:style="{
				'--fontSize': fontSize
			}"
		>
			<span
				class="first-class"
				:class="overview.store.model ? 'is-out' : ''"
			>全部区域</span>
			<template
				v-if="overview.store.model"
			>
				<span class="split-symbol">/</span>
				<ElSelect
					ref="elSelect"
					v-model="selectContent"
					@change="selectChangeHandler"
				>
					<template
						v-for="(item, index) in getOptions"
						:key="index"
					>
						<ElOption
							:value="item"
						></ElOption>
					</template>
				</ElSelect>
			</template>
		</div>
	</div>
</template>

<script setup lang="ts">
	import {
		overview
	} from '@/store';

	import {
		ElSelect,
		ElOption
	} from 'element-plus';

	import {
		ref,
		onMounted,
		onUnmounted,
		computed
	} from 'vue';
	
	const fontSize = 32;
	const elSelect = ref<unknown>(undefined);
	const selectContent = ref<string | undefined>(undefined);
	let elInput :HTMLInputElement | undefined = undefined;


	overview.store.model = '光伏区域';

	const optionsList :string[] = [
		'光伏区域',
		'储能区域',
		'充电桩',
		'智慧农业',
	];

	const getOptions = computed(() => {
		return optionsList.filter(item => item !== overview.store.model);
	})	

	const selectInputBoxSizeAdapter = (
		options :{
			fontSize :number,
			fontFamily? :string
		}
	) => {
		const ctx = (
			document.createElement('canvas') as HTMLCanvasElement
		).getContext('2d');

		ctx && (function(ctx) {
			const [size, family] = [
				options.fontSize.toString() + 'px',
				options.fontFamily ? options.fontFamily : "''"
			];

			ctx.font = `${size} ${family}`;
		})(ctx);

		return (
			str :string,
			el :HTMLInputElement
		) => {
			ctx && (function(ctx) {
				const mst = ctx.measureText(str);
				const [w, h] = [
					[
						Math.abs(mst.actualBoundingBoxLeft) +
						Math.abs(mst.actualBoundingBoxRight)
					],
					[
						Math.abs(mst.fontBoundingBoxAscent) +
						Math.abs(mst.fontBoundingBoxDescent)
/* 						Math.abs(mst.actualBoundingBoxAscent) +
						Math.abs(mst.actualBoundingBoxDescent) */
					]
				];

				Object.assign(
					el.style,
					{
						width: w.toString() + 'px',
						height: h.toString() + 'px',
					}
				);
			})(ctx);
		};
	};

	const adapter = selectInputBoxSizeAdapter({
		fontSize
	})

	const selectChangeHandler = (
		value :unknown
	) => {
		adapter(value as string, elInput!);
	};

	const selectBoxInit = () => {
		if(! elSelect.value) return;

		const {$el: el} = elSelect.value as {$el? :HTMLElement};

		el && (function(el) {
			elInput = el.querySelector('.el-input__inner') as HTMLInputElement;

			elInput && (elInput => {
				elInput.disabled = true;
				elInput.readOnly = true;

				selectContent.value = overview.store.model;

				adapter(overview.store.model, elInput);
			})(elInput);
		})(el)
	};

	onMounted(() => {
		selectBoxInit();
	});

	onUnmounted(() => {
		
	});
</script>