/**
 * STAGE 9: Week 4 - Neural Tube Closure & The First Heartbeat
 * C-shaped embryo folding, closed neural tube with somites,
 * and the rhythmic contractions of the primitive tubular heart (~105 BPM).
 */

import * as THREE from 'three';

export class StageWeek4Heartbeat {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.somites = [];
    
    this.buildScene();
  }

  buildScene() {
    this.embryoGroup = new THREE.Group();

    // 1. C-Shaped Embryo Body Axis
    const bodyCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.2, 2.8, 0),    // Cranial head bulge
      new THREE.Vector3(-0.6, 2.2, 0),   // Neck bend
      new THREE.Vector3(-2.2, 0.4, 0),   // Mid-dorsal back
      new THREE.Vector3(-1.8, -1.8, 0),  // Lumbar region
      new THREE.Vector3(0.5, -2.4, 0),   // Caudal tail fold
      new THREE.Vector3(1.4, -1.6, 0)    // Tail tip
    ]);
    const bodyGeo = new THREE.TubeGeometry(bodyCurve, 32, 1.1, 16, false);
    this.bodyMesh = new THREE.Mesh(bodyGeo, this.materials.get('embryoSkin'));
    this.embryoGroup.add(this.bodyMesh);

    // Cranial Head Cap
    const headGeo = new THREE.SphereGeometry(1.3, 24, 24);
    const headMesh = new THREE.Mesh(headGeo, this.materials.get('embryoSkin'));
    headMesh.position.set(1.2, 2.8, 0);
    this.embryoGroup.add(headMesh);

    // 2. Closed Neural Tube along dorsal ridge
    const neuralCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.4, 3.2, 0),
      new THREE.Vector3(-0.8, 2.6, 0),
      new THREE.Vector3(-2.7, 0.4, 0),
      new THREE.Vector3(-2.2, -2.0, 0),
      new THREE.Vector3(0.6, -2.7, 0)
    ]);
    const neuralGeo = new THREE.TubeGeometry(neuralCurve, 32, 0.22, 8, false);
    const neuralMesh = new THREE.Mesh(neuralGeo, this.materials.get('neuralTube'));
    this.embryoGroup.add(neuralMesh);

    // 3. Segmented Somites (Paired mesodermal blocks along spine)
    const somiteGeo = new THREE.SphereGeometry(0.24, 12, 12);
    const somiteMat = this.materials.get('somiteBead');
    const somiteCount = 14;

    for (let i = 0; i < somiteCount; i++) {
      const t = 0.15 + (i / somiteCount) * 0.7;
      const point = neuralCurve.getPoint(t);
      
      // Left somite
      const somL = new THREE.Mesh(somiteGeo, somiteMat);
      somL.position.set(point.x, point.y, point.z + 0.35);
      this.embryoGroup.add(somL);

      // Right somite
      const somR = new THREE.Mesh(somiteGeo, somiteMat);
      somR.position.set(point.x, point.y, point.z - 0.35);
      this.embryoGroup.add(somR);
      
      this.somites.push(somL, somR);
    }

    // 4. Primitive Tubular Heart (Contractile Precordial Bulge)
    const heartCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-0.2, 0.8, 0.3),
      new THREE.Vector3(0.5, 0.4, 0.5),
      new THREE.Vector3(0.3, -0.2, 0.2)
    ]);
    const heartGeo = new THREE.TubeGeometry(heartCurve, 16, 0.55, 16, false);
    this.heartMesh = new THREE.Mesh(heartGeo, this.materials.get('heartMuscle'));
    this.embryoGroup.add(this.heartMesh);

    // Precordial Heart Light
    this.heartLight = new THREE.PointLight('#ff0055', 2.5, 10);
    this.heartLight.position.set(0.3, 0.4, 0.5);
    this.embryoGroup.add(this.heartLight);

    // 5. Yolk Sac & Vitelline Duct
    const yolkGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const yolkMesh = new THREE.Mesh(yolkGeo, this.materials.get('yolkSac'));
    yolkMesh.position.set(2.4, -0.6, 0);
    this.embryoGroup.add(yolkMesh);

    const ductCurve = new THREE.LineCurve3(
      new THREE.Vector3(0.6, -0.4, 0),
      new THREE.Vector3(1.6, -0.6, 0)
    );
    const ductGeo = new THREE.TubeGeometry(ductCurve, 8, 0.2, 8, false);
    const ductMesh = new THREE.Mesh(ductGeo, this.materials.get('embryoSkin'));
    this.embryoGroup.add(ductMesh);

    this.rootObject.add(this.embryoGroup);
  }

  update(delta, elapsed) {
    // 105 BPM Heartbeat rhythm (1.75 Hz)
    const bpm = 105;
    const freq = (bpm / 60) * Math.PI * 2;
    const pulse = Math.sin(elapsed * freq);
    
    // Asymmetric systolic contraction & diastolic recoil
    const heartScale = pulse > 0 ? 1.0 + Math.pow(pulse, 2) * 0.28 : 1.0;
    
    if (this.heartMesh) {
      this.heartMesh.scale.set(heartScale, heartScale, heartScale);
    }
    if (this.heartLight) {
      this.heartLight.intensity = 1.5 + (pulse > 0 ? pulse * 2.5 : 0);
    }

    // Embryo gentle floating sway
    if (this.embryoGroup) {
      this.embryoGroup.rotation.y = Math.sin(elapsed * 0.5) * 0.15;
      this.embryoGroup.position.y = Math.cos(elapsed * 0.8) * 0.1;
    }
  }
}
