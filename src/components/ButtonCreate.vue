<template>
  <div>
    <div class="button-create" @click="show = !show">
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
    create() {
      this.$router.push({ path: "/create" });
    }
  }
};
</script>
