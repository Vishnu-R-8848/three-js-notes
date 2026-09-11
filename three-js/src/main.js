import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

// --- 1. Scene & Canvas ---
const canvas = document.querySelector("#webgl");
const scene = new THREE.Scene();
scene.background = new THREE.Color("#111111");

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// --- 2. Camera ---
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  1000,
);
camera.position.set(4, 4, 6);
scene.add(camera);

// --- 3. Mesh (Lit Material to React to Lights) ---
const geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
const material = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  roughness: 0.3,
  metalness: 0.2,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// --- 4. Lights & Helpers ---

// // A. AmbientLight (Soft base fill across the whole scene - NO helper exists)
// const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
// scene.add(ambientLight);

// // B. DirectionalLight (Parallel sunlight rays) + Helper (Square plane & ray line)
// const directionalLight = new THREE.DirectionalLight(0x00d2ff, 2.5);
// directionalLight.position.set(4, 5, 2);
// scene.add(directionalLight);

// const directionalLightHelper = new THREE.DirectionalLightHelper(
//   directionalLight,
//   0.8
// );
// scene.add(directionalLightHelper);

// C. PointLight (Omnidirectional bulb) + Helper (Wireframe diamond/octahedron)
// const pointLight = new THREE.PointLight(0xff5500, 15, 25, 2);
// pointLight.position.set(-3, 2, 2);
// scene.add(pointLight);

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 0.4);
// scene.add(pointLightHelper);

// // D. SpotLight (Conical flashlight/stage spotlight) + Helper (Wireframe cone)
// const spotLight = new THREE.SpotLight(0x00ff88, 12, 20, Math.PI / 6, 0.3, 1);
// spotLight.position.set(0, 5, 0);
// spotLight.target = cube; // Focus cone on the cube
// scene.add(spotLight);

// const spotLightHelper = new THREE.SpotLightHelper(spotLight);
// scene.add(spotLightHelper);

// // E. HemisphereLight (Sky vs. Ground color gradient) + Helper (Wireframe disc/sphere)
const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.8);
scene.add(hemisphereLight);

const hemisphereLightHelper = new THREE.HemisphereLightHelper(
  hemisphereLight,
  1
);
scene.add(hemisphereLightHelper);

// --- 5. Renderer ---
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// --- 6. Controls ---
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

// --- 7. Time & Loop ---
const timer = new THREE.Timer();

const animate = (timestamp) => {
  timer.update(timestamp);
  const delta = timer.getDelta();

  cube.rotation.x += 0.4 * delta;
  cube.rotation.y += 0.4 * delta;

  // Update directional & spotlight helpers if their targets/positions shift
  // directionalLightHelper.update();
  // spotLightHelper.update();
  // pointLightHelper.update();

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(animate);
};

window.requestAnimationFrame(animate);

// --- 8. Event Listeners ---
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
