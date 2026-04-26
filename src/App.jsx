import { useState, useEffect, useRef } from "react";
import amberTexture from "./assets/amber_texture.png";
import "./App.css";
import demoVideo from "./assets/video.mp4";

/* ─────────────────────────────────────────
   TEXTURE INJECT
   The body background-image needs the hashed
   asset URL from Vite, so we inject just that
   one value as a CSS custom property.
────────────────────────────────────────── */
const TextureInjector = () => (
  <style>{`:root { --tex-url: url("${amberTexture}"); }`}</style>
);

/* ─────────────────────────────────────────
   DATA
────────────────────────────────────────── */
const heroSkills = ["React", "DSA", "Python", "AI/ML", "Node.js", "SQL"];

const heroBars = [
  { label: "Web Dev", pct: 88 },
  { label: "DSA", pct: 74 },
  { label: "AI / ML", pct: 62 },
];

const skillGroups = [
  {
    title: "Frontend",
    skills: [
      { name: "React.js", pct: 90 },
      { name: "JavaScript", pct: 85 },
      { name: "HTML / CSS", pct: 92 },
      { name: "Tailwind", pct: 78 },
    ],
  },
  {
    title: "Backend",
    skills: [
      { name: "Node.js / Express", pct: 75 },
      { name: "Python", pct: 80 },
      { name: "SQL / MongoDB", pct: 70 },
      { name: "REST APIs", pct: 82 },
    ],
  },
  {
    title: "CS Fundamentals",
    skills: [
      { name: "Data Structures", pct: 78 },
      { name: "Algorithms", pct: 72 },
      { name: "System Design", pct: 58 },
      { name: "OOP", pct: 82 },
    ],
  },
  {
    title: "AI / ML",
    skills: [
      { name: "Machine Learning", pct: 20 },
      { name: "Deep Learning", pct: 25 },
      { name: "Data Analysis", pct: 20 },
      { name: "scikit-learn", pct: 20 },
    ],
  },
];

const techChips = [
  "Git", "GitHub", "VS Code", "Linux", "React",
  "Figma", "Postman", "Vercel", "Node.js", "Python",
  "NumPy", "MongoDB", "C++", "Java", "AWS"
];

const aboutInfo = [
  { key: "Name", val: "Satwik Shekhar" },
  { key: "University", val: "KIIT University" },
  { key: "Degree", val: "B.Tech CSE" },
  { key: "Year", val: "2nd Year" },
  { key: "Location", val: "Bhubaneswar, India" },
  { key: "Status", val: "Open to Internships" },
];

const projects = [
  {
    emoji: "🖼️",
    title: "Image Sharing Feed App",
    description:
      "A full-stack web application that allows users to upload images with captions, store them securely, and display posts in a dynamic feed. Built with a React (Vite) frontend and a Node.js/Express backend connected to MongoDB, with ImageKit integration for optimized image handling.",
    tech: ["React (Vite)", "Node.js / Express", "MongoDB", "ImageKit"],
    skills: [
      "RESTful API design with Express.js",
      "Schema modeling & CRUD operations using Mongoose",
      "Secure image upload & delivery with ImageKit",
      "Environment variable management with dotenv & GitHub workflow",
      "Frontend routing & state management with React Router",
      "API integration with Axios for seamless frontend-backend communication",
      "Responsive UI layout with CSS (Flexbox & positioning)",
    ],
    live: "",
    repo: "https://github.com/satwik425/feed-",
  },
  {
    emoji: "💬",
    title: "Real-Time Chat App",
    description:
      "A full-stack real-time chat application with user authentication, private & group rooms, live message delivery via WebSockets, and persistent chat history stored in SQLite.",
    tech: ["React", "Node.js / Express", "Socket.io", "SQLite"],
    skills: [
      "Real-time bi-directional communication with Socket.io",
      "JWT-based user authentication & session management",
      "RESTful API design with Node.js & Express",
      "Persistent message storage with SQLite",
      "Responsive UI with React & component-based architecture",
    ],
    live: "https://chat-app-zeta-self.vercel.app/",
    repo: "https://github.com/satwik425/chat-app",
  },

  {
    emoji: "🛒",
    title: "E‑Commerce Web App",
    description:
      "A modern e‑commerce web application built with React and Vite, featuring a responsive Tailwind CSS UI, dynamic product listings, shopping cart functionality, and seamless navigation across pages using React Router. The app leverages React hooks extensively for state management, side effects, and context, ensuring a smooth and interactive user experience.",
    tech: ["React (Vite)", "Tailwind CSS", "React Router", "JavaScript (ES6+)"],
    skills: [
      "Component-based architecture with React",
      "Responsive design using Tailwind CSS utility classes",
      "Routing and navigation with React Router",
      "State management using useState, useReducer, and Context API",
      "Side effects and data fetching with useEffect",
      "Reusable custom hooks for form handling and cart logic",
      "Dynamic product rendering and filtering",
      "Interactive shopping cart with add/remove/update functionality",
      "Clean project setup and fast builds with Vite",
    ],
    live: "",
    repo: "https://github.com/satwik425/e-commerce-_frontend",
  },

  {
    emoji: "🔢",
    title: "Handwritten Digit Recognizer",
    description:
      "A full-stack AI-powered digit recognition app where users draw digits (0–9) on a canvas and a trained CNN model predicts them in real time with confidence scores, probability charts, and session history.",
    tech: ["React", "FastAPI", "TensorFlow", "Python"],
    skills: [
      "CNN model training on MNIST dataset with 99%+ accuracy",
      "Real-time digit prediction via FastAPI REST API",
      "Interactive canvas with undo/redo and brush size control",
      "Animated probability distribution chart for all 10 digits",
      "Responsive dark/light UI with session history & analytics page",
    ],
    live: "https://digit-recognizer-five.vercel.app/",
    repo: "https://github.com/satwik425/digit-recognizer-",
  },
  {
    emoji: "🚀",
    title: "Asteroid Shooter",
    description:
      "A C++ arcade game built with SFML featuring player-controlled spacecraft, procedurally spawning asteroids, collision detection, and a real-time score system.",
    tech: ["C++", "SFML", "OOP", "DSA"],
    skills: [
      "Object-Oriented Programming (OOP) in C++",
      "Integration of external libraries (SFML)",
      "Data Structures & Algorithms",
      "Debugging & code optimization",
      "Creative problem-solving & project management",
    ],
    live: demoVideo,
    repo: "https://github.com/satwik425/ASTROIDS1",
  },
  {
    emoji: "📰",
    title: "News Website",
    description:
      "A responsive news aggregator that fetches and displays live headlines across categories like tech, sports, and world news using a third-party news API.",
    tech: ["HTML", "CSS", "JavaScript", "REST API"],
    skills: [
      "Fetching & parsing live data from REST APIs",
      "Dynamic DOM manipulation with vanilla JS",
      "Responsive layout design with CSS",
      "Asynchronous programming with fetch & async/await",
      "Category filtering & search functionality",
    ],
    live: "https://news-app-teal-eight.vercel.app/",
    repo: "https://github.com/satwik425/news-app",
  },
];

const contactLinks = [
  {
    icon: "✉️",
    label: "Email",
    val: "satvikshekhar20@gmail.com",
    href: "mailto:satvikshekhar20@gmail.com",
  },
  {
    icon: "💼",
    label: "LinkedIn",
    val: "linkedin.com/in/satwik-shekhar",
    href: "https://www.linkedin.com/in/satwik-shekhar-65b228283",
  },
  {
    icon: "🐙",
    label: "GitHub",
    val: "github.com/satwik425",
    href: "https://github.com/satwik425",
  },
];

/* ─────────────────────────────────────────
   HOOKS
────────────────────────────────────────── */
function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, [threshold]);
  return scrolled;
}

function useInView(ref) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.18 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [ref]);
  return visible;
}

/* ─────────────────────────────────────────
   COMPONENTS
────────────────────────────────────────── */
function GlassCard({ children, className = "", style: extraStyle = {} }) {
  const ref = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [over, setOver] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = (e.clientX - (r.left + r.width / 2)) / (r.width / 2);
    const dy = (e.clientY - (r.top + r.height / 2)) / (r.height / 2);
    setTilt({ x: dy * -4, y: dx * 4 });
  };

  const shadow = over
    ? "0 48px 90px rgba(0,0,0,0.2), 0 18px 36px rgba(0,0,0,0.11), inset 0 1px 0 rgba(255,255,255,0.95)"
    : "0 22px 52px rgba(0,0,0,0.12), 0 8px 18px rgba(0,0,0,0.07), inset 0 1px 0 rgba(255,255,255,0.9)";

  return (
    <div
      ref={ref}
      className={`glass-card ${className}`}
      onMouseMove={onMove}
      onMouseEnter={() => setOver(true)}
      onMouseLeave={() => { setOver(false); setTilt({ x: 0, y: 0 }); }}
      style={{
        transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) ${over ? "scale(1.008)" : "scale(1)"}`,
        transition: over ? "transform 0.08s linear, box-shadow 0.3s" : "transform 0.55s ease, box-shadow 0.4s",
        boxShadow: shadow,
        ...extraStyle,
      }}
    >
      {children}
    </div>
  );
}

function SkillBarItem({ name, pct, delay = 0 }) {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <div className="skill-bar-item" ref={ref}>
      <div className="skill-bar-meta">
        <span className="skill-name">{name}</span>
        <span className="skill-pct">{pct}%</span>
      </div>
      <div className="skill-track">
        <div
          className={`skill-fill ${vis ? "animated" : ""}`}
          style={{
            "--target-width": `${pct}%`,
            transitionDelay: vis ? `${delay}ms` : "0ms",
          }}
        />
      </div>
    </div>
  );
}

function ReactiveBackground() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999 });
  const raf = useRef(null);
  const timeRef = useRef(0);
  const hexes = useRef([]);
  const ripples = useRef([]);
  const embers = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let W, H;

    /* ── Hex geometry ── */
    const HEX_R = 26;                          // hex radius (centre → vertex)
    const HEX_W = HEX_R * 2;
    const HEX_H = Math.sqrt(3) * HEX_R;
    const COL_W = HEX_W * 0.75;               // horizontal step

    /* ── Draw a flat-top hexagon path ── */
    function hexPath(x, y, r) {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const a = (Math.PI / 3) * i;            // flat-top: no -π/6 offset
        const px = x + r * Math.cos(a);
        const py = y + r * Math.sin(a);
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
    }

    /* ── Build hex grid ── */
    function buildHexes() {
      hexes.current = [];
      const cols = Math.ceil(W / COL_W) + 2;
      const rows = Math.ceil(H / HEX_H) + 2;
      for (let col = -1; col < cols; col++) {
        for (let row = -1; row < rows; row++) {
          const x = col * COL_W;
          const y = row * HEX_H + (col % 2 !== 0 ? HEX_H / 2 : 0);
          // each hex gets a unique noise phase for organic breathing
          hexes.current.push({
            x, y,
            phase: Math.random() * Math.PI * 2,
            speed: 0.28 + Math.random() * 0.45,
            glow: 0,      // 0–1, set when pointer is near
          });
        }
      }
    }

    /* ── Ember particle helpers ── */
    function spawnEmber(anywhere = false) {
      return {
        x: Math.random() * W,
        y: anywhere ? Math.random() * H : H + 8,
        vx: (Math.random() - 0.5) * 0.55,
        vy: -(0.35 + Math.random() * 0.9),
        life: 0.6 + Math.random() * 0.4,
        decay: 0.0018 + Math.random() * 0.003,
        r: 0.9 + Math.random() * 2.2,
        hue: 22 + Math.random() * 38,
      };
    }

    function buildEmbers() {
      embers.current = Array.from({ length: 48 }, () => spawnEmber(true));
    }

    /* ── Resize ── */
    function build() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
      buildHexes();
      buildEmbers();
    }

    /* ══════════════════════════════════════
       MAIN DRAW LOOP
    ══════════════════════════════════════ */
    function draw(ts) {
      timeRef.current = ts * 0.001;
      const t = timeRef.current;
      const px = pointer.current.x;
      const py = pointer.current.y;

      ctx.clearRect(0, 0, W, H);

      /* ── 1. Warm gradient base ── */
      const bg = ctx.createLinearGradient(0, 0, W * 0.7, H);
      bg.addColorStop(0, "#fde68a");
      bg.addColorStop(0.38, "#f59e0b");
      bg.addColorStop(0.72, "#d97706");
      bg.addColorStop(1, "#b45309");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, W, H);

      /* ── 2. Slow drifting radial light blobs ── */
      const blobs = [
        { bx: W * 0.12 + Math.sin(t * 0.29) * 90, by: H * 0.18 + Math.cos(t * 0.23) * 60, r: 310, c: "rgba(255,255,255,0.14)" },
        { bx: W * 0.85 + Math.cos(t * 0.19) * 80, by: H * 0.78 + Math.sin(t * 0.17) * 65, r: 270, c: "rgba(120,50,0,0.16)" },
        { bx: W * 0.5 + Math.sin(t * 0.14) * 130, by: H * 0.42 + Math.cos(t * 0.21) * 85, r: 340, c: "rgba(255,220,70,0.09)" },
        { bx: W * 0.9 + Math.sin(t * 0.33) * 45, by: H * 0.12 + Math.cos(t * 0.27) * 38, r: 190, c: "rgba(255,255,255,0.08)" },
      ];
      blobs.forEach(({ bx, by, r, c }) => {
        const g = ctx.createRadialGradient(bx, by, 0, bx, by, r);
        g.addColorStop(0, c);
        g.addColorStop(1, "transparent");
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      /* ── 3. Honeycomb grid ── */
      const REACH = 185;

      hexes.current.forEach(h => {
        const dx = h.x - px;
        const dy = h.y - py;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const prox = Math.max(0, 1 - dist / REACH);   // 0 far → 1 near

        /* smooth glow approach / retreat */
        h.glow += (prox - h.glow) * 0.12;

        const pulse = Math.sin(t * h.speed + h.phase) * 0.5 + 0.5;
        const r = HEX_R * (0.91 + h.glow * 0.13) - 1.5; // slight size boost near cursor
        const alpha = 0.04 + pulse * 0.045 + h.glow * 0.30;

        hexPath(h.x, h.y, r);

        /* fill: warm gold tint near cursor */
        if (h.glow > 0.02) {
          ctx.fillStyle = `rgba(253,215,60,${h.glow * 0.32})`;
          ctx.fill();
        }

        /* ── wax texture: subtle inner highlight ── */
        if (h.glow > 0.08) {
          const shine = ctx.createRadialGradient(
            h.x - r * 0.25, h.y - r * 0.28, 0,
            h.x, h.y, r
          );
          shine.addColorStop(0, `rgba(255,255,255,${h.glow * 0.28})`);
          shine.addColorStop(0.5, `rgba(255,200,40,${h.glow * 0.10})`);
          shine.addColorStop(1, "transparent");
          ctx.fillStyle = shine;
          hexPath(h.x, h.y, r);
          ctx.fill();
        }

        /* stroke */
        ctx.strokeStyle = `rgba(160,85,0,${alpha})`;
        ctx.lineWidth = 0.65 + h.glow * 1.6;
        hexPath(h.x, h.y, r);
        ctx.stroke();
      });

      /* ── 4. Pointer glow aura ── */
      if (px > 0) {
        const aura = ctx.createRadialGradient(px, py, 0, px, py, 170);
        aura.addColorStop(0, "rgba(255,255,255,0.20)");
        aura.addColorStop(0.45, "rgba(251,191,36,0.13)");
        aura.addColorStop(1, "transparent");
        ctx.fillStyle = aura;
        ctx.fillRect(0, 0, W, H);

        const core = ctx.createRadialGradient(px, py, 0, px, py, 42);
        core.addColorStop(0, "rgba(255,255,255,0.38)");
        core.addColorStop(0.65, "rgba(253,224,71,0.16)");
        core.addColorStop(1, "transparent");
        ctx.fillStyle = core;
        ctx.fillRect(0, 0, W, H);
      }

      /* ── 5. Ripple rings (click / tap) ── */
      ripples.current = ripples.current.filter(rp => rp.life > 0);
      ripples.current.forEach(rp => {
        rp.r += 4;
        rp.life -= 0.024;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(253,224,71,${rp.life * 0.65})`;
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r * 0.58, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255,255,255,${rp.life * 0.30})`;
        ctx.lineWidth = 0.9;
        ctx.stroke();
      });

      /* ── 6. Ember particles ── */
      embers.current.forEach((em, i) => {
        em.x += em.vx + Math.sin(t * 0.65 + i) * 0.28;
        em.y += em.vy;
        em.life -= em.decay;
        if (em.life <= 0 || em.y < -10) {
          embers.current[i] = spawnEmber();
          return;
        }
        const a = em.life * 0.9;
        const glow = ctx.createRadialGradient(em.x, em.y, 0, em.x, em.y, em.r * 2.8);
        glow.addColorStop(0, `hsla(${em.hue},100%,76%,${a})`);
        glow.addColorStop(0.55, `hsla(${em.hue},90%,54%,${a * 0.45})`);
        glow.addColorStop(1, "transparent");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(em.x, em.y, em.r * 2.8, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `hsla(${em.hue},100%,90%,${a})`;
        ctx.beginPath();
        ctx.arc(em.x, em.y, em.r * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      /* ── 7. Fine grain noise (per-frame random pixels) ── */
      ctx.globalAlpha = 0.016;
      for (let i = 0; i < 260; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? "#fff" : "#7c3200";
        ctx.fillRect(Math.random() * W, Math.random() * H, 1, 1);
      }
      ctx.globalAlpha = 1;

      /* ── 8. Edge vignette ── */
      const vig = ctx.createRadialGradient(W / 2, H / 2, H * 0.22, W / 2, H / 2, H * 0.88);
      vig.addColorStop(0, "transparent");
      vig.addColorStop(1, "rgba(100,40,0,0.30)");
      ctx.fillStyle = vig;
      ctx.fillRect(0, 0, W, H);

      raf.current = requestAnimationFrame(draw);
    }

    build();
    raf.current = requestAnimationFrame(draw);

    /* ── Event listeners — mouse + touch ── */
    const setPointer = (x, y) => { pointer.current = { x, y }; };
    const clearPointer = () => { pointer.current = { x: -9999, y: -9999 }; };
    const addRipple = (x, y) => ripples.current.push({ x, y, r: 0, life: 1 });

    const onMouseMove = (e) => setPointer(e.clientX, e.clientY);
    const onMouseLeave = () => clearPointer();
    const onMouseClick = (e) => addRipple(e.clientX, e.clientY);

    const onTouchMove = (e) => {
      const t = e.touches[0];
      setPointer(t.clientX, t.clientY);
    };
    const onTouchEnd = () => clearPointer();
    const onTouchStart = (e) => {
      const t = e.touches[0];
      setPointer(t.clientX, t.clientY);
      addRipple(t.clientX, t.clientY);
    };

    const onResize = () => build();

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("click", onMouseClick);
    window.addEventListener("touchstart", onTouchStart, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onTouchEnd);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("click", onMouseClick);
      window.removeEventListener("touchstart", onTouchStart);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        display: "block",
        pointerEvents: "none",
      }}
    />
  );
}

/* ─────────────────────────────────────────
   SECTIONS
────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <section id="home" className="section" ref={ref}>
      <div className="container">
        <GlassCard className="hero-card">
          <div className={`hero-grid fade-in ${vis ? "visible" : ""}`}>
            <div>
              <div className={`section-tag hero-tag fade-in fade-2 ${vis ? "visible" : ""}`}>
                <span className="tag-dot" /> Student Developer
              </div>
              <h1 className={`headline fade-in fade-3 ${vis ? "visible" : ""}`}>
                Building things<br />
                for the <em>web</em> &<br />
                beyond.
              </h1>
              <p className={`bio fade-in fade-4 ${vis ? "visible" : ""}`}>
                CS student at KIIT University — passionate about Web Development,
                Data Structures &amp; Algorithms, and AI/ML. I love shipping real
                projects and sharpening my problem-solving instincts.
              </p>
              <div className={`cta-row fade-in fade-5 ${vis ? "visible" : ""}`}>
                <a href="#projects" className="btn-primary">View Projects ↗</a>
                <a href="#" className="btn-ghost">Download CV</a>
              </div>
            </div>

            <div className="panels">
              <div className="panel panel-back float2" />
              <div className="panel panel-mid float1">
                <div className="panel-label">Proficiency</div>
                <div className="bar-row">
                  {heroBars.map(b => (
                    <div className="bar-item" key={b.label}>
                      <div className="bar-meta"><span>{b.label}</span><span>{b.pct}%</span></div>
                      <div className="bar-track">
                        <div className="bar-fill" style={{ width: `${b.pct}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="panel panel-front float0">
                <div className="panel-label">Skills</div>
                <div className="skill-chips">
                  {heroSkills.map(s => <span className="chip" key={s}>{s}</span>)}
                </div>
                <div className="stat-row">
                  {[["3+", "Projects"], ["2+", "Years"], ["KIIT", "University"]].map(([v, l]) => (
                    <div className="stat" key={l}>
                      <div className="stat-val">{v}</div>
                      <div className="stat-lbl">{l}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="divider" />

          <div className="footer-row">
            <span className="footer-note">Open to internships &amp; collaborations ✦</span>
            <div className="socials">
              <a href="#" className="social-btn" title="X / Twitter">𝕏</a>
              <a href="https://www.linkedin.com/in/satwik-shekhar-65b228283" className="social-btn" title="LinkedIn" target="_blank" rel="noreferrer">in</a>
              <a href="https://github.com/satwik425" className="social-btn" title="GitHub" target="_blank" rel="noreferrer">gh</a>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function AboutSection() {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <section id="about" className="section" ref={ref}>
      <div className="container">
        <GlassCard className="about-card">
          <div className={`about-grid fade-in ${vis ? "visible" : ""}`}>
            <div className="avatar-wrap">
              <div className="avatar-ring">
                <div className="avatar-circle">S</div>
              </div>
              <div className="avatar-badge">
                <span className="badge-dot" />
                Available for hire
              </div>
            </div>
            <div>
              <div className={`section-tag fade-in fade-2 ${vis ? "visible" : ""}`}>
                <span className="tag-dot" /> About Me
              </div>
              <h2 className={`section-title fade-in fade-3 ${vis ? "visible" : ""}`}>
                Who is <em>Satwik</em>?
              </h2>
              <p className={`about-intro fade-in fade-4 ${vis ? "visible" : ""}`}>
                I'm a second-year Computer Science student at <strong>KIIT University</strong>,
                Bhubaneswar. My interest in technology goes beyond coursework — I actively build
                full-stack web applications, practice competitive programming, and explore the
                fascinating world of machine learning. I believe the best software is born at
                the intersection of solid computer-science fundamentals and good design thinking.
              </p>
              <div className={`info-grid fade-in fade-5 ${vis ? "visible" : ""}`}>
                {aboutInfo.map(({ key, val }) => (
                  <div className="info-item" key={key}>
                    <span className="info-key">{key}</span>
                    <span className="info-val">{val}</span>
                  </div>
                ))}
              </div>
              <div className={`cta-row fade-in fade-5 ${vis ? "visible" : ""}`}>
                <a href="#contact" className="btn-primary">Get In Touch ↗</a>
                <a href="#skills" className="btn-ghost">See My Skills</a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function SkillsSection() {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <section id="skills" className="section" ref={ref}>
      <div className="container">
        <GlassCard className="skills-card">
          <div className={`fade-in ${vis ? "visible" : ""}`}>
            <div className="section-tag"><span className="tag-dot" /> Skills</div>
          </div>
          <h2 className={`section-title fade-in fade-2 ${vis ? "visible" : ""}`}>
            My <em>Craft</em> & Toolkit
          </h2>
          <p className={`skills-intro fade-in fade-3 ${vis ? "visible" : ""}`}>
            I've been building with these technologies for 2+ years — constantly
            pushing the boundaries of what I know and learning new things every day.
          </p>
          <div className={`skills-grid fade-in fade-4 ${vis ? "visible" : ""}`}>
            {skillGroups.map((group) => (
              <div key={group.title}>
                <div className="skill-group-title">{group.title}</div>
                <div className="skill-list">
                  {group.skills.map((sk, i) => (
                    <SkillBarItem key={sk.name} name={sk.name} pct={sk.pct} delay={i * 80} />
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={`tech-chips-section fade-in fade-5 ${vis ? "visible" : ""}`}>
            <div className="tech-chips-title">Tools & Technologies</div>
            <div className="tech-chip-cloud">
              {techChips.map(t => <span className="tech-chip" key={t}>{t}</span>)}
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function ProjectsSection() {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <section id="projects" className="section" ref={ref}>
      <div className="container">
        <GlassCard className="projects-card">
          <div className={`fade-in ${vis ? "visible" : ""}`}>
            <div className="section-tag"><span className="tag-dot" /> Work</div>
          </div>
          <h2 className={`section-title fade-in fade-2 ${vis ? "visible" : ""}`}>
            Featured <em>Projects</em>
          </h2>
          <div className={`projects-grid fade-in fade-3 ${vis ? "visible" : ""}`}>
            {projects.map((p) => (
              <div className="project-card" key={p.title}>
                <span className="project-emoji">{p.emoji}</span>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.description}</p>
                {p.skills && (
                  <>
                    <div className="project-skills-label">Skills Applied & Strengthened</div>
                    <div className="project-skills-list">
                      {p.skills.map((s) => (
                        <div className="project-skill-row" key={s}>{s}</div>
                      ))}
                    </div>
                  </>
                )}
                <div className="project-tech">
                  {p.tech.map((t) => (
                    <span className="project-tech-chip" key={t}>{t}</span>
                  ))}
                </div>
                <div className="project-links">
                  <a href={p.live} className="project-link live">Live ↗</a>
                  <a href={p.repo} className="project-link repo" target="_blank" rel="noreferrer">GitHub</a>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

function ContactSection() {
  const ref = useRef(null);
  const vis = useInView(ref);
  return (
    <section id="contact" className="section" ref={ref}>
      <div className="container">
        <GlassCard className="contact-card">
          <div className={`fade-in ${vis ? "visible" : ""}`}>
            <div className="section-tag"><span className="tag-dot" /> Contact</div>
          </div>
          <h2 className={`section-title fade-in fade-2 ${vis ? "visible" : ""}`}>
            Let's <em>Connect</em>
          </h2>
          <p className={`contact-intro fade-in fade-3 ${vis ? "visible" : ""}`}>
            I'm always open to new opportunities, collaborations, or just a good
            conversation about tech. Feel free to reach out through any of the channels below.
          </p>
          <div className={`contact-layout fade-in fade-4 ${vis ? "visible" : ""}`}>
            <div className="contact-links-col">
              {contactLinks.map(({ icon, label, val, href }) => (
                <a className="contact-link-card" href={href} key={label} target="_blank" rel="noreferrer">
                  <div className="contact-link-icon">{icon}</div>
                  <div className="contact-link-body">
                    <div className="contact-link-label">{label}</div>
                    <div className="contact-link-val">{val}</div>
                  </div>
                </a>
              ))}
            </div>
            <div className="contact-cta-box">
              <div className="contact-cta-title">
                Open to <em>internships</em> &<br />collaborations
              </div>
              <p className="contact-cta-sub">
                Whether it's a summer internship, a freelance project, or an open-source
                collaboration — I'm keen to work on things that matter. Let's build something
                great together.
              </p>
              <div className="contact-cta-actions">
                <a href="mailto:satvikshekhar20@gmail.com" className="btn-primary">Send an Email ↗</a>
                <a href="https://github.com/satwik425" className="btn-ghost" target="_blank" rel="noreferrer">View GitHub</a>
              </div>
            </div>
          </div>
        </GlassCard>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────
   ROOT APP
────────────────────────────────────────── */
export default function App() {
  const scrolled = useScrolled(50);

  return (
    <>
      <TextureInjector />
      <ReactiveBackground />

      <div className="blob" style={{ width: 340, height: 340, top: "-6%", left: "-3%", background: "rgba(255,255,255,0.18)" }} />
      <div className="blob" style={{ width: 280, height: 280, bottom: "4%", right: "6%", background: "rgba(180,100,0,0.12)" }} />
      <div className="blob" style={{ width: 200, height: 200, top: "45%", left: "52%", background: "rgba(255,255,255,0.09)" }} />
      <div className="blob" style={{ width: 160, height: 160, top: "22%", right: "18%", background: "rgba(245,200,66,0.1)" }} />

      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="nav-inner">
          <a href="#home" className="nav-name">Satwik Shekhar</a>
          <ul className="nav-links">
            {["About", "Skills", "Projects", "Contact"].map(l => (
              <li key={l}><a href={`#${l.toLowerCase()}`}>{l}</a></li>
            ))}
          </ul>
          <div className="nav-dot" />
        </div>
      </header>

      <div className="page-wrapper">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <footer className="site-footer">
          © {new Date().getFullYear()} Satwik Shekhar · Built with React &amp; ❤️
        </footer>
      </div>
    </>
  );
}

