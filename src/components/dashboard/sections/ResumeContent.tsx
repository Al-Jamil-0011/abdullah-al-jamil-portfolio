import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Calendar, Award, GraduationCap, Briefcase, Trophy } from "lucide-react";

const experiences = [
  {
    title: "Sr. UX/UI Designer",
    company: "BDCalling IT Ltd.",
    location: "Dhaka, Bangladesh",
    period: "Present",
    description: "Leading design initiatives for enterprise-level applications. Creating comprehensive design systems and conducting user research to improve product experiences.",
    color: "bg-primary",
  },
  {
    title: "UX/UI Designer Intern",
    company: "CPSD Technology IT",
    location: "Dhaka, Bangladesh",
    period: "2023 - 2024",
    description: "Designed intuitive interfaces for mobile and web applications. Collaborated with development teams to implement pixel-perfect UI components.",
    color: "bg-primary/70",
  },
  {
    title: "Python Django Intern",
    company: "EDGE Project (BCC, ICT Division)",
    location: "Dhaka, Bangladesh",
    period: "2023",
    description: "Developed web applications using Python Django framework. Gained hands-on experience in full-stack development and database management.",
    color: "bg-primary/50",
  },
];

const education = [
  {
    degree: "B.Sc. in Computer Science & Engineering",
    institution: "Green University of Bangladesh",
    period: "2020 - 2024",
    gpa: "2.88",
    description: "Focused on software engineering, human-computer interaction, and modern web technologies.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Gaffargaon Govt. College",
    period: "2017 - 2019",
    gpa: "5.00/5.00",
    description: "Science group with focus on Physics, Chemistry, and Mathematics.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Rostom Ali Golundaz School",
    period: "2015 - 2017",
    gpa: "5.00/5.00",
    description: "Science group with excellent academic performance.",
  },
];

const certificates = [
  { name: "Coming Soon", issuer: "Certificate placeholder", year: "2024", status: "upcoming" },
  { name: "Coming Soon", issuer: "Certificate placeholder", year: "2024", status: "upcoming" },
  { name: "Coming Soon", issuer: "Certificate placeholder", year: "2024", status: "upcoming" },
];

const achievements = [
  { title: "30+ Projects Completed", description: "Successfully delivered various design and development projects" },
  { title: "10+ Live Projects", description: "Currently maintaining and supporting live applications" },
  { title: "22+ Happy Clients", description: "Building lasting relationships through quality work" },
];

const ResumeContent = () => {
  const expRef = useRef(null);
  const eduRef = useRef(null);
  const certRef = useRef(null);
  const achieveRef = useRef(null);
  
  const expInView = useInView(expRef, { once: true, margin: "-50px" });
  const eduInView = useInView(eduRef, { once: true, margin: "-50px" });
  const certInView = useInView(certRef, { once: true, margin: "-50px" });
  const achieveInView = useInView(achieveRef, { once: true, margin: "-50px" });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Experience */}
      <div ref={expRef} className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Briefcase className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            My <span className="text-primary">Experience</span>
          </h3>
        </div>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="space-y-0">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ x: -20, opacity: 0 }}
              animate={expInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.15 }}
              className="timeline-item group"
            >
              <div className="timeline-dot" />
              <div className="pb-2 p-4 rounded-xl transition-all duration-300 hover:bg-secondary/30 hover:shadow-lg hover:shadow-primary/5 -ml-2">
                <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">{exp.title}</h4>
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
      <div ref={eduRef} className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <GraduationCap className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            <span className="text-primary">Education</span>
          </h3>
        </div>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="space-y-4">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ x: -20, opacity: 0 }}
              animate={eduInView ? { x: 0, opacity: 1 } : { x: -20, opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="p-4 rounded-xl bg-secondary/30 transition-all duration-300 hover:bg-secondary/50 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-0.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <h4 className="text-foreground font-medium">{edu.degree}</h4>
                  <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mt-1 mb-2">
                    <span className="text-primary">{edu.institution}</span>
                    <span>{edu.period}</span>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-semibold whitespace-nowrap">
                  GPA: {edu.gpa}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{edu.description}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Certificates */}
      <div ref={certRef} className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Award className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            <span className="text-primary">Certificates</span>
          </h3>
        </div>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="grid md:grid-cols-3 gap-3">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ y: 10, opacity: 0 }}
              animate={certInView ? { y: 0, opacity: 1 } : { y: 10, opacity: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="p-4 rounded-xl bg-secondary/30 border-2 border-dashed border-border/50 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/50"
            >
              <div className="text-center">
                <Award className="w-8 h-8 text-muted-foreground/50 mx-auto mb-2" />
                <h4 className="text-sm font-medium text-muted-foreground">
                  {cert.name}
                </h4>
                <p className="text-xs text-muted-foreground/70 mt-1">
                  Upload ready
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div ref={achieveRef} className="glass-card p-6 md:p-8">
        <div className="flex items-center gap-3 mb-2">
          <Trophy className="w-5 h-5 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">
            <span className="text-primary">Achievements</span>
          </h3>
        </div>
        <div className="w-12 h-1 bg-primary rounded-full mb-6" />

        <div className="grid md:grid-cols-3 gap-4">
          {achievements.map((achieve, index) => (
            <motion.div
              key={achieve.title}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={achieveInView ? { scale: 1, opacity: 1 } : { scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="achievement-card p-5 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20 transition-all duration-300 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
            >
              <h4 className="text-lg font-bold text-primary mb-2">{achieve.title}</h4>
              <p className="text-sm text-muted-foreground">{achieve.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ResumeContent;
