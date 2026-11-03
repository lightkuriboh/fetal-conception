/**
 * STAGE: Menstruation & Endometrial Reset (Alternate Branch)
 * Degeneration of unfertilized oocyte, corpus albicans scar on ovary,
 * vasoconstriction of spiral arteries, and shedding of stratum functionale menses.
 */

import * as THREE from 'three';

export class StageMenstruation {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.bloodDrops = [];
    
    this.buildScene();
  }

  buildScene() {
    // 1. Ovary with Corpus Albicans (pale fibrous scar)
    const ovaryGeo = new THREE.SphereGeometry(3.5, 24, 20);
    ovaryGeo.scale(1.2, 0.8, 0.7);
    this.ovaryMesh = new THREE.Mesh(ovaryGeo, this.materials.get('ovaryTissue'));
    this.ovaryMesh.position.set(-6.5, 2.5, 0);
    this.rootObject.add(this.ovaryMesh);

    // Pale Corpus Albicans Scar
    const scarGeo = new THREE.SphereGeometry(1.0, 16, 16);
    const scarMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'),
      roughness: 0.8,
      metalness: 0.05
    });
    const scarMesh = new THREE.Mesh(scarGeo, scarMat);
    scarMesh.position.set(-5.5, 3.2, 0.8);
    this.rootObject.add(scarMesh);

    // 2. Degenerating Unfertilized Egg (fragmented & breaking down)
    this.eggDegenerateGroup = new THREE.Group();
    this.eggDegenerateGroup.position.set(-2.5, 2.8, 0.5);

    // Fragmented core pieces
    for (let i = 0; i < 5; i++) {
      const pieceGeo = new THREE.DodecahedronGeometry(0.35, 1);
      const pieceMat = new THREE.MeshStandardMaterial({
        color: new THREE.Color('#94a3b8'),
        emissive: new THREE.Color('#475569'),
        emissiveIntensity: 0.1,
        transparent: true,
        opacity: 0.55
      });
      const piece = new THREE.Mesh(pieceGeo, pieceMat);
      piece.position.set(
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8,
        (Math.random() - 0.5) * 0.8
      );
      this.eggDegenerateGroup.add(piece);
    }
    this.rootObject.add(this.eggDegenerateGroup);

    // 3. Uterine Cavity Cutaway & Shedding Endometrial Wall
    // Uterine outer myometrium muscular frame
    const myometriumGeo = new THREE.CylinderGeometry(5.0, 3.2, 8, 32, 1, true, -Math.PI * 0.5, Math.PI);
    const myometriumMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#be123c'),
      roughness: 0.7,
      side: THREE.DoubleSide
    });
    const myometriumMesh = new THREE.Mesh(myometriumGeo, myometriumMat);
    myometriumMesh.position.set(0.5, 0, 0);
    this.rootObject.add(myometriumMesh);

    // Inner vascular Endometrium with peeling functional layer
    const endometriumGeo = new THREE.CylinderGeometry(4.6, 2.8, 7.6, 32, 1, true, -Math.PI * 0.5, Math.PI);
    const endometriumMesh = new THREE.Mesh(endometriumGeo, this.materials.get('endometriumWall'));
    endometriumMesh.position.set(0.5, 0, 0);
    this.rootObject.add(endometriumMesh);

    // 4. Cascading Menses Blood & Endometrial Tissue Fragments
    const dropCount = 45;
    const dropGeo = new THREE.ConeGeometry(0.16, 0.5, 8);
    dropGeo.rotateX(Math.PI);
    const bloodMat = this.materials.get('mensesBlood');

    for (let i = 0; i < dropCount; i++) {
      const drop = new THREE.Mesh(dropGeo, bloodMat);
      drop.position.set(
        (Math.random() - 0.5) * 4.0 + 0.5,
        Math.random() * 6.0 - 2.0,
        (Math.random() - 0.5) * 2.0
      );
      drop.userData = {
        speed: 1.5 + Math.random() * 2.5,
        initialY: 3.5,
        resetY: -4.5
      };
      this.rootObject.add(drop);
      this.bloodDrops.push(drop);
    }
  }

  update(delta, elapsed) {
    // Animate falling menses drops flowing through uterine cavity & cervix
    this.bloodDrops.forEach((drop) => {
      drop.position.y -= drop.userData.speed * delta;
      if (drop.position.y < drop.userData.resetY) {
        drop.position.y = drop.userData.initialY + (Math.random() * 1.5);
      }
    });

    // Slow disintegration spin of the unfertilized egg
    if (this.eggDegenerateGroup) {
      this.eggDegenerateGroup.rotation.y = elapsed * 0.2;
      this.eggDegenerateGroup.rotation.z = Math.sin(elapsed * 0.5) * 0.1;
    }
  }
}
