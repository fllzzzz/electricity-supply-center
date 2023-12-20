import {
	reactive
} from 'vue';


	const config = reactive([
		{
			name: '智慧光伏',
			value: [
				['面积', 3540, '㎡'],
				['数量', 4, '组'],
			],
			image: require<string>('@images/光伏.png'),
		},
		{
			name: '移动储能',
			value: [
				['面积', 36, '㎡'],
				['数量', 1, '台'],
			],
			image: require<string>('@images/移动储能.png'),
		},
		{
			name: '充电桩',
			value: [
				['面积', 239, '㎡'],
				['数量', 19, '台'],
			],
			image: require<string>('@images/充电桩.png'),
		},
		{
			name: '智慧大棚',
			value: [
				['面积', 50, '㎡'],
				['数量', 1, '个'],
			],
			image: require<string>('@images/智慧大棚.png'),
		},
	]);

export default config;