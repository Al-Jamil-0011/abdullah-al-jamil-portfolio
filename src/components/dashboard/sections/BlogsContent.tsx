import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";

interface Blog {
  id: string;
  title: string;
  summary: string;
  cover_image_url: string | null;
  category: string;
  publish_date: string;
  read_time_minutes: number;
}

const gradientColors = [
  "from-primary/20 to-secondary",
  "from-blue-500/20 to-secondary",
  "from-purple-500/20 to-secondary",
  "from-orange-500/20 to-secondary",
  "from-green-500/20 to-secondary",
  "from-pink-500/20 to-secondary",
];

const BlogsContent = () => {
  const { data: blogs = [], isLoading } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .order('publish_date', { ascending: false });
      if (error) throw error;
      return data as Blog[];
    },
  });

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          My <span className="text-primary">Writings</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          Thoughts on design, development, and everything in between. 
          I write about what I learn and the challenges I encounter.
        </p>
      </div>

      {isLoading ? (
        <div className="grid md:grid-cols-2 gap-5">
          {[1, 2].map(i => (
            <div key={i} className="glass-card overflow-hidden">
              <Skeleton className="h-40 w-full" />
              <div className="p-5 space-y-3">
                <Skeleton className="h-5 w-48" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
                <div className="flex gap-4">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid md:grid-cols-2 gap-5">
          {blogs.map((post, index) => {
            const gradient = gradientColors[index % gradientColors.length];
            const formattedDate = format(new Date(post.publish_date), 'MMM d, yyyy');
            
            return (
              <motion.article
                key={post.id}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="glass-card-hover overflow-hidden group cursor-pointer"
              >
                <div className={`h-40 bg-gradient-to-br ${gradient} relative`}>
                  {post.cover_image_url ? (
                    <img src={post.cover_image_url} alt={post.title} className="w-full h-full object-cover" loading="lazy" />
                  ) : null}
                  <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-medium text-primary">{post.category}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h4>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.summary}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" />{formattedDate}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{post.read_time_minutes} min read</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      )}

      {!isLoading && blogs.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground">No blog posts available yet.</p>
        </div>
      )}
    </motion.div>
  );
};

export default BlogsContent;
