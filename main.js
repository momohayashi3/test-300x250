import './style.css'

import * as THREE from '/three';
import { GLTFLoader } from '/three/addons/loaders/GLTFLoader.js';
import { DRACOLoader } from '/three/addons/loaders/DRACOLoader.js';
import { OrbitControls } from '/three/addons/controls/OrbitControls.js';
// import modelSrc from './assets/oreoGltf.gltf';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x0455fb)
const camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 100 );

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg')
});

function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  // look up the size the canvas is being displayed
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;

  // adjust displayBuffer size to match
  if (canvas.width !== width || canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();

    // update any render target sizes here
  }
}



const controls = new OrbitControls( camera, renderer.domElement );
camera.position.setZ(5);

// document.body.appendChild( renderer.domElement );


const loader = new GLTFLoader();

// Optional: Provide a DRACOLoader instance to decode compressed mesh data
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( './draco/' );
loader.setDRACOLoader( dracoLoader );


// Load a glTF resource
loader.load(
	// resource URL
	'./assets/oreoGltf.gltf',
  // modelSrc,
	// called when the resource is loaded
	function ( gltf ) {
    // console.log(gltf.scene.children);
    const model = gltf.scene;
    model.rotation.y += 48;
		scene.add( model );

	}
	// called while loading is progressing
	// function ( xhr ) {

	// 	console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	// },


);



const light = new THREE.HemisphereLight( 0xffffff, 0x080820, 10 );
// const helper = new THREE.HemisphereLightHelper( light, 5 );
scene.add( light );
// scene.add( helper );

controls.update();

function animate(){
  requestAnimationFrame( animate );
  controls.update();

  renderer.render(scene, camera);
}

animate();