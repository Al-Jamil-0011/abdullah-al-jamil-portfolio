import { motion } from "framer-motion";
import { User, FileText, FolderKanban, BookOpen, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import MobileMoreMenu from "./MobileMoreMenu";

interface MobileBottomNavProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "about", label: "About", icon: User, href: "/about" },
  { id: "resume", label: "Resume", icon: FileText, href: "/resume" },
  { id: "projects", label: "Projects", icon: FolderKanban, href: "/projects" },
  { id: "blogs", label: "Blogs", icon: BookOpen, href: "/blogs" },
];

const MobileBottomNav = ({ activeSection, onSectionChange }: MobileBottomNavProps) => {
  const [isMoreMenuOpen, setIsMoreMenuOpen] = useState(false);

  // Check if the active section is one of the "more" menu items
  const isMoreActive = ["services", "testimonials", "contact"].includes(activeSection);

  return (
    <>
      <motion.nav
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="mobile-bottom-nav md:hidden"
        role="navigation"
        aria-label="Mobile navigation"
      >
        <ul className="flex items-center justify-around px-2 py-3 safe-area-bottom list-none" role="menubar">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id} role="none">
                <Link
                  to={item.href}
                  onClick={() => onSectionChange(item.id)}
                  className={`mobile-nav-item flex-1 max-w-[72px] ${isActive ? "active" : ""}`}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  aria-label={`Navigate to ${item.label}`}
                >
                  <motion.div
                    animate={isActive ? { scale: 1.1 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <item.icon 
                      className={`w-5 h-5 ${isActive ? "text-primary" : "text-muted-foreground"}`} 
                      aria-hidden="true"
                    />
                  </motion.div>
                  <span className={`text-[10px] font-medium ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                </Link>
              </li>
            );
          })}
          
          {/* More Button */}
          <li role="none">
            <button
              onClick={() => setIsMoreMenuOpen(true)}
              className={`mobile-nav-item flex-1 max-w-[72px] ${isMoreActive ? "active" : ""}`}
              role="menuitem"
              aria-haspopup="true"
              aria-expanded={isMoreMenuOpen}
              aria-label="Open more navigation options"
            >
              <motion.div
                animate={isMoreActive ? { scale: 1.1 } : { scale: 1 }}
                transition={{ duration: 0.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <MoreHorizontal 
                  className={`w-5 h-5 ${isMoreActive ? "text-primary" : "text-muted-foreground"}`} 
                  aria-hidden="true"
                />
              </motion.div>
              <span className={`text-[10px] font-medium ${isMoreActive ? "text-primary" : "text-muted-foreground"}`}>
                More
              </span>
              {isMoreActive && (
                <motion.div
                  layoutId="activeIndicator"
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  aria-hidden="true"
                />
              )}
            </button>
          </li>
        </ul>
      </motion.nav>

      {/* More Menu Overlay */}
      <MobileMoreMenu
        isOpen={isMoreMenuOpen}
        onClose={() => setIsMoreMenuOpen(false)}
        onSectionChange={onSectionChange}
        activeSection={activeSection}
      />
    </>
  );
};

export default MobileBottomNav;
