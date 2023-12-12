import {
	RouteRecordRaw
} from 'vue-router';

export default [
	{
		name: 'demo',
		path: '/demo',
		component: () => import('@/views/AppDemo.vue'),
	},
	{
		name: 'test',
		path: '/test',
		component: () => import('@/views/AppTest.vue')
	}
] as RouteRecordRaw[];