import { motion } from "framer-motion";
import { Calendar, Clock, ArrowRight } from "lucide-react";

const blogPosts = [
  {
    id: 1,
    title: "The Psychology of Color in UI Design",
    excerpt: "How color choices influence user behavior and create emotional connections in digital products.",
    category: "Design",
    date: "Jan 10, 2025",
    readTime: "5 min read",
    image: "from-primary/20 to-secondary",
  },
  {
    id: 2,
    title: "Building Accessible Design Systems",
    excerpt: "A practical guide to creating inclusive component libraries that work for everyone.",
    category: "Development",
    date: "Jan 5, 2025",
    readTime: "8 min read",
    image: "from-blue-500/20 to-secondary",
  },
  {
    id: 3,
    title: "From Figma to Code: Bridging the Gap",
    excerpt: "How designers and developers can collaborate more effectively for better products.",
    category: "Workflow",
    date: "Dec 28, 2024",
    readTime: "6 min read",
    image: "from-purple-500/20 to-secondary",
  },
  {
    id: 4,
    title: "User Research on a Budget",
    excerpt: "Practical techniques for gathering meaningful user insights without breaking the bank.",
    category: "Research",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    image: "from-orange-500/20 to-secondary",
  },
];

const BlogsContent = () => {
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
        {blogPosts.map((post, index) => (
          <motion.article
            key={post.id}
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="glass-card-hover overflow-hidden group cursor-pointer"
          >
            {/* Image */}
            <div className={`h-40 bg-gradient-to-br ${post.image} relative`}>
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
                {post.excerpt}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <ArrowRight className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
};

export default BlogsContent;
