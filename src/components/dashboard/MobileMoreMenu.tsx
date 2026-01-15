import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Briefcase, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

interface MobileMoreMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onSectionChange: (section: string) => void;
  activeSection: string;
}

const menuItems = [
  {
    id: "services",
    label: "My Services",
    icon: Briefcase,
    href: "/services",
  },
  {
    id: "testimonials",
    label: "Testimonials",
    icon: MessageSquare,
    href: "/testimonials",
  },
  {
    id: "contact",
    label: "Contact",
    icon: Mail,
    href: "/contact",
  },
];

const MobileMoreMenu = ({ isOpen, onClose, onSectionChange, activeSection }: MobileMoreMenuProps) => {
  const handleItemClick = (sectionId: string) => {
    onSectionChange(sectionId);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[60]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Menu Drawer */}
          <motion.div
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "100%", opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 z-[70] bg-card/95 backdrop-blur-xl border-t border-border/50 rounded-t-3xl"
            role="dialog"
            aria-modal="true"
            aria-label="Additional navigation menu"
          >
            {/* Handle bar */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 rounded-full bg-muted-foreground/30" />
            </div>

            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close menu"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Menu Items */}
            <nav className="px-6 pb-8 pt-2" aria-label="More navigation options">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 px-2">
                More Options
              </h3>
              <ul className="space-y-2" role="menu">
                {menuItems.map((item, index) => (
                  <motion.li
                    key={item.id}
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    role="none"
                  >
                    <Link
                      to={item.href}
                      onClick={() => handleItemClick(item.id)}
                      className={`flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-200 ${
                        activeSection === item.id
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-secondary"
                      }`}
                      role="menuitem"
                      aria-current={activeSection === item.id ? "page" : undefined}
                    >
                      <div className={`p-2 rounded-xl ${
                        activeSection === item.id
                          ? "bg-primary/20"
                          : "bg-secondary"
                      }`}>
                        <item.icon className="w-5 h-5" />
                      </div>
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default MobileMoreMenu;
