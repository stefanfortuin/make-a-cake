<template>
  <div id="container">
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';

import Scene from './Scene.js';

export default {
  name: 'ThreeScene',
  data() {
    return {
      scene: null,
    }
  },
  mounted() {
    this.scene = new Scene();
    this.$root.$on('addlayer', () => {
      this.scene.add("layer")
    })
    this.$root.$on('dellayer', () => {
      this.scene.remove("layer")
    })
    this.$root.$on('topping', () => {
      this.scene.add("topping")
    })
  }
}
</script>

<style lang="scss" scoped>
#container {
  clear: both;
}
</style>


