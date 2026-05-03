import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom cursor with lagging glowing trail.
 * - Hides on touch devices.
 * - Grows + glows when hovering interactive elements.
 * - Emits a ripple on click.
 */
const CustomCursor = () => {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

  // Lagging trail uses spring for smooth follow
  const trailX = useSpring(x, { stiffness: 120, damping: 20, mass: 0.6 });
  const trailY = useSpring(y, { stiffness: 120, damping: 20, mass: 0.6 });

  const [isHovering, setIsHovering] = useState(false);
  const [isTouch, setIsTouch] = useState(false);
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);
  const rippleId = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isTouchDevice =
      "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) {
      setIsTouch(true);
      return;
    }

    const handleMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);

      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest(
        'a, button, [role="button"], input, textarea, select, label, [data-cursor="hover"]'
      );
      setIsHovering(interactive);
    };

    const handleClick = (e: MouseEvent) => {
      const id = rippleId.current++;
      setRipples((prev) => [...prev, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 700);
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("click", handleClick);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("click", handleClick);
    };
  }, [x, y]);

  if (isTouch) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999]">
      {/* Lagging glow trail */}
      <motion.div
        style={{
          x: trailX,
          y: trailY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          width: isHovering ? 56 : 36,
          height: isHovering ? 56 : 36,
          opacity: isHovering ? 0.9 : 0.5,
        }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="absolute rounded-full"
      >
        <div
          className="h-full w-full rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--primary) / 0.55), transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>

      {/* Crisp dot cursor */}
      <motion.div
        style={{
          x,
          y,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isHovering ? 1.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 350, damping: 22 }}
        className="absolute h-2.5 w-2.5 rounded-full bg-foreground mix-blend-difference"
      />

      {/* Click ripples */}
      {ripples.map((r) => (
        <motion.span
          key={r.id}
          initial={{ opacity: 0.6, scale: 0 }}
          animate={{ opacity: 0, scale: 4 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="absolute h-12 w-12 rounded-full border-2"
          style={{
            left: r.x,
            top: r.y,
            translate: "-50% -50%",
            borderColor: "hsl(var(--primary) / 0.7)",
            boxShadow: "0 0 24px hsl(var(--primary) / 0.5)",
          }}
        />
      ))}
    </div>
  );
};

export default CustomCursor;
