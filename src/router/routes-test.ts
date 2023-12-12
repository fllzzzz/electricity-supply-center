import {
	RouteRecordRaw
} from 'vue-router';

export default [
	{
		name: 'demo',
		path: '/demo',
		component: () => import('@/views/AppDemo.vue'),
		children: [
			{
				name: 'first-class',
				path: 'first-class',
				component: () => import('@/views/AppDemoFirstClass.vue'),
				children: [
					{
						name: 'bread-crumb',
						path: 'bread-crumb',
						component: () => import('@/components/HeaderOptions.vue'),
					}
				]
			}
		]
	},
	{
		name: 'test',
		path: '/test',
		component: () => import('@/views/AppTest.vue')
	}
] as RouteRecordRaw[];