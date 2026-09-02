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
});
const cube = new THREE.Mesh(geometry, material);

const canvas = document.querySelector("#webgl");
const renderer = new THREE.WebGLRenderer({
  canvas,
});

renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);