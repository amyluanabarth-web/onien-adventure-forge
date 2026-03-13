import { useEffect, useRef, useCallback, useState } from "react";

// Procedural ambient music generator using Web Audio API
// Copyright-free as it's generated in real-time

class AmbientMusicEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;
  private intervalIds: number[] = [];

  init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.15;
    this.masterGain.connect(this.ctx.destination);
  }

  setVolume(vol: number) {
    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(vol * 0.15, this.ctx!.currentTime, 0.1);
    }
  }

  // Dark fantasy ambient pad
  playAmbient(scene: "forest" | "carriage" | "battlefield" = "forest") {
    this.init();
    if (this.isPlaying) this.stopAmbient();
    this.isPlaying = true;

    const ctx = this.ctx!;
    const master = this.masterGain!;

    // Scene-specific notes (pentatonic minor scales)
    const scales: Record<string, number[]> = {
      forest: [110, 130.81, 146.83, 164.81, 196, 220],       // Am pentatonic low
      carriage: [98, 116.54, 130.81, 146.83, 174.61, 196],   // darker
      battlefield: [82.41, 98, 110, 130.81, 146.83, 164.81], // even darker
    };

    const notes = scales[scene] || scales.forest;

    // Drone pad - two detuned oscillators for richness
    const createPad = (freq: number) => {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      osc1.type = "sine";
      osc2.type = "triangle";
      osc1.frequency.value = freq;
      osc2.frequency.value = freq * 1.003; // slight detune
      
      filter.type = "lowpass";
      filter.frequency.value = 400;
      filter.Q.value = 1;

      gain.gain.value = 0;
      gain.gain.setTargetAtTime(0.3, ctx.currentTime, 2);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(master);

      osc1.start();
      osc2.start();

      this.oscillators.push(osc1, osc2);
      return { osc1, osc2, gain, filter };
    };

    // Base drone
    createPad(notes[0]);
    createPad(notes[0] * 1.5); // fifth

    // Evolving melody notes that play periodically
    const playMelodyNote = () => {
      if (!this.isPlaying || !this.ctx) return;
      const note = notes[Math.floor(Math.random() * notes.length)];
      const octave = Math.random() > 0.5 ? 2 : 1;
      
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      const reverb = ctx.createGain(); // simple reverb simulation

      osc.type = "sine";
      osc.frequency.value = note * octave;
      
      filter.type = "lowpass";
      filter.frequency.value = 800;

      gain.gain.value = 0;
      gain.gain.setTargetAtTime(0.08, ctx.currentTime, 0.3);
      gain.gain.setTargetAtTime(0, ctx.currentTime + 2, 1);

      reverb.gain.value = 0.5;

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(reverb);
      reverb.connect(master);

      osc.start();
      osc.stop(ctx.currentTime + 5);
    };

    // Play melody notes at random intervals
    const scheduleNotes = () => {
      const id = window.setTimeout(() => {
        playMelodyNote();
        if (this.isPlaying) scheduleNotes();
      }, 2000 + Math.random() * 4000);
      this.intervalIds.push(id);
    };

    scheduleNotes();

    // Wind/atmosphere noise
    const bufferSize = ctx.sampleRate * 2;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = (Math.random() * 2 - 1) * 0.02;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuffer;
    noise.loop = true;
    const noiseFilter = ctx.createBiquadFilter();
    noiseFilter.type = "lowpass";
    noiseFilter.frequency.value = 200;
    const noiseGain = ctx.createGain();
    noiseGain.gain.value = 0.4;
    noise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(master);
    noise.start();
  }

  stopAmbient() {
    this.isPlaying = false;
    this.oscillators.forEach(o => { try { o.stop(); } catch {} });
    this.oscillators = [];
    this.intervalIds.forEach(id => clearTimeout(id));
    this.intervalIds = [];
  }

  // UI sound effects
  playClick() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 800;
    osc.frequency.setTargetAtTime(400, ctx.currentTime, 0.05);
    gain.gain.value = 0.1;
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.15);
  }

  playTextAdvance() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "triangle";
    osc.frequency.value = 600 + Math.random() * 200;
    gain.gain.value = 0.04;
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.1);
  }

  playChoice() {
    this.init();
    const ctx = this.ctx!;
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = freq;
      gain.gain.value = 0;
      gain.gain.setTargetAtTime(0.06, ctx.currentTime + i * 0.1, 0.02);
      gain.gain.setTargetAtTime(0, ctx.currentTime + i * 0.1 + 0.15, 0.1);
      osc.connect(gain);
      gain.connect(this.masterGain || ctx.destination);
      osc.start(ctx.currentTime + i * 0.1);
      osc.stop(ctx.currentTime + i * 0.1 + 0.4);
    });
  }

  playTransition() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 200;
    osc.frequency.setTargetAtTime(600, ctx.currentTime, 0.3);
    gain.gain.value = 0.08;
    gain.gain.setTargetAtTime(0, ctx.currentTime + 0.5, 0.2);
    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 1);
  }

  destroy() {
    this.stopAmbient();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

// Singleton instance
let engineInstance: AmbientMusicEngine | null = null;

function getEngine(): AmbientMusicEngine {
  if (!engineInstance) {
    engineInstance = new AmbientMusicEngine();
  }
  return engineInstance;
}

export function useAudio(scene?: "forest" | "carriage" | "battlefield") {
  const engine = useRef(getEngine());
  const [musicEnabled, setMusicEnabled] = useState(true);
  const hasStarted = useRef(false);

  // Start ambient music on first user interaction
  useEffect(() => {
    if (!scene || !musicEnabled) return;

    const startMusic = () => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        engine.current.playAmbient(scene);
      }
    };

    // Need user gesture to start AudioContext
    document.addEventListener("click", startMusic, { once: true });
    
    // If already started, just change scene
    if (hasStarted.current) {
      engine.current.playAmbient(scene);
    }

    return () => {
      document.removeEventListener("click", startMusic);
    };
  }, [scene, musicEnabled]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      engine.current.stopAmbient();
      hasStarted.current = false;
    };
  }, []);

  const playClick = useCallback(() => engine.current.playClick(), []);
  const playTextAdvance = useCallback(() => engine.current.playTextAdvance(), []);
  const playChoice = useCallback(() => engine.current.playChoice(), []);
  const playTransition = useCallback(() => engine.current.playTransition(), []);
  const setVolume = useCallback((vol: number) => engine.current.setVolume(vol), []);
  const toggleMusic = useCallback(() => {
    setMusicEnabled(prev => {
      if (prev) {
        engine.current.stopAmbient();
        hasStarted.current = false;
      }
      return !prev;
    });
  }, []);

  return { playClick, playTextAdvance, playChoice, playTransition, setVolume, toggleMusic, musicEnabled };
}
