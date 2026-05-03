import { motion } from "framer-motion";

/**
 * Slow, fluid animated background with drifting gradient orbs.
 * Sits behind all content (pointer-events: none).
 */
const AnimatedBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      {/* Base subtle gradient wash */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />

      {/* Drifting orb 1 */}
      <motion.div
        className="absolute -top-32 -left-32 h-[40rem] w-[40rem] rounded-full blur-3xl opacity-30"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.45), transparent 60%)",
        }}
        animate={{ x: [0, 120, -60, 0], y: [0, 80, -40, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting orb 2 */}
      <motion.div
        className="absolute top-1/3 -right-40 h-[36rem] w-[36rem] rounded-full blur-3xl opacity-25"
        style={{
          background:
            "radial-gradient(circle at center, hsl(190 95% 65% / 0.4), transparent 60%)",
        }}
        animate={{ x: [0, -100, 60, 0], y: [0, -60, 80, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Drifting orb 3 */}
      <motion.div
        className="absolute -bottom-40 left-1/3 h-[44rem] w-[44rem] rounded-full blur-3xl opacity-20"
        style={{
          background:
            "radial-gradient(circle at center, hsl(220 80% 50% / 0.4), transparent 60%)",
        }}
        animate={{ x: [0, 80, -80, 0], y: [0, -50, 50, 0] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Subtle constellation dots */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.18]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id="constellation"
            x="0"
            y="0"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="1" cy="1" r="0.8" fill="hsl(var(--primary))" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#constellation)" />
      </svg>
    </div>
  );
};

export default AnimatedBackground;
