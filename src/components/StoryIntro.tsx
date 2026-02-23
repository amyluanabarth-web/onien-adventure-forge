import { useState, useEffect } from "react";
import { MenuButton } from "@/components/ui/menu-button";
import { useLanguage } from "@/contexts/LanguageContext";

interface StoryIntroProps {
  character: string;
  onContinue: () => void;
}

const storyKeys: Record<string, "knightStoryIntro" | "mageStoryIntro" | "wispStoryIntro"> = {
  knight: "knightStoryIntro",
  mage: "mageStoryIntro",
  wisp: "wispStoryIntro",
};

const StoryIntro = ({ character, onContinue }: StoryIntroProps) => {
  const { t } = useLanguage();
  const [showContent, setShowContent] = useState(false);

  const fullText = t(storyKeys[character] || "knightStoryIntro");

  // Fade in after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6">
      {/* Vignette overlay */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-1000"
        style={{
          background: "radial-gradient(ellipse at center, transparent 0%, hsl(220 25% 6% / 0.4) 50%, hsl(220 30% 4%) 100%)",
          opacity: showContent ? 1 : 0,
        }}
      />

      {/* Story text container */}
      <div
        className="relative z-10 max-w-2xl text-center transition-all duration-[2000ms] ease-out"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Decorative top line */}
        <div className="h-px w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Character name */}
        <p className="text-xs tracking-[0.5em] uppercase text-primary/60 mb-6 font-display">
          {t(character as "knight" | "mage" | "wisp")}
        </p>

        {/* Story text */}
        <p className="text-foreground/90 text-lg md:text-xl leading-relaxed font-serif italic">
          "{fullText}"
        </p>

        {/* Decorative bottom line */}
        <div className="h-px w-24 mx-auto mt-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Continue button */}
        <div
          className="mt-10 transition-all duration-700 delay-1000"
          style={{
            opacity: showContent ? 1 : 0,
            transform: showContent ? "translateY(0)" : "translateY(10px)",
          }}
        >
          <MenuButton onClick={onContinue} className="max-w-[220px] mx-auto">
            {t("storyBegin")}
          </MenuButton>
        </div>
      </div>
    </div>
  );
};

export default StoryIntro;
