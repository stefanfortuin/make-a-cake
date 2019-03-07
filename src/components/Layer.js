import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';


const filling_height = 0.6;

export default class Layer{
	constructor(size, index){

		this.size = size;
		this.index = index;
		this.layer_height = 1;
		this.radials = 22;
		this.filling_height = 0.6;
	}

	create(){
		let layer_geometry = new THREE.CylinderBufferGeometry(this.size, this.size, this.layer_height, this.radials);
		layer_geometry.translate(0, this.layer_height/2,0);
		let layer_material = new THREE.MeshLambertMaterial({color: 0xC9B59A});
		let layer = new THREE.Mesh(layer_geometry, layer_material);

		layer.name = "layer";
		let layer_pos = this.LayerPosition();
		layer.position.y = layer_pos + 10;
		TweenLite.to(layer.position, 1, {x: layer.position.x, y: layer_pos, z: layer.position.z});
		return layer;
	}

	LayerPosition(){
		let layerPos = this.layer_height/2 + this.filling_height/2;
		return this.index * (layerPos * 2);
	}
}
