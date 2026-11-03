/**
 * THE GENESIS OF LIFE — Timeline & Playback Controller
 * Interactive scrubbing bar, play/pause state machine, speed control,
 * stage jump triggers, and branch switching (Pregnancy vs Menstruation).
 */

export class TimelineController {
  constructor(stagesData, onStageChange) {
    this.stagesData = stagesData;
    this.onStageChange = onStageChange;
    
    this.currentBranch = 'pregnancy';
    this.currentStageIndex = 0;
    this.isPlaying = false;
    this.playSpeed = 1.0;
    this.playbackTimer = null;
    this.stageElapsedTime = 0;
    
    this.initDOM();
    this.renderTimelineNodes();
    this.bindEvents();
  }

  initDOM() {
    this.nodesContainer = document.getElementById('timeline-nodes');
    this.progressBarFill = document.getElementById('timeline-bar-fill');
    this.trackWrap = document.getElementById('timeline-track-wrap');
    this.playBtn = document.getElementById('play-toggle-btn');
    this.prevBtn = document.getElementById('step-prev-btn');
    this.nextBtn = document.getElementById('step-next-btn');
    this.speedBtns = document.querySelectorAll('.speed-btn');
    this.branchBtns = document.querySelectorAll('.branch-btn');
  }

  getFilteredStages() {
    if (this.currentBranch === 'menstruation') {
      // Return Ovulation followed by Menstruation branch
      return this.stagesData.filter(s => s.id === 'ovulation' || s.id === 'menstruation');
    }
    // Standard pregnancy path (excludes the menstruation alternate)
    return this.stagesData.filter(s => s.branch === 'pregnancy');
  }

  renderTimelineNodes() {
    if (!this.nodesContainer) return;
    this.nodesContainer.innerHTML = '';
    
    const activeStages = this.getFilteredStages();
    activeStages.forEach((stage, idx) => {
      const node = document.createElement('div');
      node.className = `timeline-node ${idx === this.currentStageIndex ? 'active' : ''} ${stage.branch === 'menstruation' ? 'branch-node' : ''}`;
      node.dataset.stageId = stage.id;
      node.dataset.index = idx;
      
      const marker = document.createElement('div');
      marker.className = 'node-marker';
      
      const label = document.createElement('div');
      label.className = 'node-label';
      label.textContent = stage.timelineLabel;
      
      node.appendChild(marker);
      node.appendChild(label);
      
      node.addEventListener('click', (e) => {
        e.stopPropagation();
        this.goToStageIndex(idx);
      });
      
      this.nodesContainer.appendChild(node);
    });

    this.updateProgressUI();
  }

  bindEvents() {
    // Play / Pause toggle
    if (this.playBtn) {
      this.playBtn.addEventListener('click', () => {
        this.togglePlay();
      });
    }

    // Step navigation
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => {
        this.stepPrev();
      });
    }
    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => {
        this.stepNext();
      });
    }

    // Speed selector
    this.speedBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        this.speedBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.playSpeed = parseFloat(btn.dataset.speed) || 1.0;
      });
    });

    // Branch selector buttons (Pregnancy vs Menstruation)
    this.branchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetBranch = btn.dataset.branch;
        this.switchBranch(targetBranch);
      });
    });

    // Clicking timeline bar track directly to jump
    if (this.trackWrap) {
      this.trackWrap.addEventListener('click', (e) => {
        const rect = this.trackWrap.getBoundingClientRect();
        const clickRatio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
        const activeStages = this.getFilteredStages();
        const targetIdx = Math.round(clickRatio * (activeStages.length - 1));
        this.goToStageIndex(targetIdx);
      });
    }
  }

  switchBranch(branchName) {
    if (this.currentBranch === branchName) return;
    this.currentBranch = branchName;
    
    this.branchBtns.forEach(btn => {
      if (btn.dataset.branch === branchName) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    this.currentStageIndex = 0;
    this.renderTimelineNodes();
    this.goToStageIndex(0);
  }

  togglePlay() {
    this.isPlaying = !this.isPlaying;
    this.updatePlayBtnUI();
    
    if (this.isPlaying) {
      this.startPlaybackLoop();
    } else {
      this.stopPlaybackLoop();
    }
  }

  updatePlayBtnUI() {
    if (!this.playBtn) return;
    if (this.isPlaying) {
      this.playBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
      `;
      this.playBtn.title = "Pause Animation";
    } else {
      this.playBtn.innerHTML = `
        <svg viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
      `;
      this.playBtn.title = "Play Full Journey";
    }
  }

  startPlaybackLoop() {
    this.stopPlaybackLoop();
    const activeStages = this.getFilteredStages();
    const stage = activeStages[this.currentStageIndex];
    const duration = (stage.durationMs || 8000) / this.playSpeed;

    this.playbackTimer = setTimeout(() => {
      if (!this.isPlaying) return;
      if (this.currentStageIndex < activeStages.length - 1) {
        this.goToStageIndex(this.currentStageIndex + 1);
        this.startPlaybackLoop();
      } else {
        // End reached, pause
        this.isPlaying = false;
        this.updatePlayBtnUI();
      }
    }, duration);
  }

  stopPlaybackLoop() {
    if (this.playbackTimer) {
      clearTimeout(this.playbackTimer);
      this.playbackTimer = null;
    }
  }

  stepNext() {
    const activeStages = this.getFilteredStages();
    if (this.currentStageIndex < activeStages.length - 1) {
      this.goToStageIndex(this.currentStageIndex + 1);
    }
  }

  stepPrev() {
    if (this.currentStageIndex > 0) {
      this.goToStageIndex(this.currentStageIndex - 1);
    }
  }

  goToStageIndex(index) {
    const activeStages = this.getFilteredStages();
    if (index < 0 || index >= activeStages.length) return;
    
    this.currentStageIndex = index;
    const stage = activeStages[index];
    
    this.updateProgressUI();
    
    if (typeof this.onStageChange === 'function') {
      this.onStageChange(stage, this.currentStageIndex, activeStages.length);
    }

    if (this.isPlaying) {
      this.startPlaybackLoop();
    }
  }

  updateProgressUI() {
    const activeStages = this.getFilteredStages();
    const total = activeStages.length - 1;
    const pct = total > 0 ? (this.currentStageIndex / total) * 100 : 0;
    
    if (this.progressBarFill) {
      this.progressBarFill.style.width = `${pct}%`;
    }

    // Update node active states
    const nodeElements = this.nodesContainer.querySelectorAll('.timeline-node');
    nodeElements.forEach((node, idx) => {
      if (idx === this.currentStageIndex) {
        node.classList.add('active');
        node.classList.remove('completed');
      } else if (idx < this.currentStageIndex) {
        node.classList.remove('active');
        node.classList.add('completed');
      } else {
        node.classList.remove('active', 'completed');
      }
    });
  }
}
