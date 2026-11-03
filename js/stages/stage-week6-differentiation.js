/**
 * STAGE 11: Week 6 - Retinal Pigment & Digital Rays
 * Striking dark retinal eye pigment, digital rays on hand plates,
 * auricular hillocks (ears), and physiological gut herniation.
 */

import * as THREE from 'three';

export class StageWeek6Differentiation {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    
    this.buildScene();
  }

  buildScene() {
    this.embryoGroup = new THREE.Group();

    // 1. Embryo Body & Curved Torso
    const bodyCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(1.2, 2.0, 0),
      new THREE.Vector3(-0.4, 1.6, 0),
      new THREE.Vector3(-1.8, 0.2, 0),
      new THREE.Vector3(-1.2, -1.6, 0),
      new THREE.Vector3(0.5, -2.0, 0),
      new THREE.Vector3(1.2, -1.4, 0)
    ]);
    const bodyGeo = new THREE.TubeGeometry(bodyCurve, 32, 1.45, 16, false);
    this.bodyMesh = new THREE.Mesh(bodyGeo, this.materials.get('embryoSkin'));
    this.embryoGroup.add(this.bodyMesh);

    // Cranial Head Dome
    const headGeo = new THREE.SphereGeometry(1.9, 28, 28);
    headGeo.scale(1.1, 1.25, 1.05);
    const headMesh = new THREE.Mesh(headGeo, this.materials.get('embryoSkin'));
    headMesh.position.set(1.4, 3.4, 0);
    this.embryoGroup.add(headMesh);

    // 2. Eyes with Dark Retinal Pigment Dots
    const eyeGeo = new THREE.SphereGeometry(0.35, 16, 16);
    const eyeMat = this.materials.get('retinalEye');

    // Right Eye
    const eyeRight = new THREE.Mesh(eyeGeo, eyeMat);
    eyeRight.position.set(2.4, 3.3, 0.95);
    this.embryoGroup.add(eyeRight);

    // Left Eye
    const eyeLeft = new THREE.Mesh(eyeGeo, eyeMat);
    eyeLeft.position.set(2.4, 3.3, -0.95);
    this.embryoGroup.add(eyeLeft);

    // 3. Auricular Hillocks (External Ear Knobs)
    const earGeo = new THREE.SphereGeometry(0.25, 12, 12);
    const earMat = this.materials.get('embryoSkin');

    const earRight = new THREE.Mesh(earGeo, earMat);
    earRight.position.set(0.6, 3.1, 1.2);
    this.embryoGroup.add(earRight);

    const earLeft = new THREE.Mesh(earGeo, earMat);
    earLeft.position.set(0.6, 3.1, -1.2);
    this.embryoGroup.add(earLeft);

    // 4. Hand Plates with Digital Rays (Grooves for fingers)
    this.handRight = this.createHandPlateWithRays();
    this.handRight.position.set(1.2, 0.6, 1.1);
    this.handRight.rotation.set(0.2, 0.5, -0.4);
    this.embryoGroup.add(this.handRight);

    this.handLeft = this.createHandPlateWithRays();
    this.handLeft.position.set(1.2, 0.6, -1.1);
    this.handLeft.rotation.set(-0.2, -0.5, -0.4);
    this.embryoGroup.add(this.handLeft);

    // 5. Lower Limbs with Foot Plates
    const legGeo = new THREE.CylinderGeometry(0.3, 0.45, 1.2, 12);
    const footPlateGeo = new THREE.BoxGeometry(0.5, 0.2, 0.7);

    const legR = new THREE.Mesh(legGeo, this.materials.get('embryoSkin'));
    legR.position.set(0.4, -1.6, 0.9);
    legR.rotation.set(0.3, 0.2, 0.5);
    this.embryoGroup.add(legR);

    const footR = new THREE.Mesh(footPlateGeo, this.materials.get('embryoSkin'));
    footR.position.set(0.7, -2.1, 1.1);
    this.embryoGroup.add(footR);

    // 6. Physiological Umbilical Herniation (Intestines into cord)
    const herniaGeo = new THREE.SphereGeometry(0.75, 16, 16);
    herniaGeo.scale(1.2, 0.9, 0.9);
    const herniaMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fb7185'),
      emissive: new THREE.Color('#e11d48'),
      emissiveIntensity: 0.35
    });
    const herniaMesh = new THREE.Mesh(herniaGeo, herniaMat);
    herniaMesh.position.set(0.2, -0.4, 0.75);
    this.embryoGroup.add(herniaMesh);

    // 7. Four-Chambered Beating Heart (~145 BPM)
    const heartGeo = new THREE.SphereGeometry(0.95, 24, 24);
    this.heartMesh = new THREE.Mesh(heartGeo, this.materials.get('heartMuscle'));
    this.heartMesh.position.set(0.5, 1.0, 0.3);
    this.embryoGroup.add(this.heartMesh);

    this.rootObject.add(this.embryoGroup);
  }

  createHandPlateWithRays() {
    const group = new THREE.Group();
    // Arm segment
    const armGeo = new THREE.CylinderGeometry(0.28, 0.35, 1.0, 12);
    armGeo.rotateZ(Math.PI * 0.4);
    const armMesh = new THREE.Mesh(armGeo, this.materials.get('embryoSkin'));
    group.add(armMesh);

    // Hand Plate
    const plateGeo = new THREE.BoxGeometry(0.85, 0.2, 0.75);
    const plateMesh = new THREE.Mesh(plateGeo, this.materials.get('embryoSkin'));
    plateMesh.position.set(0.65, 0, 0);
    group.add(plateMesh);

    // 5 Digital Rays (Ridges)
    const rayMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fed7aa'),
      emissive: new THREE.Color('#f97316'),
      emissiveIntensity: 0.3
    });
    for (let i = 0; i < 5; i++) {
      const zOffset = (i - 2) * 0.14;
      const rayGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.35, 8);
      rayGeo.rotateZ(Math.PI * 0.5);
      const ray = new THREE.Mesh(rayGeo, rayMat);
      ray.position.set(0.85, 0.08, zOffset);
      group.add(ray);
    }

    return group;
  }

  update(delta, elapsed) {
    // 145 BPM Heartbeat (2.42 Hz)
    const bpm = 145;
    const freq = (bpm / 60) * Math.PI * 2;
    const pulse = Math.sin(elapsed * freq);
    const scale = pulse > 0 ? 1.0 + Math.pow(pulse, 2) * 0.24 : 1.0;

    if (this.heartMesh) {
      this.heartMesh.scale.set(scale, scale, scale);
    }

    // Embryo gentle floating sway
    if (this.embryoGroup) {
      this.embryoGroup.rotation.y = Math.sin(elapsed * 0.45) * 0.12;
      this.embryoGroup.position.y = Math.cos(elapsed * 0.6) * 0.08;
    }
  }
}
