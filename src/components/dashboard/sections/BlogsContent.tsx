import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Calendar, Clock, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";

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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const { data, error } = await supabase
          .from('blogs')
          .select('*')
          .order('publish_date', { ascending: false });

        if (error) throw error;
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

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
          My <span className="text-primary">Writings</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          Thoughts on design, development, and everything in between. 
          I write about what I learn and the challenges I encounter.
        </p>
      </div>

      {/* Blog Grid */}
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
              {/* Image */}
              <div className={`h-40 bg-gradient-to-br ${gradient} relative`}>
                {post.cover_image_url ? (
                  <img 
                    src={post.cover_image_url} 
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                ) : null}
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent opacity-60" />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-card/80 backdrop-blur-sm text-xs font-medium text-primary">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5">
                <h4 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </h4>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                  {post.summary}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formattedDate}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.read_time_minutes} min read
                    </span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </div>
              </div>
            </motion.article>
          );
        })}
      </div>

      {blogs.length === 0 && (
        <div className="glass-card p-8 text-center">
          <p className="text-muted-foreground">No blog posts available yet.</p>
        </div>
      )}
    </motion.div>
  );
};

export default BlogsContent;
