import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";
import {
  Palette,
  Code2,
  Server,
  Brain,
  Terminal,
  Sparkles,
  Lightbulb,
  MessageCircle,
  Users,
  Search,
  Clock,
  CodeXml,
  Star,
} from "lucide-react";

type Skill = {
  name: string;
  percentage: number;
  color: string;
  icon: React.ElementType;
};

const SKILLS: Skill[] = [
  { name: "UX/UI Design", percentage: 90, color: "#22D3EE", icon: Palette },
  { name: "Graphic Design", percentage: 40, color: "#A78BFA", icon: Sparkles },
  { name: "Frontend Development", percentage: 80, color: "#60A5FA", icon: CodeXml },
  { name: "Python", percentage: 50, color: "#F59E0B", icon: Terminal },
  { name: "AI / Machine Learning", percentage: 65, color: "#2DD4BF", icon: Brain },
  { name: "Backend Development", percentage: 40, color: "#F472B6", icon: Server },
];

const SOFT_SKILLS = [
  { name: "Creative Thinking", icon: Lightbulb },
  { name: "Communication", icon: MessageCircle },
  { name: "Teamwork", icon: Users },
  { name: "Problem Solving", icon: Search },
  { name: "Time Management", icon: Clock },
];

const CAPABILITIES = [
  {
    name: "UX/UI Design",
    icon: Palette,
    desc: "Crafting intuitive, accessible, and visually refined interfaces",
  },
  {
    name: "Development",
    icon: CodeXml,
    desc: "Building robust, scalable applications with modern technologies",
  },
  {
    name: "User Research",
    icon: Search,
    desc: "Understanding real user needs through research-driven insights",
  },
  {
    name: "Brand Identity",
    icon: Star,
    desc: "Creating cohesive, meaningful brand experiences",
  },
];

/* ---------- Circular Ring ---------- */
const Ring = ({
  percentage,
  color,
  size = 104,
  stroke = 6,
  isInView,
  children,
}: {
  percentage: number;
  color: string;
  size?: number;
  stroke?: number;
  isInView: boolean;
  children?: React.ReactNode;
}) => {
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (v) => circumference - (v / 100) * circumference);

  useEffect(() => {
    if (isInView) {
      const controls = animate(progress, percentage, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
      return controls.stop;
    }
  }, [isInView, percentage, progress]);

  const gradId = `grad-${color.replace("#", "")}`;

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="rotate-[-90deg]">
        <defs>
          <linearGradient id={gradId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.5" />
          </linearGradient>
        </defs>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="hsl(var(--border))"
          strokeOpacity={0.35}
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={`url(#${gradId})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          style={{ strokeDashoffset: dashOffset, filter: `drop-shadow(0 0 6px ${color}55)` }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center flex-col gap-0.5">
        {children}
      </div>
    </div>
  );
};

const Counter = ({ value, isInView, color }: { value: number; isInView: boolean; color: string }) => {
  const mv = useMotionValue(0);
  const rounded = useTransform(mv, (v) => `${Math.round(v)}%`);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (isInView) {
      const controls = animate(mv, value, { duration: 1.4, ease: [0.22, 1, 0.36, 1] });
      const unsub = rounded.on("change", (v) => {
        if (ref.current) ref.current.textContent = v;
      });
      return () => {
        controls.stop();
        unsub();
      };
    }
  }, [isInView, value, mv, rounded]);

  return (
    <span
      ref={ref}
      className="text-base md:text-[17px] font-semibold tabular-nums tracking-tight"
      style={{ color }}
    >
      0%
    </span>
  );
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="space-y-6">
      {/* ============ Technical Skills ============ */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-6 md:p-8 relative overflow-hidden"
      >
        <div className="mb-8">
          <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground">
            My <span className="text-primary">Skills</span>
          </h3>
          <p className="text-sm text-muted-foreground mt-1">Core competencies & technologies</p>
        </div>

        {/* Desktop: horizontal orbit of rings */}
        <div className="hidden md:grid grid-cols-6 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group flex flex-col items-center text-center gap-3 rounded-2xl p-3 transition-all duration-250 hover:-translate-y-0.5"
              >
                <div className="transition-transform duration-250 group-hover:scale-[1.04]">
                  <Ring percentage={skill.percentage} color={skill.color} isInView={isInView}>
                    <Icon className="w-3.5 h-3.5 mb-0.5" style={{ color: skill.color }} />
                    <Counter value={skill.percentage} isInView={isInView} color={skill.color} />
                  </Ring>
                </div>
                <p className="text-[13px] font-medium text-foreground/90 leading-tight max-w-[110px]">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Mobile: 2-column ring grid */}
        <div className="md:hidden grid grid-cols-2 gap-4">
          {SKILLS.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 12 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.06 * i }}
                className="flex flex-col items-center gap-2 rounded-2xl bg-card/40 border border-border/50 p-4"
              >
                <Ring percentage={skill.percentage} color={skill.color} size={88} stroke={5} isInView={isInView}>
                  <Icon className="w-3.5 h-3.5 mb-0.5" style={{ color: skill.color }} />
                  <Counter value={skill.percentage} isInView={isInView} color={skill.color} />
                </Ring>
                <p className="text-xs font-medium text-foreground/90 text-center leading-tight">
                  {skill.name}
                </p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ============ Soft Skills ============ */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-5">
          Soft Skills
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
          {SOFT_SKILLS.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 * i }}
                className="group flex flex-col items-center justify-center text-center gap-2 rounded-xl bg-card/40 border border-border/50 p-4 transition-all duration-250 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/70 hover:shadow-[0_10px_30px_-15px_hsl(var(--primary)/0.35)]"
              >
                <Icon className="w-5 h-5 text-primary transition-transform duration-250 group-hover:scale-110" />
                <p className="text-[13px] font-medium text-foreground/90 leading-tight">{s.name}</p>
              </motion.div>
            );
          })}
        </div>
      </motion.section>

      {/* ============ Core Capabilities ============ */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card p-6 md:p-8"
      >
        <h3 className="text-lg md:text-xl font-display font-semibold text-foreground mb-5">
          Core Capabilities
        </h3>
        <div className="grid sm:grid-cols-2 gap-4">
          {CAPABILITIES.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.name}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.06 * i }}
                className="group relative flex items-start gap-4 rounded-2xl bg-card/40 border border-border/50 p-5 transition-all duration-250 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-card/70 hover:shadow-[0_12px_36px_-16px_hsl(var(--primary)/0.4)]"
              >
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-primary/10 border border-primary/20 text-primary transition-transform duration-250 group-hover:scale-105">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-[15px] font-semibold text-foreground mb-1">{c.name}</h4>
                  <p className="text-[13px] text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.section>
    </div>
  );
};

export default SkillsSection;
