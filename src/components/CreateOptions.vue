<template>
	<div class="create-options">
		<div class="options">
			<div class="option-button" @click="layer">Layer</div>
			<div class="option-button">Decoration</div>
			<div class="option-button" @click="topping">Topper</div>
		</div>
	</div>
</template>

<script>
import LayerCommand from '../commands/LayerCommand';
import ToppingCommand from '../commands/ToppingCommand';
import { mapGetters } from 'vuex';

export default {
	name: "create-options",
	computed: {
		...mapGetters({
			cmd_mngr: "getCommandManager",
		})
	},
	methods:{
		layer(){
			this.$store.getters.getCommandManager.Execute(new LayerCommand(5));
			this.close();
		},
		topping(){
			this.$store.getters.getCommandManager.Execute(new ToppingCommand());
			this.close();
		},
		close(){
			this.$emit('close');
		}
	},
	computed: {
		creating(){
			return this.$route.path == '/create' ? true : false;
		}
	}
}
</script>
