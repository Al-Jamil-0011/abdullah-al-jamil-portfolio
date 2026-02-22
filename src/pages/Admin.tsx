import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import { useNavigate } from "react-router-dom";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import AdminGuard from "@/components/admin/AdminGuard";
import AdminSidebar from "@/components/admin/AdminSidebar";
import DashboardHome from "@/components/admin/DashboardHome";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import BlogsAdmin from "@/components/admin/BlogsAdmin";
import ServicesAdmin from "@/components/admin/ServicesAdmin";
import TestimonialsAdmin from "@/components/admin/TestimonialsAdmin";
import CertificatesAdmin from "@/components/admin/CertificatesAdmin";
import SiteContentAdmin from "@/components/admin/SiteContentAdmin";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "home":
        return <DashboardHome />;
      case "site-content":
        return <SiteContentAdmin />;
      case "projects":
        return <ProjectsAdmin />;
      case "services":
        return <ServicesAdmin />;
      case "blogs":
        return <BlogsAdmin />;
      case "testimonials":
        return <TestimonialsAdmin />;
      case "certificates":
        return <CertificatesAdmin />;
      default:
        return <DashboardHome />;
    }
  };

  const sectionTitles: Record<string, string> = {
    home: "Dashboard",
    "site-content": "Site Content",
    projects: "Projects",
    services: "Services",
    blogs: "Blogs",
    testimonials: "Testimonials",
    certificates: "Certificates",
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar
          activeSection={activeSection}
          onSectionChange={handleSectionChange}
          onLogout={handleLogout}
        />
      </div>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setMobileMenuOpen(false)} />
          <div className="relative w-64 h-full">
            <AdminSidebar
              activeSection={activeSection}
              onSectionChange={handleSectionChange}
              onLogout={handleLogout}
            />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border/50 px-4 md:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                {sectionTitles[activeSection] || "Dashboard"}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {user?.email}
              </p>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-4 md:p-8">
          <motion.div
            key={activeSection}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {renderContent()}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

const Admin = () => {
  return (
    <ThemeProvider>
      <AdminGuard>
        <AdminDashboard />
      </AdminGuard>
    </ThemeProvider>
  );
};

export default Admin;
