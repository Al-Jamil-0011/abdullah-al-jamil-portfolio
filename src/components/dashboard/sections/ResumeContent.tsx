import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/use-site-content";
import { MapPin, Calendar, Award, GraduationCap, Briefcase, Trophy, ExternalLink } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

const ResumeContent = () => {
  const expRef = useRef(null);
  const eduRef = useRef(null);
  const certRef = useRef(null);
  const achieveRef = useRef(null);
  
  const expInView = useInView(expRef, { once: true, margin: "-50px" });
  const eduInView = useInView(eduRef, { once: true, margin: "-50px" });
  const certInView = useInView(certRef, { once: true, margin: "-50px" });
  const achieveInView = useInView(achieveRef, { once: true, margin: "-50px" });

  const { data: resumeData, isLoading: loadingResume } = useSiteContent("resume");

  const { data: certificates = [] } = useQuery({
    queryKey: ["certificates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const experiences = resumeData?.experiences || [];
  const education = resumeData?.education || [];
  const achievements = resumeData?.achievements || [];

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

        {loadingResume ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="p-4 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-64" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-0">
            {experiences.map((exp: any, index: number) => (
              <motion.div
                key={index}
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
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" />{exp.location}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{exp.period}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{exp.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
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

        {loadingResume ? (
          <div className="space-y-4">
            {[1, 2].map(i => (
              <div key={i} className="p-4 rounded-xl bg-secondary/30 space-y-2">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {education.map((edu: any, index: number) => (
              <motion.div
                key={index}
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
                  {edu.gpa && (
                    <span className="px-3 py-1 rounded-lg bg-primary/20 text-primary text-sm font-semibold whitespace-nowrap">
                      GPA: {edu.gpa}
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{edu.description}</p>
              </motion.div>
            ))}
          </div>
        )}
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

        {certificates.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-8">No certificates added yet.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {certificates.map((cert, index) => (
              <motion.div
                key={cert.id}
                initial={{ y: 15, opacity: 0 }}
                animate={certInView ? { y: 0, opacity: 1 } : { y: 15, opacity: 0 }}
                transition={{ duration: 0.4, delay: index * 0.12 }}
                className="group rounded-xl bg-secondary/30 border border-border/50 overflow-hidden transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                {cert.image_url ? (
                  <img src={cert.image_url} alt={cert.title} className="w-full h-36 object-cover" loading="lazy" />
                ) : (
                  <div className="w-full h-36 bg-secondary/50 flex items-center justify-center">
                    <Award className="w-10 h-10 text-muted-foreground/30" />
                  </div>
                )}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-sm font-semibold text-foreground">{cert.title}</h4>
                      {cert.organization && (
                        <p className="text-xs text-primary mt-0.5">{cert.organization}</p>
                      )}
                    </div>
                    {cert.credential_link && (
                      <a href={cert.credential_link} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors flex-shrink-0">
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                  {cert.issue_date && (
                    <p className="text-xs text-muted-foreground/70 mt-2">{cert.issue_date}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
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

        {loadingResume ? (
          <div className="grid md:grid-cols-3 gap-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="p-5 rounded-xl bg-primary/5 space-y-2">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-4 w-full" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-4">
            {achievements.map((achieve: any, index: number) => (
              <motion.div
                key={index}
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
        )}
      </div>
    </motion.div>
  );
};

export default ResumeContent;
