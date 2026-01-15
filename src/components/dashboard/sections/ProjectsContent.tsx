import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, Github, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface Project {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  tags: string[];
  category: string;
  project_type: string;
  external_link: string | null;
  case_study_link: string | null;
  thinking_process: string | null;
}

const gradientColors = [
  "from-primary/20 to-secondary",
  "from-blue-500/20 to-secondary",
  "from-purple-500/20 to-secondary",
  "from-orange-500/20 to-secondary",
  "from-green-500/20 to-secondary",
  "from-pink-500/20 to-secondary",
];

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const gradient = gradientColors[index % gradientColors.length];

  return (
    <motion.div
      initial={{ y: 30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="glass-card-hover overflow-hidden group"
    >
      {/* Project Preview */}
      <div className={`h-48 bg-gradient-to-br ${gradient} relative overflow-hidden`}>
        {project.thumbnail_url ? (
          <img 
            src={project.thumbnail_url} 
            alt={project.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-muted-foreground/50 text-sm">Project Preview</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
        
        {/* Hover Actions */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {project.external_link && (
            <a
              href={project.external_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-card/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
              aria-label="View live"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
          {project.case_study_link && (
            <a
              href={project.case_study_link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-card/80 backdrop-blur-sm text-foreground hover:text-primary transition-colors"
              aria-label="View case study"
            >
              <Github className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <p className="text-xs text-primary font-medium mb-1">
              {project.category} • {project.project_type}
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
        {project.thinking_process && (
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
                "{project.thinking_process}"
              </p>
            </motion.div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

const ProjectsContent = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .order('display_order', { ascending: true });

        if (error) throw error;
        setProjects(data || []);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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

      {projects.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground">No projects available yet.</p>
        </div>
      )}
    </motion.div>
  );
};

export default ProjectsContent;
