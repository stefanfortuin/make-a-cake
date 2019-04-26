export default class SmallerCommand{
	constructor(object){
		this._object = object;
	}

	Execute(){
		this._object.smaller()
	}

	Undo(){
		this._object.bigger()
	}

	Redo(){
		this.Execute();
	}
}