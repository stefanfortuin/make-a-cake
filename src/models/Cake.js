import * as THREE from 'three';
import Topping from './Topping';
import Layer from './Layer';
import Filling from './Filling';
import { TweenLite } from 'gsap';

export default class Cake extends THREE.Object3D{
	constructor(){
		super()
		this.persons = 5; //default 5
		this._animations = []
	}

	indexOf(object){
		return this.children.indexOf(object);
	}

	isAnimating(){
		let animating = false;
		for (let i = 0; i < this.children.length; i++) {
			var o = this.children[i];
			if (o.isAnimating){
				animating = true;
				break;
			}
		}
		return animating;
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

	insertAt = (start_index, layer) => {
		for (let i = start_index; i < this.children.length; i++) {
			var o = this.children[i];
			o.position.y += 1.6;
		}

		for (let i = 0; i < layer.length; i++) {
			this.children.splice(start_index + i, 0, layer[i]);
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

	reverseFromRedo = (start_index) => {
		for (let i = start_index; i < this.children.length; i++) {
			var o = this.children[i];
			o.position.y -= 1.6;
		}
	}

	reverseFromDeleteSelection = (delete_amount) => {
		if (this._animations.length == 0) return;
		if (this._above_objects.length == 0) return;
		if (this._above_objects.length != this._animations.length - 2) return;

		let lower_amount = 1;
		if (delete_amount == 2) lower_amount += 0.6;

		//for each above not selected objects get the original position
		//lower the original y position with the lower_amount determined by how many objects have been deleted
		//tween from the current position to the new pos that lowered y position to fill the gap;
		for (let i = 0; i < this._above_objects_start_pos.length; i++) {
			var orig_pos = this._above_objects_start_pos[i];
			var tween = this._animations[i + 2];
			var to_pos = {x: orig_pos.x, y: orig_pos.y -= lower_amount, z: orig_pos.z}
			TweenLite.to(tween.target, 0.35, to_pos);
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

		this._above_objects = this.children.slice(start, this.children.length)
		this._above_objects_start_pos = []

		for (let i = 0; i < this._above_objects.length; i++) {
			var o = this._above_objects[i]
			var position = {x: o.position.x, y: o.position.y, z: o.position.z}
			this._above_objects_start_pos.push(position);
		}

		this._animations.push(this.animation(object, 2));

		if(child != null)
			this._animations.push(this.animation(child, 2));

		if(this._above_objects.length > 0){
			for (let i = 0; i < this._above_objects.length; i++) {
				var o = this._above_objects[i];
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

	TopLayer(){
		let layer = this.children.filter((c) => {
			if (c.name == "layer" || c.name == "filling")
				return c
		});
		return layer[layer.length - 1];
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
			return t += x._height;
		}, 0);
	}
}