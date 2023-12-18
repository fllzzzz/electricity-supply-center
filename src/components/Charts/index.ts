import * as echarts from 'echarts/core';

import useDebdounce from '@/utils/debounce';

import {
	onMounted
} from 'vue';

let observer :ResizeObserver | undefined;

export const useReszieObserver = (
	echartsInstance :echarts.ECharts,
	time :number
) => {
	if(! observer) {
		observer = new ResizeObserver(
			useDebdounce<ResizeObserver,() => void>(
				() => echartsInstance.resize(), time
			)
		);
	}

	observer?.observe(echartsInstance.getDom());
};