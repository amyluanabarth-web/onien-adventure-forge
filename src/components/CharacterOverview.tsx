import { MenuButton } from "@/components/ui/menu-button";
import { useLanguage } from "@/contexts/LanguageContext";
import knightPortrait from "@/assets/knight-portrait.png";
import magePortrait from "@/assets/mage-portrait.png";
import wispPortrait from "@/assets/wisp-portrait.png";

interface CharacterOverviewProps {
  character: string;
  onContinue: () => void;
  onBack: () => void;
}

const characterData = {
  knight: {
    nameKey: "knight" as const,
    loreKey: "knightLore" as const,
    image: knightPortrait,
  },
  mage: {
    nameKey: "mage" as const,
    loreKey: "mageLore" as const,
    image: magePortrait,
  },
  wisp: {
    nameKey: "wisp" as const,
    loreKey: "wispLore" as const,
    image: wispPortrait,
  },
};

const CharacterOverview = ({ character, onContinue, onBack }: CharacterOverviewProps) => {
  const { t } = useLanguage();
  const data = characterData[character as keyof typeof characterData];

  if (!data) return null;

  return (
    <div className="flex items-center justify-center min-h-screen px-6 py-12 animate-fade-in">
      <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16 max-w-5xl">
        {/* Character Portrait - Left Side */}
        <div className="relative group shrink-0">
          {/* Frame decorations */}
          <div className="absolute -inset-4 border border-primary/30 transition-all duration-500 group-hover:border-primary/60" />
          <div className="absolute -inset-2 border border-primary/20" />
          
          {/* Corner accents */}
          <span className="absolute -top-4 -left-4 w-6 h-6 border-l-2 border-t-2 border-primary" />
          <span className="absolute -top-4 -right-4 w-6 h-6 border-r-2 border-t-2 border-primary" />
          <span className="absolute -bottom-4 -left-4 w-6 h-6 border-l-2 border-b-2 border-primary" />
          <span className="absolute -bottom-4 -right-4 w-6 h-6 border-r-2 border-b-2 border-primary" />
          
          {/* Image */}
          <img
            src={data.image}
            alt={t(data.nameKey)}
            className="w-64 md:w-80 h-auto object-cover transition-all duration-500 group-hover:brightness-110"
          />
          
          {/* Glow effect */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-60" />
        </div>

        {/* Right Side - Name, Description, Buttons */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
          {/* Character Name */}
          <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-[0.2em] text-foreground mb-2 text-glow">
            {t(data.nameKey)}
          </h1>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-primary/60 to-transparent mb-8" />

          {/* Cryptic Description */}
          <div className="max-w-lg mb-10">
            <p className="text-muted-foreground text-lg leading-relaxed italic font-serif">
              "{t(data.loreKey)}"
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <MenuButton onClick={onContinue} className="min-w-[180px]">
              {t("continueGame")}
            </MenuButton>
            <MenuButton onClick={onBack} variant="secondary" className="min-w-[180px]">
              {t("backToCharacters")}
            </MenuButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterOverview;
