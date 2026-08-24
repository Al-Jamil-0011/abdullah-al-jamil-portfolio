import React from "react";
import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, FileText, Mail, Github } from "lucide-react";
import { useSiteContent } from "@/hooks/use-site-content";
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
      {/* Cover Image */}
      <div className="relative h-32 md:h-40 overflow-hidden">
        <motion.img
          src={profileBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          initial={{ scale: 1.1, filter: "blur(2px)" }}
          animate={{
            scale: isHovered ? 1.15 : 1.1,
            filter: isHovered ? "blur(1px)" : "blur(2px)",
            y: isHovered ? -5 : 0
          }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        <motion.div className="absolute inset-0 bg-black/40" animate={{ opacity: isHovered ? 0.3 : 0.4 }} transition={{ duration: 0.4 }} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
        <motion.div
          className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')]"
          animate={{ opacity: isHovered ? 0.5 : 0.3 }}
          transition={{ duration: 0.4 }}
        />
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* Avatar */}
      <div className="relative -mt-14 md:-mt-16 flex-row flex items-start justify-center">
        <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, duration: 0.4 }} className="relative">
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-card shadow-xl">
            <img src={abdullahPortrait} alt={name} className="w-full h-full object-cover" />
          </div>
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-card" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6 text-center flex-1 flex flex-col py-[23px]">
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.4 }}>
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">{name}</h2>
          <p className="text-primary font-medium mb-4 text-base">{title}</p>
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
                className="social-icon-btn p-2.5 rounded-xl bg-secondary/50 text-muted-foreground transition-all duration-300"
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
            className="social-icon-btn p-2.5 rounded-xl bg-secondary/50 text-muted-foreground transition-all duration-300"
            aria-label="GitHub"
          >
            <Github className="w-4 h-4" />
          </a>
        </motion.div>

        <div className="flex-1" />

        {/* Action Buttons */}
        <motion.div initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.4 }} className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50">
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="btn-gradient-animated flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium">
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>
          <button onClick={onContactClick} className="btn-gradient-primary flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium">
            <Mail className="w-4 h-4" />
            <span>Contact</span>
          </button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfileCard;
