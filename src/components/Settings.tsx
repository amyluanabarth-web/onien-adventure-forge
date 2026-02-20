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
  const [masterVolume, setMasterVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(80);
  const [soundVolume, setSoundVolume] = useState(80);
  const [textSize, setTextSize] = useState<"small" | "medium" | "large">("medium");
  const [censoring, setCensoring] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 animate-fade-in">
      {/* Title */}
      <div className="mb-6 text-center">
        <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-[0.2em] text-foreground">
          {t("settings")}
        </h1>
        <div className="mt-3 h-px w-32 mx-auto bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
      </div>

      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        {/* Language setting */}
        <div className="p-4 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="font-display text-lg tracking-wider text-foreground mb-3">
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

        {/* Audio Settings - Combined Box */}
        <div className="p-4 border border-border bg-card/50 backdrop-blur-sm space-y-4">
          <h3 className="font-display text-lg tracking-wider text-foreground">
            {t("audio")}
          </h3>
          
          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">{t("masterVolume")}</span>
              <span className="text-xs text-muted-foreground font-display">{masterVolume}%</span>
            </div>
            <Slider value={[masterVolume]} onValueChange={(value) => setMasterVolume(value[0])} max={100} step={1} className="w-full" />
          </div>

          <div className="h-px w-full bg-border/50" />

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">{t("musicVolume")}</span>
              <span className="text-xs text-muted-foreground font-display">{musicVolume}%</span>
            </div>
            <Slider value={[musicVolume]} onValueChange={(value) => setMusicVolume(value[0])} max={100} step={1} className="w-full" />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-foreground">{t("soundVolume")}</span>
              <span className="text-xs text-muted-foreground font-display">{soundVolume}%</span>
            </div>
            <Slider value={[soundVolume]} onValueChange={(value) => setSoundVolume(value[0])} max={100} step={1} className="w-full" />
          </div>
        </div>

        {/* Text Size Setting */}
        <div className="p-4 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="font-display text-lg tracking-wider text-foreground mb-3">
            {t("textSize")}
          </h3>
          <div className="flex flex-col gap-2">
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => setTextSize(size)}
                className={`py-1.5 px-3 border transition-all duration-300 font-display tracking-wider text-sm ${
                  textSize === size
                    ? "border-primary bg-primary/20 text-foreground"
                    : "border-border bg-card/50 text-muted-foreground hover:border-primary/50 hover:text-foreground"
                }`}
              >
                {t(`textSize${size.charAt(0).toUpperCase() + size.slice(1)}` as "textSizeSmall" | "textSizeMedium" | "textSizeLarge")}
              </button>
            ))}
          </div>
        </div>

        {/* Censoring Toggle */}
        <div className="p-4 border border-border bg-card/50 backdrop-blur-sm">
          <h3 className="font-display text-lg tracking-wider text-foreground mb-2">
            {t("censoring")}
          </h3>
          <p className="text-xs text-muted-foreground mb-3">
            {t("censoringDesc")}
          </p>
          <Switch
            checked={censoring}
            onCheckedChange={setCensoring}
          />
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
