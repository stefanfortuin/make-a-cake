import Cake from "../models/Cake";
import Store from '../store';

export default class CakeCommand{
	constructor(persons = 5){
		this.persons = persons;
		this.scene = Store.getters.getScene
		this.cake = new Cake()
	}

	Execute(){
		this.scene.add(this.cake)
	}

	Undo(){
		this.scene.remove(this.cake)
	}

	Redo(){
		this.Execute()
	}
}