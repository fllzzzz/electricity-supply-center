const createSender = <
	F extends (
		(...args :any[]) => void | Promise<void>
	), 
	T=unknown
>(
	fn :F,
	time :number
) => {

	return function(
		this :T,
		...args :F extends (
			(...args :infer P) => void | Promise<void>
		) ? P :never
	) {
		setTimeout(() => {
			fn.bind(this, ...args)();
		}, time);
	};
};