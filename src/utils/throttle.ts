const throttle = <
	F extends (
		(...args :any[]) => void | Promise<boolean>
	), 
	T=unknown
>(
	fn :F,
	time :number
) => {
	let _timer :number | undefined;

	const isAsyncFn = (
		x :void | Promise<boolean>
	) :x is Promise<boolean> =>   {
		if(x && 'then' in x) return true;
		return false;
	}

	return function(
		this :T,
		...args :F extends (
			(...args :infer P) => void | Promise<boolean>
		) ? P :never
	) {
		if(_timer) return;

		_timer = setTimeout(() => {
			const result = fn.apply(this, args);
			if(isAsyncFn(result)) {
				result.then(
					state => state ? _timer = undefined : ''
				);
			}else {
				_timer = undefined;
			}
		}, time);
	};
};

export default throttle;