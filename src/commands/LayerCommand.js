import Cake from "../models/Cake";
import store from '../store';

export default class LayerCommand{
	constructor(size){
		this.size = size;
		this.cake = store.getters.getScene.find(Cake)
	}

	Execute(){
		this.cake.Layer();	
	}

	Undo(){
		this.cake.DeleteLayer();
	}

	Redo(){
		this.Execute()
	}
}