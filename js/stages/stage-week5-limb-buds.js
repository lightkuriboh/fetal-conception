/**
 * STAGE 10: Week 5 - Brain Vesicles & Limb Buds
 * Cephalic expansion with 5 secondary brain vesicles,
 * paddle-shaped upper and lower limb buds, and pharyngeal arches.
 */

import * as THREE from 'three';

export class StageWeek5LimbBuds {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    
    this.buildScene();
  }

  buildScene() {
    this.embryoGroup = new THREE.Group();

    // 1. Curved Embryo Body Axis
    const bodyCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.0, 2.2, 0),
      new THREE.Vector3(-0.4, 1.8, 0),
      new THREE.Vector3(-1.8, 0.4, 0),
      new THREE.Vector3(-1.4, -1.6, 0),
      new THREE.Vector3(0.4, -2.2, 0),
      new THREE.Vector3(1.2, -1.5, 0)
    ]);
    const bodyGeo = new THREE.TubeGeometry(bodyCurve, 32, 1.3, 16, false);
    this.bodyMesh = new THREE.Mesh(bodyGeo, this.materials.get('embryoSkin'));
    this.embryoGroup.add(this.bodyMesh);

    // 2. Cephalic Brain Bulges (Large ballooning head)
    // Forebrain (Telencephalon)
    const forebrainGeo = new THREE.SphereGeometry(1.6, 24, 24);
    const forebrainMesh = new THREE.Mesh(forebrainGeo, this.materials.get('embryoSkin'));
    forebrainMesh.position.set(1.4, 3.2, 0);
    this.embryoGroup.add(forebrainMesh);

    // Midbrain (Mesencephalic prominence)
    const midbrainGeo = new THREE.SphereGeometry(1.4, 24, 24);
    const midbrainMesh = new THREE.Mesh(midbrainGeo, this.materials.get('embryoSkin'));
    midbrainMesh.position.set(0.2, 3.6, 0);
    this.embryoGroup.add(midbrainMesh);

    // 3. Pharyngeal (Branchial) Arches along neck
    const archMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fda4af'),
      emissive: new THREE.Color('#f43f5e'),
      emissiveIntensity: 0.2,
      roughness: 0.4
    });
    for (let i = 0; i < 4; i++) {
      const archGeo = new THREE.CapsuleGeometry(0.18, 0.6, 8, 12);
      const arch = new THREE.Mesh(archGeo, archMat);
      arch.position.set(0.6 - i * 0.28, 1.8 - i * 0.28, 0.5);
      arch.rotation.z = Math.PI * 0.25;
      this.embryoGroup.add(arch);
    }

    // 4. Paddle-Shaped Upper Limb Buds (Arm paddles)
    const paddleGeo = new THREE.BoxGeometry(0.85, 0.45, 0.22);
    paddleGeo.translate(0.4, 0, 0);
    const paddleMat = this.materials.get('embryoSkin');

    // Right arm paddle
    this.armRight = new THREE.Mesh(paddleGeo, paddleMat);
    this.armRight.position.set(0.6, 0.3, 0.85);
    this.armRight.rotation.set(0.2, 0.4, -0.3);
    this.embryoGroup.add(this.armRight);

    // Left arm paddle
    this.armLeft = new THREE.Mesh(paddleGeo, paddleMat);
    this.armLeft.position.set(0.6, 0.3, -0.85);
    this.armLeft.rotation.set(-0.2, -0.4, -0.3);
    this.embryoGroup.add(this.armLeft);

    // 5. Emerging Lower Limb Buds (Leg sprouts)
    const legGeo = new THREE.CapsuleGeometry(0.25, 0.5, 8, 12);
    const legRight = new THREE.Mesh(legGeo, paddleMat);
    legRight.position.set(0.2, -1.8, 0.8);
    legRight.rotation.set(0.3, 0.3, 0.4);
    this.embryoGroup.add(legRight);

    const legLeft = new THREE.Mesh(legGeo, paddleMat);
    legLeft.position.set(0.2, -1.8, -0.8);
    legLeft.rotation.set(-0.3, -0.3, 0.4);
    this.embryoGroup.add(legLeft);

    // 6. Precordial Heart Bulge (Beating ~125 BPM)
    const heartGeo = new THREE.SphereGeometry(0.85, 20, 20);
    this.heartMesh = new THREE.Mesh(heartGeo, this.materials.get('heartMuscle'));
    this.heartMesh.position.set(0.4, 0.9, 0.3);
    this.embryoGroup.add(this.heartMesh);

    this.rootObject.add(this.embryoGroup);
  }

  update(delta, elapsed) {
    // 125 BPM Heartbeat
    const bpm = 125;
    const freq = (bpm / 60) * Math.PI * 2;
    const pulse = Math.sin(elapsed * freq);
    const scale = pulse > 0 ? 1.0 + Math.pow(pulse, 2) * 0.22 : 1.0;

    if (this.heartMesh) {
      this.heartMesh.scale.set(scale, scale, scale);
    }

    // Subtle fluttering of upper limb buds
    if (this.armRight) {
      this.armRight.rotation.z = -0.3 + Math.sin(elapsed * 2.0) * 0.08;
    }
    if (this.armLeft) {
      this.armLeft.rotation.z = -0.3 + Math.sin(elapsed * 2.0) * 0.08;
    }

    if (this.embryoGroup) {
      this.embryoGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.12;
    }
  }
}
