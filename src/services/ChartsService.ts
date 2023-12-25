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

	protected hasHooks(
		x :unknown
	) :x is [
		string,
		unknown,
		((data :unknown) => unknown)
	] {
		if(x && x instanceof Array && x.length === 3) {
			return true;
		}
		return false;
	}

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

	public optionsCreater(
		list :
			| [string, unknown, ((data :unknown) => unknown)][]
			| [string, unknown][]
	) :Object {
		return Object.fromEntries(
			(list
				.map(row => {
					if(! row[1]) return undefined;

					let source :unknown = row[1];
					
					if(this.hasHooks(row)) {
						source = row[2](source);
					}

					return [row[0], source];
				})
				.filter(item => item ? true : false)
			) as [string, unknown][]
		);
	}
};