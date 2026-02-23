import { useState, useEffect } from "react";
import { MenuButton } from "@/components/ui/menu-button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";

interface StoryIntroProps {
  character: string;
  onContinue: () => void;
}

const StoryIntro = ({ character, onContinue }: StoryIntroProps) => {
  const { t } = useLanguage();
  const [showContent, setShowContent] = useState(false);
  const [name, setName] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onContinue();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      <div
        className="relative z-10 max-w-md w-full text-center transition-all duration-[1500ms] ease-out"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Decorative top line */}
        <div className="h-px w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Label */}
        <p className="text-foreground/90 text-lg md:text-xl tracking-wide mb-8 font-display">
          {t("enterName")}
        </p>

        {/* Name input form */}
        <form onSubmit={handleSubmit} className="flex flex-col items-center gap-6">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("namePlaceholder")}
            className="text-center bg-background/50 border-primary/20 focus:border-primary/50 text-foreground text-lg py-6"
            autoFocus
          />

          <MenuButton
            onClick={handleSubmit}
            className="max-w-[220px] w-full mx-auto"
          >
            {t("submitName")}
          </MenuButton>
        </form>

        {/* Decorative bottom line */}
        <div className="h-px w-24 mx-auto mt-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
    </div>
  );
};

export default StoryIntro;
