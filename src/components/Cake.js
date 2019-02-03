import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

const layer_height = 1;
const radials = 22;
const filling_height = 0.6;

class Cake{
	constructor(persons){
		this.persons = persons;

		this.mesh = new THREE.Object3D();
	}

	Layer(){
		let layers = this.TotalLayers();
		if (layers >= 5){
			console.log("reached limit");
			return;
		}

		if (layers != 0)
			this.Filling();

		let layer_geometry = new THREE.CylinderBufferGeometry(this.persons, this.persons, layer_height, radials);
		layer_geometry.translate(0,layer_height/2,0);
		let layer_material = new THREE.MeshLambertMaterial({color: 0xC9B59A});
		let layer = new THREE.Mesh(layer_geometry, layer_material);

		layer.name = "layer";
		let layer_pos = this.LayerPosition();
		layer.position.y = layer_pos + 10;
		TweenLite.to(layer.position, 1, {x: layer.position.x, y: layer_pos, z: layer.position.z});
		this.mesh.add(layer);
	}

	Filling(){
		let filling_geometry = new THREE.CylinderBufferGeometry(this.persons, this.persons, filling_height, radials);
		filling_geometry.translate(0,layer_height/2,0);
		let fliling_material = new THREE.MeshLambertMaterial({color: 0xff0000});
		let filling = new THREE.Mesh(filling_geometry, fliling_material);
		
		filling.name = "filling";
		let filling_pos = this.FillingPosition();
		filling.position.y = filling_pos + 5;
		TweenLite.to(filling.position, 1, {x: filling.position.x, y: filling_pos, z: filling.position.z});
		this.mesh.add(filling);
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

	LayerPosition(){
		let layers = this.TotalLayers();
		if (layers == 0)
			return 0

		let layerPos = layer_height/2 + filling_height/2;
		return layers * (layerPos * 2);
	}

	FillingPosition(){
		let fillingPos = layer_height + filling_height;
		return this.TotalLayers() * fillingPos - (fillingPos/2);
	}

	ToppingPosition(){
		let layers = this.TotalLayers()
		let fillings = this.TotalFillings();

		let y = (layers * layer_height) + (fillings * filling_height);
		return y;
	}

	TotalLayers(){
		let layers = this.mesh.children.reduce((t,x) => { 
			if(x.name === "layer") 
				t += 1
			return t
		}, 0)
		return layers;
	}

	TotalFillings(){
		let fillings = this.mesh.children.reduce((t,x) => { 
			if(x.name === "filling") 
				t += 1
			return t
		}, 0)
		return fillings;
	}
};

export default Cake;