import routesTest from './routes-test';

import {
	RouteRecordRaw
} from 'vue-router';

const routes :RouteRecordRaw[] = [
	{
		name: 'index',
		path: '/',
		component: () => import('@/views/AppIndex.vue')
	}
];

export default routes.concat(routesTest);