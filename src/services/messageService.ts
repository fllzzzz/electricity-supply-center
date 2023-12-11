export default class messageService {
	protected static transportMap = 
		new Map<string, ((message :unknown) => void)>();

	public static setTransport(
		topic :string,
		fn :((
			message :unknown
		) => void)
	) {
		if(
			this.transportMap.get(topic)
		) return;

		this.transportMap.set(topic, fn);
	}

	public static getTransport(
		topic :string,
	) {
		return this.transportMap.get(topic);
	}
};