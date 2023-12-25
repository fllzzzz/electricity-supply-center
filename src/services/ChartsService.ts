type Config = {
	designWidth :number;
};

export default class PlayerManager {
	protected designWidth :number;

	constructor(
		config :Config,
	) {
		this.designWidth = config.designWidth;
	};

	public sizeConverter(
		size :number
	) :number | never {
		if(! window || ! window.innerWidth) {
			throw new Error(
				'window || window.innerWidth is undefined'
			);
		}
		return window.innerWidth / this.designWidth * size;
	}
};