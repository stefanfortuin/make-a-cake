<template>
  <div id="app">
    <nav-bar></nav-bar>
    <transition name="fade" mode="out-in">
		<keep-alive>
      		<router-view></router-view>
	  	</keep-alive>
    </transition>
	<button-create></button-create>
  </div>
</template>

<script>
import NavBar from "@/components/navigation/nav-bar";
import ButtonCreate from '@/components/ButtonCreate';

export default {
  components: {
	NavBar,
	ButtonCreate
  }
};
</script>


<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Lato:400,700,900");

#app {
  font-family: "Lato", sans-serif;
  a {
    text-decoration: none;
    cursor: pointer;
  }
}

body {
  margin: 0;
  touch-action: manipulation;
}

canvas {
  display: block;
}
</style>
