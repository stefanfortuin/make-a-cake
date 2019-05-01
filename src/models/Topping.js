import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

export default class Topping extends THREE.Object3D{
	constructor(height, size){
		super();

		this.topping_height = height;
		this.size = size;
		this.name = "Topping"
		this.generate()
	}

	generate(){
		let geometry = new THREE.BoxBufferGeometry(0.2,0.2,0.2);
		let material = new THREE.MeshLambertMaterial({color: 0xff0000});
		// geometry.translate(0,0.1,0);

		for (let i = 0; i < 25; i++) {
			let top = new THREE.Mesh(geometry, material);
			top.name = "top";
			
			let angle = Math.random()*Math.PI*2;
			let radius_sq = Math.random() * this.size * this.size;
			top.position.z = Math.sqrt(radius_sq) * Math.cos(angle);
			top.position.x = Math.sqrt(radius_sq) * Math.sin(angle);

			let animate_pos = this.topping_height;
			top.position.y = animate_pos + Math.random() * 5;
			TweenLite.to(top.position, 1, {x: top.position.x, y: animate_pos, z: top.position.z});

			this.add(top)
		}
		console.log(this);
	}
}