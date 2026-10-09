import { motion } from "framer-motion";
import { LayoutGrid, Layers, Users, Code2, Check, ArrowRight } from "lucide-react";

const capabilityGroups = [
  {
    title: "Product Design & UX Strategy",
    icon: LayoutGrid,
    description: "Architecting end-to-end digital experiences from initial problem framing to scalable product architecture.",
    skills: [
      "User Flows & Task Mapping",
      "Information Architecture",
      "Interactive Wireframing",
      "High-Fidelity Prototyping",
      "Feature Prioritization",
      "Edge-Case Identification",
    ],
  },
  {
    title: "UI Systems & Interaction Design",
    icon: Layers,
    description: "Designing coherent visual languages, rigorous token structures, and accessible component libraries.",
    skills: [
      "Design Systems & Token Architecture",
      "WCAG 2.1 AA Accessibility",
      "Micro-Interactions & States",
      "Responsive Layout Grids",
      "Typography & Hierarchy",
      "Design System Governance",
    ],
  },
  {
    title: "UX Research & Validation",
    icon: Users,
    description: "Translating qualitative and quantitative user observations into actionable product design decisions.",
    skills: [
      "User Journey Mapping",
      "Competitor Heuristic Audits",
      "Usability Testing Sessions",
      "Pain Point Synthesis",
      "Cognitive Load Reduction",
      "Continuous Feedback Loops",
    ],
  },
  {
    title: "Engineering Collaboration",
    icon: Code2,
    description: "Bridging the gap between design vision and technical execution through a computer science foundation.",
    skills: [
      "Developer-Ready Figma Specs",
      "React & Component Architecture",
      "TypeScript & Tailwind CSS",
      "DOM & CSS Layout Feasibility",
      "API & State Data Mental Model",
      "Design QA & Production Audits",
    ],
  },
];

const designPrinciples = [
  {
    label: "Progressive Disclosure",
    detail: "Show only essential primary actions first; reveal secondary depth on demand to prevent cognitive fatigue.",
  },
  {
    label: "3-Tap Rule for Core Tasks",
    detail: "Frequent user goals should be achievable in 3 intuitive steps or fewer, eliminating redundant intermediate screens.",
  },
  {
    label: "System Consistency",
    detail: "Every interface element inherits consistent token-level spacing, typography, and motion to build effortless user intuition.",
  },
  {
    label: "Dev-Design Alignment",
    detail: "Figma structures mirror production code components, eliminating translation loss during engineering sprints.",
  },
];

export const UXCapabilities = () => {
  return (
    <section id="capabilities" className="py-20 md:py-28 border-t border-border/80">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border/70">
          <div className="space-y-3 max-w-xl">
            <span className="section-eyebrow">
              Core Capabilities • 03
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Skills grounded in product reality.
            </h2>
          </div>

          <p className="editorial-lead max-w-md text-sm sm:text-base">
            No arbitrary percentages or inflated numbers. Verified capabilities shaped by genuine product work and computer science training.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilityGroups.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="swiss-card p-7 sm:p-8 space-y-6"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-secondary text-accent">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-xl font-bold text-foreground">
                      {group.title}
                    </h3>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {group.description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-4 border-t border-border/60">
                  {group.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 text-xs sm:text-sm text-foreground/90"
                    >
                      <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                      <span>{skill}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Product Thinking Principles Highlight Strip */}
        <div className="rounded-3xl border border-border/80 bg-card/60 p-8 sm:p-10 space-y-6">
          <div className="space-y-1">
            <span className="text-xs font-mono uppercase tracking-wider text-accent font-semibold">
              Product Principles
            </span>
            <h3 className="font-display text-2xl font-bold text-foreground">
              How I make everyday design decisions
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-4 border-t border-border/60">
            {designPrinciples.map((principle) => (
              <div key={principle.label} className="space-y-2">
                <p className="font-mono text-xs font-semibold text-foreground uppercase tracking-wide">
                  {principle.label}
                </p>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {principle.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default UXCapabilities;
