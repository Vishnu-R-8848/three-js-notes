import gsap from "gsap";

// DOM animations can run immediately
export function initDomAnimations() {
  gsap.from(".title", {
    y: 100,
    opacity: 0,
    duration: 1.5,
    ease: "expo.inOut",
  });
}

// 3D animations only run when called with a valid mesh/group
export function animateModelIn(model) {
  gsap.from(model.position, {
    y: -10,
    duration: 2,
    ease: "expo.out",
  });

  gsap.from(model.rotation, {
    y: Math.PI * 2,
    duration: 2,
    ease: "expo.out",
  });
}