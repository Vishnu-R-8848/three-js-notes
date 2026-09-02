import "./style.css";

import * as THREE from "three";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
); // field of view, aspect ratio, near plane, far plane

const cube = new THREE.Mesh(_geometry,_material)