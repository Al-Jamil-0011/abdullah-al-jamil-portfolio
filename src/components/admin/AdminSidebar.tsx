import { FolderKanban, BookOpen, Briefcase, MessageSquareQuote, LayoutDashboard, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";

interface AdminSidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  onLogout: () => void;
}

const navItems = [
  { id: "home", label: "Dashboard Home", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: FolderKanban },
  { id: "services", label: "Services", icon: Briefcase },
  { id: "blogs", label: "Blogs", icon: BookOpen },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareQuote },
];

const AdminSidebar = ({ activeSection, onSectionChange, onLogout }: AdminSidebarProps) => {
  return (
    <aside className="w-64 min-h-screen bg-card border-r border-border/50 flex flex-col">
      {/* Logo / Title */}
      <div className="p-6 border-b border-border/50">
        <h2 className="text-lg font-bold text-foreground">Admin Panel</h2>
        <p className="text-xs text-muted-foreground mt-1">Manage your portfolio</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onSectionChange(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
              activeSection === item.id
                ? "bg-primary text-primary-foreground shadow-md"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
            )}
          >
            <item.icon className="w-5 h-5 flex-shrink-0" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border/50">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 transition-all duration-200"
        >
          <LogOut className="w-5 h-5" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default AdminSidebar;
