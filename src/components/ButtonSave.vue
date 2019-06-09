<template>
    <div class="button-save" @click="save()">
      <img class="image" src="@/assets/save.svg">
    </div>
</template>

<script>
import Cake from '@/models/Cake';

export default {
  name: "button-save",
  methods: {
	  save(){
		  let cake = this.$store.getters.getScene.find(Cake).toJSON();
		  let jsonString = JSON.stringify(cake);
		  let name = "cake" + (localStorage.length + 1);

		  localStorage.setItem(name, jsonString);
	  }
  }
};
</script>