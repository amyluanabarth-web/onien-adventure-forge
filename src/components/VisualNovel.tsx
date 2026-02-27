import { useState, useEffect, useCallback } from "react";
import forestBackground from "@/assets/forest-background.jpg";
import wispSprite from "@/assets/wisp-sprite.png";
import knightSprite from "@/assets/knight-sprite.png";
import { useLanguage } from "@/contexts/LanguageContext";
import type { TranslationKey } from "@/lib/translations";

interface DialogLine {
  speaker: string;
  textKey: TranslationKey;
  showSprite?: "player" | "erryn" | "both" | "none" | "knight" | "mage" | "knight-mage" | "oldman";
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

const roadDialog: DialogLine[] = [
  { speaker: "", textKey: "roadDialog1", showSprite: "both" },
  { speaker: "", textKey: "roadDialog2", showSprite: "both" },
  { speaker: "Erryn", textKey: "roadDialog3", showSprite: "erryn" },
  { speaker: "", textKey: "roadDialog4", showSprite: "both" },
  { speaker: "Aldric", textKey: "roadDialog5", showSprite: "oldman" },
  { speaker: "{player}", textKey: "roadDialog6", showSprite: "player" },
  { speaker: "Erryn", textKey: "roadDialog7", showSprite: "erryn" },
  { speaker: "", textKey: "roadDialog8", showSprite: "both" },
  { speaker: "Aldric", textKey: "roadDialog9", showSprite: "oldman" },
  { speaker: "", textKey: "roadDialog10", showSprite: "none" },
  { speaker: "Aldric", textKey: "roadDialog11", showSprite: "oldman" },
];

const soundDialog: DialogLine[] = [
  { speaker: "", textKey: "soundDialog1", showSprite: "both" },
  { speaker: "Erryn", textKey: "soundDialog2", showSprite: "erryn" },
  { speaker: "", textKey: "soundDialog3", showSprite: "none" },
  { speaker: "", textKey: "soundDialog4", showSprite: "knight-mage" },
  { speaker: "Knight", textKey: "soundDialog5", showSprite: "knight" },
  { speaker: "Mage", textKey: "soundDialog6", showSprite: "mage" },
  { speaker: "", textKey: "soundDialog7", showSprite: "both" },
  { speaker: "", textKey: "soundDialog8", showSprite: "knight-mage" },
  { speaker: "Knight", textKey: "soundDialog9", showSprite: "knight" },
  { speaker: "", textKey: "soundDialog10", showSprite: "knight-mage" },
  { speaker: "Mage", textKey: "soundDialog11", showSprite: "mage" },
];

const TYPEWRITER_SPEED = 30;

type StoryPhase = "intro" | "choice" | "pathA" | "pathB";

const VisualNovel = ({ playerName }: VisualNovelProps) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<StoryPhase>("intro");
  const [currentLine, setCurrentLine] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [choiceHover, setChoiceHover] = useState<string | null>(null);

  const dialog = phase === "intro" ? wispDialog : phase === "pathA" ? roadDialog : phase === "pathB" ? soundDialog : [];
  const line = dialog[currentLine];

  const fullText = line ? t(line.textKey).replace("{player}", playerName) : "";
  const speaker = line?.speaker.replace("{player}", playerName) || "";
  const showSprite = line?.showSprite || "none";

  const activeSpeaker = line?.speaker === "{player}" ? "player"
    : line?.speaker === "Erryn" || line?.speaker === "???" ? "erryn"
    : line?.speaker === "Knight" ? "knight"
    : line?.speaker === "Mage" ? "mage"
    : line?.speaker === "Aldric" ? "oldman"
    : "none";

  useEffect(() => {
    const timer = setTimeout(() => setShowScene(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (phase === "choice") return;
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
  }, [currentLine, fullText, phase]);

  const handleClick = useCallback(() => {
    if (phase === "choice") return;
    if (!isComplete) {
      setDisplayedText(fullText);
      setIsComplete(true);
    } else {
      if (currentLine < dialog.length - 1) {
        setCurrentLine((prev) => prev + 1);
      } else if (phase === "intro") {
        setPhase("choice");
      }
    }
  }, [isComplete, fullText, currentLine, dialog.length, phase]);

  const handleChoice = (path: "pathA" | "pathB") => {
    setPhase(path);
    setCurrentLine(0);
    setDisplayedText("");
    setIsComplete(false);
  };

  if (phase !== "choice" && !line) return null;

  const isNarration = speaker === "";
  const isLastLine = currentLine >= dialog.length - 1 && isComplete && phase !== "intro";

  const showPlayer = showSprite === "player" || showSprite === "both";
  const showErryn = showSprite === "erryn" || showSprite === "both";
  const showKnight = showSprite === "knight" || showSprite === "knight-mage";
  const showMage = showSprite === "mage" || showSprite === "knight-mage";
  const showOldman = showSprite === "oldman";

  const isTalking = !isComplete;

  return (
    <div
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none transition-opacity duration-1000"
      style={{ opacity: showScene ? 1 : 0 }}
      onClick={handleClick}
    >
      <img src={forestBackground} alt="Magical forest" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Erryn sprite - left */}
      <div className={`absolute bottom-[160px] left-[5%] md:left-[10%] z-[5] transition-all duration-500 ${showErryn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={wispSprite} alt="Erryn" className={`h-48 md:h-72 w-auto drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] ${isTalking && activeSpeaker === "erryn" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} style={{ filter: "hue-rotate(30deg) brightness(1.2)" }} />
      </div>

      {/* Player sprite - right */}
      <div className={`absolute bottom-[160px] right-[5%] md:right-[10%] z-[5] transition-all duration-500 ${showPlayer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={wispSprite} alt="Player wisp" className={`h-36 md:h-56 w-auto drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] ${isTalking && activeSpeaker === "player" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Knight sprite - left */}
      <div className={`absolute bottom-[160px] left-[5%] md:left-[8%] z-[5] transition-all duration-500 ${showKnight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={knightSprite} alt="Knight" className={`h-56 md:h-80 w-auto drop-shadow-[0_0_15px_rgba(200,170,100,0.5)] ${isTalking && activeSpeaker === "knight" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Mage sprite - right */}
      <div className={`absolute bottom-[160px] right-[5%] md:right-[8%] z-[5] transition-all duration-500 ${showMage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={knightSprite} alt="Mage" className={`h-52 md:h-76 w-auto drop-shadow-[0_0_20px_rgba(160,100,220,0.6)] ${isTalking && activeSpeaker === "mage" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} style={{ filter: "hue-rotate(200deg) brightness(1.1)" }} />
      </div>

      {/* Old man sprite - left */}
      <div className={`absolute bottom-[160px] left-[5%] md:left-[10%] z-[5] transition-all duration-500 ${showOldman ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={knightSprite} alt="Aldric" className={`h-48 md:h-68 w-auto drop-shadow-[0_0_15px_rgba(180,160,120,0.5)] ${isTalking && activeSpeaker === "oldman" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} style={{ filter: "sepia(0.6) brightness(0.8) hue-rotate(-10deg)" }} />
      </div>

      {/* Choice screen */}
      {phase === "choice" && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-4">
          <p className="text-xl md:text-2xl font-display text-primary text-glow text-center mb-4">
            {t("choicePrompt")}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); handleChoice("pathA"); }}
            onMouseEnter={() => setChoiceHover("A")}
            onMouseLeave={() => setChoiceHover(null)}
            className={`w-full max-w-lg p-5 border text-left transition-all duration-300 backdrop-blur-md ${
              choiceHover === "A"
                ? "bg-primary/20 border-primary/60 box-glow-hover"
                : "bg-background/70 border-primary/25 box-glow"
            }`}
          >
            <span className="block text-lg font-display text-primary tracking-wide">{t("choiceRoad")}</span>
            <span className="block text-sm text-muted-foreground mt-1">{t("choiceRoadDesc")}</span>
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleChoice("pathB"); }}
            onMouseEnter={() => setChoiceHover("B")}
            onMouseLeave={() => setChoiceHover(null)}
            className={`w-full max-w-lg p-5 border text-left transition-all duration-300 backdrop-blur-md ${
              choiceHover === "B"
                ? "bg-primary/20 border-primary/60 box-glow-hover"
                : "bg-background/70 border-primary/25 box-glow"
            }`}
          >
            <span className="block text-lg font-display text-primary tracking-wide">{t("choiceSounds")}</span>
            <span className="block text-sm text-muted-foreground mt-1">{t("choiceSoundsDesc")}</span>
          </button>
        </div>
      )}

      {/* Click indicator */}
      {phase !== "choice" && isComplete && !isLastLine && (
        <div className="absolute bottom-6 right-8 z-20 animate-pulse">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-primary/70" />
        </div>
      )}

      {/* Textbox */}
      {phase !== "choice" && (
        <div className="absolute bottom-0 left-0 right-0 z-10 p-4 md:p-6">
          <div className="max-w-4xl mx-auto">
            {!isNarration && (
              <div className="mb-1">
                <span className="inline-block px-4 py-1 bg-primary/20 border border-primary/40 text-primary font-display text-sm tracking-widest uppercase backdrop-blur-sm">
                  {speaker}
                </span>
              </div>
            )}
            <div className={`w-full min-h-[120px] md:min-h-[140px] p-5 md:p-6 bg-background/85 backdrop-blur-md border border-primary/20 ${isNarration ? "italic text-muted-foreground" : "text-foreground"}`}>
              <span className="absolute top-0 left-0 w-3 h-3 border-l border-t border-primary/50" />
              <span className="absolute top-0 right-0 w-3 h-3 border-r border-t border-primary/50" />
              <span className="absolute bottom-0 left-0 w-3 h-3 border-l border-b border-primary/50" />
              <span className="absolute bottom-0 right-0 w-3 h-3 border-r border-b border-primary/50" />
              <p className="text-base md:text-lg leading-relaxed font-serif">
                {displayedText}
                {!isComplete && <span className="inline-block w-0.5 h-5 bg-primary/70 ml-0.5 animate-pulse align-text-bottom" />}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualNovel;
