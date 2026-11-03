/**
 * THE GENESIS OF LIFE — Procedural Web Audio Engine
 * Real-time synthesis of microscopic ambient drone, realistic fetal heartbeat,
 * fertilization calcium sparkle, and UI acoustic feedback.
 */

export class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = true; // start muted by default for browser autoplay policy
    this.ambientGain = null;
    this.heartbeatGain = null;
    this.fxGain = null;
    this.masterGain = null;
    
    this.heartbeatTimer = null;
    this.heartbeatBpm = 0; // 0 = no heartbeat
    this.isHeartbeatPlaying = false;
    
    this.analyser = null;
    this.dataArray = null;
  }

  /**
   * Initializes AudioContext upon first user gesture.
   */
  init() {
    if (this.ctx) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.7, this.ctx.currentTime);
      
      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.25, this.ctx.currentTime);
      
      this.heartbeatGain = this.ctx.createGain();
      this.heartbeatGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      
      this.fxGain = this.ctx.createGain();
      this.fxGain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
      this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
      
      this.ambientGain.connect(this.masterGain);
      this.heartbeatGain.connect(this.masterGain);
      this.fxGain.connect(this.masterGain);
      
      this.masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
      
      this.startAmbientSound();
    } catch (e) {
      console.warn('Web Audio API not supported or blocked:', e);
    }
  }

  toggleMute() {
    if (!this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.linearRampToValueAtTime(this.isMuted ? 0 : 0.7, now + 0.1);
    }
    return !this.isMuted;
  }

  /**
   * Procedural microscopic ambient drone (fluid resonance + soft chord)
   */
  startAmbientSound() {
    if (!this.ctx) return;
    
    // Fundamental warm drone
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note
    
    osc2.type = 'triangle';
    osc2.frequency.setValueAtTime(110, this.ctx.currentTime); // A2 note
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, this.ctx.currentTime);
    filter.Q.setValueAtTime(3, this.ctx.currentTime);
    
    // Low frequency modulation (LFO) for breathing effect
    const lfo = this.ctx.createOscillator();
    const lfoGain = this.ctx.createGain();
    lfo.frequency.setValueAtTime(0.15, this.ctx.currentTime); // slow breathing wave
    lfoGain.gain.setValueAtTime(60, this.ctx.currentTime);
    lfo.connect(filter.frequency);
    
    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(this.ambientGain);
    
    osc1.start();
    osc2.start();
    lfo.start();
  }

  /**
   * Play cardiac heartbeat (lub-dub) at specified BPM
   */
  setHeartbeat(bpm) {
    this.heartbeatBpm = bpm;
    if (bpm > 0) {
      if (!this.isHeartbeatPlaying) {
        this.isHeartbeatPlaying = true;
        this.runHeartbeatLoop();
      }
    } else {
      this.isHeartbeatPlaying = false;
      if (this.heartbeatTimer) {
        clearTimeout(this.heartbeatTimer);
        this.heartbeatTimer = null;
      }
    }
  }

  runHeartbeatLoop() {
    if (!this.isHeartbeatPlaying || this.heartbeatBpm <= 0) return;
    
    this.playCardiacThump();
    
    const intervalMs = (60 / this.heartbeatBpm) * 1000;
    this.heartbeatTimer = setTimeout(() => {
      this.runHeartbeatLoop();
    }, intervalMs);
  }

  /**
   * Generates physiological "lub-dub" double pulse
   */
  playCardiacThump() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    
    // 1st sound: Lub (S1 - atrioventricular closure)
    this.synthesizePulse(now, 58, 0.14, 0.8);
    
    // 2nd sound: Dub (S2 - aortic/pulmonary closure, ~120ms later)
    this.synthesizePulse(now + 0.12, 78, 0.11, 0.55);
  }

  synthesizePulse(time, freq, duration, amp) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);
    osc.frequency.exponentialRampToValueAtTime(32, time + duration);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(140, time);
    filter.Q.setValueAtTime(4, time);
    
    gain.gain.setValueAtTime(0.001, time);
    gain.gain.exponentialRampToValueAtTime(amp, time + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, time + duration);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.heartbeatGain);
    
    osc.start(time);
    osc.stop(time + duration);
  }

  /**
   * Fertilization calcium wave shimmer sound
   */
  playFertilizationChime() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);
      
      gain.gain.setValueAtTime(0.001, now + idx * 0.08);
      gain.gain.linearRampToValueAtTime(0.12, now + idx * 0.08 + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.08 + 1.2);
      
      osc.connect(gain);
      gain.connect(this.fxGain);
      
      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 1.3);
    });
  }

  /**
   * UI Click acoustic blip
   */
  playClick() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, now);
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);
    
    gain.gain.setValueAtTime(0.08, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
    
    osc.connect(gain);
    gain.connect(this.fxGain);
    
    osc.start(now);
    osc.stop(now + 0.05);
  }

  /**
   * Whoosh sound on stage transitions
   */
  playTransition() {
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(90, now);
    osc.frequency.exponentialRampToValueAtTime(260, now + 0.25);
    osc.frequency.exponentialRampToValueAtTime(70, now + 0.6);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(300, now);
    
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.2);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.fxGain);
    
    osc.start(now);
    osc.stop(now + 0.65);
  }

  /**
   * Get frequency data for visualizer
   */
  getVisualizerData() {
    if (!this.analyser || !this.dataArray) return null;
    this.analyser.getByteFrequencyData(this.dataArray);
    return this.dataArray;
  }
}
