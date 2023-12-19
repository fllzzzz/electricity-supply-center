import * as echarts from 'echarts/core';

import debdounce from "@/utils/debounce";

import {
	onMounted
} from 'vue';

let observer :ResizeObserver | undefined;

export const useReszieObserver = (
	echartsInstance :echarts.ECharts,
	time :number
) => {


	observer?.observe(echartsInstance.getDom());
};