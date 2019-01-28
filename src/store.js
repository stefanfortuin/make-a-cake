import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  currentObject: ""
  },
  mutations: {
	  changeObject(state,name){
		  state.currentObject = name;
	  }
  },
  actions: {

  },
  getters: {
	  currentObject: state => {
		  return state.currentObject;
	  }
  }
})
