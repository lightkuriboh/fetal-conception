/**
 * STAGE 5: Cleavage & The Morula (Days 1–4)
 * Mitotic divisions (2, 4, 8 cells) inside the rigid zona pellucida,
 * compaction, and the formation of the 16-32 cell mulberry morula.
 */

import * as THREE from 'three';

export class StageCleavage {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.blastomeres = [];
    
    this.buildScene();
  }

  buildScene() {
    // 1. Transparent Constant-Diameter Zona Pellucida
    const zonaGeo = new THREE.SphereGeometry(3.0, 32, 32);
    this.zonaMesh = new THREE.Mesh(zonaGeo, this.materials.get('zonaPellucida'));
    this.rootObject.add(this.zonaMesh);

    // 2. Compacted Morula Cell Cluster (16-32 Blastomeres)
    this.morulaGroup = new THREE.Group();
    const cellGeo = new THREE.SphereGeometry(0.72, 20, 20);
    const cellMat = this.materials.get('blastomere');

    // Generate tightly packed spherical cluster
    const cellCount = 24;
    for (let i = 0; i < cellCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / cellCount);
      const theta = Math.sqrt(cellCount * Math.PI) * phi;
      const r = 1.35; // tightly packed within 3.0 shell

      const cell = new THREE.Mesh(cellGeo, cellMat);
      cell.position.set(
        r * Math.cos(theta) * Math.sin(phi),
        r * Math.sin(theta) * Math.sin(phi),
        r * Math.cos(phi)
      );
      
      // Slight scale variation for organic mulberry texture
      const s = 0.85 + Math.random() * 0.25;
      cell.scale.set(s, s, s);
      
      this.morulaGroup.add(cell);
      this.blastomeres.push(cell);
    }
    
    // Add central core blastomeres
    for (let j = 0; j < 4; j++) {
      const innerCell = new THREE.Mesh(cellGeo, cellMat);
      innerCell.position.set(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8
      );
      this.morulaGroup.add(innerCell);
    }

    this.rootObject.add(this.morulaGroup);

    // 3. Fallopian Ciliated Epithelial Flow Background
    const flowCount = 60;
    const flowGeo = new THREE.BufferGeometry();
    const flowPos = new Float32Array(flowCount * 3);
    for (let i = 0; i < flowCount; i++) {
      flowPos[i * 3] = (Math.random() - 0.5) * 16;
      flowPos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      flowPos[i * 3 + 2] = (Math.random() - 0.5) * 12;
    }
    flowGeo.setAttribute('position', new THREE.BufferAttribute(flowPos, 3));
    this.flowParticles = new THREE.Points(flowGeo, new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.12,
      transparent: true,
      opacity: 0.5
    }));
    this.rootObject.add(this.flowParticles);
  }

  update(delta, elapsed) {
    // Morula rotation
    if (this.morulaGroup) {
      this.morulaGroup.rotation.y = elapsed * 0.15;
      this.morulaGroup.rotation.x = Math.sin(elapsed * 0.1) * 0.1;
    }

    // Gentle compaction breathing effect
    const compPulse = 1.0 + Math.sin(elapsed * 1.5) * 0.02;
    this.morulaGroup.scale.set(compPulse, compPulse, compPulse);

    // Tubal drift particles
    if (this.flowParticles) {
      const pos = this.flowParticles.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i) - 1.8 * delta;
        if (x < -8) x = 8;
        pos.setX(i, x);
      }
      pos.needsUpdate = true;
    }
  }
}
