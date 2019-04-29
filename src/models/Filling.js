import * as THREE from 'three';
import TweenLite from 'gsap/TweenLite';

export default class Filling extends THREE.Mesh{
	constructor(size, index){
		let geometry = new THREE.CylinderBufferGeometry(1, 1, 0.6, 22);
		let material = new THREE.MeshLambertMaterial({color: 0xff0000});
		geometry.translate(0, 0.5,0);
		super(geometry, material)

		this._index = index;
		this._size = size;
		this._layer_height = 1;
		this._height = 0.6;
		this.name = "filling";

		this.animate()
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

	get isAnimating(){
		return this._tween.isActive();
	}

	animate(){
		let animate_pos = this.FillingPosition();
		this.position.y = animate_pos + 5;
		this._tween = TweenLite.to(this.position, 1, {x: this.position.x, y: animate_pos, z: this.position.z});
	}

	FillingPosition(){
		let fillingPos = this._layer_height + this._height;
		return this._index * fillingPos - (fillingPos/2);
	}
}