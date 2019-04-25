<template>
  <div id="container-3d">
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
export default {
  name: 'ThreeScene',
  mounted() {
    this.$root.$on('addlayer', () => {
      this.scene.insert("layer")
    })
    this.$root.$on('dellayer', () => {
      this.scene.remove("layer")
    })
    this.$root.$on('topping', () => {
      this.scene.insert("topping")
    })
  }
}
</script>

<style lang="scss" scoped>
#container {
  clear: both;
}
</style>


