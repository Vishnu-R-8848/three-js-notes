import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";
import heroImage from "./assets/hero-img.jpg";

// Scene & Canvas
const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Environment Map (HDR)
const rgbeLoader = new RGBELoader();
// Pass either a local HDR file (e.g., '/textures/environment.hdr') or a working CDN link:
rgbeLoader.load("./envMap.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
  scene.background = texture;
  // Optional: scene.background = texture; // if you want the HDRI visible in the skybox
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000,
);
camera.position.set(2, 3, 4);
scene.add(camera);

// Texture & Mesh
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(heroImage);
texture.colorSpace = THREE.SRGBColorSpace;

const geometry = new THREE.BoxGeometry(1, 1, 1);

// Standard material to react to directional light and environment reflections
const material = new THREE.MeshStandardMaterial({
  // map: texture,
  roughness: 0.1,
  metalness: 0.8, // metalness cranked up to visibly reflect the environment
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Ambient Light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
scene.add(ambientLight);

// Directional Light & Target
const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
directionalLight.position.set(3, 4, 2);
directionalLight.target = cube;
scene.add(directionalLight.target);
scene.add(directionalLight);

// Directional Light Helper (kept commented out)
const directionalLightHelper = new THREE.DirectionalLightHelper(
  directionalLight,
  0.8,
);
// scene.add(directionalLightHelper);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Time & Loop
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

// Event Listeners
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
