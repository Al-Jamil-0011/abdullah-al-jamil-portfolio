import { motion } from "framer-motion";
import { Github, Linkedin, Twitter, Dribbble } from "lucide-react";

const socialLinks = [
  { icon: Dribbble, href: "#", label: "Dribbble" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Twitter, href: "#", label: "Twitter" },
];

const Footer = () => {
  return (
    <footer className="py-12 border-t border-border">
      <div className="container-wide">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a href="#" className="text-display text-2xl font-semibold text-foreground">
            Abdullah<span className="text-accent">.</span>
          </a>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground order-3 md:order-2">
            © {new Date().getFullYear()} Abdullah Al Jamil. Crafted with care.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4 order-2 md:order-3">
            {socialLinks.map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                whileHover={{ y: -2 }}
                className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
