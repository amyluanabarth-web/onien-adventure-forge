import { useState, useEffect, useCallback } from "react";
import forestBackground from "@/assets/forest-background.jpg";
import wispSprite from "@/assets/wisp-sprite.png";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/lib/translations";

interface DialogLine {
  speaker: string;
  textKey: TranslationKey;
  /** Which sprite(s) to show: "player" | "erryn" | "both" | "none" */
  showSprite?: "player" | "erryn" | "both" | "none";
}

interface VisualNovelProps {
  playerName: string;
}

const wispDialog: DialogLine[] = [
  { speaker: "", textKey: "wispDialog1", showSprite: "none" },
  { speaker: "", textKey: "wispDialog2", showSprite: "none" },
  { speaker: "???", textKey: "wispDialog3", showSprite: "erryn" },
  { speaker: "", textKey: "wispDialog4", showSprite: "both" },
  { speaker: "Erryn", textKey: "wispDialog5", showSprite: "erryn" },
  { speaker: "{player}", textKey: "wispDialog6", showSprite: "player" },
  { speaker: "Erryn", textKey: "wispDialog7", showSprite: "erryn" },
  { speaker: "", textKey: "wispDialog8", showSprite: "both" },
  { speaker: "Erryn", textKey: "wispDialog9", showSprite: "erryn" },
  { speaker: "{player}", textKey: "wispDialog10", showSprite: "player" },
  { speaker: "Erryn", textKey: "wispDialog11", showSprite: "erryn" },
];

const TYPEWRITER_SPEED = 30;

const VisualNovel = ({ playerName }: VisualNovelProps) => {
  const { t } = useLanguage();
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showScene, setShowScene] = useState(false);

  const dialog = wispDialog;
  const line = dialog[currentLine];

  const fullText = line ? t(line.textKey).replace("{player}", playerName) : "";
  const speaker = line?.speaker.replace("{player}", playerName) || "";
  const showSprite = line?.showSprite || "none";

  // Who is actively speaking (for animation)
  const activeSpeaker = line?.speaker === "{player}" ? "player" : line?.speaker === "Erryn" || line?.speaker === "???" ? "erryn" : "none";

  // Fade in scene
  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
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

  const showPlayer = showSprite === "player" || showSprite === "both";
  const showErryn = showSprite === "erryn" || showSprite === "both";

  const isTalking = !isComplete;

  return (
    <div
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none transition-opacity duration-1000"
      style={{ opacity: showScene ? 1 : 0 }}
      onClick={handleClick}
    >
      {/* Background image */}
      <img
        src={forestBackground}
        alt="Magical forest"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Character sprites */}
      {/* Erryn sprite - left side */}
      <div
        className={`absolute bottom-[160px] left-[5%] md:left-[10%] z-[5] transition-all duration-500 ${
          showErryn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <img
          src={wispSprite}
          alt="Erryn"
          className={`h-48 md:h-72 w-auto drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] ${
            isTalking && activeSpeaker === "erryn"
              ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]"
              : ""
          }`}
          style={{
            filter: "hue-rotate(30deg) brightness(1.2)",
          }}
        />
      </div>

      {/* Player sprite - right side */}
      <div
        className={`absolute bottom-[160px] right-[5%] md:right-[10%] z-[5] transition-all duration-500 ${
          showPlayer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        <img
          src={wispSprite}
          alt="Player wisp"
          className={`h-36 md:h-56 w-auto drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] ${
            isTalking && activeSpeaker === "player"
              ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]"
              : ""
          }`}
        />
      </div>

      {/* Click indicator */}
      {isComplete && !isLastLine && (
        <div className="absolute bottom-6 right-8 z-20 animate-pulse">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-primary/70" />
        </div>
      )}

      {/* Textbox at the bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
        <div className="max-w-4xl mx-auto">
          {/* Speaker name tag */}
          {!isNarration && (
            <div className="mb-1">
              <span className="inline-block px-4 py-1 bg-primary/20 border border-primary/40 text-primary font-display text-sm tracking-widest uppercase backdrop-blur-sm">
                {speaker}
              </span>
            </div>
          )}

          {/* Text box */}
          <div
            className={`
              w-full min-h-[120px] md:min-h-[140px] p-5 md:p-6
              bg-background/85 backdrop-blur-md
              border border-primary/20
              ${isNarration ? "italic text-muted-foreground" : "text-foreground"}
            `}
          >
            {/* Corner decorations */}
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
