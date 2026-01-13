import { motion } from "framer-motion";
import { Palette, Code2, Search, Sparkles, Database, Globe, Figma, Terminal } from "lucide-react";

const skills = [
  { icon: Palette, label: "UI/UX Design" },
  { icon: Figma, label: "Figma" },
  { icon: Code2, label: "React" },
  { icon: Terminal, label: "Python" },
];

const progressSkills = [
  { name: "Node.js", percentage: 90 },
  { name: "PostgreSQL", percentage: 85 },
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
  return (
    <motion.div
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
        Tools & technologies I work with
      </p>

      {/* Skill Icons Grid */}
      <div className="grid grid-cols-4 gap-3 mb-8">
        {skills.map((skill, index) => (
          <motion.div
            key={skill.label}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
            className="skill-card"
          >
            <skill.icon className="w-6 h-6 text-foreground mx-auto mb-2" />
            <span className="text-xs text-muted-foreground">{skill.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Progress Skills */}
      <div className="space-y-4 mb-8">
        {progressSkills.map((skill, index) => (
          <motion.div
            key={skill.name}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-foreground font-medium">{skill.name}</span>
              <span className="text-sm text-primary">{skill.percentage}%</span>
            </div>
            <div className="progress-bar">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${skill.percentage}%` }}
                transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
                className="progress-fill"
              />
            </div>
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
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.5 + index * 0.05 }}
            className="p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors"
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
