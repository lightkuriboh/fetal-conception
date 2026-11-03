/**
 * STAGE 1: Ovarian Ovulation & Follicle Rupture
 * 3D Ovary, bulging Graafian follicle, rupturing oocyte,
 * and waving ciliated fimbriae capturing the egg.
 */

import * as THREE from 'three';

export class StageOvulation {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    this.fimbriaeArms = [];
    this.particles = null;
    
    this.buildScene();
  }

  buildScene() {
    // 1. Ovary Body — Organic oblong shape with bumpy surface
    const ovaryGeo = new THREE.SphereGeometry(4.5, 32, 24);
    ovaryGeo.scale(1.4, 0.9, 0.8);
    
    // Deform vertices for natural organic texture
    const pos = ovaryGeo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getY(i);
      const w = pos.getZ(i);
      const noise = Math.sin(u * 2.5) * Math.cos(v * 2.0) * 0.18;
      pos.setXYZ(i, u + noise, v + noise, w + noise);
    }
    ovaryGeo.computeVertexNormals();
    
    this.ovaryMesh = new THREE.Mesh(ovaryGeo, this.materials.get('ovaryTissue'));
    this.ovaryMesh.position.set(-4.5, 0, 0);
    this.rootObject.add(this.ovaryMesh);

    // 2. Rupturing Graafian Follicle (Blister on ovary)
    const follicleGeo = new THREE.SphereGeometry(1.8, 24, 20);
    this.follicleMesh = new THREE.Mesh(follicleGeo, new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ff85aa'),
      emissive: new THREE.Color('#ff0055'),
      emissiveIntensity: 0.35,
      roughness: 0.2,
      transmission: 0.6,
      transparent: true,
      opacity: 0.75
    }));
    this.follicleMesh.position.set(-2.0, 1.2, 1.2);
    this.rootObject.add(this.follicleMesh);

    // 3. Ejected Secondary Oocyte (Egg) with Corona Radiata & Zona Pellucida
    this.eggGroup = new THREE.Group();
    this.eggGroup.position.set(0.5, 0.8, 1.0);

    // 3A. Central Cytoplasm (Vitellus)
    const eggCoreGeo = new THREE.SphereGeometry(1.0, 32, 32);
    this.eggCore = new THREE.Mesh(eggCoreGeo, this.materials.get('oocyteCytoplasm'));
    this.eggGroup.add(this.eggCore);

    // 3B. Zona Pellucida Glass-like Shell
    const zonaGeo = new THREE.SphereGeometry(1.35, 32, 32);
    this.zonaMesh = new THREE.Mesh(zonaGeo, this.materials.get('zonaPellucida'));
    this.eggGroup.add(this.zonaMesh);

    // 3C. Corona Radiata Follicular Cells (Ring of radiating spheres)
    const coronaCount = 48;
    const coronaGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const coronaMat = this.materials.get('coronaCell');
    
    this.coronaGroup = new THREE.Group();
    for (let i = 0; i < coronaCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / coronaCount);
      const theta = Math.sqrt(coronaCount * Math.PI) * phi;
      const radius = 1.6 + (Math.random() * 0.25);
      
      const sphere = new THREE.Mesh(coronaGeo, coronaMat);
      sphere.position.set(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
      this.coronaGroup.add(sphere);
    }
    this.eggGroup.add(this.coronaGroup);
    this.rootObject.add(this.eggGroup);

    // 4. Fallopian Tube Infundibulum & Ciliated Fimbriae Fringes
    const tubeGeo = new THREE.CylinderGeometry(2.2, 1.4, 6, 24, 1, true);
    tubeGeo.rotateZ(Math.PI * 0.45);
    const tubeMesh = new THREE.Mesh(tubeGeo, this.materials.get('fimbriaeTissue'));
    tubeMesh.position.set(6.5, -0.5, 0);
    this.rootObject.add(tubeMesh);

    // Waving Fimbriae Fingers
    const fimbriaeCount = 9;
    for (let i = 0; i < fimbriaeCount; i++) {
      const angle = (i / fimbriaeCount) * Math.PI * 2;
      const fingerCurve = new THREE.CatmullRomCurve3([
        new THREE.Vector3(4.8, Math.sin(angle) * 2.2, Math.cos(angle) * 2.2),
        new THREE.Vector3(3.4, Math.sin(angle) * 2.6 + Math.cos(i) * 0.4, Math.cos(angle) * 2.6),
        new THREE.Vector3(2.0, Math.sin(angle) * 1.8, Math.cos(angle) * 1.8)
      ]);
      const fingerGeo = new THREE.TubeGeometry(fingerCurve, 16, 0.22, 8, false);
      const fingerMesh = new THREE.Mesh(fingerGeo, this.materials.get('fimbriaeTissue'));
      this.rootObject.add(fingerMesh);
      this.fimbriaeArms.push({ mesh: fingerMesh, baseAngle: angle, idx: i });
    }

    // 5. Follicular Fluid Sparkles (Particulates expelled during burst)
    const pCount = 80;
    const pGeo = new THREE.BufferGeometry();
    const pPos = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount; i++) {
      pPos[i * 3] = -2.0 + (Math.random() - 0.2) * 3.5;
      pPos[i * 3 + 1] = 1.0 + (Math.random() - 0.5) * 2.5;
      pPos[i * 3 + 2] = 1.0 + (Math.random() - 0.5) * 2.5;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    this.particles = new THREE.Points(pGeo, new THREE.PointsMaterial({
      color: new THREE.Color('#fde047'),
      size: 0.12,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    }));
    this.rootObject.add(this.particles);
  }

  update(delta, elapsed) {
    // Gentle floating drift of the ovulated egg towards the fimbriae
    if (this.eggGroup) {
      this.eggGroup.position.y = 0.8 + Math.sin(elapsed * 1.2) * 0.15;
      this.eggGroup.position.x = 0.5 + Math.cos(elapsed * 0.8) * 0.2;
      this.eggGroup.rotation.y = elapsed * 0.15;
    }

    // Undulating fimbriae movement (sweeping current)
    this.fimbriaeArms.forEach((item) => {
      const wave = Math.sin(elapsed * 2.0 + item.idx * 0.7) * 0.08;
      item.mesh.rotation.x = wave;
      item.mesh.rotation.z = Math.cos(elapsed * 1.5 + item.idx) * 0.06;
    });

    // Corona radiata twinkling
    if (this.coronaGroup) {
      this.coronaGroup.rotation.z = elapsed * 0.05;
    }
  }
}
