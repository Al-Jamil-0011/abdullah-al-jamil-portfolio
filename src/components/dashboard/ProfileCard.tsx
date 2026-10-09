import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, FileText, Mail, Github } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
import { supabase } from "@/integrations/supabase/client";
import abdullahPortrait from "@/assets/abdullah-portrait.png";
import profileBg from "@/assets/profile-bg.jpg";

// Behance icon component
const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z" />
  </svg>
);

const platformIconMap: Record<string, React.ElementType> = {
  Behance: BehanceIcon,
  Instagram,
  Facebook,
  LinkedIn: Linkedin,
  GitHub: Github,
};

interface ProfileCardProps {
  onContactClick: () => void;
}

const ProfileCard = ({ onContactClick }: ProfileCardProps) => {
  const [isHovered, setIsHovered] = React.useState(false);
  const { data: profileData } = useSiteContent("profile");
  const { data: resumeData } = useSiteContent("resume");
  const [resumeUrl, setResumeUrl] = React.useState("/resume.pdf");

  React.useEffect(() => {
    const path = (resumeData as any)?.resume_path;
    if (!path) return;
    let active = true;
    supabase.storage
      .from("resume")
      .createSignedUrl(path, 60 * 60 * 24 * 7)
      .then(({ data }) => {
        if (active && data?.signedUrl) setResumeUrl(data.signedUrl);
      });
    return () => { active = false; };
  }, [resumeData]);

  const name = profileData?.name || "Abdullah Al Jamil";
  const title = profileData?.title || "Product Designer • UX/UI Designer • Developer";
  const socialLinks = profileData?.social_links || [];

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden h-full flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Cover Banner - Smooth & Consistent in Light & Dark */}
      <div className="relative h-32 md:h-40 overflow-hidden bg-gradient-to-br from-slate-100 via-teal-50/40 to-slate-200/60 dark:from-slate-900/90 dark:via-slate-800/80 dark:to-slate-950">
        <motion.img
          src={profileBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover opacity-20 dark:opacity-50 mix-blend-overlay dark:mix-blend-normal"
          initial={{ scale: 1.05 }}
          animate={{
            scale: isHovered ? 1.1 : 1.05,
            y: isHovered ? -3 : 0,
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] opacity-[0.04] dark:opacity-[0.08] [background-size:16px_16px]" />
        
        {/* Smooth transition fade to card background */}
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/60 to-transparent" />
        
        {/* Ambient top light */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/5" />
      </div>

      {/* Avatar */}
      <div className="relative -mt-14 md:-mt-16 flex-row flex items-start justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-card shadow-lg bg-card">
            <img src={abdullahPortrait} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-card shadow-sm ring-2 ring-emerald-500/20" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6 text-center flex-1 flex flex-col py-[23px]">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1 tracking-tight">{name}</h2>
          <p className="text-primary font-medium mb-4 text-sm sm:text-base">{title}</p>
        </motion.div>

        {/* Social Links */}
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4, duration: 0.4 }} className="flex justify-center gap-2 mb-6">
          {socialLinks.map((social: any) => {
            const IconComponent = platformIconMap[social.platform] || Linkedin;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50 transition-all duration-200"
                aria-label={social.platform}
              >
                <IconComponent className="w-4 h-4" />
              </a>
            );
          })}
          <a
            href="https://github.com/Al-Jamil-0011"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2.5 rounded-xl bg-secondary/60 text-muted-foreground hover:text-foreground hover:bg-secondary border border-border/50 transition-all duration-200"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="flex-1" />

        {/* Action Buttons - Cohesive & Premium */}
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} className="grid grid-cols-2 gap-3 pt-4 border-t border-border/60">
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium border border-border/80 bg-secondary/70 hover:bg-secondary text-foreground transition-all duration-200 shadow-sm active:scale-95"
          >
            <FileText className="w-4 h-4 text-muted-foreground" />
            <span>Resume</span>
          </a>
          <button
            onClick={onContactClick}
            className="flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-medium bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-sm active:scale-95"
          >
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
