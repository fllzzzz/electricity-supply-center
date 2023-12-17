import useDebdounce from "@/utils/debounce";

export default class LayoutService {
	protected element;
	protected layoutOptions :{
		width :number;
		height :number;
	};
	protected handlerList :((
		width :number,
		height :number
	) => void)[];
	protected static observerMap = new Map<number, ResizeObserver>();
	
	constructor(
		element :HTMLElement,
		layoutOptions :{
			width :number;
			height :number;
		},
		time :number,
	) {
		this.handlerList = [];
		this.element = element;
		this.layoutOptions = layoutOptions;

		let observer = LayoutService.observerMap.get(time);

		if(! observer) {
			observer = new ResizeObserver(
				useDebdounce<ResizeObserver, (
					entryList :ResizeObserverEntry[],
					observer :ResizeObserver
				) => void>((
					entryList, observer
				) => {
					for(const entry of entryList) {
						const {inlineSize, blockSize} = entry.borderBoxSize[0];

						if(
							inlineSize !== 0 &&
							blockSize !== 0
						) {
							this.handlerList.forEach(
								fn => fn(inlineSize, blockSize)
							)
						}else {
							observer.unobserve(entry.target);
						};
					}
				}, time)
			);

			LayoutService.observerMap.set(time, observer);
		}

		observer.observe(this.element);
	};

	public registHandler(
		fn :((
			width :number,
			height :number
		) => void),
		index? :number
	) {
		if(! index && index !== 0) {
			this.handlerList.push(fn);
		}else {
			this.handlerList.splice(index, 0, fn);
		}
	}

	public useReactiveFontSize(
		index? :number
	) {
		const ratio = this.layoutOptions.height / this.layoutOptions.width;

		const fn :((
			width :number,
			height :number
		) => void) = (width, height) => {
			const currentRatio = height / width;

			if(ratio === currentRatio) {
				this.element.style.fontSize = 
					(width / 100).toString() + "px";
			}else {
				this.element.style.fontSize = 
					(Math.ceil(height / ratio) / 100).toString() + 'px';
			}
		};

		if(! index && index !== 0) {
			this.handlerList.push(fn);
		}else {
			this.handlerList.splice(index, 0, fn);
		}
	}
};