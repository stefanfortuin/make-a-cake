<template>
    <div id="container">
	</div>
</template>

<script>
import {mapMutations, mapGetters} from 'vuex';
import * as THREE from 'three';
import FBXLoader from 'three-fbxloader-offical'
var OrbitControls = require('three-orbit-controls')(THREE)

export default {
  name: 'ThreeScene',
  data() {
    return {
      camera: null,
      scene: null,
      renderer: null,
      loader: null,
	  controls: null,
	  model: null,
    }
  },
  methods: {
	  ...mapMutations([
		  'changeObject'
	  ]),
    init: function() {
        let container = document.getElementById('container');

        this.camera = new THREE.PerspectiveCamera(90, window.innerWidth/window.innerHeight, 0.01, 6000);
        this.camera.position.z = 10;
		this.camera.position.y = 10;
		this.camera.rotation.z = -45 * Math.PI / 180;
		this.controls = new OrbitControls(this.camera);
		this.controls.enableZoom = false;
		this.controls.enablePan = false;
		this.controls.minPolarAngle = -90 * Math.PI / 180;
		this.controls.maxPolarAngle = Math.PI/2;

        this.scene = new THREE.Scene();
		this.scene.background = new THREE.Color( 0xffffff);

		var hemisphere = new THREE.DirectionalLight( 0xffffff, 1);
		hemisphere.position.set(50, 200, 22);
		hemisphere.target.position.set(0,0,0);

		hemisphere.shadow.camera.near = 0.5;       
		hemisphere.shadow.camera.far = 5000;      
		hemisphere.shadow.camera.left = -500;
		hemisphere.shadow.camera.bottom = -500;
		hemisphere.shadow.camera.right = 500;
		hemisphere.shadow.camera.top = 500;
		hemisphere.castShadow = true;
		this.scene.add( hemisphere );

		var ambient = new THREE.AmbientLight( 0x404040 ); // soft white light
		this.scene.add( ambient );

		this.loader = new FBXLoader();

        this.renderer = new THREE.WebGLRenderer({antialias: true, aplha: true});
		this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(this.renderer.domElement);

    },
    animate: function() {
        requestAnimationFrame(this.animate);
		this.controls.update();
        this.renderer.render(this.scene, this.camera);
    },
	loadObject(name){
		for (let i = this.scene.children.length - 1; i >= 0; i--) {
			if(this.scene.children[i].type === "Group")
				this.scene.remove(this.scene.children[i]);
		}

		this.loader.load('../assets/Models/' + name + '.fbx', 
			(model) => {
				this.scene.add(model);
				model.receiveShadow = true;
				model.castShadow = true;
				model.position.set(0,0,0);
				var scale = 1;
				model.scale.set(scale,scale,scale);
			}
		);
	}
  },
  computed: {
	  ...mapGetters([
		  'currentObject'
	  ])
  },
  watch: {
	  currentObject: {
		  deep: true,
		  handler(objectName){
			  this.loadObject(objectName);
		  }
	  }
  },
  mounted() {
      this.init();
      this.animate();
  }
}
</script>

<style lang="scss" scoped>
#container{
	clear:both;
}
</style>


