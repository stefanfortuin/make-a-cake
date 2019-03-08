import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

export default class Filling extends THREE.Mesh{
	constructor(size, index){
		let geometry = new THREE.CylinderBufferGeometry(size, size, 0.6, 22);
		let material = new THREE.MeshLambertMaterial({color: 0xff0000});
		geometry.translate(0,1/2,0);
		super(geometry, material)

		this.index = index;
		this.layer_height = 1;
		this.height = 0.6;
		this.name = "filling";

		this.animate()
	}

	animate(){
		let animate_pos = this.FillingPosition();
		this.position.y = animate_pos + 5;
		TweenLite.to(this.position, 1, {x: this.position.x, y: animate_pos, z: this.position.z});
	}

	FillingPosition(){
		let fillingPos = this.layer_height + this.height;
		return this.index * fillingPos - (fillingPos/2);
	}
}