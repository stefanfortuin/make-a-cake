<template>
	<div class="option-size">
		<img @click="bigger" src="@/assets/triangle.svg">
		<img @click="smaller" src="@/assets/triangle.svg" style="transform: rotateX(180deg)">
	</div>
</template>

<script>
import BiggerCommand from '@/commands/BiggerCommand';
import SmallerCommand from '@/commands/SmallerCommand';

export default {
	props: {
		object: {
			required: true,
			type: Object,
		}
	},
	methods: {
		bigger(){
			this.$store.getters.getCommandManager.Execute(new BiggerCommand(this.object))
		},
		smaller(){
			if (this.object.scale.x - 1 < 1) return;
			this.$store.getters.getCommandManager.Execute(new SmallerCommand(this.object))
		}
	}
}
</script>

<style lang="scss" scoped>
.option-size{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-flow: column wrap;
}

img{
	margin: 4px;
}
</style>

