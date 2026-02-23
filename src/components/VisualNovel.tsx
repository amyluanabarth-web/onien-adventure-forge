import { useState, useEffect, useCallback } from "react";
import forestBackground from "@/assets/forest-background.jpg";
import wispPlayerSprite from "@/assets/wisp-player-sprite.png";
import wispErrynSprite from "@/assets/wisp-erryn-sprite.png";

interface DialogLine {
  speaker: string;
  text: string;
  /** Which sprite is "active" — affects glow/scale */
  activeSide: "player" | "erryn" | "none";
  /** Mood drives CSS animation on the active sprite */
  playerMood: "nervous" | "sad" | "neutral" | "scared";
  errynMood: "stern" | "worried" | "protective" | "neutral";
}

interface VisualNovelProps {
  playerName: string;
}

const wispDialog: DialogLine[] = [
  {
    speaker: "",
    text: "The forest hums with an eerie glow. Twisted roots claw at the mossy ground, and the air smells of damp earth and something... ancient. You drift between the luminescent mushrooms, your faint light flickering nervously.",
    activeSide: "none",
    playerMood: "nervous",
    errynMood: "neutral",
  },
  {
    speaker: "",
    text: "You've gotten separated from the others again. The familiar paths have shifted — or maybe you never knew them at all. Every direction looks the same: dark, tangled, alive.",
    activeSide: "player",
    playerMood: "scared",
    errynMood: "neutral",
  },
  {
    speaker: "???",
    text: "Hey. Hey! Over here, you little fool.",
    activeSide: "erryn",
    playerMood: "scared",
    errynMood: "stern",
  },
  {
    speaker: "",
    text: "A brighter glow pulses through the undergrowth — your brother, Erryn, pushing through a curtain of hanging moss. His light burns steadier than yours, sharper. He always did burn brighter.",
    activeSide: "erryn",
    playerMood: "nervous",
    errynMood: "protective",
  },
  {
    speaker: "Erryn",
    text: "I told you to stay close. Do you have any idea how deep we've wandered? This part of the woods... things live here that don't like our kind.",
    activeSide: "erryn",
    playerMood: "scared",
    errynMood: "stern",
  },
  {
    speaker: "{player}",
    text: "I didn't mean to drift off. Something was calling to me — a sound, like singing, but...",
    activeSide: "player",
    playerMood: "nervous",
    errynMood: "worried",
  },
  {
    speaker: "Erryn",
    text: "Stop. Don't follow sounds you can't name. That's the first rule, and you know it.",
    activeSide: "erryn",
    playerMood: "sad",
    errynMood: "stern",
  },
  {
    speaker: "",
    text: "He hovers closer, his glow wrapping around yours like a protective shell. For a moment, the darkness pulls back.",
    activeSide: "none",
    playerMood: "neutral",
    errynMood: "protective",
  },
  {
    speaker: "Erryn",
    text: "Stay behind me. We'll find the trail back. And this time — don't. Wander. Off.",
    activeSide: "erryn",
    playerMood: "nervous",
    errynMood: "stern",
  },
  {
    speaker: "{player}",
    text: "...Okay. I'm sorry, Erryn.",
    activeSide: "player",
    playerMood: "sad",
    errynMood: "protective",
  },
  {
    speaker: "Erryn",
    text: "Don't be sorry. Be careful. Now come on — before the forest notices us.",
    activeSide: "erryn",
    playerMood: "neutral",
    errynMood: "protective",
  },
];

const TYPEWRITER_SPEED = 30;

/** Returns inline style for sprite animation based on mood */
const getMoodAnimation = (
  mood: string,
  side: "player" | "erryn"
): React.CSSProperties => {
  const base: React.CSSProperties = {
    transition: "all 0.6s ease-in-out",
  };

  switch (mood) {
    case "nervous":
      return {
        ...base,
        animation: "wisp-tremble 1.2s ease-in-out infinite",
      };
    case "scared":
      return {
        ...base,
        animation: "wisp-shrink 1.5s ease-in-out infinite",
      };
    case "sad":
      return {
        ...base,
        animation: "wisp-droop 2s ease-in-out infinite",
      };
    case "stern":
      return {
        ...base,
        animation: "wisp-pulse-stern 1.8s ease-in-out infinite",
      };
    case "worried":
      return {
        ...base,
        animation: "wisp-sway 2s ease-in-out infinite",
      };
    case "protective":
      return {
        ...base,
        animation: "wisp-glow-protective 2s ease-in-out infinite",
      };
    default:
      return {
        ...base,
        animation: "wisp-float 3s ease-in-out infinite",
      };
  }
};

const VisualNovel = ({ playerName }: VisualNovelProps) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showScene, setShowScene] = useState(false);

  const dialog = wispDialog;
  const line = dialog[currentLine];

  const fullText = line?.text.replace("{player}", playerName) || "";
  const speaker = line?.speaker.replace("{player}", playerName) || "";

  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setDisplayedText("");
    setIsComplete(false);

    if (!fullText) return;

    let index = 0;
    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        setIsComplete(true);
        clearInterval(interval);
      }
    }, TYPEWRITER_SPEED);

    return () => clearInterval(interval);
  }, [currentLine, fullText]);

  const handleClick = useCallback(() => {
    if (!isComplete) {
      setDisplayedText(fullText);
      setIsComplete(true);
    } else {
      if (currentLine < dialog.length - 1) {
        setCurrentLine((prev) => prev + 1);
      }
    }
  }, [isComplete, fullText, currentLine, dialog.length]);

  if (!line) return null;

  const isNarration = speaker === "";
  const isLastLine = currentLine >= dialog.length - 1 && isComplete;

  const playerActive = line.activeSide === "player";
  const errynActive = line.activeSide === "erryn";

  return (
    <div
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none transition-opacity duration-1000"
      style={{ opacity: showScene ? 1 : 0 }}
      onClick={handleClick}
    >
      {/* Sprite animation keyframes */}
      <style>{`
        @keyframes wisp-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-12px); }
        }
        @keyframes wisp-tremble {
          0%, 100% { transform: translateX(0) translateY(-4px); }
          25% { transform: translateX(-3px) translateY(-6px); }
          75% { transform: translateX(3px) translateY(-2px); }
        }
        @keyframes wisp-shrink {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(0.92) translateY(6px); }
        }
        @keyframes wisp-droop {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(8px) rotate(-3deg); }
        }
        @keyframes wisp-pulse-stern {
          0%, 100% { transform: scale(1); filter: brightness(1); }
          50% { transform: scale(1.05); filter: brightness(1.2); }
        }
        @keyframes wisp-sway {
          0%, 100% { transform: translateX(0) translateY(-4px); }
          50% { transform: translateX(6px) translateY(-8px); }
        }
        @keyframes wisp-glow-protective {
          0%, 100% { transform: scale(1) translateY(-4px); filter: brightness(1) drop-shadow(0 0 8px rgba(255,200,50,0.3)); }
          50% { transform: scale(1.06) translateY(-10px); filter: brightness(1.15) drop-shadow(0 0 20px rgba(255,200,50,0.6)); }
        }
      `}</style>

      {/* Background image */}
      <img
        src={forestBackground}
        alt="Magical forest"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Wisp Sprites */}
      {/* Player wisp — left side */}
      <div
        className="absolute z-10 transition-all duration-700 ease-in-out"
        style={{
          bottom: "180px",
          left: "12%",
          opacity: playerActive ? 1 : 0.6,
          filter: playerActive
            ? "drop-shadow(0 0 24px rgba(150,200,255,0.7))"
            : "drop-shadow(0 0 8px rgba(150,200,255,0.3))",
          ...getMoodAnimation(line.playerMood, "player"),
        }}
      >
        <img
          src={wispPlayerSprite}
          alt="Player wisp"
          className="w-28 md:w-36 lg:w-44 h-auto transition-transform duration-500"
          style={{
            transform: playerActive ? "scale(1.1)" : "scale(0.95)",
          }}
        />
      </div>

      {/* Erryn wisp — right side */}
      <div
        className="absolute z-10 transition-all duration-700 ease-in-out"
        style={{
          bottom: "180px",
          right: "12%",
          opacity: errynActive ? 1 : 0.6,
          filter: errynActive
            ? "drop-shadow(0 0 24px rgba(255,200,80,0.7))"
            : "drop-shadow(0 0 8px rgba(255,200,80,0.3))",
          ...getMoodAnimation(line.errynMood, "erryn"),
        }}
      >
        <img
          src={wispErrynSprite}
          alt="Erryn"
          className="w-28 md:w-36 lg:w-44 h-auto transition-transform duration-500"
          style={{
            transform: errynActive ? "scale(1.1)" : "scale(0.95)",
          }}
        />
      </div>

      {/* Click indicator */}
      {isComplete && !isLastLine && (
        <div className="absolute bottom-6 right-8 z-20 animate-pulse">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-primary/70" />
        </div>
      )}

      {/* Textbox */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {!isNarration && (
            <div className="mb-1">
              <span className="inline-block px-4 py-1 bg-primary/20 border border-primary/40 text-primary font-display text-sm tracking-widest uppercase backdrop-blur-sm">
                {speaker}
              </span>
            </div>
          )}

          <div
            className={`
              relative w-full min-h-[120px] md:min-h-[140px] p-5 md:p-6
              bg-background/85 backdrop-blur-md
              border border-primary/20
              ${isNarration ? "italic text-muted-foreground" : "text-foreground"}
            `}
          >
            <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/50" />
            <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-primary/50" />
            <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-primary/50" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/50" />

            <p className="text-base md:text-lg leading-relaxed font-serif">
              {displayedText}
              {!isComplete && (
                <span className="inline-block w-0.5 h-5 bg-primary/70 ml-0.5 animate-pulse align-text-bottom" />
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualNovel;
