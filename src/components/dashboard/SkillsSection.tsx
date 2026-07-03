import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code2, Server, Brain, Terminal, Sparkles } from "lucide-react";

type Skill = {
  name: string;
  percentage: number;
  color: string;
  icon: React.ElementType;
};

const SKILLS: Skill[] = [
  { name: "UX/UI Design", percentage: 90, color: "#A78BFA", icon: Palette },
  { name: "Graphic Design", percentage: 40, color: "#F472B6", icon: Sparkles },
  { name: "Front-End Development", percentage: 80, color: "#60A5FA", icon: Code2 },
  { name: "Python", percentage: 50, color: "#2DD4BF", icon: Terminal },
  { name: "AI / Machine Learning", percentage: 65, color: "#F59E0B", icon: Brain },
  { name: "Backend Development", percentage: 40, color: "#4ADE80", icon: Server },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className="glass-card p-6 md:p-10 relative overflow-hidden"
    >
      <div className="relative">
        <p className="text-xs font-medium tracking-[0.2em] text-primary uppercase mb-3">• My Skills</p>
        <h3 className="text-2xl md:text-3xl font-display font-semibold text-foreground mb-2">
          Designing experiences. <span className="text-primary">Building products.</span>
        </h3>
        <p className="text-sm md:text-base text-muted-foreground max-w-xl mb-10">
          A blend of design thinking and engineering craft — building interfaces that are as considered as they are performant.
        </p>

        <div className="grid gap-4 md:gap-5">
          {SKILLS.map((skill) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                className="group relative rounded-xl p-4 md:p-5 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_40px_-12px_hsl(var(--primary)/0.18)] bg-card/40 border border-border/60 hover:border-primary/20 hover:bg-card/70"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="flex items-center justify-center w-9 h-9 rounded-lg transition-transform duration-300 group-hover:scale-110"
                    style={{
                      color: skill.color,
                      backgroundColor: `${skill.color}15`,
                    }}
                  >
                    <Icon className="w-4.5 h-4.5" />
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-4">
                    <span className="font-medium text-foreground text-sm md:text-base">
                      {skill.name}
                    </span>
                    <span
                      className="text-sm md:text-base font-semibold tabular-nums"
                      style={{ color: skill.color }}
                    >
                      {skill.percentage}%
                    </span>
                  </div>
                </div>

                <div className="h-2 w-full rounded-full bg-muted/60 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full origin-left"
                    style={{ backgroundColor: skill.color }}
                    initial={{ scaleX: 0 }}
                    animate={isInView ? { scaleX: skill.percentage / 100 } : { scaleX: 0 }}
                    transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_12px_currentColor]" style={{ color: skill.color }} />
                  </motion.div>
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
