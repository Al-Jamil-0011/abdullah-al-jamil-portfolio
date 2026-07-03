import { motion, useInView, useMotionValue, useSpring, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Palette, Code2, Layers, Brain, Terminal, Sparkles } from "lucide-react";

type Skill = {
  name: string;
  short: string;
  percentage: number;
  color: string; // hex
  icon: React.ElementType;
  capabilities: string[];
};

const SKILLS: Skill[] = [
  { name: "UX/UI Design",          short: "UX/UI",     percentage: 90, color: "#A78BFA", icon: Palette,  capabilities: ["Wireframing", "Prototyping", "User Research", "Design Systems"] },
  { name: "Front-End Development", short: "Frontend",  percentage: 80, color: "#60A5FA", icon: Code2,    capabilities: ["React", "Responsive UI", "Component Architecture"] },
  { name: "Design Systems",        short: "Systems",   percentage: 75, color: "#4ADE80", icon: Layers,   capabilities: ["Tokens", "Component Libraries", "Documentation"] },
  { name: "AI / Machine Learning", short: "AI/ML",     percentage: 65, color: "#F59E0B", icon: Brain,    capabilities: ["Prompt Engineering", "AI Integration", "Automation"] },
  { name: "Python",                short: "Python",    percentage: 50, color: "#2DD4BF", icon: Terminal, capabilities: ["Django", "APIs", "Data Processing"] },
  { name: "Graphic Design",        short: "Graphic",   percentage: 40, color: "#F472B6", icon: Sparkles, capabilities: ["Branding", "Illustration", "Typography"] },
];

// Animated percentage counter
const Counter = ({ value, active, className }: { value: number; active: boolean; className?: string }) => {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!active) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [active, value]);
  return <span className={className}>{display}%</span>;
};

// Circular progress ring
const Ring = ({
  size,
  stroke,
  percentage,
  color,
  active,
  glow = false,
}: {
  size: number;
  stroke: number;
  percentage: number;
  color: string;
  active: boolean;
  glow?: boolean;
}) => {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} className="absolute inset-0 -rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="hsl(var(--border))" strokeOpacity={0.35} strokeWidth={stroke} fill="none" />
      <motion.circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke={color}
        strokeWidth={stroke}
        strokeLinecap="round"
        fill="none"
        style={glow ? { filter: `drop-shadow(0 0 6px ${color}80)` } : undefined}
        strokeDasharray={c}
        initial={{ strokeDashoffset: c }}
        animate={{ strokeDashoffset: active ? c - (c * percentage) / 100 : c }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
      />
    </svg>
  );
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const orbitRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  // Parallax for orbit
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const px = useSpring(mx, { stiffness: 60, damping: 15 });
  const py = useSpring(my, { stiffness: 60, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = orbitRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = (e.clientX - rect.left) / rect.width - 0.5;
    const relY = (e.clientY - rect.top) / rect.height - 0.5;
    mx.set(relX * 12);
    my.set(relY * 12);
  };
  const handleMouseLeave = () => {
    mx.set(0);
    my.set(0);
  };

  const [hovered, setHovered] = useState<number | null>(null);

  // Orbit config
  const size = 520; // container square
  const center = size / 2;
  const radius = 200;
  const nodeSize = 76;

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="glass-card p-6 md:p-10 relative overflow-hidden"
    >
      {/* subtle grid + radial glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(600px circle at 50% 40%, hsl(var(--primary) / 0.08), transparent 60%)",
        }}
      />

      <div className="relative">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-3">• My Skills</p>
        <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Designing experiences. <span className="text-primary">Building products.</span>
        </h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-10">
          A blend of design thinking and engineering craft — building interfaces that are as considered as they are performant.
        </p>

        {/* Desktop / tablet orbital */}
        <div className="hidden md:flex justify-center">
          <motion.div
            ref={orbitRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative"
            style={{
              width: size,
              height: size,
              maxWidth: "100%",
              x: px,
              y: py,
            }}
          >
            {/* Orbit rings decoration */}
            <svg width={size} height={size} className="absolute inset-0">
              <circle cx={center} cy={center} r={radius} fill="none" stroke="hsl(var(--foreground) / 0.08)" strokeWidth={1} />
              <circle cx={center} cy={center} r={radius - 30} fill="none" stroke="hsl(var(--foreground) / 0.05)" strokeWidth={1} strokeDasharray="2 6" />
              <circle cx={center} cy={center} r={radius + 30} fill="none" stroke="hsl(var(--foreground) / 0.04)" strokeWidth={1} />
              {/* Connection lines from center to each node */}
              {SKILLS.map((s, i) => {
                const a = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
                const x = center + Math.cos(a) * radius;
                const y = center + Math.sin(a) * radius;
                return (
                  <motion.line
                    key={s.name}
                    x1={center}
                    y1={center}
                    x2={x}
                    y2={y}
                    stroke={s.color}
                    strokeOpacity={hovered === i ? 0.45 : 0.12}
                    strokeWidth={1}
                    initial={{ pathLength: 0 }}
                    animate={isInView ? { pathLength: 1 } : {}}
                    transition={{ duration: 1, delay: 0.2 + i * 0.08 }}
                  />
                );
              })}
            </svg>

            {/* Center card */}
            <div
              className="absolute rounded-full flex flex-col items-center justify-center text-center"
              style={{
                width: 180,
                height: 180,
                left: center - 90,
                top: center - 90,
                background:
                  "radial-gradient(circle at 30% 30%, hsl(var(--card)), hsl(var(--background)))",
                boxShadow:
                  "0 20px 60px -20px hsl(var(--primary) / 0.35), inset 0 1px 0 hsl(var(--foreground) / 0.08)",
                border: "1px solid hsl(var(--border))",
              }}
            >
              <div
                className="text-5xl font-display font-semibold bg-clip-text text-transparent"
                style={{ backgroundImage: "linear-gradient(135deg, #A78BFA, #60A5FA)" }}
              >
                AJ
              </div>
              <div className="text-xs text-muted-foreground mt-1">Product Designer</div>
              <div className="text-xs text-muted-foreground">&amp; Developer</div>
              <div className="w-8 h-[2px] bg-primary/60 rounded-full mt-2" />
            </div>

            {/* Skill nodes */}
            {SKILLS.map((skill, i) => {
              const a = (i / SKILLS.length) * Math.PI * 2 - Math.PI / 2;
              const x = center + Math.cos(a) * radius - nodeSize / 2;
              const y = center + Math.sin(a) * radius - nodeSize / 2;
              const Icon = skill.icon;
              const isHover = hovered === i;

              // Tooltip position: outside orbit
              const tipSide = Math.cos(a) >= 0 ? "left" : "right";
              return (
                <motion.div
                  key={skill.name}
                  className="absolute"
                  style={{ left: x, top: y, width: nodeSize, height: nodeSize }}
                  initial={{ opacity: 0, scale: 0.6 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.08, ease: "easeOut" }}
                  onMouseEnter={() => setHovered(i)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <motion.div
                    animate={{ y: [0, -6, 0] }}
                    transition={{ duration: 4 + i * 0.3, repeat: Infinity, ease: "easeInOut" }}
                    className="relative w-full h-full"
                  >
                    <motion.div
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.25 }}
                      className="relative w-full h-full rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        background: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        boxShadow: isHover
                          ? `0 0 0 1px ${skill.color}55, 0 10px 40px -10px ${skill.color}66`
                          : `0 6px 24px -12px ${skill.color}44`,
                        transition: "box-shadow 250ms ease",
                      }}
                    >
                      <Ring size={nodeSize} stroke={3} percentage={skill.percentage} color={skill.color} active={isInView} glow={isHover} />
                      <Icon className="w-6 h-6" style={{ color: skill.color }} />
                    </motion.div>

                    {/* label */}
                    <div
                      className="absolute left-1/2 -translate-x-1/2 text-center whitespace-nowrap"
                      style={{ top: nodeSize + 8 }}
                    >
                      <div className="text-xs font-medium text-foreground">{skill.name}</div>
                      <Counter
                        value={skill.percentage}
                        active={isInView}
                        className="text-xs font-semibold"
                      />
                      <style>{``}</style>
                    </div>

                    {/* Tooltip */}
                    {isHover && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                        className="absolute z-20 w-56 p-3 rounded-xl pointer-events-none"
                        style={{
                          [tipSide]: nodeSize + 14,
                          top: "50%",
                          transform: "translateY(-50%)",
                          background: "hsl(var(--popover))",
                          border: `1px solid ${skill.color}55`,
                          boxShadow: `0 20px 50px -20px ${skill.color}55`,
                        } as React.CSSProperties}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <div className="text-sm font-semibold text-foreground">{skill.name}</div>
                          <div className="text-xs font-semibold" style={{ color: skill.color }}>{skill.percentage}%</div>
                        </div>
                        <div className="text-[11px] text-muted-foreground leading-relaxed">
                          {skill.capabilities.join(" • ")}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile stacked grid */}
        <div className="md:hidden grid grid-cols-2 gap-3">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            const s = 72;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06 }}
                className="rounded-2xl p-4 flex flex-col items-center text-center"
                style={{
                  background: "hsl(var(--card))",
                  border: "1px solid hsl(var(--border))",
                  boxShadow: `0 8px 30px -18px ${skill.color}66`,
                }}
              >
                <div className="relative" style={{ width: s, height: s }}>
                  <Ring size={s} stroke={3} percentage={skill.percentage} color={skill.color} active={isInView} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Icon className="w-5 h-5" style={{ color: skill.color }} />
                  </div>
                </div>
                <div className="mt-3 text-sm font-medium text-foreground">{skill.name}</div>
                <Counter value={skill.percentage} active={isInView} className="text-xs font-semibold" />
                <div className="text-[10px] text-muted-foreground mt-1 leading-snug">
                  {skill.capabilities.slice(0, 2).join(" • ")}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
};

export default SkillsSection;
