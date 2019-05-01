import * as THREE from 'three';

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
		geometry.translate(0,-0.4,0);

		for (let i = 0; i < 25; i++) {
			let top = new THREE.Mesh(geometry, material);
			top.name = "top";
			
			let angle = Math.random()*Math.PI*2;
			let radius_sq = Math.random() * this.size * this.size;
			top.position.z = Math.sqrt(radius_sq) * Math.cos(angle);
			top.position.x = Math.sqrt(radius_sq) * Math.sin(angle);
			top.position.y = this.topping_height;

			this.add(top)
		}
	}
}