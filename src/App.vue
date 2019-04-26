<template>
  <div id="app">
    <nav-bar></nav-bar>

    <transition name="fade" mode="out-in">
		<keep-alive>
      		<router-view></router-view>
	  	</keep-alive>
    </transition>

	<button-create></button-create>

	<transition name="slide-up">
		<selected-panel v-if="selectedObject != null" :object="selectedObject"></selected-panel>
	</transition>
  </div>
</template>

<script>
import NavBar from "@/components/navigation/nav-bar";
import ButtonCreate from '@/components/ButtonCreate';
import SelectedPanel from '@/components/SelectedPanel.vue';
import { mapGetters } from 'vuex';

export default {
  components: {
	NavBar,
	ButtonCreate,
	SelectedPanel
  },
  computed: {
	  ...mapGetters({
		  selectedObject: "getSelectedObject",
	  })
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
  overscroll-behavior: none;
  touch-action: manipulation;
}

canvas {
  display: block;
}
</style>
