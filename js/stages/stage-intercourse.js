/**
 * STAGE 2: Sexual Intercourse, Ejaculation & Sperm Entry
 * Complete medical anatomical model of interacting body parts:
 * 1. Female Vulva (Mons Pubis, Clitoris & Prepuce, Labia Majora & Minora, Vaginal Introitus Opening).
 * 2. Female Internal Tract (Vaginal Canal, Cervix with External Os, Posterior Fornix, Uterus).
 * 3. Male Anatomy (Accurate Penis Shaft with Corpora Cavernosa, Glans & Coronal Ridge, Penile Urethra).
 * 4. Paired Testicles (Both Left and Right Testes, Epididymides, and Paired Vasa Deferentia).
 * 5. Ejaculation Jet & active sperm entering the female system through the external cervical os.
 */

import * as THREE from 'three';

export class StageIntercourse {
  constructor(materials) {
    this.materials = materials;
    this.rootObject = new THREE.Group();
    
    // Animation components
    this.penisGroup = new THREE.Group();
    this.vasSpermParticlesR = null;
    this.vasSpermParticlesL = null;
    this.ejaculationJets = [];
    this.cervicalSpermStream = null;
    this.cervicalSpeeds = [];
    
    this.buildScene();
  }

  buildScene() {
    this.sceneContainer = new THREE.Group();
    this.sceneContainer.position.set(0, 0, 0);

    // =========================================================================
    // 1. FEMALE ANATOMY: VULVA & INTERNAL PELVIC TRACT
    // =========================================================================
    this.femaleGroup = new THREE.Group();

    // -------------------------------------------------------------------------
    // A. EXTERNAL FEMALE GENITALIA (VULVA REGION)
    // -------------------------------------------------------------------------
    this.vulvaGroup = new THREE.Group();
    this.vulvaGroup.position.set(-4.5, -2.5, 0);

    // Mons Pubis (Superior fatty mound)
    const monsGeo = new THREE.SphereGeometry(1.6, 24, 20);
    monsGeo.scale(1.3, 0.7, 1.2);
    const monsMesh = new THREE.Mesh(monsGeo, this.materials.get('vulvaSkin'));
    monsMesh.position.set(-0.2, 1.6, 0);
    this.vulvaGroup.add(monsMesh);

    // Clitoris & Prepuce (Glans clitoridis at anterior junction)
    const clitorisGeo = new THREE.SphereGeometry(0.32, 16, 16);
    const clitorisMesh = new THREE.Mesh(clitorisGeo, this.materials.get('clitoris'));
    clitorisMesh.position.set(0.6, 1.1, 0);
    this.vulvaGroup.add(clitorisMesh);

    // Clitoral Hood (Prepuce fold)
    const hoodGeo = new THREE.TorusGeometry(0.38, 0.12, 8, 16, Math.PI);
    const hoodMesh = new THREE.Mesh(hoodGeo, this.materials.get('labiaMinora'));
    hoodMesh.position.set(0.55, 1.15, 0);
    hoodMesh.rotation.y = Math.PI * 0.5;
    this.vulvaGroup.add(hoodMesh);

    // Labia Majora (Paired outer longitudinal fleshy folds)
    const majoraGeo = new THREE.CylinderGeometry(0.55, 0.45, 3.8, 16);
    const majoraR = new THREE.Mesh(majoraGeo, this.materials.get('vulvaSkin'));
    majoraR.position.set(0.2, -0.2, 1.45);
    majoraR.rotation.x = 0.25;
    this.vulvaGroup.add(majoraR);

    const majoraL = new THREE.Mesh(majoraGeo, this.materials.get('vulvaSkin'));
    majoraL.position.set(0.2, -0.2, -1.45);
    majoraL.rotation.x = -0.25;
    this.vulvaGroup.add(majoraL);

    // Labia Minora (Paired inner delicate mucosal folds)
    const minoraCurveR = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 0.9, 0.2),
      new THREE.Vector3(0.6, 0.0, 0.9),
      new THREE.Vector3(0.3, -1.4, 0.3)
    ]);
    const minoraGeoR = new THREE.TubeGeometry(minoraCurveR, 16, 0.22, 12, false);
    const minoraMeshR = new THREE.Mesh(minoraGeoR, this.materials.get('labiaMinora'));
    this.vulvaGroup.add(minoraMeshR);

    const minoraCurveL = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.5, 0.9, -0.2),
      new THREE.Vector3(0.6, 0.0, -0.9),
      new THREE.Vector3(0.3, -1.4, -0.3)
    ]);
    const minoraGeoL = new THREE.TubeGeometry(minoraCurveL, 16, 0.22, 12, false);
    const minoraMeshL = new THREE.Mesh(minoraGeoL, this.materials.get('labiaMinora'));
    this.vulvaGroup.add(minoraMeshL);

    // Vaginal Introitus (The Anatomical Opening)
    const introitusTorus = new THREE.TorusGeometry(1.2, 0.28, 12, 24);
    introitusTorus.rotateY(Math.PI * 0.45);
    const introitusMesh = new THREE.Mesh(introitusTorus, this.materials.get('labiaMinora'));
    introitusMesh.position.set(0.4, -0.2, 0);
    this.vulvaGroup.add(introitusMesh);

    this.femaleGroup.add(this.vulvaGroup);

    // -------------------------------------------------------------------------
    // B. INTERNAL FEMALE TRACT (Vagina, Cervix, Uterus)
    // -------------------------------------------------------------------------
    // Vaginal Canal Cutaway (Extending from Introitus deep to Cervix)
    const vaginaCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-4.2, -2.6, 0),
      new THREE.Vector3(-1.0, -1.2, 0),
      new THREE.Vector3(2.5, 0.2, 0)
    ]);
    const vaginaGeo = new THREE.TubeGeometry(vaginaCurve, 32, 2.3, 24, false);
    const vaginaMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9f1239'),
      emissive: new THREE.Color('#4c0519'),
      emissiveIntensity: 0.35,
      roughness: 0.65,
      side: THREE.BackSide
    });
    this.vaginaMesh = new THREE.Mesh(vaginaGeo, vaginaMat);
    this.femaleGroup.add(this.vaginaMesh);

    // Cervix Protrusion at Apex
    const cervixGeo = new THREE.TorusGeometry(1.4, 0.65, 16, 32);
    const cervixMesh = new THREE.Mesh(cervixGeo, this.materials.get('glansPenis'));
    cervixMesh.position.set(2.8, 0.4, 0);
    cervixMesh.rotation.y = Math.PI * 0.45;
    this.femaleGroup.add(cervixMesh);

    // External Cervical Os (Center orifice)
    const osGeo = new THREE.CylinderGeometry(0.35, 0.35, 1.6, 16);
    osGeo.rotateZ(Math.PI * 0.5);
    const osMesh = new THREE.Mesh(osGeo, new THREE.MeshBasicMaterial({ color: '#1e1b4b' }));
    osMesh.position.set(3.0, 0.4, 0);
    this.femaleGroup.add(osMesh);

    // Posterior Fornix Semen Pool
    const poolGeo = new THREE.SphereGeometry(1.2, 16, 16);
    poolGeo.scale(1.4, 0.5, 1.0);
    this.semenPoolMesh = new THREE.Mesh(poolGeo, this.materials.get('semenFluid'));
    this.semenPoolMesh.position.set(2.4, -0.7, 0);
    this.femaleGroup.add(this.semenPoolMesh);

    // Uterine Cavity leading to Fallopian Ostia
    const uterusCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(3.2, 0.5, 0),
      new THREE.Vector3(5.5, 1.8, 0),
      new THREE.Vector3(7.5, 3.2, 0)
    ]);
    const uterusGeo = new THREE.TubeGeometry(uterusCurve, 24, 2.0, 16, false);
    const uterusMesh = new THREE.Mesh(uterusGeo, this.materials.get('uterineCavity'));
    this.femaleGroup.add(uterusMesh);

    const fundusGeo = new THREE.SphereGeometry(2.4, 24, 24);
    fundusGeo.scale(1.1, 0.85, 0.9);
    const fundusMesh = new THREE.Mesh(fundusGeo, this.materials.get('uterineCavity'));
    fundusMesh.position.set(7.6, 3.4, 0);
    this.femaleGroup.add(fundusMesh);

    // Bilateral Fallopian Tube branches
    const tubeL = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 4.0, 12), this.materials.get('fimbriaeTissue'));
    tubeL.position.set(8.5, 4.8, 1.5);
    tubeL.rotation.set(0.5, 0.2, -0.6);
    this.femaleGroup.add(tubeL);

    const tubeR = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.25, 4.0, 12), this.materials.get('fimbriaeTissue'));
    tubeR.position.set(8.5, 4.8, -1.5);
    tubeR.rotation.set(-0.5, -0.2, -0.6);
    this.femaleGroup.add(tubeR);

    this.sceneContainer.add(this.femaleGroup);

    // =========================================================================
    // 2. MALE ANATOMY: MEDICAL MODEL PENIS & PAIRED TESTICLES
    // =========================================================================
    // A. MEDICAL ACCURATE ERECT PENIS MODEL
    // Composed of:
    // 1. Paired dorsal Corpora Cavernosa (bilateral cylindrical columns)
    // 2. Ventral Corpus Spongiosum carrying the Penile Urethra
    // 3. Flared Coronal Ridge (Corona Glandis) & Coronal Sulcus
    // 4. Conical Glans Penis with vertical slit urethral meatus
    this.erectPenis = new THREE.Group();

    // Dorsal Corpora Cavernosa (Right Column)
    const cavernosaGeoR = new THREE.CylinderGeometry(0.68, 0.72, 7.2, 16);
    cavernosaGeoR.rotateZ(Math.PI * 0.44);
    const cavernosaR = new THREE.Mesh(cavernosaGeoR, this.materials.get('penisShaft'));
    cavernosaR.position.set(-2.0, -1.4, 0.42);
    this.erectPenis.add(cavernosaR);

    // Dorsal Corpora Cavernosa (Left Column)
    const cavernosaGeoL = new THREE.CylinderGeometry(0.68, 0.72, 7.2, 16);
    cavernosaGeoL.rotateZ(Math.PI * 0.44);
    const cavernosaL = new THREE.Mesh(cavernosaGeoL, this.materials.get('penisShaft'));
    cavernosaL.position.set(-2.0, -1.4, -0.42);
    this.erectPenis.add(cavernosaL);

    // Ventral Corpus Spongiosum (Medial column along underside)
    const spongiosumGeo = new THREE.CylinderGeometry(0.52, 0.58, 7.3, 16);
    spongiosumGeo.rotateZ(Math.PI * 0.44);
    const spongiosum = new THREE.Mesh(spongiosumGeo, this.materials.get('penisShaft'));
    spongiosum.position.set(-2.05, -1.75, 0);
    this.erectPenis.add(spongiosum);

    // Corona Glandis / Coronal Ridge (The prominent flared mushroom collar)
    const coronaGeo = new THREE.TorusGeometry(1.22, 0.28, 12, 28);
    coronaGeo.rotateY(Math.PI * 0.44);
    const coronaMesh = new THREE.Mesh(coronaGeo, this.materials.get('glansPenis'));
    coronaMesh.position.set(0.9, -0.22, 0);
    this.erectPenis.add(coronaMesh);

    // Anatomical Glans Penis (Acorn shape overhanging coronal sulcus)
    const glansGeo = new THREE.ConeGeometry(1.24, 2.0, 24);
    glansGeo.rotateZ(-Math.PI * 0.56);
    this.glansMesh = new THREE.Mesh(glansGeo, this.materials.get('glansPenis'));
    this.glansMesh.position.set(1.5, 0.08, 0);
    this.erectPenis.add(this.glansMesh);

    // Vertical Slit External Urethral Meatus
    const meatusGeo = new THREE.BoxGeometry(0.08, 0.45, 0.12);
    meatusGeo.rotateZ(-Math.PI * 0.12);
    const meatusMesh = new THREE.Mesh(meatusGeo, new THREE.MeshBasicMaterial({ color: '#881337' }));
    meatusMesh.position.set(2.45, 0.48, 0);
    this.erectPenis.add(meatusMesh);

    // Penile Urethra Tube inside Corpus Spongiosum
    const urethraCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-5.8, -3.1, 0),
      new THREE.Vector3(-2.1, -1.65, 0),
      new THREE.Vector3(2.4, 0.45, 0)
    ]);
    const urethraGeo = new THREE.TubeGeometry(urethraCurve, 24, 0.16, 8, false);
    this.urethraMesh = new THREE.Mesh(urethraGeo, this.materials.get('penileUrethra'));
    this.erectPenis.add(this.urethraMesh);

    this.penisGroup.add(this.erectPenis);
    this.sceneContainer.add(this.penisGroup);

    // -------------------------------------------------------------------------
    // B. PAIRED TESTICLES (BOTH LEFT & RIGHT TESTES) IN SCROTUM
    // -------------------------------------------------------------------------
    this.scrotumGroup = new THREE.Group();
    this.scrotumGroup.position.set(-7.5, -4.8, 0);

    const testisMat = this.materials.get('testis');
    const vasMat = this.materials.get('vasDeferens');

    // 1. Right Testis (Anatomically slightly higher)
    const testisGeoR = new THREE.SphereGeometry(1.15, 20, 20);
    testisGeoR.scale(1.18, 0.88, 0.82);
    const testisMeshR = new THREE.Mesh(testisGeoR, testisMat);
    testisMeshR.position.set(0, 0.25, 0.95);
    testisMeshR.rotation.set(0.1, 0.15, -0.2);
    this.scrotumGroup.add(testisMeshR);

    // Right Epididymis (Crescent along posterolateral border)
    const epiGeoR = new THREE.TorusGeometry(1.0, 0.24, 8, 20, Math.PI * 1.15);
    const epiMeshR = new THREE.Mesh(epiGeoR, vasMat);
    epiMeshR.position.set(-0.15, 0.4, 1.4);
    epiMeshR.rotation.set(0.3, 0.2, -0.4);
    this.scrotumGroup.add(epiMeshR);

    // 2. Left Testis (Anatomically slightly lower)
    const testisGeoL = new THREE.SphereGeometry(1.15, 20, 20);
    testisGeoL.scale(1.18, 0.88, 0.82);
    const testisMeshL = new THREE.Mesh(testisGeoL, testisMat);
    testisMeshL.position.set(-0.1, -0.2, -0.95);
    testisMeshL.rotation.set(-0.1, -0.15, -0.2);
    this.scrotumGroup.add(testisMeshL);

    // Left Epididymis
    const epiGeoL = new THREE.TorusGeometry(1.0, 0.24, 8, 20, Math.PI * 1.15);
    const epiMeshL = new THREE.Mesh(epiGeoL, vasMat);
    epiMeshL.position.set(-0.25, -0.05, -1.4);
    epiMeshL.rotation.set(-0.3, -0.2, -0.4);
    this.scrotumGroup.add(epiMeshL);

    this.sceneContainer.add(this.scrotumGroup);

    // -------------------------------------------------------------------------
    // C. PAIRED VASA DEFERENTIA (Ascending from each testicle)
    // -------------------------------------------------------------------------
    // Right Vas Deferens Curve
    const vasCurveR = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7.5, -4.3, 1.1),
      new THREE.Vector3(-8.3, -2.0, 1.3),
      new THREE.Vector3(-7.0, 0.8, 0.9),
      new THREE.Vector3(-5.2, 0.5, 0.4),
      new THREE.Vector3(-4.8, -1.2, 0.1) // Joins prostate
    ]);
    const vasGeoR = new THREE.TubeGeometry(vasCurveR, 32, 0.14, 8, false);
    const vasMeshR = new THREE.Mesh(vasGeoR, vasMat);
    this.sceneContainer.add(vasMeshR);

    // Left Vas Deferens Curve
    const vasCurveL = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-7.6, -4.8, -1.1),
      new THREE.Vector3(-8.3, -2.3, -1.3),
      new THREE.Vector3(-7.0, 0.6, -0.9),
      new THREE.Vector3(-5.2, 0.4, -0.4),
      new THREE.Vector3(-4.8, -1.2, -0.1)
    ]);
    const vasGeoL = new THREE.TubeGeometry(vasCurveL, 32, 0.14, 8, false);
    const vasMeshL = new THREE.Mesh(vasGeoL, vasMat);
    this.sceneContainer.add(vasMeshL);

    // Prostate Gland & Seminal Vesicles at Junction
    const prostateGeo = new THREE.SphereGeometry(1.15, 16, 16);
    prostateGeo.scale(1.2, 0.85, 1.0);
    const prostateMesh = new THREE.Mesh(prostateGeo, this.materials.get('prostateGland'));
    prostateMesh.position.set(-5.0, -1.3, 0);
    this.sceneContainer.add(prostateMesh);

    // Seminal Vesicle Wings
    const vesGeo = new THREE.CylinderGeometry(0.35, 0.25, 1.8, 12);
    const vesR = new THREE.Mesh(vesGeo, this.materials.get('prostateGland'));
    vesR.position.set(-5.6, -0.4, 0.7);
    vesR.rotation.set(0.4, 0.2, 0.5);
    this.sceneContainer.add(vesR);

    const vesL = new THREE.Mesh(vesGeo, this.materials.get('prostateGland'));
    vesL.position.set(-5.6, -0.4, -0.7);
    vesL.rotation.set(-0.4, -0.2, 0.5);
    this.sceneContainer.add(vesL);

    // =========================================================================
    // 3. DYNAMIC SPERM PROPULSION & EJACULATION SIMULATION
    // =========================================================================
    // A. Bilateral Sperm Transit in Vasa Deferentia (Emission)
    const vasPCount = 36;
    const vasGeoPtsR = new THREE.BufferGeometry();
    const vasGeoPtsL = new THREE.BufferGeometry();
    const posR = new Float32Array(vasPCount * 3);
    const posL = new Float32Array(vasPCount * 3);
    this.vasPointsTR = [];
    this.vasPointsTL = [];

    for (let i = 0; i < vasPCount; i++) {
      const t = Math.random();
      const pR = vasCurveR.getPoint(t);
      const pL = vasCurveL.getPoint(t);
      
      posR[i * 3] = pR.x;
      posR[i * 3 + 1] = pR.y;
      posR[i * 3 + 2] = pR.z;

      posL[i * 3] = pL.x;
      posL[i * 3 + 1] = pL.y;
      posL[i * 3 + 2] = pL.z;

      this.vasPointsTR.push(t);
      this.vasPointsTL.push(t);
    }

    const vasMatParticles = new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.18,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    });

    vasGeoPtsR.setAttribute('position', new THREE.BufferAttribute(posR, 3));
    this.vasSpermParticlesR = new THREE.Points(vasGeoPtsR, vasMatParticles);
    this.vasCurveRefR = vasCurveR;
    this.sceneContainer.add(this.vasSpermParticlesR);

    vasGeoPtsL.setAttribute('position', new THREE.BufferAttribute(posL, 3));
    this.vasSpermParticlesL = new THREE.Points(vasGeoPtsL, vasMatParticles);
    this.vasCurveRefL = vasCurveL;
    this.sceneContainer.add(this.vasSpermParticlesL);

    // B. Pulsatile Ejaculation Semen Jets
    const jetCount = 28;
    const jetDropGeo = new THREE.SphereGeometry(0.18, 12, 12);
    jetDropGeo.scale(2.2, 0.8, 0.8);
    const jetMat = this.materials.get('semenFluid');

    for (let i = 0; i < jetCount; i++) {
      const drop = new THREE.Mesh(jetDropGeo, jetMat);
      drop.position.set(2.4, 0.48, 0);
      drop.userData = {
        speed: 8.5 + Math.random() * 6.0,
        age: (i / jetCount) * 1.5,
        maxLife: 1.2
      };
      this.sceneContainer.add(drop);
      this.ejaculationJets.push(drop);
    }

    // C. Active Sperm Entering Female Reproductive System (Through External Cervical Os)
    const ingressCount = 200;
    const ingressGeo = new THREE.BufferGeometry();
    const ingressPos = new Float32Array(ingressCount * 3);

    for (let i = 0; i < ingressCount; i++) {
      const progress = Math.random();
      const x = 2.4 + progress * 5.6;
      const y = -0.5 + Math.pow(progress, 1.2) * 3.8 + (Math.random() - 0.5) * 0.8;
      const z = (Math.random() - 0.5) * 1.2;

      ingressPos[i * 3] = x;
      ingressPos[i * 3 + 1] = y;
      ingressPos[i * 3 + 2] = z;

      this.cervicalSpeeds.push(2.0 + Math.random() * 2.8);
    }

    ingressGeo.setAttribute('position', new THREE.BufferAttribute(ingressPos, 3));
    this.cervicalSpermStream = new THREE.Points(ingressGeo, new THREE.PointsMaterial({
      color: new THREE.Color('#00f0ff'),
      size: 0.22,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    }));
    this.sceneContainer.add(this.cervicalSpermStream);

    this.rootObject.add(this.sceneContainer);
  }

  update(delta, elapsed) {
    // 1. Natural Coital Intromission Reciprocating Motion
    const strokeFreq = 1.6;
    const strokeAmp = 0.52;
    const strokeOffset = Math.sin(elapsed * strokeFreq) * strokeAmp;

    if (this.penisGroup) {
      this.penisGroup.position.x = strokeOffset * 0.85;
      this.penisGroup.position.y = strokeOffset * 0.35;
    }

    // 2. Bilateral Sperm Transit inside Left & Right Vasa Deferentia
    if (this.vasSpermParticlesR && this.vasCurveRefR) {
      const posR = this.vasSpermParticlesR.geometry.attributes.position;
      for (let i = 0; i < this.vasPointsTR.length; i++) {
        this.vasPointsTR[i] += delta * 0.55;
        if (this.vasPointsTR[i] > 1) this.vasPointsTR[i] = 0;
        const pt = this.vasCurveRefR.getPoint(this.vasPointsTR[i]);
        posR.setXYZ(i, pt.x, pt.y, pt.z);
      }
      posR.needsUpdate = true;
    }

    if (this.vasSpermParticlesL && this.vasCurveRefL) {
      const posL = this.vasSpermParticlesL.geometry.attributes.position;
      for (let i = 0; i < this.vasPointsTL.length; i++) {
        this.vasPointsTL[i] += delta * 0.55;
        if (this.vasPointsTL[i] > 1) this.vasPointsTL[i] = 0;
        const pt = this.vasCurveRefL.getPoint(this.vasPointsTL[i]);
        posL.setXYZ(i, pt.x, pt.y, pt.z);
      }
      posL.needsUpdate = true;
    }

    // 3. Pulsatile Ejaculation Jets (Expelling from meatus into posterior fornix)
    const meatusPos = new THREE.Vector3(2.45 + this.penisGroup.position.x, 0.48 + this.penisGroup.position.y, 0);

    this.ejaculationJets.forEach((drop, idx) => {
      const d = drop.userData;
      d.age += delta;

      if (d.age > d.maxLife) {
        d.age = 0;
        drop.position.copy(meatusPos);
        drop.scale.set(1, 1, 1);
        drop.visible = true;
      } else {
        const progress = d.age / d.maxLife;
        drop.position.x += d.speed * delta * (1.0 - progress * 0.35);
        drop.position.y -= (0.8 + progress * 2.2) * delta;
        drop.position.z += (Math.sin(idx + elapsed * 5.0) * 0.15) * delta;

        if (drop.position.x > 3.6 || drop.position.y < -1.0) {
          drop.scale.multiplyScalar(0.92);
          if (drop.scale.x < 0.2) drop.visible = false;
        }
      }
    });

    // 4. Semen Pool Ripple in Posterior Fornix
    if (this.semenPoolMesh) {
      const pPulse = 1.0 + Math.sin(elapsed * 2.5) * 0.05;
      this.semenPoolMesh.scale.set(pPulse * 1.4, pPulse * 0.5, pPulse * 1.0);
    }

    // 5. Active Sperm Ingress through Cervical Os into Uterine Cavity
    if (this.cervicalSpermStream) {
      const pos = this.cervicalSpermStream.geometry.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        let x = pos.getX(i);
        let y = pos.getY(i);
        let z = pos.getZ(i);

        const speed = this.cervicalSpeeds[i] * delta;
        x += speed * 0.95;
        y += speed * 0.55 + Math.sin(elapsed * 6.0 + i) * 0.02;
        z += Math.cos(elapsed * 6.0 + i) * 0.015;

        if (x > 8.2 || y > 4.5) {
          x = 2.4 + (Math.random() - 0.5) * 0.6;
          y = -0.4 + Math.random() * 0.8;
          z = (Math.random() - 0.5) * 0.8;
        }

        pos.setXYZ(i, x, y, z);
      }
      pos.needsUpdate = true;
    }
  }
}
