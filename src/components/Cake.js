import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';
import Layer from './Layer';
import Filling from './Filling';

const layer_height = 1;
const filling_height = 0.6;

export default class Cake{
	constructor(){
		this.persons = 5; //default 5

		this.mesh = new THREE.Object3D();
	}

	Layer(){
		let index = this.TotalLayers();
		if (index >= 5){
			console.log("reached limit");
			return;
		}

		if (index != 0)
			this.Filling();

		let layer = new Layer(this.persons, index);
		this.mesh.add(layer.create());
	}

	Filling(){
		let index = this.TotalLayers();
		let filling = new Filling(this.persons, index);
		this.mesh.add(filling.create());
	}

	Topping(){
		let topping_geometry = new THREE.BoxBufferGeometry(0.2,0.2,0.2)
		topping_geometry.translate(0,0.1,0);
		let topping_material = new THREE.MeshLambertMaterial({color: 0xff0000});
		for (let i = 0; i < 50; i++) {
			let top = new THREE.Mesh(topping_geometry, topping_material);
			top.name = "top";
			top.position.y = this.ToppingPosition();
			let angle = Math.random()*Math.PI*2;
			let radius_sq = Math.random() * this.persons * this.persons -1;
			top.position.z = Math.sqrt(radius_sq) * Math.cos(angle);
			top.position.x = Math.sqrt(radius_sq) * Math.sin(angle);
			this.mesh.add(top)
			
		}
	}

	DeleteLayer(){
		let cake = this.mesh.children.filter((c) => {
			if (c.name == "layer" || c.name == "filling")
				return c
		})
		let end = cake.length - 2;
		this.mesh.children = cake.slice(0, end);
	}

	ToppingPosition(){
		let layers = this.TotalLayers()
		let fillings = this.TotalFillings();

		let y = (layers * layer_height) + (fillings * filling_height);
		return y;
	}

	TotalLayers(){
		return this.mesh.children.reduce((t,x) => { 
			if(x.name === "layer") 
				t += 1
			return t
		}, 0)
	}

	TotalFillings(){
		return this.mesh.children.reduce((t,x) => { 
			if(x.name === "filling") 
				t += 1
			return t
		}, 0)
	}
}