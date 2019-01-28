<template>
  <div id="app">
	<ThreeScene></ThreeScene>
    <div id="main-block">
		<navigation></navigation>

		<img id="logo" src="@/assets/logosweetcaketrans.png"/>
    </div>
  </div>
  
</template>

<script>
import ThreeScene from '@/components/ThreeScene';
import Navigation from '@/components/Navigation';

export default {
	components:{
		ThreeScene,
		Navigation
	},
}
</script>

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
</style>
