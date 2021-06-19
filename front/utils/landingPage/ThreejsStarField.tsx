import * as THREE from "three";

import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer";
import { asXApproachesTOutputApproachesC } from "../math/asXApproachesTOutputApproachesC";
import { ThreejsPrototype } from "./ThreejsPrototype";

/**
 * Starfield + delayed camera-cursor track + auto pan and tilt when idle.
 */
export class ThreejsStarField extends ThreejsPrototype {
  protected particlesMesh: THREE.Material;
  protected particlesGeometry: THREE.BufferGeometry;
  protected particles: THREE.Points;
  protected composer: EffectComposer;
  protected disableCursorTrack?: boolean;
  protected mouse: {
    current: { x: number; y: number };
    prev: { x: number; y: number };
    difference: { x: number; y: number };
    autorotate: boolean;
  };
  protected raycaster: THREE.Raycaster;
  protected interactedPoints = [];

  constructor(canvas: HTMLCanvasElement, disableCursorTrack?: boolean) {
    super(canvas);

    this.disableCursorTrack = disableCursorTrack ? true : false;

    this.mouse = {
      current: { x: 0, y: 0 },
      prev: { x: 0, y: 0 },
      difference: { x: 0, y: 0 },
      autorotate: true,
    };

    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load("/graphics/particle.png");
    this.particlesMesh = new THREE.PointsMaterial({
      size: 0.15,
      sizeAttenuation: true,
      map: texture,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      vertexColors: true,
      transparent: true,
    });

    const count = 2000;
    const spread = 41;
    this.particlesGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const colorPositions = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * spread;
      if (i % 3 == 0) {
        colorPositions[i] = 1;
      } else if (i % 4 == 0) {
        colorPositions[i] = 0.5;
      } else {
        colorPositions[i] = 0.7;
      }
    }
    this.particlesGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    this.particlesGeometry.setAttribute(
      "color",
      new THREE.BufferAttribute(colorPositions, 3)
    );

    this.particles = new THREE.Points(
      this.particlesGeometry,
      this.particlesMesh
    );

    this.raycaster = new THREE.Raycaster();

    let EffectComposer = require("three/examples/jsm/postprocessing/EffectComposer");
    let RenderPass = require("three/examples/jsm/postprocessing/RenderPass");
    this.composer = new EffectComposer.EffectComposer(this.renderer);
    const renderPass = new RenderPass.RenderPass(this.scene, this.camera);
    this.composer.addPass(renderPass);

    //Add stuff to scene
    this.scene.add(this.particles);
  }

  //Move all this.scene.add to above
  extraEventListenersBeforeAnimLoop() {
    var timeout: any;
    if (this.canvas.parentElement) {
      this.canvas.parentElement.addEventListener("mousemove", (e) => {
        if (!this.disableCursorTrack) {
          this.mouse.autorotate = false;

          clearTimeout(timeout);
          timeout = setTimeout(() => {
            this.mouse.autorotate = true;
          }, 2500);
        }
        this.mouse.current.x = (e.clientX / this.canvas.offsetWidth) * 2 - 1;
        this.mouse.current.y = -(e.clientY / this.canvas.offsetHeight) * 2 + 1;
      });
    }
  }

  initAnimationLoop() {
    // const colors = this.particlesGeometry.attributes.color;
    const tick = () => {
      const elapsedTime = this.clock.getElapsedTime();

      let mouse;
      if (this.disableCursorTrack) {
        mouse = new THREE.Vector2(this.mouse.current.x, this.mouse.current.y);
      } else {
        mouse = new THREE.Vector2(this.mouse.prev.x, this.mouse.prev.y);
      }
      this.raycaster.setFromCamera(mouse, this.camera);
      const intersects = this.raycaster.intersectObject(this.particles, false);

      if (intersects.length > 0) {
        //Threshold is when the points become affected by the raycasting and begin changing color.
        const threshold = 0.6;
        for (let i = 0; i < intersects.length; i++) {
          const x = (intersects[i] as any).distanceToRay;
          if (x < threshold) {
            const index = intersects[i].index as number;
            /**
             * intersects[i].index do not take into account the fact that
             *   each vertex is composed of three attributes.
             */
            const attributePosition = index * 3;

            //change color as cursor gets closer
            /**
             * Current behavior, take away green value as cursor gets closer.
             * And instant blue hue as cursor enters the bounding area of the dots.
             *
             * Final result is a trail of purple dots.
             */
            const green = attributePosition + 1;
            const blue = attributePosition + 2;
            (this.particlesGeometry as any).attributes.color.array[green] =
              asXApproachesTOutputApproachesC(x, threshold, 0.5, 2);
            (this.particlesGeometry as any).attributes.color.array[blue] = 2;
            this.particlesGeometry.attributes.color.needsUpdate = true;

            //change position as cursor gets closer
            const xPos = attributePosition;
            const yPos = attributePosition + 1;
            const zPos = attributePosition + 2;
            const interactedPoint = {
              pointCoordinate: {
                x: (this.particlesGeometry as any).attributes.position.array[
                  xPos
                ],
                y: (this.particlesGeometry as any).attributes.position.array[
                  yPos
                ],
                z: (this.particlesGeometry as any).attributes.position.array[
                  zPos
                ],
              },
              initVelocity: 0.009,
            };

            // (this.particlesGeometry as any).attributes.position.array[yPos] +=
            //   0.009 * x;
            // (this.particlesGeometry as any).attributes.position.array[xPos] -=
            //   0.009 * x;
            // (this.particlesGeometry as any).attributes.position.array[zPos] -=
            //   0.009 * x;

            this.particlesGeometry.attributes.position.needsUpdate = true;
          }
        }
      }

      this.particles.rotation.y += 0.0008;

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
        //Perform inertia for when autorotate is off.
        //When auto rotate is off, the camera will follow mouse with a bit of a delay
        //Like a steady cam, basically
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
