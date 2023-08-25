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

// componentes de una forma

// box geo
const boxGeometry = new THREE.BoxGeometry();
// sphere geo
const sphereGeometry = new THREE.SphereGeometry();
// cosahedro geo
const icosahedronGeometry = new THREE.IcosahedronGeometry();

const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  wireframe: true,
});

// box geo
const cube = new THREE.Mesh(boxGeometry, material);
cube.position.x = 5;
scene.add(cube);

// sphere geo
const sphere = new THREE.Mesh(sphereGeometry, material);
sphere.position.x = -5;
scene.add(sphere);

const icosahedron = new THREE.Mesh(icosahedronGeometry, material);
scene.add(icosahedron);

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

// GUI
const gui = new GUI();

// START CUBE SETUP
const cubeFolder = gui.addFolder('Cube');
const cubeFolderRotation = cubeFolder.addFolder('Rotation');
const cubeFolderPosition = cubeFolder.addFolder('Position');
const cubeFolderScale = cubeFolder.addFolder('Scale');

cubeFolderRotation.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);
cubeFolderRotation.add(cube.rotation, 'y', 0, Math.PI * 2, 0.01);
cubeFolderRotation.add(cube.rotation, 'x', 0, Math.PI * 2, 0.01);

cubeFolderPosition.add(cube.position, 'x', -10, 10);
cubeFolderPosition.add(cube.position, 'y', -10, 10);
cubeFolderPosition.add(cube.position, 'z', -10, 10);

cubeFolderScale
  .add(cube.scale, 'x', -5, 5, 0.1)
  .onFinishChange(() => console.dir(cube.geometry));
cubeFolderScale.add(cube.scale, 'y', -5, 5, 0.1);
cubeFolderScale.add(cube.scale, 'z', -5, 5, 0.1);

cubeFolder.add(cube, 'visible', true);
cubeFolder.open();

const cubeData = {
  width: 1,
  height: 1,
  depth: 1,
  widthSegments: 1,
  heightSegments: 1,
  depthSegments: 1,
};

const cubePropertiesFolder = cubeFolder.addFolder('Properties');
cubePropertiesFolder
  .add(cubeData, 'width', 1, 30)
  .onChange(regenerateBoxGeometry)
  .onFinishChange(() => console.dir(cube.geometry));
cubePropertiesFolder
  .add(cubeData, 'height', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'depth', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'widthSegments', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'heightSegments', 1, 30)
  .onChange(regenerateBoxGeometry);
cubePropertiesFolder
  .add(cubeData, 'depthSegments', 1, 30)
  .onChange(regenerateBoxGeometry);

function regenerateBoxGeometry() {
  const newGeometry = new THREE.BoxGeometry(
    cubeData.width,
    cubeData.height,
    cubeData.depth,
    cubeData.widthSegments,
    cubeData.heightSegments,
    cubeData.depthSegments,
  );
  cube.geometry.dispose();
  cube.geometry = newGeometry;
}
// END CUBE SETUP

// START SPHERE SETUP
const sphereData = {
  radius: 1,
  widthSegments: 8,
  heightSegments: 6,
  phiStart: 0,
  phiLength: Math.PI * 2,
  thetaStart: 0,
  thetaLength: Math.PI,
};

const sphereFolder = gui.addFolder('Sphere');
const spherePropertiesFolder = sphereFolder.addFolder('Properties');
spherePropertiesFolder
  .add(sphereData, 'radius', 0.1, 30)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'widthSegments', 1, 32)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'heightSegments', 1, 16)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'phiStart', 0, Math.PI * 2)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'phiLength', 0, Math.PI * 2)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'thetaStart', 0, Math.PI)
  .onChange(regenerateSphereGeometry);
spherePropertiesFolder
  .add(sphereData, 'thetaLength', 0, Math.PI)
  .onChange(regenerateSphereGeometry);

function regenerateSphereGeometry() {
  const newGeometry = new THREE.SphereGeometry(
    sphereData.radius,
    sphereData.widthSegments,
    sphereData.heightSegments,
    sphereData.phiStart,
    sphereData.phiLength,
    sphereData.thetaStart,
    sphereData.thetaLength,
  );
  sphere.geometry.dispose();
  sphere.geometry = newGeometry;
}

// END SPHERE SETUP

// START ICOSHEDRO SETUP
const icosahedronData = {
  radius: 1,
  detail: 0,
};

const icosahedronFolder = gui.addFolder('Icosahedron');
const icosahedronPropertiesFolder = icosahedronFolder.addFolder('Properties');
icosahedronPropertiesFolder
  .add(icosahedronData, 'radius', 0.1, 10)
  .onChange(regenerateIcosahedronGeometry);
icosahedronPropertiesFolder
  .add(icosahedronData, 'detail', 0, 5)
  .step(1)
  .onChange(regenerateIcosahedronGeometry);

function regenerateIcosahedronGeometry() {
  const newGeometry = new THREE.IcosahedronGeometry(
    icosahedronData.radius,
    icosahedronData.detail,
  );
  icosahedron.geometry.dispose();
  icosahedron.geometry = newGeometry;
}
// END ICOSHEDRO SETUP

const debug = document.getElementById('debug1') as HTMLDivElement;

function animate() {
  requestAnimationFrame(animate);
  controls.update();

  debug.innerText =
    'Matrix\n' + cube.matrix.elements.toString().replace(/,/g, '\n');

  stats.update();
  render();
}

function render() {
  renderer.render(scene, camera);
}

animate();
