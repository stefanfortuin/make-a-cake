import Cake from "../models/Cake";
import Layer from '../models/Layer';
import Filling from '../models/Filling';
import store from '../store';

export default class LayerCommand{
	constructor(size){
		this._size = size;
		this._cake = store.getters.getScene.find(Cake)
	}

	Execute(){
		let index = this._cake.TotalOf("layer");
		if (index >= 5){
			console.log("reached limit");
			return;
		}

		if (index != 0){
			if(!this._filling)
				this._filling = new Filling(this._size, index);

			console.log(this._filling);
			this._cake.add(this._filling);
		}

		if (!this._layer)
			this._layer = new Layer(this._size, index);

		this._cake.add(this._layer);
	}

	Undo(){
		this._cake.DeleteLayer();
	}

	Redo(){
		this.Execute()
	}
}