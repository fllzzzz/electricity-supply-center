import axios from 'axios';

type Result<T> = {
	Status? :boolean;
	Code? :number;
	message? :string;
	data? :T
};

type Wrather = {
	description :string;
	temp :number;
	humidity :number;
	windSpeed :number;
	rain :number;
};

const $default = axios.create({
	baseURL: 'http://192.168.1.95:16901/api',
	headers: {
		'Content-Type': 'application/json',
	}
});

export const getWeather = () => $default<Result<Wrather>>({
		method: 'post',
		url: '/weather_system/GetWeatherData'
	})
	.then(res => res.data.data)
	.then(data => {
		if(! data) return undefined;

		const keys = [
			'description',
			'temp',
			'humidity',
			'windSpeed',
			'rain',
		];
		
		return Object.fromEntries(Object.entries(data).filter(
			row => keys.includes(row[0]) ? true : false
		)) as Wrather;
	})