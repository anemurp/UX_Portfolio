"use client";

import { useRef, useEffect, useState } from "react";

// ── Bubble data ───────────────────────────────────────────────────────────────
type BubbleConfig = { text: string; bg: string; fg: string };

const BUBBLES: Record<string, BubbleConfig> = {
  "/about_pictures/Design.png": {
    text: "Facilitating workshops and design sprints",
    bg: "#FFD600",
    fg: "#1a1a1a",
  },
  "/about_pictures/salt.jpeg": {
    text: "I've lived in 5 countries: US, Mexico, Argentina, Spain, and Germany",
    bg: "#2D7FF9",
    fg: "#ffffff",
  },
  "/about_pictures/mountain.jpeg": {
    text: "I am Mexican-American and grew up speaking Spanish and English",
    bg: "#6B5CE7",
    fg: "#ffffff",
  },
  "/about_pictures/arifana.jpg": {
    text: "Catch me taking pictures with my film camera everywhere I go!",
    bg: "#00C853",
    fg: "#ffffff",
  },
  "/about_pictures/denmark.jpeg": {
    text: "I traveled to 30 countries before turning 30",
    bg: "#FF3D81",
    fg: "#ffffff",
  },
  "/about_pictures/climbing.jpeg": {
    text: "I love to spend time outdoors to recharge",
    bg: "#FF6B35",
    fg: "#ffffff",
  },
  "/about_pictures/Italy.jpeg": {
    text: "Find me near water whenever possible",
    bg: "#00B4D8",
    fg: "#ffffff",
  },
  "/about_pictures/Teaching.png": {
    text: "I used to be a middle and high school teacher for 5 years before becoming a UX designer",
    bg: "#E8392A",
    fg: "#ffffff",
  },
  "/about_pictures/berlin.jpeg": {
    text: "I live in Berlin, in Prenzlauer Berg. I'm learning German and currently am in a B2 intensive course.",
    bg: "#0D7A6B",
    fg: "#ffffff",
  },
};

// ── Column data ───────────────────────────────────────────────────────────────
const COLUMNS = [
  [
    { src: "/about_pictures/mountain.jpeg", height: 300, position: "center 78%" },
    { src: "/about_pictures/denmark.jpeg",  height: 240 },
    { src: "/about_pictures/sunset Small.jpeg", height: 260 },
  ],
  [
    { src: "/about_pictures/salt.jpeg",     height: 260 },
    { src: "/about_pictures/climbing.jpeg", height: 240 },
    { src: "/about_pictures/berlin.jpeg",   height: 260 },
  ],
  [
    { src: "/about_pictures/arifana.jpg",  height: 300 },
    { src: "/about_pictures/Italy.jpeg",    height: 280 },
    { src: "/about_pictures/Teaching.png", height: 300 },
  ],
];

// The same nine images redistributed into two height-balanced columns for
// mobile, where the mosaic renders as a simple static grid.
const MOBILE_COLUMNS = [
  [
    { src: "/about_pictures/mountain.jpeg", height: 300, position: "center 78%" },
    { src: "/about_pictures/salt.jpeg",     height: 260 },
    { src: "/about_pictures/arifana.jpg",  height: 300 },
    { src: "/about_pictures/Teaching.png", height: 300 },
  ],
  [
    { src: "/about_pictures/denmark.jpeg",  height: 240 },
    { src: "/about_pictures/climbing.jpeg", height: 240 },
    { src: "/about_pictures/Italy.jpeg",    height: 280 },
    { src: "/about_pictures/berlin.jpeg",   height: 260 },
    { src: "/about_pictures/sunset Small.jpeg", height: 260 },
  ],
];

// ── Parallax config ───────────────────────────────────────────────────────────
// Visible height of the pinned mosaic. The speeds below are tuned so every
// column's last image ends exactly at this line when the pin finishes, so
// there's no dead space between the mosaic and the content below it.
const REVEAL_HEIGHT = 720;
// Nudge every column down a little so the top of the first images isn't clipped.
// Each column's slide distance is computed at runtime from the container's
// actual height, so the last image always lands exactly at the bottom edge —
// fully revealed on every screen size.
const TOP_OFFSET = 24;
// How many pixels of page scrolling the reveal is spread across. Smaller =
// the bottom images arrive sooner, while the mosaic is still front and center.
const REVEAL_DISTANCE = 220;
// Height of the sticky navbar above the mosaic (Tailwind h-14 = 56px).
const NAV_OFFSET = 56;
const GAP = 12;
const DESKTOP_BUBBLE_W = 240;
const MOBILE_BUBBLE_W = 180;

// ── ImageTile ─────────────────────────────────────────────────────────────────
function ImageTile({
  src,
  height,
  position,
  bubble,
  tileId,
  activeTouchId,
  onTap,
  isTouch,
}: {
  src: string;
  height: number;
  position?: string;
  bubble?: BubbleConfig;
  tileId: string;
  activeTouchId: string | null;
  onTap: (id: string | null) => void;
  isTouch: boolean;
}) {
  const tileRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const visible = bubble
    ? isTouch
      ? activeTouchId === tileId
      : hovered
    : false;

  // Bubble position
  const tileW = tileRef.current?.offsetWidth ?? 180;
  let bx: number, by: number, bubbleMaxW: string;

  if (isTouch) {
    bx = 10;
    by = 10;
    bubbleMaxW = `min(${MOBILE_BUBBLE_W}px, calc(100% - 20px))`;
  } else {
    const EST_H = 80;
    bx = cursor.x + 14;
    by = Math.max(8, cursor.y - EST_H - 8);
    bubbleMaxW = `${DESKTOP_BUBBLE_W}px`;

    if (bx + DESKTOP_BUBBLE_W > tileW - 8) {
      bx = Math.max(8, tileW - DESKTOP_BUBBLE_W - 8);
    }
    bx = Math.max(8, bx);
  }

  return (
    <div
      ref={tileRef}
      style={{ position: "relative", flexShrink: 0 }}
      onMouseEnter={() => { if (!isTouch && bubble) setHovered(true); }}
      onMouseLeave={() => { if (!isTouch) setHovered(false); }}
      onMouseMove={(e) => {
        if (isTouch || !bubble) return;
        const rect = tileRef.current!.getBoundingClientRect();
        setCursor({ x: e.clientX - rect.left, y: e.clientY - rect.top });
      }}
      onClick={(e) => {
        if (!isTouch || !bubble) return;
        e.stopPropagation();
        onTap(activeTouchId === tileId ? null : tileId);
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt=""
        style={{
          width: "100%",
          height,
          objectFit: "cover",
          objectPosition: position ?? "center",
          borderRadius: 10,
          display: "block",
        }}
      />

      {bubble && (
        <div
          aria-hidden
          className={`mosaic-bubble${visible ? " mosaic-bubble--visible" : ""}`}
          style={{
            "--bubble-bg": bubble.bg,
            position: "absolute",
            left: bx,
            top: by,
            maxWidth: bubbleMaxW,
            background: bubble.bg,
            color: bubble.fg,
            borderRadius: 20,
            padding: "12px 18px",
            fontSize: 13,
            fontWeight: 500,
            lineHeight: 1.45,
            fontFamily: "Inter, sans-serif",
            boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
            opacity: visible ? undefined : 0,
            pointerEvents: "none",
            zIndex: 20,
          } as React.CSSProperties}
        >
          {bubble.text}
        </div>
      )}
    </div>
  );
}

// ── Parallax helper ───────────────────────────────────────────────────────────
// The mosaic starts just below the navbar. As it scrolls up and away, we turn
// the distance travelled into a 0 → 1 progress value that drives the reveal.
function getProgress(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  return Math.max(0, Math.min(1, (NAV_OFFSET - rect.top) / REVEAL_DISTANCE));
}

// ── MosaicGrid ────────────────────────────────────────────────────────────────
export function MosaicGrid() {
  const outerRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([null, null, null]);
  const rafRef = useRef<number | null>(null);
  const activeRef = useRef(false);
  const [activeTouchId, setActiveTouchId] = useState<string | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detect touch-only devices (no hover capability) and narrow screens
  useEffect(() => {
    setIsTouch(!window.matchMedia("(hover: hover)").matches);
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // Parallax scroll (desktop only — mobile shows a static two-column grid)
  useEffect(() => {
    if (isMobile) return;

    function tick() {
      if (!outerRef.current) return;
      const p = getProgress(outerRef.current);
      const boxH = outerRef.current.clientHeight;
      colRefs.current.forEach((col) => {
        if (!col) return;
        // End position puts the column's bottom flush with the box's bottom.
        const end = boxH - col.offsetHeight;
        col.style.transform = `translateY(${TOP_OFFSET + p * (end - TOP_OFFSET)}px)`;
      });
    }

    tick();

    const io = new IntersectionObserver(
      ([entry]) => { activeRef.current = entry.isIntersecting; },
      { rootMargin: "300px" }
    );
    if (outerRef.current) io.observe(outerRef.current);

    function onScroll() {
      if (!activeRef.current) return;
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(tick);
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      io.disconnect();
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [isMobile]);

  // Dismiss tap bubble when clicking outside the mosaic
  useEffect(() => {
    if (!isTouch) return;
    function dismiss() { setActiveTouchId(null); }
    document.addEventListener("click", dismiss);
    return () => document.removeEventListener("click", dismiss);
  }, [isTouch]);

  // Mobile: static two-column grid, all images visible, tap reveals bubbles.
  if (isMobile) {
    return (
      <div style={{ display: "flex", gap: GAP, padding: "24px 16px 0", boxSizing: "border-box" }}>
        {MOBILE_COLUMNS.map((images, ci) => (
          <div
            key={ci}
            style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: GAP }}
          >
            {images.map((img, ii) => (
              <ImageTile
                key={`${ci}-${ii}`}
                src={img.src}
                height={img.height}
                position={img.position}
                bubble={BUBBLES[img.src]}
                tileId={`${ci}-${ii}`}
                activeTouchId={activeTouchId}
                onTap={setActiveTouchId}
                isTouch={isTouch}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      ref={outerRef}
      style={{
        // The mosaic scrolls with the page; the column reveal is driven by
        // how far it has scrolled (see getProgress). On short screens fall
        // back to the space below the navbar so it never overflows the fold.
        position: "relative",
        height: `min(${REVEAL_HEIGHT}px, calc(100vh - ${NAV_OFFSET}px))`,
        overflow: "hidden",
        display: "flex",
        gap: GAP,
        padding: "0 16px",
        boxSizing: "border-box",
      }}
    >
      {COLUMNS.map((images, ci) => (
        <div key={ci} style={{ flex: 1, minWidth: 0 }}>
          <div
            ref={(el) => { colRefs.current[ci] = el; }}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: GAP,
              willChange: "transform",
              transform: `translateY(${TOP_OFFSET}px)`,
            }}
          >
            {images.map((img, ii) => (
              <ImageTile
                key={`${ci}-${ii}`}
                src={img.src}
                height={img.height}
                position={img.position}
                bubble={BUBBLES[img.src]}
                tileId={`${ci}-${ii}`}
                activeTouchId={activeTouchId}
                onTap={setActiveTouchId}
                isTouch={isTouch}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
