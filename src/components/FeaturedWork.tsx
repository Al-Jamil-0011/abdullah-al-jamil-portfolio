import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "HealthSync Dashboard",
    category: "Product Design • Healthcare",
    description: "A comprehensive health management platform that helps users track their wellness journey through intuitive data visualization and personalized insights.",
    tags: ["UX Research", "UI Design", "Design System"],
    thinking: "The challenge was making complex health data accessible. I focused on progressive disclosure—showing essential metrics first, with deeper insights available on demand.",
    color: "bg-accent/10",
  },
  {
    id: 2,
    title: "FinFlow Mobile App",
    category: "UI/UX Design • Fintech",
    description: "A mobile banking experience that simplifies financial management for young professionals, featuring smart budgeting tools and seamless transaction flows.",
    tags: ["Mobile Design", "User Research", "Prototyping"],
    thinking: "Users felt overwhelmed by traditional banking apps. I prioritized the '3-tap principle'—any common action should be completable in three taps or less.",
    color: "bg-highlight/10",
  },
  {
    id: 3,
    title: "EduLearn Platform",
    category: "Full Stack • EdTech",
    description: "An interactive learning platform connecting students with mentors, featuring real-time collaboration tools and progress tracking.",
    tags: ["React", "TypeScript", "UI Design"],
    thinking: "Learning is personal. I designed flexible learning paths that adapt to individual pace while maintaining engagement through gamification elements.",
    color: "bg-secondary",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isThinkingOpen, setIsThinkingOpen] = useState(false);
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, margin: "-50px" });

  return (
    <motion.article
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group"
    >
      <div className={`${project.color} rounded-2xl p-8 md:p-12 transition-all duration-300 hover:shadow-lg`}>
        {/* Project Image Placeholder */}
        <div className="aspect-video bg-gradient-to-br from-muted to-muted/50 rounded-xl mb-8 overflow-hidden relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground text-sm">Project Preview</span>
          </div>
          <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-300" />
        </div>

        {/* Project Info */}
        <div className="space-y-4">
          <p className="text-xs uppercase tracking-wider text-muted-foreground">
            {project.category}
          </p>
          
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-2xl md:text-3xl font-display font-medium text-foreground">
              {project.title}
            </h3>
            <button className="p-2 rounded-full bg-foreground text-background opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <ArrowUpRight className="w-5 h-5" />
            </button>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-3 py-1.5 bg-background/80 text-foreground rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Designer's Thinking - Interactive Reveal */}
          <div className="pt-4 border-t border-border/50 mt-6">
            <button
              onClick={() => setIsThinkingOpen(!isThinkingOpen)}
              className="flex items-center gap-2 text-sm text-accent hover:text-accent/80 transition-colors"
            >
              <span className="font-medium">Why I designed it this way</span>
              {isThinkingOpen ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4" />
              )}
            </button>
            
            <motion.div
              initial={false}
              animate={{ height: isThinkingOpen ? "auto" : 0, opacity: isThinkingOpen ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="pt-4 text-sm text-muted-foreground italic leading-relaxed">
                "{project.thinking}"
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

const FeaturedWork = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="work" className="section-padding bg-secondary/30" ref={ref}>
      <div className="container-wide">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <p className="text-label mb-4">Featured Work</p>
            <div className="accent-line mb-8" />
            <h2 className="text-foreground">
              Selected <span className="italic text-accent">case studies</span>
            </h2>
          </div>
          
          <p className="text-muted-foreground max-w-md">
            Each project tells a story of research, iteration, and thoughtful 
            execution. Click "Why I designed it this way" to see my thinking process.
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedWork;
