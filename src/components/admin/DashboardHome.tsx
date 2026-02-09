import { motion } from "framer-motion";
import { FolderKanban, BookOpen, Briefcase, MessageSquareQuote, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface StatCardProps {
  title: string;
  count: number;
  icon: React.ElementType;
  color: string;
  delay: number;
}

const StatCard = ({ title, count, icon: Icon, color, delay }: StatCardProps) => (
  <motion.div
    initial={{ y: 20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.4, delay }}
    className="glass-card p-6"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-3xl font-bold text-foreground mt-1">{count}</p>
      </div>
      <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center`}>
        <Icon className="w-6 h-6" />
      </div>
    </div>
  </motion.div>
);

const DashboardHome = () => {
  const { data: projectCount = 0, isLoading: loadingProjects } = useQuery({
    queryKey: ["admin-project-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("projects")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: blogCount = 0, isLoading: loadingBlogs } = useQuery({
    queryKey: ["admin-blog-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("blogs")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: serviceCount = 0, isLoading: loadingServices } = useQuery({
    queryKey: ["admin-service-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("services")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const { data: testimonialCount = 0, isLoading: loadingTestimonials } = useQuery({
    queryKey: ["admin-testimonial-count"],
    queryFn: async () => {
      const { count, error } = await supabase
        .from("testimonials")
        .select("*", { count: "exact", head: true });
      if (error) throw error;
      return count || 0;
    },
  });

  const isLoading = loadingProjects || loadingBlogs || loadingServices || loadingTestimonials;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-foreground">Welcome Back 👋</h2>
        <p className="text-muted-foreground mt-1">Here's an overview of your portfolio content.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Projects"
          count={projectCount}
          icon={FolderKanban}
          color="bg-primary/10 text-primary"
          delay={0.1}
        />
        <StatCard
          title="Services"
          count={serviceCount}
          icon={Briefcase}
          color="bg-blue-500/10 text-blue-500"
          delay={0.2}
        />
        <StatCard
          title="Blog Posts"
          count={blogCount}
          icon={BookOpen}
          color="bg-purple-500/10 text-purple-500"
          delay={0.3}
        />
        <StatCard
          title="Testimonials"
          count={testimonialCount}
          icon={MessageSquareQuote}
          color="bg-green-500/10 text-green-500"
          delay={0.4}
        />
      </div>
    </div>
  );
};

export default DashboardHome;
