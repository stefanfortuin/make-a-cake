import * as THREE from 'three';
import Layer from './Layer';
import Filling from './Filling';
import Topping from './Topping';

export default class Cake extends THREE.Object3D{
	constructor(){
		super()
		this.persons = 5; //default 5
	}

	Topping(){
		let height = this.Height();
		this.add(new Topping(height, this.persons))
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