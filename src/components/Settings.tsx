import { MenuButton } from "@/components/ui/menu-button";
import { useLanguage } from "@/contexts/LanguageContext";
import { languages } from "@/lib/translations";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SettingsProps {
  onBack: () => void;
}

const Settings = ({ onBack }: SettingsProps) => {
  const { language, setLanguage, t } = useLanguage();
  const [musicVolume, setMusicVolume] = useState(80);
  const [soundVolume, setSoundVolume] = useState(80);
  const [censoring, setCensoring] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* Title */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-[0.2em] text-foreground">
          {t("settings")}
        </h1>
        <div className="mt-4 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      <div className="w-full max-w-md space-y-6 mb-8">
        {/* Language setting */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="font-display text-xl tracking-wider text-foreground mb-4">
            {t("language")}
          </h3>
          <Select value={language} onValueChange={(value) => setLanguage(value as "en" | "de")}>
            <SelectTrigger className="w-full bg-card/80 border-border text-foreground">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {languages.map((lang) => (
                <SelectItem 
                  key={lang.value} 
                  value={lang.value}
                  className="text-foreground hover:bg-primary/20 focus:bg-primary/20"
                >
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Music Volume */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-xl tracking-wider text-foreground">
              {t("musicVolume")}
            </h3>
            <span className="text-muted-foreground font-display">{musicVolume}%</span>
          </div>
          <Slider
            value={[musicVolume]}
            onValueChange={(value) => setMusicVolume(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Sound Effects Volume */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-display text-xl tracking-wider text-foreground">
              {t("soundVolume")}
            </h3>
            <span className="text-muted-foreground font-display">{soundVolume}%</span>
          </div>
          <Slider
            value={[soundVolume]}
            onValueChange={(value) => setSoundVolume(value[0])}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        {/* Censoring Toggle */}
        <div className="p-6 border border-border bg-card/50 backdrop-blur-sm">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="font-display text-xl tracking-wider text-foreground">
                {t("censoring")}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {t("censoringDesc")}
              </p>
            </div>
            <Switch
              checked={censoring}
              onCheckedChange={setCensoring}
            />
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
