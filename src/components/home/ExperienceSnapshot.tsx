import { motion } from "framer-motion";
import { Briefcase, ArrowUpRight, GraduationCap, MapPin, Calendar, FileText } from "lucide-react";
import { Link } from "react-router-dom";

const experiences = [
  {
    role: "Sr. UX/UI Designer",
    organization: "BDCalling IT Ltd.",
    location: "Dhaka, Bangladesh",
    period: "2024 — Present",
    current: true,
    focus: "Enterprise Product Design & Design Systems",
    contributions: [
      "Lead UX architecture and interface design for multi-tenant enterprise platforms.",
      "Established scalable Figma component libraries and token architectures used across 3 developer pods.",
      "Conduct heuristic reviews and user journey mapping to simplify dense operational workflows.",
    ],
  },
  {
    role: "UX/UI Designer Intern",
    organization: "CPSD Technology IT",
    location: "Dhaka, Bangladesh",
    period: "2023 — 2024",
    current: false,
    focus: "Web & Mobile Interfaces",
    contributions: [
      "Crafted responsive UI screens, interactive prototypes, and iconography for client applications.",
      "Collaborated closely with frontend engineers to review visual parity and micro-interactions.",
    ],
  },
  {
    role: "Software Engineering Intern",
    organization: "EDGE Project (BCC, ICT Division)",
    location: "Dhaka, Bangladesh",
    period: "2023",
    current: false,
    focus: "Full-Stack Development & Python Django",
    contributions: [
      "Developed server-side web features and database structures using Python & Django.",
      "Gained deep empathy for backend data constraints, API design, and engineering workflows.",
    ],
  },
];

export const ExperienceSnapshot = () => {
  return (
    <section className="py-20 md:py-28 border-t border-border/80 bg-card/25">
      <div className="container-editorial space-y-14">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-border/70">
          <div className="space-y-3 max-w-xl">
            <span className="section-eyebrow">
              Experience • 04
            </span>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
              Verified professional journey.
            </h2>
          </div>

          <div className="flex items-center gap-3">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-editorial-outline text-xs !py-2.5 !px-5"
            >
              <FileText className="w-3.5 h-3.5" />
              Download Resume (PDF)
            </a>

            <Link
              to="/resume"
              className="btn-editorial-primary text-xs !py-2.5 !px-5"
            >
              Full CV View
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

        {/* Timeline Grid */}
        <div className="space-y-6">
          {experiences.map((item, idx) => (
            <motion.div
              key={item.organization}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
              className="swiss-card p-6 sm:p-8"
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 pb-6 border-b border-border/60">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground">
                      {item.role}
                    </h3>
                    {item.current && (
                      <span className="swiss-badge text-[10px] text-emerald-400 bg-emerald-500/10 border-emerald-500/20">
                        Current Role
                      </span>
                    )}
                  </div>
                  <p className="text-sm font-medium text-foreground/80">
                    {item.organization} • <span className="text-muted-foreground">{item.focus}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-mono text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-accent" />
                    {item.period}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-accent" />
                    {item.location}
                  </span>
                </div>
              </div>

              {/* Bullet contributions */}
              <ul className="pt-6 space-y-2.5 text-sm text-muted-foreground">
                {item.contributions.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 mt-2 shrink-0" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Education Highlight Bar */}
        <div className="p-6 sm:p-7 rounded-2xl border border-border/80 bg-card/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-2xl bg-secondary text-accent shrink-0">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div>
              <p className="font-display text-base font-bold text-foreground">
                B.Sc. in Computer Science & Engineering
              </p>
              <p className="text-xs text-muted-foreground">
                Green University of Bangladesh • 2020 — 2024 (GPA 2.88 / 4.00)
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-muted-foreground sm:text-right">
            Human-Computer Interaction & Software Architecture
          </span>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSnapshot;
