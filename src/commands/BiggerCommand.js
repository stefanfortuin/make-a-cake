import store from '../store';
import Cake from '../models/Cake';

export default class BiggerCommand{
	constructor(object){
		this._object = object;
		this._cake = store.getters.getScene.find(Cake);
	}

	Execute(){
		this._child = this._cake.findLayerOrFilling(this._object);
		if (this._child != null)
			this._child.bigger()
		
		this._object.bigger();
	}

	Undo(){
		this._child = this._cake.findLayerOrFilling(this._object);
		if (this._child != null)
			this._child.smaller()
		
		this._object.smaller();
	}

	Redo(){
		this.Execute();
	}
}