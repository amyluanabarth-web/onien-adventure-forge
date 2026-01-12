import { createContext, useContext, useState, ReactNode, useEffect } from "react";

export type TextSize = "small" | "medium" | "large";

interface SettingsContextType {
  textSize: TextSize;
  setTextSize: (size: TextSize) => void;
  masterVolume: number;
  setMasterVolume: (volume: number) => void;
  musicVolume: number;
  setMusicVolume: (volume: number) => void;
  soundVolume: number;
  setSoundVolume: (volume: number) => void;
  censoring: boolean;
  setCensoring: (enabled: boolean) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const [textSize, setTextSize] = useState<TextSize>("medium");
  const [masterVolume, setMasterVolume] = useState(100);
  const [musicVolume, setMusicVolume] = useState(80);
  const [soundVolume, setSoundVolume] = useState(80);
  const [censoring, setCensoring] = useState(false);

  // Apply text size to document root
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-text-size", textSize);
  }, [textSize]);

  return (
    <SettingsContext.Provider
      value={{
        textSize,
        setTextSize,
        masterVolume,
        setMasterVolume,
        musicVolume,
        setMusicVolume,
        soundVolume,
        setSoundVolume,
        censoring,
        setCensoring,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error("useSettings must be used within a SettingsProvider");
  }
  return context;
};
