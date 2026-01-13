import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "HealthSync Dashboard",
    category: "Product Design",
    industry: "Healthcare",
    description: "A comprehensive health management platform that helps users track their wellness journey through intuitive data visualization and personalized insights.",
    tags: ["UX Research", "UI Design", "Design System", "Figma"],
    thinking: "The challenge was making complex health data accessible. I focused on progressive disclosure—showing essential metrics first, with deeper insights available on demand. This reduced cognitive load while maintaining depth.",
    image: "from-primary/20 to-secondary",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "FinFlow Mobile App",
    category: "UI/UX Design",
    industry: "Fintech",
    description: "A mobile banking experience that simplifies financial management for young professionals, featuring smart budgeting tools and seamless transaction flows.",
    tags: ["Mobile Design", "User Research", "Prototyping", "React Native"],
    thinking: "Users felt overwhelmed by traditional banking apps. I prioritized the '3-tap principle'—any common action should be completable in three taps or less. This dramatically improved task completion rates.",
    image: "from-blue-500/20 to-secondary",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "EduLearn Platform",
    category: "Full Stack",
    industry: "EdTech",
    description: "An interactive learning platform connecting students with mentors, featuring real-time collaboration tools and progress tracking.",
    tags: ["React", "TypeScript", "Node.js", "PostgreSQL"],
    thinking: "Learning is personal. I designed flexible learning paths that adapt to individual pace while maintaining engagement through gamification elements without being distracting.",
    image: "from-purple-500/20 to-secondary",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "ShopEase E-commerce",
    category: "Web Development",
    industry: "E-commerce",
    description: "A modern e-commerce platform with seamless checkout experience, product recommendations, and inventory management system.",
    tags: ["Next.js", "Stripe", "Tailwind CSS", "Supabase"],
    thinking: "Cart abandonment was the biggest challenge. I streamlined the checkout to just 3 steps and added trust signals at each stage, resulting in a 25% improvement in conversion.",
    image: "from-orange-500/20 to-secondary",
    liveUrl: "#",
    githubUrl: "#",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover overflow-hidden group"
    >
      {/* Project Preview */}
      <div className={`h-48 bg-gradient-to-br ${project.image} relative overflow-hidden`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-muted-foreground/50 text-sm">Project Preview</span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <a
            href={project.liveUrl}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
            aria-label="View live"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={project.githubUrl}
            className="p-2 rounded-lg bg-card/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
            aria-label="View source"
          >
            <Github className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-xs text-primary font-medium mb-1">
              {project.category} • {project.industry}
            </p>
            <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
              {project.title}
            </h4>
          </div>
          <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2.5 py-1 rounded-lg bg-secondary/50 text-muted-foreground"
            >
              {tag}
            </span>
          ))}
          {project.tags.length > 3 && (
            <span className="text-xs px-2.5 py-1 rounded-lg bg-secondary/50 text-muted-foreground">
              +{project.tags.length - 3}
            </span>
          )}
        </div>

        {/* Designer's Thinking */}
        <div className="border-t border-border/50 pt-4">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 text-sm text-primary hover:text-primary/80 transition-colors"
          >
            <span className="font-medium">My thinking process</span>
            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
          
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? "auto" : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="pt-3 text-sm text-muted-foreground italic">
              "{project.thinking}"
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsContent = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Featured <span className="text-primary">Projects</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          A selection of projects that showcase my approach to design and development. 
          Click "My thinking process" to understand the reasoning behind each decision.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid md:grid-cols-2 gap-5">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectsContent;
