import { motion } from "framer-motion";
import { Quote, Star, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const TestimonialsContent = () => {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
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
          Client <span className="text-primary">Testimonials</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          What my clients say about working with me. Building lasting relationships through 
          quality work and genuine collaboration.
        </p>
      </div>

      {/* Testimonials Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      ) : testimonials && testimonials.length > 0 ? (
        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="glass-card-hover p-6 relative"
            >
              {/* Quote Icon */}
              <div className="absolute top-6 right-6 opacity-10">
                <Quote className="w-12 h-12 text-primary" />
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                ))}
              </div>

              {/* Content */}
              <p className="text-muted-foreground mb-6 leading-relaxed italic relative z-10">
                "{testimonial.feedback}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                {testimonial.avatar_url ? (
                  <img
                    src={testimonial.avatar_url}
                    alt={testimonial.client_name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-secondary flex items-center justify-center">
                    <span className="text-sm font-semibold text-primary">
                      {testimonial.client_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </span>
                  </div>
                )}
                <div>
                  <h4 className="font-semibold text-foreground">
                    {testimonial.client_name}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.client_role}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground">Testimonials coming soon.</p>
        </div>
      )}

      {/* Trust Indicators */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card p-6 md:p-8"
      >
        <div className="flex flex-wrap justify-center gap-8 text-center">
          <div>
            <p className="text-3xl font-bold text-primary">50+</p>
            <p className="text-sm text-muted-foreground">Projects Completed</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">30+</p>
            <p className="text-sm text-muted-foreground">Happy Clients</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">5</p>
            <p className="text-sm text-muted-foreground">Years Experience</p>
          </div>
          <div>
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-sm text-muted-foreground">Client Satisfaction</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsContent;
