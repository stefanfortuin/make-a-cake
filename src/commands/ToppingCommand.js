import Cake from "../models/Cake";
import store from '../store';

export default class ToppingCommand{
	constructor(type){
		this.type = type;
		this.cake = store.getters.getScene.find(Cake);
	}

	Execute(){
		this.cake.Topping();
	}

	Undo(){
		this.cake.DeleteTopping();
	}

	Redo(){
		this.Execute();
	}
}