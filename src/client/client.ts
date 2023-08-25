import { GUI } from 'dat.gui';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module';

// 1er elemento - La scena es un plano 3D (X, Y, Z)
const scene = new THREE.Scene();

// Dibujar los ejes x,y,z con un grosor de 5.
scene.add(new THREE.AxesHelper(5));

// 2do elemento - La camara es el foco para previsualizar la escena.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);

camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;

// 3er elemento - renderizador.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

const boxGeometry = new THREE.BoxGeometry();
const sphereGeometry = new THREE.SphereGeometry();
const icosahedronGeometry = new THREE.IcosahedronGeometry();
const planeGeometry = new THREE.PlaneGeometry();
const torusKnotGeometry = new THREE.TorusKnotGeometry();

const material = new THREE.MeshBasicMaterial();

const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);

const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = 3;
scene.add(sphere);

const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
icosahedron.position.x = 0;
scene.add(icosahedron);

const plane = new THREE.Mesh(planeGeometry, material);
plane.position.x = -2;
scene.add(plane);

const torusKnot = new THREE.Mesh(torusKnotGeometry, material);
torusKnot.position.x = -5;
scene.add(torusKnot);

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

const options = {
  side: {
    FrontSide: THREE.FrontSide,
    BackSide: THREE.BackSide,
    DoubleSide: THREE.DoubleSide,
  },
};

const colorSw = {
  color: material.color.getHex(),
};

const colorSwitcher = () => {
  material.color.setHex(Number(colorSw.color.toString().replace('#', '0x')));
};

const gui = new GUI();
const materialFolder = gui.addFolder('THREE.Material');
materialFolder.add(material, 'transparent');
materialFolder.addColor(colorSw, 'color').onChange(colorSwitcher);
materialFolder.add(material, 'opacity', 0, 1, 0.01);
materialFolder.add(material, 'depthTest');
materialFolder.add(material, 'depthWrite');
materialFolder
  .add(material, 'alphaTest', 0, 1, 0.01)
  .onChange(() => updateMaterial());
materialFolder
  .add(material, 'side', options.side)
  .onChange(() => updateMaterial());
materialFolder.open();

function updateMaterial() {
  material.side = Number(material.side) as THREE.Side;
  material.needsUpdate = true;
}

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  stats.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
