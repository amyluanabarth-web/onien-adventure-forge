import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Language, translations } from "@/lib/translations";

export type TextSize = "small" | "medium" | "large";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations.en) => string;
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const textSizeClasses: Record<TextSize, string> = {
  small: "text-size-small",
  medium: "text-size-medium",
  large: "text-size-large",
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");
  const [textSize, setTextSize] = useState<TextSize>("medium");

  useEffect(() => {
    const root = document.documentElement;
    Object.values(textSizeClasses).forEach((cls) => root.classList.remove(cls));
    root.classList.add(textSizeClasses[textSize]);
  }, [textSize]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[language][key];
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, textSize, setTextSize }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
