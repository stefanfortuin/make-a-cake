<template>
	<div class="create">
		<div class="commandbuttons" v-if="selected == null">
			<img class="undo" @click="undo" src="@/assets/undo.svg"/>
			<img class="redo" @click="redo" src="@/assets/redo.svg"/>
		</div>
		<div id="container-3d"></div>
	</div>
</template>

<script>
import CakeCommand from '../commands/CakeCommand'
import { mapGetters } from 'vuex';

export default {
	name: "create",
	computed: {
		...mapGetters({
			selected: "getSelectedObject",
		})
	},
	mounted(){
		this.$store.dispatch("init").then(() => {
			this.$store.getters.getCommandManager.Execute(new CakeCommand(5));
		})
	},
	methods: {
		undo(){
			this.$store.getters.getCommandManager.Undo();
		},

		redo(){
			this.$store.getters.getCommandManager.Redo();
		}
	}
}
</script>
