import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Trash2, Eye, Calendar } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface BlogForm {
  title: string;
  summary: string;
  content: string;
  cover_image_url: string;
  category: string;
  publish_date: string;
  read_time_minutes: number;
}

const initialFormState: BlogForm = {
  title: "",
  summary: "",
  content: "",
  cover_image_url: "",
  category: "Design",
  publish_date: new Date().toISOString().split("T")[0],
  read_time_minutes: 5,
};

const categories = ["Design", "Development", "Product", "Career", "Technology", "UI/UX", "Tutorial"];

const BlogsAdmin = () => {
  const [formData, setFormData] = useState<BlogForm>(initialFormState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch blogs
  const { data: blogs, isLoading } = useQuery({
    queryKey: ["admin-blogs"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("publish_date", { ascending: false });
      
      if (error) throw error;
      return data;
    },
  });

  // Add blog mutation
  const addMutation = useMutation({
    mutationFn: async (blog: BlogForm) => {
      const { error } = await supabase.from("blogs").insert({
        title: blog.title.trim(),
        summary: blog.summary.trim(),
        content: blog.content.trim() || null,
        cover_image_url: blog.cover_image_url.trim() || null,
        category: blog.category,
        publish_date: blog.publish_date,
        read_time_minutes: blog.read_time_minutes,
        is_published: true,
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog post added successfully!");
      setFormData(initialFormState);
      setIsFormOpen(false);
    },
    onError: (error) => {
      console.error("Error adding blog:", error);
      toast.error("Failed to add blog post. Please try again.");
    },
  });

  // Delete blog mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("blogs").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-blogs"] });
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
      toast.success("Blog post deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting blog:", error);
      toast.error("Failed to delete blog post.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.summary.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Add New Blog Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">
          Manage Blogs ({blogs?.length || 0})
        </h2>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Blog Post
        </Button>
      </div>

      {/* Add Blog Form */}
      {isFormOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-medium text-foreground mb-4">New Blog Post</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="blog-title">Blog Title *</Label>
                <Input
                  id="blog-title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter blog title"
                  required
                  maxLength={200}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cover_image_url">Cover Image URL</Label>
                <Input
                  id="cover_image_url"
                  type="url"
                  value={formData.cover_image_url}
                  onChange={(e) => setFormData({ ...formData, cover_image_url: e.target.value })}
                  placeholder="https://example.com/cover.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Short Summary *</Label>
              <Textarea
                id="summary"
                value={formData.summary}
                onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                placeholder="Write a brief summary of your blog post..."
                required
                maxLength={500}
                rows={2}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content (Markdown supported)</Label>
              <Textarea
                id="content"
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog content here... Markdown is supported."
                rows={8}
                className="font-mono text-sm"
              />
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="publish_date">Publish Date</Label>
                <Input
                  id="publish_date"
                  type="date"
                  value={formData.publish_date}
                  onChange={(e) => setFormData({ ...formData, publish_date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="read_time">Read Time (minutes)</Label>
                <Input
                  id="read_time"
                  type="number"
                  min={1}
                  max={60}
                  value={formData.read_time_minutes}
                  onChange={(e) => setFormData({ ...formData, read_time_minutes: parseInt(e.target.value) || 5 })}
                />
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button
                type="submit"
                disabled={addMutation.isPending}
                className="flex items-center gap-2"
              >
                {addMutation.isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Publishing...
                  </>
                ) : (
                  "Publish Blog"
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setFormData(initialFormState);
                  setIsFormOpen(false);
                }}
              >
                Cancel
              </Button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Blogs List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : blogs?.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">No blog posts yet. Create your first post!</p>
          </div>
        ) : (
          blogs?.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {blog.cover_image_url && (
                  <img
                    src={blog.cover_image_url}
                    alt={blog.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="font-medium text-foreground truncate">{blog.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{blog.summary}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {blog.category}
                    </span>
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {format(new Date(blog.publish_date), "MMM d, yyyy")}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {blog.read_time_minutes} min read
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this blog post?")) {
                      deleteMutation.mutate(blog.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  aria-label="Delete blog post"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default BlogsAdmin;
