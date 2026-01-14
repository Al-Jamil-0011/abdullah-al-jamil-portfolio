import { motion } from "framer-motion";
import { User, FileText, FolderKanban, BookOpen, Mail, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";
import { Link, useLocation } from "react-router-dom";
interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}
const navItems = [{
  id: "about",
  label: "About",
  icon: User,
  href: "/about"
}, {
  id: "resume",
  label: "Resume",
  icon: FileText,
  href: "/resume"
}, {
  id: "projects",
  label: "Projects",
  icon: FolderKanban,
  href: "/projects"
}, {
  id: "blogs",
  label: "Blogs",
  icon: BookOpen,
  href: "/blogs"
}, {
  id: "contact",
  label: "Contact",
  icon: Mail,
  href: "/contact"
}];
const Sidebar = ({
  activeSection,
  onSectionChange
}: SidebarProps) => {
  const {
    theme,
    toggleTheme
  } = useTheme();
  return <motion.aside initial={{
    x: -20,
    opacity: 0
  }} animate={{
    x: 0,
    opacity: 1
  }} transition={{
    duration: 0.4
  }} className="fixed left-0 top-0 h-screen w-20 md:w-24 bg-card/50 backdrop-blur-xl border-r border-border/50 z-50 flex flex-col" role="navigation" aria-label="Main sidebar navigation">
      {/* Theme Toggle */}
      <div className="p-4 flex justify-center">
        <button onClick={toggleTheme} className="p-3 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200" aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`} aria-pressed={theme === "dark"}>
          {theme === "dark" ? <Sun className="w-5 h-5" aria-hidden="true" /> : <Moon className="w-5 h-5" aria-hidden="true" />}
        </button>
      </div>

      {/* Navigation */}
      <ul className="flex-1 px-2 list-none md:px-[11px] flex-col flex items-center justify-start gap-[12px] border-none rounded-md shadow-none" role="menubar">
        {navItems.map(item => <li key={item.id} role="none">
            <Link to={item.href} onClick={() => onSectionChange(item.id)} className={`nav-item relative ${activeSection === item.id ? "active" : ""}`} role="menuitem" aria-current={activeSection === item.id ? "page" : undefined} aria-label={`Navigate to ${item.label} section`}>
              {activeSection === item.id && <motion.div layoutId="activeTab" className="absolute inset-0 bg-secondary rounded-xl" transition={{
            type: "spring",
            duration: 0.5
          }} aria-hidden="true" />}
              <item.icon className="w-5 h-5 relative z-10" aria-hidden="true" />
              <span className="text-[10px] md:text-xs font-medium relative z-10">{item.label}</span>
            </Link>
          </li>)}
      </ul>

      {/* Bottom spacing */}
      <div className="p-4" aria-hidden="true" />
    </motion.aside>;
};
export default Sidebar;