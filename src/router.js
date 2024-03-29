import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
		path: '/',
		name: 'home',
		component: () => import('@/views/home.vue')
	},
	{
		path: '/create',
		name: 'create',
		component: () => import('@/views/create.vue')
	},
  ]
})
