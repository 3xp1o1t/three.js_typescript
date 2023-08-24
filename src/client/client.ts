import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
// Estadisticas (fps/ ms / size)
import Stats from "three/examples/jsm/libs/stats.module";
// GUI para manipular las propiedades de la camara y el cubo visualmente.
import { GUI } from "dat.gui";

// 1er elemento - La scena es un plano 3D (X, Y, Z)
const scene = new THREE.Scene();
// Agregar lineas para los ejex X,Y,Z de grosor 5
scene.add(new THREE.AxesHelper(5));

// 2do elemento - La camara es el foco para previsualizar la escena.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.z = 2;

// 3er elemento - renderizador.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// new OrbitControls(camera, renderer.domElement);
const controls = new OrbitControls(camera, renderer.domElement);

// componentes de una forma
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

const cube = new THREE.Mesh(geometry, material);

// Añadir una forma a la escena
scene.add(cube);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// Agregar el objeto Stats para renderizar un div
// con click izq cambiamos el tipo de estadistica.
const stats = new Stats();
document.body.appendChild(stats.dom);

// Agregamos la interfaz visual para manipular las props del cubo.
const gui = new GUI();
// Folder para operar con la rotacion del cubo
const cubeFolderRotation = gui.addFolder("Cube Rotation");
const cubeFolderScale = gui.addFolder("Cube Scale");
const cubeFolderPosition = gui.addFolder("Cube Position");
// Agregar las propiedades del cubo (Rotacion)
cubeFolderRotation.add(cube.rotation, "x", 0, Math.PI * 2);
cubeFolderRotation.add(cube.rotation, "y", 0, Math.PI * 2);
cubeFolderRotation.add(cube.rotation, "z", 0, Math.PI * 2);

// Propiedades de Posicion.
cubeFolderPosition.add(cube.position, "x", -10, 10, 1);
cubeFolderPosition.add(cube.position, "y", -10, 10, 1);
cubeFolderPosition.add(cube.position, "z", -10, 10, 1);

// Propiedades Scala
cubeFolderScale.add(cube.scale, "x", -5.0, 5.0);
cubeFolderScale.add(cube.scale, "y", -5.0, 5.0);
cubeFolderScale.add(cube.scale, "z", -5.0, 5.0);

cubeFolderRotation.open(); // Abrir el gui.
cubeFolderScale.open();
cubeFolderPosition.open();

// camera
const cameraFolder = gui.addFolder("Camera");
cameraFolder.add(camera.position, "z", 0, 10);
cameraFolder.open();

function animate() {
  requestAnimationFrame(animate);

  render();

  // actulizamos los stats.
  stats.update();
}

function render() {
  renderer.render(scene, camera);
}

animate();
