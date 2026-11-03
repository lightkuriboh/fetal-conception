/**
 * STAGE 4: Meeting & The Miracle of Fertilization
 * Sperm docking, acrosome reaction, golden calcium flash wave,
 * cortical reaction blocking polyspermy, and pronuclear syngamy.
 */

import * as THREE from 'three';

export class StageFertilization {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.swarmingSperm = [];
    this.calciumWaveMesh = null;
    this.calciumWaveProgress = 0;
    
    this.buildScene();
  }

  buildScene() {
    // 1. Central Oocyte Vitellus Cytoplasm
    const eggGeo = new THREE.SphereGeometry(2.4, 36, 36);
    this.eggMesh = new THREE.Mesh(eggGeo, this.materials.get('oocyteCytoplasm'));
    this.rootObject.add(this.eggMesh);

    // 2. Translucent Zona Pellucida
    const zonaGeo = new THREE.SphereGeometry(3.0, 36, 36);
    this.zonaMesh = new THREE.Mesh(zonaGeo, this.materials.get('zonaPellucida'));
    this.rootObject.add(this.zonaMesh);

    // 3. Second Polar Body (small sphere in perivitelline space)
    const polarGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const polarMesh = new THREE.Mesh(polarGeo, new THREE.MeshStandardMaterial({
      color: new THREE.Color('#cbd5e1'),
      emissive: new THREE.Color('#64748b'),
      emissiveIntensity: 0.2
    }));
    polarMesh.position.set(-2.2, -1.5, 0.4);
    this.rootObject.add(polarMesh);

    // 4. Male & Female Pronuclei inside Cytoplasm
    this.malePronucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 20, 20),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#38bdf8'),
        emissive: new THREE.Color('#0284c7'),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.85
      })
    );
    this.malePronucleus.position.set(1.2, 0.8, 0);
    this.rootObject.add(this.malePronucleus);

    this.femalePronucleus = new THREE.Mesh(
      new THREE.SphereGeometry(0.55, 20, 20),
      new THREE.MeshStandardMaterial({
        color: new THREE.Color('#fb7185'),
        emissive: new THREE.Color('#e11d48'),
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.85
      })
    );
    this.femalePronucleus.position.set(-0.8, -0.4, 0);
    this.rootObject.add(this.femalePronucleus);

    // 5. The Winning Sperm Penetrating the Zona
    this.winningSperm = this.createSpermModel(true);
    this.winningSperm.position.set(2.4, 1.4, 0.5);
    this.winningSperm.rotation.z = -Math.PI * 0.7;
    this.rootObject.add(this.winningSperm);

    // 6. Swarming Outside Sperm (attempting docking)
    const outsideCount = 14;
    for (let i = 0; i < outsideCount; i++) {
      const sp = this.createSpermModel(false);
      const angle = (i / outsideCount) * Math.PI * 2;
      const r = 3.6 + Math.random() * 1.5;
      sp.position.set(
        Math.cos(angle) * r,
        Math.sin(angle) * r,
        (Math.random() - 0.5) * 2.5
      );
      sp.lookAt(0, 0, 0);
      sp.rotateY(Math.PI);
      this.rootObject.add(sp);
      this.swarmingSperm.push({ mesh: sp, baseR: r, angle });
    }

    // 7. Radiant Calcium Wave Flash Ring/Sphere
    const waveGeo = new THREE.SphereGeometry(3.05, 32, 32);
    this.calciumWaveMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00f0ff'),
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      wireframe: true
    });
    this.calciumWaveMesh = new THREE.Mesh(waveGeo, this.calciumWaveMat);
    this.rootObject.add(this.calciumWaveMesh);
  }

  createSpermModel(isWinner) {
    const group = new THREE.Group();
    const head = new THREE.Mesh(
      new THREE.SphereGeometry(0.25, 12, 12),
      this.materials.get(isWinner ? 'spermHead' : 'spermHead')
    );
    head.scale.set(1.4, 0.8, 0.6);
    group.add(head);

    // Tail
    const tailSegs = 16;
    const tailPos = new Float32Array(tailSegs * 3);
    const tailGeo = new THREE.BufferGeometry();
    tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPos, 3));
    const tailLine = new THREE.Line(tailGeo, this.materials.get('spermTail'));
    group.add(tailLine);

    group.userData = { tailLine, tailSegs, isWinner };
    return group;
  }

  update(delta, elapsed) {
    // 1. Animate pronuclei migrating to center to unite
    const mergeProgress = (Math.sin(elapsed * 0.8) + 1) * 0.5;
    this.malePronucleus.position.x = THREE.MathUtils.lerp(1.2, 0.25, mergeProgress);
    this.malePronucleus.position.y = THREE.MathUtils.lerp(0.8, 0.1, mergeProgress);

    this.femalePronucleus.position.x = THREE.MathUtils.lerp(-0.8, -0.25, mergeProgress);
    this.femalePronucleus.position.y = THREE.MathUtils.lerp(-0.4, -0.1, mergeProgress);

    // 2. Animate Calcium Wave pulsating expansion
    if (this.calciumWaveMesh) {
      const waveScale = 1.0 + ((elapsed * 1.5) % 1.0) * 0.35;
      this.calciumWaveMesh.scale.set(waveScale, waveScale, waveScale);
      this.calciumWaveMat.opacity = Math.max(0, 0.8 - ((elapsed * 1.5) % 1.0) * 0.9);
      this.calciumWaveMesh.rotation.y = elapsed * 0.5;
    }

    // 3. Tail whipping for all sperm
    [this.winningSperm, ...this.swarmingSperm.map(s => s.mesh)].forEach((sperm, idx) => {
      const data = sperm.userData;
      if (!data || !data.tailLine) return;
      
      const tailPos = data.tailLine.geometry.attributes.position;
      for (let i = 0; i < data.tailSegs; i++) {
        const segT = i / data.tailSegs;
        const x = -0.35 - segT * 1.8;
        const wave = Math.sin(elapsed * 14.0 - segT * 7.0 + idx) * (0.2 * segT);
        tailPos.setXYZ(i, x, wave, 0);
      }
      tailPos.needsUpdate = true;
    });

    // 4. Subtle rotation of the egg
    if (this.eggMesh) {
      this.eggMesh.rotation.y = elapsed * 0.04;
    }
  }
}
