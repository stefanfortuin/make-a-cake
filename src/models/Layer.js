import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

export default class Layer extends THREE.Mesh{
	constructor(size, index){
		let geometry = new THREE.CylinderBufferGeometry(1, 1, 1, 22);
		let material = new THREE.MeshLambertMaterial({color: 0xC9B59A});
		geometry.translate(0,0.5,0);
		super(geometry, material)

		this._index = index;
		this._size = size;
		this._height = 1;
		this._filling_height = 0.6;
		this.name = "layer";

		this.animate();
	}

	bigger(){
		this.scale.x += 1;
		this.scale.z += 1;
	}

	smaller(){
		this.scale.x -= 1;
		this.scale.z -= 1;
	}

	get size(){
		return this._size;
	}

	animate(){
		let animate_pos = this.LayerPosition();
		this.position.y = animate_pos + 10;
		TweenLite.to(this.position, 1, {x: this.position.x, y: animate_pos, z: this.position.z});
	}

	LayerPosition(){
		let layerPos = this._height/2 + this._filling_height/2;
		return this._index * (layerPos * 2);
	}
}
