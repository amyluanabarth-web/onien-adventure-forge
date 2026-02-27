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
    enterName: "Enter your name",
    namePlaceholder: "Your name...",
    submitName: "Continue",

    // Wisp Dialog
    wispDialog1: "The forest hums with an eerie glow. Twisted roots claw at the mossy ground, and the air smells of damp earth and something... ancient. You drift between the luminescent mushrooms, your faint light flickering nervously.",
    wispDialog2: "You've gotten separated from the others again. The familiar paths have shifted — or maybe you never knew them at all. Every direction looks the same: dark, tangled, alive.",
    wispDialog3: "Hey. Hey! Over here, you little fool.",
    wispDialog4: "A brighter glow pulses through the undergrowth — your brother, Erryn, pushing through a curtain of hanging moss. His light burns steadier than yours, sharper. He always did burn brighter.",
    wispDialog5: "I told you to stay close. Do you have any idea how deep we've wandered? This part of the woods... things live here that don't like our kind.",
    wispDialog6: "I didn't mean to drift off. Something was calling to me — a sound, like singing, but...",
    wispDialog7: "Stop. Don't follow sounds you can't name. That's the first rule, and you know it.",
    wispDialog8: "He hovers closer, his glow wrapping around yours like a protective shell. For a moment, the darkness pulls back.",
    wispDialog9: "Stay behind me. We'll find the trail back. And this time — don't. Wander. Off.",
    wispDialog10: "...Okay. I'm sorry, Erryn.",
    wispDialog11: "Don't be sorry. Be careful. Now come on — before the forest notices us.",

    // Choice
    choicePrompt: "The path splits ahead. Which way do you go?",
    choiceRoad: "Take the rundown road",
    choiceRoadDesc: "An old overgrown path, barely visible through the brush.",
    choiceSounds: "Follow the loud sounds",
    choiceSoundsDesc: "Crashing and shouting echoes from deeper in the forest.",

    // Path A - Rundown Road
    roadDialog1: "You drift down the crumbling path. Erryn follows reluctantly, his glow dimming with unease. The trees thin out, revealing ruts in the earth — an old road, long forgotten.",
    roadDialog2: "The road bends sharply. Beyond the turn, something large blocks the way — the wreckage of a coach, its wheels shattered, its frame twisted against a fallen oak.",
    roadDialog3: "Wait... do you hear that?",
    roadDialog4: "A faint groan rises from inside the overturned coach. You drift closer and see a figure — an old man, pinned beneath a collapsed beam. His robes are torn, and his breathing is shallow.",
    roadDialog5: "Please... someone... I can't feel my legs...",
    roadDialog6: "Erryn, we have to help him!",
    roadDialog7: "We don't even have hands, {player}. We're wisps. But... maybe our light can do something. Focus — push your glow into the beam. Together.",
    roadDialog8: "You and Erryn press your lights against the heavy wood. It groans, shifts — and with a burst of combined radiance, the beam slides free. The old man gasps, pulling himself onto the mossy ground.",
    roadDialog9: "Bless you... bless you both. I am Aldric. I was carrying something important... something that must not fall into the wrong hands.",
    roadDialog10: "He clutches a leather satchel to his chest, his eyes wide with a fear that has nothing to do with his injuries.",
    roadDialog11: "The forest is not safe tonight. Dark things move between the trees. You two... you saved my life. Perhaps fate brought you here for a reason.",

    // Path B - Loud Sounds
    soundDialog1: "Against Erryn's protests, you follow the sounds deeper into the forest. The crashing grows louder — steel on steel, punctuated by bursts of crackling energy.",
    soundDialog2: "{player}, this is a terrible idea. Whatever is making that noise could squash us without even noticing.",
    soundDialog3: "You push through a wall of brambles and freeze. A clearing opens before you, lit by flashes of arcane fire and the gleam of polished armor.",
    soundDialog4: "A knight in battered plate swings a massive blade at a robed figure — a mage, who deflects each blow with shimmering barriers of violet light. The ground around them is scorched and torn.",
    soundDialog5: "You dare steal from the Order? That grimoire belongs to Vael'Khar!",
    soundDialog6: "It belongs to no one, you blind fool! If your masters unseal it, everything burns!",
    soundDialog7: "A stray bolt of arcane energy tears through the undergrowth — straight toward you. Erryn shoves you aside just in time, but the blast scatters your light across the clearing.",
    soundDialog8: "Both combatants freeze, staring at the two flickering wisps now exposed in the open.",
    soundDialog9: "What in the—? Wisps? Here?",
    soundDialog10: "The mage lowers her staff, eyes narrowing. The knight keeps his blade raised but doesn't advance. For a heartbeat, everything is still.",
    soundDialog11: "You shouldn't be here, little lights. This forest is a battlefield tonight. Run — before you become collateral.",
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
    enterName: "Gib deinen Namen ein",
    namePlaceholder: "Dein Name...",
    submitName: "Weiter",

    // Wisp Dialog
    wispDialog1: "Der Wald summt in einem unheimlichen Leuchten. Verdrehte Wurzeln krallen sich am moosigen Boden fest, und die Luft riecht nach feuchter Erde und etwas... Uraltem. Du treibst zwischen den leuchtenden Pilzen umher, dein schwaches Licht flackert nervös.",
    wispDialog2: "Du hast dich wieder von den anderen getrennt. Die vertrauten Pfade haben sich verschoben — oder vielleicht kanntest du sie nie. Jede Richtung sieht gleich aus: dunkel, verwachsen, lebendig.",
    wispDialog3: "Hey. Hey! Hier drüben, du kleiner Narr.",
    wispDialog4: "Ein helleres Leuchten pulsiert durch das Unterholz — dein Bruder Erryn, der sich durch einen Vorhang aus hängendem Moos schiebt. Sein Licht brennt gleichmäßiger als deines, schärfer. Er brannte schon immer heller.",
    wispDialog5: "Ich hab dir gesagt, du sollst in der Nähe bleiben. Hast du eine Ahnung, wie tief wir gewandert sind? Dieser Teil des Waldes... hier leben Dinge, die unsere Art nicht mögen.",
    wispDialog6: "Ich wollte nicht abdriften. Etwas hat mich gerufen — ein Klang, wie Gesang, aber...",
    wispDialog7: "Hör auf. Folge keinen Klängen, die du nicht benennen kannst. Das ist die erste Regel, und du kennst sie.",
    wispDialog8: "Er schwebt näher, sein Leuchten umhüllt deines wie eine schützende Hülle. Für einen Moment weicht die Dunkelheit zurück.",
    wispDialog9: "Bleib hinter mir. Wir finden den Weg zurück. Und diesmal — nicht. Herumirren.",
    wispDialog10: "...Okay. Tut mir leid, Erryn.",
    wispDialog11: "Sei nicht traurig. Sei vorsichtig. Und jetzt komm — bevor der Wald uns bemerkt.",

    // Choice
    choicePrompt: "Der Weg teilt sich. Welchen Weg nehmt ihr?",
    choiceRoad: "Den verfallenen Weg nehmen",
    choiceRoadDesc: "Ein alter, überwucherter Pfad, kaum sichtbar durch das Gestrüpp.",
    choiceSounds: "Den lauten Geräuschen folgen",
    choiceSoundsDesc: "Krachen und Rufe hallen aus der Tiefe des Waldes.",

    // Path A - Rundown Road
    roadDialog1: "Ihr schwebt den bröckelnden Pfad entlang. Erryn folgt widerwillig, sein Leuchten wird vor Unbehagen schwächer. Die Bäume lichten sich und offenbaren Spurrillen in der Erde — eine alte Straße, längst vergessen.",
    roadDialog2: "Die Straße biegt scharf ab. Hinter der Kurve versperrt etwas Großes den Weg — das Wrack einer Kutsche, ihre Räder zersplittert, ihr Rahmen gegen eine umgestürzte Eiche verdreht.",
    roadDialog3: "Warte... hörst du das?",
    roadDialog4: "Ein schwaches Stöhnen erhebt sich aus der umgestürzten Kutsche. Du schwebst näher und siehst eine Gestalt — ein alter Mann, eingeklemmt unter einem eingestürzten Balken. Seine Roben sind zerrissen und sein Atem ist flach.",
    roadDialog5: "Bitte... jemand... ich kann meine Beine nicht spüren...",
    roadDialog6: "Erryn, wir müssen ihm helfen!",
    roadDialog7: "Wir haben nicht einmal Hände, {player}. Wir sind Irrlichter. Aber... vielleicht kann unser Licht etwas bewirken. Konzentrier dich — drück dein Leuchten in den Balken. Zusammen.",
    roadDialog8: "Du und Erryn presst euer Licht gegen das schwere Holz. Es ächzt, verschiebt sich — und mit einem Ausbruch vereinter Strahlung gleitet der Balken frei. Der alte Mann schnappt nach Luft und zieht sich auf den moosigen Boden.",
    roadDialog9: "Seid gesegnet... seid beide gesegnet. Ich bin Aldric. Ich habe etwas Wichtiges transportiert... etwas, das nicht in die falschen Hände fallen darf.",
    roadDialog10: "Er presst eine Ledertasche an seine Brust, seine Augen weit aufgerissen vor einer Angst, die nichts mit seinen Verletzungen zu tun hat.",
    roadDialog11: "Der Wald ist heute Nacht nicht sicher. Dunkle Dinge bewegen sich zwischen den Bäumen. Ihr zwei... ihr habt mein Leben gerettet. Vielleicht hat das Schicksal euch aus einem Grund hierher geführt.",

    // Path B - Loud Sounds
    soundDialog1: "Gegen Erryns Protest folgt ihr den Geräuschen tiefer in den Wald. Das Krachen wird lauter — Stahl auf Stahl, unterbrochen von knisternden Energieausbrüchen.",
    soundDialog2: "{player}, das ist eine furchtbare Idee. Was auch immer diesen Lärm macht, könnte uns zerquetschen, ohne es zu bemerken.",
    soundDialog3: "Ihr drängt euch durch eine Wand aus Dornen und erstarrt. Eine Lichtung öffnet sich vor euch, erhellt von Blitzen arkanen Feuers und dem Glanz polierter Rüstung.",
    soundDialog4: "Ein Ritter in ramponierter Plattenrüstung schwingt eine massive Klinge gegen eine Gestalt in Roben — eine Magierin, die jeden Schlag mit schimmernden Barrieren aus violettem Licht abwehrt. Der Boden um sie herum ist versengt und aufgerissen.",
    soundDialog5: "Du wagst es, vom Orden zu stehlen? Das Grimoire gehört Vael'Khar!",
    soundDialog6: "Es gehört niemandem, du blinder Narr! Wenn deine Meister es entsiegeln, verbrennt alles!",
    soundDialog7: "Ein verirrter Blitz arkaner Energie reißt durch das Unterholz — direkt auf euch zu. Erryn stößt dich gerade noch rechtzeitig beiseite, aber die Explosion zerstreut euer Licht über die Lichtung.",
    soundDialog8: "Beide Kämpfer erstarren und starren auf die zwei flackernden Irrlichter, die nun ungeschützt in der offenen Lichtung schweben.",
    soundDialog9: "Was zum—? Irrlichter? Hier?",
    soundDialog10: "Die Magierin senkt ihren Stab, die Augen zusammengekniffen. Der Ritter hält seine Klinge erhoben, rückt aber nicht vor. Für einen Herzschlag ist alles still.",
    soundDialog11: "Ihr solltet nicht hier sein, kleine Lichter. Dieser Wald ist heute Nacht ein Schlachtfeld. Lauft — bevor ihr zu Kollateralschaden werdet.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
