<template>
	<div class="option-shape">
		<img src="@/assets/round.svg" @click="set(0)">
		<img src="@/assets/rect.svg" @click="set(1)">
	</div>
</template>

<script>
import * as THREE from 'three';
import Filling from '@/models/Filling';
import ShapeCommand from '@/commands/ShapeCommand';

export default {
	data(){
		return{
			currentShape: -1,
		};
	},
	props: {
		object: {
			required: true,
			type: Object,
		}
	},
	methods: {
		set(option){
			if(option == this.currentShape) return;
			this.currentShape = option;

			(this.currentShape == 0)
			? 	this.$store.getters.getCommandManager.Execute(new ShapeCommand(this.object, "round"))
			:	this.$store.getters.getCommandManager.Execute(new ShapeCommand(this.object, "rect"))
		},
	},
}
</script>

<style lang="scss" scoped>
	.option-shape{
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		width: 100%;
		height:100%;
	}
</style>
