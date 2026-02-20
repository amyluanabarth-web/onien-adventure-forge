export type Language = "en" | "de";

export const languages: { value: Language; label: string }[] = [
  { value: "en", label: "English" },
  { value: "de", label: "Deutsch" },
];

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
    
    // Character Overview
    continueGame: "Continue",
    backToCharacters: "Back to Characters",
    knightLore: "Forged in forgotten wars, the Knight carries the weight of a thousand fallen oaths. Their armor bears scars that whisper of battles against things that should not exist.",
    mageLore: "They who read the stars found only madness written there. Now the Mage speaks in tongues of fire and frost, their mind a bridge between realms best left unopened.",
    wispLore: "Neither living nor dead, the Wisp drifts through the veil. Some say they are echoes of souls that refused to fade, others whisper they are harbingers of what lies beyond.",
    
    // Settings
    language: "Language",
    english: "English",
    german: "German",
    audio: "Audio",
    masterVolume: "Master Volume",
    musicVolume: "Music Volume",
    soundVolume: "Sound Effects",
    textSize: "Text Size",
    textSizeSmall: "Small",
    textSizeMedium: "Medium",
    textSizeLarge: "Large",
    censoring: "Content Filter",
    censoringDesc: "Hide mature content",
    
    // Toasts
    loadGameTitle: "Load Game",
    loadGameDesc: "This feature will be available soon.",
    exitTitle: "Exit",
    exitDesc: "The game runs in the browser and cannot be closed directly.",
    characterChosen: "chosen!",
    adventureBegins: "Your adventure begins soon...",

    // Story Intros
    knightStoryIntro: "The fortress of Vael'Khar crumbles at the edge of the world. You stand before its shattered gates — the last knight of a forgotten order. Your blade hums with an oath sworn to a dead king. Beyond the threshold, something ancient stirs... and it remembers your name.",
    mageStoryIntro: "The Obsidian Library has been sealed for three hundred years. Tonight, the wards have failed. You feel the forbidden knowledge calling from within — whispers that taste of starlight and ash. Your hands tremble not from fear, but from hunger. The first page turns itself.",
    wispStoryIntro: "You awaken in the space between heartbeats. The mortal world flickers like candlelight around you — translucent, fragile, fading. A thread of silver light stretches before you into the dark. Something at the other end is pulling. You do not remember who you were. But you remember how to follow.",
    storyBegin: "Begin your journey",
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
    
    // Character Overview
    continueGame: "Weiter",
    backToCharacters: "Zurück zur Auswahl",
    knightLore: "Geschmiedet in vergessenen Kriegen, trägt der Ritter die Last tausend gebrochener Eide. Seine Rüstung trägt Narben, die von Kämpfen gegen Dinge flüstern, die nicht existieren sollten.",
    mageLore: "Jene, die die Sterne lasen, fanden dort nur Wahnsinn geschrieben. Nun spricht der Magier in Zungen aus Feuer und Frost, sein Geist eine Brücke zwischen Reichen, die besser verschlossen blieben.",
    wispLore: "Weder lebend noch tot, schwebt das Irrlicht durch den Schleier. Manche sagen, sie seien Echos von Seelen, die sich weigerten zu verblassen, andere flüstern, sie seien Vorboten dessen, was jenseits liegt.",
    
    // Settings
    language: "Sprache",
    english: "Englisch",
    german: "Deutsch",
    audio: "Audio",
    masterVolume: "Gesamtlautstärke",
    musicVolume: "Musiklautstärke",
    soundVolume: "Soundeffekte",
    textSize: "Textgröße",
    textSizeSmall: "Klein",
    textSizeMedium: "Mittel",
    textSizeLarge: "Groß",
    censoring: "Inhaltsfilter",
    censoringDesc: "Nicht jugendfreie Inhalte ausblenden",
    
    // Toasts
    loadGameTitle: "Spielstand laden",
    loadGameDesc: "Diese Funktion wird bald verfügbar sein.",
    exitTitle: "Beenden",
    exitDesc: "Das Spiel läuft im Browser und kann nicht direkt geschlossen werden.",
    characterChosen: "gewählt!",
    adventureBegins: "Dein Abenteuer beginnt bald...",

    // Story Intros
    knightStoryIntro: "Die Festung von Vael'Khar zerbröckelt am Rand der Welt. Du stehst vor ihren zerschmetterten Toren — der letzte Ritter eines vergessenen Ordens. Deine Klinge summt mit einem Eid, geschworen einem toten König. Jenseits der Schwelle regt sich etwas Uraltes... und es erinnert sich an deinen Namen.",
    mageStoryIntro: "Die Obsidian-Bibliothek war dreihundert Jahre versiegelt. Heute Nacht haben die Schutzzauber versagt. Du spürst das verbotene Wissen, das aus dem Inneren ruft — Flüstern, das nach Sternenlicht und Asche schmeckt. Deine Hände zittern nicht vor Angst, sondern vor Hunger. Die erste Seite blättert sich von selbst um.",
    wispStoryIntro: "Du erwachst im Raum zwischen Herzschlägen. Die sterbliche Welt flackert wie Kerzenlicht um dich — durchscheinend, zerbrechlich, verblassend. Ein silberner Lichtfaden erstreckt sich vor dir in die Dunkelheit. Etwas am anderen Ende zieht. Du erinnerst dich nicht, wer du warst. Aber du erinnerst dich, wie man folgt.",
    storyBegin: "Beginne deine Reise",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
