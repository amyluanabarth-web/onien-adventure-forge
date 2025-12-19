import { MenuButton } from "@/components/ui/menu-button";
import { Sword, Sparkles, Flame } from "lucide-react";

interface CharacterSelectProps {
  onSelectCharacter: (character: string) => void;
  onBack: () => void;
}

const characters = [
  {
    id: "ritter",
    name: "Ritter",
    icon: Sword,
    description: "Meister des Schwertes und der Verteidigung",
  },
  {
    id: "magier",
    name: "Magier",
    icon: Sparkles,
    description: "Beherrscher arkaner Künste",
  },
  {
    id: "irrlicht",
    name: "Irrlicht",
    icon: Flame,
    description: "Mystischer Wanderer zwischen den Welten",
  },
];

const CharacterSelect = ({ onSelectCharacter, onBack }: CharacterSelectProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-[0.2em] text-foreground">
          Charakterwahl
        </h1>
        <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* Character cards */}
      <div className="grid gap-6 w-full max-w-md mb-8">
        {characters.map((char, index) => (
          <button
            key={char.id}
            onClick={() => onSelectCharacter(char.id)}
            className="group relative flex items-center gap-6 p-6 border border-border bg-card/50 backdrop-blur-sm transition-all duration-300 hover:border-primary hover:bg-card hover:box-glow animate-fade-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Icon */}
            <div className="flex-shrink-0 w-14 h-14 flex items-center justify-center border border-primary/30 bg-secondary/50 transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10">
              <char.icon className="w-7 h-7 text-primary transition-transform duration-300 group-hover:scale-110" />
            </div>

            {/* Text */}
            <div className="text-left">
              <h3 className="font-display text-xl tracking-wider text-foreground transition-colors duration-300 group-hover:text-primary group-hover:text-glow-subtle">
                {char.name}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {char.description}
              </p>
            </div>

            {/* Corner decorations */}
            <span className="absolute top-0 left-0 w-2 h-2 border-l border-t border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-3 group-hover:h-3" />
            <span className="absolute top-0 right-0 w-2 h-2 border-r border-t border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-3 group-hover:h-3" />
            <span className="absolute bottom-0 left-0 w-2 h-2 border-l border-b border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-3 group-hover:h-3" />
            <span className="absolute bottom-0 right-0 w-2 h-2 border-r border-b border-primary/40 transition-all duration-300 group-hover:border-primary group-hover:w-3 group-hover:h-3" />
          </button>
        ))}
      </div>

      {/* Back button */}
      <MenuButton onClick={onBack} variant="secondary" className="max-w-[200px]">
        Zurück
      </MenuButton>
    </div>
  );
};

export default CharacterSelect;
