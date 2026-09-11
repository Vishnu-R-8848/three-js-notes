import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// Scene & Canvas
const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000
);
camera.position.set(2, 3, 4);
scene.add(camera);

// Texture & Mesh
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load(
  "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1000&auto=format&fit=crop"
);

const geometry = new THREE.BoxGeometry(1, 1, 1);

// Unlit material showing the texture (no lights needed)
const material = new THREE.MeshBasicMaterial({ 
  map: texture 
});

// If you want to use lights later, switch to:
// const material = new THREE.MeshStandardMaterial({ map: texture, roughness: 0.3 });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Lights & Helpers (Commented out)

// AmbientLight (Fill light - has no helper)
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
// scene.add(ambientLight);

// DirectionalLight (Sun rays) + Helper
// const directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// directionalLight.position.set(3, 4, 2);
// scene.add(directionalLight);
// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 0.8);
// scene.add(directionalLightHelper);

// PointLight (Bulb) + Helper
// const pointLight = new THREE.PointLight(0xffffff, 10, 20, 2);
// pointLight.position.set(2, 2, 2);
// scene.add(pointLight);
// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.3);
// scene.add(pointLightHelper);

// SpotLight (Cone) + Helper
// const spotLight = new THREE.SpotLight(0xffffff, 15, 20, Math.PI / 6, 0.3, 1);
// spotLight.position.set(0, 5, 2);
// spotLight.target = cube;
// scene.add(spotLight);
// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// HemisphereLight (Sky vs Ground) + Helper
// const hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444, 1);
// scene.add(hemisphereLight);
// const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.5);
// scene.add(hemisphereLightHelper);

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

  // Helper updates (uncomment when testing lights with moving targets)
  // directionalLightHelper.update();
  // spotLightHelper.update();

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