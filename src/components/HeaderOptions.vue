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
		z-index: 9999999;
		:deep(.el-input) {
			.el-input__wrapper {
				padding: 0 !important;
				box-shadow: none !important;
				border-radius: 0 !important;
				background: transparent !important;
			}
			.el-input__inner {
				font-size: calc(var(--fontSize) * 1px);
				user-select: none;
				color: #00FFD7;
			}
			.el-input__suffix {
				svg {
					color: #00FFD7;
				}
			}
		}
	}
	.first-class {
		font-size: calc(var(--fontSize) * 1px);
		color: #00FFD7;
	}

	.first-class.is-out {
		opacity: 0.5;
		&:hover {
			opacity: unset;
		}
	}
	
	.split-symbol {
		margin: 0 16px 0 17px;
		font-size: calc(var(--fontSize) * 1px);
		color: #00FFD7;
	}

	.is-none-pointer {
		pointer-events: none;
	}
</style>
<style lang="scss">
	.select-popper {
		z-index: 6000 !important;

		width: 210px;
		background: rgba(2, 19, 28, 0.9);
		box-shadow: 0px 0px 4px 0px rgba(0,0,0,0.6);
		border-radius: 4px;

		.el-select-dropdown__item {
			height: 54px;
			background: transparent;
			display: flex;
			align-items: center;
			justify-content: center;
			&:hover {
				background: rgba(10, 172, 172, 0.2)
			}
			span {
				font-size: 24px;
				font-family: Source Han Sans CN;
				font-weight: 400;
				color: #6EFFF6;
				line-height: 1;
				opacity: 0.5;
			}
		}
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
				:class="[
					overview.store.model ? 'is-out' : '',
					overview.store.model ? '' : 'is-none-pointer'
				]"
				@click.capture="firstClassHandler"
			>全部区域</span>
			<template
				v-if="overview.store.model"
			>
				<span class="split-symbol">/</span>
				<ElSelect
					ref="elSelect"
					v-model="selectContent"
					popper-class="select-popper"
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
	import MessageObserver from '@/services/MessageObserver';

	import {
		UEScreenMessage
	} from '@/types';

	import {
		overview,
	} from '@/store';

	import {
		ElSelect,
		ElOption
	} from 'element-plus';

	import {
		ref,
		onMounted,
		computed,
		watchEffect,
	} from 'vue';

	const fontSize = 28;
	const elSelect = ref<unknown>(undefined);
	const selectContent = ref<string | undefined>(undefined);
	let elInput :HTMLInputElement | undefined = undefined;

	const optionsList :string[] = [
		'光伏区域',
		'储能区域',
		'充电桩',
		'智慧农业',
	];

	const modelMapR = new Map<string, string>([
		['Camer_GuangFu_01', '储能区域'],
		['Camera_ChuNeng', '储能区域'],
		['Camera_ChongDianzhuang', '充电桩'],
		['Camer_Zihui', '智慧农业'],
	]);

	const firstClassHandler = (event :MouseEvent) => {
		overview.store.model = undefined;

		event.stopPropagation();
	};

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
					]
				];

					const elStyle = 
						document.createElement('style') as HTMLStyleElement;
					
					elStyle.innerHTML = `
						.input-size-adapter {
							width: ${w.toString() + 'px;'}
							height: ${h.toString() + 'px;'}
						}
					`;

					document.head.append(elStyle);
					
					el.classList.add('input-size-adapter');
			})(ctx);
		};
	};

	const adapter = selectInputBoxSizeAdapter({
		fontSize
	})

	const selectChangeHandler = (
		value :unknown
	) => {
		overview.store.model = value as string;
		overview.useSyncer();
	};

	MessageObserver.registObserver<(
		(message :UEScreenMessage & {
			areaid :string;
		})  => void
	)>(message => {
		if(message.ctid !== 12521) return;

		overview.store.model = modelMapR.get(message.areaid);

	}, 'toWebScreen');

	onMounted(() => {
		watchEffect(() => {
			if(
				! overview.store.model ||
				! elSelect.value
			) return;

			const {$el: el} = elSelect.value as {$el :HTMLElement};

			el && (function(el) {
				elInput = el.querySelector('.el-input__inner') as HTMLInputElement;

				elInput && (elInput => {
					selectContent.value = overview.store.model;

					adapter(overview.store.model!, elInput);
				})(elInput);
			})(el)
		});
	});
</script>