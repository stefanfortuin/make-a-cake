import store from '../store'
import Cake from '../models/Cake';

export default class RotateCommand{
	constructor(object, newRotation, oldRotation){
		this._object = object;
		this._oldRotation = oldRotation;
		this._newRotation = newRotation;
		this._child = store.getters.getScene.find(Cake).findLayerOrFilling(this._object);
	}

	//it is being rotated in OptionRotate.vue
	Execute(){}

	Undo(){
		if(this._child != null)
			this._child.setRotationFromEuler(this._oldRotation);

		this._object.setRotationFromEuler(this._oldRotation);
	}

	Redo(){
		if(this._child != null)
			this._child.setRotationFromEuler(this._newRotation);

		this._object.setRotationFromEuler(this._newRotation);
	}
}