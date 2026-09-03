import "./style.css";

import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
); // field of view, aspect ratio, near plane, far plane

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

renderer.setSize(window.innerWidth, window.innerHeight);

const animate = () => {
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  cube.rotation.z += 0.01;
  renderer.render(scene, camera);
  requestAnimationFrame(animate);
};
animate();
