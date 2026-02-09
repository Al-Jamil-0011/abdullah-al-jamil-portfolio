import { motion } from "framer-motion";
import { Palette, Layout, Code, Layers, MessageCircle, Briefcase, Globe, Smartphone, PenTool, Zap, ArrowUpRight, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const iconMap: Record<string, React.ElementType> = {
  Palette, Layout, Code, Layers, MessageCircle, Briefcase, Globe, Smartphone, PenTool, Zap,
};

const gradients = [
  "from-primary/20 to-secondary",
  "from-blue-500/20 to-secondary",
  "from-purple-500/20 to-secondary",
  "from-orange-500/20 to-secondary",
  "from-green-500/20 to-secondary",
  "from-pink-500/20 to-secondary",
];

const ServicesContent = () => {
  const { data: services, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .eq("is_published", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      {/* Header */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          My <span className="text-primary">Services</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          I offer a range of services to help bring your ideas to life. 
          From concept to execution, I'm here to create impactful digital experiences.
        </p>
      </div>

      {/* Services Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : services && services.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon || "Palette"] || Palette;
            const gradient = gradients[index % gradients.length];
            return (
              <motion.div
                key={service.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-hover p-6 group cursor-pointer"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-7 h-7 text-primary" />
                </div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <h4 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {service.title}
                  </h4>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 group-hover:text-primary transition-all" />
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground">Services coming soon.</p>
        </div>
      )}

      {/* CTA Section */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="glass-card p-6 md:p-8 text-center"
      >
        <h4 className="text-lg font-semibold text-foreground mb-2">
          Have a project in mind?
        </h4>
        <p className="text-muted-foreground mb-4">
          Let's discuss how I can help bring your vision to life.
        </p>
        <a
          href="/contact"
          className="inline-flex items-center gap-2 btn-primary"
        >
          <span>Get in Touch</span>
          <ArrowUpRight className="w-4 h-4" />
        </a>
      </motion.div>
    </motion.div>
  );
};

export default ServicesContent;
