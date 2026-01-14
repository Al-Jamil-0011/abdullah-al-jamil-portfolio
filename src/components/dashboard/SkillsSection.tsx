import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code2, Search, Sparkles, Figma, Terminal, Lightbulb, MessageCircle, Users, Clock, Brain } from "lucide-react";

const coreSkills = [
  { name: "UX/UI Design", percentage: 90, icon: Palette },
  { name: "Graphic Design", percentage: 40, icon: Figma },
  { name: "Frontend Development", percentage: 75, icon: Code2 },
  { name: "Python", percentage: 50, icon: Terminal },
  { name: "AI / Machine Learning", percentage: 65, icon: Brain },
];

const softSkills = [
  { icon: Lightbulb, label: "Creative Thinking" },
  { icon: MessageCircle, label: "Communication" },
  { icon: Users, label: "Teamwork" },
  { icon: Search, label: "Problem Solving" },
  { icon: Clock, label: "Time Management" },
];

const coreCapabilities = [
  { 
    icon: Palette, 
    title: "UI/UX Design", 
    description: "Crafting intuitive, accessible, and visually refined interfaces" 
  },
  { 
    icon: Code2, 
    title: "Development", 
    description: "Building robust, scalable applications with modern technologies" 
  },
  { 
    icon: Search, 
    title: "User Research", 
    description: "Understanding real user needs through research-driven insights" 
  },
  { 
    icon: Sparkles, 
    title: "Brand Identity", 
    description: "Creating cohesive, meaningful brand experiences" 
  },
];

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="glass-card p-6 md:p-8"
    >
      {/* Header */}
      <h3 className="text-lg font-semibold text-foreground mb-1">
        My <span className="text-primary">Skills</span>
      </h3>
      <p className="text-sm text-muted-foreground mb-6">
        Core competencies & technologies
      </p>

      {/* Core Skills Progress Bars */}
      <div className="space-y-5 mb-8">
        {coreSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ x: -20, opacity: 0 }}
            animate={isInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-2">
                <skill.icon className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground font-medium">{skill.name}</span>
              </div>
              <span className="text-sm text-primary font-semibold">{skill.percentage}%</span>
            </div>
            <div className="progress-bar h-2.5">
              <motion.div
                initial={{ width: 0 }}
                animate={isInView ? { width: `${skill.percentage}%` } : { width: 0 }}
                transition={{ duration: 1, delay: 0.3 + index * 0.1, ease: "easeOut" }}
                className="progress-fill"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border/50 my-6" />

      {/* Soft Skills */}
      <h4 className="text-sm font-semibold text-foreground mb-4">Soft Skills</h4>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 mb-8">
        {softSkills.map((skill, index) => (
          <motion.div
            key={skill.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            className="soft-skill-card p-3 rounded-xl bg-secondary/30 text-center transition-all duration-300 hover:bg-secondary/50 hover:scale-105"
          >
            <skill.icon className="w-5 h-5 text-primary mx-auto mb-1.5" />
            <span className="text-xs text-muted-foreground">{skill.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Divider */}
      <div className="border-t border-border/50 my-6" />

      {/* Core Capabilities */}
      <h4 className="text-sm font-semibold text-foreground mb-4">Core Capabilities</h4>
      <div className="grid grid-cols-2 gap-3">
        {coreCapabilities.map((cap, index) => (
          <motion.div
            key={cap.title}
            initial={{ y: 10, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.6 + index * 0.05 }}
            className="capability-card p-3 rounded-xl bg-secondary/30 transition-all duration-300 hover:bg-secondary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
          >
            <cap.icon className="w-5 h-5 text-primary mb-2" />
            <h5 className="text-sm font-medium text-foreground mb-1">{cap.title}</h5>
            <p className="text-xs text-muted-foreground line-clamp-2">{cap.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default SkillsSection;
