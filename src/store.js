import Vue from 'vue'
import Vuex from 'vuex'

import CommandManager from './models/CommandManager';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
	  Scene: null,
	  CommandManager: null,
	  SelectedObject: null,
  },
  mutations: {
		init(state, scene){
			state.Scene = scene;
			state.CommandManager = new CommandManager();
		},

		setSelectedObject(state, object){
			state.SelectedObject = object;
		}
  },
  actions: {
	  	init({state,commit}, scene){
			return new Promise((resolve, reject) => {
				commit("init", scene);
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
		  if (state.Scene == null)
		  	return;

		  return state.Scene.selectedObject;
	  }
  }
})
