import MessageObserver from '@/services/MessageObserver';

import {
	UEScreenMessage
} from '@/types';

import {
	reactive,
	Ref
} from 'vue';

 export namespace overview {
	export const store = reactive<{
		model? :string;
	}>({
		model: undefined
	});

	const modelMap = new Map<string, string>([
		['光伏区域', 'Camer_GuangFu_01'],
		['储能区域', 'Camera_ChuNeng'],
		['充电桩', 'Camera_ChongDianzhuang'],
		['智慧农业', 'Camer_Zihui'],
	]);

	export const useSyncer = (target :Ref<unknown>) => {
		const isString = (x :Ref<unknown>) :x is Ref<string> => {
			if(typeof x.value === 'string') return true;
			return false;
		};

		let msg :any;

		if(! store.model) {
			msg = {
				ctid: 10111
			};
		}else {
			msg = {
				ctid: 12321,
				areaid: modelMap.get(store.model)
			}
		}

		target.value = msg;
	};
};

export namespace iframe {
	export const toUEMessage = MessageObserver.createObservation<{
		value :Partial<UEScreenMessage>
	}>('toUEScreen', {
		value: {}
	});
};