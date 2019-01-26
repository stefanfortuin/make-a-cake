import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
		path: '/',
		name: 'home',
		component: Home
	},
	{
		path: '/taarten',
		name: 'taarten',
		component: () => import('@/pages/taarten')
	},
	{
		path: '/cupcakes',
		name: 'cupcakes',
		component: () => import('@/pages/cupcakes')
	},
	{
		path: '/gallerij',
		name: 'gallerij',
		component: () => import('@/pages/gallerij')
	},
	{
		path: '/prijzen',
		name: 'prijzen',
		component: () => import('@/pages/prijzen')
	},
	{
		path: '/bestellen',
		name: 'bestellen',
		component: () => import('@/pages/bestellen')
	},
  ]
})
