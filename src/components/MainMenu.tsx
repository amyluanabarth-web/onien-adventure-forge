import { MenuButton } from "@/components/ui/menu-button";
import { useLanguage } from "@/contexts/LanguageContext";

interface MainMenuProps {
  onNewGame: () => void;
  onLoadGame: () => void;
  onSettings: () => void;
  onExit: () => void;
}

const MainMenu = ({ onNewGame, onLoadGame, onSettings, onExit }: MainMenuProps) => {
  const { t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* Title */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-[0.3em] text-primary text-glow animate-pulse-glow">
          {t("title")}
        </h1>
        <div className="mt-4 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* Menu buttons */}
      <nav className="flex flex-col gap-4 w-full max-w-xs" aria-label="Main Menu">
        <MenuButton onClick={onNewGame}>
          {t("newGame")}
        </MenuButton>
        <MenuButton onClick={onLoadGame}>
          {t("saves")}
        </MenuButton>
        <MenuButton onClick={onSettings}>
          {t("settings")}
        </MenuButton>
        <MenuButton onClick={onExit} variant="secondary">
          {t("exit")}
        </MenuButton>
      </nav>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center">
        <p className="text-sm text-muted-foreground tracking-wider font-display">
          {t("subtitle")}
        </p>
      </footer>
    </div>
  );
};

export default MainMenu;
