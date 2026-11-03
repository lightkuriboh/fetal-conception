/**
 * STAGE 3: The Sperm Odyssey
 * Navigating the uterine cavity and fallopian tube,
 * capacitation, hyperactivated motility, and chemotaxis.
 */

import * as THREE from 'three';

export class StageOdyssey {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.spermList = [];
    
    this.buildScene();
  }

  buildScene() {
    // 1. Surrounding Uterine & Tubal Epithelial Fold Tunnel
    const tunnelCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-12, -4, 0),
      new THREE.Vector3(-4, -1, 0),
      new THREE.Vector3(4, 1.5, 0),
      new THREE.Vector3(12, 4, 0)
    ]);
    const tunnelGeo = new THREE.TubeGeometry(tunnelCurve, 32, 5.0, 16, false);
    const tunnelMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#881337'),
      roughness: 0.65,
      side: THREE.BackSide
    });
    const tunnelMesh = new THREE.Mesh(tunnelGeo, tunnelMat);
    this.rootObject.add(tunnelMesh);

    // 2. High-Magnification Detailed 3D Sperm Individuals
    const spermCount = 18;
    for (let i = 0; i < spermCount; i++) {
      const sperm = this.createDetailedSperm(i);
      // Scatter along travel path
      sperm.position.set(
        -8 + Math.random() * 16,
        -2 + Math.random() * 4,
        -2 + Math.random() * 4
      );
      this.rootObject.add(sperm);
      this.spermList.push(sperm);
    }

    // 3. Ambient Microscopic Fluid Particles
    const pCount = 120;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = (Math.random() - 0.5) * 24;
      pPos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pPos[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    const pPoints = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.15,
      transparent: true,
      opacity: 0.4
    }));
    this.rootObject.add(pPoints);
  }

  createDetailedSperm(index) {
    const group = new THREE.Group();

    // A. Sperm Head (Flattened oval)
    const headGeo = new THREE.SphereGeometry(0.35, 16, 16);
    headGeo.scale(1.4, 0.9, 0.6);
    const headMesh = new THREE.Mesh(headGeo, this.materials.get('spermHead'));
    group.add(headMesh);

    // B. Acrosomal Cap (Glowing front tip)
    const capGeo = new THREE.ConeGeometry(0.24, 0.35, 16);
    capGeo.rotateZ(-Math.PI * 0.5);
    const capMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#00f0ff'),
      wireframe: false
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.set(0.35, 0, 0);
    group.add(capMesh);

    // C. Midpiece (Mitochondrial sheath)
    const midGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.45, 12);
    midGeo.rotateZ(Math.PI * 0.5);
    const midMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      emissive: new THREE.Color('#d97706'),
      emissiveIntensity: 0.4
    });
    const midMesh = new THREE.Mesh(midGeo, midMat);
    midMesh.position.set(-0.45, 0, 0);
    group.add(midMesh);

    // D. Flagellum (Tail Line with wave segments)
    const tailSegments = 24;
    const tailPositions = new Float32Array(tailSegments * 3);
    const tailGeo = new THREE.BufferGeometry();
    tailGeo.setAttribute('position', new THREE.BufferAttribute(tailPositions, 3));
    
    const tailLine = new THREE.Line(tailGeo, this.materials.get('spermTail'));
    group.add(tailLine);

    group.userData = {
      index,
      tailSegments,
      tailLine,
      speed: 3.5 + Math.random() * 2.0,
      freq: 8.0 + Math.random() * 4.0, // hyperactivation flagellar frequency
      amp: 0.25 + Math.random() * 0.15
    };

    return group;
  }

  update(delta, elapsed) {
    this.spermList.forEach((sperm) => {
      const data = sperm.userData;
      
      // Move forward along the X axis
      sperm.position.x += data.speed * delta;
      sperm.position.y += Math.sin(elapsed * 2.0 + data.index) * 0.01;
      
      // Wrap around tunnel
      if (sperm.position.x > 11) {
        sperm.position.x = -11;
        sperm.position.y = -2 + Math.random() * 4;
        sperm.position.z = -2 + Math.random() * 4;
      }

      // Animate undulating whip-like sine wave tail
      const tailPos = data.tailLine.geometry.attributes.position;
      const tailLength = 2.8;
      
      for (let i = 0; i < data.tailSegments; i++) {
        const segT = i / data.tailSegments;
        const x = -0.65 - segT * tailLength;
        const wave = Math.sin(elapsed * data.freq - segT * 8.0) * (data.amp * segT * 1.5);
        const waveZ = Math.cos(elapsed * data.freq - segT * 8.0) * (data.amp * segT * 0.6);
        
        tailPos.setXYZ(i, x, wave, waveZ);
      }
      tailPos.needsUpdate = true;
    });
  }
}
