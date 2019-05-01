import Cake from "../models/Cake";
import store from '../store';
import Topping from "../models/Topping";

export default class ToppingCommand{
	constructor(type){
		this._type = type;
		this._cake = store.getters.getScene.find(Cake);
		this._height = this._cake.Height();
		this._topLayer = this._cake.TopLayer();
		this._topping = new Topping(this._height, this._topLayer.scale.x - 0.1);
	}

	Execute(){
		this._cake.add(this._topping);
	}

	Undo(){
		this._cake.remove(this._topping);
	}

	Redo(){
		this.Execute();
	}
}