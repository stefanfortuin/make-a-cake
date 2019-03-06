<template>
  <div class="nav-bar">
    <div>Make-a-Cake</div>
    <transition name="slide-down">
      <div class="mobile-menu" v-if="mobilemenu">
        <a @click="to('/')">Home</a>
        <a @click="to('/creations')">Creations</a>
        <a @click="to('/stats')">Statistics</a>
        <a @click="to('/contact')">Contact</a>
      </div>
    </transition>
    <div class="collapsed-menu" v-if="mobile">
      <img class="hamburger" @click="mobilemenu = !mobilemenu" src="@/assets/menu.svg">
    </div>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  data() {
    return {
      mobile: false,
      mobilemenu: false
    };
  },
  methods: {
    isMobile() {
      window.innerWidth < 660 ? (this.mobile = true) : (this.mobile = false);
    },
    to(path) {
      this.mobilemenu = false;
      this.$router.push({ path: path });
    }
  },

  created() {
    window.addEventListener("resize", this.isMobile);
    this.isMobile();
  }
};
</script>
