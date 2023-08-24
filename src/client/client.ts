import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import { GUI } from "dat.gui";

// 1er elemento - La scena es un plano 3D (X, Y, Z)
const scene = new THREE.Scene();
// ejes
scene.add(new THREE.AxesHelper(5));

// 2do elemento - La camara es el foco para previsualizar la escena.
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.x = 4;
camera.position.y = 4;
camera.position.z = 4;

// 3er elemento - renderizador.
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(8, 0, 0);

// Luz ejemplo
const light1 = new THREE.PointLight(0xffffff, 20.0);
light1.position.set(10, 10, 10);
scene.add(light1);
// light1.add(new THREE.AxesHelper(5));

const light2 = new THREE.PointLight(0xff0000, 20.0);
light2.position.set(-10, 10, 10);
scene.add(light2);

// Crear una esfera
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0xff0000 })
);
// Se establece una pos de la esfera en el eje x.
object1.position.set(4, 0, 0);
scene.add(object1);
object1.add(new THREE.AxesHelper(5));

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x00ff00 })
);
// Se establece una pos de la esfera en el eje x.
object2.position.set(4, 0, 0);
object1.add(object2);
object2.add(new THREE.AxesHelper(5));

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(),
  new THREE.MeshPhongMaterial({ color: 0x0000ff })
);
// Se establece una pos de la esfera en el eje x.
object3.position.set(4, 0, 0);
object2.add(object3);
object3.add(new THREE.AxesHelper(5));

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

// GUI para manipular las props de los objetos 3d.

const gui = new GUI();
const object1Folder = gui.addFolder("Object 1");
const object2Folder = gui.addFolder("Object 2");
const object3Folder = gui.addFolder("Object 3");
const light1Folder = gui.addFolder("Light Right");
const light2Folder = gui.addFolder("Light Left");

object1Folder.add(object1.position, "x", 0, 10, 0.01).name("X Position");
object1Folder
  .add(object1.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object1Folder.add(object1.scale, "x", 0, 2, 0.01).name("X Scale");
// object 2
object2Folder.add(object2.position, "x", 0, 10, 0.01).name("X Position");
object2Folder
  .add(object2.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object2Folder.add(object2.scale, "x", 0, 2, 0.01).name("X Scale");
// object 3
object3Folder.add(object3.position, "x", 0, 10, 0.01).name("X Position");
object3Folder
  .add(object3.rotation, "x", 0, Math.PI * 2, 0.01)
  .name("X Rotation");
object3Folder.add(object3.scale, "x", 0, 2, 0.01).name("X Scale");

light1Folder.add(light1.position, "x", 0, 20, 0.01).name("X Position");
light1Folder.add(light1.color, "r", 0x00, 0xff, 0x01).name("Red");
light1Folder.add(light1.color, "g", 0x00, 0xff, 0x01).name("Green");
light1Folder.add(light1.color, "b", 0x00, 0xff, 0x01).name("Blue");
// luz 2
light2Folder.add(light2.position, "z", -10, 20, 0.01).name("X Position");
light2Folder.add(light2.color, "r", 0x00, 0xff, 0x01).name("Red");
light2Folder.add(light2.color, "g", 0x00, 0xff, 0x01).name("Green");
light2Folder.add(light2.color, "b", 0x00, 0xff, 0x01).name("Blue");

// Stats
const stats = new Stats();
document.body.appendChild(stats.dom);

// Escribir las posiones en html de los objectos 3d
const debug = document.getElementById("debug1") as HTMLDivElement;

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  stats.update();
  render();

  // Extraer las posiciones Globales (world)
  const object1WorldPosition = new THREE.Vector3();
  object1.getWorldPosition(object1WorldPosition);
  const object2WorldPosition = new THREE.Vector3();
  object2.getWorldPosition(object2WorldPosition);
  const object3WorldPosition = new THREE.Vector3();
  object3.getWorldPosition(object3WorldPosition);

  debug.innerHTML =
    "Red<br />" +
    "Local Pos X: " +
    object1.position.x.toFixed(2) +
    "<br />" +
    "World Pos X: " +
    object1WorldPosition.x.toFixed(2) +
    "<br />Green" +
    "<br />Local Pos X: " +
    object2.position.x.toFixed(2) +
    "<br />World Pos X: " +
    object2WorldPosition.x.toFixed(2) +
    "<br />Blue" +
    "<br />Local Pos X: " +
    object3.position.x.toFixed(2) +
    "<br />World Pos X: " +
    object3WorldPosition.x.toFixed(2) +
    "\n";
}

function render() {
  renderer.render(scene, camera);
}

animate();
