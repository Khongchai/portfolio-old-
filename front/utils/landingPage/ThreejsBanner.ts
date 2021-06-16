import * as THREE from "three";
import { ThreejsPrototype } from "./ThreejsPrototype";

export class ThreejsBanner extends ThreejsPrototype {
  constructor(canvas: HTMLCanvasElement, newContainer: HTMLElement) {
    super(canvas, newContainer);

    this.material = new THREE.MeshBasicMaterial();
    const ratioDivider = 225;
    this.geometry = new THREE.PlaneGeometry(
      1180 / ratioDivider,
      603 / ratioDivider
    );
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    this.renderer.setClearColor(0x000000, 0);

    this.scene.add(this.mesh, this.light);
  }
}
