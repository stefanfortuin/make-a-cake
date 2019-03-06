import * as THREE from 'three';
import Cake from './Cake';

const layer_height = 1;
const radials = 22;
const filling_height = 0.6;

class Layer extends Cake{
	constructor(){
		super()
	}

	create(){
		let layer_geometry = new THREE.CylinderBufferGeometry(this.persons, this.persons, layer_height, radials);
		layer_geometry.translate(0,layer_height/2,0);
		let layer_material = new THREE.MeshLambertMaterial({color: 0xC9B59A});
		let layer = new THREE.Mesh(layer_geometry, layer_material);

		layer.name = "layer";
		let layer_pos = this.LayerPosition();
		layer.position.y = layer_pos + 10;
		TweenLite.to(layer.position, 1, {x: layer.position.x, y: layer_pos, z: layer.position.z});
		return layer;
	}
}

export default Layer;
