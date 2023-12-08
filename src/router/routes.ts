import routesTest from './routes-test';

import {
	RouteRecordRaw
} from 'vue-router';

const routes :RouteRecordRaw[] = [
	{
		name: 'index',
		path: '/',
		component: () => import('@/views/AppIndex.vue'),
		children: [
			{
				name: 'overview',
				path: 'overview',
				component: () => import('@/views/ModuleOverviewDemo.vue'),
			},
			{
				name: 'electricity-grids',
				path: 'electricity-grids',
				component: () => import('@/views/ModuleElectricityGridsDemo.vue'),
			},
			{
				name: 'electricity-usageStatistic',
				path: 'electricity-usageStatistic',
				component: () => import('@/views/ModuleElectricityUsageStatisticDemo.vue')
			},
			{
				name: 'electricity-ticket',
				path: 'electricity-ticket',
				component: () => import('@/views/ModuleElectricityTicketDemo.vue')
			},
			{
				name: 'monitor',
				path: 'monitor',
				component: () => import('@/views/ModuleMonitorDemo.vue')
			},
		]
	}
];

export default routes.concat(routesTest);