import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// 1er elemento - La scena es un plano 3D (X, Y, Z)
const scene = new THREE.Scene();

// 2do elemento - La camara es el foco para previsualizar la escena.
const camera1 = new THREE.PerspectiveCamera(75, 1, 0.1, 10);
// TOP
const camera2 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
// RIGHT
const camera3 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
// FRONT
const camera4 = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);

camera1.position.z = 2;
// TOP orto
camera2.position.y = 1;
camera2.lookAt(new THREE.Vector3(0, 0, 0));
// RIGHT
camera3.position.z = 1;
// FRONT
camera4.position.x = 1;
camera4.lookAt(new THREE.Vector3(0, 0, 0));

const canvas1 = document.getElementById("c1") as HTMLCanvasElement;
const canvas2 = document.getElementById("c2") as HTMLCanvasElement;
const canvas3 = document.getElementById("c3") as HTMLCanvasElement;
const canvas4 = document.getElementById("c4") as HTMLCanvasElement;

// 3er elemento - renderizador.
const renderer1 = new THREE.WebGLRenderer({ canvas: canvas1 });
renderer1.setSize(200, 200);
const renderer2 = new THREE.WebGLRenderer({ canvas: canvas2 });
renderer2.setSize(200, 200);
const renderer3 = new THREE.WebGLRenderer({ canvas: canvas3 });
renderer3.setSize(200, 200);
const renderer4 = new THREE.WebGLRenderer({ canvas: canvas4 });
renderer4.setSize(200, 200);

new OrbitControls(camera1, renderer1.domElement);

// componentes de una forma
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

// Añadir una forma a la escena
scene.add(cube);

function animate() {
  requestAnimationFrame(animate);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  render();
}

function render() {
  renderer1.render(scene, camera1);
  renderer2.render(scene, camera2);
  renderer3.render(scene, camera3);
  renderer4.render(scene, camera4);
}

animate();
