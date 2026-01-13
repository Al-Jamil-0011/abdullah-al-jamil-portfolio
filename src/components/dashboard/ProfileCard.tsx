import { motion } from "framer-motion";
import { Github, Linkedin, Facebook, Instagram, FileText, Mail } from "lucide-react";
import abdullahPortrait from "@/assets/abdullah-portrait.png";

const socialLinks = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Facebook, href: "#", label: "Facebook" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
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
              className="p-2.5 rounded-xl bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-200"
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
            href="#"
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200 text-sm font-medium"
          >
            <FileText className="w-4 h-4" />
            <span>Resume</span>
          </a>
          <button
            onClick={onContactClick}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-primary text-primary-foreground hover:brightness-110 transition-all duration-200 text-sm font-medium"
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
