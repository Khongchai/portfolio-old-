import * as THREE from "three";
import { ThreejsPrototype } from "../ThreejsPrototype";
import vertexShader from "./vertex.glsl";
import fragmentShader from "./fragment.glsl";

export class ThreejsBanner extends ThreejsPrototype {
  private bannerImage: THREE.Texture;
  private orbitControls: any;
  private mouse: { x: number; y: number };

  constructor(canvas: HTMLCanvasElement, newContainer: HTMLElement) {
    super(canvas, newContainer);

    const OrbitControls = require("three/examples/jsm/controls/OrbitControls");
    this.orbitControls = new OrbitControls.OrbitControls(
      this.camera,
      this.renderer.domElement
    );

    //TODO: load image
    const textureLoader = new THREE.TextureLoader();
    this.bannerImage = textureLoader.load("khongBanner.png");

    this.mouse = { x: 0, y: 0 };

    const ratioDivider = 225;
    this.geometry = new THREE.PlaneGeometry(
      1180 / ratioDivider,
      603 / ratioDivider,
      100,
      100
    );
    this.material = new THREE.RawShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTime: { value: 0 },
      },
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);

    this.scene.add(this.mesh, this.light);
  }

  extraEventListenersBeforeAnimLoop() {
    if (this.canvas.parentElement) {
      this.canvas.parentElement.addEventListener("mousemove", (e) => {
        const rect = this.canvas.getBoundingClientRect();
        this.mouse.x = (e.clientX - rect.left) / this.canvas.offsetWidth;
        this.mouse.y = (e.clientY - rect.top) / this.canvas.offsetHeight;
      });
    }
  }

  protected initAnimationLoop() {
    const tick = () => {
      (this.material as any).uniforms.uTime.value = this.clock.getElapsedTime();

      this.orbitControls.update();

      this.renderer.render(this.scene, this.camera);
      //Upate camera
      this.camera.updateProjectionMatrix();

      window.requestAnimationFrame(tick);
    };
    tick();
  }
}
