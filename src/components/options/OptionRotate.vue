<template>
	<div class="option-with-slider">
		<div class="slider">
			<span>Z</span>
			<input type="range" min="0" max="360" v-model="y" @input="change" @change="set">
			<span>{{y}} deg</span>
		</div>
		<div class="set" @click="set">Set Rotation</div>
	</div>
</template>

<script>
import RotateCommand from '@/commands/RotateCommand';
import * as THREE from 'three'
import Cake from '@/models/Cake';

export default {
	data(){
		return{
			y: 0,
			oldRotation: null,
			child: null,
		};
	},
	props:{
		object:{
			required: true,
			type: Object,
		}
	},
	methods: {
		change(){
			let rotation = new THREE.Euler(0, this.radians(this.y), 0);
			if(this.child != null)
				this.child.setRotationFromEuler(rotation);

			this.object.setRotationFromEuler(rotation);
		},

		set(){
			let newRotation = new THREE.Euler(0, this.radians(this.y), 0);
			this.$store.getters.getCommandManager.Execute(new RotateCommand(this.object, newRotation, this.oldRotation))
		},

		radians(deg){
			return deg * (Math.PI / 180);
		},

		deg(radians){
			return radians * (180 / Math.PI);
		}
	},
	created(){ 
		this.child = this.$store.getters.getScene.find(Cake).findLayerOrFilling(this.object); 
		this.y = this.deg(this.object.rotation.y);
		this.oldRotation = new THREE.Euler(this.object.rotation.x, this.object.rotation.y, this.object.rotation.z);
	}

}
</script>

<style>

</style>
