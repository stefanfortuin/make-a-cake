<template>
	<div class="create">
		<transition-group name="fade" mode="out-in">
			<div class="commandbuttons" v-if="selected == null" :key="'cmd'">
				<img class="undo" @click="undo" src="@/assets/undo.svg"/>
				<img class="redo" @click="redo" src="@/assets/redo.svg"/>
			</div>
			<div class="delete" v-else :key="'del'">
				<img src="@/assets/delete.svg" @click="del()">
			</div>
		</transition-group>
		
		<div id="container-3d"></div>
	</div>
</template>

<script>
import DeleteCommand from '@/commands/DeleteCommand';
import Cake from '@/models/Cake';
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
			this.$store.getters.getScene.add(new Cake(5));
		})
	},
	methods: {
		undo(){
			this.$store.getters.getCommandManager.Undo();
		},

		redo(){
			this.$store.getters.getCommandManager.Redo();
		},

		del(){
			let cake = this.$store.getters.getScene.find(Cake);
			let index = cake.indexOf(this.selected);
			if (index == 0 && cake.children.length > 1){
				console.error("can't delete base layer, when there are things on top of it");
				return;
			}

			this.$store.getters.getCommandManager.Execute(new DeleteCommand(this.selected));
			this.$store.state.SelectedObject = null;
		}
	}
}
</script>
