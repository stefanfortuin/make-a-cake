import * as THREE from 'three';
import Cake from './Cake';

const layer_height = 1;
const radials = 22;
const filling_height = 0.6;

class Filling extends Cake{
	constructor(){
		super()
	}

	create(){
		let filling_geometry = new THREE.CylinderBufferGeometry(this.persons, this.persons, filling_height, radials);
		filling_geometry.translate(0,layer_height/2,0);
		let fliling_material = new THREE.MeshLambertMaterial({color: 0xff0000});
		let filling = new THREE.Mesh(filling_geometry, fliling_material);
		
		filling.name = "filling";
		let filling_pos = this.FillingPosition();
		filling.position.y = filling_pos + 5;
		TweenLite.to(filling.position, 1, {x: filling.position.x, y: filling_pos, z: filling.position.z});
		return filling;
	}
}

export default Filling;