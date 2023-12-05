export default class CardService {
	protected static sizeOBS :ResizeObserver | undefined;

	public static resizeHandler(
		el :HTMLElement
	) {
		if(! this.sizeOBS) {
			this.sizeOBS = new ResizeObserver((() => {}));
		}

		this.sizeOBS.observe(el);
	}

	public static dispose() {
		if(! this.sizeOBS) return;
		
		this.sizeOBS.disconnect();
		this.sizeOBS = undefined;
	}

	public static disposeResizeHandler(
		el :HTMLElement
	) {
		if(! this.sizeOBS) return;

		this.sizeOBS.unobserve(el);
	}
};