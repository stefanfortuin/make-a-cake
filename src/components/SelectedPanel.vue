<template>
	<div class="selected-panel">
		<div class="options">
			<div class="info">
				<span>{{object.name}}</span>
			</div>

			<div class="option" @click="changeOption(1)">Color</div>
			<div class="option" @click="changeOption(2)">Size</div>
			<div class="option" @click="changeOption(3)">Shape</div>
			<div class="option" @click="changeOption(4)">Rotate</div>
		</div>
		<div class="changes">
			<color v-if="option == 1" :object="object"></color>
			<size v-if="option == 2" :object="object"></size>
			<shape v-if="option == 3" :object="object"></shape>
			<rotate v-if="option == 4" :object="object"></rotate>
		</div>
	</div>
</template>

<script>
import Size from './options/OptionSize';
import Color from './options/OptionColor';
import Shape from './options/OptionShape';
import Rotate from './options/OptionRotate';

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
		Rotate,
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
		},
	}
}
</script>

<style>

</style>
