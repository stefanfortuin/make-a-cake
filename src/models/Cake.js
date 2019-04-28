import * as THREE from 'three';
import Topping from './Topping';
import Layer from './Layer';
import Filling from './Filling';

export default class Cake extends THREE.Object3D{
	constructor(){
		super()
		this.persons = 5; //default 5
		this._animations = []
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

	reverseSelection = () => {
		if (this._animations.length == 0) return;

		for (let i = 0; i < this._animations.length; i++) {
			var tween = this._animations[i];
			tween.reverse();
		}
		this._animations = [];
	}

	displaySelection = (object, wait) => {
		if (wait){
			setTimeout(() => { this.displaySelection(object) }, 400);
			return;
		}

		let object_index = this.children.indexOf(object);
		let child = this.findLayerOrFilling(object);

		let start = 0;
		if(object instanceof Filling)
			start = object_index + 2;
		else
			start = object_index + 1;

		let above_objects = this.children.slice(start, this.children.length)
		this._animations.push(this.animation(object, 2));

		if(child != null)
			this._animations.push(this.animation(child, 2));

		if(above_objects.length > 0){
			for (let i = 0; i < above_objects.length; i++) {
				var o = above_objects[i];
				this._animations.push(this.animation(o, 4));
			}
		}
	}

	animation = (object, increase) => {
		let tween = TweenLite.to(object.position,0.35 , {x: object.position.x, y: object.position.y + increase, z: object.position.z})
		return tween
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