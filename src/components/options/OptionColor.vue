<template>
	<div class="option-color">
		<input type="color" :value="'#' + object.material.color.getHexString()" @change="set($event)"/>
	</div>
</template>

<script>
import ColorCommand from '@/commands/ColorCommand';

export default {
	props: {
		object: {
			required: true,
			type: Object,
		}
	},
	methods: {
		set(e){
			this.$store.getters.getCommandManager.Execute(new ColorCommand(this.object, e.target.value));
		}
	}
}
</script>

<style>

</style>
