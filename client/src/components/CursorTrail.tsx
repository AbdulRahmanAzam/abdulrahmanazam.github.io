import React from "react";

/**
 * Circle-based cursor trail inspired by the provided snippet.
 * - Renders N fixed-position circles
 * - Colors cycle through a palette
 * - Uses requestAnimationFrame for smooth trailing
 * - Skips on coarse pointers and when prefers-reduced-motion
 */
type HSL = { h: number; s: number; l: number; isDark: boolean };

// Read base theme color from CSS var and detect dark mode
function getBaseHsl(): HSL {
  const rs = getComputedStyle(document.documentElement);
  const raw = rs.getPropertyValue("--cursor-trail").trim() || "217 90% 54%";
  const parts = raw.split(/\s+/);
  let h = 217, s = 90, l = 54;
  if (parts.length >= 3) {
    h = parseFloat(parts[0]);
    s = parseFloat(parts[1]);
    l = parseFloat(parts[2]);
  }
  const isDark = document.documentElement.classList.contains("dark");
  return { h, s, l, isDark };
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n));
}

// Compute an attractive per-circle color from the base theme HSL
function colorFor(index: number, total: number, base: HSL): string {
  const t = total > 1 ? index / (total - 1) : 0; // 0..1 tailwards
  // Slight hue drift for interest
  const hueDrift = base.isDark ? -6 : 8;
  const h = base.h + hueDrift * t;
  // Saturation: a touch more saturated at the head in dark, slightly less in light
  const s = clamp(base.isDark ? base.s + 8 * (1 - t) : base.s - 6 * t, 20, 100);
  // Lightness: brighter on dark backgrounds, darker on light backgrounds towards the tail
  const l = clamp(base.isDark ? base.l + 10 * (1 - t) : base.l - 14 * t, 8, 95);
  // Alpha fades along the trail
  const alpha = clamp(0.15 + (1 - t) * 0.6, 0.15, 0.75);
  return `hsl(${h} ${s}% ${l}% / ${alpha})`;
}

const CIRCLES = 32; // number of trail dots

export function CursorTrail() {
  if (typeof window === "undefined") return null;

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isCoarse = window.matchMedia("(pointer: coarse)").matches;
  if (prefersReducedMotion || isCoarse) return null;

  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const circleRefs = React.useRef<HTMLDivElement[]>([]);
  const coordsRef = React.useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const startedRef = React.useRef(false);
  const rafRef = React.useRef<number>();

  React.useEffect(() => {
    const circles = circleRefs.current;
    // Initialize per-circle positions
    const positions = Array.from({ length: circles.length }, () => ({ x: coordsRef.current.x, y: coordsRef.current.y }));

    const applyColors = () => {
      const base = getBaseHsl();
      circles.forEach((el, index) => {
        if (!el) return;
        el.style.backgroundColor = colorFor(index, circles.length, base);
      });
    };
    // Initial and on theme toggle
    applyColors();
    const mo = new MutationObserver((m) => {
      for (const rec of m) {
        if (rec.type === "attributes" && rec.attributeName === "class") {
          applyColors();
        }
      }
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const animate = () => {
      let x = coordsRef.current.x;
      let y = coordsRef.current.y;

      for (let i = 0; i < circles.length; i++) {
        const el = circles[i];
        if (!el) continue;

        // position
        const px = x - 12; // center by half width
        const py = y - 12;
        const scale = (circles.length - i) / circles.length;
        el.style.transform = `translate3d(${px}px, ${py}px, 0) scale(${scale})`;

        // store current
        positions[i].x = x;
        positions[i].y = y;

        // follow next
        const next = positions[i + 1] || positions[0];
        x += (next.x - x) * 0.3;
        y += (next.y - y) * 0.3;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    const onMove = (e: PointerEvent) => {
      coordsRef.current.x = e.clientX;
      coordsRef.current.y = e.clientY;
      if (!startedRef.current) {
        startedRef.current = true;
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    document.addEventListener("pointermove", onMove, { passive: true });

    return () => {
      document.removeEventListener("pointermove", onMove as any);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      mo.disconnect();
    };
  }, []);

  return (
    <div ref={containerRef} aria-hidden>
      {Array.from({ length: CIRCLES }, (_, i) => (
        <div
          key={i}
          className="cursor-circle"
          ref={(el) => {
            if (el) circleRefs.current[i] = el;
          }}
        />
      ))}
    </div>
  );
}

export default CursorTrail;
