<template>
	<div class="option-with-slider">
		<span class="message">Rotate by dragging</span>
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
			oldRotation_y: null,
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
		panStart(e){
			this.oldRotation_y = this.object.rotation.y;
		},

		panMove(e){
			let euler_rotation = new THREE.Euler(0, this.radians(this.deg(this.oldRotation_y) + e.deltaX), 0);

			if(this.child != null)
				this.child.setRotationFromEuler(euler_rotation);

			this.object.setRotationFromEuler(euler_rotation);
		},

		panEnd(e){
			let newRotation = new THREE.Euler(0, this.object.rotation.y, 0);
			this.$store.getters.getCommandManager.Execute(new RotateCommand(this.object, newRotation, this.oldRotation))
		},

		radians(deg){return deg * Math.PI / 180;},
		deg(radians){return radians * 180 / Math.PI;}
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
