import { motion } from "framer-motion";
import { Linkedin, Facebook, Instagram, FileText, Mail } from "lucide-react";
import abdullahPortrait from "@/assets/abdullah-portrait.png";

// Behance icon component
const BehanceIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
  </svg>
);

const socialLinks = [
  { icon: BehanceIcon, href: "https://www.behance.net/abdullahaljamil1", label: "Behance" },
  { icon: Instagram, href: "https://www.instagram.com/al.jamil.9022?igsh=MWViYXdhNGQ3NGMzdg==", label: "Instagram" },
  { icon: Facebook, href: "https://www.facebook.com/share/1AAiyinQkK/", label: "Facebook" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/al-jamil-b817442a2/", label: "LinkedIn" },
];

interface ProfileCardProps {
  onContactClick: () => void;
}

const ProfileCard = ({ onContactClick }: ProfileCardProps) => {
  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="glass-card overflow-hidden h-full flex flex-col"
    >
      {/* Cover Image */}
      <div className="relative h-32 md:h-40 bg-gradient-to-br from-secondary via-secondary to-muted overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAwIDEwIEwgNDAgMTAgTSAxMCAwIEwgMTAgNDAgTSAwIDIwIEwgNDAgMjAgTSAyMCAwIEwgMjAgNDAgTSAwIDMwIEwgNDAgMzAgTSAzMCAwIEwgMzAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
      </div>

      {/* Avatar */}
      <div className="relative -mt-14 md:-mt-16 flex justify-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="relative"
        >
          <div className="w-24 h-24 md:w-28 md:h-28 rounded-2xl overflow-hidden border-4 border-card shadow-xl">
            <img
              src={abdullahPortrait}
              alt="Abdullah Al Jamil"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-3 border-card" />
        </motion.div>
      </div>

      {/* Info */}
      <div className="p-5 md:p-6 text-center flex-1 flex flex-col">
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <h2 className="text-xl md:text-2xl font-bold text-foreground mb-1">
            Abdullah Al Jamil
          </h2>
          <p className="text-sm text-primary font-medium mb-4">
            Product Designer • UX/UI Designer • Developer
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex justify-center gap-2 mb-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn p-2.5 rounded-xl bg-secondary/50 text-muted-foreground transition-all duration-300"
              aria-label={social.label}
            >
              <social.icon className="w-4 h-4" />
            </a>
          ))}
        </motion.div>

        {/* Spacer */}
        <div className="flex-1" />

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="grid grid-cols-2 gap-3 pt-4 border-t border-border/50"
        >
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gradient-animated flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>
          <button
            onClick={onContactClick}
            className="btn-gradient-primary flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium"
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
