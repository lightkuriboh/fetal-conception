/**
 * STAGE 6: Blastocyst Formation & Zona Hatching (Days 5–6)
 * Cavitation of blastocoel fluid, segregation of Trophoblast and Inner Cell Mass,
 * and the mechanical hatching through the ruptured zona pellucida.
 */

import * as THREE from 'three';

export class StageBlastocyst {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    
    this.buildScene();
  }

  buildScene() {
    // 1. The Blastocyst Body (Emerging)
    this.blastocystGroup = new THREE.Group();
    this.blastocystGroup.position.set(-0.6, 0, 0);

    // A. Outer Trophoblast Ring (Translucent hollow sphere)
    const trophoGeo = new THREE.SphereGeometry(2.5, 32, 32);
    this.trophoblastMesh = new THREE.Mesh(trophoGeo, this.materials.get('trophoblastCell'));
    this.blastocystGroup.add(this.trophoblastMesh);

    // B. Inner Fluid-Filled Blastocoel (Subtle refractive inner sphere)
    const blastocoelGeo = new THREE.SphereGeometry(2.1, 24, 24);
    const blastocoelMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#38bdf8'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.15,
      roughness: 0.1,
      transmission: 0.9,
      transparent: true,
      opacity: 0.4
    });
    const blastocoelMesh = new THREE.Mesh(blastocoelGeo, blastocoelMat);
    blastocoelMesh.position.set(0.2, -0.2, 0);
    this.blastocystGroup.add(blastocoelMesh);

    // C. Inner Cell Mass (ICM / Embryoblast) — Concentrated cluster of pluripotent cells
    this.icmGroup = new THREE.Group();
    this.icmGroup.position.set(-0.8, 1.2, 0);

    const icmCellGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const icmMat = this.materials.get('innerCellMass');
    for (let i = 0; i < 22; i++) {
      const cell = new THREE.Mesh(icmCellGeo, icmMat);
      cell.position.set(
        (Math.random() - 0.5) * 1.1,
        (Math.random() - 0.5) * 0.9,
        (Math.random() - 0.5) * 1.1
      );
      this.icmGroup.add(cell);
    }
    this.blastocystGroup.add(this.icmGroup);
    this.rootObject.add(this.blastocystGroup);

    // 2. Ruptured Zona Pellucida Shell (Hatching out)
    // Modeled as a cracked partial sphere on the right
    const crackedZonaGeo = new THREE.SphereGeometry(2.9, 32, 24, 0, Math.PI * 1.55, 0, Math.PI);
    this.crackedZonaMesh = new THREE.Mesh(crackedZonaGeo, this.materials.get('zonaPellucida'));
    this.crackedZonaMesh.position.set(1.4, 0, 0);
    this.rootObject.add(this.crackedZonaMesh);
  }

  update(delta, elapsed) {
    // Blastocyst hatching squeeze movement
    const squeeze = Math.sin(elapsed * 1.2) * 0.15;
    this.blastocystGroup.position.x = -0.6 + squeeze;
    
    // Rhythmic blastocyst expansion pulsation
    const p = 1.0 + Math.sin(elapsed * 2.0) * 0.03;
    this.blastocystGroup.scale.set(p * 1.05, p * 0.96, p);

    // Subtle ICM internal shimmer
    if (this.icmGroup) {
      this.icmGroup.rotation.y = elapsed * 0.1;
    }
  }
}
