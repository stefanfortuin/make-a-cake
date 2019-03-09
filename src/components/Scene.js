import * as THREE from 'three';
import Cake from './Cake';
// import FBXLoader from 'three-fbxloader-offical'
var OrbitControls = require('three-orbit-controls')(THREE)

export default class Scene extends THREE.Scene {
	constructor() {
		super();
		
		

		this.init();
		this.animate();

		this.cake = new Cake();
		this.cake.Layer();
		this.add(this.cake);
	}

	init() {
		let container = document.getElementById('container');

		this.camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.01, 6000);
		this.camera.position.z = 10;
		this.camera.position.y = 10;
		this.camera.rotation.z = -45 * Math.PI / 180;

		this.controls = new OrbitControls(this.camera);
		this.controls.minDistance = 10;
		this.controls.maxDistance = 40;
		this.controls.enablePan = false;
		this.controls.minPolarAngle = -90 * Math.PI / 180;
		this.controls.maxPolarAngle = Math.PI / 2;

		this.background = new THREE.Color(0xffffff);

		var hemisphere = new THREE.DirectionalLight(0xffffff, 1);
		hemisphere.position.set(50, 200, 22);
		hemisphere.target.position.set(0, 0, 0);

		hemisphere.shadow.camera.near = 0.5;
		hemisphere.shadow.camera.far = 5000;
		hemisphere.shadow.camera.left = -500;
		hemisphere.shadow.camera.bottom = -500;
		hemisphere.shadow.camera.right = 500;
		hemisphere.shadow.camera.top = 500;
		hemisphere.castShadow = true;
		this.add(hemisphere);

		var ambient = new THREE.AmbientLight(0x404040); // soft white light
		this.add(ambient);

		// this.loader = new FBXLoader();

		this.renderer = new THREE.WebGLRenderer({
			antialias: true,
			aplha: true
		});

		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		container.appendChild(this.renderer.domElement);
	}

	animate = () => {
		requestAnimationFrame(this.animate)
		this.controls.update();
		this.renderer.render(this, this.camera);
	}

	insert(object){
		switch (object) {
			case "layer":
				console.log(this.cake);
				this.cake.Layer();
				break;
			case "topping":
				this.cake.Topping();
				break;
			default:
				break;
		}

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