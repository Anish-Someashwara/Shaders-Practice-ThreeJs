import * as THREE from "three";
import vertexShader from '../glsl/shaders/vertex.glsl';
import fragmentShader from '../glsl/shaders/fragment.glsl';

export default class ThreeJsShaders {
	constructor(scene) {
		this.scene = scene;
        // this.testThreeJsSetup();
        // console.log(vertexShader, fragmentShader)
        this.uniforms = {
            u_time: {type: 'f', value: 0.0}
        }
        this.initShaders();
	}

	testThreeJsSetup() {
		const geometry = new THREE.BoxGeometry(1, 1, 1);
		const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
		const cube = new THREE.Mesh(geometry, material);
		this.scene.add(cube);
		// console.log(cube.position)
	}


    initShaders(){
        const geometry = new THREE.PlaneGeometry(10, 10, 30, 30);
        const material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            uniforms: this.uniforms,
            wireframe: true
        });
        const mesh = new THREE.Mesh(geometry, material);
        this.scene.add(mesh);

    }


    update(elapsedTime){
        console.log("HI")
        this.uniforms.u_time.value = elapsedTime;
    }

}
