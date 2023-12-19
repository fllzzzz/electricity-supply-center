const debdounce = <
	F extends ((...args: any[]) => void | Promise<boolean>),
	T=unknown
>(
	fn: F,
	time: number
) => {
	let _timer :number | undefined;

	const isAsyncFn = (
		x :void | Promise<boolean>
	) :x is Promise<boolean> =>   {
		if(x && 'then' in x) return true;
		return false;
	}

	return function (
		this: T,
		...args: F extends ((...args: infer P) => void) ? P : never
	) {
		if(! _timer) {
			fn.apply(this, args);
			_timer = -1;
			return;
		}else {
			clearTimeout(_timer);
		}

		_timer = setTimeout(() => {
			const result = fn.apply(this, args);
			if(isAsyncFn(result)) {
				result.then(
					state => state ? _timer = undefined : ''
				);
			}else {
				_timer = undefined;
			}
		},time);
	};
};

export default debdounce;