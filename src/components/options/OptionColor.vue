<template>
	<div class="option-color" :style="{backgroundColor: 'hsl(' + hue + ',' + sat + '%,' + light + '%)'}">
		<div class="slider">
			<span>Hue</span>
			<input  type="range" min="0" max="360" value="50" v-model="hue" />
		</div>
		<div class="slider">
			<span>Saturation</span>
			<input type="range" min="0" max="100" value="100" v-model="sat">
		</div>
		<div class="slider">
			<span>Lightness</span>
			<input type="range" min="0" max="100" value="50" v-model="light">
		</div>
		<div class="set-color" @click="set">Set Color</div>
	</div>
</template>

<script>
import ColorCommand from '@/commands/ColorCommand';

export default {
	data(){
		return{
			hue: 50,
			sat: 50,
			light: 50,
		}
	},
	props: {
		object: {
			required: true,
			type: Object,
		}
	},
	methods: {
		set(){
			let color = 'hsl(' + this.hue + ',' + this.sat + '%,' + this.light + '%)';
			this.$store.getters.getCommandManager.Execute(new ColorCommand(this.object, color));
		}
	},
	created(){
		let color = this.object.material.color.getHSL();
		this.hue = parseInt(color.h * 360);
		this.sat = parseInt(color.s * 100);
		this.light = parseInt(color.l * 100);
	}
}
</script>

