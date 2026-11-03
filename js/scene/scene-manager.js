/**
 * THE GENESIS OF LIFE — Scene Manager
 * Three.js scene setup, cinematic lighting, floating bio-particulate system,
 * render loop, and stage group management.
 */

import * as THREE from 'three';
import { CameraController } from './camera-controller.js';
import { MaterialLibrary } from './materials.js';

export class SceneManager {
  constructor(canvasContainer) {
    this.container = canvasContainer;
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    
    // Core Three.js instances
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color('#04060d');
    this.scene.fog = new THREE.FogExp2('#04060d', 0.015);
    
    this.camera = new THREE.PerspectiveCamera(45, this.width / this.height, 0.1, 200);
    this.camera.position.set(0, 3, 22);
    
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: 'high-performance',
      alpha: false
    });
    this.renderer.setSize(this.width, this.height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.15;
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.container.appendChild(this.renderer.domElement);
    
    // Camera controller & Material library
    this.cameraController = new CameraController(this.camera, this.renderer.domElement);
    this.materials = new MaterialLibrary();
    
    // Stage groups container
    this.stageGroup = new THREE.Group();
    this.scene.add(this.stageGroup);
    
    // Setup lighting & atmospheric effects
    this.setupLighting();
    this.setupAtmosphericParticles();
    
    // Animation & render loop state
    this.clock = new THREE.Clock();
    this.activeStage = null;
    this.onAnnotationUpdate = null;
    
    // Handle resize
    window.addEventListener('resize', this.onWindowResize.bind(this));
    
    // Start loop
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // 1. Ambient biological fill
    const ambientLight = new THREE.AmbientLight('#1e293b', 1.2);
    this.scene.add(ambientLight);
    
    // 2. Primary directional key light (cool cyan-white)
    const keyLight = new THREE.DirectionalLight('#e0f2fe', 2.2);
    keyLight.position.set(12, 18, 15);
    this.scene.add(keyLight);
    
    // 3. Warm rim backlight for subsurface translucency
    const rimLight = new THREE.DirectionalLight('#ff85aa', 1.8);
    rimLight.position.set(-15, -8, -12);
    this.scene.add(rimLight);
    
    // 4. Center dynamic point light (embryonic heart/core glow)
    this.corePointLight = new THREE.PointLight('#00f0ff', 2.0, 35, 1.5);
    this.corePointLight.position.set(0, 0, 4);
    this.scene.add(this.corePointLight);
  }

  setupAtmosphericParticles() {
    const count = 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 50;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 35;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 50;
      scales[i] = Math.random() * 0.8 + 0.3;
    }
    
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));
    
    const material = new THREE.PointsMaterial({
      color: new THREE.Color('#38bdf8'),
      size: 0.18,
      transparent: true,
      opacity: 0.4,
      blending: THREE.AdditiveBlending
    });
    
    this.particles = new THREE.Points(geometry, material);
    this.scene.add(this.particles);
  }

  /**
   * Sets the active 3D stage object
   */
  setStage(stageInstance, cameraConfig) {
    // Remove previous stage meshes
    while (this.stageGroup.children.length > 0) {
      const child = this.stageGroup.children[0];
      this.stageGroup.remove(child);
      if (child.geometry) child.geometry.dispose();
    }
    
    this.activeStage = stageInstance;
    if (this.activeStage && this.activeStage.rootObject) {
      this.stageGroup.add(this.activeStage.rootObject);
    }
    
    if (cameraConfig) {
      this.cameraController.transitionTo(cameraConfig, 1.2);
    }
  }

  onWindowResize() {
    this.width = this.container.clientWidth || window.innerWidth;
    this.height = this.container.clientHeight || window.innerHeight;
    
    this.camera.aspect = this.width / this.height;
    this.camera.updateProjectionMatrix();
    
    this.renderer.setSize(this.width, this.height);
  }

  animate() {
    requestAnimationFrame(this.animate);
    
    const delta = this.clock.getDelta();
    const elapsedTime = this.clock.getElapsedTime();
    
    // Update camera transitions & orbit
    this.cameraController.update(delta);
    
    // Gently drift atmospheric bio-particles
    if (this.particles) {
      this.particles.rotation.y = elapsedTime * 0.02;
      this.particles.rotation.x = Math.sin(elapsedTime * 0.015) * 0.05;
    }
    
    // Animate current active stage
    if (this.activeStage && typeof this.activeStage.update === 'function') {
      this.activeStage.update(delta, elapsedTime);
    }
    
    // Notify annotation update callback to sync HTML pins with 3D projection
    if (this.onAnnotationUpdate) {
      this.onAnnotationUpdate();
    }
    
    // Render Three.js frame
    this.renderer.render(this.scene, this.camera);
  }
}
