/**
 * THE GENESIS OF LIFE — Medical Info Drawer & HUD Coordinator
 * Updates stage medical metadata, hormone gauges, anatomical pins,
 * clinical pearls, and syncs floating 3D annotations.
 */

export class InfoDrawer {
  constructor(onStructureClick) {
    this.onStructureClick = onStructureClick;
    
    this.drawer = document.getElementById('medical-drawer');
    this.drawerToggleBtn = document.getElementById('drawer-toggle-btn');
    this.drawerCloseBtn = document.getElementById('drawer-close-btn');
    
    // Top HUD Elements
    this.hudStageTag = document.getElementById('hud-stage-tag');
    this.hudStageTitle = document.getElementById('hud-stage-title');
    this.hudDayRange = document.getElementById('hud-day-range');
    this.hudScale = document.getElementById('hud-scale');
    this.hudHeartbeat = document.getElementById('hud-heartbeat-badge');
    this.hudHeartbeatBpm = document.getElementById('heartbeat-bpm-text');
    
    // Drawer Elements
    this.drawerCategory = document.getElementById('drawer-category');
    this.drawerTitle = document.getElementById('drawer-title');
    this.drawerStatsGrid = document.getElementById('drawer-stats-grid');
    this.drawerNarrative = document.getElementById('drawer-narrative');
    this.drawerStructures = document.getElementById('drawer-structures');
    this.drawerClinical = document.getElementById('drawer-clinical-text');
    this.drawerHormones = document.getElementById('drawer-hormones');
    
    // 3D Annotations container
    this.annotationsContainer = document.getElementById('scene-annotations-container');
    this.activeAnnotations = [];

    this.bindEvents();
  }

  bindEvents() {
    if (this.drawerToggleBtn) {
      this.drawerToggleBtn.addEventListener('click', () => {
        this.openDrawer();
      });
    }

    if (this.drawerCloseBtn) {
      this.drawerCloseBtn.addEventListener('click', () => {
        this.closeDrawer();
      });
    }
  }

  openDrawer() {
    if (this.drawer) this.drawer.classList.remove('collapsed');
    if (this.drawerToggleBtn) this.drawerToggleBtn.style.display = 'none';
  }

  closeDrawer() {
    if (this.drawer) this.drawer.classList.add('collapsed');
    if (this.drawerToggleBtn) this.drawerToggleBtn.style.display = 'flex';
  }

  updateStage(stage, activeIndex, totalStages) {
    if (!stage) return;

    // 1. Update Top HUD
    if (this.hudStageTag) {
      const stageNum = (activeIndex !== undefined && activeIndex !== null) ? activeIndex + 1 : stage.index + 1;
      const totalStr = totalStages ? ` / ${String(totalStages).padStart(2, '0')}` : '';
      const idxStr = String(stageNum).padStart(2, '0');
      this.hudStageTag.textContent = `STAGE ${idxStr}${totalStr}`;
    }
    if (this.hudStageTitle) this.hudStageTitle.textContent = stage.title;
    if (this.hudDayRange) this.hudDayRange.textContent = stage.dayRange;
    if (this.hudScale) this.hudScale.textContent = stage.scale;

    // Heartbeat indicator in HUD (Active only if BPM > 0)
    if (this.hudHeartbeat) {
      if (stage.heartbeatBpm > 0) {
        this.hudHeartbeat.classList.add('active');
        if (this.hudHeartbeatBpm) {
          this.hudHeartbeatBpm.textContent = `${stage.heartbeatBpm} BPM`;
        }
      } else {
        this.hudHeartbeat.classList.remove('active');
      }
    }

    // 2. Update Drawer Header
    if (this.drawerCategory) this.drawerCategory.textContent = stage.category;
    if (this.drawerTitle) this.drawerTitle.textContent = stage.title;

    // 3. Update Metric Stats Grid
    if (this.drawerStatsGrid) {
      this.drawerStatsGrid.innerHTML = '';
      stage.stats.forEach(st => {
        const card = document.createElement('div');
        card.className = 'stat-card';
        card.innerHTML = `
          <span class="stat-label">${st.label}</span>
          <span class="stat-value ${st.highlight || ''}">${st.value}</span>
        `;
        this.drawerStatsGrid.appendChild(card);
      });
    }

    // 4. Update Narrative Text
    if (this.drawerNarrative) {
      this.drawerNarrative.innerHTML = stage.narrative;
    }

    // 5. Update Key Anatomical Structures
    if (this.drawerStructures) {
      this.drawerStructures.innerHTML = '';
      stage.structures.forEach(struct => {
        const tag = document.createElement('span');
        tag.className = 'structure-tag';
        tag.innerHTML = `<span class="tag-dot"></span>${struct.name}`;
        tag.title = struct.desc;
        tag.addEventListener('click', () => {
          if (this.onStructureClick) {
            this.onStructureClick(struct);
          }
        });
        this.drawerStructures.appendChild(tag);
      });
    }

    // 6. Update Clinical Significance
    if (this.drawerClinical) {
      this.drawerClinical.innerHTML = stage.clinicalFact;
    }

    // 7. Update Hormonal Landscape
    if (this.drawerHormones) {
      this.drawerHormones.innerHTML = '';
      stage.hormones.forEach(h => {
        const row = document.createElement('div');
        row.className = 'hormone-row';
        row.innerHTML = `
          <div class="hormone-header">
            <span class="hormone-name">${h.name}</span>
            <span class="hormone-level">${h.level}</span>
          </div>
          <div class="hormone-bar-bg">
            <div class="hormone-bar-fill" style="width: ${h.level}; background: ${h.color};"></div>
          </div>
        `;
        this.drawerHormones.appendChild(row);
      });
    }

    // 8. Rebuild Floating 3D Scene Annotations
    this.buildAnnotations(stage.annotations || []);
  }

  buildAnnotations(annotations) {
    if (!this.annotationsContainer) return;
    this.annotationsContainer.innerHTML = '';
    this.activeAnnotations = [];

    annotations.forEach(ann => {
      const pin = document.createElement('div');
      pin.className = 'annotation-pin';
      pin.innerHTML = `
        <div class="pin-dot"></div>
        <div class="pin-label">${ann.label}</div>
      `;
      this.annotationsContainer.appendChild(pin);
      this.activeAnnotations.push({
        domElement: pin,
        pos3D: ann.pos
      });
    });
  }

  /**
   * Syncs floating 2D DOM pins to 3D projected coordinates on every frame
   */
  syncAnnotations(cameraController, width, height) {
    if (!this.activeAnnotations.length) return;
    this.activeAnnotations.forEach(item => {
      const proj = cameraController.projectToScreen(item.pos3D, width, height);
      if (proj.isVisible) {
        item.domElement.style.display = 'flex';
        item.domElement.style.left = `${proj.x}px`;
        item.domElement.style.top = `${proj.y}px`;
      } else {
        item.domElement.style.display = 'none';
      }
    });
  }
}
