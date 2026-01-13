import { motion } from "framer-motion";
import { MapPin, Calendar, ExternalLink } from "lucide-react";

const experiences = [
  {
    title: "Senior Product Designer",
    company: "TechVentures",
    location: "Remote",
    period: "2024 - Present",
    description: "Leading product design initiatives, creating design systems, and mentoring junior designers. Focused on improving user engagement metrics by 40%.",
    color: "bg-primary",
  },
  {
    title: "UX/UI Designer",
    company: "StartupX",
    location: "Dhaka, Bangladesh",
    period: "2023 - 2024",
    description: "Designed intuitive interfaces for mobile and web applications. Conducted user research and usability testing to inform design decisions.",
    color: "bg-primary/70",
  },
  {
    title: "Frontend Developer",
    company: "DigitalFlow",
    location: "Dhaka, Bangladesh",
    period: "2022 - 2023",
    description: "Built responsive web applications using React and TypeScript. Collaborated with designers to implement pixel-perfect UI components.",
    color: "bg-primary/50",
  },
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Dhaka",
    period: "2019 - 2023",
    description: "Focused on software engineering, human-computer interaction, and web technologies.",
  },
];

const certifications = [
  { name: "Google UX Design Certificate", issuer: "Google", year: "2023" },
  { name: "Meta Front-End Developer", issuer: "Meta", year: "2023" },
  { name: "AWS Cloud Practitioner", issuer: "Amazon", year: "2024" },
];

const ResumeContent = () => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Experience */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          My <span className="text-primary">Experience</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="timeline-item"
            >
              <div className="timeline-dot" />
              <div className="pb-2">
                <h4 className="text-lg font-semibold text-foreground">{exp.title}</h4>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-2">
                  <span className="text-primary font-medium">{exp.company}</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3" />
                    {exp.location}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {exp.period}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">{exp.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Education */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          <span className="text-primary">Education</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        {education.map((edu, index) => (
          <motion.div
            key={edu.degree}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="p-4 rounded-xl bg-secondary/30"
          >
            <h4 className="text-foreground font-medium">{edu.degree}</h4>
            <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1 mb-2">
              <span className="text-primary">{edu.institution}</span>
              <span>{edu.period}</span>
            </div>
            <p className="text-sm text-muted-foreground">{edu.description}</p>
          </motion.div>
        ))}
      </div>

      {/* Certifications */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          <span className="text-primary">Certifications</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="grid md:grid-cols-3 gap-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.name}
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.4 + index * 0.05 }}
              className="p-4 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-xs text-muted-foreground mt-1">
                    {cert.issuer} • {cert.year}
                  </p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeContent;
