import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
); // field of view, aspect ratio, near plane, far plane

const time = new THREE.Clock();

const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const material2 = new THREE.MeshBasicMaterial({
  color: "green",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
const cube2 = new THREE.Mesh(geometry, material2);

scene.add(cube);
scene.add(cube2)

camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 1;
camera.lookAt(new THREE.Vector3(1, 1, 1));

cube.position.x = -1.5;
cube2.position.x = 1.5;


const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));

const controls = new OrbitControls (camera , renderer.domElement)

const animate = () => {
  const elapsedTime = time.getElapsedTime();

  // cube.rotation.x = elapsedTime;
  // cube.rotation.y = elapsedTime;
  // cube.rotation.z = elapsedTime;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
