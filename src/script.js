import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "dat.gui";

// Loading
const textureLoader = new THREE.TextureLoader();

const normalTexture = textureLoader.load("/textures/NormalMap-golf.png");

// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene - Required
const scene = new THREE.Scene();

// Objects
const geometry = new THREE.SphereBufferGeometry(0.5, 64, 64);

// Materials

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.7;
material.roughness = 0.2;
material.normalMap = normalTexture;
material.color = new THREE.Color(0x292929);

// Mesh
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

////////////////////////
// LIGHTS LIGHTS LIGHTS
////////////////////////

///////////////////
// Light 1
///////////////////
const pointLight1 = new THREE.PointLight(0xff0000, 1);
// pointLight.position.x = 2;
// pointLight.position.y = 3;
// pointLight.position.z = 4;
pointLight1.position.set(-1.39, 0.93, -0.59);
pointLight1.intensity = 10;

scene.add(pointLight1);
// Gui Settings for Light 1
/////////////////////////////
// .addFolder creates the dropdown header for the gui.
// .add in the beginning adds attributes to that specific dropdown
const pointLight1Options = gui.addFolder("Light 1");
pointLight1Options.add(pointLight1.position, "x").min(-3).max(3).step(0.01);
pointLight1Options.add(pointLight1.position, "y").min(-3).max(3).step(0.01);
pointLight1Options.add(pointLight1.position, "z").min(-3).max(3).step(0.01);
pointLight1Options.add(pointLight1, "intensity").min(0).max(10).step(0.01);

// change color
/////////////////////////////
const colorChange1 = {
  color: 0xff0000,
};
pointLight1Options.addColor(colorChange1, "color").onChange(() => {
  pointLight1.color.set(colorChange1.color);
});

// // the second parameter might be the size of the pointlight.
// const pointLight1Helper = new THREE.PointLightHelper(pointLight1, 1);
// scene.add(pointLight1Helper);

///////////////////
// Light 2
///////////////////
const pointLight2 = new THREE.PointLight(0x0000ff, 2);
pointLight2.position.set(1.39, 0.93, -0.59);
pointLight2.intensity = 10;

scene.add(pointLight2);

// Gui Settings for Light 2
/////////////////////////////
const pointLight2Options = gui.addFolder("Light 2");
pointLight2Options.add(pointLight2.position, "x").min(-3).max(3).step(0.01);
pointLight2Options.add(pointLight2.position, "y").min(-3).max(3).step(0.01);
pointLight2Options.add(pointLight2.position, "z").min(-3).max(3).step(0.01);
pointLight2Options.add(pointLight2, "intensity").min(0).max(10).step(0.01);

// change color
/////////////////////////////
const colorChange2 = {
  color: 0x0000ff,
};
pointLight2Options.addColor(colorChange2, "color").onChange(() => {
  pointLight2.color.set(colorChange2.color);
});
// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLight2Helper);

///////////////////
// Light 3
///////////////////
const pointLight3 = new THREE.PointLight(0x00ff00, 2);
pointLight3.position.set(0, -5.5, -2.44);
pointLight3.intensity = 2.7;

scene.add(pointLight3);

// Gui Settings for Light 3
/////////////////////////////
const pointLight3Options = gui.addFolder("Light 3");
pointLight3Options.add(pointLight3.position, "x").min(-3).max(3).step(0.01);
pointLight3Options.add(pointLight3.position, "y").min(-6).max(3).step(0.01);
pointLight3Options.add(pointLight3.position, "z").min(-3).max(3).step(0.01);
pointLight3Options.add(pointLight3, "intensity").min(0).max(10).step(0.01);
// change color
/////////////////////////////
const colorChange3 = {
  color: 0x00ff00,
};
pointLight3Options.addColor(colorChange3, "color").onChange(() => {
  pointLight3.color.set(colorChange3.color);
});

// const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLight3Helper);
//based on the gui settings in the window, I can now go up to the settings in my document and change those.
// Use the gui as a way to experiment. You will not need the gui when you deploy your website.

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  // makes the background of the canvas transparent when alpha is true
  alpha: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
// Set up the Mouse Movement
const onDocumentMouseMove = (event) => {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
};

document.addEventListener("mousemove", onDocumentMouseMove);
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;
///////////////////////
const updateSphere = (event) => {
  sphere.position.y = window.scrollY * 0.001;
};

window.addEventListener("scroll", updateSphere);

const clock = new THREE.Clock();

const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update objects
  sphere.rotation.y = 0.5 * elapsedTime;

  // interrupts the rotation animation and follows the mouse movement.
  sphere.rotation.x += 0.5 * (targetY - sphere.rotation.x);
  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.position.z += 0.5 * (targetY - sphere.rotation.x);

  // Update Orbital Controls
  // controls.update()

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
