<template>
	<div class="option-size">
		<img @click="bigger" src="@/assets/triangle.svg">
		<img @click="smaller" src="@/assets/triangle.svg" style="transform: rotateX(180deg)">
	</div>
</template>

<script>
import BiggerCommand from '@/commands/BiggerCommand';
import SmallerCommand from '@/commands/SmallerCommand';
import Cake from '@/models/Cake';
import Layer from '@/models/Layer';

export default {
	props: {
		object: {
			required: true,
			type: Object,
		}
	},
	methods: {
		bigger(){
			let cake = this.$store.getters.getScene.find(Cake)
			let object_index = cake.indexOf(this.object);

			if (object_index > 0){
				let object_below;
				(this.object instanceof Layer)
				? object_below = cake.children[object_index - 2]
				: object_below = cake.children[object_index - 1]

				if(object_below.scale.x < this.object.scale.x + 1) {
					console.error("can't exceed size of layer below");
					return;
				}
			}

			this.$store.getters.getCommandManager.Execute(new BiggerCommand(this.object))
		},
		smaller(){
			if (this.object.scale.x - 1 < 1){
				console.error("can't make it any smaller");
				return;
			}
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

