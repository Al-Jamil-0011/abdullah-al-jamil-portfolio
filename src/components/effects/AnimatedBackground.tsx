// Animated constellation background — synced to GitHub for Vercel deployment
import { useEffect, useRef } from "react";


/**
 * Animated constellation network background.
 * - Floating particles connected by lines when nearby
 * - Subtle wave grid at the bottom
 * - Very low opacity so foreground content stays crisp
 */
const AnimatedBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    type Particle = {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
    };
    let particles: Particle[] = [];

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      // Particle count scales with area but stays light
      const target = Math.min(110, Math.floor((width * height) / 16000));
      particles = Array.from({ length: target }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.4 + 0.6,
      }));
    };

    resize();
    window.addEventListener("resize", resize);

    // Mouse repulsion (very gentle)
    const mouse = { x: -9999, y: -9999 };
    const onMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    const MAX_DIST = 130;
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST;

    // AI cyan in rgb (~ hsl(179 99% 79%) -> #93FFFE)
    const ACCENT = "147, 255, 254";

    let waveOffset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle wave grid lines at the bottom
      waveOffset += 0.004;
      ctx.lineWidth = 1;
      for (let i = 0; i < 5; i++) {
        const yBase = height - 40 - i * 28;
        ctx.beginPath();
        for (let x = 0; x <= width; x += 12) {
          const y =
            yBase +
            Math.sin(x * 0.008 + waveOffset + i * 0.6) * (8 + i * 2) +
            Math.sin(x * 0.02 + waveOffset * 1.6) * 3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(${ACCENT}, ${0.06 - i * 0.008})`;
        ctx.stroke();
      }

      // Update particles
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Mouse gentle repulsion
        const mdx = p.x - mouse.x;
        const mdy = p.y - mouse.y;
        const md2 = mdx * mdx + mdy * mdy;
        if (md2 < 120 * 120) {
          const f = (120 - Math.sqrt(md2)) / 120;
          p.x += (mdx / Math.sqrt(md2 || 1)) * f * 0.6;
          p.y += (mdy / Math.sqrt(md2 || 1)) * f * 0.6;
        }

        if (p.x < 0) p.x = width;
        else if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        else if (p.y > height) p.y = 0;
      }

      // Lines between near particles
      for (let i = 0; i < particles.length; i++) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j++) {
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST_SQ) {
            const alpha = (1 - d2 / MAX_DIST_SQ) * 0.18;
            ctx.strokeStyle = `rgba(${ACCENT}, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // Particle dots
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${ACCENT}, 0.55)`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Deep ambient glow orbs (very faint) */}
      <div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary)), transparent 65%)",
        }}
      />
      <div
        className="absolute -bottom-40 -right-32 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(190 95% 65%), transparent 65%)",
        }}
      />

      {/* Constellation canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 h-full w-full opacity-70"
      />
    </div>
  );
};

export default AnimatedBackground;
