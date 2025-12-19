import { useState } from "react";
import { toast } from "sonner";
import MainMenu from "@/components/MainMenu";
import CharacterSelect from "@/components/CharacterSelect";
import ParticleBackground from "@/components/ParticleBackground";

type Screen = "menu" | "character";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("menu");

  const handleNewGame = () => {
    setCurrentScreen("character");
  };

  const handleLoadGame = () => {
    toast("Spielstand laden", {
      description: "Diese Funktion wird bald verfügbar sein.",
    });
  };

  const handleSettings = () => {
    toast("Einstellungen", {
      description: "Diese Funktion wird bald verfügbar sein.",
    });
  };

  const handleExit = () => {
    toast("Exit", {
      description: "Das Spiel läuft im Browser und kann nicht direkt geschlossen werden.",
    });
  };

  const handleSelectCharacter = (character: string) => {
    const characterNames: Record<string, string> = {
      ritter: "Ritter",
      magier: "Magier",
      irrlicht: "Irrlicht",
    };
    toast(`${characterNames[character]} gewählt!`, {
      description: "Dein Abenteuer beginnt bald...",
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
      </div>
    </main>
  );
};

export default Index;
