import { MenuButton } from "@/components/ui/menu-button";
import { useLanguage } from "@/contexts/LanguageContext";

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-[0.2em] text-foreground">
          {t("settings")}
        </h1>
        <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      {/* Language setting */}
      <div className="w-full max-w-md mb-8">
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="font-display text-xl tracking-wider text-foreground mb-4">
            {t("language")}
          </h3>
          <div className="flex gap-4">
            <button
              onClick={() => setLanguage("en")}
              className={`flex-1 py-3 px-4 border transition-all duration-300 font-display tracking-wider ${
                language === "en"
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-card/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t("english")}
            </button>
            <button
              onClick={() => setLanguage("de")}
              className={`flex-1 py-3 px-4 border transition-all duration-300 font-display tracking-wider ${
                language === "de"
                  ? "border-primary bg-primary/20 text-primary"
                  : "border-border bg-card/30 text-muted-foreground hover:border-primary/50 hover:text-foreground"
              }`}
            >
              {t("german")}
            </button>
          </div>
        </div>
      </div>

      {/* Back button */}
      <MenuButton onClick={onBack} variant="secondary" className="max-w-[200px]">
        {t("back")}
      </MenuButton>
    </div>
  );
};

export default Settings;
