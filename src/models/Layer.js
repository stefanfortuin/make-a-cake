import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

export default class Layer extends THREE.Mesh{
	constructor(size, index){
		let geometry = new THREE.CylinderBufferGeometry(size, size, 1, 22);
		let material = new THREE.MeshLambertMaterial({color: 0xC9B59A});
		geometry.translate(0, 1/2,0);
		super(geometry, material)

		this.index = index;
		this.height = 1;
		this.filling_height = 0.6;
		this.name = "layer";

		this.animate();
	}

	animate(){
		let animate_pos = this.LayerPosition();
		this.position.y = animate_pos + 10;
		TweenLite.to(this.position, 1, {x: this.position.x, y: animate_pos, z: this.position.z});
	}

	LayerPosition(){
		let layerPos = this.height/2 + this.filling_height/2;
		return this.index * (layerPos * 2);
	}
}
