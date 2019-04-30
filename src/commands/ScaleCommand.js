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

	//manipulation is done in OptionSize.vue
	Execute(){}

	Undo(){
		if (this._child != null)
			this.setScale(this._child, this._original_scale);
		
		this.setScale(this._object, this._original_scale);
	}

	Redo(){
		let scale = this._object.scale.x *= this._scale;
		if (this._child != null)
			this.setScale(this._child, scale);

		this.setScale(this._object, scale);
	}

	setScale(object, scale){
		object.scale.set(scale, object.scale.y, scale);
	}
}