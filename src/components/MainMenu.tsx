import { MenuButton } from "@/components/ui/menu-button";

interface MainMenuProps {
  onNewGame: () => void;
  onLoadGame: () => void;
  onSettings: () => void;
  onExit: () => void;
}

const MainMenu = ({ onNewGame, onLoadGame, onSettings, onExit }: MainMenuProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* Title */}
      <div className="mb-16 text-center">
        <h1 className="text-5xl md:text-7xl font-display font-bold tracking-[0.3em] text-primary text-glow animate-pulse-glow">
          ÄONIEN
        </h1>
        <div className="mt-4 h-px w-48 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* Menu buttons */}
      <nav className="flex flex-col gap-4 w-full max-w-xs" aria-label="Hauptmenü">
        <MenuButton onClick={onNewGame}>
          New Game
        </MenuButton>
        <MenuButton onClick={onLoadGame}>
          Saves
        </MenuButton>
        <MenuButton onClick={onSettings}>
          Einstellungen
        </MenuButton>
        <MenuButton onClick={onExit} variant="secondary">
          Exit
        </MenuButton>
      </nav>

      {/* Footer */}
      <footer className="absolute bottom-8 text-center">
        <p className="text-sm text-muted-foreground tracking-wider font-display">
          Ein interaktives Fantasy-Abenteuer
        </p>
      </footer>
    </div>
  );
};

export default MainMenu;
