import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { SettingsProvider } from "@/contexts/SettingsContext";

createRoot(document.getElementById("root")!).render(
  <LanguageProvider>
    <SettingsProvider>
      <App />
    </SettingsProvider>
  </LanguageProvider>
);
