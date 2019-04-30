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
import { mapGetters } from 'vuex';

export default {
	data(){
		return{
			y: 0,
			oldRotation: null,
			center: null,
			child: null,
		};
	},
	computed: {
		...mapGetters({
			Scene: "getScene",
		})
	},
	props:{
		object:{
			required: true,
			type: Object,
		}
	},
	methods: {
		change(rotation){
			if(this.child != null)
				this.child.setRotationFromEuler(rotation);

			this.object.setRotationFromEuler(rotation);
			console.log(this.object.rotation.y);
		},

		set(){
			let newRotation = new THREE.Euler(0, this.radians(this.y), 0);
			this.$store.getters.getCommandManager.Execute(new RotateCommand(this.object, newRotation, this.oldRotation))
		},

		panStart(e){
			this.oldRotation = new THREE.Euler(this.object.rotation.x, this.object.rotation.y, this.object.rotation.z);
			this.center = e.center;
		},

		panMove(e){
			let new_y = this.radians(this.deg(this.oldRotation._y) + e.deltaX);
			let rotation = new THREE.Euler(0, new_y, 0)
			this.change(rotation);
		},

		panEnd(e){
			let newRotation = new THREE.Euler(0, this.object.rotation.y, 0);
			this.$store.getters.getCommandManager.Execute(new RotateCommand(this.object, newRotation, this.oldRotation))
		},

		radians(deg){
			return deg * Math.PI / 180;
		},

		deg(radians){
			return radians * 180 / Math.PI;
		}
	},
	created(){ 
		this.Scene._hammer.on('panstart', this.panStart);
		this.Scene._hammer.on('panend pancancel', this.panEnd);
		this.Scene._hammer.on('panmove', this.panMove);

		this.child = this.$store.getters.getScene.find(Cake).findLayerOrFilling(this.object);
	},
	beforeDestroy(){
		this.Scene._hammer.off('panstart panend pancancel panmove');
	}
}
</script>

<style>

</style>
