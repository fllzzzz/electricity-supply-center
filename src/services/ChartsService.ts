type Config = {
	designWidth :number;
};

const hasHooks = (
	x :unknown
) :x is [
	string,
	unknown,
	((data :unknown) => unknown)
] => {
	if(x && x instanceof Array && x.length === 3) {
		return true;
	}
	return false;
};

export default class ChartsService {
	protected designWidth :number;

	constructor(
		config :Config,
	) {
		this.designWidth = config.designWidth;
	};

	public sizeConverter(
		size? :number
	) :number | undefined | never {
		if(! window || ! window.innerWidth) {
			throw new Error(
				'window || window.innerWidth is undefined'
			);
		}

		if(! size && size !== 0) return undefined;
		return window.innerWidth / this.designWidth * size;
	}
};