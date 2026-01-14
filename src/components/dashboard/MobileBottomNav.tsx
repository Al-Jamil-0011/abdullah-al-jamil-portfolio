import { motion } from "framer-motion";
import { User, FileText, Briefcase, BookOpen, Mail } from "lucide-react";

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

interface MobileBottomNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const MobileBottomNav = ({ activeSection, onSectionChange }: MobileBottomNavProps) => {
  return (
    <motion.nav
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4, delay: 0.2 }}
      className="mobile-bottom-nav md:hidden"
    >
      <div className="flex items-center justify-around px-2 py-3 safe-area-bottom">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <motion.button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`mobile-nav-item flex-1 max-w-[72px] ${isActive ? "active" : ""}`}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                <item.icon className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} />
              </motion.div>
              <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                {item.label}
              </span>
              {isActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.nav>
  );
};

export default MobileBottomNav;
