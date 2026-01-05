import { useState } from "react";
import { toast } from "sonner";
import MainMenu from "@/components/MainMenu";
import CharacterSelect from "@/components/CharacterSelect";
import Settings from "@/components/Settings";
import ParticleBackground from "@/components/ParticleBackground";
import { useLanguage } from "@/contexts/LanguageContext";

type Screen = "menu" | "character" | "settings";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");
  const { t } = useLanguage();

  const handleNewGame = () => {
    setCurrentScreen("character");
  };

  const handleLoadGame = () => {
    toast(t("loadGameTitle"), {
      description: t("loadGameDesc"),
    });
  };

  const handleSettings = () => {
    setCurrentScreen("settings");
  };

  const handleExit = () => {
    toast(t("exitTitle"), {
      description: t("exitDesc"),
    });
  };

  const handleSelectCharacter = (character: string) => {
    const characterNames: Record<string, string> = {
      knight: t("knight"),
      mage: t("mage"),
      wisp: t("wisp"),
    };
    toast(`${characterNames[character]} ${t("characterChosen")}`, {
      description: t("adventureBegins"),
    });
  };

  const handleBack = () => {
    setCurrentScreen("menu");
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

        {currentScreen === "settings" && (
          <Settings onBack={handleBack} />
        )}
      </div>
    </main>
  );
};

export default Index;
