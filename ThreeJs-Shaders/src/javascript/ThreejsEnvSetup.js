import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader.js";
import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';    // *** for webpack devServer
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';
import ThreeJsShaders from "./ThreeJsShaders.js";

export default class ThreeJsEnvSetup {
	static instance = null;

	constructor(canvas) {
		if (ThreeJsEnvSetup.instance) {
			return ThreeJsEnvSetup.instance;
		}
		ThreeJsEnvSetup.instance = this;
		RectAreaLightUniformsLib.init();


		this.clock = new THREE.Clock();

		this.canvas = canvas;
		this.scene = new THREE.Scene();
		// this.scene.backgroundBlurriness = 0.01;
		this.scene.backgroundIntensity = 1;


		// this.setupRectAreaLight(0xffffff, 2, 80, 80, new THREE.Vector3(10, 50, 0), 0xffffff)

		
		this.setupCamera();
		this.setupRenderer();
		this.setupControls();

		this.ShadersThreeJsIns = new ThreeJsShaders(this.scene, {});

		// this.axesHelper = new THREE.AxesHelper(5000);
		// this.scene.add(this.axesHelper);
		this.setupLights();
		// this.setupBaseWireframeMesh();



		window.addEventListener("resize", () => this.resize());
		this.resize();
		this.update();
	}

	


	setupCamera() {
		this.camera = new THREE.PerspectiveCamera(
			35,
			window.innerWidth / window.innerHeight,
			0.1,
			10000,
		);
		this.camera.position.set(0, 0, 10);
		this.camera.lookAt(new THREE.Vector3(0, 0, 0));
	}

	setupRenderer() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: this.canvas,
			antialias: true,
		});
		this.updateRendererProperties();
	}

	setupControls() {
		this.controls = new OrbitControls(this.camera, this.canvas);
		this.controls.maxPolarAngle = (Math.PI / 180) * 95;
		this.controls.minPolarAngle = (Math.PI / 180) * -500;
	}

	setupLights() {
		// Ambient Light
		const ambientLight = new THREE.AmbientLight(0xffffff, 1);
		this.scene.add(ambientLight);

		// Directional Light
		const directionalLight = new THREE.DirectionalLight(0xffffff, 20);
		// directionalLight.position.set(-10, -50, -8);
		// this.scene.add(directionalLight);
	}

	setupBaseWireframeMesh() {
		const plane = new THREE.Mesh(
			new THREE.PlaneGeometry(100, 100, 10, 10),
			new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true }),
		);
		plane.rotation.x = (Math.PI / 180) * 90;
		this.scene.add(plane);
	}

	resize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.updateRendererProperties();
	}

	updateRendererProperties() {
		this.renderer.setSize(window.innerWidth, window.innerHeight);
		this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
		this.renderer.toneMapping = THREE.LinearToneMapping;
		this.renderer.toneMappingExposure = 1;
		this.renderer.outputColorSpace = THREE.SRGBColorSpace;
		this.renderer.render(this.scene, this.camera);
	}

	update() {
		const delta = this.clock.getDelta();
		const elapsed = this.clock.getElapsedTime();
		if (this.controls) this.controls.update();
		if(this.ShadersThreeJsIns) this.ShadersThreeJsIns.update(elapsed);
		this.renderer.render(this.scene, this.camera);
		window.requestAnimationFrame(() => this.update());
	}

	setupRectAreaLight(
		color = 0xffffff,
		intensity = 1,
		width = 10,
		height = 10,
		position = new THREE.Vector3(0, 0, 0),
		helperColor
	) {
		this.rectAreaLight = new THREE.RectAreaLight(
			color,
			intensity,
			width,
			height,
		);
		this.rectAreaLight.lookAt(0,0,0)
		// this.rectAreaLight.power = 100000;
		this.rectAreaLight.rotation.x = -Math.PI/2
		this.rectAreaLight.position.set(position.x, position.y, position.z);
		this.scene.add(this.rectAreaLight);

		const helper = new RectAreaLightHelper( this.rectAreaLight, new THREE.Color(helperColor) );
		this.rectAreaLight.add( helper ); // helper must be added as a child of the light
		return this.rectAreaLight;
	}
}


