import { motion } from "framer-motion";
import { Heart } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="py-6 px-4 border-t border-border/30 mt-8"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
        <p>
          © {currentYear} Abdullah Al Jamil. All rights reserved.
        </p>
        <p className="flex items-center gap-1">
          Crafted with <Heart className="w-4 h-4 text-primary fill-primary" aria-hidden="true" /> in Dhaka, Bangladesh
        </p>
      </div>
    </motion.footer>
  );
};

export default Footer;
