export default class MessageObserver {
	protected static observerList = new Map<string, (
		(...args :any) => void
	)[]>();
	protected static messageBuffer :unknown[] = [];
	protected static waitingList :[string, (...args :any) => void][] = [];

	public static createObservation<T extends object>(
		observation :string,
		message :T
	) :T | never {
		if(this.observerList.get(observation)) {
			throw new Error('Observation is already existing');
		};

		if(this.waitingList.length > 0) {
			const waiterIndexList :number[] = [];
			const waiterList = this.waitingList.map((observer, index) => {
				if(observer[0] === observation) {
					waiterIndexList.push(index);
					return observer[1];
				}
			}).filter(
				observer => observer ? true : false
			) as ((...args: any) => void)[];

			this.observerList.set(observation, waiterList);

			waiterIndexList.forEach(value => {
				this.waitingList[value] = ['isPicked', () => {}];
			})
			this.waitingList = this.waitingList.filter(
				observer => observer[0] === 'isPicked' ? false : true
			);
			waiterIndexList.length = 0;
		}else {
			this.observerList.set(observation, []);
		}
		
		return new Proxy<T>({...message}, {
			get(target, p, receiver) {
				const result = Reflect.get(target, p, receiver)
				return result;
			},
			set(target, p, newValue, receiver) {
				const result = Reflect.set(target, p, newValue, receiver)
			
				const observerList = 
					MessageObserver.observerList.get(observation);

				observerList &&
				(list => {
					if(list.length > 0) {
						list.forEach(fn => fn(target));
					}else {
						MessageObserver.messageBuffer
							.push(target)
					}
					
				})(observerList);

				return result;
			},
		});
	}

	public static registObserver<T extends (
		(...args :any[]) => void
	)>(
		fn :((
			...args :T extends ((
				...args :infer P
			) => void) ? P : never
		) => void),
		observation :string
	) {
		const target = this.observerList.get(observation);

		if(target) {
			target.push(fn);
		}else {
			this.waitingList.push([observation, fn]);
		}

		if(this.messageBuffer.length > 0) {
			this.messageBuffer.forEach(message => {
				fn(...[message] as T extends ((
					...args :infer P
				) => void) ? P : never);
			});

			this.messageBuffer.length = 0;
		}
	};
};