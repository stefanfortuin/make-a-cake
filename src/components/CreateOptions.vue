<template>
	<div class="create-options">
		<div class="options" v-if="!creating">
			<div class="option-button" @click="create">Cake</div>
			<div class="option-button">Cupcake</div>
		</div>
		<div class="options" v-else>
			<div class="option-button" @click="layer">Layer</div>
			<div class="option-button">Decoration</div>
			<div class="option-button" @click="topping">Topper</div>
		</div>
	</div>
</template>

<script>
export default {
	name: "create-options",
	methods:{
		create(){
			this.$router.push({path: '/create'});
			this.close();
		},
		layer(){
			this.$root.$emit('addlayer');
			this.close();
		},
		topping(){
			this.$root.$emit('topping');
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
