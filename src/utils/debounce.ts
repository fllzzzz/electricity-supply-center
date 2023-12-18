const useDebdounce = <T, F extends ((...args :any[]) => void)>(
	fn :F,
	time: number
) => {
	let firstBootFlg :0 | 1 = 1;
	let delayTimer :number | undefined;

	return function(
		this :T,
		...args :F extends ((...args :infer P) => void) ? P : never
	){
		if(firstBootFlg === 1) {
			fn.bind(this, ...args)();
			firstBootFlg = 0;
		}else if(firstBootFlg === 0) {
			clearTimeout(delayTimer);
			delayTimer = setTimeout(
				() => fn.bind(this, ...args)(),
				time
			);
		}else {
			throw new Error('error: firstBootFlg');
		}
	};
};

export default useDebdounce;