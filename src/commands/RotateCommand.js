import * as THREE from 'three';

export default class RotateCommand{
	constructor(object, newRotation, oldRotation){
		this._object = object;
		this._oldRotation = oldRotation;
		this._newRotation = newRotation;
		console.log(this._oldRotation, this._newRotation);
	}

	Execute(){
		this._object.setRotationFromEuler(this._newRotation);
	}

	Undo(){
		this._object.setRotationFromEuler(this._oldRotation);
	}

	Redo(){
		this.Execute();
	}
}