export default class IframeService {
	protected static listenerFlg :0 | 1 = 0;
	protected static registerMap = new Map<string, (
		(message :unknown) => void
	)>();
	protected static listenerCallbackFn = (event :MessageEvent<unknown>) => {
		const targetFn = this.registerMap
			.get(event.origin);

		if(
			! targetFn ||
			typeof event.data !== 'string'
		) return;

		targetFn(JSON.parse(event.data));
	};

	protected element :HTMLIFrameElement;
	protected src :string;

	public static addListener() {
		if(this.listenerFlg === 1) return;

		this.listenerFlg = 1;

		window.addEventListener(
			'message', this.listenerCallbackFn
		);
	}

	public static removeListener() {
		if(this.listenerFlg === 0) return;

		window.removeEventListener(
			'message', this.listenerCallbackFn
		);

		this.listenerFlg = 0;
	}

	constructor(
		element :HTMLIFrameElement
	) {
		this.element = element;
		this.src = this.getSrc(this.element.src);
	};

	protected getSrc(
		src: string
	) {
		const result = src.match(
			new RegExp('(?:http|https)://(?:.*[0-9])', 'g')
		);

		if(! result) throw new Error('no src found');

		return result[0];
	}

	public receiver(
		handler :((message :unknown) => void)
	) {
		if(! this.element.contentWindow)
			throw new Error(
				`@IframeService=>reseiver(): 
					this.element.contentWindow is not available!
				`
			);

		if(
			IframeService.registerMap
				.get(this.src)
		) return;

		IframeService.registerMap
			.set(this.src, handler)
	}

	public sender(
		message :unknown
	) {

		if(! this.element.contentWindow)
			throw new Error(
				`@IframeService=>sender(): 
					this.element.contentWindow is not available!
				`
			);

		const _msg = JSON.parse(
			JSON.stringify(message)
		);

		this.element.contentWindow.postMessage(
			_msg,this.src
		);
	}

	public removeReveicer() {
		IframeService.registerMap.delete(
			this.src
		);
	}
};