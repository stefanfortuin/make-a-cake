import * as THREE from 'three';
import store from '../store';
// import { RenderPass, EffectComposer, OutlinePass } from "three-outlinepass";
// import FBXLoader from 'three-fbxloader-offical'
var OrbitControls = require('three-orbit-controls')(THREE)

export default class Scene extends THREE.Scene {
	constructor() {
		super();
		this.init();
		this.animate();
	}

	init() {
		let container = document.getElementById('container-3d');

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

		// this.composer = new EffectComposer(this.renderer);
		// this.renderPass = new RenderPass(this, this.camera);
		
		// this.outlinePass = new OutlinePass(new THREE.Vector2( window.innerWidth, window.innerHeight ), this, this.camera);
		// this.outlinePass.renderToScreen = true;

		// this.composer.addPass(this.renderPass);
		// this.composer.addPass(this.outlinePass);

		// let params = {
		// 	edgeStrength: 2,
		// 	edgeGlow: 1,
		// 	edgeThickness: 1.0,
		// 	pulsePeriod: 2,
		// 	usePatternTexture: false
		// };

		// this.outlinePass.edgeStrength = params.edgeStrength;
		// this.outlinePass.edgeGlow = params.edgeGlow;
		// this.outlinePass.pulsePeriod = params.pulsePeriod;
		// this.outlinePass.visibleEdgeColor.set(0xb62121);
		// this.outlinePass.hiddenEdgeColor.set(0xffffff);

		this.renderer.shadowMap.enabled = true;
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		// this.composer.setSize(window.innerWidth, window.innerHeight);

		this.raycaster = { x : 0, y : 0 };
		this.mouse = { x : 0, y : 0 };

		this.raycaster = new THREE.Raycaster();
    	this.renderer.domElement.addEventListener( 'click', this.raycast, false );

		container.appendChild(this.renderer.domElement);
	}

	animate = () => {
		requestAnimationFrame(this.animate)
		this.controls.update();
		// this.composer.render(this, this.camera);
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

		if (intersects.length > 0){
			let object = intersects[0].object;
			store.state.SelectedObject = object;
			// this.outlinePass.selectedObjects = [object];
		}
		else{
			store.state.SelectedObject = null;
			// this.outlinePass.selectedObjects = [];
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