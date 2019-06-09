import * as THREE from 'three';
import Hammer from 'hammerjs';
import Cake from './Cake';
import Filling from './Filling';
import Layer from './Layer';
// import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass";
// import FBXLoader from 'three-fbxloader-offical'
var OrbitControls = require('three-orbit-controls')(THREE);


export default class Scene extends THREE.Scene {
	constructor() {
		super();
		this.init();
		this.animate();

		this.selectedObject = null;
	}

	init() {
		this.container = document.getElementById('container-3d');
		this._hammer = new Hammer(this.container);

		this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 6000);
		this.camera.position.z = 10;
		this.camera.position.y = 10;
		this.camera.rotation.z = -45 * Math.PI / 180;

		this.orbit = new OrbitControls(this.camera);
		this.orbit.minDistance = 10;
		this.orbit.maxDistance = 40;
		this.orbit.enablePan = false;
		this.orbit.minPolarAngle = -90 * Math.PI / 180;
		this.orbit.maxPolarAngle = Math.PI / 2;

		this.background = new THREE.Color(0xffffff);

		var hemisphere = new THREE.HemisphereLight(0xffffff, 1);
		hemisphere.position.set(50, 100, 50);
		this.add(hemisphere);

		var ambient = new THREE.AmbientLight(0x404040); // soft white light
		this.add(ambient);

		// this.loader = new FBXLoader();

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			aplha: true
		});

		this.renderer.setPixelRatio(window.devicePixelRatio);
		this.renderer.shadowMap.enabled = true;
		this.renderer.shadowMap.type = THREE.BasicShadowMap;
		this.renderer.setSize(window.innerWidth, window.innerHeight);

		this.mouse = { x : 0, y : 0 };

		this.raycaster = new THREE.Raycaster();
    	this.renderer.domElement.addEventListener( 'click', this.raycast, false );

		this.container.appendChild(this.renderer.domElement);
	}

	animate = () => {
		requestAnimationFrame(this.animate)
		this.orbit.update();
		this.renderer.render(this, this.camera);
	}

	find = (object) => {
		return this.children.find(c => c instanceof object)
	}

	raycast = (e) => {
		this.mouse.x = ( e.clientX / window.innerWidth ) * 2 - 1;
    	this.mouse.y = - ( e.clientY / window.innerHeight ) * 2 + 1;

		this.raycaster.setFromCamera( this.mouse, this.camera );   

		let intersects = this.raycaster.intersectObjects( this.children, true );
		let cake = this.find(Cake);

		if(cake.isAnimating()) return;

		if (intersects.length > 0){
			let object = intersects[0].object;
			if (cake.indexOf(object) == -1){
				this.resetSelection(cake)
				return
			}; 

			if(object == this.selectedObject) return;

			cake.reverseSelection();
			
			if (this.selectedObject == null)
				cake.displaySelection(object);
			else
				cake.displaySelection(object, true);

			this.selectedObject = object;
			this.orbit.enabled = false;
		}
		else{
			this.resetSelection(cake)
		}
	}

	resetSelection(cake){
		this.selectedObject = null;
		this.orbit.enabled = true;
		cake.reverseSelection();
	}

	// loadObject(name) {
	// 	for (let i = this.scene.children.length - 1; i >= 0; i--) {
	// 		if (this.scene.children[i].type === "Group")
	// 			this.scene.remove(this.scene.children[i]);
	// 	}

	// 	this.loader.load('../assets/Models/' + name + '.fbx',
	// 		(model) => {
	// 			this.scene.add(model);
	// 			model.receiveShadow = true;
	// 			model.castShadow = true;
	// 			model.position.set(0, 0, 0);
	// 			var scale = 1;
	// 			model.scale.set(scale, scale, scale);
	// 		}
	// 	);
	// }
}