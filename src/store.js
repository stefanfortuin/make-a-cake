import Vue from 'vue'
import Vuex from 'vuex'

import Scene from './models/Scene';
import CommandManager from './models/CommandManager';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  Scene: null,
	  CommandManager: null,
	  SelectedObject: null,
  },
  mutations: {
		init(state){
			state.Scene = new Scene();
			state.CommandManager = new CommandManager();
		},

		setSelectedObject(state, object){
			state.SelectedObject = object;
		}
  },
  actions: {
	  	init({state,commit}){
			return new Promise((resolve, reject) => {
				commit("init");
				resolve()
			})
		},
  },
  getters: {
	  getScene: state => {
		  return state.Scene;
	  },

	  getCommandManager: state => {
		  return state.CommandManager;
	  },

	  getSelectedObject: state => {
		  return state.SelectedObject;
	  }
  }
})
