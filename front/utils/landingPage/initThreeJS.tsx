import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";

/**
 * Why class? You can pass the state between React and Threejs on the go with class, but not with functions.
 * Also, classes can do everything functions can, while functions can't do everything classes can.
 */
export class ThreeJSInstance {
  protected canvas: HTMLCanvasElement;
  protected mouse: {
    current: { x: number; y: number };
    prev: { x: number; y: number };
    difference: { x: number; y: number };
    autorotate: boolean;
  };
  protected particlesMesh: THREE.PointsMaterial;
  protected scene: THREE.Scene;
  protected camera: THREE.PerspectiveCamera;
  protected sizes: { width: number; height: number };
  protected renderer: THREE.WebGLRenderer;
  protected particlesGeometry: THREE.BufferGeometry;
  protected particles: THREE.Points;
  protected composer: EffectComposer;
  protected disableCursorTrack?: boolean;

  constructor(canvas: HTMLCanvasElement, disableCursorTrack?: boolean) {
    this.scene = new THREE.Scene();

    this.sizes = { height: window.innerHeight, width: window.innerWidth };

    this.canvas = canvas;

    this.disableCursorTrack = disableCursorTrack ? true : false;

    this.mouse = {
      current: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
      difference: { x: 0, y: 0 },
      autorotate: true,
    };

    this.particlesMesh = new THREE.PointsMaterial({
      size: 0.01,
      sizeAttenuation: true,
    });

    this.camera = new THREE.PerspectiveCamera(
      75,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.camera.position.x = 0;
    this.camera.position.y = 0;
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    });
    this.renderer.setSize(this.sizes.width, this.sizes.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    this.particlesGeometry = new THREE.BufferGeometry();
    const count = 2000;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 60;
    }
    this.particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );

    this.particles = new THREE.Points(
      this.particlesGeometry,
      this.particlesMesh
    );

    let EffectComposer = require("three/examples/jsm/postprocessing/EffectComposer");
    let RenderPass = require("three/examples/jsm/postprocessing/RenderPass");
    let BloomPass = require("three/examples/jsm/postprocessing/BloomPass");
    this.composer = new EffectComposer.EffectComposer(this.renderer);
    const renderPass = new RenderPass.RenderPass(this.scene, this.camera);
    const bloomPass = new BloomPass.BloomPass(1, 25, 4, 256);
    this.composer.addPass(renderPass);

    //Add stuff to scene
    this.scene.add(this.particles);
    this.scene.add(this.camera);
  }

  //Move all this.scene.add to above
  main() {
    window.addEventListener("resize", () => {
      // Update sizes
      this.sizes.width = window.innerWidth;
      this.sizes.height = window.innerHeight;

      // Update camera
      this.camera.aspect = this.sizes.width / this.sizes.height;
      this.camera.updateProjectionMatrix();

      // Update renderer
      this.renderer.setSize(this.sizes.width, this.sizes.height);
      this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    });

    var timeout: any;
    this.canvas.addEventListener("mousemove", (e) => {
      if (!this.disableCursorTrack) {
        this.mouse.autorotate = false;

        clearTimeout(timeout);
        timeout = setTimeout(() => {
          this.mouse.autorotate = true;
        }, 2500);

        this.mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
      }
    });

    const clock = new THREE.Clock();

    const tick = () => {
      const elapsedTime = clock.getElapsedTime();

      this.composer.render();

      //Upate camera
      this.camera.lookAt(this.mouse.prev.x, this.mouse.prev.y);
      this.camera.updateProjectionMatrix();
      //Track cursor with camera
      this.followCursorWithDelay(elapsedTime);

      // Call tick again on the next frame
      window.requestAnimationFrame(tick);
    };

    tick();
  }

  followCursorWithDelay(elapsedTime: number) {
    //repeats until difference is 0.
    const speedDif = 0.03;
    const cameraDelay = () => {
      if (this.mouse.autorotate) {
        this.mouse.current.x = Math.sin(elapsedTime * 0.09);
        this.mouse.current.y = Math.cos(elapsedTime * 0.09);
        this.mouse.difference.x =
          (this.mouse.current.x - this.mouse.prev.x) * speedDif;
        this.mouse.difference.y =
          (this.mouse.current.y - this.mouse.prev.y) * speedDif;
      } else {
        //Perform inertia
        this.mouse.difference.x =
          (this.mouse.current.x - this.mouse.prev.x) * speedDif;
        this.mouse.difference.y =
          (this.mouse.current.y - this.mouse.prev.y) * speedDif;
      }
      this.mouse.prev.x += this.mouse.difference.x;
      this.mouse.prev.y += this.mouse.difference.y;
    };

    cameraDelay();
  }
}

//Should have delay + slight motion blur
