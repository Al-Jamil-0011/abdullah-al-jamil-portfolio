import { motion } from "framer-motion";
import { Search, Compass, GitMerge, Layout, CheckCircle, Rocket } from "lucide-react";

const processStages = [
  {
    step: "01",
    name: "Understand",
    icon: Search,
    headline: "Problem Framing & Context",
    description: "Clarify core user pain points, business requirements, technical boundaries, and product metrics before jumping to visuals.",
    deliverables: ["Problem Definition", "Stakeholder Alignment", "Constraint Mapping"],
  },
  {
    step: "02",
    name: "Explore",
    icon: Compass,
    headline: "Discovery & Alternatives",
    description: "Audit competitor patterns, review existing feedback, and sketch divergent approaches to locate the most intuitive path.",
    deliverables: ["Pattern Analysis", "Rapid Sketches", "Opportunity Assessment"],
  },
  {
    step: "03",
    name: "Define",
    icon: GitMerge,
    headline: "Information & Journeys",
    description: "Synthesize insights into robust information architecture, frictionless task journeys, and unambiguous user logic.",
    deliverables: ["User Flows", "Information Architecture", "Edge-Case Matrix"],
  },
  {
    step: "04",
    name: "Design",
    icon: Layout,
    headline: "Systems & Interface",
    description: "Craft high-fidelity layouts, micro-interactions, responsive states, and scalable design tokens inside Figma.",
    deliverables: ["High-Fidelity Screens", "Interactive Prototypes", "Design Token Library"],
  },
  {
    step: "05",
    name: "Validate",
    icon: CheckCircle,
    headline: "Usability & Refinement",
    description: "Review flows with team members and end users, test key task completions, and iterate on usability friction points.",
    deliverables: ["Task Walkthroughs", "Heuristic Reviews", "Iterative Polish"],
  },
  {
    step: "06",
    name: "Ship",
    icon: Rocket,
    headline: "Engineering Collaboration",
    description: "Deliver pixel-precise component specifications, token handoffs, and collaborate with engineers to ensure design integrity.",
    deliverables: ["Dev-Ready Specs", "Component Documentation", "QA Implementation Reviews"],
  },
];

export const HowIWork = () => {
  return (
    <section id="process" className="py-20 md:py-28 border-t border-border/80 bg-card/25">
      <div className="container-editorial space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border/70">
          <div className="space-y-3 max-w-xl">
            <span className="section-eyebrow">
              Design Process • 02
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              How I approach product design.
            </h2>
          </div>

          <p className="editorial-lead max-w-md text-sm sm:text-base">
            A structured yet adaptive framework that balances user needs, technical feasibility, and business goals from concept to release.
          </p>
        </div>

        {/* 6-Stage Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {processStages.map((stage, idx) => {
            const Icon = stage.icon;
            return (
              <motion.div
                key={stage.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="swiss-card p-6 sm:p-7 flex flex-col justify-between group hover:border-accent/40"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-accent">
                      {stage.step}
                    </span>
                    <div className="p-2 rounded-xl bg-secondary/80 text-muted-foreground group-hover:text-accent transition-colors">
                      <Icon className="w-4 h-4" />
                    </div>
                  </div>

                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground tracking-tight">
                      {stage.name}
                    </h3>
                    <p className="text-xs font-mono text-muted-foreground uppercase tracking-wider mt-0.5">
                      {stage.headline}
                    </p>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {stage.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-border/60">
                  <div className="flex flex-wrap gap-1.5">
                    {stage.deliverables.map((item) => (
                      <span
                        key={item}
                        className="text-[11px] font-mono px-2 py-0.5 rounded bg-secondary/60 text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowIWork;
