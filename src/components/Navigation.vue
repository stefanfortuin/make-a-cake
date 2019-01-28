<template>
<div>
	<!-- <span> home / {{current_menu}}</span> -->
	<transition name="fade" mode="out-in">
	
	<nav key="main" class="nav-bar" v-if="menus.main">
		<a @click="ChangeMenu('taarten')"><span>Taarten</span></a>
		<a @click="ChangeMenu('cupcakes')"><span>Cupcakes</span></a>
		<a @click="ChangeMenu('gallerij')"><span>Gallerij</span></a>
		<a @click="ChangeMenu('prijzen')"><span>Prijzen</span></a>
		<a @click="ChangeMenu('bestellen')"><span>Bestellen</span></a>
	</nav>
	<nav key="taarten" class="nav-bar" v-else-if="menus.taarten">
		<a @click="ChangeMenu('main')"><span>Terug</span></a>
		<a><span>Fondant</span></a>
		<a><span>Bruids</span></a>
	</nav>
	<nav key="cupcakes" class="nav-bar" v-else-if="menus.cupcakes">
		<a @click="ChangeMenu('main')"><span>Terug</span></a>
		<a><span>Topping</span></a>
		<a><span>Smaak</span></a>
	</nav>
	<nav key="gallerij" class="nav-bar" v-else-if="menus.gallerij">
		<a @click="ChangeMenu('main')"><span>Terug</span></a>
		<a><span>Foto's</span></a>
	</nav>
	<nav key="prijzen" class="nav-bar" v-else-if="menus.prijzen">
		<a @click="ChangeMenu('main')"><span>Terug</span></a>
		<a><span>Taarten</span></a>
		<a><span>Cupcakes</span></a>
	</nav>
	<nav key="bestellen" class="nav-bar" v-else-if="menus.bestellen">
		<a @click="ChangeMenu('main')"><span>Terug</span></a>
	</nav>
	</transition>
</div>
</template>

<script>
import {mapMutations} from 'vuex'

export default {
	data(){
		return{
			current_menu: "",
			menus: {
				main: true,
				taarten: false,
				cupcakes: false,
				gallerij: false,
				prijzen: false,
				bestellen: false,
			}
		};
	},
	methods:{
		...mapMutations([
			'changeObject'
		]),
		ChangeMenu(type){
			if (type == 'taarten')
				this.changeObject('bench_wooden')
			if (type == 'cupcakes')
				this.changeObject('streetlightdutch')
			if (type == 'gallerij')
				this.changeObject('bench_wooden')
			if (type == 'prijzen')
				this.changeObject('log_fallen')
			if (type == 'bestellen')
				this.changeObject('streetlightdutch')

			for (const menu in this.menus) {
				this.menus[menu] = false;
			}

			this.current_menu = type;
			this.menus[type] = true;
		}
	}
}
</script>


<style lang="scss">

.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.4s;
  transition-property: opacity transform;
  transition-timing-function: ease-in-out;
}

.fade-enter{
	opacity: 0;
  	transform: translate(10px, 0px);
}
.fade-leave-active {
  opacity: 0;
  transform: translate(-30px, 0px);
}
</style>
