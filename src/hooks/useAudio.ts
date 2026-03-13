import { useEffect, useRef, useCallback, useState } from "react";

class AudioEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private bgMusic: HTMLAudioElement | null = null;
  private musicVolume = 0.4;

  init() {
    if (this.ctx) return;
    this.ctx = new AudioContext();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.value = 0.15;
    this.masterGain.connect(this.ctx.destination);
  }

  setVolume(vol: number) {
    this.musicVolume = vol;
    if (this.bgMusic) {
      this.bgMusic.volume = vol * 0.4;
    }
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol * 0.15, this.ctx.currentTime, 0.1);
    }
  }

  playBackgroundMusic() {
    if (this.bgMusic) return;
    this.bgMusic = new Audio("/audio/background-music.mp3");
    this.bgMusic.loop = true;
    this.bgMusic.volume = this.musicVolume * 0.4;
    this.bgMusic.play().catch(() => {
      // Will retry on user interaction
    });
  }

  stopBackgroundMusic() {
    if (this.bgMusic) {
      this.bgMusic.pause();
      this.bgMusic.currentTime = 0;
      this.bgMusic = null;
    }
  }

  // UI sound effects using Web Audio API
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

  playHover() {
    this.init();
    const ctx = this.ctx!;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 500 + Math.random() * 100;
    gain.gain.value = 0.04;
    gain.gain.setTargetAtTime(0, ctx.currentTime, 0.04);
    osc.connect(gain);
    gain.connect(this.masterGain || ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.08);
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
    const notes = [523.25, 659.25, 783.99];
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
    this.stopBackgroundMusic();
    if (this.ctx) {
      this.ctx.close();
      this.ctx = null;
    }
  }
}

let engineInstance: AudioEngine | null = null;

function getEngine(): AudioEngine {
  if (!engineInstance) {
    engineInstance = new AudioEngine();
  }
  return engineInstance;
}

export function useAudio(startMusic = false) {
  const engine = useRef(getEngine());
  const [musicEnabled, setMusicEnabled] = useState(true);
  const hasStarted = useRef(false);

  useEffect(() => {
    if (!startMusic || !musicEnabled) return;

    const startBgMusic = () => {
      if (!hasStarted.current) {
        hasStarted.current = true;
        engine.current.playBackgroundMusic();
      }
    };

    document.addEventListener("click", startBgMusic, { once: true });

    if (hasStarted.current) {
      engine.current.playBackgroundMusic();
    }

    return () => {
      document.removeEventListener("click", startBgMusic);
    };
  }, [startMusic, musicEnabled]);

  useEffect(() => {
    return () => {
      engine.current.stopBackgroundMusic();
      hasStarted.current = false;
    };
  }, []);

  const playClick = useCallback(() => engine.current.playClick(), []);
  const playHover = useCallback(() => engine.current.playHover(), []);
  const playTextAdvance = useCallback(() => engine.current.playTextAdvance(), []);
  const playChoice = useCallback(() => engine.current.playChoice(), []);
  const playTransition = useCallback(() => engine.current.playTransition(), []);
  const setVolume = useCallback((vol: number) => engine.current.setVolume(vol), []);
  const toggleMusic = useCallback(() => {
    setMusicEnabled(prev => {
      if (prev) {
        engine.current.stopBackgroundMusic();
        hasStarted.current = false;
      }
      return !prev;
    });
  }, []);

  return { playClick, playHover, playTextAdvance, playChoice, playTransition, setVolume, toggleMusic, musicEnabled };
}
