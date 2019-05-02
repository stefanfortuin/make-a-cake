<template>
  <div>
    <div class="button-create" @click="showMenu()">
      <img v-if="!show" class="image" src="@/assets/plus.svg">
      <img v-else class="image" src="@/assets/arrow.svg">
    </div>
	<transition name="slide-right">
    	<create-options v-if="show" @close="show = !show"></create-options>
	</transition>
  </div>
</template>

<script>
import CreateOptions from "@/components/CreateOptions";

export default {
  name: "button-create",
  components: {
    CreateOptions
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
	  showMenu(){
		  (this.$route.path != '/') 
		  ? this.show = !this.show
		  : this.$router.push({path: '/create'})
	  }
  }
};
</script>
