import { useState } from "react";
import { toast } from "sonner";
import MainMenu from "@/components/MainMenu";
import CharacterSelect from "@/components/CharacterSelect";
import CharacterOverview from "@/components/CharacterOverview";
import StoryIntro from "@/components/StoryIntro";
import VisualNovel, { type SaveSlot } from "@/components/VisualNovel";
import Settings from "@/components/Settings";
import ParticleBackground from "@/components/ParticleBackground";
import { useLanguage } from "@/contexts/LanguageContext";

type Screen = "menu" | "character" | "characterOverview" | "storyIntro" | "visualNovel" | "settings" | "loadSaves";

const SAVE_KEY = "aeonien_saves";

function loadSaves(): SaveSlot[] {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");
  const [selectedCharacter, setSelectedCharacter] = useState<string | null>(null);
  const [playerName, setPlayerName] = useState("");
  const [activeSave, setActiveSave] = useState<SaveSlot | null>(null);
  const { t } = useLanguage();

  const handleNewGame = () => {
    setActiveSave(null);
    setCurrentScreen("character");
  };

  const handleLoadGame = () => {
    setCurrentScreen("loadSaves");
  };

  const handleSettings = () => {
    setCurrentScreen("settings");
  };

  const handleExit = () => {
    window.open("about:blank", "_self");
    window.close();
  };

  const handleBackToMenu = () => {
    setCurrentScreen("menu");
    setSelectedCharacter(null);
    setPlayerName("");
    setActiveSave(null);
  };

  const [previousScreen, setPreviousScreen] = useState<Screen>("menu");

  const handleOpenSettings = () => {
    setPreviousScreen(currentScreen);
    setCurrentScreen("settings");
  };

  const handleSelectCharacter = (character: string) => {
    setSelectedCharacter(character);
    setCurrentScreen("characterOverview");
  };

  const handleContinueWithCharacter = () => {
    setCurrentScreen("storyIntro");
  };

  const handleNameSubmit = (name: string) => {
    setPlayerName(name);
    setCurrentScreen("visualNovel");
  };

  const handleStoryBegin = () => {
    if (selectedCharacter) {
      const characterNames: Record<string, string> = {
        knight: t("knight"),
        mage: t("mage"),
        wisp: t("wisp"),
      };
      toast(`${characterNames[selectedCharacter]} — ${t("adventureBegins")}`, {
        description: t("loadGameDesc"),
      });
    }
  };

  const handleBackToCharacters = () => {
    setCurrentScreen("character");
  };

  const handleBack = () => {
    setCurrentScreen("menu");
  };

  const handleLoadSave = (save: SaveSlot) => {
    setPlayerName(save.playerName);
    setActiveSave(save);
    setCurrentScreen("visualNovel");
  };

  return (
    <main className="relative min-h-screen overflow-hidden">
      <ParticleBackground />
      
      <div className="relative z-10">
        {currentScreen === "menu" && (
          <MainMenu
            onNewGame={handleNewGame}
            onLoadGame={handleLoadGame}
            onSettings={handleSettings}
            onExit={handleExit}
          />
        )}
        
        {currentScreen === "character" && (
          <CharacterSelect
            onSelectCharacter={handleSelectCharacter}
            onBack={handleBack}
          />
        )}

        {currentScreen === "characterOverview" && selectedCharacter && (
          <CharacterOverview
            character={selectedCharacter}
            onContinue={handleContinueWithCharacter}
            onBack={handleBackToCharacters}
          />
        )}

        {currentScreen === "settings" && (
          <Settings onBack={() => setCurrentScreen(previousScreen)} />
        )}

        {currentScreen === "loadSaves" && (
          <LoadSavesScreen
            onBack={handleBack}
            onLoadSave={handleLoadSave}
          />
        )}

        {currentScreen === "storyIntro" && selectedCharacter && (
          <StoryIntro
            character={selectedCharacter}
            onContinue={handleNameSubmit}
          />
        )}

        {currentScreen === "visualNovel" && (
          <VisualNovel
            playerName={playerName}
            onBackToMenu={handleBackToMenu}
            onOpenSettings={handleOpenSettings}
            initialSave={activeSave}
          />
        )}
      </div>
    </main>
  );
};

// Load Saves Screen component
import { ArrowLeft, Trash2 } from "lucide-react";

function LoadSavesScreen({ onBack, onLoadSave }: { onBack: () => void; onLoadSave: (save: SaveSlot) => void }) {
  const { t } = useLanguage();
  const [saves, setSaves] = useState<SaveSlot[]>(loadSaves);

  const backgroundFromKey: Record<string, string> = {
    forest: "/src/assets/forest-background.jpg",
    carriage: "/src/assets/carriage-wreck-background.jpg",
    battlefield: "/src/assets/battlefield-background.jpg",
  };

  const phaseChapterKeys: Record<string, string> = {
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

  const formatDate = (ts: number) => {
    const d = new Date(ts);
    return d.toLocaleDateString(undefined, { day: "2-digit", month: "2-digit", year: "numeric" }) +
      " " + d.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit" });
  };

  const handleDelete = (id: number) => {
    const updated = saves.filter((s) => s.id !== id);
    setSaves(updated);
    localStorage.setItem(SAVE_KEY, JSON.stringify(updated));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      <div className="max-w-2xl w-full">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={onBack} className="p-2 hover:bg-primary/20 rounded transition-colors">
            <ArrowLeft className="w-5 h-5 text-primary" />
          </button>
          <h1 className="text-3xl font-display text-primary tracking-wider">{t("saves")}</h1>
        </div>

        {saves.length === 0 ? (
          <p className="text-center text-muted-foreground font-display">{t("emptySlot")}</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {saves.map((slot) => {
              const chapterKey = phaseChapterKeys[slot.phase] as any;
              return (
                <div
                  key={slot.id}
                  className="relative border border-primary/20 rounded-lg overflow-hidden bg-background/50 hover:border-primary/40 transition-colors cursor-pointer"
                  onClick={() => onLoadSave(slot)}
                >
                  <div className="relative h-28 overflow-hidden bg-muted/30">
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3">
                      <p className="text-xs text-primary/70 font-display tracking-wider">{t("chapter")}</p>
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
                    <button
                      onClick={(e) => { e.stopPropagation(); handleDelete(slot.id); }}
                      className="p-1.5 text-destructive/70 hover:text-destructive hover:bg-destructive/10 transition-colors rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
