<template>
	<nav class="nav-bar">
		<router-link to="/"><span> ~ Terug</span></router-link>
		<a @click="AddLayer"><span>+</span></a>
		<a @click="DeleteLayer"><span>-</span></a>
		<a @click="Topping"><span>Topping</span></a>
	</nav>
</template>

<script>
export default {
	data(){
		return{
		};
	},
	methods:{
		AddLayer(){
			this.$root.$emit('addlayer');
		},

		DeleteLayer(){
			this.$root.$emit('dellayer');
		},

		Topping(){
			this.$root.$emit('topping');
		}
	},
}
</script>
