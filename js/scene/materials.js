/**
 * THE GENESIS OF LIFE — 3D Materials & Shader Library
 * Custom procedural materials for bio-luminescence, cellular translucency,
 * iridescent zona pellucida, embryonic vascularization, and amniotic membranes.
 */

import * as THREE from 'three';

export class MaterialLibrary {
  constructor() {
    this.materials = new Map();
    this.initCommonMaterials();
  }

  initCommonMaterials() {
    // 1. Oocyte Cytoplasm (Vitellus) — Deep warm golden-amber with bio-translucency
    this.materials.set('oocyteCytoplasm', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffb703'),
      emissive: new THREE.Color('#fb8500'),
      emissiveIntensity: 0.25,
      roughness: 0.35,
      metalness: 0.05,
      clearcoat: 0.4,
      clearcoatRoughness: 0.2,
      transmission: 0.2,
      thickness: 1.2
    }));

    // 2. Zona Pellucida — Translucent, iridescent protective shell
    this.materials.set('zonaPellucida', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#e0f2fe'),
      emissive: new THREE.Color('#38bdf8'),
      emissiveIntensity: 0.15,
      roughness: 0.12,
      metalness: 0.1,
      transmission: 0.82, // Glass-like
      thickness: 1.8,
      ior: 1.34, // Optical index of biological hydration
      transparent: true,
      opacity: 0.75,
      depthWrite: false
    }));

    // 3. Hardened Zona (Post-fertilization block to polyspermy)
    this.materials.set('hardenedZona', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fed7aa'),
      emissive: new THREE.Color('#f59e0b'),
      emissiveIntensity: 0.4,
      roughness: 0.2,
      transmission: 0.65,
      thickness: 2.2,
      transparent: true,
      opacity: 0.88,
      depthWrite: false
    }));

    // 4. Corona Radiata Cells — Shimmering granulosa mantle
    this.materials.set('coronaCell', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fde047'),
      emissive: new THREE.Color('#ca8a04'),
      emissiveIntensity: 0.3,
      roughness: 0.4,
      metalness: 0.1
    }));

    // 5. Sperm Head — Streamlined pearlescent with acrosomal glow
    this.materials.set('spermHead', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f8fafc'),
      emissive: new THREE.Color('#38bdf8'),
      emissiveIntensity: 0.35,
      roughness: 0.25,
      metalness: 0.2
    }));

    // 6. Sperm Tail / Flagellum — Luminous trailing filament
    this.materials.set('spermTail', new THREE.LineBasicMaterial({
      color: new THREE.Color('#38bdf8'),
      transparent: true,
      opacity: 0.85,
      linewidth: 2
    }));

    // 7. Ovary Tissue — Organic velvety peach-pink with vascularity
    this.materials.set('ovaryTissue', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e11d48'),
      roughness: 0.55,
      metalness: 0.05,
      emissive: new THREE.Color('#881337'),
      emissiveIntensity: 0.2
    }));

    // 8. Fallopian Fimbriae & Cilia — Undulating velvet fringes
    this.materials.set('fimbriaeTissue', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f43f5e'),
      roughness: 0.45,
      metalness: 0.05,
      side: THREE.DoubleSide
    }));

    // 9. Endometrial Wall — Lush, vascularized uterine lining
    this.materials.set('endometriumWall', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9f1239'),
      roughness: 0.6,
      metalness: 0.05,
      emissive: new THREE.Color('#4c0519'),
      emissiveIntensity: 0.3
    }));

    // 10. Menstrual Blood / Shedding Fragments
    this.materials.set('mensesBlood', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#881337'),
      emissive: new THREE.Color('#e11d48'),
      emissiveIntensity: 0.35,
      roughness: 0.3,
      transparent: true,
      opacity: 0.85
    }));

    // 11. Morula & Blastomere Cells — Compacting pearlescent cells
    this.materials.set('blastomere', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fef08a'),
      emissive: new THREE.Color('#eab308'),
      emissiveIntensity: 0.2,
      roughness: 0.25,
      transmission: 0.3,
      thickness: 1.0
    }));

    // 12. Inner Cell Mass (ICM) — Pluripotent stem cells
    this.materials.set('innerCellMass', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#00f0ff'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.45,
      roughness: 0.3
    }));

    // 13. Trophoblast Shell — Outer epithelial layer
    this.materials.set('trophoblastCell', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#bfdbfe'),
      emissive: new THREE.Color('#60a5fa'),
      emissiveIntensity: 0.2,
      roughness: 0.3,
      transmission: 0.4,
      transparent: true,
      opacity: 0.7
    }));

    // 14. Beating Heart Tube / Heart Muscle — Deep vascular crimson with pulse
    this.materials.set('heartMuscle', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e11d48'),
      emissive: new THREE.Color('#ff0055'),
      emissiveIntensity: 0.6,
      roughness: 0.3,
      metalness: 0.1
    }));

    // 15. Somites — Segmented mesodermal beads
    this.materials.set('somiteBead', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fed7aa'),
      emissive: new THREE.Color('#f97316'),
      emissiveIntensity: 0.25,
      roughness: 0.4
    }));

    // 16. Neural Tube — Delicate axial spine
    this.materials.set('neuralTube', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#a855f7'),
      emissive: new THREE.Color('#7e22ce'),
      emissiveIntensity: 0.35,
      roughness: 0.35
    }));

    // 17. Retinal Eye Pigment — Dark optic melanin
    this.materials.set('retinalEye', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#09090b'),
      emissive: new THREE.Color('#18181b'),
      emissiveIntensity: 0.1,
      roughness: 0.1,
      metalness: 0.8
    }));

    // 18. Embryo Skin (Week 5–7) — Translucent, luminous organic tissue
    this.materials.set('embryoSkin', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#ffe4e6'),
      emissive: new THREE.Color('#fb7185'),
      emissiveIntensity: 0.2,
      roughness: 0.38,
      metalness: 0.05,
      transmission: 0.35,
      thickness: 1.5,
      clearcoat: 0.25
    }));

    // 19. Transparent Amniotic Sac — Shimmering water bubble
    this.materials.set('amnioticSac', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#cffafe'),
      emissive: new THREE.Color('#38bdf8'),
      emissiveIntensity: 0.12,
      roughness: 0.08,
      metalness: 0.05,
      transmission: 0.92,
      thickness: 0.8,
      transparent: true,
      opacity: 0.45,
      depthWrite: false
    }));

    // 20. Umbilical Cord — Spiral vascular cord
    this.materials.set('umbilicalCord', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f43f5e'),
      emissive: new THREE.Color('#be123c'),
      emissiveIntensity: 0.2,
      roughness: 0.4
    }));

    // 21. Yolk Sac — Spherical nutrient vesicle
    this.materials.set('yolkSac', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fef08a'),
      emissive: new THREE.Color('#eab308'),
      emissiveIntensity: 0.35,
      roughness: 0.3,
      transmission: 0.5,
      transparent: true,
      opacity: 0.8
    }));

    // 22. Penis Shaft & Erectile Tissue
    this.materials.set('penisShaft', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e0838a'),
      emissive: new THREE.Color('#be123c'),
      emissiveIntensity: 0.15,
      roughness: 0.45,
      metalness: 0.05
    }));

    // 23. Glans Penis & Coronal Ridge
    this.materials.set('glansPenis', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f43f5e'),
      emissive: new THREE.Color('#9f1239'),
      emissiveIntensity: 0.2,
      roughness: 0.35,
      clearcoat: 0.3
    }));

    // 24. Penile Urethra Canal
    this.materials.set('penileUrethra', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#38bdf8'),
      emissive: new THREE.Color('#0284c7'),
      emissiveIntensity: 0.4,
      roughness: 0.3
    }));

    // 25. Vas Deferens (Sperm Duct)
    this.materials.set('vasDeferens', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c084fc'),
      emissive: new THREE.Color('#7e22ce'),
      emissiveIntensity: 0.3,
      roughness: 0.4
    }));

    // 26. Testis & Epididymis
    this.materials.set('testis', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#fda4af'),
      emissive: new THREE.Color('#e11d48'),
      emissiveIntensity: 0.15,
      roughness: 0.5
    }));

    // 27. Prostate Gland
    this.materials.set('prostateGland', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#f59e0b'),
      emissive: new THREE.Color('#d97706'),
      emissiveIntensity: 0.25,
      roughness: 0.45
    }));

    // 28. Semen Droplets & Expulsion Jet
    this.materials.set('semenFluid', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f8fafc'),
      emissive: new THREE.Color('#38bdf8'),
      emissiveIntensity: 0.5,
      roughness: 0.1,
      transmission: 0.6,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending
    }));

    // 29. Uterine Cavity Inner Wall
    this.materials.set('uterineCavity', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#be123c'),
      emissive: new THREE.Color('#881337'),
      emissiveIntensity: 0.25,
      roughness: 0.55,
      side: THREE.DoubleSide
    }));

    // 30. Vulva Outer Skin & Mons Pubis / Labia Majora
    this.materials.set('vulvaSkin', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#e0989f'),
      emissive: new THREE.Color('#9f1239'),
      emissiveIntensity: 0.12,
      roughness: 0.55,
      metalness: 0.05
    }));

    // 31. Labia Minora Mucosal Folds
    this.materials.set('labiaMinora', new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#f43f5e'),
      emissive: new THREE.Color('#be123c'),
      emissiveIntensity: 0.2,
      roughness: 0.35,
      clearcoat: 0.25
    }));

    // 32. Clitoris (Glans & Hood)
    this.materials.set('clitoris', new THREE.MeshStandardMaterial({
      color: new THREE.Color('#ff2a70'),
      emissive: new THREE.Color('#e11d48'),
      emissiveIntensity: 0.45,
      roughness: 0.3
    }));
  }

  get(name) {
    if (!this.materials.has(name)) {
      console.warn(`Material '${name}' not found, falling back to default.`);
      return new THREE.MeshStandardMaterial({ color: '#ffffff' });
    }
    return this.materials.get(name);
  }
}
