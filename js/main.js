/**
 * THE GENESIS OF LIFE — Main Application Orchestrator
 * Coordinates Three.js 3D scenes, Web Audio engine, timeline scrubber,
 * medical info drawer, and user interactions.
 */

import { STAGES_DATA } from './stages/stage-data.js';
import { SceneManager } from './scene/scene-manager.js';
import { SoundEngine } from './audio/sound-effects.js';
import { TimelineController } from './ui/timeline-controller.js';
import { InfoDrawer } from './ui/info-drawer.js';

// Stage Classes
import { StageOvulation } from './stages/stage-ovulation.js';
import { StageMenstruation } from './stages/stage-menstruation.js';
import { StageIntercourse } from './stages/stage-intercourse.js';
import { StageOdyssey } from './stages/stage-odyssey.js';
import { StageFertilization } from './stages/stage-fertilization.js';
import { StageCleavage } from './stages/stage-cleavage.js';
import { StageBlastocyst } from './stages/stage-blastocyst.js';
import { StageImplantation } from './stages/stage-implantation.js';
import { StageWeek3Gastrulation } from './stages/stage-week3-gastrulation.js';
import { StageWeek4Heartbeat } from './stages/stage-week4-heartbeat.js';
import { StageWeek5LimbBuds } from './stages/stage-week5-limb-buds.js';
import { StageWeek6Differentiation } from './stages/stage-week6-differentiation.js';
import { StageWeek7Blueberry } from './stages/stage-week7-blueberry.js';

class App {
  constructor() {
    this.stageInstances = new Map();
    this.currentStage = null;
    
    this.init();
  }

  init() {
    // 1. Initialize 3D Scene Manager
    const container = document.getElementById('webgl-viewport-container');
    this.sceneManager = new SceneManager(container);

    // 2. Initialize Sound Engine
    this.soundEngine = new SoundEngine();

    // 3. Initialize Info Drawer & HUD
    this.infoDrawer = new InfoDrawer((structure) => {
      this.soundEngine.playClick();
      // Camera focus on structure
      this.sceneManager.cameraController.setPerspectiveMode('macro');
    });

    // 4. Hook 3D to 2D annotation projection update on each frame
    this.sceneManager.onAnnotationUpdate = () => {
      this.infoDrawer.syncAnnotations(
        this.sceneManager.cameraController,
        this.sceneManager.width,
        this.sceneManager.height
      );
      this.drawAudioVisualizer();
    };

    // 5. Initialize Timeline Controller
    this.timeline = new TimelineController(STAGES_DATA, (stage, activeIndex, totalStages) => {
      this.loadStage(stage, activeIndex, totalStages);
    });

    // 6. Bind Global HUD Buttons (Audio, Perspective, Help Modal)
    this.bindGlobalControls();

    // 7. Load Initial Stage (Stage 1: Ovulation)
    const activeStages = this.timeline.getFilteredStages();
    this.loadStage(activeStages[0], 0, activeStages.length);
  }

  loadStage(stageData, activeIndex, totalStages) {
    if (!stageData) return;
    this.currentStage = stageData;

    // Sound effects
    this.soundEngine.playTransition();
    if (stageData.id === 'fertilization') {
      setTimeout(() => {
        this.soundEngine.playFertilizationChime();
      }, 800);
    }

    // Set cardiac heartbeat BPM
    this.soundEngine.setHeartbeat(stageData.heartbeatBpm || 0);

    // Instantiate or retrieve cached 3D stage instance
    let stageInstance = this.stageInstances.get(stageData.id);
    if (!stageInstance) {
      stageInstance = this.createStageInstance(stageData.id);
      this.stageInstances.set(stageData.id, stageInstance);
    }

    // Mount 3D scene & smooth transition camera
    this.sceneManager.setStage(stageInstance, stageData.camera);

    // Update Info Drawer & Top HUD
    this.infoDrawer.updateStage(stageData, activeIndex, totalStages);
  }

  createStageInstance(stageId) {
    const mats = this.sceneManager.materials;
    switch (stageId) {
      case 'ovulation':
        return new StageOvulation(mats);
      case 'menstruation':
        return new StageMenstruation(mats);
      case 'intercourse':
        return new StageIntercourse(mats);
      case 'odyssey':
        return new StageOdyssey(mats);
      case 'fertilization':
        return new StageFertilization(mats);
      case 'cleavage':
        return new StageCleavage(mats);
      case 'blastocyst':
        return new StageBlastocyst(mats);
      case 'implantation':
        return new StageImplantation(mats);
      case 'week3_gastrulation':
        return new StageWeek3Gastrulation(mats);
      case 'week4_heartbeat':
        return new StageWeek4Heartbeat(mats);
      case 'week5_limb_buds':
        return new StageWeek5LimbBuds(mats);
      case 'week6_differentiation':
        return new StageWeek6Differentiation(mats);
      case 'week7_blueberry':
        return new StageWeek7Blueberry(mats);
      default:
        console.warn(`Unknown stageId: ${stageId}`);
        return new StageOvulation(mats);
    }
  }

  bindGlobalControls() {
    // Audio Mute/Unmute
    const audioBtn = document.getElementById('audio-toggle-btn');
    if (audioBtn) {
      audioBtn.addEventListener('click', () => {
        const isUnmuted = this.soundEngine.toggleMute();
        audioBtn.classList.toggle('active', isUnmuted);
        audioBtn.title = isUnmuted ? "Mute Scientific Soundscape" : "Unmute Soundscape & Heartbeat";
      });
    }

    // Perspective modes (Macro, Wide, Orbit)
    const btnMacro = document.getElementById('cam-btn-macro');
    if (btnMacro) {
      btnMacro.addEventListener('click', () => {
        this.soundEngine.playClick();
        this.sceneManager.cameraController.setPerspectiveMode('macro');
      });
    }

    const btnWide = document.getElementById('cam-btn-wide');
    if (btnWide) {
      btnWide.addEventListener('click', () => {
        this.soundEngine.playClick();
        this.sceneManager.cameraController.setPerspectiveMode('wide');
      });
    }

    const btnOrbit = document.getElementById('cam-btn-orbit');
    if (btnOrbit) {
      btnOrbit.addEventListener('click', () => {
        this.soundEngine.playClick();
        const active = this.sceneManager.cameraController.setPerspectiveMode('orbit');
        btnOrbit.classList.toggle('active', active);
      });
    }

    // Reset Camera
    const btnReset = document.getElementById('cam-btn-reset');
    if (btnReset && this.currentStage) {
      btnReset.addEventListener('click', () => {
        this.soundEngine.playClick();
        this.sceneManager.cameraController.transitionTo(this.currentStage.camera, 1.0);
      });
    }

    // Fullscreen toggle
    const btnFullscreen = document.getElementById('fullscreen-toggle-btn');
    if (btnFullscreen) {
      btnFullscreen.addEventListener('click', () => {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      });
    }

    // Help Modal
    const helpBtn = document.getElementById('help-toggle-btn');
    const modal = document.getElementById('guide-modal');
    const modalClose = document.getElementById('modal-close-btn');

    if (helpBtn && modal) {
      helpBtn.addEventListener('click', () => {
        this.soundEngine.playClick();
        modal.classList.add('open');
      });
    }
    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('open');
      });
    }
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('open');
      });
    }

    // Audio Visualizer Canvas
    this.visCanvas = document.getElementById('audio-visualizer-canvas');
    if (this.visCanvas) {
      this.visCtx = this.visCanvas.getContext('2d');
    }
  }

  drawAudioVisualizer() {
    if (!this.visCanvas || !this.visCtx || !this.soundEngine) return;
    const data = this.soundEngine.getVisualizerData();
    const ctx = this.visCtx;
    const w = this.visCanvas.width;
    const h = this.visCanvas.height;

    ctx.clearRect(0, 0, w, h);
    if (!data || this.soundEngine.isMuted) {
      // Draw flat idle pulse
      ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.fillRect(0, h * 0.45, w, 2);
      return;
    }

    const barWidth = 4;
    const barCount = 6;
    for (let i = 0; i < barCount; i++) {
      const val = data[i * 2] / 255;
      const barH = Math.max(3, val * h);
      ctx.fillStyle = i % 2 === 0 ? '#00f0ff' : '#ff2a70';
      ctx.fillRect(i * (barWidth + 2), h - barH, barWidth, barH);
    }
  }
}

// Bootstrap when DOM ready
window.addEventListener('DOMContentLoaded', () => {
  new App();
});
