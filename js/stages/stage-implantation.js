/**
 * STAGE 7: Endometrial Implantation (Days 6–9)
 * Apposition, syncytiotrophoblast invasion of maternal stroma,
 * formation of blood-filled lacunae, and secretion of hCG.
 */

import * as THREE from 'three';

export class StageImplantation {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.lacunaePools = [];
    
    this.buildScene();
  }

  buildScene() {
    // 1. Maternal Endometrial Stroma Wall (Rich, vascular background)
    const wallGeo = new THREE.BoxGeometry(16, 12, 4);
    const wallMesh = new THREE.Mesh(wallGeo, this.materials.get('endometriumWall'));
    wallMesh.position.set(4.5, 0, -1);
    this.rootObject.add(wallMesh);

    // 2. Burrowing Blastocyst Core
    this.embryoGroup = new THREE.Group();
    this.embryoGroup.position.set(-1.0, 0, 0);

    // Cytotrophoblast Ring
    const cytoGeo = new THREE.SphereGeometry(2.0, 24, 24);
    const cytoMesh = new THREE.Mesh(cytoGeo, this.materials.get('trophoblastCell'));
    this.embryoGroup.add(cytoMesh);

    // Bilaminar Disc inside (Epiblast & Hypoblast)
    const epiGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 16);
    const epiMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.5
    });
    const epiMesh = new THREE.Mesh(epiGeo, epiMat);
    epiMesh.position.set(0, 0.15, 0);
    this.embryoGroup.add(epiMesh);

    const hypoGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.2, 16);
    const hypoMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#facc15'),
      emissive: new THREE.Color('#ca8a04'),
      emissiveIntensity: 0.4
    });
    const hypoMesh = new THREE.Mesh(hypoGeo, hypoMat);
    hypoMesh.position.set(0, -0.15, 0);
    this.embryoGroup.add(hypoMesh);

    this.rootObject.add(this.embryoGroup);

    // 3. Invasive Syncytiotrophoblast Fingers (Infiltrating the wall)
    const invasiveMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f43f5e'),
      emissive: new THREE.Color('#be123c'),
      emissiveIntensity: 0.35,
      roughness: 0.4
    });

    for (let i = 0; i < 8; i++) {
      const angle = (i / 8) * Math.PI - Math.PI * 0.5;
      const fingerCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(0.5, Math.sin(angle) * 1.5, Math.cos(angle) * 1.5),
        new THREE.Vector3(2.0, Math.sin(angle) * 2.0, Math.cos(angle) * 2.0),
        new THREE.Vector3(3.2 + Math.random() * 0.8, Math.sin(angle) * 2.5, Math.cos(angle) * 2.5)
      ]);
      const fingerGeo = new THREE.TubeGeometry(fingerCurve, 12, 0.28, 8, false);
      const fingerMesh = new THREE.Mesh(fingerGeo, invasiveMat);
      this.rootObject.add(fingerMesh);
    }

    // 4. Maternal Blood Lacunae Pools (Opening capillaries)
    const lacunaGeo = new THREE.SphereGeometry(0.65, 16, 16);
    lacunaGeo.scale(1.2, 0.8, 0.9);
    const lacunaMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#991b1b'),
      emissive: new THREE.Color('#ef4444'),
      emissiveIntensity: 0.4,
      roughness: 0.25
    });

    for (let i = 0; i < 6; i++) {
      const pool = new THREE.Mesh(lacunaGeo, lacunaMat);
      pool.position.set(
        2.5 + Math.random() * 1.8,
        (Math.random() - 0.5) * 4.0,
        (Math.random() - 0.5) * 2.5
      );
      this.rootObject.add(pool);
      this.lacunaePools.push(pool);
    }

    // 5. Radiant hCG Molecular Signal Aura
    const hcgGeo = new THREE.SphereGeometry(2.8, 24, 24);
    this.hcgAura = new THREE.Mesh(hcgGeo, new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00f0ff'),
      wireframe: true,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending
    }));
    this.hcgAura.position.set(-1.0, 0, 0);
    this.rootObject.add(this.hcgAura);
  }

  update(delta, elapsed) {
    // Pulsing hCG hormonal wave
    if (this.hcgAura) {
      const s = 1.0 + Math.sin(elapsed * 2.5) * 0.12;
      this.hcgAura.scale.set(s, s, s);
      this.hcgAura.rotation.y = elapsed * 0.2;
    }

    // Lacunae gentle perfusion swell
    this.lacunaePools.forEach((pool, idx) => {
      const ps = 1.0 + Math.sin(elapsed * 2.0 + idx) * 0.08;
      pool.scale.set(ps * 1.2, ps * 0.8, ps * 0.9);
    });
  }
}
