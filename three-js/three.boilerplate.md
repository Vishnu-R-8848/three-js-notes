import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// --- 1. Scene & Canvas ---
const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// --- 2. Camera ---
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(2, 3, 4);
scene.add(camera);

// --- 3. Mesh ---
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// --- 4. Renderer ---
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- 5. Controls ---
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// --- 6. Time & Loop ---
const timer = new THREE.Timer();

const animate = (timestamp) => {
  timer.update(timestamp);
  const delta = timer.getDelta();

  cube.rotation.x += 0.5 * delta;
  cube.rotation.y += 0.5 * delta;
  cube.rotation.z += 0.5 * delta;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

window.requestAnimationFrame(animate);

// --- 7. Event Listeners ---
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});