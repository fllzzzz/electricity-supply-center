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

	protected src :string;
	protected element :HTMLIFrameElement;

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
		src :string,
		element :HTMLIFrameElement
	) {
		this.src = src;
		this.element = element;
	};

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

		this.element.contentWindow.postMessage(
			message,
			'*'
		);
	}

	public removeReveicer() {
		if(! this.element.contentWindow)
			throw new Error(
				`@IframeService=>removeReveicer(): 
					this.element.contentWindow is not available!
				`
			);

		IframeService.registerMap.delete(
			this.src
		);
	}
};