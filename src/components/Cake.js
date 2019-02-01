import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

const height = 1;
const radials = 22;
const fillingHeight = 0.6;

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

		let layer_geometry = new THREE.CylinderBufferGeometry(this.persons, this.persons, height, radials);
		layer_geometry.translate(0,0.5,0);
		let layer_material = new THREE.MeshLambertMaterial({color: 0xC9B59A});
		let layer = new THREE.Mesh(layer_geometry, layer_material);

		layer.name = "layer";
		let layer_pos = this.LayerPosition();
		layer.position.y = layer_pos + 10;
		TweenLite.to(layer.position, 1, {x: layer.position.x, y: layer_pos, z: layer.position.z});
		this.mesh.add(layer);
	}

	Filling(){
		let filling_geometry = new THREE.CylinderBufferGeometry(this.persons, this.persons, fillingHeight, radials);
		filling_geometry.translate(0,0.5,0);
		let fliling_material = new THREE.MeshLambertMaterial({color: 0xff0000});
		let filling = new THREE.Mesh(filling_geometry, fliling_material);
		
		filling.name = "filling";
		let filling_pos = this.FillingPosition();
		filling.position.y = filling_pos + 5;
		TweenLite.to(filling.position, 1, {x: filling.position.x, y: filling_pos, z: filling.position.z});
		this.mesh.add(filling);
	}

	Topping(){
		let geometry = new THREE.BoxBufferGeometry(0.2,0.2,0.2)
		let material = new THREE.MeshLambertMaterial({color: 0xff0000});
		let layers = this.TotalLayers();
		for (let i = 0; i < 50; i++) {
			let top = new THREE.Mesh(geometry, material);
			top.name = "top"
			top.position.y = (layers * height/2) + (layers - 1 + fillingHeight/2);
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

		let layerPos = height/2 + fillingHeight/2;
		return layers * (layerPos * 2);
	}

	FillingPosition(){
		let fillingPos = height + fillingHeight;
		return this.TotalLayers() * fillingPos - (fillingPos/2);
	}

	TotalLayers(){
		let layers = this.mesh.children.reduce((t,x) => { 
			if(x.name === "layer") 
				t += 1
			return t
		}, 0)
		return layers;
	}
};

export default Cake;