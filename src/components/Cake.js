import * as THREE from 'three';
import Layer from './Layer';
import Filling from './Filling';
import Topping from './Topping';

export default class Cake extends THREE.Object3D{
	constructor(){
		super()
		this.persons = 5; //default 5
	}

	Layer(){
		let index = this.TotalOf("layer");
		if (index >= 5){
			console.log("reached limit");
			return;
		}

		if (index != 0)
			this.Filling();

		this.add(new Layer(this.persons, index));
	}

	Filling(){
		let index = this.TotalOf("layer");
		this.add(new Filling(this.persons, index));
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