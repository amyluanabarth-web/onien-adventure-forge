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

    // Pocket Menu
    pocketMenu: "Menu",
    backToMenu: "Back to Menu",
    openMap: "Map",
    saveGame: "Save Game",
    openSettings: "Settings",
    mapComingSoon: "The world map will be available soon.",

    // Save System
    saveSlots: "Save Slots",
    emptySlot: "Empty Slot",
    saveHere: "Save Here",
    deleteSave: "Delete",
    savedSuccessfully: "Game saved!",
    saveDeleted: "Save deleted.",
    chapter: "Chapter",
    chapterIntro: "The Awakening",
    chapterPathA: "The Rundown Road",
    chapterPathB: "Sounds in the Dark",
    chapterHelpAldric: "The Hunter's Trap",
    chapterLeaveAldric: "Narrow Escape",
    chapterIntervene: "A Fragile Truce",
    chapterFlee: "Flight Through Fire",
    close: "Close",

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

    // Path A - Choice 2: Help Aldric or not
    aldricChoicePrompt: "Aldric reaches out a trembling hand toward you. What do you do?",
    aldricChoiceHelp: "Help Aldric further",
    aldricChoiceHelpDesc: "He seems genuinely hurt. You can't just leave him here.",
    aldricChoiceLeave: "Listen to Erryn — leave him",
    aldricChoiceLeaveDesc: "Something feels wrong. Trust your brother's instincts.",

    // Path A2 - Help Aldric (Trap)
    helpDialog1: "You hover closer to Aldric, your glow warming his weathered face. He smiles — but there's something behind those eyes. Something cold.",
    helpDialog2: "Erryn, he needs our help. We can't just leave—",
    helpDialog3: "{player}, wait. Something's not right. His hands... look at his hands.",
    helpDialog4: "You glance down. Aldric's trembling fingers have stopped shaking. They're steady now — unnervingly steady — and they're tracing symbols in the dirt. Symbols that glow with a sickly green light.",
    helpDialog5: "Foolish little lights. You wisps are so predictable. Always drawn to suffering, always so eager to help.",
    helpDialog6: "The kindly old man is gone. Aldric rises to his feet with unnatural ease, the leather satchel falling open to reveal iron chains etched with binding runes.",
    helpDialog7: "I've been hunting your kind for thirty years. Wisp essence fetches a fortune in the dark markets. And you two... you walked right into my trap.",
    helpDialog8: "{player}! FLY! NOW!",
    helpDialog9: "The binding circle flares to life around you. Erryn slams his light against yours, pushing you out of the circle's edge — but he's caught inside. His glow flickers, dimming rapidly.",
    helpDialog10: "Your brother's light pulses weakly inside the trap. Aldric laughs, pulling the iron chains tight. You hover just beyond reach, terrified — but not helpless. Not yet.",
    helpDialog11: "I'm... I'm still here, {player}. It's cold. The runes... they're draining me. I can feel my light fading.",
    helpDialog12: "Hold on, Erryn! I won't leave you! I'll find a way to break you out!",
    helpDialog13: "Don't... don't be stupid. He's watching. Be smart, little brother. Be smarter than me.",

    // Path A2 choice - Save Erryn
    errynChoicePrompt: "Erryn is trapped! What do you do?",
    errynChoiceFight: "Attack the binding circle",
    errynChoiceFightDesc: "Pour all your light into breaking the runes.",
    errynChoiceDistract: "Distract Aldric",
    errynChoiceDistractDesc: "Lure him away from Erryn to buy time.",

    // Path A3 - Leave Aldric
    leaveDialog1: "You hesitate, then drift backward. Erryn's warning echoes in your mind. Something about this feels... staged.",
    leaveDialog2: "Wait — where are you going? I need your help! Please!",
    leaveDialog3: "Aldric's voice cracks with desperation, but Erryn pulls you away, his glow fierce and protective.",
    leaveDialog4: "I don't trust him, {player}. The crash, the timing, the way he looked at us — at our light. Like a merchant appraising goods.",
    leaveDialog5: "As you retreat down the road, you hear it — a snarl of frustration from behind. You glance back and see Aldric standing. Standing perfectly fine, his 'injuries' forgotten.",
    leaveDialog6: "Damn it! Thirty years of hunting and I get outsmarted by a pair of children!",
    leaveDialog7: "He kicks the overturned coach — which collapses far too easily, revealing hidden compartments full of iron chains and binding runes. It was all a trap.",
    leaveDialog8: "Erryn was right. You fly faster, the old road blurring beneath you. Behind you, Aldric's curses fade into the dark.",
    leaveDialog9: "That was a wisp hunter, {player}. I've heard the elders warn about them. They trap our kind and sell our essence.",
    leaveDialog10: "You shudder, your light flickering with residual fear. But you're safe. You're together. And you won't be fooled again.",

    // Path B - Choice 2: Intervene or flee
    battleChoicePrompt: "The knight and mage have noticed you. What do you do?",
    battleChoiceIntervene: "Try to intervene",
    battleChoiceInterveneDesc: "Maybe you can stop this fight before someone gets killed.",
    battleChoiceFlee: "Flee into the forest",
    battleChoiceFleeDesc: "This isn't your fight. Get out before it's too late.",

    // Path B2 - Intervene
    interveneDialog1: "Against every instinct, you pulse your light brighter — a blinding flare that makes both combatants shield their eyes.",
    interveneDialog2: "{player}, what are you DOING?!",
    interveneDialog3: "STOP FIGHTING! Both of you!",
    interveneDialog4: "The knight lowers his blade an inch, squinting at you through his visor. The mage's staff crackles but doesn't fire.",
    interveneDialog5: "A wisp... commanding us? You've got nerve, little light. Or you're suicidal.",
    interveneDialog6: "Wait. Wisps don't appear randomly. They're drawn to... convergences. Places where fate is being decided.",
    interveneDialog7: "The mage steps forward, her expression shifting from hostility to curiosity. She kneels to your level.",
    interveneDialog8: "Why are you here, little one? What did the forest show you?",
    interveneDialog9: "The knight sheathes his blade reluctantly. For now, the battle has paused — and something tells you this meeting was no accident.",
    interveneDialog10: "Perhaps these wisps are the sign I was waiting for. Very well, mage — we talk. But if you try anything...",

    // Path B3 - Flee
    fleeDialog1: "You don't need to be told twice. You and Erryn scatter into the undergrowth, your lights dimming to near-invisible embers.",
    fleeDialog2: "Go go go go GO!",
    fleeDialog3: "Behind you, the battle erupts again — fiercer now, as if your presence had been the only thing holding it back. A massive explosion of arcane energy shakes the ground.",
    fleeDialog4: "Trees splinter around you. A wave of violet fire tears through the canopy overhead. You tumble through the air, disoriented, separated from Erryn.",
    fleeDialog5: "ERRYN! Where are you?!",
    fleeDialog6: "Over... over here...",
    fleeDialog7: "You find him pressed against a boulder, his light barely a flicker. The shockwave hurt him — his glow is fractured, unstable.",
    fleeDialog8: "I'm okay... I'm okay. Just need a moment. That explosion — it wasn't normal magic, {player}. Whatever they're fighting over... it's dangerous.",
    fleeDialog9: "You huddle together behind the boulder as the sounds of battle slowly fade into the distance. Eventually, silence returns — heavy and watchful.",
    fleeDialog10: "We need to find the others, {player}. We need to warn them. Whatever is happening in this forest... it's bigger than us.",
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

    // Pocket Menu
    pocketMenu: "Menü",
    backToMenu: "Zurück zum Menü",
    openMap: "Karte",
    saveGame: "Speichern",
    openSettings: "Einstellungen",
    mapComingSoon: "Die Weltkarte wird bald verfügbar sein.",

    // Save System
    saveSlots: "Speicherplätze",
    emptySlot: "Leerer Platz",
    saveHere: "Hier speichern",
    deleteSave: "Löschen",
    savedSuccessfully: "Spiel gespeichert!",
    saveDeleted: "Spielstand gelöscht.",
    chapter: "Kapitel",
    chapterIntro: "Das Erwachen",
    chapterPathA: "Der verfallene Weg",
    chapterPathB: "Geräusche im Dunkel",
    chapterHelpAldric: "Die Falle des Jägers",
    chapterLeaveAldric: "Knappe Flucht",
    chapterIntervene: "Ein zerbrechlicher Waffenstillstand",
    chapterFlee: "Flucht durch das Feuer",
    close: "Schließen",

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

    // Path A - Choice 2
    aldricChoicePrompt: "Aldric streckt eine zitternde Hand nach euch aus. Was tut ihr?",
    aldricChoiceHelp: "Aldric weiter helfen",
    aldricChoiceHelpDesc: "Er scheint wirklich verletzt. Ihr könnt ihn nicht einfach hier lassen.",
    aldricChoiceLeave: "Auf Erryn hören — gehen",
    aldricChoiceLeaveDesc: "Etwas fühlt sich falsch an. Vertraut dem Instinkt eures Bruders.",

    // Path A2 - Help Aldric (Trap)
    helpDialog1: "Du schwebst näher an Aldric heran, dein Leuchten wärmt sein verwittertes Gesicht. Er lächelt — aber hinter diesen Augen ist etwas. Etwas Kaltes.",
    helpDialog2: "Erryn, er braucht unsere Hilfe. Wir können nicht einfach—",
    helpDialog3: "{player}, warte. Etwas stimmt nicht. Seine Hände... schau seine Hände an.",
    helpDialog4: "Du blickst hinunter. Aldrics zitternde Finger haben aufgehört zu beben. Sie sind jetzt ruhig — beunruhigend ruhig — und zeichnen Symbole in den Dreck. Symbole, die in einem kränklichen grünen Licht leuchten.",
    helpDialog5: "Törichte kleine Lichter. Ihr Irrlichter seid so vorhersehbar. Immer angezogen vom Leid, immer so eifrig zu helfen.",
    helpDialog6: "Der freundliche alte Mann ist verschwunden. Aldric erhebt sich mit unnatürlicher Leichtigkeit, die Ledertasche fällt auf und enthüllt eiserne Ketten, geätzt mit Bindungsrunen.",
    helpDialog7: "Ich jage eure Art seit dreißig Jahren. Irrlicht-Essenz bringt ein Vermögen auf den Schwarzmärkten. Und ihr zwei... ihr seid direkt in meine Falle gelaufen.",
    helpDialog8: "{player}! FLIEG! JETZT!",
    helpDialog9: "Der Bindungskreis flammt um euch auf. Erryn schleudert sein Licht gegen deines und stößt dich aus dem Rand des Kreises — aber er ist gefangen. Sein Leuchten flackert und wird schnell schwächer.",
    helpDialog10: "Das Licht deines Bruders pulsiert schwach in der Falle. Aldric lacht und zieht die Eisenketten straff. Du schwebst knapp außer Reichweite, verängstigt — aber nicht hilflos. Noch nicht.",
    helpDialog11: "Ich bin... ich bin noch hier, {player}. Es ist kalt. Die Runen... sie saugen mich aus. Ich spüre wie mein Licht verblasst.",
    helpDialog12: "Halt durch, Erryn! Ich werde dich nicht verlassen! Ich finde einen Weg, dich rauszuholen!",
    helpDialog13: "Sei... sei nicht dumm. Er beobachtet uns. Sei klug, kleiner Bruder. Klüger als ich.",

    // Path A2 choice
    errynChoicePrompt: "Erryn ist gefangen! Was tust du?",
    errynChoiceFight: "Den Bindungskreis angreifen",
    errynChoiceFightDesc: "Schütte all dein Licht hinein, um die Runen zu brechen.",
    errynChoiceDistract: "Aldric ablenken",
    errynChoiceDistractDesc: "Lock ihn von Erryn weg, um Zeit zu gewinnen.",

    // Path A3 - Leave
    leaveDialog1: "Du zögerst, dann treibst du zurück. Erryns Warnung hallt in deinem Kopf nach. Irgendetwas daran fühlt sich... inszeniert an.",
    leaveDialog2: "Wartet — wo geht ihr hin? Ich brauche eure Hilfe! Bitte!",
    leaveDialog3: "Aldrics Stimme bricht vor Verzweiflung, aber Erryn zieht dich weg, sein Leuchten wild und beschützend.",
    leaveDialog4: "Ich traue ihm nicht, {player}. Der Unfall, das Timing, die Art wie er uns angesehen hat — unser Licht. Wie ein Händler, der Ware bewertet.",
    leaveDialog5: "Als ihr euch die Straße zurückzieht, hört ihr es — ein Knurren der Frustration von hinten. Du blickst zurück und siehst Aldric stehen. Vollkommen unbeschadet stehen, seine ‚Verletzungen' vergessen.",
    leaveDialog6: "Verdammt! Dreißig Jahre Jagd und ich werde von einem Paar Kinder überlistet!",
    leaveDialog7: "Er tritt gegen die umgestürzte Kutsche — die viel zu leicht zusammenfällt und versteckte Fächer voller Eisenketten und Bindungsrunen enthüllt. Es war alles eine Falle.",
    leaveDialog8: "Erryn hatte recht. Ihr fliegt schneller, die alte Straße verschwimmt unter euch. Hinter euch verblassen Aldrics Flüche in der Dunkelheit.",
    leaveDialog9: "Das war ein Irrlichtjäger, {player}. Ich habe die Ältesten vor ihnen warnen hören. Sie fangen unsere Art und verkaufen unsere Essenz.",
    leaveDialog10: "Du schauderst, dein Licht flackert vor Restangst. Aber ihr seid sicher. Ihr seid zusammen. Und ihr werdet euch nicht wieder täuschen lassen.",

    // Path B - Choice 2
    battleChoicePrompt: "Der Ritter und die Magierin haben euch bemerkt. Was tut ihr?",
    battleChoiceIntervene: "Versuchen einzugreifen",
    battleChoiceInterveneDesc: "Vielleicht könnt ihr diesen Kampf stoppen, bevor jemand stirbt.",
    battleChoiceFlee: "In den Wald fliehen",
    battleChoiceFleeDesc: "Das ist nicht euer Kampf. Raus hier, solange es noch geht.",

    // Path B2 - Intervene
    interveneDialog1: "Gegen jeden Instinkt lässt du dein Licht heller pulsieren — ein blendender Blitz, der beide Kämpfer die Augen schützen lässt.",
    interveneDialog2: "{player}, was TUST du?!",
    interveneDialog3: "HÖRT AUF ZU KÄMPFEN! Ihr beide!",
    interveneDialog4: "Der Ritter senkt seine Klinge einen Zentimeter, blinzelt dich durch sein Visier an. Der Stab der Magierin knistert, aber feuert nicht.",
    interveneDialog5: "Ein Irrlicht... das uns Befehle gibt? Du hast Mut, kleines Licht. Oder du bist lebensmüde.",
    interveneDialog6: "Wartet. Irrlichter erscheinen nicht zufällig. Sie werden angezogen von... Konvergenzen. Orten, an denen das Schicksal entschieden wird.",
    interveneDialog7: "Die Magierin tritt vor, ihr Ausdruck wandelt sich von Feindseligkeit zu Neugier. Sie kniet sich auf eure Höhe.",
    interveneDialog8: "Warum seid ihr hier, Kleine? Was hat euch der Wald gezeigt?",
    interveneDialog9: "Der Ritter steckt widerwillig sein Schwert ein. Vorerst ist der Kampf pausiert — und etwas sagt dir, dass diese Begegnung kein Zufall war.",
    interveneDialog10: "Vielleicht sind diese Irrlichter das Zeichen, auf das ich gewartet habe. Gut, Magierin — wir reden. Aber wenn du irgendetwas versuchst...",

    // Path B3 - Flee
    fleeDialog1: "Man muss es euch nicht zweimal sagen. Du und Erryn zerstreut euch ins Unterholz, eure Lichter dimmen zu fast unsichtbaren Gluten.",
    fleeDialog2: "Los los los los LOS!",
    fleeDialog3: "Hinter euch bricht der Kampf erneut aus — heftiger jetzt, als hätte eure Anwesenheit ihn zurückgehalten. Eine massive Explosion arkaner Energie erschüttert den Boden.",
    fleeDialog4: "Bäume zersplittern um euch. Eine Welle violetten Feuers reißt durch das Blätterdach über euch. Ihr taumelt durch die Luft, desorientiert, von Erryn getrennt.",
    fleeDialog5: "ERRYN! Wo bist du?!",
    fleeDialog6: "Hier... hier drüben...",
    fleeDialog7: "Du findest ihn an einen Felsen gepresst, sein Licht kaum ein Flackern. Die Druckwelle hat ihm geschadet — sein Leuchten ist gebrochen, instabil.",
    fleeDialog8: "Mir geht's gut... mir geht's gut. Brauch nur einen Moment. Diese Explosion — das war keine normale Magie, {player}. Worum auch immer sie kämpfen... es ist gefährlich.",
    fleeDialog9: "Ihr kauert zusammen hinter dem Felsen, während die Kampfgeräusche langsam in der Ferne verblassen. Schließlich kehrt Stille zurück — schwer und wachsam.",
    fleeDialog10: "Wir müssen die anderen finden, {player}. Wir müssen sie warnen. Was auch immer in diesem Wald passiert... es ist größer als wir.",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;
