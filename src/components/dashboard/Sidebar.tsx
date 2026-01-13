import { motion } from "framer-motion";
import { User, FileText, FolderKanban, BookOpen, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "about", label: "About", icon: User },
  { id: "resume", label: "Resume", icon: FileText },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "contact", label: "Contact", icon: Mail },
];

const Sidebar = ({ activeSection, onSectionChange }: SidebarProps) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.aside
      initial={{ x: -20, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="fixed left-0 top-0 h-screen w-20 md:w-24 bg-card/50 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col"
    >
      {/* Theme Toggle */}
      <div className="p-4 flex justify-center">
        <button
          onClick={toggleTheme}
          className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200"
          aria-label="Toggle theme"
        >
          {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 flex flex-col justify-center px-2 md:px-3 gap-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={`nav-item relative ${activeSection === item.id ? "active" : ""}`}
          >
            {activeSection === item.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute inset-0 bg-secondary rounded-xl"
                transition={{ type: "spring", duration: 0.5 }}
              />
            )}
            <item.icon className="w-5 h-5 relative z-10" />
            <span className="text-[10px] md:text-xs font-medium relative z-10">{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Bottom spacing */}
      <div className="p-4" />
    </motion.aside>
  );
};

export default Sidebar;
