import store from '../store';
import Cake from '@/models/Cake';

export default class ScaleCommand{
	constructor(object, scale, original_scale){
		this._object = object;
		this._scale = scale;
		this._original_scale = original_scale;
		this._cake = store.getters.getScene.find(Cake);
		this._child = this._cake.findLayerOrFilling(this._object);
	}

	Execute(){
		//scaling is already done in the option menu itself
	}

	Undo(){
		if (this._child != null){
			this._child.scale.x = this._original_scale.x;
			this._child.scale.z = this._original_scale.z;
		}

		this._object.scale.x = this._original_scale.x;
		this._object.scale.z = this._original_scale.z;
	}

	Redo(){
		if (this._child != null){
			this._child.scale.x *= this._scale;
			this._child.scale.z *= this._scale;
		}

		this._object.scale.x *= this._scale;
		this._object.scale.z *= this._scale;
	}
}