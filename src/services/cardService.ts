import {
	repeatDelay
} from '@/utils/executeControl';

export default class CardService {
	protected static obs :ResizeObserver | undefined;
	protected designWidth :number;

	public static watcher(
		el :HTMLElement,
		fn :((
			obsEntryList :ResizeObserverEntry[],
			obs :ResizeObserver,
		) => void)
	) {
		if(! this.obs) {
			const handler = repeatDelay(fn, 20);

			this.obs = new ResizeObserver(handler);
		}

		this.obs.observe(el);
	}

	public static dispose() {
		if(! this.obs) return;
		
		this.obs.disconnect();
		this.obs = undefined;
	}

	public static disposeResizeHandler(
		el :HTMLElement
	) {
		if(! this.obs) return;

		this.obs.unobserve(el);
	}

	constructor(
		designWidth :number
	) {
		this.designWidth = designWidth;
	}

	public px2em(
		px :number
	) {
		return (px / this.designWidth * 100).toString() + 'em';
	}
};