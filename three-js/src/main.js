import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const scene = new THREE.Scene();

// Give the scene a gray background so you can clearly tell the canvas is running
scene.background = new THREE.Color("#1a1a1a");

const size = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const camera = new THREE.PerspectiveCamera(
  75,
  size.width / size.height,
  0.1,
  1000,
);
camera.position.set(2, 2, 4);

// // 1. Lights that ensure it cannot be pitch black
// const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
// scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 4, 2);
scene.add(directionalLight);

const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
);
scene.add(directionalLightHelper);

// 2. Visible test cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
  color: "red", // Neon green so it's impossible to miss
  roughness: 0.3,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(size.width, size.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

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
  cube.rotation.y += 0.01;
  cube.rotation.x += 0.005;

  controls.update();
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
