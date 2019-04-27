<template>
	<div class="selected-panel">
		<span class="title">{{object.name}}</span>
		<div class="options">
			<div class="option" @click="changeOption(1)">Color</div>
			<div class="option" @click="changeOption(2)">Size</div>
			<div class="option" @click="changeOption(3)">Shape</div>
		</div>
		<div class="changes">
			<color v-if="option == 1" :object="object"></color>
			<size v-if="option == 2" :object="object"></size>
			<shape v-if="option == 3" :object="object"></shape>
		</div>
	</div>
</template>

<script>
import Size from './options/OptionSize';
import Color from './options/OptionColor';
import Shape from './options/OptionShape';

export default {
	data(){
		return{
			option: null,
		};
	},
	components: {
		Size,
		Color,
		Shape,
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
