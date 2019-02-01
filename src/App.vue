<template>
  <div id="app">
	  	<transition name="content" mode="out-in">
	  		<router-view name="create"></router-view>
		</transition>
		<div id="main-block">
			<transition name="fade" mode="out-in">
				<router-view name="navigation"></router-view>
			</transition>
			<div class="content-container">
				<transition name="content" mode="out-in">
					<router-view name="content"></router-view>
				</transition>
			</div>
			<img id="logo" src="@/assets/logosweetcaketrans.png"/>
		</div>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Lato:400,700,900');

#app{
	font-family: 'Lato', sans-serif;
	a{
		text-decoration:none;
		cursor: pointer;
	}
}

body{
	margin: 0;
}

canvas{
	display:block;
}
</style>
