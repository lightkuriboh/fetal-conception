/**
 * THE GENESIS OF LIFE — Camera Controller
 * Smooth camera transitions, OrbitControls management, 3D-to-2D screen projections
 * for floating anatomical annotations, and cinematic auto-orbit.
 */

import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

export class CameraController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    
    this.controls = new OrbitControls(this.camera, this.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.minDistance = 3;
    this.controls.maxDistance = 60;
    this.controls.maxPolarAngle = Math.PI * 0.95;
    
    this.isTransitioning = false;
    this.transitionProgress = 1;
    this.transitionDuration = 1.4; // seconds
    
    this.startPos = new THREE.Vector3();
    this.targetPos = new THREE.Vector3();
    this.startLookAt = new THREE.Vector3();
    this.targetLookAt = new THREE.Vector3();
    
    this.autoOrbit = true;
    this.orbitSpeed = 0.003;
    
    // User manual interaction disables auto-orbit temporarily
    this.controls.addEventListener('start', () => {
      this.isUserInteracting = true;
    });
    this.controls.addEventListener('end', () => {
      this.isUserInteracting = false;
    });
    
    this.isUserInteracting = false;
  }

  /**
   * Smoothly transitions camera to a target configuration
   */
  transitionTo(cameraConfig, duration = 1.4) {
    if (!cameraConfig) return;
    
    this.isTransitioning = true;
    this.transitionProgress = 0;
    this.transitionDuration = duration;
    
    this.startPos.copy(this.camera.position);
    this.targetPos.set(cameraConfig.position.x, cameraConfig.position.y, cameraConfig.position.z);
    
    this.startLookAt.copy(this.controls.target);
    this.targetLookAt.set(cameraConfig.target.x, cameraConfig.target.y, cameraConfig.target.z);
    
    if (cameraConfig.fov && this.camera.isPerspectiveCamera) {
      this.targetFov = cameraConfig.fov;
      this.startFov = this.camera.fov;
    } else {
      this.targetFov = null;
    }
  }

  update(delta) {
    if (this.isTransitioning) {
      this.transitionProgress += delta / this.transitionDuration;
      if (this.transitionProgress >= 1) {
        this.transitionProgress = 1;
        this.isTransitioning = false;
      }
      
      // Smooth easeInOutCubic
      const t = this.transitionProgress;
      const ease = t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      this.camera.position.lerpVectors(this.startPos, this.targetPos, ease);
      this.controls.target.lerpVectors(this.startLookAt, this.targetLookAt, ease);
      
      if (this.targetFov && this.camera.isPerspectiveCamera) {
        this.camera.fov = THREE.MathUtils.lerp(this.startFov, this.targetFov, ease);
        this.camera.updateProjectionMatrix();
      }
    } else if (this.autoOrbit && !this.isUserInteracting) {
      // Gentle cinematic orbital drift
      const x = this.camera.position.x - this.controls.target.x;
      const z = this.camera.position.z - this.controls.target.z;
      const angle = this.orbitSpeed * delta * 60;
      
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      
      this.camera.position.x = this.controls.target.x + (x * cosA - z * sinA);
      this.camera.position.z = this.controls.target.z + (x * sinA + z * cosA);
    }
    
    this.controls.update();
  }

  /**
   * Projects a 3D coordinate in world space onto 2D screen pixels
   */
  projectToScreen(position3D, containerWidth, containerHeight) {
    const v = new THREE.Vector3(position3D[0], position3D[1], position3D[2]);
    v.project(this.camera);
    
    // Check if behind camera
    const isVisible = v.z < 1;
    
    const x = (v.x * 0.5 + 0.5) * containerWidth;
    const y = (-v.y * 0.5 + 0.5) * containerHeight;
    
    return { x, y, isVisible };
  }

  setPerspectiveMode(mode) {
    if (mode === 'macro') {
      const dir = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
      this.transitionTo({
        position: this.controls.target.clone().add(dir.multiplyScalar(8)),
        target: this.controls.target,
        fov: 38
      }, 0.8);
    } else if (mode === 'wide') {
      const dir = new THREE.Vector3().subVectors(this.camera.position, this.controls.target).normalize();
      this.transitionTo({
        position: this.controls.target.clone().add(dir.multiplyScalar(28)),
        target: this.controls.target,
        fov: 50
      }, 0.8);
    } else if (mode === 'orbit') {
      this.autoOrbit = !this.autoOrbit;
      return this.autoOrbit;
    }
  }
}
