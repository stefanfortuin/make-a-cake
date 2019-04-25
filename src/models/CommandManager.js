export default class CommandManager{
	constructor(){
		this.undo_stack = [];
		this.redo_stack = [];
	}

	Execute(command){
		this.undo_stack.push(command);
		command.Execute();
	}

	Undo(){
		if(this.undo_stack.length <= 0) return;

		let command = this.undo_stack.pop();
		command.Undo();
		this.redo_stack.push(command);
	}

	Redo(){
		if(this.redo_stack.length <= 0) return;

		let command = this.redo_stack.pop();
		command.Execute();
		this.undo_stack.push(command)
	}

}