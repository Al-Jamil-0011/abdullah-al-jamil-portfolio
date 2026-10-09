import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, ChevronDown, ChevronUp, ExternalLink, Sparkles, Layers, ShieldCheck } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface FeaturedProject {
  id: string;
  title: string;
  tagline: string;
  category: string;
  platform: string;
  role: string;
  description: string;
  capabilities: string[];
  thinking: {
    problem: string;
    decision: string;
    rationale: string;
  };
  liveUrl?: string;
  caseStudyUrl?: string;
  isFlagship?: boolean;
}

// Curated verified product design works from portfolio profile & prompt specifications
const coreProjects: FeaturedProject[] = [
  {
    id: "tow-service",
    title: "Tow Service Platform",
    tagline: "Emergency Roadside Assistance & Driver Dispatch System",
    category: "Product Design",
    platform: "Web & Mobile App",
    role: "Lead Product & UX Designer",
    description: "A dual-sided emergency roadside platform connecting stranded motorists with nearby tow operators in real time, streamlining live location tracking, upfront pricing, and service dispatch.",
    capabilities: ["User Flows", "Real-Time Tracking UX", "Service Blueprint", "Design System"],
    thinking: {
      problem: "Drivers in roadside breakdowns experience acute anxiety and cognitive overload when calculating costs or locating dispatchers.",
      decision: "Reduced the dispatch request flow from 8 steps to 3 taps, using GPS auto-pinning and transparent fixed fee tiers before confirmation.",
      rationale: "Minimizing inputs under stress reduced abandoned booking attempts by eliminating uncertainty during emergency situations.",
    },
    liveUrl: "https://www.behance.net/abdullahaljamil1",
    isFlagship: true,
  },
  {
    id: "mo-tivate",
    title: "mo-tivate",
    tagline: "Behavioral Momentum & Daily Habit Tracking App",
    category: "Mobile Product Design",
    platform: "iOS & Android",
    role: "Product Designer & UI Specialist",
    description: "A minimal habit system designed to counter tracking fatigue through micro-commitments, visual streaks, and contextual morning and evening reflection routines.",
    capabilities: ["Interaction Design", "Behavioral UX", "Micro-Animations", "Design Tokens"],
    thinking: {
      problem: "Traditional habit trackers overwhelm users with extensive data entry and punitive streak resets, causing drop-offs after 7 days.",
      decision: "Introduced flexible streak freezes and a frictionless 'single-gesture swipe' check-in from the system widget and lock screen.",
      rationale: "Lowering interaction friction sustained daily engagement without relying on artificial guilt-driven notifications.",
    },
    liveUrl: "https://www.behance.net/abdullahaljamil1",
  },
  {
    id: "hole-app",
    title: "Hole",
    tagline: "Focused Topic Circles & Community Discovery Platform",
    category: "Product Design & Front-End",
    platform: "Web Application",
    role: "Product Designer & Frontend Collaborator",
    description: "An intentional community space that replaces noisy algorithm feeds with curated, interest-driven discussion circles and high-signal text threads.",
    capabilities: ["Information Architecture", "Community UX", "Component Library", "React & CSS"],
    thinking: {
      problem: "Users struggled to find thoughtful discussions buried under infinite feeds and sensationalist ranking algorithms.",
      decision: "Organized discussions into slow-cadence 'circles' with structured tags and clear visual hierarchy for long-form answers.",
      rationale: "Fostered deeper reader engagement and clear comprehension by prioritizing thoughtful replies over viral reactions.",
    },
    liveUrl: "https://www.behance.net/abdullahaljamil1",
  },
  {
    id: "remote-jobs",
    title: "Remote Jobs Platform",
    tagline: "Transparent Job Discovery for Global Tech Talent",
    category: "Web Platform Design",
    platform: "Responsive Web App",
    role: "UX/UI Designer",
    description: "A search and application platform connecting emerging tech professionals with verified distributed teams, featuring clear salary disclosures, timezone overlays, and standardized skills matching.",
    capabilities: ["Filter & Search UX", "Data Density Balancing", "Design System", "Accessibility"],
    thinking: {
      problem: "Candidates waste hours deciphering ambiguous location requirements, missing salary ranges, and disjointed application links.",
      decision: "Implemented prominent timezone delta chips, salary transparency tags, and direct one-click hiring manager contact paths.",
      rationale: "Surfacing vital decision criteria upfront prevented unqualified submissions and saved candidates significant time.",
    },
    liveUrl: "https://www.behance.net/abdullahaljamil1",
  },
];

const ProjectCard = ({
  project,
  isFlagship = false,
}: {
  project: FeaturedProject;
  isFlagship?: boolean;
}) => {
  const [showThinking, setShowThinking] = useState(false);

  return (
    <motion.article
      initial={{ opacity: 0, y: 25 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
      className={`swiss-card overflow-hidden group flex flex-col justify-between ${
        isFlagship ? "lg:col-span-2 border-border/90 bg-card/90" : ""
      }`}
    >
      <div>
        {/* Visual Header / Mockup Banner */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] lg:aspect-[2.4/1] w-full overflow-hidden bg-secondary/80 border-b border-border/70 p-6 sm:p-10 flex flex-col justify-between">
          {/* Subtle Ambient Grid */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "24px 24px",
            }}
          />

          <div className="relative z-10 flex items-center justify-between gap-3">
            <span className="swiss-badge bg-card/80 backdrop-blur-sm">
              {project.category} • {project.platform}
            </span>

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-medium text-foreground bg-card/90 hover:bg-card px-3 py-1.5 rounded-full border border-border/80 shadow-sm transition-all duration-200 hover:border-accent"
                aria-label={`View live product or case study for ${project.title}`}
              >
                <span>Live Project</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-accent" />
              </a>
            )}
          </div>

          <div className="relative z-10 space-y-2 max-w-xl">
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-wider">
              {project.role}
            </span>
            <h3 className="font-display text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:text-accent transition-colors duration-200">
              {project.title}
            </h3>
            <p className="text-sm text-muted-foreground line-clamp-2">
              {project.tagline}
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {project.description}
          </p>

          {/* Capabilities Tags */}
          <div className="flex flex-wrap gap-2">
            {project.capabilities.map((cap) => (
              <span
                key={cap}
                className="text-xs font-mono px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground border border-border/60"
              >
                {cap}
              </span>
            ))}
          </div>

          {/* Product Thinking & UX Decisions Dropdown */}
          <div className="pt-4 border-t border-border/70">
            <button
              onClick={() => setShowThinking(!showThinking)}
              className="flex items-center justify-between w-full text-xs font-mono uppercase tracking-wider text-accent hover:text-accent/80 transition-colors py-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent rounded"
              aria-expanded={showThinking}
            >
              <span className="font-semibold flex items-center gap-2">
                <Sparkles className="w-3.5 h-3.5" />
                UX Decisions & Product Logic
              </span>
              {showThinking ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            <AnimatePresence>
              {showThinking && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden mt-4 pt-4 border-t border-border/50 text-xs sm:text-sm space-y-3 bg-secondary/30 p-4 rounded-xl"
                >
                  <div>
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground uppercase block mb-1">
                      Problem Context:
                    </span>
                    <p className="text-foreground/90 leading-relaxed">
                      {project.thinking.problem}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] font-semibold text-accent uppercase block mb-1">
                      Design Decision:
                    </span>
                    <p className="text-foreground/90 leading-relaxed font-medium">
                      {project.thinking.decision}
                    </p>
                  </div>

                  <div>
                    <span className="font-mono text-[11px] font-semibold text-muted-foreground uppercase block mb-1">
                      Rationale & Impact:
                    </span>
                    <p className="text-muted-foreground leading-relaxed">
                      {project.thinking.rationale}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export const SelectedWork = () => {
  // Check for dynamic projects added via Supabase CMS
  const { data: dbProjects = [] } = useQuery({
    queryKey: ["featured-db-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true })
        .limit(6);
      if (error) return [];
      return data || [];
    },
  });

  return (
    <section id="work" className="py-20 md:py-28 border-t border-border/80 relative">
      <div className="container-editorial space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border/70">
          <div className="space-y-3 max-w-xl">
            <span className="section-eyebrow">
              Selected Work • 01
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Products engineered for clarity & usability.
            </h2>
          </div>

          <p className="editorial-lead max-w-md text-sm sm:text-base">
            Every case study represents authentic UX problem-solving: understanding user friction, structuring product logic, and creating dev-ready interfaces.
          </p>
        </div>

        {/* Selected Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {coreProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              isFlagship={project.isFlagship}
            />
          ))}
        </div>

        {/* Footer Link to All Projects */}
        <div className="pt-6 flex justify-center">
          <a
            href="/projects"
            className="btn-editorial-outline inline-flex items-center gap-2"
          >
            <span>Explore All Projects & Archives</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default SelectedWork;
