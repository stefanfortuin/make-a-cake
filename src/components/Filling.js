import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';



export default class Filling{
	constructor(size, index){
		this.size = size;
		this.index = index;
		this.layer_height = 1;
		this.radials = 22;
		this.filling_height = 0.6;
	}

	create(){
		let filling_geometry = new THREE.CylinderBufferGeometry(this.size, this.size, this.filling_height, this.radials);
		filling_geometry.translate(0,this.layer_height/2,0);
		let fliling_material = new THREE.MeshLambertMaterial({color: 0xff0000});
		let filling = new THREE.Mesh(filling_geometry, fliling_material);
		
		filling.name = "filling";
		let filling_pos = this.FillingPosition();
		filling.position.y = filling_pos + 5;
		TweenLite.to(filling.position, 1, {x: filling.position.x, y: filling_pos, z: filling.position.z});
		return filling;
	}

	FillingPosition(){
		let fillingPos = this.layer_height + this.filling_height;
		return this.index * fillingPos - (fillingPos/2);
	}
}