<template>
	<div class="selected-panel">
		<span class="title">{{object.name}}</span>
		<div class="options">
			<div class="option" @click="changeOption(1)">Color</div>
			<div class="option" @click="changeOption(2)">Size</div>
		</div>
		<div class="changes">
			<size v-if="option == 2" :object="object"></size>
		</div>
	</div>
</template>

<script>
import Size from './options/OptionSize';

export default {
	data(){
		return{
			option: null,
		};
	},
	components: {
		Size,
	},
	props:{
		object:{
			required: true,
			type: Object,
		}
	},
	methods:{
		changeOption(option){
			this.option = option;
			console.log(this.option)
		}
	}
}
</script>

<style>

</style>
