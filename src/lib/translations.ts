export type Language = "en" | "de";

export const translations = {
  en: {
    // Main Menu
    title: "ÄONIEN",
    subtitle: "An interactive fantasy adventure",
    newGame: "New Game",
    saves: "Saves",
    settings: "Settings",
    exit: "Exit",
    
    // Character Select
    characterSelect: "Character Select",
    back: "Back",
    knight: "Knight",
    knightDesc: "Master of sword and defense",
    mage: "Mage",
    mageDesc: "Wielder of arcane arts",
    wisp: "Wisp",
    wispDesc: "Mystical wanderer between worlds",
    
    // Settings
    language: "Language",
    english: "English",
    german: "German",
    
    // Toasts
    loadGameTitle: "Load Game",
    loadGameDesc: "This feature will be available soon.",
    exitTitle: "Exit",
    exitDesc: "The game runs in the browser and cannot be closed directly.",
    characterChosen: "chosen!",
    adventureBegins: "Your adventure begins soon...",
  },
  de: {
    // Main Menu
    title: "ÄONIEN",
    subtitle: "Ein interaktives Fantasy-Abenteuer",
    newGame: "Neues Spiel",
    saves: "Spielstände",
    settings: "Einstellungen",
    exit: "Beenden",
    
    // Character Select
    characterSelect: "Charakterwahl",
    back: "Zurück",
    knight: "Ritter",
    knightDesc: "Meister des Schwertes und der Verteidigung",
    mage: "Magier",
    mageDesc: "Beherrscher arkaner Künste",
    wisp: "Irrlicht",
    wispDesc: "Mystischer Wanderer zwischen den Welten",
    
    // Settings
    language: "Sprache",
    english: "Englisch",
    german: "Deutsch",
    
    // Toasts
    loadGameTitle: "Spielstand laden",
    loadGameDesc: "Diese Funktion wird bald verfügbar sein.",
    exitTitle: "Beenden",
    exitDesc: "Das Spiel läuft im Browser und kann nicht direkt geschlossen werden.",
    characterChosen: "gewählt!",
    adventureBegins: "Dein Abenteuer beginnt bald...",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
