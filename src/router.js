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
		components: {
			navigation: () => import('@/components/navigation/nav_home'),
			content: () => import('@/components/content/content_home')
		}
	},
	{
		path: '/create',
		name: 'create',
		components: {
			navigation: () => import('@/components/navigation/nav_create'),
			create: () => import('@/components/ThreeScene'),
		}
	},
	{
		path: '/taarten',
		name: 'taarten',
		components: {
			navigation: () => import('@/components/navigation/nav_taarten') ,
			content: () => import('@/components/content/content_taarten')
		}
	},
	{
		path: '/gallerij',
		name: 'gallerij',
		components: {
			navigation: () => import('@/components/navigation/nav_gallerij') ,
			content: () => import('@/components/content/content_gallerij')
		}
	},
  ]
})
