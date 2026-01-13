import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Palette, Code, Users, Sparkles } from "lucide-react";

const expertiseAreas = [
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting intuitive, accessible, and visually refined interfaces that prioritize usability, clarity, and meaningful engagement.",
    capabilities: ["Interface Design", "Interaction Design", "Design Systems", "Accessibility"],
  },
  {
    icon: Code,
    title: "Software Development",
    description: "Building robust, scalable applications using modern technologies with emphasis on performance, structure, and maintainability.",
    capabilities: ["React & TypeScript", "Python", "API Development", "Clean Architecture"],
  },
  {
    icon: Users,
    title: "User Research",
    description: "Understanding real user needs through research and translating insights into design decisions that drive product success.",
    capabilities: ["User Interviews", "Usability Testing", "Journey Mapping", "Data Analysis"],
  },
  {
    icon: Sparkles,
    title: "Brand Identity",
    description: "Creating cohesive, meaningful brand experiences that connect visuals, voice, and emotion to build trust and recognition.",
    capabilities: ["Visual Identity", "Brand Strategy", "Design Language", "Guidelines"],
  },
];

const Expertise = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="expertise" className="section-padding" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <p className="text-label mb-4">Core Expertise</p>
          <div className="accent-line mx-auto mb-8" />
          <h2 className="text-foreground mb-6">
            Capabilities that drive{" "}
            <span className="italic text-accent">results</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            A holistic approach combining design thinking with technical depth 
            to create products that truly resonate with users.
          </p>
        </motion.div>

        {/* Expertise Grid */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {expertiseAreas.map((area, index) => (
            <motion.div
              key={area.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group card-elevated"
            >
              <div className="flex items-start gap-6">
                <div className="p-4 bg-accent/10 rounded-xl text-accent group-hover:bg-accent group-hover:text-accent-foreground transition-colors duration-300">
                  <area.icon className="w-6 h-6" />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-display font-medium text-foreground mb-3">
                    {area.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-5">
                    {area.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {area.capabilities.map((cap) => (
                      <span
                        key={cap}
                        className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full"
                      >
                        {cap}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Expertise;
