<template>
	<div class="selected-panel">
		<span class="title">{{object.name}}</span>
		<div class="options">
			<div class="option" @click="changeOption(1)">Color</div>
			<div class="option" @click="changeOption(2)">Size</div>
		</div>
		<div class="changes">
			<color v-if="option == 1" :object="object"></color>
			<size v-if="option == 2" :object="object"></size>
		</div>
	</div>
</template>

<script>
import Size from './options/OptionSize';
import Color from './options/OptionColor';

export default {
	data(){
		return{
			option: null,
		};
	},
	components: {
		Size,
		Color,
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
		}
	}
}
</script>

<style>

</style>
