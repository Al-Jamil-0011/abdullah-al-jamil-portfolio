import { motion } from "framer-motion";
import { useMemo } from "react";

/**
 * Subtle animated background:
 * - Slow drifting gradient orbs (very low opacity)
 * - Faint twinkling stars
 * - Slow-moving constellation dots
 */
const AnimatedBackground = () => {
  // Pre-generate twinkling stars
  const stars = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 5,
        duration: Math.random() * 4 + 3,
      })),
    []
  );

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Drifting orb 1 — very subtle */}
      <motion.div
        className="absolute -top-40 -left-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-[0.12]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary)), transparent 65%)",
        }}
        animate={{ x: [0, 100, -50, 0], y: [0, 70, -30, 0] }}
        transition={{ duration: 38, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting orb 2 */}
      <motion.div
        className="absolute top-1/3 -right-40 h-[34rem] w-[34rem] rounded-full blur-3xl opacity-[0.10]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(190 95% 65%), transparent 65%)",
        }}
        animate={{ x: [0, -90, 50, 0], y: [0, -50, 70, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting orb 3 */}
      <motion.div
        className="absolute -bottom-44 left-1/4 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-[0.08]"
        style={{
          background:
            "radial-gradient(circle at center, hsl(220 80% 55%), transparent 65%)",
        }}
        animate={{ x: [0, 70, -70, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Twinkling stars */}
      <div className="absolute inset-0">
        {stars.map((s) => (
          <motion.span
            key={s.id}
            className="absolute rounded-full bg-foreground"
            style={{
              left: `${s.x}%`,
              top: `${s.y}%`,
              width: s.size,
              height: s.size,
            }}
            animate={{ opacity: [0.05, 0.4, 0.05] }}
            transition={{
              duration: s.duration,
              delay: s.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default AnimatedBackground;
