import { useState, useEffect, useRef } from "react";

const PALETTE = {
  bg: "#F6F4F0",
  bgCard: "#FFFFFF",
  bgSoft: "#F0EDE8",
  text: "#1A1714",
  textMuted: "#8A8480",
  textLight: "#B8B4B0",
  accent: "#7C5CFC",
  accentSoft: "#EDE9FF",
  border: "#E8E4DF",
  borderStrong: "#D4CFC9",
};

const WORDS = ["SaaS.", "E-commerces.", "PWA.", "expériences web."];

const SERVICES = [
  {
    icon: "🛒",
    title: "E-commerce",
    sub: "Boutiques sur mesure",
    desc: "De la page produit au paiement — des expériences d'achat fluides qui convertissent.",
    accent: "#7C5CFC",
    accentSoft: "#EDE9FF",
    screens: [
      {
        type: "ecom",
        bg: "#1A1A2E",
        content: [
          { type: "hero", color: "#7C5CFC", text: "NOUVELLE COLLECTION", sub: "Été 2025" },
          { type: "products", items: [{ c: "#E8D5FF", label: "Sac cuir", price: "89 000 GNF" }, { c: "#FFE4D5", label: "Montre", price: "240 000 GNF" }, { c: "#D5F0E8", label: "Lunettes", price: "65 000 GNF" }] },
          { type: "badge", text: "✓ Paiement sécurisé · Livraison 48h" },
        ],
      },
      {
        type: "checkout",
        bg: "#FFFFFF",
        content: [
          { type: "topbar", text: "Finaliser la commande" },
          { type: "summary", items: ["Sac cuir × 1", "Montre × 1"], total: "329 000 GNF" },
          { type: "payBtn", text: "Payer maintenant →", color: "#7C5CFC" },
        ],
      },
    ],
  },
  {
    icon: "⚡",
    title: "SaaS & Dashboards",
    sub: "Applications métier",
    desc: "Plateformes complexes avec authentification, rôles, API et tableaux de bord analytiques.",
    accent: "#FC5C7D",
    accentSoft: "#FFE9EE",
    screens: [
      {
        type: "dashboard",
        bg: "#0F1117",
        content: [
          { type: "dheader", text: "Dashboard Analytics" },
          { type: "metrics", items: [{ v: "12.4k", l: "Ventes", c: "#FC5C7D" }, { v: "94%", l: "Uptime", c: "#00C9A7" }, { v: "3.2M", l: "Revenue", c: "#FFB347" }] },
          { type: "chart", color: "#FC5C7D" },
          { type: "table", rows: ["Station A", "Station B", "Station C"] },
        ],
      },
      {
        type: "login",
        bg: "#F8F9FF",
        content: [
          { type: "logo", text: "fuelo." },
          { type: "form", fields: ["Email", "Mot de passe"] },
          { type: "btn", text: "Connexion", color: "#FC5C7D" },
        ],
      },
    ],
  },
  {
    icon: "✦",
    title: "Sites Vitrines",
    sub: "Présence premium",
    desc: "Identités web modernes et mémorables — optimisées SEO, ultra-rapides, pensées pour convaincre.",
    accent: "#00C9A7",
    accentSoft: "#E0FBF5",
    screens: [
      {
        type: "vitrine",
        bg: "#0D1B2A",
        content: [
          { type: "nav2", brand: "MERIDIEN", links: ["Collection", "À propos", "Contact"] },
          { type: "bigHero", lines: ["Luxe &", "Élégance"], accent: "#00C9A7" },
          { type: "cta2", text: "Découvrir →", color: "#00C9A7" },
        ],
      },
      {
        type: "about",
        bg: "#FAFAF8",
        content: [
          { type: "section", label: "NOTRE HISTOIRE", title: "Artisanat & Design", body: "Créations uniques depuis 2018." },
          { type: "stats2", items: [["200+", "Clients"], ["5★", "Avis"], ["48h", "Livraison"]] },
        ],
      },
    ],
  },
  {
    icon: "◐",
    title: "PWA & Mobile",
    sub: "Apps installables",
    desc: "Applications web progressives qui fonctionnent hors-ligne comme une app native sur smartphone.",
    accent: "#FFB347",
    accentSoft: "#FFF4E0",
    screens: [
      {
        type: "pwa",
        bg: "#1C1C1E",
        content: [
          { type: "appHeader", text: "Fuelo Mobile", icon: "⛽" },
          { type: "statusBadge", text: "● Hors ligne — données synchronisées", color: "#FFB347" },
          { type: "cards2", items: [{ icon: "📦", label: "Stock", val: "2 840 L" }, { icon: "💰", label: "Ventes", val: "4.2M" }, { icon: "🚗", label: "Véhicules", val: "12" }] },
          { type: "syncBtn", text: "Synchroniser", color: "#FFB347" },
        ],
      },
      {
        type: "map",
        bg: "#E8F4F8",
        content: [
          { type: "mapView", label: "GPS Flotte en temps réel" },
          { type: "pins", count: 3 },
        ],
      },
    ],
  },
];

const PROJECTS = [
  { name: "Fuelo", cat: "SaaS · Stations-service", desc: "Anti-fraude, GPS fleet tracking, comptabilité complète, multi-rôles, PWA offline-first.", tags: ["React", "Node.js", "PostgreSQL", "PWA"], url: "https://fuelo-kappa.vercel.app", year: "2025", accent: "#7C5CFC" },
  { name: "MÉRIDIEN", cat: "E-commerce · Luxe", desc: "Boutique haut de gamme avec parallaxe multi-couches, Three.js et panier dynamique.", tags: ["React", "Three.js", "GSAP"], url: "#", year: "2025", accent: "#FC5C7D" },
  { name: "ImmoGest", cat: "Dashboard · Immobilier", desc: "Gestion de biens, locataires et paiements avec reporting analytique temps réel.", tags: ["React", "Chart.js", "Node.js"], url: "#", year: "2024", accent: "#00C9A7" },
  { name: "Portfolio Dev", cat: "Site vitrine · Personnel", desc: "Portfolio animé avec scène Three.js interactive, scroll cinématique et transitions fluides.", tags: ["React", "Three.js", "Framer"], url: "#", year: "2025", accent: "#FFB347" },
];

/* ──────────────────────────────────────────────────── */
/* PHONE MOCKUP SVG                                    */
/* ──────────────────────────────────────────────────── */
function PhoneScreen({ screen }) {
  const { bg, content, type } = screen;
  return (
    <svg viewBox="0 0 160 280" style={{ width: "100%", height: "100%" }}>
      <rect width="160" height="280" fill={bg} />
      {content.map((el, i) => {
        if (el.type === "hero") return (
          <g key={i}>
            <rect x="0" y="0" width="160" height="90" fill={el.color} opacity="0.15" />
            <text x="80" y="38" textAnchor="middle" fill={el.color} fontSize="9" fontWeight="700" fontFamily="sans-serif">{el.text}</text>
            <text x="80" y="54" textAnchor="middle" fill="#ffffff99" fontSize="7" fontFamily="sans-serif">{el.sub}</text>
            <rect x="55" y="64" width="50" height="14" rx="7" fill={el.color} />
            <text x="80" y="73" textAnchor="middle" fill="white" fontSize="6.5" fontWeight="600" fontFamily="sans-serif">Voir collection</text>
          </g>
        );
        if (el.type === "products") return (
          <g key={i}>
            <text x="12" y="106" fill="#ffffff99" fontSize="7" fontFamily="sans-serif">Produits phares</text>
            {el.items.map((item, j) => (
              <g key={j}>
                <rect x={10 + j * 50} y="112" width="44" height="52" rx="6" fill={item.c} opacity="0.9" />
                <text x={32 + j * 50} y="145" textAnchor="middle" fill="#33333399" fontSize="5.5" fontFamily="sans-serif">{item.label}</text>
                <text x={32 + j * 50} y="155" textAnchor="middle" fill="#333" fontSize="5" fontWeight="600" fontFamily="sans-serif">{item.price}</text>
              </g>
            ))}
          </g>
        );
        if (el.type === "badge") return (
          <g key={i}>
            <rect x="15" y="172" width="130" height="14" rx="7" fill="#ffffff11" />
            <text x="80" y="181" textAnchor="middle" fill="#ffffff88" fontSize="5.5" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "topbar") return (
          <g key={i}>
            <rect x="0" y="0" width="160" height="28" fill="#f0f0f0" />
            <text x="80" y="18" textAnchor="middle" fill="#333" fontSize="8" fontWeight="600" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "summary") return (
          <g key={i}>
            {el.items.map((item, j) => (
              <g key={j}>
                <rect x="12" y={40 + j * 32} width="136" height="26" rx="6" fill="#f8f8f8" />
                <text x="22" y={57 + j * 32} fill="#555" fontSize="7" fontFamily="sans-serif">{item}</text>
              </g>
            ))}
            <rect x="12" y="112" width="136" height="1" fill="#eee" />
            <text x="22" y="128" fill="#333" fontSize="8" fontWeight="600" fontFamily="sans-serif">Total</text>
            <text x="138" y="128" textAnchor="end" fill="#7C5CFC" fontSize="8" fontWeight="700" fontFamily="sans-serif">{el.total}</text>
          </g>
        );
        if (el.type === "payBtn") return (
          <g key={i}>
            <rect x="15" y="145" width="130" height="24" rx="12" fill={el.color} />
            <text x="80" y="160" textAnchor="middle" fill="white" fontSize="7.5" fontWeight="600" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "dheader") return (
          <g key={i}>
            <text x="12" y="22" fill="#ffffff" fontSize="9" fontWeight="700" fontFamily="sans-serif">{el.text}</text>
            <rect x="0" y="28" width="160" height="1" fill="#ffffff11" />
          </g>
        );
        if (el.type === "metrics") return (
          <g key={i}>
            {el.items.map((m, j) => (
              <g key={j}>
                <rect x={8 + j * 50} y="34" width="44" height="38" rx="6" fill="#ffffff0d" />
                <text x={30 + j * 50} y="54" textAnchor="middle" fill={m.c} fontSize="10" fontWeight="700" fontFamily="sans-serif">{m.v}</text>
                <text x={30 + j * 50} y="65" textAnchor="middle" fill="#ffffff55" fontSize="5.5" fontFamily="sans-serif">{m.l}</text>
              </g>
            ))}
          </g>
        );
        if (el.type === "chart") return (
          <g key={i}>
            <rect x="8" y="78" width="144" height="60" rx="6" fill="#ffffff08" />
            {[0,1,2,3,4,5,6].map(j => {
              const h = [22, 35, 18, 42, 30, 48, 28][j];
              return <rect key={j} x={16 + j * 19} y={128 - h} width="12" rx="3" height={h} fill={el.color} opacity={0.6 + j * 0.05} />;
            })}
            <text x="80" y="148" textAnchor="middle" fill="#ffffff44" fontSize="5.5" fontFamily="sans-serif">Ventes — 7 derniers jours</text>
          </g>
        );
        if (el.type === "table") return (
          <g key={i}>
            {el.rows.map((r, j) => (
              <g key={j}>
                <rect x="8" y={160 + j * 28} width="144" height="22" rx="4" fill="#ffffff0d" />
                <text x="16" y={175 + j * 28} fill="#ffffffbb" fontSize="6.5" fontFamily="sans-serif">{r}</text>
                <text x="148" y={175 + j * 28} textAnchor="end" fill={el.color || "#FC5C7D"} fontSize="6.5" fontWeight="600" fontFamily="sans-serif">↑ actif</text>
              </g>
            ))}
          </g>
        );
        if (el.type === "logo") return <text key={i} x="80" y="50" textAnchor="middle" fill="#7C5CFC" fontSize="18" fontWeight="800" fontFamily="sans-serif">{el.text}</text>;
        if (el.type === "form") return (
          <g key={i}>
            {el.fields.map((f, j) => (
              <g key={j}>
                <rect x="16" y={68 + j * 42} width="128" height="30" rx="8" fill="#f5f5f5" />
                <text x="26" y={87 + j * 42} fill="#aaa" fontSize="7" fontFamily="sans-serif">{f}</text>
              </g>
            ))}
          </g>
        );
        if (el.type === "btn") return (
          <g key={i}>
            <rect x="16" y="162" width="128" height="30" rx="15" fill={el.color} />
            <text x="80" y="181" textAnchor="middle" fill="white" fontSize="8" fontWeight="600" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "nav2") return (
          <g key={i}>
            <rect x="0" y="0" width="160" height="24" fill="#ffffff0a" />
            <text x="14" y="15" fill="white" fontSize="8" fontWeight="700" fontFamily="sans-serif">{el.brand}</text>
            {el.links.map((l, j) => <text key={j} x={68 + j * 32} y="15" fill="#ffffff77" fontSize="5" fontFamily="sans-serif">{l}</text>)}
          </g>
        );
        if (el.type === "bigHero") return (
          <g key={i}>
            {el.lines.map((l, j) => <text key={j} x="14" y={58 + j * 32} fill="white" fontSize="20" fontWeight="800" fontFamily="serif">{l}</text>)}
            <rect x="14" y="124" width="100" height="2" fill={el.accent} />
          </g>
        );
        if (el.type === "cta2") return (
          <g key={i}>
            <rect x="14" y="138" width="70" height="22" rx="11" fill={el.color} />
            <text x="49" y="152" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "section") return (
          <g key={i}>
            <text x="14" y="24" fill="#aaa" fontSize="5.5" fontWeight="700" letterSpacing="2" fontFamily="sans-serif">{el.label}</text>
            <text x="14" y="44" fill="#1A1714" fontSize="11" fontWeight="700" fontFamily="serif">{el.title}</text>
            <text x="14" y="58" fill="#888" fontSize="6.5" fontFamily="sans-serif">{el.body}</text>
          </g>
        );
        if (el.type === "stats2") return (
          <g key={i}>
            {el.items.map(([v, l], j) => (
              <g key={j}>
                <text x={14 + j * 52} y="90" fill="#1A1714" fontSize="14" fontWeight="800" fontFamily="serif">{v}</text>
                <text x={14 + j * 52} y="103" fill="#aaa" fontSize="6" fontFamily="sans-serif">{l}</text>
              </g>
            ))}
          </g>
        );
        if (el.type === "appHeader") return (
          <g key={i}>
            <text x="14" y="22" fill="white" fontSize="10" fontWeight="700" fontFamily="sans-serif">{el.icon} {el.text}</text>
          </g>
        );
        if (el.type === "statusBadge") return (
          <g key={i}>
            <rect x="10" y="30" width="140" height="16" rx="8" fill={el.color + "22"} />
            <text x="80" y="41" textAnchor="middle" fill={el.color} fontSize="5.5" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "cards2") return (
          <g key={i}>
            {el.items.map((item, j) => (
              <g key={j}>
                <rect x={8 + j * 50} y="52" width="44" height="52" rx="8" fill="#ffffff0d" />
                <text x={30 + j * 50} y="72" textAnchor="middle" fontSize="14" fontFamily="sans-serif">{item.icon}</text>
                <text x={30 + j * 50} y="87" textAnchor="middle" fill="white" fontSize="8" fontWeight="700" fontFamily="sans-serif">{item.val}</text>
                <text x={30 + j * 50} y="98" textAnchor="middle" fill="#ffffff66" fontSize="5" fontFamily="sans-serif">{item.label}</text>
              </g>
            ))}
          </g>
        );
        if (el.type === "syncBtn") return (
          <g key={i}>
            <rect x="30" y="112" width="100" height="22" rx="11" fill={el.color} />
            <text x="80" y="126" textAnchor="middle" fill="white" fontSize="7" fontWeight="600" fontFamily="sans-serif">{el.text}</text>
          </g>
        );
        if (el.type === "mapView") return (
          <g key={i}>
            <rect x="0" y="0" width="160" height="280" fill="#CCE5F0" />
            {[[30,80],[90,120],[60,180],[120,160],[40,200]].map(([x,y],j)=>(
              <g key={j}>
                <rect x={x-15} y={y-8} width="30" height="16" rx="3" fill="#ffffff88" />
                <rect x={x-2} y={y+8} width="4" height="4" fill="#ffffff88" />
              </g>
            ))}
            <text x="80" y="260" textAnchor="middle" fill="#1A1714" fontSize="7" fontWeight="600" fontFamily="sans-serif">{el.label}</text>
          </g>
        );
        if (el.type === "pins") return (
          <g key={i}>
            {[[60,100],[100,140],[50,180]].slice(0, el.count).map(([x,y],j)=>(
              <g key={j}>
                <circle cx={x} cy={y} r="8" fill="#FC5C7D" opacity="0.9"/>
                <text x={x} y={y+4} textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">⛽</text>
              </g>
            ))}
          </g>
        );
        return null;
      })}
    </svg>
  );
}

function FloatingPhone({ screens, accent, delay = 0, side = "right" }) {
  const [activeScreen, setActiveScreen] = useState(0);
  const [switching, setSwitching] = useState(false);
  const [floatOffset, setFloatOffset] = useState(0);

  useEffect(() => {
    let t = 0;
    const animate = () => {
      t += 0.02;
      setFloatOffset(Math.sin(t) * 8);
      requestAnimationFrame(animate);
    };
    const raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSwitching(true);
      setTimeout(() => {
        setActiveScreen(s => (s + 1) % screens.length);
        setSwitching(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, [screens.length]);

  const W = 140, H = 280;

  return (
    <div style={{
      position: "relative",
      width: W + 24,
      height: H + 24,
      transform: `translateY(${floatOffset}px)`,
      transition: "transform 0.05s linear",
      flexShrink: 0,
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "30%", left: "10%",
        width: "80%", height: "40%",
        background: accent,
        borderRadius: "50%",
        filter: "blur(32px)",
        opacity: 0.18,
        pointerEvents: "none",
      }} />
      {/* Phone frame */}
      <svg width={W + 24} height={H + 24} viewBox={`0 0 ${W + 24} ${H + 24}`} style={{ position: "absolute", top: 0, left: 0 }}>
        {/* Shadow */}
        <ellipse cx={(W + 24) / 2} cy={H + 20} rx={W * 0.4} ry={8} fill="#00000018" />
        {/* Body */}
        <rect x="4" y="4" width={W + 16} height={H + 16} rx="28" fill="#1C1C1E" />
        <rect x="6" y="6" width={W + 12} height={H + 12} rx="26" fill="#2C2C2E" />
        {/* Screen area */}
        <rect x="12" y="12" width={W} height={H} rx="20" fill="#000" />
        {/* Notch */}
        <rect x={(W + 24) / 2 - 20} y="10" width="40" height="8" rx="4" fill="#1C1C1E" />
        {/* Side buttons */}
        <rect x={W + 20} y="60" width="3" height="24" rx="1.5" fill="#3A3A3C" />
        <rect x={W + 20} y="94" width="3" height="36" rx="1.5" fill="#3A3A3C" />
        <rect x="1" y="76" width="3" height="28" rx="1.5" fill="#3A3A3C" />
        {/* Screen content clip */}
        <clipPath id={`clip-${delay}`}>
          <rect x="12" y="12" width={W} height={H} rx="20" />
        </clipPath>
      </svg>
      {/* Screen content */}
      <div style={{
        position: "absolute", top: 12, left: 12,
        width: W, height: H,
        borderRadius: 20, overflow: "hidden",
        opacity: switching ? 0 : 1,
        transition: "opacity 0.4s ease",
      }}>
        <PhoneScreen screen={screens[activeScreen]} />
      </div>
      {/* Screen dots indicator */}
      <div style={{
        position: "absolute", bottom: -16, left: "50%", transform: "translateX(-50%)",
        display: "flex", gap: 5,
      }}>
        {screens.map((_, i) => (
          <div key={i} style={{
            width: i === activeScreen ? 16 : 5,
            height: 5, borderRadius: 3,
            background: i === activeScreen ? accent : "#ccc",
            transition: "all 0.3s ease",
          }} />
        ))}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────── */
/* HOOKS                                               */
/* ──────────────────────────────────────────────────── */
function useTyping(words) {
  const [text, setText] = useState("");
  const [wi, setWi] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[wi];
    let t;
    if (!del && ci < w.length) t = setTimeout(() => setCi(c => c + 1), 75);
    else if (!del && ci === w.length) t = setTimeout(() => setDel(true), 2200);
    else if (del && ci > 0) t = setTimeout(() => setCi(c => c - 1), 35);
    else { setDel(false); setWi(i => (i + 1) % words.length); }
    setText(w.slice(0, ci));
    return () => clearTimeout(t);
  }, [ci, del, wi, words]);
  return text;
}

function useReveal(threshold = 0.1) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setVis(true); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, vis];
}

/* ──────────────────────────────────────────────────── */
/* SERVICE SECTION                                     */
/* ──────────────────────────────────────────────────── */
function ServiceSection({ s, i }) {
  const [ref, vis] = useReveal(0.08);
  const isEven = i % 2 === 0;

  return (
    <div ref={ref} style={{
      display: "flex",
      flexDirection: isEven ? "row" : "row-reverse",
      alignItems: "center",
      gap: "clamp(2rem, 6vw, 5rem)",
      padding: "5rem clamp(1.5rem, 6vw, 5rem)",
      maxWidth: 1100,
      margin: "0 auto",
      opacity: vis ? 1 : 0,
      transform: vis ? "none" : `translateY(40px)`,
      transition: "all 0.8s cubic-bezier(.4,0,.2,1)",
      flexWrap: "wrap",
    }}>
      {/* Text side */}
      <div style={{ flex: "1 1 320px", minWidth: 280 }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: s.accentSoft, border: `1px solid ${s.accent}33`,
          borderRadius: 50, padding: "6px 16px", marginBottom: 24,
        }}>
          <span style={{ fontSize: 14 }}>{s.icon}</span>
          <span style={{ fontSize: 12, color: s.accent, fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase" }}>{s.sub}</span>
        </div>
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2rem, 4vw, 3rem)",
          fontWeight: 900,
          color: PALETTE.text,
          margin: "0 0 1rem",
          letterSpacing: -1,
          lineHeight: 1.1,
        }}>{s.title}</h3>
        <p style={{ fontSize: 17, color: PALETTE.textMuted, lineHeight: 1.8, margin: "0 0 2rem", maxWidth: 420 }}>{s.desc}</p>

        {/* Feature pills */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 32 }}>
          {["Design sur mesure", "Responsive", "Performant"].map(f => (
            <span key={f} style={{
              fontSize: 12, fontWeight: 600, color: s.accent,
              background: s.accentSoft, borderRadius: 50,
              padding: "6px 14px", border: `1px solid ${s.accent}22`,
            }}>{f}</span>
          ))}
        </div>

        <a href="#contact" style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: s.accent, color: "white",
          borderRadius: 50, padding: "14px 28px",
          fontSize: 14, fontWeight: 700, textDecoration: "none",
          boxShadow: `0 8px 32px ${s.accent}33`,
          transition: "transform 0.2s, box-shadow 0.2s",
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = `0 16px 48px ${s.accent}44`; }}
          onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = `0 8px 32px ${s.accent}33`; }}
        >
          Demander un devis →
        </a>
      </div>

      {/* Phone side */}
      <div style={{
        flex: "0 0 auto",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 24,
        minHeight: 360,
        paddingBottom: 32,
      }}>
        <FloatingPhone screens={s.screens} accent={s.accent} delay={i * 500} side={isEven ? "right" : "left"} />
        {s.screens.length > 1 && (
          <div style={{ opacity: 0.6 }}>
            <FloatingPhone screens={[s.screens[1]]} accent={s.accent} delay={i * 500 + 1500} side="right" />
          </div>
        )}
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────── */
/* PROJECT CARD                                        */
/* ──────────────────────────────────────────────────── */
function PCard({ p, i }) {
  const [ref, vis] = useReveal();
  const [hov, setHov] = useState(false);
  return (
    <div ref={ref}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: PALETTE.bgCard,
        border: `1.5px solid ${hov ? p.accent : PALETTE.border}`,
        borderRadius: 20,
        padding: "2rem",
        transition: "all 0.4s cubic-bezier(.4,0,.2,1)",
        transform: vis ? `translateY(${hov ? -6 : 0}px)` : "translateY(40px)",
        opacity: vis ? 1 : 0,
        transitionDelay: `${i * 0.08}s`,
        boxShadow: hov ? `0 24px 64px ${p.accent}14, 0 4px 16px rgba(0,0,0,0.04)` : "0 1px 4px rgba(0,0,0,0.03)",
      }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
        <div>
          <span style={{ fontSize: 10, color: p.accent, fontWeight: 700, letterSpacing: 2, textTransform: "uppercase" }}>{p.cat}</span>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 800, color: PALETTE.text, margin: "6px 0 0", letterSpacing: -0.5 }}>{p.name}</h3>
        </div>
        <span style={{ fontSize: 12, color: PALETTE.textLight, marginTop: 4, fontWeight: 500 }}>{p.year}</span>
      </div>
      <p style={{ fontSize: 14, color: PALETTE.textMuted, lineHeight: 1.7, margin: "0 0 16px" }}>{p.desc}</p>
      <div style={{ display: "flex", gap: 7, flexWrap: "wrap", marginBottom: p.url && p.url !== "#" ? 16 : 0 }}>
        {p.tags.map(t => (
          <span key={t} style={{ fontSize: 11, fontWeight: 600, color: PALETTE.textMuted, background: PALETTE.bgSoft, borderRadius: 6, padding: "4px 10px" }}>{t}</span>
        ))}
      </div>
      {p.url && p.url !== "#" && (
        <a href={p.url} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-flex", alignItems: "center", gap: 5,
          color: p.accent, fontSize: 13, fontWeight: 700, textDecoration: "none",
          borderBottom: `1.5px solid ${p.accent}`,
          paddingBottom: 1,
          opacity: hov ? 1 : 0.65, transition: "opacity 0.3s",
        }}>Voir le projet ↗</a>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────────── */
/* MAIN APP                                            */
/* ──────────────────────────────────────────────────── */
export default function App() {
  const typed = useTyping(WORDS);
  const [loaded, setLoaded] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [projRef, projVis] = useReveal();
  const [ctaRef, ctaVis] = useReveal();

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 80);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <div style={{ background: PALETTE.bg, color: PALETTE.text, fontFamily: "'DM Sans', sans-serif", minHeight: "100vh", overflowX: "hidden" }}>
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,800;0,900;1,700&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* ── NAV ── */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrollY > 40 ? "rgba(246,244,240,0.94)" : "transparent",
        backdropFilter: scrollY > 40 ? "blur(20px)" : "none",
        borderBottom: scrollY > 40 ? `1px solid ${PALETTE.border}` : "1px solid transparent",
        padding: "0 clamp(1.5rem, 5vw, 4rem)",
        display: "flex", alignItems: "center", justifyContent: "space-between", height: 68,
        transition: "all 0.4s ease",
      }}>
        <a href="#" style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 22, color: PALETTE.text, textDecoration: "none", letterSpacing: -0.5 }}>
          Lancinet<span style={{ color: "#7C5CFC" }}>.</span>
        </a>
        <div style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {["Services", "Projets", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ color: PALETTE.textMuted, fontSize: 14, fontWeight: 500, textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = PALETTE.text}
              onMouseLeave={e => e.target.style.color = PALETTE.textMuted}
            >{item}</a>
          ))}
          <a href="#contact" style={{
            background: PALETTE.text, color: "#fff", borderRadius: 50, padding: "10px 22px",
            fontSize: 13, fontWeight: 600, textDecoration: "none", letterSpacing: 0.2,
            transition: "background 0.25s, transform 0.2s",
          }}
            onMouseEnter={e => { e.currentTarget.style.background = "#7C5CFC"; e.currentTarget.style.transform = "scale(1.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.background = PALETTE.text; e.currentTarget.style.transform = "scale(1)"; }}
          >Me contacter</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", padding: "0 clamp(1.5rem, 6vw, 5rem)", paddingTop: 100, maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transition: "all 0.7s ease 0.1s", display: "inline-flex", alignItems: "center", gap: 8, background: "#EDE9FF", border: "1px solid #DDD6FF", borderRadius: 50, padding: "8px 18px", marginBottom: 40, width: "fit-content" }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#7C5CFC", display: "inline-block", animation: "pulse 2s infinite" }} />
          <span style={{ fontSize: 13, color: "#7C5CFC", fontWeight: 600 }}>Disponible pour de nouveaux projets</span>
        </div>

        <h1 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(3rem, 8vw, 6.5rem)",
          fontWeight: 900, lineHeight: 1.05,
          letterSpacing: -2, margin: "0 0 1.5rem",
          opacity: loaded ? 1 : 0,
          transform: loaded ? "none" : "translateY(24px)",
          transition: "all 0.8s cubic-bezier(.4,0,.2,1) 0.25s",
        }}>
          Je construis<br />
          <span style={{ color: "#7C5CFC", fontStyle: "italic" }}>des {typed}</span>
          <span style={{ borderRight: "3px solid #7C5CFC", animation: "blink 1s step-end infinite", marginLeft: 2 }} />
        </h1>

        <p style={{ fontSize: "clamp(16px, 2.2vw, 19px)", color: PALETTE.textMuted, lineHeight: 1.75, maxWidth: 520, marginBottom: 48, opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(20px)", transition: "all 0.8s ease 0.4s" }}>
          Développeur full-stack basé à Conakry. Je transforme vos idées en produits digitaux robustes — du concept à la mise en production.
        </p>

        <div style={{ display: "flex", gap: 16, flexWrap: "wrap", opacity: loaded ? 1 : 0, transform: loaded ? "none" : "translateY(16px)", transition: "all 0.8s ease 0.55s" }}>
          <a href="#contact" style={{ background: "#7C5CFC", color: "#fff", borderRadius: 50, padding: "16px 32px", fontWeight: 600, fontSize: 15, textDecoration: "none", transition: "transform 0.2s, box-shadow 0.2s", boxShadow: "0 8px 32px #7C5CFC33" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; e.currentTarget.style.boxShadow = "0 16px 48px #7C5CFC44"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; e.currentTarget.style.boxShadow = "0 8px 32px #7C5CFC33"; }}
          >Démarrer un projet →</a>
          <a href="#services" style={{ background: "transparent", color: PALETTE.text, borderRadius: 50, padding: "16px 32px", fontWeight: 500, fontSize: 15, textDecoration: "none", border: `1.5px solid ${PALETTE.borderStrong}`, transition: "all 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = PALETTE.text; e.currentTarget.style.background = PALETTE.bgSoft; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = PALETTE.borderStrong; e.currentTarget.style.background = "transparent"; }}
          >Voir mes services</a>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", gap: 0, marginTop: 80, paddingTop: 48, borderTop: `1px solid ${PALETTE.border}`, flexWrap: "wrap", opacity: loaded ? 1 : 0, transition: "opacity 0.8s ease 0.75s" }}>
          {[["3+", "Ans d'expérience"], ["10+", "Projets livrés"], ["4", "Pays ciblés"], ["100%", "Satisfaction"]].map(([n, l]) => (
            <div key={l} style={{ flex: "1 1 120px", paddingRight: 32, paddingBottom: 8 }}>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 900, color: PALETTE.text, margin: 0, letterSpacing: -1 }}>{n}</p>
              <p style={{ fontSize: 13, color: PALETTE.textLight, margin: "4px 0 0" }}>{l}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ paddingTop: "4rem" }}>
        <div style={{ textAlign: "center", padding: "0 2rem 4rem" }}>
          <p style={{ fontSize: 11, color: "#7C5CFC", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 16px" }}>Ce que je crée</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, margin: 0, letterSpacing: -1 }}>Services proposés</h2>
        </div>
        {/* Divider between services */}
        {SERVICES.map((s, i) => (
          <div key={s.title}>
            {i > 0 && <div style={{ height: 1, background: PALETTE.border, maxWidth: 1100, margin: "0 auto" }} />}
            <ServiceSection s={s} i={i} />
          </div>
        ))}
      </section>

      {/* ── PROJETS ── */}
      <section id="projets" style={{ padding: "6rem clamp(1.5rem, 5vw, 4rem)", background: PALETTE.bgSoft }}>
        <div ref={projRef} style={{ maxWidth: 1100, margin: "0 auto", transition: "all 0.6s ease", opacity: projVis ? 1 : 0, transform: projVis ? "none" : "translateY(30px)" }}>
          <p style={{ fontSize: 11, color: "#7C5CFC", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 16px" }}>Réalisations</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 4vw, 3.5rem)", fontWeight: 800, margin: "0 0 3rem", letterSpacing: -1 }}>Projets récents</h2>
        </div>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {PROJECTS.map((p, i) => <PCard key={p.name} p={p} i={i} />)}
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ background: "#111111", padding: "8rem clamp(1.5rem, 5vw, 4rem)" }}>
        <div ref={ctaRef} style={{ maxWidth: 800, margin: "0 auto", transition: "all 0.7s ease", opacity: ctaVis ? 1 : 0, transform: ctaVis ? "none" : "translateY(32px)" }}>
          <p style={{ fontSize: 11, color: "#7C5CFC", fontWeight: 700, letterSpacing: 3, textTransform: "uppercase", margin: "0 0 20px" }}>Un projet en tête ?</p>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 900, color: "#fff", margin: "0 0 1.5rem", letterSpacing: -2, lineHeight: 1.05 }}>
            Construisons<br /><span style={{ fontStyle: "italic", color: "#7C5CFC" }}>quelque chose.</span>
          </h2>
          <p style={{ fontSize: 17, color: "#888", lineHeight: 1.75, marginBottom: 48, maxWidth: 500 }}>
            E-commerce, SaaS, site vitrine — je suis basé à Hamdallaye Petit Lac, Conakry, et disponible pour vos projets web.
          </p>

          {/* Contact cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 48 }}>
            {[
              { icon: "📱", label: "WhatsApp / Appel", val: "+224 623 040 543", href: "https://wa.me/224623040543" },
              { icon: "✉️", label: "Email", val: "lancinetbalde21@gmail.com", href: "mailto:lancinetbalde21@gmail.com" },
              { icon: "📍", label: "Localisation", val: "Hamdallaye Petit Lac\nConakry, Guinée", href: null },
            ].map(({ icon, label, val, href }) => (
              <div key={label} style={{ background: "#1A1A1A", border: "1px solid #2A2A2A", borderRadius: 16, padding: "1.5rem", transition: "border-color 0.3s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "#7C5CFC44"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "#2A2A2A"}
              >
                <p style={{ fontSize: 22, margin: "0 0 12px" }}>{icon}</p>
                <p style={{ fontSize: 10, color: "#555", fontWeight: 700, letterSpacing: 1.5, textTransform: "uppercase", margin: "0 0 6px" }}>{label}</p>
                {href
                  ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: "#fff", fontWeight: 500, textDecoration: "none", borderBottom: "1px solid #333", paddingBottom: 1 }}>{val}</a>
                  : <p style={{ fontSize: 13, color: "#888", margin: 0, whiteSpace: "pre-line" }}>{val}</p>
                }
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            <a href="https://wa.me/224623040543" target="_blank" rel="noopener noreferrer" style={{ background: "#25D366", color: "#fff", borderRadius: 50, padding: "16px 32px", fontWeight: 600, fontSize: 15, textDecoration: "none", display: "flex", alignItems: "center", gap: 10, transition: "transform 0.2s", boxShadow: "0 8px 32px #25D36633" }}
              onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
              onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
              Écrire sur WhatsApp
            </a>
            <a href="mailto:lancinetbalde21@gmail.com" style={{ background: "transparent", color: "#fff", borderRadius: 50, padding: "16px 32px", fontWeight: 500, fontSize: 15, textDecoration: "none", border: "1.5px solid #333", transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#fff"; e.currentTarget.style.background = "#1A1A1A"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#333"; e.currentTarget.style.background = "transparent"; }}
            >✉️ Envoyer un email</a>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ background: "#0A0A0A", borderTop: "1px solid #1A1A1A", padding: "2rem clamp(1.5rem, 5vw, 4rem)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
        <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 800, fontSize: 18, color: "#fff" }}>
          Lancinet<span style={{ color: "#7C5CFC" }}>.</span>
        </span>
        <p style={{ fontSize: 13, color: "#444", margin: 0 }}>© {new Date().getFullYear()} — Conakry, Guinée</p>
        <div style={{ display: "flex", gap: 24 }}>
          {["Services", "Projets", "Contact"].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: 13, color: "#555", textDecoration: "none", transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = "#fff"}
              onMouseLeave={e => e.target.style.color = "#555"}
            >{item}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
        * { box-sizing: border-box; margin: 0; }
        html { scroll-behavior: smooth; }
        ::selection { background: #7C5CFC22; color: #7C5CFC; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: ${PALETTE.bg}; }
        ::-webkit-scrollbar-thumb { background: #D4CFC9; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #7C5CFC; }
        body { overflow-x: hidden; }
      `}</style>
    </div>
  );
}