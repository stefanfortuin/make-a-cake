<template>
	<div class="button-create" @click="create">
		<img src="@/assets/plus.svg"/>
	</div>
</template>

<script>
export default {
	name: "button-create",
	methods: {
		create(){
			this.$router.push({path: '/create'})
		}
	}
}
</script>
