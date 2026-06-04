import { useState, useEffect, useCallback, useRef } from "react";

const JACK_IMG = "https://i.imgur.com/placeholder.png";
const BRANT_IMG = "data:image/webp;base64,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";
const EMILY_IMG = "data:image/webp;base64,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";
const JACK_AVATAR_IMG = "data:image/webp;base64,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";


// ── SOUND ────────────────────────────────────────────────────────────────────
function useSound() {
  const ctx = useRef(null);
  const play = useCallback((type) => {
    if (!ctx.current) {
      try { ctx.current = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return; }
    }
    const c = ctx.current;
    const t = c.currentTime;
    const b = (freq, start, dur, shape, vol) => {
      const o = c.createOscillator(), g = c.createGain();
      o.connect(g); g.connect(c.destination);
      o.frequency.value = freq; o.type = shape || "sine";
      g.gain.setValueAtTime(vol || 0.25, t + start);
      g.gain.exponentialRampToValueAtTime(0.001, t + start + dur);
      o.start(t + start); o.stop(t + start + dur);
    };
    if (type === "correct") { b(523,0,0.12); b(659,0.1,0.12); b(784,0.2,0.25); }
    else if (type === "wrong") { b(300,0,0.15,"sawtooth",0.18); b(200,0.14,0.2,"sawtooth",0.14); }
    else if (type === "levelup") { [523,659,784,1047].forEach((f,i) => b(f, i*0.1, 0.25)); }
    else if (type === "tap") { b(800,0,0.07,"sine",0.1); }
    else if (type === "complete") { [523,659,784,659,784,1047].forEach((f,i) => b(f, i*0.11, 0.18)); }
  }, []);
  return play;
}

// ── STORAGE ──────────────────────────────────────────────────────────────────
function useStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s !== null ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const set = useCallback((updater) => {
    setVal((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      try { localStorage.setItem(key, JSON.stringify(next)); } catch {}
      return next;
    });
  }, [key]);
  return [val, set];
}

// ── SPEECH ───────────────────────────────────────────────────────────────────
function useSpeech(jackMode) {
  const [speaking, setSpeaking] = useState(false);
  const voiceRef = useRef(null);
  useEffect(() => {
    if (!window.speechSynthesis) return;
    const pick = () => {
      const vs = window.speechSynthesis.getVoices();
      voiceRef.current = vs.find(v => v.lang === "pt-PT") || vs.find(v => v.lang.startsWith("pt")) || null;
    };
    pick();
    window.speechSynthesis.onvoiceschanged = pick;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);
  const speak = useCallback((text) => {
    if (!window.speechSynthesis) return;
    const clean = text.split(" / ")[0].replace(/\.\.\./g, "").trim();
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(clean);
    u.lang = "pt-PT";
    u.rate = jackMode ? 0.75 : 0.70;
    u.pitch = jackMode ? 1.4 : 1.0;
    if (voiceRef.current) u.voice = voiceRef.current;
    u.onstart = () => setSpeaking(true);
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    window.speechSynthesis.speak(u);
  }, [jackMode]);
  return { speak, speaking };
}

function SpeakBtn({ text, speak, speaking, color }) {
  const c = color || "#c8881a";
  return (
    <button
      onClick={(e) => { e.stopPropagation(); speak(text); }}
      style={{
        width: 36, height: 36, borderRadius: "50%",
        background: speaking ? c + "44" : c + "22",
        border: "2px solid " + c + "66",
        color: c, cursor: "pointer", fontSize: 15,
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "all 0.2s", flexShrink: 0,
        animation: speaking ? "pulse 0.8s infinite" : "none"
      }}
    >
      🔊
    </button>
  );
}

// ── GALO SVG ROOSTER ─────────────────────────────────────────────────────────
function Galo({ mood, size, animate }) {
  mood = mood || "happy";
  size = size || 64;
  animate = animate || false;
  const palettes = {
    happy:    { body: "#e63946", comb: "#c1121f", eye: "#1d3557", beak: "#f4a261", glow: "#e6394633" },
    excited:  { body: "#f4a261", comb: "#e63946", eye: "#1d3557", beak: "#ffb703", glow: "#f4a26133" },
    thinking: { body: "#457b9d", comb: "#e63946", eye: "#1d3557", beak: "#f4a261", glow: "#457b9d33" },
    sad:      { body: "#a8dadc", comb: "#457b9d", eye: "#1d3557", beak: "#f4a261", glow: "#a8dadc33" },
    cheer:    { body: "#2a9d8f", comb: "#e63946", eye: "#1d3557", beak: "#f4a261", glow: "#2a9d8f33" },
  };
  const p = palettes[mood] || palettes.happy;
  const smileD = mood === "sad"
    ? "M32 46 Q40 42 48 46"
    : mood === "thinking"
    ? "M32 46 Q40 48 48 46"
    : "M32 44 Q40 52 48 44";
  const eyeOY = mood === "sad" ? 2 : 0;
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      animation: animate ? "bounce 0.6s ease infinite alternate" : "none",
      filter: "drop-shadow(0 4px 10px " + p.glow + ")"
    }}>
      <svg viewBox="0 0 100 100" width={size} height={size} xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="78" cy="68" rx="16" ry="6" fill={p.body} opacity="0.6" transform="rotate(-35 78 68)" />
        <ellipse cx="82" cy="58" rx="14" ry="5" fill={p.comb} opacity="0.55" transform="rotate(-50 82 58)" />
        <ellipse cx="75" cy="76" rx="12" ry="5" fill={p.body} opacity="0.45" transform="rotate(-20 75 76)" />
        <ellipse cx="45" cy="70" rx="28" ry="22" fill={p.body} />
        <ellipse cx="52" cy="67" rx="16" ry="11" fill="white" opacity="0.10" />
        <ellipse cx="37" cy="50" rx="14" ry="17" fill={p.body} />
        <circle cx="37" cy="32" r="20" fill={p.body} />
        <ellipse cx="28" cy="14" rx="5" ry="9" fill={p.comb} />
        <ellipse cx="37" cy="10" rx="5" ry="10" fill={p.comb} />
        <ellipse cx="46" cy="13" rx="4" ry="8" fill={p.comb} />
        <ellipse cx="33" cy="44" rx="6" ry="8" fill={p.comb} opacity="0.9" />
        <polygon points="54,28 70,33 54,38" fill={p.beak} />
        <circle cx="48" cy="28" r="8" fill="white" />
        <circle cx="48" cy={String(28 + eyeOY)} r="5" fill={p.eye} />
        <circle cx="50" cy="25" r="2" fill="white" opacity="0.85" />
        <path d={smileD} stroke={p.comb} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="32" y="88" width="6" height="10" rx="2" fill={p.beak} />
        <rect x="44" y="88" width="6" height="10" rx="2" fill={p.beak} />
        <rect x="26" y="95" width="14" height="3.5" rx="1.5" fill={p.beak} />
        <rect x="38" y="95" width="14" height="3.5" rx="1.5" fill={p.beak} />
        {(mood === "excited" || mood === "cheer") && (
          <>
            <text x="68" y="20" fontSize="11">✨</text>
            <text x="12" y="16" fontSize="9">⭐</text>
          </>
        )}
        {mood === "thinking" && (
          <>
            <circle cx="70" cy="18" r="3" fill="#6366f1" opacity="0.45" />
            <circle cx="75" cy="11" r="2" fill="#6366f1" opacity="0.35" />
            <circle cx="79" cy="5" r="1.5" fill="#6366f1" opacity="0.25" />
          </>
        )}
        {mood === "sad" && (
          <ellipse cx="53" cy="34" rx="1.5" ry="4" fill="#93c5fd" opacity="0.75" />
        )}
      </svg>
    </div>
  );
}

function GaloSays({ mood, message, color }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 14px", background: "#fff", borderRadius: 14,
      border: "2px solid " + (color || "#e63946") + "33",
      marginBottom: 14, boxShadow: "0 2px 8px rgba(0,0,0,0.05)"
    }}>
      <Galo mood={mood} size={64} animate={mood === "excited" || mood === "cheer"} />
      <div style={{ flex: 1, fontSize: 13, color: "#374151", lineHeight: 1.5 }}>{message}</div>
    </div>
  );
}

function JackImg({ size, wave }) {
  size = size || 100;
  wave = wave || false;
  return (
    <img
      src={JACK_IMG}
      alt="Jack"
      style={{
        width: size,
        height: "auto",
        objectFit: "contain",
        borderRadius: 12,
        animation: wave ? "bounce 0.9s ease infinite alternate" : "none",
        display: "block"
      }}
    />
  );
}

function Confetti() {
  const pieces = Array.from({ length: 20 }, (_, i) => ({
    color: ["#ff6b35","#f59e0b","#10b981","#4a9eff","#a855f7","#ef4444"][i % 6],
    left: (i / 20 * 100) + "%",
    delay: (i * 0.08).toFixed(2) + "s",
    size: 5 + (i % 4) * 3
  }));
  return (
    <div style={{
      position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
      pointerEvents: "none", zIndex: 100, overflow: "hidden"
    }}>
      {pieces.map((p, i) => (
        <div key={i} style={{
          position: "absolute", top: "-20px", left: p.left,
          width: p.size, height: p.size, background: p.color,
          borderRadius: i % 3 === 0 ? "50%" : 2,
          animation: "fall 1.8s " + p.delay + " ease-in forwards"
        }} />
      ))}
    </div>
  );
}

// ── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg: "#fafaf8", card: "#ffffff", border: "#e8e0d0",
  gold: "#c8881a", goldLight: "#fef3dc",
  green: "#16a34a", greenLight: "#dcfce7",
  red: "#dc2626", redLight: "#fee2e2",
  blue: "#2563eb", blueLight: "#dbeafe",
  text: "#1c1917", muted: "#78716c", pt: "#006600"
};

function Card({ children, style, onClick, accent }) {
  return (
    <div
      onClick={onClick}
      style={{
        background: C.card,
        border: "1.5px solid " + (accent || C.border),
        borderRadius: 16, padding: 16,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        transition: "all 0.2s",
        cursor: onClick ? "pointer" : "default",
        ...style
      }}
    >
      {children}
    </div>
  );
}

function PillBtn({ children, onClick, color, active }) {
  color = color || C.gold;
  return (
    <button
      onClick={onClick}
      style={{
        background: active ? color : "transparent",
        color: active ? "#fff" : color,
        border: "1.5px solid " + color,
        borderRadius: 20, padding: "5px 13px",
        cursor: "pointer", fontFamily: "inherit",
        fontSize: 12, fontWeight: active ? "700" : "500",
        transition: "all 0.2s"
      }}
    >
      {children}
    </button>
  );
}

function ProgressBar({ value, max, color, height }) {
  color = color || C.gold;
  height = height || 6;
  const pct = Math.min(100, (value / max) * 100);
  return (
    <div style={{ height, background: "#e5e7eb", borderRadius: height, overflow: "hidden" }}>
      <div style={{
        height: "100%", width: pct + "%",
        background: color, borderRadius: height,
        transition: "width 0.5s ease"
      }} />
    </div>
  );
}

function XPPill({ xp }) {
  return (
    <div style={{
      display: "inline-flex", alignItems: "center", gap: 4,
      background: C.goldLight, border: "1px solid " + C.gold + "44",
      borderRadius: 20, padding: "3px 10px",
      fontSize: 12, color: C.gold, fontWeight: "700"
    }}>
      ⚡ {xp} XP
    </div>
  );
}

function shuffle(arr) { return [...arr].sort(() => Math.random() - 0.5); }
// ── DATA ─────────────────────────────────────────────────────────────────────
const categories = [
  { id: "essentials", label: "Essentials", emoji: "🗣️", phrases: [
    { pt: "Olá", en: "Hello", pr: "oh-LAH", tip: "Universal — works any time of day" },
    { pt: "Bom dia", en: "Good morning", pr: "bom JEE-ah", tip: "Until about noon" },
    { pt: "Boa tarde", en: "Good afternoon", pr: "BOH-ah TAR-deh", tip: "Noon until sunset" },
    { pt: "Boa noite", en: "Good evening / Night", pr: "BOH-ah NOY-teh", tip: "After dark — greeting or farewell" },
    { pt: "Por favor", en: "Please", pr: "poor fah-VOR", tip: "Politeness goes a long way in Portugal" },
    { pt: "Obrigado / Obrigada", en: "Thank you", pr: "oh-bree-GAH-doo / oh-bree-GAH-dah", tip: "Obrigado if male, Obrigada if female" },
    { pt: "De nada", en: "You're welcome", pr: "deh NAH-dah", tip: "Natural reply to obrigado/a" },
    { pt: "Desculpe", en: "Excuse me / Sorry", pr: "desh-KOOL-peh", tip: "For attention or apology" },
    { pt: "Sim / Não", en: "Yes / No", pr: "seem / now (nasal)", tip: "Não sounds nasal — like 'now' through your nose" },
  ]},
  { id: "getting_around", label: "Getting Around", emoji: "🗺️", phrases: [
    { pt: "Onde fica...?", en: "Where is...?", pr: "ON-deh FEE-kah", tip: "Onde fica o castelo? = Where is the castle?" },
    { pt: "À esquerda / À direita", en: "Left / Right", pr: "ah esh-KAIR-dah / ah dee-RAY-tah", tip: "Essential for navigating on foot" },
    { pt: "Em frente", en: "Straight ahead", pr: "em FREN-teh", tip: "Literally 'in front'" },
    { pt: "Quanto custa?", en: "How much does it cost?", pr: "KWAN-too KOOSH-tah", tip: "Works for taxis, tickets, markets" },
    { pt: "Está longe?", en: "Is it far?", pr: "esh-TAH LON-zheh", tip: "Handy before committing to a walk" },
    { pt: "Está longe daqui?", en: "Is it far from here?", pr: "esh-TAH LON-zheh dah-KEE", tip: "More specific than está longe" },
  ]},
  { id: "food_drink", label: "Food & Drink", emoji: "🍷", phrases: [
    { pt: "Uma mesa para dois, por favor", en: "A table for two, please", pr: "OO-mah MAY-zah PAH-rah doysh", tip: "Change dois for your number" },
    { pt: "A carta, por favor", en: "The menu, please", pr: "ah KAR-tah poor fah-VOR", tip: "A ementa also works" },
    { pt: "O que recomenda?", en: "What do you recommend?", pr: "oo keh reh-koo-MEN-dah", tip: "Locals love being asked" },
    { pt: "Vou levar isto", en: "I'll have this", pr: "voh leh-VAR EESH-too", tip: "Point at the menu as you say it" },
    { pt: "Um copo de vinho tinto / branco", en: "Red / white wine", pr: "VEEN-yoo TEEN-too / BRAN-koo", tip: "Alentejo reds are world class" },
    { pt: "Água com gás / sem gás", en: "Sparkling / still water", pr: "AH-gwah kom gash / sem gash", tip: "You'll always be asked" },
    { pt: "A conta, por favor", en: "The bill, please", pr: "ah KON-tah poor fah-VOR", tip: "Just say it — no need to wave" },
    { pt: "Estava delicioso", en: "It was delicious", pr: "esh-TAH-vah deh-lee-SYOH-zoo", tip: "Watch the server light up" },
    { pt: "Sardinhas assadas, por favor", en: "Grilled sardines, please", pr: "sar-DEEN-yash ah-SAH-dash", tip: "Peak season June–August 🐟" },
  ]},
  { id: "shopping", label: "Shopping", emoji: "🏺", phrases: [
    { pt: "Posso ver?", en: "Can I see it?", pr: "POH-soo vair", tip: "Before picking up from a display" },
    { pt: "É feito à mão?", en: "Is it handmade?", pr: "eh FAY-too ah mow (nasal)", tip: "Perfect for pottery shops in Évora" },
    { pt: "É muito caro", en: "It's too expensive", pr: "eh MWEE-too KAH-roo", tip: "Said with a smile, not an insult" },
    { pt: "Aceita cartão?", en: "Do you accept card?", pr: "ah-SAY-tah kar-TOW (nasal)", tip: "Worth checking at smaller shops" },
    { pt: "Embrulha para presente?", en: "Can you gift wrap it?", pr: "em-BROOL-yah PAH-rah preh-ZEN-teh", tip: "Artisan shops do this beautifully" },
  ]},
  { id: "numbers", label: "Numbers", emoji: "🔢", phrases: [
    { pt: "Um / Uma", en: "One", pr: "oom / OO-mah", tip: "Um (masc) / Uma (fem)" },
    { pt: "Dois / Duas", en: "Two", pr: "doysh / DOO-ash", tip: "Dois (masc) / Duas (fem)" },
    { pt: "Três", en: "Three", pr: "traysh", tip: "The ê sounds like 'ay'" },
    { pt: "Quatro", en: "Four", pr: "KWAH-troo", tip: "Final o is almost silent" },
    { pt: "Cinco", en: "Five", pr: "SINK-oo", tip: "Like 'sink' + soft oo" },
    { pt: "Seis", en: "Six", pr: "saysh", tip: "Final s becomes sh" },
    { pt: "Sete", en: "Seven", pr: "SET-eh", tip: "Two clear syllables" },
    { pt: "Oito", en: "Eight", pr: "OY-too", tip: "Rhymes with boy-too" },
    { pt: "Nove", en: "Nine", pr: "NOV-eh", tip: "Like novel cut short" },
    { pt: "Dez", en: "Ten", pr: "desh", tip: "Final z sounds like sh" },
  ]},
  { id: "emergencies", label: "Just in Case", emoji: "🆘", phrases: [
    { pt: "Preciso de ajuda", en: "I need help", pr: "preh-SEE-zoo deh ah-ZHOO-dah", tip: "Clear and direct" },
    { pt: "Fala inglês?", en: "Do you speak English?", pr: "FAH-lah een-GLAYSH", tip: "Many younger Portuguese do" },
    { pt: "Não percebo", en: "I don't understand", pr: "now pair-SEH-boo", tip: "More natural than não entendo" },
    { pt: "Pode repetir mais devagar?", en: "Repeat more slowly?", pr: "POD-eh reh-peh-TEER mysh deh-vah-GAR", tip: "They will — Portuguese are patient" },
    { pt: "Chame uma ambulância", en: "Call an ambulance", pr: "SHAH-meh OO-mah am-boo-LAN-syah", tip: "Emergency: 112" },
  ]},
];

const JACK_LEVELS = [
  { id: "basics", label: "Basics", emoji: "👋", color: "#4a9eff", bg: "#eff6ff", galo: "happy", phrases: [
    { pt: "Olá!", en: "Hello!", pr: "oh-LAH", emoji: "👋" },
    { pt: "Tchau!", en: "Bye!", pr: "chow", emoji: "🙋" },
    { pt: "Por favor", en: "Please", pr: "poor fah-VOR", emoji: "🙏" },
    { pt: "Obrigado", en: "Thank you", pr: "oh-bree-GAH-doo", emoji: "💛" },
    { pt: "Sim!", en: "Yes!", pr: "seem", emoji: "✅" },
    { pt: "Não!", en: "No!", pr: "now", emoji: "❌" },
    { pt: "Bom dia!", en: "Good morning!", pr: "bom JEE-ah", emoji: "☀️" },
    { pt: "Boa noite!", en: "Good night!", pr: "BOH-ah NOY-teh", emoji: "🌙" },
  ]},
  { id: "adventure", label: "Adventure", emoji: "⚔️", color: "#ff6b35", bg: "#fff7ed", galo: "excited", phrases: [
    { pt: "O castelo", en: "The castle", pr: "oo kash-TEH-loo", emoji: "🏰" },
    { pt: "O dragão", en: "The dragon", pr: "oo drah-ZHOW", emoji: "🐉" },
    { pt: "O cavaleiro", en: "The knight", pr: "oo kah-vah-LAY-roo", emoji: "⚔️" },
    { pt: "O tesouro", en: "The treasure", pr: "oo teh-ZOH-roo", emoji: "💰" },
    { pt: "A espada", en: "The sword", pr: "ah esh-PAH-dah", emoji: "🗡️" },
    { pt: "O herói", en: "The hero", pr: "oo eh-ROY", emoji: "🦸" },
    { pt: "A magia", en: "The magic", pr: "ah mah-ZHEE-ah", emoji: "✨" },
    { pt: "A aventura", en: "The adventure", pr: "ah ah-ven-TOO-rah", emoji: "🗺️" },
  ]},
  { id: "animals", label: "Animals", emoji: "🐾", color: "#a855f7", bg: "#faf5ff", galo: "happy", phrases: [
    { pt: "O gato", en: "The cat", pr: "oo GAH-too", emoji: "🐱" },
    { pt: "O cão", en: "The dog", pr: "oo kow", emoji: "🐶" },
    { pt: "O peixe", en: "The fish", pr: "oo PAY-sheh", emoji: "🐟" },
    { pt: "O cavalo", en: "The horse", pr: "oo kah-VAH-loo", emoji: "🐴" },
    { pt: "A tartaruga", en: "The turtle", pr: "ah tar-tah-ROO-gah", emoji: "🐢" },
    { pt: "O golfinho", en: "The dolphin", pr: "oo gol-FEEN-yoo", emoji: "🐬" },
    { pt: "A borboleta", en: "The butterfly", pr: "ah bor-boh-LEH-tah", emoji: "🦋" },
    { pt: "O pássaro", en: "The bird", pr: "oo PAH-sah-roo", emoji: "🐦" },
  ]},
  { id: "food", label: "Food", emoji: "🍕", color: "#f59e0b", bg: "#fffbeb", galo: "excited", phrases: [
    { pt: "Tenho fome!", en: "I'm hungry!", pr: "TEN-yoo FOH-meh", emoji: "😋" },
    { pt: "Tenho sede!", en: "I'm thirsty!", pr: "TEN-yoo SEH-deh", emoji: "🥤" },
    { pt: "Delicioso!", en: "Delicious!", pr: "deh-lee-SYOH-zoo", emoji: "😍" },
    { pt: "O gelado", en: "The ice cream", pr: "oo zheh-LAH-doo", emoji: "🍦" },
    { pt: "A pizza", en: "The pizza", pr: "ah PEET-sah", emoji: "🍕" },
    { pt: "O bolo", en: "The cake", pr: "oo BOH-loo", emoji: "🎂" },
    { pt: "A fruta", en: "The fruit", pr: "ah FROO-tah", emoji: "🍎" },
    { pt: "O sumo", en: "The juice", pr: "oo SOO-moo", emoji: "🧃" },
  ]},
  { id: "useful", label: "Useful", emoji: "💬", color: "#10b981", bg: "#ecfdf5", galo: "thinking", phrases: [
    { pt: "A casa de banho", en: "The bathroom", pr: "ah KAH-zah deh BAN-yoo", emoji: "🚽" },
    { pt: "Gosto!", en: "I like it!", pr: "GOSH-too", emoji: "❤️" },
    { pt: "Não gosto", en: "I don't like it", pr: "now GOSH-too", emoji: "👎" },
    { pt: "Muito fixe!", en: "Very cool!", pr: "MWEE-too FEESH", emoji: "😎" },
    { pt: "Que giro!", en: "How cool!", pr: "keh ZHEE-roo", emoji: "🤩" },
    { pt: "Ajuda!", en: "Help!", pr: "ah-ZHOO-dah", emoji: "🆘" },
    { pt: "Espera!", en: "Wait!", pr: "esh-PEH-rah", emoji: "✋" },
    { pt: "Vamos!", en: "Let's go!", pr: "VAH-moosh", emoji: "🚀" },
  ]},
  { id: "portugal", label: "Portugal", emoji: "🇵🇹", color: "#ef4444", bg: "#fef2f2", galo: "cheer", phrases: [
    { pt: "O mar", en: "The sea", pr: "oo mar", emoji: "🌊" },
    { pt: "A praia", en: "The beach", pr: "ah PRY-ah", emoji: "🏖️" },
    { pt: "O sol", en: "The sun", pr: "oo sol", emoji: "☀️" },
    { pt: "As sardinhas", en: "The sardines", pr: "ash sar-DEEN-yash", emoji: "🐟" },
    { pt: "O pastel de nata", en: "The custard tart", pr: "oo pash-TEL deh NAH-tah", emoji: "🥐" },
    { pt: "As estrelas", en: "The stars", pr: "ash esh-TREH-lash", emoji: "⭐" },
    { pt: "A torre", en: "The tower", pr: "ah TOH-reh", emoji: "🗼" },
    { pt: "Portugal é fixe!", en: "Portugal is cool!", pr: "por-too-GAL eh FEESH", emoji: "🇵🇹" },
  ]},
  { id: "colors", label: "Colors & Shapes", emoji: "🎨", color: "#ec4899", bg: "#fdf2f8", galo: "excited", phrases: [
    { pt: "Vermelho", en: "Red", pr: "ver-MEL-yoo", emoji: "🔴" },
    { pt: "Azul", en: "Blue", pr: "ah-ZOOL", emoji: "🔵" },
    { pt: "Verde", en: "Green", pr: "VAIR-deh", emoji: "🟢" },
    { pt: "Amarelo", en: "Yellow", pr: "ah-mah-REL-oo", emoji: "🟡" },
    { pt: "Cor-de-rosa", en: "Pink", pr: "kor deh ROH-zah", emoji: "🩷" },
    { pt: "O círculo", en: "The circle", pr: "oo SEER-koo-loo", emoji: "⭕" },
    { pt: "O quadrado", en: "The square", pr: "oo kwah-DRAH-doo", emoji: "🟥" },
    { pt: "A estrela", en: "The star", pr: "ah esh-TREH-lah", emoji: "⭐" },
  ]},
  { id: "airport", label: "At the Airport", emoji: "✈️", color: "#0ea5e9", bg: "#f0f9ff", galo: "excited", phrases: [
    { pt: "O avião", en: "The airplane", pr: "oo ah-vyOW", emoji: "✈️" },
    { pt: "O passaporte", en: "The passport", pr: "oo pah-sah-POR-teh", emoji: "📘" },
    { pt: "A mala", en: "The suitcase", pr: "ah MAH-lah", emoji: "🧳" },
    { pt: "Vamos embora!", en: "Let's go!", pr: "VAH-moosh em-BOH-rah", emoji: "🚀" },
    { pt: "Onde é o gate?", en: "Where is the gate?", pr: "ON-deh eh oo gate", emoji: "🚪" },
    { pt: "O bilhete", en: "The ticket", pr: "oo beel-YEH-teh", emoji: "🎫" },
    { pt: "Chegámos!", en: "We arrived!", pr: "sheh-GAH-moosh", emoji: "🎉" },
    { pt: "Portugal, vamos lá!", en: "Portugal, here we go!", pr: "por-too-GAL VAH-moosh lah", emoji: "🇵🇹" },
  ]},
  { id: "sports", label: "Sports & Games", emoji: "⚽", color: "#16a34a", bg: "#f0fdf4", galo: "excited", phrases: [
    { pt: "O futebol", en: "Soccer / Football", pr: "oo foo-teh-BOL", emoji: "⚽" },
    { pt: "Golo!", en: "Goal!", pr: "GOH-loo", emoji: "🥅" },
    { pt: "Correr", en: "To run", pr: "koo-HAIR", emoji: "🏃" },
    { pt: "Nadar", en: "To swim", pr: "nah-DAR", emoji: "🏊" },
    { pt: "A bicicleta", en: "The bicycle", pr: "ah bee-see-KLEH-tah", emoji: "🚴" },
    { pt: "Ganhámos!", en: "We won!", pr: "gahn-YAH-moosh", emoji: "🏆" },
    { pt: "Jogar", en: "To play", pr: "zhoo-GAR", emoji: "🎮" },
    { pt: "O campeão", en: "The champion", pr: "oo kam-pyOW", emoji: "🥇" },
  ]},
  { id: "weather", label: "Weather & Nature", emoji: "🌦️", color: "#7c3aed", bg: "#f5f3ff", galo: "thinking", phrases: [
    { pt: "O sol", en: "The sun", pr: "oo sol", emoji: "☀️" },
    { pt: "A chuva", en: "The rain", pr: "ah SHOO-vah", emoji: "🌧️" },
    { pt: "O vento", en: "The wind", pr: "oo VEN-too", emoji: "💨" },
    { pt: "Está quente!", en: "It's hot!", pr: "esh-TAH KEN-teh", emoji: "🥵" },
    { pt: "Está frio!", en: "It's cold!", pr: "esh-TAH FREE-oo", emoji: "🥶" },
    { pt: "A montanha", en: "The mountain", pr: "ah mon-TAN-yah", emoji: "⛰️" },
    { pt: "O rio", en: "The river", pr: "oo REE-oo", emoji: "🏞️" },
    { pt: "As nuvens", en: "The clouds", pr: "ash NOO-vens", emoji: "☁️" },
  ]},
  { id: "feelings", label: "Feelings", emoji: "😄", color: "#f59e0b", bg: "#fffbeb", galo: "happy", phrases: [
    { pt: "Estou feliz!", en: "I'm happy!", pr: "esh-TOH feh-LEESH", emoji: "😄" },
    { pt: "Estou com fome!", en: "I'm hungry!", pr: "esh-TOH kom FOH-meh", emoji: "😋" },
    { pt: "Estou cansado!", en: "I'm tired!", pr: "esh-TOH kan-SAH-doo", emoji: "😴" },
    { pt: "Que fixe!", en: "How cool!", pr: "keh FEESH", emoji: "😎" },
    { pt: "Não acredito!", en: "I can't believe it!", pr: "now ah-kreh-DEE-too", emoji: "😱" },
    { pt: "Adoro isto!", en: "I love this!", pr: "ah-DOH-roo EESH-too", emoji: "❤️" },
    { pt: "Estou com saudades", en: "I miss home", pr: "esh-TOH kom sow-DAH-desh", emoji: "🥺" },
    { pt: "Incrível!", en: "Incredible!", pr: "een-KREE-vel", emoji: "🤩" },
  ]},
  { id: "superheroes", label: "Superheroes", emoji: "🦸", color: "#dc2626", bg: "#fef2f2", galo: "cheer", phrases: [
    { pt: "O super-herói", en: "The superhero", pr: "oo SOO-per eh-ROY", emoji: "🦸" },
    { pt: "O poder", en: "The power", pr: "oo poh-DAIR", emoji: "⚡" },
    { pt: "Voar", en: "To fly", pr: "voo-AR", emoji: "🦅" },
    { pt: "Invisível", en: "Invisible", pr: "een-vee-ZEE-vel", emoji: "👻" },
    { pt: "Super-forte!", en: "Super strong!", pr: "SOO-per FOR-teh", emoji: "💪" },
    { pt: "Salvar o mundo!", en: "Save the world!", pr: "sal-VAR oo MOON-doo", emoji: "🌍" },
    { pt: "O vilão", en: "The villain", pr: "oo vee-LOW", emoji: "😈" },
    { pt: "Sou um herói!", en: "I am a hero!", pr: "soh oom eh-ROY", emoji: "🏆" },
  ]},
];

const JACK_PRAISE = [
  { text: "Incrível!", sub: "Amazing! 🎉", mood: "cheer" },
  { text: "Fantástico!", sub: "Fantastic! ⭐", mood: "excited" },
  { text: "Muito bem!", sub: "Very good! 🔥", mood: "cheer" },
  { text: "Perfeito!", sub: "Perfect! 💎", mood: "excited" },
  { text: "Excelente!", sub: "Excellent! 🏆", mood: "cheer" },
  { text: "Lendário!", sub: "LEGENDARY! 🔥🏆🎉", mood: "cheer" },
];

const GALO_GREETINGS = [
  "Olá Jack! Vamos aprender!",
  "Bem-vindo de volta!",
  "Estás pronto?",
  "Vamos lá, herói!",
  "Hoje vais ser incrível!",
  "Portugal precisa de ti!",
  "Vamos conquistar o mundo!",
];

const JACK_WORDS_OF_DAY = [
  { pt: "Fixe!", en: "Cool!", pr: "FEESH", emoji: "😎" },
  { pt: "Bestial!", en: "Awesome!", pr: "besh-TYAHL", emoji: "🤩" },
  { pt: "Espetacular!", en: "Spectacular!", pr: "esh-peh-tah-koo-LAR", emoji: "✨" },
  { pt: "Fantástico!", en: "Fantastic!", pr: "fan-TASH-tee-koo", emoji: "🌟" },
  { pt: "Vamos!", en: "Let's go!", pr: "VAH-moosh", emoji: "🚀" },
  { pt: "Incrível!", en: "Incredible!", pr: "een-KREE-vel", emoji: "💥" },
  { pt: "Campeão!", en: "Champion!", pr: "kam-pyOW", emoji: "🏆" },
];

const STREAK_BADGES = [
  { days: 3, emoji: "🔥", label: "3 Day Streak!", color: "#f59e0b" },
  { days: 5, emoji: "⚡", label: "5 Day Warrior!", color: "#6366f1" },
  { days: 7, emoji: "🏆", label: "7 Day Legend!", color: "#10b981" },
];
const JACK_OOPS = [
  { text: "Quase!", sub: "So close! Try again 💪", mood: "sad" },
  { text: "Não faz mal!", sub: "No worries! Keep going!", mood: "thinking" },
];

const JACK_XP = 10;
const XP_TO_NEXT = 50;
const XP_MULTIPLIER = { brant: 1, emily: 1, jack: 2 };

const SCENARIOS = [
  { id: "restaurant", title: "Restaurant in Évora", emoji: "🍽️", location: "Évora",
    setting: "You walk into a tasca in Évora. The host approaches.",
    exchanges: [
      { npc: "Boa tarde! Tem reserva?", npcTr: "Good afternoon! Do you have a reservation?", options: [
        { text: "Boa tarde! Não tenho reserva. Tem mesa?", en: "No reservation. Do you have a table?", correct: true },
        { text: "Sim, quero sardinhas.", en: "Yes, I want sardines.", correct: false, feedback: "Jumping ahead! Reservation question first." },
        { text: "Não percebo.", en: "I don't understand.", correct: false, feedback: "You understood fine — easy one!" },
      ]},
      { npc: "Claro! Para quantas pessoas?", npcTr: "Of course! For how many people?", options: [
        { text: "Para seis pessoas, por favor.", en: "For six people, please.", correct: true },
        { text: "A carta, por favor.", en: "The menu, please.", correct: false, feedback: "They need to seat you first!" },
        { text: "Quanto custa?", en: "How much?", correct: false, feedback: "A bit early!" },
      ]},
      { npc: "O que desejam beber?", npcTr: "What would you like to drink?", options: [
        { text: "Vinho tinto e água sem gás, por favor.", en: "Red wine and still water, please.", correct: true },
        { text: "A conta, por favor.", en: "The bill, please.", correct: false, feedback: "Too fast! You just sat down." },
        { text: "Estava delicioso!", en: "It was delicious!", correct: false, feedback: "You haven't eaten yet!" },
      ]},
    ]
  },
  { id: "directions", title: "Directions in Évora", emoji: "🗺️", location: "Évora",
    setting: "You're looking for the Roman temple. You stop a local.",
    exchanges: [
      { npc: "Bom dia! Posso ajudar?", npcTr: "Good morning! Can I help?", options: [
        { text: "Bom dia! Onde fica o templo romano?", en: "Where is the Roman temple?", correct: true },
        { text: "A conta, por favor.", en: "The bill, please.", correct: false, feedback: "You're on the street, not in a restaurant!" },
        { text: "Está longe?", en: "Is it far?", correct: false, feedback: "Almost — say what you're looking for first!" },
      ]},
      { npc: "O templo? Fica ali, no centro histórico.", npcTr: "Right there, in the historic centre.", options: [
        { text: "Está longe daqui?", en: "Is it far from here?", correct: true },
        { text: "Quanto custa?", en: "How much?", correct: false, feedback: "They're giving directions, not selling tickets!" },
        { text: "Obrigado, estava delicioso!", en: "Thank you, delicious!", correct: false, feedback: "Delicious doesn't apply to directions!" },
      ]},
      { npc: "Não, só três minutos a pé!", npcTr: "No, only three minutes on foot!", options: [
        { text: "Obrigado! Muito amável.", en: "Thank you! Very kind.", correct: true },
        { text: "Não percebo.", en: "I don't understand.", correct: false, feedback: "Três minutos = three minutes — you know this!" },
        { text: "Posso ver?", en: "Can I see it?", correct: false, feedback: "That's for shopping!" },
      ]},
    ]
  },
  { id: "beach", title: "Beach Café in Odemira", emoji: "🏖️", location: "Odemira",
    setting: "Beach café near Odemira's wild coast. Waiter comes over.",
    exchanges: [
      { npc: "Olá! O que desejam?", npcTr: "Hello! What would you like?", options: [
        { text: "Dois sumos e uma água sem gás, por favor.", en: "Two juices and still water, please.", correct: true },
        { text: "Onde fica a farmácia?", en: "Where is the pharmacy?", correct: false, feedback: "You're at a café!" },
        { text: "A conta, por favor.", en: "The bill, please.", correct: false, feedback: "You haven't ordered yet!" },
      ]},
      { npc: "Querem petiscos também?", npcTr: "Would you like snacks too?", options: [
        { text: "O que recomenda?", en: "What do you recommend?", correct: true },
        { text: "Embrulha para presente?", en: "Gift wrap it?", correct: false, feedback: "That's for shops, not snacks!" },
        { text: "Não percebo.", en: "I don't understand.", correct: false, feedback: "Petiscos = snacks — keep going!" },
      ]},
      { npc: "As sardinhas estão fantásticas hoje.", npcTr: "The sardines are fantastic today.", options: [
        { text: "Perfeito! Sardinhas assadas, por favor.", en: "Perfect! Grilled sardines, please.", correct: true },
        { text: "Não percebo.", en: "I don't understand.", correct: false, feedback: "Sardinhas = sardines — you know this!" },
        { text: "A conta, por favor.", en: "The bill, please.", correct: false, feedback: "You just ordered!" },
      ]},
    ]
  },
  { id: "pottery", title: "Pottery Shopping", emoji: "🏺", location: "Évora",
    setting: "Ceramics shop in Évora. You spot a hand-painted bowl.",
    exchanges: [
      { npc: "Boa tarde! Está à procura de alguma coisa especial?", npcTr: "Looking for something special?", options: [
        { text: "Boa tarde! É feito à mão?", en: "Good afternoon! Is it handmade?", correct: true },
        { text: "A conta, por favor.", en: "The bill, please.", correct: false, feedback: "You haven't picked anything yet!" },
        { text: "Chame uma ambulância!", en: "Call an ambulance!", correct: false, feedback: "It's just a bowl!" },
      ]},
      { npc: "Sim, tudo feito à mão pelo meu marido.", npcTr: "Yes, everything handmade by my husband.", options: [
        { text: "Posso ver este? Quanto custa?", en: "Can I see this? How much?", correct: true },
        { text: "Onde fica o castelo?", en: "Where is the castle?", correct: false, feedback: "Focus — you're in a shop!" },
        { text: "Água com gás, por favor.", en: "Sparkling water, please.", correct: false, feedback: "This isn't a restaurant!" },
      ]},
      { npc: "Este custa quarenta euros.", npcTr: "This one costs forty euros.", options: [
        { text: "Embrulha para presente? É para oferecer.", en: "Can you gift wrap it? It's a gift.", correct: true },
        { text: "É muito caro, obrigado.", en: "It's too expensive.", correct: false, feedback: "Valid — but gift wrap is the move!" },
        { text: "Tem em tamanho diferente?", en: "Different size?", correct: false, feedback: "You love this one!" },
      ]},
    ]
  },
  { id: "cascais", title: "Last Night in Cascais", emoji: "🌊", location: "Cascais",
    setting: "Waterfront restaurant in Cascais. Your last evening.",
    exchanges: [
      { npc: "Boa noite! Têm reserva?", npcTr: "Good evening! Do you have a reservation?", options: [
        { text: "Boa noite! Sim, tenho reserva para seis.", en: "Good evening! Yes, reservation for six.", correct: true },
        { text: "Bom dia! Tenho sede.", en: "Good morning! I'm thirsty.", correct: false, feedback: "It's evening, not morning!" },
        { text: "Não percebo.", en: "I don't understand.", correct: false, feedback: "Têm reserva = do you have a reservation!" },
      ]},
      { npc: "É uma ocasião especial?", npcTr: "Is it a special occasion?", options: [
        { text: "Sim! Estamos a celebrar um aniversário.", en: "Yes! We're celebrating a birthday.", correct: true },
        { text: "Quanto custa?", en: "How much?", correct: false, feedback: "They're being friendly, not billing you!" },
        { text: "Aceita cartão?", en: "Do you accept card?", correct: false, feedback: "Too early — enjoy the moment!" },
      ]},
      { npc: "Maravilha! O que bebem?", npcTr: "Wonderful! What are you drinking?", options: [
        { text: "Vinho branco da região e água sem gás, por favor.", en: "Local white wine and still water.", correct: true },
        { text: "A conta, por favor.", en: "The bill, please.", correct: false, feedback: "You just sat down!" },
        { text: "Não tenho reserva.", en: "I don't have a reservation.", correct: false, feedback: "You do — you just said so!" },
      ]},
    ]
  },
];

const TRANSLATIONS = [
  { en: "Hello", pt: "Olá", pr: "oh-LAH", tip: "Works any time." },
  { en: "Good morning", pt: "Bom dia", pr: "bom JEE-ah", tip: "Until about noon." },
  { en: "Good afternoon", pt: "Boa tarde", pr: "BOH-ah TAR-deh", tip: "Noon until sunset." },
  { en: "Good evening", pt: "Boa noite", pr: "BOH-ah NOY-teh", tip: "Also good night." },
  { en: "Please", pt: "Por favor", pr: "poor fah-VOR", tip: "Add to any request." },
  { en: "Thank you", pt: "Obrigado / Obrigada", pr: "oh-bree-GAH-doo / oh-bree-GAH-dah", tip: "Obrigado (male) / Obrigada (female)." },
  { en: "You're welcome", pt: "De nada", pr: "deh NAH-dah", tip: "Natural reply." },
  { en: "Excuse me", pt: "Desculpe", pr: "desh-KOOL-peh", tip: "Attention or apology." },
  { en: "Yes", pt: "Sim", pr: "seem", tip: "Soft ee sound." },
  { en: "No", pt: "Não", pr: "now (nasal)", tip: "Like now through your nose." },
  { en: "I don't understand", pt: "Não percebo", pr: "now pair-SEH-boo", tip: "Natural in Portugal." },
  { en: "Do you speak English?", pt: "Fala inglês?", pr: "FAH-lah een-GLAYSH", tip: "Many younger Portuguese do." },
  { en: "I need help", pt: "Preciso de ajuda", pr: "preh-SEE-zoo deh ah-ZHOO-dah", tip: "Clear and direct." },
  { en: "Where is the castle?", pt: "Onde fica o castelo?", pr: "ON-deh FEE-kah oo kash-TEH-loo", tip: "Perfect for Évora." },
  { en: "Where is the bathroom?", pt: "Onde fica a casa de banho?", pr: "ON-deh FEE-kah ah KAH-zah deh BAN-yoo", tip: "Always works." },
  { en: "Where is the beach?", pt: "Onde fica a praia?", pr: "ON-deh FEE-kah ah PRY-ah", tip: "Plenty near Odemira!" },
  { en: "How much does it cost?", pt: "Quanto custa?", pr: "KWAN-too KOOSH-tah", tip: "Works for everything." },
  { en: "A table for six please", pt: "Uma mesa para seis, por favor", pr: "OO-mah MAY-zah PAH-rah saysh", tip: "For the whole group!" },
  { en: "The menu please", pt: "A carta, por favor", pr: "ah KAR-tah poor fah-VOR", tip: "A ementa also works." },
  { en: "What do you recommend?", pt: "O que recomenda?", pr: "oo keh reh-koo-MEN-dah", tip: "Locals love being asked." },
  { en: "A glass of red wine", pt: "Um copo de vinho tinto", pr: "oom KOH-poo deh VEEN-yoo TEEN-too", tip: "Alentejo reds are world class." },
  { en: "The bill please", pt: "A conta, por favor", pr: "ah KON-tah poor fah-VOR", tip: "Just say it." },
  { en: "It was delicious", pt: "Estava delicioso", pr: "esh-TAH-vah deh-lee-SYOH-zoo", tip: "Watch the server light up." },
  { en: "Grilled sardines please", pt: "Sardinhas assadas, por favor", pr: "sar-DEEN-yash ah-SAH-dash", tip: "Peak season June–August." },
  { en: "Happy birthday", pt: "Feliz aniversário", pr: "feh-LEESH ah-nee-ver-SAR-yoo", tip: "For Emily on July 4th! 🎂" },
  { en: "We're celebrating", pt: "Estamos a celebrar", pr: "esh-TAH-moosh ah seh-leh-BRAR", tip: "Extra hospitality guaranteed." },
  { en: "Can I book a massage?", pt: "Posso marcar uma massagem?", pr: "POH-soo mar-KAR OO-mah mah-SAH-zhem", tip: "For the spa at M'Ar De Ar." },
  { en: "Is it handmade?", pt: "É feito à mão?", pr: "eh FAY-too ah mow (nasal)", tip: "Great for Évora pottery." },
  { en: "Do you accept card?", pt: "Aceita cartão?", pr: "ah-SAY-tah kar-TOW (nasal)", tip: "Check at smaller shops." },
  { en: "Can you gift wrap it?", pt: "Embrulha para presente?", pr: "em-BROOL-yah PAH-rah preh-ZEN-teh", tip: "Artisan shops love this." },
  { en: "Can we see the stars?", pt: "Dá para ver as estrelas aqui?", pr: "dah PAH-rah vair ash esh-TREH-lash ah-KEE", tip: "Alqueva Dark Sky Reserve near Odemira is world-famous." },
];

function lookupTranslation(query, dir) {
  const q = query.trim().toLowerCase();
  if (dir === "en->pt") {
    return TRANSLATIONS.find(t => t.en.toLowerCase() === q) ||
           TRANSLATIONS.find(t => t.en.toLowerCase().includes(q) || q.includes(t.en.toLowerCase())) || null;
  }
  const f = TRANSLATIONS.find(t => t.pt.toLowerCase() === q) ||
            TRANSLATIONS.find(t => t.pt.toLowerCase().includes(q) || q.includes(t.pt.toLowerCase()));
  return f ? { translation: f.en } : null;
}

const SENTENCE_PUZZLES = [
  { words: ["A","conta,","por","favor"], en: "The bill, please", pr: "ah KON-tah poor fah-VOR", hint: "Asking for the bill at a restaurant" },
  { words: ["Onde","fica","o","castelo?"], en: "Where is the castle?", pr: "ON-deh FEE-kah oo kash-TEH-loo", hint: "Perfect for Évora's famous castle" },
  { words: ["Uma","mesa","para","seis,","por","favor"], en: "A table for six, please", pr: "OO-mah MAY-zah PAH-rah saysh poor fah-VOR", hint: "For the whole family!" },
  { words: ["Quanto","custa","isto?"], en: "How much does this cost?", pr: "KWAN-too KOOSH-tah EESH-too", hint: "Handy at any shop or market" },
  { words: ["Água","sem","gás,","por","favor"], en: "Still water, please", pr: "AH-gwah sem gash poor fah-VOR", hint: "sem gás = without gas = still" },
  { words: ["O","que","recomenda?"], en: "What do you recommend?", pr: "oo keh reh-koo-MEN-dah", hint: "Locals love this question" },
  { words: ["Está","longe","daqui?"], en: "Is it far from here?", pr: "esh-TAH LON-zheh dah-KEE", hint: "daqui = from here" },
  { words: ["Não","percebo.","Pode","repetir?"], en: "I don't understand. Can you repeat?", pr: "now pair-SEH-boo POD-eh reh-peh-TEER", hint: "A lifesaver phrase" },
  { words: ["É","feito","à","mão?"], en: "Is it handmade?", pr: "eh FAY-too ah mow", hint: "Essential for Évora pottery shops" },
  { words: ["Feliz","aniversário!"], en: "Happy birthday!", pr: "feh-LEESH ah-nee-ver-SAR-yoo", hint: "For Emily on July 4th 🎂" },
];

const TRIP_DATE = new Date("2026-06-25");
const DAYS_LEFT = Math.max(0, Math.ceil((TRIP_DATE - new Date()) / 86400000));
const TOTAL_PHRASES = categories.flatMap(c => c.phrases).length;
const STREAK_MEDALS = [
  { threshold: 3, emoji: "🔥", label: "3 streak" },
  { threshold: 5, emoji: "⚡", label: "5 streak" },
  { threshold: 8, emoji: "🌟", label: "8 streak" },
];
function getDailyPhrases(all) {
  const seed = Math.floor(Date.now() / 86400000);
  const seeded = [...all].map((p, i) => ({ p, sort: ((i + 1) * seed * 2654435761) % 4294967296 }));
  seeded.sort((a, b) => a.sort - b.sort);
  return seeded.map(x => x.p).slice(0, 5);
}
function getWrongs(phrase, all, field) {
  return shuffle(all.filter(p => p[field] !== phrase[field])).slice(0, 3).map(p => p[field]);
}
// ── BROWSE ───────────────────────────────────────────────────────────────────
function BrowseMode({ favorites, toggleFavorite }) {
  const [activeCat, setActiveCat] = useState("essentials");
  const [flipped, setFlipped] = useState({});
  const [showFavs, setShowFavs] = useState(false);
  const { speak, speaking } = useSpeech();
  const allPhrases = categories.flatMap(c => c.phrases);
  const phrases = showFavs
    ? allPhrases.filter(p => favorites.includes(p.pt))
    : (categories.find(c => c.id === activeCat) || categories[0]).phrases;
  return (
    <div>
      <div style={{ display: "flex", gap: 7, marginBottom: 16, flexWrap: "wrap" }}>
        <PillBtn onClick={() => { setShowFavs(true); setFlipped({}); }} active={showFavs} color="#f59e0b">
          ⭐ Saved {favorites.length > 0 ? "(" + favorites.length + ")" : ""}
        </PillBtn>
        {categories.map(cat => (
          <PillBtn key={cat.id} onClick={() => { setActiveCat(cat.id); setShowFavs(false); setFlipped({}); }} active={!showFavs && activeCat === cat.id} color={C.gold}>
            {cat.emoji} {cat.label}
          </PillBtn>
        ))}
      </div>
      {showFavs && phrases.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: C.muted }}>
          <div style={{ fontSize: 40, marginBottom: 12 }}>⭐</div>
          <div>No favorites yet — tap ☆ on any phrase</div>
        </div>
      )}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {phrases.map((phrase, i) => {
          const isFav = favorites.includes(phrase.pt);
          return (
            <Card key={i} onClick={() => setFlipped(f => ({ ...f, [i]: !f[i] }))} accent={flipped[i] ? C.gold + "66" : undefined} style={{ background: flipped[i] ? C.goldLight : C.card }}>
              <div style={{ display: "flex", gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, color: C.text, marginBottom: 2, fontWeight: "600" }}>{phrase.pt}</div>
                  <div style={{ fontSize: 13, color: C.muted, marginBottom: 5 }}>{phrase.en}</div>
                  <div style={{ fontSize: 11, color: C.green, fontFamily: "monospace" }}>🔊 {phrase.pr}</div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                  <button onClick={e => { e.stopPropagation(); toggleFavorite(phrase.pt); }} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: isFav ? "#f59e0b" : "#d1d5db" }}>
                    {isFav ? "⭐" : "☆"}
                  </button>
                  <SpeakBtn text={phrase.pt} speak={speak} speaking={speaking} color={C.gold} />
                  <div style={{ fontSize: 9, color: C.muted }}>{flipped[i] ? "▲" : "▼"}</div>
                </div>
              </div>
              {flipped[i] && (
                <div style={{ marginTop: 10, paddingTop: 10, borderTop: "1px solid " + C.gold + "33", fontSize: 12, color: "#92400e", lineHeight: 1.6 }}>
                  💡 {phrase.tip}
                </div>
              )}
            </Card>
          );
        })}
      </div>
    </div>
  );
}

// ── QUIZ MODE ────────────────────────────────────────────────────────────────
function QuizMode({ type, favorites, onBack, onComplete }) {
  const allPhrases = categories.flatMap(c => c.phrases);
  const pool = type === "favorites" && favorites.length >= 4
    ? allPhrases.filter(p => favorites.includes(p.pt))
    : allPhrases;
  const playSound = useSound();
  const [state] = useState(() => {
    const phrases = shuffle(pool).slice(0, 10);
    const options = phrases.map(phrase => {
      const wrongs = type === "pronunciation"
        ? getWrongs(phrase, allPhrases, "pr")
        : getWrongs(phrase, allPhrases, "en");
      return shuffle([...wrongs, type === "pronunciation" ? phrase.pr : phrase.en]);
    });
    return { phrases, options };
  });
  const [idx, setIdx] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [medal, setMedal] = useState(null);
  const [done, setDone] = useState(false);
  const { speak, speaking } = useSpeech();
  const cur = state.phrases[idx];
  const correctAnswer = type === "pronunciation" ? cur.pr : cur.en;

  function advance(correct) {
    playSound(correct ? "correct" : "wrong");
    const ns = correct ? streak + 1 : 0;
    setStreak(ns);
    setBestStreak(b => Math.max(b, ns));
    setMedal([...STREAK_MEDALS].reverse().find(m => ns === m.threshold) || null);
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (idx + 1 >= state.phrases.length) {
      setDone(true);
      onComplete && onComplete(score.correct + (correct ? 1 : 0), state.phrases.length);
      return;
    }
    setTimeout(() => { setIdx(i => i + 1); setSelected(null); setRevealed(false); }, type === "reveal" ? 0 : 700);
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ fontSize: 64, marginBottom: 12 }}>{score.correct >= 8 ? "🎉" : score.correct >= 6 ? "👍" : "📚"}</div>
        <div style={{ fontSize: 32, color: C.text, marginBottom: 4, fontWeight: "700" }}>{score.correct} / {score.total}</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 8 }}>{score.correct >= 8 ? "Excellent!" : score.correct >= 6 ? "Good work!" : "Keep practicing!"}</div>
        {bestStreak > 0 && <div style={{ fontSize: 13, color: C.gold, marginBottom: 24 }}>🔥 Best streak: {bestStreak}</div>}
        <button onClick={onBack} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "700" }}>← Home</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10, fontSize: 12 }}>
        <span style={{ color: C.muted }}>{idx + 1}/{state.phrases.length}</span>
        <div style={{ display: "flex", gap: 8 }}>
          {streak > 0 && <span style={{ color: streak >= 5 ? "#f59e0b" : C.gold, fontWeight: "700" }}>🔥 {streak}</span>}
          <span style={{ color: C.green, fontWeight: "600" }}>✅ {score.correct}</span>
        </div>
      </div>
      <ProgressBar value={idx} max={state.phrases.length} color={C.gold} />
      <div style={{ marginBottom: 10 }} />
      {medal && (
        <div style={{ textAlign: "center", marginBottom: 10, padding: "8px 16px", background: C.goldLight, borderRadius: 10, border: "1px solid " + C.gold + "44", fontSize: 14, color: C.gold, fontWeight: "700" }}>
          {medal.emoji} {medal.label} streak!
        </div>
      )}
      <Card accent={C.gold + "44"} style={{ textAlign: "center", marginBottom: 12 }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>
          {type === "pronunciation" ? "Choose the correct pronunciation" : "What does this mean?"}
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ fontSize: 22, color: C.text, fontWeight: "600" }}>{cur.pt}</div>
          <SpeakBtn text={cur.pt} speak={speak} speaking={speaking} color={C.gold} />
        </div>
        {type !== "pronunciation" && <div style={{ fontSize: 11, color: C.green, fontFamily: "monospace", marginBottom: 16 }}>{cur.pr}</div>}
        {type === "pronunciation" && <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>{cur.en}</div>}
        {type === "reveal" ? (
          !revealed ? (
            <button onClick={() => setRevealed(true)} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "600" }}>Reveal Answer</button>
          ) : (
            <div>
              <div style={{ fontSize: 18, color: C.green, marginBottom: 4, fontWeight: "600" }}>{cur.en}</div>
              <div style={{ fontSize: 11, color: C.muted, marginBottom: 16 }}>💡 {cur.tip}</div>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <button onClick={() => advance(true)} style={{ background: C.green, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "600" }}>✓ Got it</button>
                <button onClick={() => advance(false)} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "600" }}>✗ Missed</button>
              </div>
            </div>
          )
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
            {state.options[idx].map((opt, i) => {
              const isCorrect = opt === correctAnswer;
              const isSel = opt === selected;
              let bg = "#f9fafb", border = "#e5e7eb", col = C.text;
              if (selected) {
                if (isCorrect) { bg = C.greenLight; border = C.green; col = C.green; }
                else if (isSel) { bg = C.redLight; border = C.red; col = C.red; }
              }
              return (
                <button
                  key={i}
                  onClick={() => { if (!selected) { setSelected(opt); setTimeout(() => advance(opt === correctAnswer), 700); } }}
                  style={{ background: bg, border: "2px solid " + border, borderRadius: 12, padding: "13px 16px", cursor: selected ? "default" : "pointer", fontFamily: "inherit", fontSize: type === "pronunciation" ? 12 : 14, color: col, textAlign: "left", transition: "all 0.2s", fontWeight: "500" }}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        )}
      </Card>
    </div>
  );
}

// ── DAILY CHALLENGE ──────────────────────────────────────────────────────────
function DailyChallenge({ onBack, onComplete }) {
  const allPhrases = categories.flatMap(c => c.phrases);
  const playSound = useSound();
  const [state] = useState(() => {
    const phrases = getDailyPhrases(allPhrases);
    const options = phrases.map(p => shuffle([...getWrongs(p, allPhrases, "en"), p.en]));
    return { phrases, options };
  });
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState({ correct: 0 });
  const [done, setDone] = useState(false);
  const { speak, speaking } = useSpeech();
  const cur = state.phrases[idx];

  function choose(opt) {
    if (selected) return;
    const correct = opt === cur.en;
    playSound(correct ? "correct" : "wrong");
    setSelected(opt);
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0) }));
    setTimeout(() => {
      if (idx + 1 >= state.phrases.length) { setDone(true); onComplete && onComplete(score.correct + (correct ? 1 : 0), state.phrases.length); }
      else { setIdx(i => i + 1); setSelected(null); }
    }, 700);
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>{score.correct === 5 ? "🌟" : score.correct >= 3 ? "👍" : "📚"}</div>
        <div style={{ fontSize: 28, color: C.text, fontWeight: "700", marginBottom: 4 }}>{score.correct} / 5</div>
        <div style={{ fontSize: 14, color: C.gold, fontWeight: "600", marginBottom: 4 }}>Daily complete!</div>
        <div style={{ fontSize: 12, color: C.muted, marginBottom: 24 }}>Come back tomorrow for 5 new phrases.</div>
        <button onClick={onBack} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "700" }}>← Home</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10, fontSize: 12 }}>
        <span style={{ color: C.muted }}>Daily · {idx + 1}/5</span>
        <span style={{ color: C.green, fontWeight: "600" }}>✅ {score.correct}</span>
      </div>
      <ProgressBar value={idx} max={5} color={C.gold} />
      <div style={{ marginBottom: 10 }} />
      <Card accent={C.gold + "44"} style={{ textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>What does this mean?</div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 6 }}>
          <div style={{ fontSize: 22, color: C.text, fontWeight: "600" }}>{cur.pt}</div>
          <SpeakBtn text={cur.pt} speak={speak} speaking={speaking} color={C.gold} />
        </div>
        <div style={{ fontSize: 11, color: C.green, fontFamily: "monospace", marginBottom: 18 }}>{cur.pr}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
          {state.options[idx].map((opt, i) => {
            const isCorrect = opt === cur.en;
            const isSel = opt === selected;
            let bg = "#f9fafb", border = "#e5e7eb", col = C.text;
            if (selected) {
              if (isCorrect) { bg = C.greenLight; border = C.green; col = C.green; }
              else if (isSel) { bg = C.redLight; border = C.red; col = C.red; }
            }
            return (
              <button key={i} onClick={() => choose(opt)} style={{ background: bg, border: "2px solid " + border, borderRadius: 12, padding: "12px 16px", cursor: selected ? "default" : "pointer", fontFamily: "inherit", fontSize: 14, color: col, textAlign: "left", transition: "all 0.2s", fontWeight: "500" }}>
                {opt}
              </button>
            );
          })}
        </div>
      </Card>
    </div>
  );
}

// ── SCENARIO MODE ────────────────────────────────────────────────────────────
function ScenarioMode({ onBack, onComplete }) {
  const [sIdx, setSIdx] = useState(0);
  const [eIdx, setEIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [done, setDone] = useState(false);
  const [allDone, setAllDone] = useState(false);
  const { speak, speaking } = useSpeech();
  const playSound = useSound();
  const s = SCENARIOS[sIdx];
  const ex = s.exchanges[eIdx];

  function choose(opt) {
    if (selected) return;
    playSound(opt.correct ? "correct" : "wrong");
    setSelected(opt);
  }

  function next() {
    if (eIdx + 1 >= s.exchanges.length) { setDone(true); onComplete && onComplete(); }
    else { setEIdx(e => e + 1); setSelected(null); }
  }

  if (allDone) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🇵🇹</div>
        <div style={{ fontSize: 22, color: C.text, fontWeight: "700", marginBottom: 4 }}>All scenarios complete!</div>
        <div style={{ fontSize: 14, color: C.gold, marginBottom: 24 }}>You're ready for the real thing.</div>
        <button onClick={onBack} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "700" }}>← Home</button>
      </div>
    );
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0" }}>
        <div style={{ fontSize: 48, marginBottom: 10 }}>{s.emoji}</div>
        <div style={{ fontSize: 18, color: C.text, fontWeight: "700", marginBottom: 16 }}>{s.title} complete!</div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          {sIdx + 1 < SCENARIOS.length
            ? <button onClick={() => { setSIdx(i => i + 1); setEIdx(0); setSelected(null); setDone(false); }} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "700" }}>Next: {SCENARIOS[sIdx + 1].emoji} {SCENARIOS[sIdx + 1].title} →</button>
            : <button onClick={() => setAllDone(true)} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 10, padding: "11px 22px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "700" }}>Finish 🎉</button>
          }
          <button onClick={onBack} style={{ background: "#f3f4f6", color: C.text, border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "11px 22px", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>← Home</button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div style={{ marginBottom: 14, padding: "12px 14px", background: C.goldLight, borderRadius: 12, border: "1px solid " + C.gold + "44", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <div style={{ fontSize: 11, color: C.gold, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>{s.emoji} {s.title}</div>
          <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>📍 {s.location} · {s.setting}</div>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>{eIdx + 1}/{s.exchanges.length}</div>
      </div>
      <ProgressBar value={eIdx} max={s.exchanges.length} color={C.gold} />
      <div style={{ marginBottom: 14, marginTop: 12 }}>
        <div style={{ fontSize: 10, color: C.muted, marginBottom: 6, letterSpacing: 1, textTransform: "uppercase" }}>They say:</div>
        <Card accent="#e5e7eb">
          <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 16, color: C.text, fontWeight: "600", marginBottom: 4 }}>{ex.npc}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{ex.npcTr}</div>
            </div>
            <SpeakBtn text={ex.npc} speak={speak} speaking={speaking} color={C.blue} />
          </div>
        </Card>
      </div>
      <div style={{ fontSize: 10, color: C.muted, marginBottom: 8, letterSpacing: 1, textTransform: "uppercase" }}>You respond:</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 14 }}>
        {ex.options.map((opt, i) => {
          const isSel = selected === opt;
          let bg = "#f9fafb", border = "#e5e7eb", col = C.text;
          if (selected) {
            if (opt.correct) { bg = C.greenLight; border = C.green; col = C.green; }
            else if (isSel) { bg = C.redLight; border = C.red; col = C.red; }
          }
          return (
            <button key={i} onClick={() => choose(opt)} style={{ background: bg, border: "2px solid " + border, borderRadius: 12, padding: "12px 14px", cursor: selected ? "default" : "pointer", fontFamily: "inherit", color: col, textAlign: "left", transition: "all 0.2s" }}>
              <div style={{ fontSize: 14, fontWeight: "600", marginBottom: 2 }}>{opt.text}</div>
              <div style={{ fontSize: 11, opacity: 0.75 }}>{opt.en}</div>
              {selected && !opt.correct && isSel && opt.feedback && <div style={{ fontSize: 11, color: "#b45309", marginTop: 5 }}>💡 {opt.feedback}</div>}
            </button>
          );
        })}
      </div>
      {selected && (
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 14, fontWeight: "700", marginBottom: 12, color: selected.correct ? C.green : C.red }}>
            {selected.correct ? "✓ Muito bem!" : "Correct answer highlighted above"}
          </div>
          <button onClick={next} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 10, padding: "11px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "700" }}>
            {eIdx + 1 >= s.exchanges.length ? "Finish →" : "Next →"}
          </button>
        </div>
      )}
    </div>
  );
}

// ── SENTENCE MODE ────────────────────────────────────────────────────────────
function SentenceMode({ onBack, onComplete }) {
  const [pidx, setPidx] = useState(0);
  const [tiles, setTiles] = useState(() => shuffle(SENTENCE_PUZZLES[0].words));
  const [placed, setPlaced] = useState([]);
  const [result, setResult] = useState(null);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [attempted, setAttempted] = useState(new Set());
  const [done, setDone] = useState(false);
  const { speak, speaking } = useSpeech();
  const playSound = useSound();
  const p = SENTENCE_PUZZLES[pidx];

  function nextPuzzle() {
    const newAttempted = new Set([...attempted, pidx]);
    setAttempted(newAttempted);
    const rem = SENTENCE_PUZZLES.map((_, i) => i).filter(i => !newAttempted.has(i));
    if (!rem.length) { setDone(true); return; }
    const next = rem[Math.floor(Math.random() * rem.length)];
    setPidx(next); setTiles(shuffle(SENTENCE_PUZZLES[next].words)); setPlaced([]); setResult(null);
  }

  function check() {
    const correct = placed.join(" ") === p.words.join(" ");
    playSound(correct ? "correct" : "wrong");
    setResult(correct ? "correct" : "wrong");
    setScore(s => ({ correct: s.correct + (correct ? 1 : 0), total: s.total + 1 }));
    if (correct) onComplete && onComplete();
  }

  if (done) {
    return (
      <div style={{ textAlign: "center", padding: "48px 0" }}>
        <div style={{ fontSize: 60, marginBottom: 12 }}>🎓</div>
        <div style={{ fontSize: 22, color: C.text, fontWeight: "700", marginBottom: 24 }}>All puzzles done! {score.correct}/{score.total} correct</div>
        <button onClick={onBack} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 12, padding: "12px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "700" }}>← Home</button>
      </div>
    );
  }

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12, fontSize: 12 }}>
        <span style={{ color: C.muted }}>Puzzle {attempted.size + 1}/{SENTENCE_PUZZLES.length}</span>
        <span style={{ color: C.green, fontWeight: "600" }}>✅ {score.correct}</span>
      </div>
      <Card>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 8 }}>Build this sentence</div>
        <div style={{ fontSize: 17, color: C.text, fontWeight: "600", marginBottom: 4 }}>{p.en}</div>
        {p.hint && <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, fontStyle: "italic" }}>💡 {p.hint}</div>}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 18 }}>
          <div style={{ fontSize: 11, color: C.green, fontFamily: "monospace" }}>{p.pr}</div>
          <SpeakBtn text={p.words.join(" ")} speak={speak} speaking={speaking} color={C.green} />
        </div>
        <div style={{ minHeight: 52, background: result === "correct" ? C.greenLight : result === "wrong" ? C.redLight : "#f9fafb", border: "2px dashed " + (result === "correct" ? C.green : result === "wrong" ? C.red : "#d1d5db"), borderRadius: 12, padding: "10px 12px", marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 7, alignItems: "center", transition: "all 0.3s" }}>
          {placed.length === 0 && <span style={{ color: "#9ca3af", fontSize: 13 }}>Tap words below…</span>}
          {placed.map((word, i) => (
            <button key={i} onClick={() => { if (result) return; setPlaced(pp => pp.filter((_, j) => j !== i)); setTiles(tt => [...tt, word]); }} style={{ background: result === "correct" ? C.green : result === "wrong" ? C.red : C.gold, color: "#fff", border: "none", borderRadius: 8, padding: "6px 12px", cursor: result ? "default" : "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "600" }}>
              {word}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 7, marginBottom: 14 }}>
          {tiles.map((word, i) => (
            <button key={i} onClick={() => { setTiles(tt => tt.filter(w => w !== word)); setPlaced(pp => [...pp, word]); }} style={{ background: "#f3f4f6", color: C.text, border: "1.5px solid #d1d5db", borderRadius: 8, padding: "6px 12px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "500" }}>
              {word}
            </button>
          ))}
        </div>
        {result === "correct" && <div style={{ color: C.green, fontSize: 15, fontWeight: "700", textAlign: "center", marginBottom: 10 }}>✓ Perfeito! 🎉</div>}
        {result === "wrong" && <div style={{ marginBottom: 10, textAlign: "center" }}><div style={{ color: C.red, fontSize: 13, marginBottom: 4 }}>Not quite — correct order:</div><div style={{ color: C.text, fontWeight: "600" }}>{p.words.join(" ")}</div></div>}
        <div style={{ display: "flex", gap: 8, justifyContent: "center" }}>
          {!result && placed.length > 0 && <button onClick={check} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "700" }}>Check ✓</button>}
          {result === "wrong" && <button onClick={() => { setTiles(shuffle(p.words)); setPlaced([]); setResult(null); }} style={{ background: "#f3f4f6", color: C.text, border: "1.5px solid #d1d5db", borderRadius: 10, padding: "10px 20px", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>Try Again</button>}
          {result && <button onClick={nextPuzzle} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 10, padding: "10px 24px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "700" }}>Next →</button>}
          {!result && <button onClick={() => { setTiles(shuffle(p.words)); setPlaced([]); }} style={{ background: "#f3f4f6", color: C.muted, border: "1.5px solid #e5e7eb", borderRadius: 10, padding: "10px 16px", cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>Reset</button>}
        </div>
      </Card>
    </div>
  );
}

// ── TRANSLATE MODE ───────────────────────────────────────────────────────────
function TranslationMode() {
  const [direction, setDirection] = useState("en->pt");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const { speak, speaking } = useSpeech();

  function translate() {
    if (!input.trim()) return;
    const found = lookupTranslation(input, direction);
    setResult(found);
    setNotFound(!found);
  }

  function quickPick(s) {
    setInput(s);
    const found = lookupTranslation(s, direction);
    setResult(found);
    setNotFound(!found);
  }

  const suggestions = direction === "en->pt"
    ? ["Happy birthday", "We're celebrating", "Can we see the stars?", "Can I book a massage?", "The bill please", "Grilled sardines please"]
    : ["Tem mesa para esta noite?", "É típico da região?", "A que horas abre?", "Está longe daqui?"];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 18 }}>
        <div style={{ padding: "7px 16px", borderRadius: 20, background: C.blueLight, border: "1.5px solid " + C.blue + "44", fontSize: 13, color: C.blue, fontWeight: "600" }}>
          {direction === "en->pt" ? "🇬🇧 English" : "🇵🇹 Português"}
        </div>
        <button onClick={() => { setDirection(d => d === "en->pt" ? "pt->en" : "en->pt"); setInput(""); setResult(null); setNotFound(false); }} style={{ background: "#f3f4f6", border: "1.5px solid #e5e7eb", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: C.text, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center" }}>⇄</button>
        <div style={{ padding: "7px 16px", borderRadius: 20, background: "#dcfce7", border: "1.5px solid #16a34a44", fontSize: 13, color: C.green, fontWeight: "600" }}>
          {direction === "en->pt" ? "🇵🇹 Português" : "🇬🇧 English"}
        </div>
      </div>
      <div style={{ marginBottom: 14 }}>
        <textarea value={input} onChange={e => { setInput(e.target.value); setResult(null); setNotFound(false); }} onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); translate(); } }} placeholder={direction === "en->pt" ? "e.g. Happy birthday" : "e.g. Está longe?"} rows={3} style={{ width: "100%", boxSizing: "border-box", background: "#fff", border: "1.5px solid " + C.border, borderRadius: 12, padding: "13px 14px", color: C.text, fontFamily: "Georgia,serif", fontSize: 15, resize: "none", outline: "none", lineHeight: 1.5 }} />
        <button onClick={translate} disabled={!input.trim()} style={{ width: "100%", marginTop: 8, padding: 12, background: !input.trim() ? "#e5e7eb" : C.gold, color: !input.trim() ? C.muted : "#fff", border: "none", borderRadius: 12, cursor: !input.trim() ? "default" : "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "700" }}>Translate →</button>
      </div>
      {notFound && <Card style={{ marginBottom: 12, background: "#fffbeb", border: "1.5px solid #f59e0b44" }}><div style={{ fontSize: 13, color: "#92400e" }}>Phrase not found — try a suggestion or Browse Phrases.</div></Card>}
      {result && (
        <Card accent={C.green + "44"} style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 10, letterSpacing: 3, color: C.muted, textTransform: "uppercase", marginBottom: 10 }}>
            {direction === "en->pt" ? "🇵🇹 Portuguese" : "🇬🇧 English"}
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
            <div style={{ flex: 1, fontSize: 20, color: C.text, fontWeight: "600", lineHeight: 1.4 }}>
              {direction === "en->pt" ? result.pt : result.translation}
            </div>
            {direction === "en->pt" && <SpeakBtn text={result.pt} speak={speak} speaking={speaking} color={C.green} />}
          </div>
          {direction === "en->pt" && result.pr && <div style={{ fontSize: 11, color: C.green, fontFamily: "monospace", marginBottom: 6 }}>🔊 {result.pr}</div>}
          {direction === "en->pt" && result.tip && <div style={{ fontSize: 12, color: "#92400e", background: C.goldLight, borderRadius: 8, padding: "8px 10px", marginTop: 6 }}>💡 {result.tip}</div>}
          <button
            onClick={() => { setInput(""); setResult(null); setNotFound(false); }}
            style={{ marginTop: 12, width: "100%", padding: "10px", background: "#f3f4f6", border: "1.5px solid " + C.border, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontSize: 13, color: C.text, fontWeight: "600" }}
          >
            🔍 Translate Another
          </button>
        </Card>
      )}
      {!result && (
        <div>
          <div style={{ fontSize: 11, color: C.muted, letterSpacing: 2, textTransform: "uppercase", marginBottom: 10 }}>Try these</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => quickPick(s)} style={{ background: "#f9fafb", border: "1.5px solid " + C.border, borderRadius: 10, padding: "10px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, color: C.text, textAlign: "left", fontWeight: "500" }}>{s}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
// ── JACK'S CORNER ────────────────────────────────────────────────────────────
const INTRO_STEPS = [
  { mood: "excited", title: "Olá Jack! I'm Galo! 🐓", body: "I'm a real Portuguese rooster — the lucky Galo de Barcelos! You'll see me everywhere on your trip!", btn: "Hi Galo! 👋" },
  { mood: "happy", title: "We're going on an adventure!", body: "Portugal has castles, beaches, sardines and dragons. Let's learn some words before you get there!", btn: "Sounds amazing! 🏰" },
  { mood: "cheer", title: "Here's how it works:", body: "Pick a world → Learn the words → Quiz time! Answer correctly = ⚡ XP. Get 3 wrong = game over. Pass the quiz to unlock the NEXT world!", btn: "I'm ready! 🚀" },
  { mood: "excited", title: "One more thing…", body: "I'll cheer you on the whole time! When you do great I'll say Incrível! ⭐ And if you miss one: Não faz mal — no worries, try again!", btn: "Vamos! Let's go! 🇵🇹" },
];

function JacksCorner({ onBack }) {
  const [xp, setXP] = useStorage("jack_xp", 0);
  const [unlocked, setUnlocked] = useStorage("jack_unlocked", [0]);
  const [streak, setStreak] = useStorage("jack_streak", { count: 0, lastDate: null });
  const [greeted, setGreeted] = useStorage("jack_greeted", false);
  const [view, setView] = useState(() => {
    try { return JSON.parse(localStorage.getItem("jack_greeted")) ? "map" : "intro"; } catch { return "intro"; }
  });
  const [introStep, setIntroStep] = useState(0);
  const [levelIdx, setLevelIdx] = useState(null);
  const [learnIdx, setLearnIdx] = useState(0);
  const [quiz, setQuiz] = useState(null);
  const [celebration, setCelebration] = useState(null);
  const [confetti, setConfetti] = useState(false);
  const { speak, speaking } = useSpeech(true);
  const playSound = useSound();
  const totalLevel = Math.floor(xp / XP_TO_NEXT) + 1;

  useEffect(() => {
    const today = new Date().toDateString();
    if (streak.lastDate !== today) {
      const yest = new Date();
      yest.setDate(yest.getDate() - 1);
      setStreak({ count: streak.lastDate === yest.toDateString() ? streak.count + 1 : 1, lastDate: today });
    }
  }, []);

  // Galo greeting on open - safe at top level
  useEffect(() => {
    const greeting = GALO_GREETINGS[Math.floor(Math.random() * GALO_GREETINGS.length)];
    setTimeout(() => speak(greeting), 800);
  }, []);

  // Word of day and streak badge - computed at top level
  const wordOfDay = JACK_WORDS_OF_DAY[Math.floor(Date.now() / 86400000) % JACK_WORDS_OF_DAY.length];
  const earnedBadge = [...STREAK_BADGES].reverse().find(b => streak.count >= b.days);

  function startLearn(idx) {
    setLevelIdx(idx); setLearnIdx(0); setView("learn");
    setTimeout(() => speak(JACK_LEVELS[idx].phrases[0].pt), 200);
  }

  function startQuiz(idx) {
    const level = JACK_LEVELS[idx];
    const allP = JACK_LEVELS.flatMap(l => l.phrases);
    const phrases = shuffle(level.phrases);
    const opts = phrases.map(ph => shuffle([...shuffle(allP.filter(x => x.en !== ph.en)).slice(0, 3).map(x => x.en), ph.en]));
    setQuiz({ levelIdx: idx, phrases, opts, idx: 0, lives: 3, xpEarned: 0, selected: null, done: false, feedback: null });
    setLevelIdx(idx);
    setView("quiz");
  }

  function handleAnswer(opt) {
    if (!quiz || quiz.selected) return;
    const { phrases, idx: qi, lives, xpEarned, levelIdx: li } = quiz;
    const correct = opt === phrases[qi].en;
    playSound(correct ? "correct" : "wrong");
    const newLives = correct ? lives : lives - 1;
    const newXP = correct ? xpEarned + JACK_XP : xpEarned;
    const fb = correct
      ? JACK_PRAISE[Math.floor(Math.random() * JACK_PRAISE.length)]
      : JACK_OOPS[Math.floor(Math.random() * JACK_OOPS.length)];
    setQuiz(q => ({ ...q, selected: opt, lives: newLives, xpEarned: newXP, feedback: fb }));
    setTimeout(() => {
      const next = qi + 1;
      const finished = next >= phrases.length || newLives <= 0;
      if (finished) {
        setXP(x => x + newXP);
        const passed = newXP >= phrases.length * JACK_XP * 0.6 && newLives > 0;
        if (passed) playSound("complete");
        if (passed && li + 1 < JACK_LEVELS.length && !unlocked.includes(li + 1)) {
          setUnlocked(u => [...u, li + 1]);
          setConfetti(true);
          setTimeout(() => setConfetti(false), 2200);
          setCelebration({ type: "unlock", next: JACK_LEVELS[li + 1], xp: newXP });
        } else if (passed) {
          setCelebration({ type: "complete", xp: newXP });
        }
        setQuiz(q => ({ ...q, done: true, selected: null, feedback: null }));
      } else {
        setQuiz(q => ({ ...q, idx: next, selected: null, feedback: null }));
        if (correct) setTimeout(() => speak(phrases[next].pt), 100);
      }
    }, 900);
  }

  // INTRO
  if (view === "intro") {
    const step = INTRO_STEPS[introStep];
    const isLast = introStep === INTRO_STEPS.length - 1;
    return (
      <div style={{ textAlign: "center", padding: "16px 8px" }}>
        <div style={{ marginBottom: 20, padding: 20, background: "linear-gradient(135deg,#eff6ff,#faf5ff)", borderRadius: 20, border: "2px solid #c7d2fe" }}>
          {introStep === 0 ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <JackImg size={130} wave={true} />
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                <Galo mood="excited" size={60} animate={true} />
                <div style={{ background: "#fff", border: "2px solid #c7d2fe", borderRadius: 12, padding: "8px 12px", fontSize: 13, color: "#6366f1", fontWeight: "700", maxWidth: 180, textAlign: "left", lineHeight: 1.5 }}>
                  Olá Jack! I'm Galo! 🐓<br />
                  <span style={{ fontSize: 11, color: "#6b7280", fontWeight: "500" }}>Your Portuguese adventure buddy!</span>
                </div>
              </div>
            </div>
          ) : (
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 12 }}>
              <Galo mood={step.mood} size={90} animate={true} />
            </div>
          )}
          <div style={{ fontSize: 21, color: C.text, fontWeight: "800", marginBottom: 8 }}>{step.title}</div>
          <div style={{ fontSize: 14, color: "#4b5563", lineHeight: 1.7 }}>{step.body}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", gap: 8, marginBottom: 16 }}>
          {INTRO_STEPS.map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i === introStep ? "#6366f1" : "#c7d2fe", transition: "all 0.3s" }} />
          ))}
        </div>
        <button
          onClick={() => { if (isLast) { setGreeted(true); setView("map"); } else setIntroStep(s => s + 1); }}
          style={{ background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff", border: "none", borderRadius: 14, padding: "15px 32px", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: "800", boxShadow: "0 4px 16px rgba(99,102,241,0.4)", width: "100%" }}
        >
          {step.btn}
        </button>
        {introStep > 0 && <button onClick={() => setIntroStep(s => s - 1)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 13, marginTop: 10 }}>← Back</button>}
      </div>
    );
  }

  // CELEBRATION
  if (celebration) {
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        {confetti && <Confetti />}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 8 }}>
          <JackImg size={110} wave={true} />
        </div>
        <div style={{ fontSize: 64, marginBottom: 8, animation: "bounce 0.5s ease infinite alternate" }}>
          {celebration.type === "unlock" ? "🔓" : "🏆"}
        </div>
        <div style={{ fontSize: 22, color: C.text, fontWeight: "800", marginBottom: 8 }}>
          {celebration.type === "unlock" ? "New World Unlocked!" : "Level Complete!"}
        </div>
        {celebration.type === "unlock" && (
          <div style={{ fontSize: 48, margin: "10px 0" }}>{celebration.next.emoji}</div>
        )}
        <div style={{ fontSize: 18, color: celebration.type === "unlock" ? "#2563eb" : C.gold, fontWeight: "700", marginBottom: 10 }}>
          {celebration.type === "unlock" ? celebration.next.label + " is now open! 🎉" : "You earned +" + celebration.xp + " XP!"}
        </div>
        <XPPill xp={xp} />
        <div style={{ marginTop: 24 }}>
          <button onClick={() => { setCelebration(null); setView("map"); }} style={{ background: C.gold, color: "#fff", border: "none", borderRadius: 14, padding: "14px 32px", cursor: "pointer", fontFamily: "inherit", fontSize: 16, fontWeight: "800" }}>
            Back to Map 🗺️
          </button>
        </div>
      </div>
    );
  }

  // QUIZ DONE
  if (view === "quiz" && quiz && quiz.done) {
    const { phrases, xpEarned, lives, levelIdx: li } = quiz;
    const pct = Math.round((xpEarned / (phrases.length * JACK_XP)) * 100);
    const passed = xpEarned >= phrases.length * JACK_XP * 0.6 && lives > 0;
    const isLegendary = pct === 100 && lives === 3;
    return (
      <div style={{ textAlign: "center", padding: "24px 0" }}>
        {isLegendary && <Confetti />}
        <div style={{ fontSize: isLegendary ? 80 : 60, marginBottom: 12, animation: isLegendary ? "bounce 0.4s ease infinite alternate" : "none" }}>{isLegendary ? "👑" : passed ? "⭐" : "💪"}</div>
        {isLegendary && <div style={{ fontSize: 28, color: "#f59e0b", fontWeight: "900", marginBottom: 8, textShadow: "0 2px 8px #f59e0b44" }}>LENDÁRIO! 🔥🏆🎉</div>}
        <GaloSays mood={isLegendary ? "cheer" : passed ? "cheer" : "thinking"} message={isLegendary ? "LENDÁRIO! Perfeito! És incrível! 👑🔥" : passed ? "Incrível! You crushed it! 🎉" : "Não faz mal! Try again — you'll get it!"} color={isLegendary ? "#f59e0b" : passed ? C.green : C.gold} />
        <div style={{ display: "flex", justifyContent: "center", gap: 24, marginBottom: 24 }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, color: C.gold, fontWeight: "800" }}>+{xpEarned}</div>
            <div style={{ color: C.muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase" }}>XP</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 24 }}>{"❤️".repeat(lives) + "🖤".repeat(3 - lives)}</div>
            <div style={{ color: C.muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase" }}>Lives</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 26, color: C.green, fontWeight: "800" }}>{pct}%</div>
            <div style={{ color: C.muted, fontSize: 11, fontWeight: "600", textTransform: "uppercase" }}>Score</div>
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
          <button onClick={() => startQuiz(li)} style={{ background: "#2563eb", color: "#fff", border: "none", borderRadius: 12, padding: "12px 22px", cursor: "pointer", fontFamily: "inherit", fontSize: 14, fontWeight: "700" }}>🔄 Try Again</button>
          <button onClick={() => setView("map")} style={{ background: "#f3f4f6", color: C.text, border: "1.5px solid " + C.border, borderRadius: 12, padding: "12px 22px", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>🗺️ Map</button>
        </div>
      </div>
    );
  }

  // LEARN
  if (view === "learn" && levelIdx !== null) {
    const level = JACK_LEVELS[levelIdx];
    const phrase = level.phrases[learnIdx];
    const isLast = learnIdx === level.phrases.length - 1;
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
          <button onClick={() => setView("map")} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontFamily: "inherit", fontSize: 13 }}>← Map</button>
          <div style={{ fontSize: 12, color: level.color, fontWeight: "700" }}>{level.emoji} {level.label} · {learnIdx + 1}/{level.phrases.length}</div>
        </div>
        <ProgressBar value={learnIdx + 1} max={level.phrases.length} color={level.color} />
        <div style={{ marginBottom: 14 }} />
        <GaloSays mood={level.galo} message={learnIdx === 0 ? "Let's learn " + level.label + "! Tap the card to hear it! 🎤" : "Keep going! " + (learnIdx + 1) + " down, " + (level.phrases.length - learnIdx - 1) + " to go!"} color={level.color} />
        <div
          onClick={() => { speak(phrase.pt); playSound("tap"); }}
          style={{ background: level.bg, border: "3px solid " + level.color + "55", borderRadius: 24, padding: "36px 20px", textAlign: "center", marginBottom: 18, cursor: "pointer", boxShadow: "0 8px 24px " + level.color + "22", userSelect: "none" }}
        >
          <div style={{ fontSize: 80, marginBottom: 16 }}>{phrase.emoji}</div>
          <div style={{ fontSize: 30, color: C.text, fontWeight: "800", marginBottom: 8 }}>{phrase.pt}</div>
          <div style={{ fontSize: 18, color: C.muted, marginBottom: 10 }}>{phrase.en}</div>
          <div style={{ fontSize: 13, color: level.color, fontFamily: "monospace", fontWeight: "600", background: "#fff", display: "inline-block", padding: "4px 12px", borderRadius: 20, border: "1px solid " + level.color + "44" }}>🔊 {phrase.pr}</div>
          <div style={{ fontSize: 11, color: "#9ca3af", marginTop: 12 }}>Tap to hear it!</div>
        </div>
        <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
          {learnIdx > 0 && (
            <button onClick={() => { setLearnIdx(i => i - 1); speak(level.phrases[learnIdx - 1].pt); }} style={{ background: "#f3f4f6", color: C.text, border: "1.5px solid " + C.border, borderRadius: 12, padding: "13px 20px", cursor: "pointer", fontFamily: "inherit", fontSize: 14 }}>← Back</button>
          )}
          {!isLast ? (
            <button onClick={() => { setLearnIdx(i => i + 1); setTimeout(() => speak(level.phrases[learnIdx + 1].pt), 100); playSound("tap"); }} style={{ background: level.color, color: "#fff", border: "none", borderRadius: 12, padding: "13px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "800", flex: 1 }}>Next →</button>
          ) : (
            <button onClick={() => startQuiz(levelIdx)} style={{ background: "linear-gradient(135deg," + level.color + ",#7c3aed)", color: "#fff", border: "none", borderRadius: 12, padding: "13px 28px", cursor: "pointer", fontFamily: "inherit", fontSize: 15, fontWeight: "800", flex: 1 }}>🎮 Quiz Time!</button>
          )}
        </div>
      </div>
    );
  }

  // QUIZ IN PROGRESS
  if (view === "quiz" && quiz) {
    const { phrases, opts, idx: qi, lives, xpEarned, selected: sel, feedback, levelIdx: li } = quiz;
    const level = JACK_LEVELS[li];
    const cur = phrases[qi];
    return (
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ fontSize: 22 }}>{"❤️".repeat(lives) + "🖤".repeat(3 - lives)}</div>
          <XPPill xp={xpEarned} />
          <div style={{ fontSize: 12, color: C.muted, fontWeight: "600" }}>{qi + 1}/{phrases.length}</div>
        </div>
        <ProgressBar value={qi} max={phrases.length} color={level.color} />
        <div style={{ marginBottom: 12 }} />
        {feedback && <GaloSays mood={feedback.mood} message={feedback.text + " " + feedback.sub} color={feedback.mood === "sad" || feedback.mood === "thinking" ? C.red : C.green} />}
        <div onClick={() => { speak(cur.pt); playSound("tap"); }} style={{ background: level.bg, border: "2px solid " + level.color + "44", borderRadius: 20, padding: "24px 18px", textAlign: "center", marginBottom: 14, cursor: "pointer", userSelect: "none" }}>
          <div style={{ fontSize: 60, marginBottom: 12 }}>{cur.emoji}</div>
          <div style={{ fontSize: 9, letterSpacing: 3, color: level.color, textTransform: "uppercase", fontWeight: "700", marginBottom: 8 }}>What does this mean?</div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
            <div style={{ fontSize: 24, color: C.text, fontWeight: "800" }}>{cur.pt}</div>
            <SpeakBtn text={cur.pt} speak={speak} speaking={speaking} color={level.color} />
          </div>
          <div style={{ fontSize: 12, color: level.color, fontFamily: "monospace", fontWeight: "600", marginTop: 6 }}>{cur.pr}</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {opts[qi].map((opt, i) => {
            const isCorrect = opt === cur.en;
            const isSel = opt === sel;
            let bg = "#fff", border = "#e5e7eb", col = C.text;
            if (sel) {
              if (isCorrect) { bg = C.greenLight; border = C.green; col = C.green; }
              else if (isSel) { bg = C.redLight; border = C.red; col = C.red; }
            }
            return (
              <button key={i} onClick={() => handleAnswer(opt)} style={{ background: bg, border: "2.5px solid " + border, borderRadius: 14, padding: "16px 18px", cursor: sel ? "default" : "pointer", fontFamily: "inherit", fontSize: 17, color: col, fontWeight: "600", textAlign: "center", transition: "all 0.2s", boxShadow: sel ? "none" : "0 2px 8px rgba(0,0,0,0.06)" }}>
                {isCorrect && sel ? "✅ " + opt : isSel && sel ? "❌ " + opt : opt}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // MAP
  return (
    <div>
      {confetti && <Confetti />}
      <div style={{ marginBottom: 18, padding: 16, background: "linear-gradient(135deg,#eff6ff,#faf5ff)", borderRadius: 18, border: "2px solid #c7d2fe", boxShadow: "0 4px 16px rgba(99,102,241,0.1)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <JackImg size={44} />
            <Galo mood="happy" size={44} />
            <div>
              <div style={{ fontSize: 10, color: "#6366f1", fontWeight: "700", letterSpacing: 2, textTransform: "uppercase" }}>Jack's Adventure</div>
              <div style={{ fontSize: 18, color: C.text, fontWeight: "800" }}>Level {totalLevel} Explorer ⚔️</div>
            </div>
          </div>
          <div style={{ textAlign: "center", background: "#fff", border: "2px solid #c7d2fe", borderRadius: 14, padding: "8px 14px" }}>
            <div style={{ fontSize: 22, color: "#6366f1", fontWeight: "800" }}>{xp}</div>
            <div style={{ fontSize: 9, color: "#6366f1", fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>XP</div>
          </div>
        </div>
        <ProgressBar value={xp % XP_TO_NEXT} max={XP_TO_NEXT} color="#6366f1" height={8} />
        <div style={{ display: "flex", gap: 14, marginTop: 10, fontSize: 12, flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ color: "#6366f1", fontWeight: "600" }}>🔥 {streak.count} day streak</span>
          <span style={{ color: C.muted }}>🌍 {unlocked.length}/{JACK_LEVELS.length} worlds</span>
          {earnedBadge && <span style={{ color: earnedBadge.color, fontWeight: "700" }}>{earnedBadge.emoji} {earnedBadge.label}</span>}
        </div>
      </div>

      <div onClick={() => speak(wordOfDay.pt)} style={{ marginBottom: 14, padding: "12px 16px", background: "linear-gradient(135deg,#fef3dc,#fffbeb)", border: "2px solid #f59e0b44", borderRadius: 14, cursor: "pointer", display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ fontSize: 32 }}>{wordOfDay.emoji}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: "#92400e", fontWeight: "700", letterSpacing: 2, textTransform: "uppercase", marginBottom: 2 }}>🐓 Galo's Word of the Day</div>
          <div style={{ fontSize: 20, color: C.text, fontWeight: "800" }}>{wordOfDay.pt}</div>
          <div style={{ fontSize: 13, color: C.muted }}>{wordOfDay.en} · <span style={{ fontFamily: "monospace", color: "#16a34a" }}>{wordOfDay.pr}</span></div>
        </div>
        <div style={{ fontSize: 11, color: C.muted }}>Tap to hear!</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {JACK_LEVELS.map((level, i) => {
          const isUnlocked = unlocked.includes(i);
          return (
            <div key={i} style={{ background: isUnlocked ? level.bg : "#f9fafb", border: "2px solid " + (isUnlocked ? level.color + "66" : "#e5e7eb"), borderRadius: 16, padding: "14px 16px", opacity: isUnlocked ? 1 : 0.6, transition: "all 0.2s" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ fontSize: 36, width: 46, textAlign: "center" }}>{isUnlocked ? level.emoji : "🔒"}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 16, color: isUnlocked ? C.text : C.muted, fontWeight: "700", marginBottom: 2 }}>{level.label}</div>
                  <div style={{ fontSize: 12, color: C.muted }}>{level.phrases.length} words{!isUnlocked ? " · Complete previous world to unlock" : ""}</div>
                </div>
                {isUnlocked && (
                  <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => startLearn(i)} style={{ background: level.color, color: "#fff", border: "none", borderRadius: 10, padding: "9px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: "700", boxShadow: "0 2px 8px " + level.color + "44" }}>Learn</button>
                    <button onClick={() => startQuiz(i)} style={{ background: "#fff", color: level.color, border: "2px solid " + level.color + "66", borderRadius: 10, padding: "9px 14px", cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: "700" }}>Quiz</button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <button onClick={() => { setIntroStep(0); setView("intro"); }} style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 10, width: "100%", background: "linear-gradient(135deg,#eff6ff,#faf5ff)", border: "2px solid #c7d2fe", borderRadius: 14, padding: "12px 16px", cursor: "pointer", fontFamily: "inherit" }}>
        <Galo mood="happy" size={36} />
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 13, color: "#6366f1", fontWeight: "700" }}>Meet Galo Again</div>
          <div style={{ fontSize: 11, color: C.muted }}>Replay the intro</div>
        </div>
      </button>

      <ChallengeEmily jackXP={xp} />
    </div>
  );
}

function ChallengeEmily({ jackXP }) {
  let emilyProgress = { quizzesCompleted: 0, phrasesCorrect: 0 };
  try {
    const stored = localStorage.getItem("pt_progress_emily");
    if (stored) emilyProgress = JSON.parse(stored);
  } catch {}
  const emilyScore = emilyProgress.quizzesCompleted * 10 + emilyProgress.phrasesCorrect * 2;
  const jackScore = jackXP * XP_MULTIPLIER.jack;
  const jackWinning = jackScore >= emilyScore;
  return (
    <div style={{ marginTop: 10, padding: "14px 16px", background: jackWinning ? "#ecfdf5" : "#fef2f2", border: "2px solid " + (jackWinning ? "#16a34a44" : "#dc262644"), borderRadius: 14 }}>
      <div style={{ fontSize: 11, fontWeight: "700", textTransform: "uppercase", letterSpacing: 1, color: jackWinning ? "#16a34a" : "#dc2626", marginBottom: 8 }}>
        {jackWinning ? "🏆 You're beating Emily!" : "😤 Emily is ahead!"}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: "800", color: "#6366f1" }}>{jackScore}</div>
          <div style={{ color: C.muted }}>Jack ⚡2x</div>
        </div>
        <div style={{ fontSize: 24, alignSelf: "center" }}>vs</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 22, fontWeight: "800", color: "#db2777" }}>{emilyScore}</div>
          <div style={{ color: C.muted }}>Emily 🌸</div>
        </div>
      </div>
      {!jackWinning && <div style={{ fontSize: 12, color: "#dc2626", marginTop: 8, textAlign: "center" }}>Keep quizzing to catch up! 💪</div>}
    </div>
  );
}
// ── HOME ─────────────────────────────────────────────────────────────────────
function Home({ onNavigate, progress, favorites, currentProfileId }) {
  const pct = Math.round((progress.phrasesCorrect / TOTAL_PHRASES) * 100);
  const dailyDone = progress.lastDaily === new Date().toDateString();
  const modes = [
    { id: "daily", emoji: "☀️", label: "Daily Challenge", desc: dailyDone ? "✓ Done today — come back tomorrow" : "5 new phrases · " + DAYS_LEFT + " days to go", hot: !dailyDone, color: "#f59e0b", bg: "#fffbeb" },
    { id: "jack", emoji: "⚔️", label: "Jack's Corner", desc: "6 worlds · XP · Galo the rooster · sounds!", color: "#6366f1", bg: "#eff6ff" },
    { id: "quickfire", emoji: "⚡", label: "Quick Fire", desc: "10 multiple choice questions · meaning quiz", color: C.gold, bg: C.goldLight },
    { id: "pronunciation", emoji: "🔊", label: "Pronunciation Quiz", desc: "Pick the right sounds — hardest mode", color: "#0891b2", bg: "#ecfeff" },
    { id: "flashcards", emoji: "🃏", label: "Flashcards", desc: "Reveal & self-grade at your own pace", color: "#7c3aed", bg: "#f5f3ff" },
    { id: "sentence", emoji: "🧩", label: "Build a Sentence", desc: "Tap word tiles into the right order", color: "#0d9488", bg: "#f0fdfa" },
    { id: "scenario", emoji: "🎭", label: "Scenarios", desc: "5 real conversations · Évora · Odemira · Cascais", color: "#dc2626", bg: "#fef2f2" },
    { id: "browse", emoji: "📖", label: "Browse Phrases", desc: TOTAL_PHRASES + " phrases · insider tips · pronunciation", color: C.pt, bg: "#f0fdf4" },
    { id: "favorites", emoji: "⭐", label: "Favorites Quiz", desc: favorites.length >= 4 ? "Drill your " + favorites.length + " starred phrases" : "Star 4+ phrases in Browse to unlock", color: "#f59e0b", bg: "#fffbeb", disabled: favorites.length < 4 },
    { id: "translate", emoji: "🔄", label: "Translate", desc: "English ⇄ Portuguese · trip phrases", color: "#2563eb", bg: "#eff6ff" },
  ];
  return (
    <div>
      <div style={{ marginBottom: 18, borderRadius: 20, overflow: "hidden", background: "linear-gradient(135deg,#006600 0%,#003300 40%,#cc0000 100%)", padding: "22px 20px", position: "relative", boxShadow: "0 8px 32px rgba(0,100,0,0.2)" }}>
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 5, background: "repeating-linear-gradient(90deg,#006600 0,#006600 33%,#ffffff 33%,#ffffff 66%,#cc0000 66%,#cc0000 100%)", opacity: 0.6 }} />
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
          <div>
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", letterSpacing: 3, textTransform: "uppercase", marginBottom: 4 }}>Bem-vindos</div>
            <div style={{ fontSize: 26, color: "#fff", fontWeight: "800", marginBottom: 2 }}>🇵🇹 Portugal</div>
            <div style={{ fontSize: 12, color: "rgba(255,255,255,0.65)" }}>Lisbon · Évora · Odemira · Cascais</div>
          </div>
          <div style={{ background: "rgba(255,255,255,0.15)", border: "2px solid rgba(255,255,255,0.35)", borderRadius: 14, padding: "10px 14px", textAlign: "center" }}>
            <div style={{ fontSize: 26, color: "#fff", fontWeight: "800", lineHeight: 1 }}>{DAYS_LEFT}</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,0.8)", fontWeight: "700", textTransform: "uppercase", letterSpacing: 1 }}>days</div>
          </div>
        </div>
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5, fontSize: 11 }}>
            <span style={{ color: "rgba(255,255,255,0.7)" }}>Progress</span>
            <span style={{ color: "#fff", fontWeight: "700" }}>{progress.phrasesCorrect}/{TOTAL_PHRASES} · {pct}%</span>
          </div>
          <div style={{ height: 8, background: "rgba(255,255,255,0.2)", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: pct + "%", background: "linear-gradient(90deg,#fbbf24,#f59e0b)", borderRadius: 4, transition: "width 0.6s" }} />
          </div>
        </div>
        <div style={{ display: "flex", gap: 14, fontSize: 12, color: "rgba(255,255,255,0.75)", flexWrap: "wrap" }}>
          <span>🔥 {progress.streak} streak</span>
          <span>⭐ {favorites.length} saved</span>
          <span>✅ {progress.quizzesCompleted} quizzes</span>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
        {modes.map(m => (
          <button
            key={m.id}
            onClick={() => !m.disabled && onNavigate(m.id)}
            disabled={m.disabled}
            style={{ background: m.bg || "#fff", border: "2px solid " + m.color + "33", borderRadius: 14, padding: "13px 16px", cursor: m.disabled ? "default" : "pointer", fontFamily: "inherit", textAlign: "left", transition: "all 0.2s", display: "flex", alignItems: "center", gap: 14, opacity: m.disabled ? 0.5 : 1, boxShadow: m.hot ? "0 4px 16px " + m.color + "33" : "0 1px 4px rgba(0,0,0,0.05)" }}
          >
            <div style={{ fontSize: 26, width: 34, textAlign: "center" }}>{m.emoji}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, color: m.color, fontWeight: "700", marginBottom: 2 }}>{m.label}{m.hot ? " 🔴" : ""}</div>
              <div style={{ fontSize: 12, color: C.muted }}>{m.desc}</div>
            </div>
            {!m.disabled && <span style={{ color: m.color + "88", fontSize: 18, fontWeight: "700" }}>›</span>}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: "12px 14px", background: "#eff6ff", borderRadius: 12, border: "1.5px solid #bfdbfe", fontSize: 12, color: "#1e40af", lineHeight: 1.7 }}>
        🐓 <strong>Meet Galo!</strong> He's Portugal's famous good-luck rooster — the <em>Galo de Barcelos</em>. Jack has him as his quiz buddy in Jack's Corner.
      </div>
      <FamilyProgress currentProfileId={currentProfileId} />
    </div>
  );
}

// ── LEADERBOARD & FAMILY PROGRESS ───────────────────────────────────────────
function FamilyProgress({ currentProfileId }) {
  const profiles = PROFILES;
  const data = profiles.map(p => {
    let progress = { phrasesCorrect: 0, quizzesCompleted: 0, streak: 0 };
    let jackXP = 0;
    let jackStreak = 0;
    try {
      const stored = localStorage.getItem("pt_progress_" + p.id);
      if (stored) progress = JSON.parse(stored);
      if (p.id === "jack") {
        const xp = localStorage.getItem("jack_xp");
        if (xp) jackXP = JSON.parse(xp);
        const st = localStorage.getItem("jack_streak");
        if (st) jackStreak = (JSON.parse(st) || {}).count || 0;
      }
    } catch {}
    const pct = Math.round((progress.phrasesCorrect / TOTAL_PHRASES) * 100);
    const mult = XP_MULTIPLIER[p.id] || 1;
    const baseScore = progress.quizzesCompleted * 10 + progress.phrasesCorrect * 2;
    const score = p.id === "jack" ? (baseScore + jackXP) * mult : baseScore;
    const streak = p.id === "jack" ? jackStreak : (progress.streak || 0);
    return { ...p, progress, pct, jackXP, score, streak };
  }).sort((a, b) => b.score - a.score);

  return (
    <div style={{ marginTop: 20 }}>
      <div style={{ fontSize: 14, fontWeight: "700", color: C.text, marginBottom: 12, textTransform: "uppercase", letterSpacing: 2, fontSize: 11 }}>
        🏆 Family Leaderboard
      </div>
      {data.map((p, rank) => (
        <div key={p.id} style={{ background: p.id === currentProfileId ? p.bg : "#f9fafb", border: "2px solid " + (p.id === currentProfileId ? p.color + "66" : "#e5e7eb"), borderRadius: 14, padding: "12px 14px", marginBottom: 10, display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ fontSize: 24, width: 32, textAlign: "center" }}>{rank === 0 ? "🥇" : rank === 1 ? "🥈" : "🥉"}</div>
          <img src={p.img} alt={p.name} style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", border: "2px solid " + p.color + "44" }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 15, fontWeight: "700", color: p.color }}>{p.name} {p.id === "jack" ? "⚡2x" : ""}</span>
              <span style={{ fontSize: 12, color: C.muted }}>{p.score} pts</span>
            </div>
            <div style={{ height: 6, background: "#e5e7eb", borderRadius: 3, overflow: "hidden" }}>
              <div style={{ height: "100%", width: p.pct + "%", background: p.color, borderRadius: 3, transition: "width 0.5s" }} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 4, fontSize: 11, color: C.muted }}>
              <span>📊 {p.pct}%</span>
              <span>🔥 {p.streak} streak</span>
              <span>✅ {p.progress.quizzesCompleted} quizzes</span>
            </div>
          </div>
        </div>
      ))}
      <div style={{ fontSize: 11, color: C.muted, textAlign: "center", marginTop: 4 }}>⚡ Jack earns 2x points for extra effort!</div>
    </div>
  );
}

// ── PROFILES ─────────────────────────────────────────────────────────────────
const PROFILES = [
  { id: "brant",  name: "Brant",  emoji: "🧔", color: "#2563eb", bg: "#dbeafe", img: BRANT_IMG },
  { id: "emily",  name: "Emily",  emoji: "🌸", color: "#db2777", bg: "#fce7f3", img: EMILY_IMG },
  { id: "jack",   name: "Jack",   emoji: "⚔️", color: "#6366f1", bg: "#eff6ff", img: JACK_AVATAR_IMG },
];

function ProfilePicker({ onSelect }) {
  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Georgia','Times New Roman',serif", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "32px 20px" }}>
      <style>{`
        @keyframes pulse { 0%,100% { opacity:1 } 50% { opacity:0.4 } }
        @keyframes bounce { 0% { transform:translateY(0) } 100% { transform:translateY(-10px) } }
        @keyframes fall { 0% { transform:translateY(-20px) rotate(0deg); opacity:1 } 100% { transform:translateY(110vh) rotate(720deg); opacity:0 } }
        button:active { transform:scale(0.96) }
        * { box-sizing:border-box }
      `}</style>
      <div style={{ marginBottom: 8, textAlign: "center" }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🇵🇹</div>
        <div style={{ fontSize: 26, color: C.text, fontWeight: "800", marginBottom: 4 }}>Fala Português!</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 32 }}>Who's practicing today?</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 340 }}>
        {PROFILES.map(p => (
          <button
            key={p.id}
            onClick={() => onSelect(p)}
            style={{ background: p.bg, border: "2.5px solid " + p.color + "55", borderRadius: 18, padding: "18px 24px", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 16, boxShadow: "0 4px 16px " + p.color + "22", transition: "all 0.2s" }}
          >
            <img src={p.img} alt={p.name} style={{ width: 56, height: 56, borderRadius: "50%", objectFit: "cover", border: "2.5px solid " + p.color + "66", flexShrink: 0 }} />
            <div style={{ textAlign: "left" }}>
              <div style={{ fontSize: 20, color: p.color, fontWeight: "800" }}>{p.name}</div>
              <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>Tap to continue your progress</div>
            </div>
            <div style={{ marginLeft: "auto", fontSize: 20, color: p.color + "88" }}>›</div>
          </button>
        ))}
      </div>
      <div style={{ marginTop: 32, display: "flex", alignItems: "center", gap: 10 }}>
        <Galo mood="happy" size={44} />
        <div style={{ fontSize: 12, color: C.muted, maxWidth: 200, lineHeight: 1.6 }}>Each person has their own scores, streaks and favorites!</div>
      </div>
    </div>
  );
}

// ── APP SHELL ────────────────────────────────────────────────────────────────
const MODE_LABELS = {
  home: "🇵🇹 Fala Português", translate: "🔄 Translate", browse: "📖 Browse",
  daily: "☀️ Daily Challenge", quickfire: "⚡ Quick Fire", pronunciation: "🔊 Pronunciation",
  flashcards: "🃏 Flashcards", sentence: "🧩 Sentences", scenario: "🎭 Scenarios",
  favorites: "⭐ Favorites Quiz", jack: "⚔️ Jack's Corner",
};

function ProfileApp({ profile, onSwitch }) {
  const pid = profile.id;
  const [screen, setScreen] = useState("home");
  const [favorites, setFavorites] = useStorage("pt_favorites_" + pid, []);
  const [progress, setProgress] = useStorage("pt_progress_" + pid, { phrasesCorrect: 0, quizzesCompleted: 0, streak: 0, lastDaily: null });

  function toggleFavorite(pt) {
    setFavorites(f => f.includes(pt) ? f.filter(x => x !== pt) : [...f, pt]);
  }

  function handleComplete(type, correct) {
    setProgress(p => ({
      ...p,
      phrasesCorrect: Math.min(TOTAL_PHRASES, p.phrasesCorrect + (correct || 1)),
      quizzesCompleted: p.quizzesCompleted + 1,
    }));
    if (type === "daily") {
      const today = new Date().toDateString();
      setProgress(p => {
        const yest = new Date(); yest.setDate(yest.getDate() - 1);
        return { ...p, lastDaily: today, streak: p.lastDaily === yest.toDateString() ? p.streak + 1 : p.lastDaily === today ? p.streak : 1 };
      });
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: C.bg, fontFamily: "'Georgia','Times New Roman',serif", color: C.text }}>
      <div style={{ borderBottom: "1.5px solid " + C.border, padding: "14px 20px 12px", background: "#fff", position: "sticky", top: 0, zIndex: 20, boxShadow: "0 1px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 660, margin: "0 auto", display: "flex", alignItems: "center", gap: 12 }}>
          {screen !== "home" && (
            <button onClick={() => setScreen("home")} style={{ background: "#f3f4f6", border: "1.5px solid " + C.border, borderRadius: 8, width: 34, height: 34, cursor: "pointer", color: C.text, fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "inherit" }}>←</button>
          )}
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 8, letterSpacing: 4, color: C.muted, textTransform: "uppercase" }}>Language Coach</div>
            <div style={{ fontSize: 18, color: C.text, fontWeight: "700" }}>{MODE_LABELS[screen]}</div>
          </div>
          <button
            onClick={onSwitch}
            style={{ display: "flex", alignItems: "center", gap: 6, background: profile.bg, border: "1.5px solid " + profile.color + "44", borderRadius: 20, padding: "4px 10px", cursor: "pointer", fontFamily: "inherit" }}
          >
            <img src={profile.img} alt={profile.name} style={{ width: 22, height: 22, borderRadius: "50%", objectFit: "cover" }} />
            <span style={{ fontSize: 12, color: profile.color, fontWeight: "700" }}>{profile.name}</span>
          </button>
        </div>
      </div>
      <div style={{ maxWidth: 660, margin: "0 auto", padding: "20px 16px 60px" }}>
        {screen === "home"          && <Home onNavigate={setScreen} progress={progress} favorites={favorites} currentProfileId={pid} />}
        {screen === "translate"     && <TranslationMode />}
        {screen === "browse"        && <BrowseMode favorites={favorites} toggleFavorite={toggleFavorite} />}
        {screen === "daily"         && <DailyChallenge onBack={() => setScreen("home")} onComplete={(c, t) => handleComplete("daily", c, t)} />}
        {screen === "quickfire"     && <QuizMode type="choice" favorites={favorites} onBack={() => setScreen("home")} onComplete={(c, t) => handleComplete("quiz", c, t)} />}
        {screen === "pronunciation" && <QuizMode type="pronunciation" favorites={favorites} onBack={() => setScreen("home")} onComplete={(c, t) => handleComplete("quiz", c, t)} />}
        {screen === "flashcards"    && <QuizMode type="reveal" favorites={favorites} onBack={() => setScreen("home")} onComplete={(c, t) => handleComplete("quiz", c, t)} />}
        {screen === "favorites"     && <QuizMode type="favorites" favorites={favorites} onBack={() => setScreen("home")} onComplete={(c, t) => handleComplete("quiz", c, t)} />}
        {screen === "sentence"      && <SentenceMode onBack={() => setScreen("home")} onComplete={() => handleComplete("sentence", 1, 1)} />}
        {screen === "scenario"      && <ScenarioMode onBack={() => setScreen("home")} onComplete={() => handleComplete("scenario", 1, 1)} />}
        {screen === "jack"          && <JacksCorner onBack={() => setScreen("home")} />}
      </div>
    </div>
  );
}

export default function App() {
  const [profile, setProfile] = useStorage("pt_active_profile", null);

  if (!profile) {
    return <ProfilePicker onSelect={p => setProfile(p)} />;
  }

  return <ProfileApp profile={profile} onSwitch={() => setProfile(null)} />;
}
