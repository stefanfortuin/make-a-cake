export default class ColorCommand{
	constructor(object, newColor){
		this._newColor = newColor;
		this._oldColor = "#" + object.material.color.getHexString();
		this._object = object;
	}

	Execute(){
		this._object.material.color.set(this._newColor);
	}

	Undo(){
		this._object.material.color.set(this._oldColor);
	}

	Redo(){
		this.Execute();
	}
}