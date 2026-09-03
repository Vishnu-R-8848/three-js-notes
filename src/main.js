import "./style.css";

import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000,
); // field of view, aspect ratio, near plane, far plane

const time = new THREE.Clock();

const geometry = new THREE.BoxGeometry(1, 1, 1); // width, height, depth
const material = new THREE.MeshBasicMaterial({
  color: "red",
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);

scene.add(cube);

camera.position.z = 5;
camera.position.x = 3;
camera.position.y = 1;
camera.lookAt(new THREE.Vector3(1, 1, 1));

const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.max(2, window.devicePixelRatio));

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;

window.addEventListener("resize", () => {
  size.width = window.innerWidth;
  size.height = window.innerHeight;

  camera.aspect = size.width / size.height;
  camera.updateProjectionMatrix();
  renderer.setSize(size.width, size.height);
});

const animate = () => {
  const delta = time.getElapsedTime();

  cube.rotation.x = delta;
  cube.rotation.y = delta;
  cube.rotation.z = delta;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
