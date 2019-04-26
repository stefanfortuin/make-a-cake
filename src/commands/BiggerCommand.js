export default class BiggerCommand{
	constructor(object){
		this._object = object;
	}

	Execute(){
		this._object.bigger()
	}

	Undo(){
		this._object.smaller()
	}

	Redo(){
		this.Execute();
	}
}