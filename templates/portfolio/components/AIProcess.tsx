"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const PURPLE = "#6B5CE7"; // used for the callout card title

// Soft translucent version of a segment's fill, used for its hover glow.
function glowColor(hex: string, alpha = 0.45): string {
  const n = parseInt(hex.slice(1), 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

// Inline style for a phase group: pointer cursor plus the segment's glow
// color as a CSS variable that the hover rules in globals.css pick up.
function phaseStyle(hex: string): React.CSSProperties {
  return { cursor: "pointer", "--phase-glow": glowColor(hex) } as React.CSSProperties;
}

// --- Double Diamond diagram ------------------------------------------------
// Two equal diamonds meeting at x=410. Discover (red) and Define (pink) form
// the first; Develop (layered purple, AI-led light → human-led dark) and
// Deliver (blue) form the second. Click any phase to reveal the copy below.

const CALLOUTS: Record<string, { name: string; callout: string }> = {
  discover: {
    name: "Discover",
    callout:
      "AI synthesizes market research, competitive analysis, and user transcripts faster than manual synthesis ever could. Discovery is now faster and more thorough — not a trade-off between speed and depth.",
  },
  define: {
    name: "Define",
    callout:
      "AI helps organize themes, surface patterns, and build user profiles in a fraction of the time. The framing still comes from me — but I get there faster.",
  },
  develop: {
    name: "Develop",
    callout:
      "This is where AI changes everything. More directions, more iterations, more prototypes than time would previously allow. AI didn't just speed this phase up — it expanded what's possible inside it.",
  },
  deliver: {
    name: "Deliver",
    callout:
      "Tools like Claude Code, Cursor, Lovable, and Antigravity have collapsed the build time. What used to take weeks of engineering handoff now ships in hours or days.",
  },
};

function DoubleDiamond() {
  const [active, setActive] = useState<string | null>(null);
  const [demoPhase, setDemoPhase] = useState<string | null>(null);
  const current = active ? CALLOUTS[active] : null;
  const calloutRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const hasDemoedRef = useRef(false);
  const demoTimeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const toggle = (id: string) => setActive(active === id ? null : id);

  // When a phase is clicked, smoothly scroll the surfaced text into view.
  useEffect(() => {
    if (active && calloutRef.current) {
      calloutRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [active]);

  // One-time demo: the first time the diagram scrolls into view, sweep a
  // highlight across the four phases to show they're interactive.
  useEffect(() => {
    const el = diagramRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasDemoedRef.current) {
          hasDemoedRef.current = true;
          observer.disconnect();
          const order = ["discover", "define", "develop", "deliver"];
          order.forEach((id, i) => {
            demoTimeoutsRef.current.push(setTimeout(() => setDemoPhase(id), i * 600));
          });
          demoTimeoutsRef.current.push(
            setTimeout(() => setDemoPhase(null), order.length * 600)
          );
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      demoTimeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  const phaseClass = (id: string) => `phase${demoPhase === id ? " phase-demo" : ""}`;

  return (
    <div ref={diagramRef}>
      <svg
        width="100%"
        viewBox="0 70 820 390"
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full overflow-visible"
        role="img"
        aria-label="Double Diamond diagram showing Discover in red, Define in pink, Develop as layered purple triangles, and Deliver in blue. Click a phase to reveal its description."
      >
        <g className={phaseClass('discover')} id="ph-discover" onClick={() => toggle('discover')} style={phaseStyle("#E63946")}>
          <polygon points="80,250 245,85 245,415" fill="#E63946" />
        </g>
        <g className={phaseClass('define')} id="ph-define" onClick={() => toggle('define')} style={phaseStyle("#FF3D81")}>
          <polygon points="245,85 410,250 245,415" fill="#FF3D81" />
        </g>
        <polygon points="80,250 245,85 410,250 245,415" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.12" />

        <g className={phaseClass('develop')} id="ph-develop" onClick={() => toggle('develop')} style={phaseStyle("#8B82E0")}>
          <polygon points="410,250 575,85 575,415" fill="#CECBF6" />
          <polygon points="410,250 575,113 575,387" fill="#AFA9EC" />
          <polygon points="410,250 575,141 575,359" fill="#8B82E0" />
          <polygon points="410,250 575,168 575,332" fill="#534AB7" />
          <polygon points="410,250 575,196 575,304" fill="#3C3489" />
        </g>
        <g className={phaseClass('deliver')} id="ph-deliver" onClick={() => toggle('deliver')} style={phaseStyle("#2D7FF9")}>
          <polygon points="575,85 740,250 575,415" fill="#2D7FF9" />
        </g>
        <polygon points="410,250 575,85 740,250 575,415" fill="none" stroke="#1a1a2e" strokeWidth="1.5" opacity="0.12" />

        <text x="147" y="152" textAnchor="middle" fill="#E63946" style={{ fontWeight: 700, fontSize: 15 }} transform="rotate(-45, 147, 152)">Discover</text>
        <text x="343" y="152" textAnchor="middle" fill="#FF3D81" style={{ fontWeight: 700, fontSize: 15 }} transform="rotate(45, 343, 152)">Define</text>
        <text x="477" y="152" textAnchor="middle" fill="#3C3489" style={{ fontWeight: 700, fontSize: 16 }} transform="rotate(-45, 477, 152)">Develop</text>
        <text x="673" y="152" textAnchor="middle" fill="#2D7FF9" style={{ fontWeight: 700, fontSize: 15 }} transform="rotate(45, 673, 152)">Deliver</text>

        <circle cx="80" cy="250" r="7" fill="#1a1a2e" />
        <circle cx="740" cy="250" r="7" fill="#1a1a2e" />

        <text x="30" y="250" textAnchor="middle" dominantBaseline="central" fill="#1a1a2e" style={{ fontWeight: 700, fontSize: 14 }}>Problem</text>
        <text x="790" y="250" textAnchor="middle" dominantBaseline="central" fill="#1a1a2e" style={{ fontWeight: 700, fontSize: 14 }}>Solution</text>
      </svg>

      {/* Click callout — fades in below the diagram, swaps smoothly between phases */}
      <div ref={calloutRef} className="scroll-mt-24">
      <AnimatePresence mode="wait">
        {current && (
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="mt-4 rounded-xl border border-ink/10 bg-white p-4"
          >
            <p className="text-sm font-semibold" style={{ color: PURPLE }}>
              {current.name}
            </p>
            <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "#444444" }}>
              {current.callout}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </div>
  );
}

export function AIProcess() {
  return (
    <section id="ai-philosophy" className="mt-32 scroll-mt-24">
      <h2 style={{ fontSize: 28, fontWeight: 600 }}>How AI fits into my design process</h2>

      <p className="mt-4 text-sm leading-relaxed" style={{ color: "#666666" }}>
        AI compressed the timeline at every phase — faster research synthesis, faster definition,
        faster delivery. But in Develop, something different happened: AI didn&apos;t just speed
        things up, it expanded what&apos;s possible. More directions, more iterations, more
        prototypes than time would ever have allowed before.
      </p>

      <div className="mt-6 flex items-start justify-center gap-3">
        <svg width="28" height="44" viewBox="0 0 40 62" fill="none" aria-hidden="true" className="shrink-0 text-subtle">
          <path d="M 34 4 Q 8 14, 10 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 4 46 L 10 54 L 16 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
        <p className="text-xs text-subtle text-center">
          Click each phase to learn more.
        </p>
        <svg width="28" height="44" viewBox="0 0 40 62" fill="none" aria-hidden="true" className="shrink-0 text-subtle -scale-x-100">
          <path d="M 34 4 Q 8 14, 10 54" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M 4 46 L 10 54 L 16 47" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
        </svg>
      </div>

      <div className="mt-1">
        <DoubleDiamond />
      </div>
    </section>
  );
}
