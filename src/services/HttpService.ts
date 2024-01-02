import type {
	AxiosInstance,
	AxiosRequestConfig
} from 'axios';

import axios from 'axios';

type Result<T> = {
	Status? :boolean;
	Code? :number;
	message? :string;
	data? :T
};

type HookState = boolean | Promise<boolean>;

type Hooks = {
	onStatusCode? :((code :number) => HookState);
	onStatusCodea? :((codea :string) => string);
};

type Config = {
	transporters? :AxiosRequestConfig;
	hooks? :Hooks;
};

const h :Hooks = {
	onStatusCodea: () => ''
};

export class HttpService {
	protected transporters :AxiosInstance;
	protected hooks :Map<keyof Hooks, Hooks[keyof Hooks]>;

	constructor(
		config :Config
	) {
		this.hooks = new Map([
			['onStatusCodea', h.onStatusCode]
		]);
		this.transporters = axios.create(config.transporters);
	};

	async get<
		T
	>(
		url :string,
		params :unknown,
		config? :AxiosRequestConfig
	) {
		const result = await this.transporters(
			{method: 'get', url, params, ...config}
		).then();
	}
};


