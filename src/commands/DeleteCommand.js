import store from '../store'
import Cake from '../models/Cake';
import Layer from '../models/Layer';


export default class DeleteCommand{
	constructor(object){
		this._object = object;
		this._cake = store.getters.getScene.find(Cake);
		this._child = this._cake.findLayerOrFilling(this._object);
		this._HasLowered = false;
		this.Delete();
	}

	Execute(){
		this._cake.reverseFromDeleteSelection(this._amount);
		this._cake.children.splice(this._start, this._amount);
	}

	Undo(){
		if (!this._HasLowered){
			this._HasLowered = true;
			for (let i = 0; i < this._oldLayer.length; i++) {
				this._oldLayer[i].position.y -= 2;
			}
		}
		this._cake.insertAt(this._start, this._oldLayer)
	}

	Redo(){
		this._cake.children.splice(this._start, this._amount);
		this._cake.reverseFromRedo(this._start);
	}

	Delete(){
		this._end;
		this._start = this._cake.children.indexOf(this._object);
		this._amount = 1

		if (this._child != null){
			this._end = this._cake.children.indexOf(this._child);
			this._amount = 2
		}
		else
			this._end = this._start;

		if(this._object instanceof Layer){
			let swap = this._start;
			this._start = this._end;
			this._end = swap;
		}

		this._oldLayer = this._cake.children.slice(this._start, this._end + 1);
	}
}