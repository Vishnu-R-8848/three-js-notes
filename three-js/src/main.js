import "./style.css";
import * as THREE from "three";

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100,
);

camera.position.set(0, 0, 3);

const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0xff0000,
});

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const canvas = document.querySelector("#webgl");
const render = new THREE.WebGLRenderer({
  canvas,
});

render.setSize(sizes.width, sizes.height);
render.setPixelRatio(Math.min(window.devicePixelRatio, 2));

render.render(scene, camera);
