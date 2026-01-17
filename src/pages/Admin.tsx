import { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FolderKanban, BookOpen, ArrowLeft, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAdminAuth } from "@/hooks/use-admin-auth";
import AdminGuard from "@/components/admin/AdminGuard";
import ProjectsAdmin from "@/components/admin/ProjectsAdmin";
import BlogsAdmin from "@/components/admin/BlogsAdmin";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("projects");
  const { user, signOut } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await signOut();
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 glass-card border-b border-border/50">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link 
              to="/about" 
              className="p-2 rounded-xl bg-secondary/50 text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
              aria-label="Back to portfolio"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Admin Dashboard</h1>
              <p className="text-sm text-muted-foreground">
                Signed in as <span className="text-foreground">{user?.email}</span>
              </p>
            </div>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="flex items-center gap-2"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto p-4 md:p-6 lg:p-8">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2 mb-8">
              <TabsTrigger value="projects" className="flex items-center gap-2">
                <FolderKanban className="w-4 h-4" />
                Projects
              </TabsTrigger>
              <TabsTrigger value="blogs" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Blogs
              </TabsTrigger>
            </TabsList>

            <TabsContent value="projects">
              <ProjectsAdmin />
            </TabsContent>

            <TabsContent value="blogs">
              <BlogsAdmin />
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>
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
