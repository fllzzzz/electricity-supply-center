export const repeatDelay = <T extends ((...args :any[]) => void)>(
	fn :T,
	time :number,
) => {
	let delayTimer :undefined | number;

	return (...args :any[]) => {
		if(delayTimer) clearTimeout(delayTimer);

		delayTimer = setTimeout(() => fn(...args), time);
	}
};