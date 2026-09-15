import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader, RGBELoader } from "three/examples/jsm/Addons.js";
import { initDomAnimations, animateModelIn } from "./gsap.js";

// Run UI animation right away
initDomAnimations();

// Scene & Canvas
const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Environment Map (HDR)
const rgbeLoader = new RGBELoader();
rgbeLoader.load("./envMap.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  scene.environment = texture;
});

// Floor
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({ color: "white", side: THREE.DoubleSide }),
);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -2.53;
scene.add(floor);

// Load Model
let mixer = null;
const loader = new GLTFLoader();

loader.load("./model.glb", (gltf) => {
  const model = gltf.scene;
  model.position.y = -2.5;

  if (gltf.animations.length > 0) {
    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[12]).play();
  }

  scene.add(model);

  // Trigger GSAP animation now that the model exists
  animateModelIn(model);
});

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000,
);
camera.position.set(-2, -1, 5);
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// Render Loop
const timer = new THREE.Timer();

const animate = (timestamp) => {
  timer.update(timestamp);
  const delta = timer.getDelta();

  if (mixer) mixer.update(delta);

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

window.requestAnimationFrame(animate);

// Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
