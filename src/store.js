import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  currentObject: null
  },
  mutations: {
	  changeObject(state, object){
		  state.currentObject = object;
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
