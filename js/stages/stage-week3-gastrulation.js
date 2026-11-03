/**
 * STAGE 8: Week 3 - Gastrulation & The 3 Germ Layers
 * Primitive streak invagination, formation of Ectoderm, Mesoderm,
 * Endoderm, notochord induction, and neural plate folding.
 */

import * as THREE from 'three';

export class StageWeek3Gastrulation {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    
    this.buildScene();
  }

  buildScene() {
    this.discGroup = new THREE.Group();

    // 1. Ectoderm (Top Layer — Electric Blue / Cyan)
    const ectoGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.35, 32);
    const ectoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#0284c7'),
      emissive: new THREE.Color('#00f0ff'),
      emissiveIntensity: 0.35,
      roughness: 0.3
    });
    this.ectoMesh = new THREE.Mesh(ectoGeo, ectoMat);
    this.ectoMesh.position.set(0, 0.45, 0);
    this.discGroup.add(this.ectoMesh);

    // 2. Mesoderm (Middle Layer — Vibrant Coral / Crimson)
    const mesoGeo = new THREE.CylinderGeometry(3.4, 3.4, 0.35, 32);
    const mesoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e11d48'),
      emissive: new THREE.Color('#ff0055'),
      emissiveIntensity: 0.35,
      roughness: 0.35
    });
    this.mesoMesh = new THREE.Mesh(mesoGeo, mesoMat);
    this.mesoMesh.position.set(0, 0, 0);
    this.discGroup.add(this.mesoMesh);

    // 3. Endoderm (Bottom Layer — Golden Amber)
    const endoGeo = new THREE.CylinderGeometry(3.6, 3.6, 0.35, 32);
    const endoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#eab308'),
      emissive: new THREE.Color('#ca8a04'),
      emissiveIntensity: 0.3,
      roughness: 0.4
    });
    this.endoMesh = new THREE.Mesh(endoGeo, endoMat);
    this.endoMesh.position.set(0, -0.45, 0);
    this.discGroup.add(this.endoMesh);

    // 4. Primitive Streak Groove & Node along midline
    const streakCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0, 0.65, -2.4),
      new THREE.Vector3(0, 0.55, -0.5),
      new THREE.Vector3(0, 0.55, 1.2)
    ]);
    const streakGeo = new THREE.TubeGeometry(streakCurve, 16, 0.18, 8, false);
    const streakMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a855f7'),
      emissive: new THREE.Color('#9333ea'),
      emissiveIntensity: 0.6
    });
    const streakMesh = new THREE.Mesh(streakGeo, streakMat);
    this.discGroup.add(streakMesh);

    // Primitive Node (Hensen's node at cranial end)
    const nodeGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const nodeMesh = new THREE.Mesh(nodeGeo, streakMat);
    nodeMesh.position.set(0, 0.65, -2.4);
    this.discGroup.add(nodeMesh);

    // 5. Emerging Neural Plate Folds (elevating along the top ectoderm)
    const foldCurveLeft = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.6, 0.75, -2.5),
      new THREE.Vector3(-0.8, 0.85, -0.5),
      new THREE.Vector3(-0.6, 0.75, 1.5)
    ]);
    const foldGeoL = new THREE.TubeGeometry(foldCurveLeft, 16, 0.15, 8, false);
    const foldMeshL = new THREE.Mesh(foldGeoL, this.materials.get('neuralTube'));
    this.discGroup.add(foldMeshL);

    const foldCurveRight = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.6, 0.75, -2.5),
      new THREE.Vector3(0.8, 0.85, -0.5),
      new THREE.Vector3(0.6, 0.75, 1.5)
    ]);
    const foldGeoR = new THREE.TubeGeometry(foldCurveRight, 16, 0.15, 8, false);
    const foldMeshR = new THREE.Mesh(foldGeoR, this.materials.get('neuralTube'));
    this.discGroup.add(foldMeshR);

    // Tilt for dramatic 3D perspective
    this.discGroup.rotation.x = 0.55;
    this.discGroup.rotation.y = 0.3;
    this.rootObject.add(this.discGroup);
  }

  update(delta, elapsed) {
    if (this.discGroup) {
      this.discGroup.rotation.y = 0.3 + Math.sin(elapsed * 0.4) * 0.12;
      this.discGroup.rotation.x = 0.55 + Math.cos(elapsed * 0.3) * 0.05;
    }
  }
}
