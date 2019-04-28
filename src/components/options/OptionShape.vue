<template>
	<div class="option-shape">
		<img src="@/assets/round.svg" @click="set('round')">
		<img src="@/assets/rect.svg" @click="set('rect')">
		<img src="@/assets/triangle.svg" @click="set('triangle')">
	</div>
</template>

<script>
import * as THREE from 'three';
import Filling from '@/models/Filling';
import ShapeCommand from '@/commands/ShapeCommand';

export default {
	data(){
		return{
			currentShape: '',
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
			this.$store.getters.getCommandManager.Execute(new ShapeCommand(this.object, option))
		},
	},
}
</script>

<style lang="scss" scoped>
	.option-shape{
		display: flex;
		justify-content: space-evenly;
		align-items: center;
		flex-flow: row wrap;
		width: 100%;
		height:100%;

		img{
			width: 20%;
		}
	}
</style>
