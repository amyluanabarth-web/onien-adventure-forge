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
  const [displayedText, setDisplayedText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const [showContent, setShowContent] = useState(false);

  const fullText = t(storyKeys[character] || "knightStoryIntro");

  // Fade in after mount
  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (!showContent) return;

    let index = 0;
    setDisplayedText("");
    setIsComplete(false);

    const interval = setInterval(() => {
      index++;
      setDisplayedText(fullText.slice(0, index));
      if (index >= fullText.length) {
        clearInterval(interval);
        setIsComplete(true);
      }
    }, 35);

    return () => clearInterval(interval);
  }, [fullText, showContent]);

  // Allow skipping the typewriter
  const handleSkip = () => {
    setDisplayedText(fullText);
    setIsComplete(true);
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen px-6 cursor-pointer"
      onClick={!isComplete ? handleSkip : undefined}
    >
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
        className="relative z-10 max-w-2xl text-center transition-all duration-1000"
        style={{
          opacity: showContent ? 1 : 0,
          transform: showContent ? "translateY(0)" : "translateY(20px)",
        }}
      >
        {/* Decorative top line */}
        <div className="h-px w-24 mx-auto mb-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

        {/* Character name - subtle */}
        <p className="text-xs tracking-[0.5em] uppercase text-primary/60 mb-6 font-display">
          {t(character as "knight" | "mage" | "wisp")}
        </p>

        {/* Story text with typewriter */}
        <p className="text-foreground/90 text-lg md:text-xl leading-relaxed font-serif italic">
          "{displayedText}
          {!isComplete && (
            <span className="inline-block w-0.5 h-5 bg-primary/80 ml-0.5 animate-pulse align-middle" />
          )}
          {isComplete && '"'}
        </p>

        {/* Decorative bottom line */}
        <div
          className="h-px w-24 mx-auto mt-8 bg-gradient-to-r from-transparent via-primary/40 to-transparent transition-opacity duration-500"
          style={{ opacity: isComplete ? 1 : 0 }}
        />

        {/* Continue button - appears after text completes */}
        <div
          className="mt-10 transition-all duration-700"
          style={{
            opacity: isComplete ? 1 : 0,
            transform: isComplete ? "translateY(0)" : "translateY(10px)",
            pointerEvents: isComplete ? "auto" : "none",
          }}
        >
          <MenuButton onClick={onContinue} className="max-w-[220px] mx-auto">
            {t("storyBegin")}
          </MenuButton>
        </div>

        {/* Skip hint */}
        {!isComplete && (
          <p className="text-muted-foreground/40 text-xs mt-8 tracking-widest font-display">
            — click to skip —
          </p>
        )}
      </div>
    </div>
  );
};

export default StoryIntro;
