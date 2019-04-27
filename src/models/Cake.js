import * as THREE from 'three';
import Topping from './Topping';
import Layer from './Layer';
import Filling from './Filling';

export default class Cake extends THREE.Object3D{
	constructor(){
		super()
		this.persons = 5; //default 5
	}

	Topping(){
		let height = this.Height();
		this.add(new Topping(height, this.persons))
	}

	findLayerOrFilling(object){
		if (object instanceof Layer){
			let object_index = this.children.indexOf(object);
			if (object_index - 1 < 0) return null;

			return this.children[object_index - 1];
		}
		if (object instanceof Filling){
			let object_index = this.children.indexOf(object);
			return this.children[object_index + 1];
		}
	}

	DeleteLayer(){
		let cake = this.children.filter((c) => {
			if (c.name == "layer" || c.name == "filling")
				return c
		})
		let end = cake.length - 2;
		this.children = cake.slice(0, end);
	}

	DeleteTopping(){
		this.children.pop();
	}

	TotalOf(type){
		return this.children.reduce((t,x) => { 
			if(x.name === type) 
				t += 1
			return t
		}, 0)
	}

	Height(){
		return this.children.reduce((t,x) => {
			return t += x.height;
		}, 0);
	}
}