import { useState, useEffect, useCallback, useMemo } from "react";
import { toast } from "sonner";
import { Menu, X, ArrowLeft, Map, Save, Settings, Trash2, Undo2 } from "lucide-react";
import forestBackground from "@/assets/forest-background.jpg";
import carriageBackground from "@/assets/carriage-wreck-background.jpg";
import worldMap from "@/assets/world-map.png";
import battlefieldBackground from "@/assets/battlefield-background.jpg";
import wispSprite from "@/assets/wisp-sprite.png";
import errynSprite from "@/assets/erryn-sprite.png";
import errynCaughtSprite from "@/assets/erryn-caught-sprite.png";
import knightSprite from "@/assets/knight-sprite.png";
import aldricSprite from "@/assets/aldric-sprite.png";
import mageSprite from "@/assets/mage-sprite.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAudio } from "@/hooks/useAudio";
import type { TranslationKey } from "@/lib/translations";

interface DialogLine {
  speaker: string;
  textKey: TranslationKey;
  showSprite?: "player" | "erryn" | "both" | "none" | "knight" | "mage" | "knight-mage" | "oldman" | "erryn-caught" | "erryn-caught-player";
}

interface ChoiceOption {
  labelKey: TranslationKey;
  descKey: TranslationKey;
  targetPhase: StoryPhase;
}

interface ChoiceScreen {
  promptKey: TranslationKey;
  options: ChoiceOption[];
}

export interface SaveSlot {
  id: number;
  phase: StoryPhase;
  currentLine: number;
  playerName: string;
  timestamp: number;
  backgroundKey: string;
}

interface VisualNovelProps {
  playerName: string;
  onBackToMenu: () => void;
  onOpenSettings: () => void;
  initialSave?: SaveSlot | null;
}

type StoryPhase =
  | "intro"
  | "choice1"
  | "pathA"
  | "choiceA2"
  | "helpAldric"
  | "choiceA3"
  | "leaveAldric"
  | "pathB"
  | "choiceB2"
  | "intervene"
  | "flee";

const dialogs: Partial<Record<StoryPhase, DialogLine[]>> = {
  intro: [
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
  ],
  pathA: [
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
  ],
  helpAldric: [
    { speaker: "", textKey: "helpDialog1", showSprite: "both" },
    { speaker: "{player}", textKey: "helpDialog2", showSprite: "player" },
    { speaker: "Erryn", textKey: "helpDialog3", showSprite: "erryn" },
    { speaker: "", textKey: "helpDialog4", showSprite: "none" },
    { speaker: "Aldric", textKey: "helpDialog5", showSprite: "oldman" },
    { speaker: "", textKey: "helpDialog6", showSprite: "oldman" },
    { speaker: "Aldric", textKey: "helpDialog7", showSprite: "oldman" },
    { speaker: "Erryn", textKey: "helpDialog8", showSprite: "erryn" },
    { speaker: "", textKey: "helpDialog9", showSprite: "erryn-caught" },
    { speaker: "", textKey: "helpDialog10", showSprite: "erryn-caught-player" },
    { speaker: "Erryn", textKey: "helpDialog11", showSprite: "erryn-caught" },
    { speaker: "{player}", textKey: "helpDialog12", showSprite: "erryn-caught-player" },
    { speaker: "Erryn", textKey: "helpDialog13", showSprite: "erryn-caught" },
  ],
  leaveAldric: [
    { speaker: "", textKey: "leaveDialog1", showSprite: "both" },
    { speaker: "Aldric", textKey: "leaveDialog2", showSprite: "oldman" },
    { speaker: "", textKey: "leaveDialog3", showSprite: "both" },
    { speaker: "Erryn", textKey: "leaveDialog4", showSprite: "erryn" },
    { speaker: "", textKey: "leaveDialog5", showSprite: "none" },
    { speaker: "Aldric", textKey: "leaveDialog6", showSprite: "oldman" },
    { speaker: "", textKey: "leaveDialog7", showSprite: "none" },
    { speaker: "", textKey: "leaveDialog8", showSprite: "both" },
    { speaker: "Erryn", textKey: "leaveDialog9", showSprite: "erryn" },
    { speaker: "", textKey: "leaveDialog10", showSprite: "both" },
  ],
  pathB: [
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
  ],
  intervene: [
    { speaker: "", textKey: "interveneDialog1", showSprite: "player" },
    { speaker: "Erryn", textKey: "interveneDialog2", showSprite: "erryn" },
    { speaker: "{player}", textKey: "interveneDialog3", showSprite: "player" },
    { speaker: "", textKey: "interveneDialog4", showSprite: "knight-mage" },
    { speaker: "Knight", textKey: "interveneDialog5", showSprite: "knight" },
    { speaker: "Mage", textKey: "interveneDialog6", showSprite: "mage" },
    { speaker: "", textKey: "interveneDialog7", showSprite: "mage" },
    { speaker: "Mage", textKey: "interveneDialog8", showSprite: "mage" },
    { speaker: "", textKey: "interveneDialog9", showSprite: "knight-mage" },
    { speaker: "Knight", textKey: "interveneDialog10", showSprite: "knight" },
  ],
  flee: [
    { speaker: "", textKey: "fleeDialog1", showSprite: "both" },
    { speaker: "Erryn", textKey: "fleeDialog2", showSprite: "erryn" },
    { speaker: "", textKey: "fleeDialog3", showSprite: "none" },
    { speaker: "", textKey: "fleeDialog4", showSprite: "none" },
    { speaker: "{player}", textKey: "fleeDialog5", showSprite: "player" },
    { speaker: "Erryn", textKey: "fleeDialog6", showSprite: "erryn" },
    { speaker: "", textKey: "fleeDialog7", showSprite: "erryn" },
    { speaker: "Erryn", textKey: "fleeDialog8", showSprite: "erryn" },
    { speaker: "", textKey: "fleeDialog9", showSprite: "both" },
    { speaker: "Erryn", textKey: "fleeDialog10", showSprite: "erryn" },
  ],
};

const choices: Partial<Record<StoryPhase, ChoiceScreen>> = {
  choice1: {
    promptKey: "choicePrompt",
    options: [
      { labelKey: "choiceRoad", descKey: "choiceRoadDesc", targetPhase: "pathA" },
      { labelKey: "choiceSounds", descKey: "choiceSoundsDesc", targetPhase: "pathB" },
    ],
  },
  choiceA2: {
    promptKey: "aldricChoicePrompt",
    options: [
      { labelKey: "aldricChoiceHelp", descKey: "aldricChoiceHelpDesc", targetPhase: "helpAldric" },
      { labelKey: "aldricChoiceLeave", descKey: "aldricChoiceLeaveDesc", targetPhase: "leaveAldric" },
    ],
  },
  choiceA3: {
    promptKey: "errynChoicePrompt",
    options: [
      { labelKey: "errynChoiceFight", descKey: "errynChoiceFightDesc", targetPhase: "helpAldric" },
      { labelKey: "errynChoiceDistract", descKey: "errynChoiceDistractDesc", targetPhase: "helpAldric" },
    ],
  },
  choiceB2: {
    promptKey: "battleChoicePrompt",
    options: [
      { labelKey: "battleChoiceIntervene", descKey: "battleChoiceInterveneDesc", targetPhase: "intervene" },
      { labelKey: "battleChoiceFlee", descKey: "battleChoiceFleeDesc", targetPhase: "flee" },
    ],
  },
};

const phaseEndsWithChoice: Partial<Record<StoryPhase, StoryPhase>> = {
  intro: "choice1",
  pathA: "choiceA2",
  helpAldric: "choiceA3",
  pathB: "choiceB2",
};

const phaseBackgrounds: Record<string, string> = {
  intro: forestBackground,
  choice1: forestBackground,
  pathA: carriageBackground,
  choiceA2: carriageBackground,
  helpAldric: carriageBackground,
  choiceA3: carriageBackground,
  leaveAldric: carriageBackground,
  pathB: battlefieldBackground,
  choiceB2: battlefieldBackground,
  intervene: battlefieldBackground,
  flee: battlefieldBackground,
};

const phaseBackgroundKeys: Record<string, string> = {
  intro: "forest",
  choice1: "forest",
  pathA: "carriage",
  choiceA2: "carriage",
  helpAldric: "carriage",
  choiceA3: "carriage",
  leaveAldric: "carriage",
  pathB: "battlefield",
  choiceB2: "battlefield",
  intervene: "battlefield",
  flee: "battlefield",
};

const backgroundFromKey: Record<string, string> = {
  forest: forestBackground,
  carriage: carriageBackground,
  battlefield: battlefieldBackground,
};

const phaseChapterKeys: Record<string, TranslationKey> = {
  intro: "chapterIntro",
  choice1: "chapterIntro",
  pathA: "chapterPathA",
  choiceA2: "chapterPathA",
  helpAldric: "chapterHelpAldric",
  choiceA3: "chapterHelpAldric",
  leaveAldric: "chapterLeaveAldric",
  pathB: "chapterPathB",
  choiceB2: "chapterPathB",
  intervene: "chapterIntervene",
  flee: "chapterFlee",
};

const TYPEWRITER_SPEED = 30;
const SAVE_KEY = "aeonien_saves";
const MAX_SAVES = 6;

function loadSaves(): SaveSlot[] {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function persistSaves(saves: SaveSlot[]) {
  localStorage.setItem(SAVE_KEY, JSON.stringify(saves));
}

const VisualNovel = ({ playerName, onBackToMenu, onOpenSettings, initialSave }: VisualNovelProps) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<StoryPhase>(initialSave?.phase || "intro");
  const [currentLine, setCurrentLine] = useState(initialSave?.currentLine || 0);
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showScene, setShowScene] = useState(false);
  const [choiceHover, setChoiceHover] = useState<number | null>(null);
  const [bgTransition, setBgTransition] = useState(false);

  // Decision history for "back to last decision"
  const [decisionHistory, setDecisionHistory] = useState<StoryPhase[]>([]);

  // Pocket menu state
  const [pocketOpen, setPocketOpen] = useState(false);
  const [savesOpen, setSavesOpen] = useState(false);
  const [mapOpen, setMapOpen] = useState(false);
  const [saves, setSaves] = useState<SaveSlot[]>(loadSaves);

  const isChoicePhase = !!choices[phase];
  const dialog = dialogs[phase] || [];
  const line = dialog[currentLine];
  const choice = choices[phase];
  const background = phaseBackgrounds[phase] || forestBackground;

  // Audio system - determine scene from background
  const { playClick, playTextAdvance, playChoice, playTransition } = useAudio(true);

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
    setBgTransition(true);
    const timer = setTimeout(() => setBgTransition(false), 600);
    return () => clearTimeout(timer);
  }, [background]);

  useEffect(() => {
    if (isChoicePhase) return;
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
  }, [currentLine, fullText, isChoicePhase]);

  const handleClick = useCallback(() => {
    if (isChoicePhase || pocketOpen || savesOpen || mapOpen) return;
    if (!isComplete) {
      setDisplayedText(fullText);
      setIsComplete(true);
    } else {
      playTextAdvance();
      if (currentLine < dialog.length - 1) {
        setCurrentLine((prev) => prev + 1);
      } else {
        const nextChoice = phaseEndsWithChoice[phase];
        if (nextChoice) {
          setPhase(nextChoice);
        }
      }
    }
  }, [isComplete, fullText, currentLine, dialog.length, phase, isChoicePhase, pocketOpen, savesOpen, mapOpen, playTextAdvance]);

  const handleChoice = (targetPhase: StoryPhase) => {
    playChoice();
    playTransition();
    setDecisionHistory((prev) => [...prev, phase]);
    setPhase(targetPhase);
    setCurrentLine(0);
    setDisplayedText("");
    setIsComplete(false);
  };

  const handleLoadSave = (slot: SaveSlot) => {
    setPhase(slot.phase);
    setCurrentLine(slot.currentLine);
    setDisplayedText("");
    setIsComplete(false);
    setDecisionHistory([]);
    setSavesOpen(false);
  };

  const handleBackToDecision = () => {
    if (decisionHistory.length === 0) return;
    const lastDecision = decisionHistory[decisionHistory.length - 1];
    setDecisionHistory((prev) => prev.slice(0, -1));
    setPhase(lastDecision);
    setCurrentLine(0);
    setDisplayedText("");
    setIsComplete(false);
  };

  const handleSaveToSlot = (slotId: number) => {
    const newSave: SaveSlot = {
      id: slotId,
      phase,
      currentLine,
      playerName,
      timestamp: Date.now(),
      backgroundKey: phaseBackgroundKeys[phase] || "forest",
    };
    const updated = saves.filter((s) => s.id !== slotId);
    updated.push(newSave);
    updated.sort((a, b) => a.id - b.id);
    setSaves(updated);
    persistSaves(updated);
    toast(t("savedSuccessfully"));
  };

  const handleDeleteSave = (slotId: number) => {
    const updated = saves.filter((s) => s.id !== slotId);
    setSaves(updated);
    persistSaves(updated);
    toast(t("saveDeleted"));
  };

  const anyOverlayOpen = pocketOpen || savesOpen || mapOpen;

  if (!isChoicePhase && !line && !anyOverlayOpen) return null;

  const isNarration = speaker === "";
  const isLastLine = currentLine >= dialog.length - 1 && isComplete && !phaseEndsWithChoice[phase];

  const showPlayer = showSprite === "player" || showSprite === "both" || showSprite === "erryn-caught-player";
  const showErryn = showSprite === "erryn" || showSprite === "both";
  const showKnight = showSprite === "knight" || showSprite === "knight-mage";
  const showMage = showSprite === "mage" || showSprite === "knight-mage";
  const showOldman = showSprite === "oldman";
  const showErrynCaught = showSprite === "erryn-caught" || showSprite === "erryn-caught-player";
  const isTalking = !isComplete;

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div
      className="relative w-full h-screen overflow-hidden cursor-pointer select-none transition-opacity duration-1000"
      style={{ opacity: showScene ? 1 : 0 }}
      onClick={handleClick}
    >
      <img
        src={background}
        alt="Scene"
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${bgTransition ? "opacity-80" : "opacity-100"}`}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />

      {/* Pocket Menu Button - Top Left */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          setPocketOpen(!pocketOpen);
          setSavesOpen(false);
          setMapOpen(false);
        }}
        className="absolute top-4 left-4 z-30 p-2 bg-background/60 backdrop-blur-md border border-primary/30 rounded-lg hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 group"
      >
        {pocketOpen ? (
          <X className="w-6 h-6 text-primary" />
        ) : (
          <Menu className="w-6 h-6 text-primary group-hover:text-primary" />
        )}
      </button>

      {/* Pocket Menu Dropdown */}
      {pocketOpen && (
        <div
          className="absolute top-16 left-4 z-30 w-56 bg-background/90 backdrop-blur-xl border border-primary/30 rounded-lg overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={() => { setPocketOpen(false); onBackToMenu(); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-foreground hover:bg-primary/15 transition-colors border-b border-primary/10"
          >
            <ArrowLeft className="w-4 h-4 text-primary" />
            <span className="font-display text-sm tracking-wide">{t("backToMenu")}</span>
          </button>
          <button
            onClick={() => { setPocketOpen(false); setMapOpen(true); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-foreground hover:bg-primary/15 transition-colors border-b border-primary/10"
          >
            <Map className="w-4 h-4 text-primary" />
            <span className="font-display text-sm tracking-wide">{t("openMap")}</span>
          </button>
          <button
            onClick={() => { setPocketOpen(false); setSavesOpen(true); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-foreground hover:bg-primary/15 transition-colors border-b border-primary/10"
          >
            <Save className="w-4 h-4 text-primary" />
            <span className="font-display text-sm tracking-wide">{t("saveGame")}</span>
          </button>
          <button
            onClick={() => { setPocketOpen(false); onOpenSettings(); }}
            className="w-full flex items-center gap-3 px-4 py-3 text-left text-foreground hover:bg-primary/15 transition-colors"
          >
            <Settings className="w-4 h-4 text-primary" />
            <span className="font-display text-sm tracking-wide">{t("openSettings")}</span>
          </button>
        </div>
      )}

      {/* Map Overlay */}
      {mapOpen && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative max-w-4xl w-full mx-4">
            <button
              onClick={() => setMapOpen(false)}
              className="absolute -top-10 right-0 p-2 text-primary/70 hover:text-primary transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={worldMap}
              alt="Äonien World Map"
              className="w-full h-auto rounded-lg border border-primary/30 shadow-lg"
            />
          </div>
        </div>
      )}

      {/* Save Overlay */}
      {savesOpen && (
        <div
          className="absolute inset-0 z-30 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="bg-background/95 backdrop-blur-xl border border-primary/30 rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display text-primary tracking-wider">{t("saveLoadTitle")}</h2>
              <button
                onClick={() => setSavesOpen(false)}
                className="p-1 hover:bg-primary/20 rounded transition-colors"
              >
                <X className="w-5 h-5 text-primary" />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[60vh] overflow-y-auto pr-1">
              {Array.from({ length: MAX_SAVES }, (_, i) => {
                const slot = saves.find((s) => s.id === i);
                const bgImg = slot ? backgroundFromKey[slot.backgroundKey] || forestBackground : null;
                const chapterKey = slot ? phaseChapterKeys[slot.phase] : null;

                return (
                  <div
                    key={i}
                    className="relative border border-primary/20 rounded-lg overflow-hidden bg-background/50 hover:border-primary/40 transition-colors"
                  >
                    {slot && bgImg ? (
                      <>
                        {/* Save card with image */}
                        <div className="relative h-28 overflow-hidden">
                          <img src={bgImg} alt="" className="w-full h-full object-cover opacity-60" />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                          <div className="absolute bottom-2 left-3 right-3">
                            <p className="text-xs text-primary/70 font-display tracking-wider">
                              {t("chapter")}
                            </p>
                            <p className="text-sm font-display text-foreground truncate">
                              {chapterKey ? t(chapterKey) : slot.phase}
                            </p>
                          </div>
                        </div>
                        <div className="p-3 flex items-center justify-between">
                          <div>
                            <p className="text-xs text-muted-foreground">{formatDate(slot.timestamp)}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">{slot.playerName}</p>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleLoadSave(slot)}
                              className="px-3 py-1.5 text-xs font-display bg-accent/20 border border-accent/30 text-accent-foreground hover:bg-accent/30 transition-colors rounded"
                            >
                              {t("loadHere")}
                            </button>
                            <button
                              onClick={() => handleSaveToSlot(i)}
                              className="px-3 py-1.5 text-xs font-display bg-primary/20 border border-primary/30 text-primary hover:bg-primary/30 transition-colors rounded"
                            >
                              {t("saveHere")}
                            </button>
                            <button
                              onClick={() => handleDeleteSave(i)}
                              className="p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors rounded"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Empty slot */
                      <button
                        onClick={() => handleSaveToSlot(i)}
                        className="w-full h-40 flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary/70 transition-colors"
                      >
                        <Save className="w-6 h-6 opacity-40" />
                        <span className="text-sm font-display tracking-wide">{t("emptySlot")}</span>
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Erryn sprite - left (brother wisp, 2x size) */}
      <div className={`absolute bottom-[160px] left-[5%] md:left-[10%] z-[5] transition-all duration-500 ${showErryn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={errynSprite} alt="Erryn" className={`h-[32rem] md:h-[44rem] w-auto drop-shadow-[0_0_25px_rgba(56,189,248,0.6)] ${isTalking && activeSpeaker === "erryn" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Player sprite - right (smaller wisp) */}
      <div className={`absolute bottom-[160px] right-[5%] md:right-[10%] z-[5] transition-all duration-500 ${showPlayer ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={wispSprite} alt="Player wisp" className={`h-48 md:h-72 w-auto drop-shadow-[0_0_20px_rgba(56,189,248,0.5)] ${isTalking && activeSpeaker === "player" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Knight sprite - left (1/4 bigger) */}
      <div className={`absolute bottom-[160px] left-[5%] md:left-[8%] z-[5] transition-all duration-500 ${showKnight ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={knightSprite} alt="Knight" className={`h-[22rem] md:h-[32rem] w-auto drop-shadow-[0_0_15px_rgba(200,170,100,0.5)] ${isTalking && activeSpeaker === "knight" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Mage sprite - right (1/3 bigger) */}
      <div className={`absolute bottom-[160px] right-[5%] md:right-[8%] z-[5] transition-all duration-500 ${showMage ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={mageSprite} alt="Mage" className={`h-[22rem] md:h-[32rem] w-auto drop-shadow-[0_0_20px_rgba(160,100,220,0.6)] ${isTalking && activeSpeaker === "mage" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Aldric sprite - left (wisp hunter, 2x size) */}
      <div className={`absolute bottom-[160px] left-[5%] md:left-[10%] z-[5] transition-all duration-500 ${showOldman ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={aldricSprite} alt="Aldric" className={`h-[28rem] md:h-[40rem] w-auto drop-shadow-[0_0_15px_rgba(180,160,120,0.5)] ${isTalking && activeSpeaker === "oldman" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : ""}`} />
      </div>

      {/* Erryn caught sprite - center (2x size) */}
      <div className={`absolute bottom-[160px] left-1/2 -translate-x-1/2 z-[5] transition-all duration-500 ${showErrynCaught ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
        <img src={errynCaughtSprite} alt="Erryn trapped" className={`h-[32rem] md:h-[44rem] w-auto drop-shadow-[0_0_30px_rgba(56,189,248,0.7)] ${isTalking && activeSpeaker === "erryn" ? "animate-[sprite-talk_0.4s_ease-in-out_infinite]" : "animate-pulse"}`} />
      </div>

      {/* Choice screen */}
      {isChoicePhase && choice && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-6 p-4">
          <p className="text-xl md:text-2xl font-display text-primary text-glow text-center mb-4">
            {t(choice.promptKey)}
          </p>
          {choice.options.map((opt, i) => (
            <button
              key={i}
              onClick={(e) => { e.stopPropagation(); handleChoice(opt.targetPhase); }}
              onMouseEnter={() => setChoiceHover(i)}
              onMouseLeave={() => setChoiceHover(null)}
              className={`w-full max-w-lg p-5 border text-left transition-all duration-300 backdrop-blur-md ${
                choiceHover === i
                  ? "bg-primary/20 border-primary/60 box-glow-hover"
                  : "bg-background/70 border-primary/25 box-glow"
              }`}
            >
              <span className="block text-lg font-display text-primary tracking-wide">{t(opt.labelKey)}</span>
              <span className="block text-sm text-muted-foreground mt-1">{t(opt.descKey)}</span>
            </button>
          ))}
        </div>
      )}

      {/* Click indicator */}
      {!isChoicePhase && isComplete && !isLastLine && !anyOverlayOpen && (
        <div className="absolute bottom-6 right-8 z-20 animate-pulse">
          <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[10px] border-t-primary/70" />
        </div>
      )}

      {/* Textbox */}
      {!isChoicePhase && !anyOverlayOpen && (
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
            {/* Back to last decision button */}
            {decisionHistory.length > 0 && (
              <div className="mt-2 flex justify-center">
                <button
                  onClick={(e) => { e.stopPropagation(); handleBackToDecision(); }}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-display text-muted-foreground hover:text-primary bg-background/60 border border-primary/15 hover:border-primary/40 rounded backdrop-blur-sm transition-all duration-200"
                >
                  <Undo2 className="w-3.5 h-3.5" />
                  {t("backToDecision")}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default VisualNovel;
