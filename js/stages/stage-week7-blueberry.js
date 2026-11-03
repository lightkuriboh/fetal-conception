/**
 * STAGE 12: Week 7 - The Little Human (Embryo Size of a Blueberry)
 * 10-13mm CRL, distinct freed fingers separated by apoptosis, bent elbows,
 * facial features with eyelids, transparent amniotic sac, spiral umbilical cord,
 * and spontaneous micro-movements.
 */

import * as THREE from 'three';

export class StageWeek7Blueberry {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    
    this.buildScene();
  }

  buildScene() {
    // 1. Shimmering, Transparent Amniotic Sac Bubble
    const sacGeo = new THREE.SphereGeometry(5.2, 36, 36);
    sacGeo.scale(1.15, 1.3, 1.05);
    this.amnioticSac = new THREE.Mesh(sacGeo, this.materials.get('amnioticSac'));
    this.rootObject.add(this.amnioticSac);

    // Amniotic Sac internal bio-light
    const sacLight = new THREE.PointLight('#38bdf8', 1.8, 14);
    sacLight.position.set(0, 0, 0);
    this.rootObject.add(sacLight);

    // 2. The Embryo Entity (Floating Weightlessly Inside)
    this.embryoGroup = new THREE.Group();
    this.embryoGroup.position.set(-0.6, -0.5, 0);

    // A. Torso & Abdomen
    const bodyCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.8, 1.8, 0),
      new THREE.Vector3(-0.2, 1.4, 0),
      new THREE.Vector3(-1.4, 0.2, 0),
      new THREE.Vector3(-1.0, -1.4, 0),
      new THREE.Vector3(0.4, -1.8, 0),
      new THREE.Vector3(1.0, -1.2, 0)
    ]);
    const bodyGeo = new THREE.TubeGeometry(bodyCurve, 32, 1.35, 16, false);
    this.bodyMesh = new THREE.Mesh(bodyGeo, this.materials.get('embryoSkin'));
    this.embryoGroup.add(this.bodyMesh);

    // Caudal Tail End Cap
    const tailCapGeo = new THREE.SphereGeometry(1.35, 20, 20);
    const tailCap = new THREE.Mesh(tailCapGeo, this.materials.get('embryoSkin'));
    tailCap.position.set(1.0, -1.2, 0);
    this.embryoGroup.add(tailCap);

    // B. Cranial Head with Defined Jaw & Forehead
    const headGeo = new THREE.SphereGeometry(2.0, 32, 32);
    headGeo.scale(1.05, 1.25, 1.0);
    const headMesh = new THREE.Mesh(headGeo, this.materials.get('embryoSkin'));
    headMesh.position.set(1.1, 3.1, 0);
    this.embryoGroup.add(headMesh);

    // Facial Profile: Nose Tip & Upper Lip
    const noseGeo = new THREE.ConeGeometry(0.25, 0.45, 12);
    noseGeo.rotateZ(-Math.PI * 0.45);
    const noseMesh = new THREE.Mesh(noseGeo, this.materials.get('embryoSkin'));
    noseMesh.position.set(2.35, 2.9, 0);
    this.embryoGroup.add(noseMesh);

    // Eyes with Eyelid Folds & Dark Retinal Pigment
    const eyeMat = this.materials.get('retinalEye');
    const lidMat = this.materials.get('embryoSkin');

    // Right Eye & Lid
    const eyeR = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), eyeMat);
    eyeR.position.set(2.0, 3.2, 1.0);
    this.embryoGroup.add(eyeR);

    const lidR = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.08, 8, 16, Math.PI), lidMat);
    lidR.position.set(2.0, 3.2, 1.05);
    lidR.rotation.x = Math.PI * 0.3;
    this.embryoGroup.add(lidR);

    // Left Eye & Lid
    const eyeL = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), eyeMat);
    eyeL.position.set(2.0, 3.2, -1.0);
    this.embryoGroup.add(eyeL);

    const lidL = new THREE.Mesh(new THREE.TorusGeometry(0.38, 0.08, 8, 16, Math.PI), lidMat);
    lidL.position.set(2.0, 3.2, -1.05);
    lidL.rotation.x = -Math.PI * 0.3;
    this.embryoGroup.add(lidL);

    // External Ear (Auricle)
    const earGeo = new THREE.TorusGeometry(0.42, 0.12, 8, 16, Math.PI * 1.3);
    const earR = new THREE.Mesh(earGeo, lidMat);
    earR.position.set(0.4, 3.0, 1.25);
    earR.rotation.y = Math.PI * 0.4;
    this.embryoGroup.add(earR);

    // C. Upper Limbs with Bent Elbows & Distinct Freed Fingers
    this.armRightGroup = this.createArmWithDistinctFingers(true);
    this.armRightGroup.position.set(0.8, 0.8, 1.1);
    this.embryoGroup.add(this.armRightGroup);

    this.armLeftGroup = this.createArmWithDistinctFingers(false);
    this.armLeftGroup.position.set(0.8, 0.8, -1.1);
    this.embryoGroup.add(this.armLeftGroup);

    // D. Lower Limbs with Separating Toes
    const legGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.3, 12);
    const legR = new THREE.Mesh(legGeo, lidMat);
    legR.position.set(0.2, -1.5, 0.9);
    legR.rotation.set(0.3, 0.2, 0.6);
    this.embryoGroup.add(legR);

    // E. 4-Chambered Precordial Heart Bulge (~155 BPM)
    const heartGeo = new THREE.SphereGeometry(1.0, 24, 24);
    this.heartMesh = new THREE.Mesh(heartGeo, this.materials.get('heartMuscle'));
    this.heartMesh.position.set(0.5, 1.2, 0.25);
    this.embryoGroup.add(this.heartMesh);

    // Precordial Heart Light
    this.heartLight = new THREE.PointLight('#ff0055', 2.8, 10);
    this.heartLight.position.set(0.6, 1.2, 0.5);
    this.embryoGroup.add(this.heartLight);

    // 3. Spiral Umbilical Cord & Placental Connection
    const cordCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.2, -0.4, 0.8),
      new THREE.Vector3(-0.6, -1.2, 2.2),
      new THREE.Vector3(-1.8, -2.4, 3.2),
      new THREE.Vector3(-3.2, -3.4, 4.0)
    ]);
    const cordGeo = new THREE.TubeGeometry(cordCurve, 24, 0.35, 12, false);
    const cordMesh = new THREE.Mesh(cordGeo, this.materials.get('umbilicalCord'));
    this.embryoGroup.add(cordMesh);

    // Developing Placenta Bed with Chorionic Villi (Maternal wall attachment)
    const placentaGeo = new THREE.CylinderGeometry(2.4, 3.2, 0.6, 24);
    const placentaMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#881337'),
      roughness: 0.6
    });
    const placentaMesh = new THREE.Mesh(placentaGeo, placentaMat);
    placentaMesh.position.set(-3.6, -3.8, 4.4);
    placentaMesh.rotation.x = Math.PI * 0.3;
    this.embryoGroup.add(placentaMesh);

    this.rootObject.add(this.embryoGroup);
  }

  createArmWithDistinctFingers(isRight) {
    const group = new THREE.Group();
    const mat = this.materials.get('embryoSkin');

    // Upper Arm
    const upperArmGeo = new THREE.CylinderGeometry(0.28, 0.32, 0.9, 12);
    upperArmGeo.translate(0, -0.4, 0);
    const upperArm = new THREE.Mesh(upperArmGeo, mat);
    upperArm.rotation.z = -Math.PI * 0.25;
    group.add(upperArm);

    // Forearm (bent at elbow toward heart)
    const forearmGeo = new THREE.CylinderGeometry(0.24, 0.28, 0.8, 12);
    forearmGeo.translate(0, -0.35, 0);
    const forearm = new THREE.Mesh(forearmGeo, mat);
    forearm.position.set(0.5, -0.6, isRight ? 0.2 : -0.2);
    forearm.rotation.z = Math.PI * 0.45;
    forearm.rotation.y = isRight ? 0.4 : -0.4;
    group.add(forearm);

    // Palm
    const palmGeo = new THREE.BoxGeometry(0.35, 0.15, 0.4);
    const palm = new THREE.Mesh(palmGeo, mat);
    palm.position.set(0.9, -0.3, isRight ? 0.35 : -0.35);
    group.add(palm);

    // 5 Distinct Fingers (Freed by Apoptosis)
    for (let f = 0; f < 5; f++) {
      const fingerGeo = new THREE.CylinderGeometry(0.04, 0.05, 0.28, 8);
      fingerGeo.rotateZ(Math.PI * 0.5);
      const finger = new THREE.Mesh(fingerGeo, mat);
      const offset = (f - 2) * 0.08;
      finger.position.set(1.1, -0.3 + offset * 0.2, (isRight ? 0.35 : -0.35) + offset);
      group.add(finger);
    }

    return group;
  }

  update(delta, elapsed) {
    // 155 BPM Heartbeat (2.58 Hz)
    const bpm = 155;
    const freq = (bpm / 60) * Math.PI * 2;
    const pulse = Math.sin(elapsed * freq);
    const scale = pulse > 0 ? 1.0 + Math.pow(pulse, 2) * 0.25 : 1.0;

    if (this.heartMesh) {
      this.heartMesh.scale.set(scale, scale, scale);
    }
    if (this.heartLight) {
      this.heartLight.intensity = 2.0 + (pulse > 0 ? pulse * 3.0 : 0);
    }

    // Weightless floating in amniotic fluid (gentle buoyant oscillation)
    if (this.embryoGroup) {
      this.embryoGroup.position.y = -0.2 + Math.sin(elapsed * 0.8) * 0.15;
      this.embryoGroup.position.x = Math.cos(elapsed * 0.6) * 0.12;
      this.embryoGroup.rotation.y = Math.sin(elapsed * 0.4) * 0.18;
      this.embryoGroup.rotation.z = Math.cos(elapsed * 0.3) * 0.08;
    }

    // Spontaneous neuromuscular micro-flutter (early twitches of the arms)
    if (this.armRightGroup) {
      this.armRightGroup.rotation.y = Math.sin(elapsed * 1.8) * 0.06;
    }
    if (this.armLeftGroup) {
      this.armLeftGroup.rotation.y = -Math.sin(elapsed * 1.8) * 0.06;
    }

    // Amniotic sac subtle breathing membrane shimmer
    if (this.amnioticSac) {
      const sacPulse = 1.0 + Math.sin(elapsed * 0.7) * 0.015;
      this.amnioticSac.scale.set(sacPulse * 1.15, sacPulse * 1.3, sacPulse * 1.05);
      this.amnioticSac.rotation.y = elapsed * 0.02;
    }
  }
}
