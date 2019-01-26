<template>
  <div id="app">
    <div id="main-block">
		<nav class="nav-bar">
			<router-link to="/"><span>Home</span></router-link>
			<router-link to="/taarten"><span>Taarten</span></router-link>
			<router-link to="/cupcakes"><span>Cupcakes</span></router-link>
			<router-link to="/gallerij"><span>Gallerij</span></router-link>
			<router-link to="/prijzen"><span>Prijzen</span></router-link>
			<router-link to="/bestellen"><span>Bestellen</span></router-link>
		</nav>
		<img id="logo" src="@/assets/logosweetcaketrans.png"/>
		
    </div>
    <div id="pages">
		<transition name="fade" mode="out-in">
			<router-view/>
		</transition>
	</div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');

#app{
	font-family: 'Lato', sans-serif;
	a{
		text-decoration:none;
	}
}

#pages{
	padding: calc(12vw + 80px) 6vw 6vw calc(12vw + 80px);
}
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}
</style>
