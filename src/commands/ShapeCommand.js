import store from '../store';
import Cake from '../models/Cake';
import Filling from '../models/Filling';
import * as THREE from 'three';

export default class ShapeCommand{
	constructor(object, geometry){
		this._newGeom = this.newGeometry(object, geometry);

		this._typeGeom = geometry;
		this._object = object;
		this._oldGeom = object.geometry
		this._cake = store.getters.getScene.find(Cake);
	}

	Execute(){
		this._child = this._cake.findLayerOrFilling(this._object);
		if (this._child != null){
			this._childOldGeom = this._child.geometry;
			this._childNewGeom = this.newGeometry(this._child, this._typeGeom);
			this._child.geometry = this._childNewGeom;
		}

		this._object.geometry = this._newGeom;
	}

	Undo(){
		if (this._child != null)
			this._child.geometry = this._childOldGeom;

		this._object.geometry = this._oldGeom;
	}

	Redo(){
		this.Execute();
	}

	newGeometry(object, geom_type){
		let height = 1;
		if (object instanceof Filling)
			height = 0.6;

		let geom;
		switch (geom_type) {
			case "round":
				geom = new THREE.CylinderBufferGeometry(1, 1, height, 22)
				break;
			case "rect":
				geom = new THREE.BoxBufferGeometry(2, height, 2);
				break;
			case "triangle":
				geom = new THREE.CylinderBufferGeometry(1, 1, height, 3);
				break;
			default:
				break;
		}

		geom.translate(0, 0.5, 0);
		return geom;
	}
}