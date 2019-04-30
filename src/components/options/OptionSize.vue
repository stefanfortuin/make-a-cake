<template>
	<div class="option-size">
		<img @click="bigger" src="@/assets/triangle.svg">
		<img @click="smaller" src="@/assets/triangle.svg" style="transform: rotateX(180deg)">
	</div>
</template>

<script>
import BiggerCommand from '@/commands/BiggerCommand';
import SmallerCommand from '@/commands/SmallerCommand';
import ScaleCommand from '@/commands/ScaleCommand';
import Cake from '@/models/Cake';
import Layer from '@/models/Layer';
import { mapGetters } from 'vuex';

export default {
	data(){
		return{
			original_scale: 0,
			cake: null,
			child: null,
		}
	},
	computed:{
		...mapGetters({
			Scene: "getScene",
		})
	},
	props: {
		object: {
			required: true,
			type: Object,
		}
	},
	methods: {
		pinchstart(e){
			this.original_scale = this.object.scale.x;
		},

		pinchmove(e){
			let scale = this.original_scale * e.scale;
			this.setScale(this.object, scale);

			if (this.child != null){
				this.setScale(this.child, scale);
			}

			//set the current object scale to the object scale from that is under it if it exceeds it.
			let object_below = this.getObjectBelow();
			if(object_below != null && object_below.scale.x < this.object.scale.x + 0.05) {
				this.setScale(this.object, object_below.scale.x);

				if (this.child != null) 
					this.setScale(this.child, object_below.scale.x)
			}
		},

		pinchend(e){
			let scale = this.object.scale.x / this.original_scale;
			this.$store.getters.getCommandManager.Execute(new ScaleCommand(this.object, scale, this.original_scale));
		},

		setScale(object, scale){
			object.scale.set(scale, object.scale.y, scale);
		},

		getObjectBelow(){
			let object_index = this.cake.indexOf(this.object);

			if (object_index > 0){
				let object_below;
				(this.object instanceof Layer)
				? object_below = this.cake.children[object_index - 2]
				: object_below = this.cake.children[object_index - 1]

				return object_below;
			}
			return null;
		},

		bigger(){
			let object_below = this.getObjectBelow();
			if(object_below != null && object_below.scale.x < this.object.scale.x + 1) return;
			this.$store.getters.getCommandManager.Execute(new BiggerCommand(this.object))
		},
		smaller(){
			if (this.object.scale.x - 1 < 1){
				console.error("can't make it any smaller");
				return;
			}
			this.$store.getters.getCommandManager.Execute(new SmallerCommand(this.object))
			
		}
	},
	created(){
		this.cake = this.Scene.find(Cake);
		this.child = this.cake.findLayerOrFilling(this.object);

		this.Scene._hammer.get('pinch').set({enable:true});
		this.Scene._hammer.on('pinchstart', this.pinchstart)
		this.Scene._hammer.on('pinchmove', this.pinchmove)
		this.Scene._hammer.on('pinchend', this.pinchend)
	},
	beforeDestroy(){
		this.Scene._hammer.off('pinchstart');
		this.Scene._hammer.off('pinchmove');
		this.Scene._hammer.off('pinchend');
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

