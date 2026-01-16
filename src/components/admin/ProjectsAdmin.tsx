import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Trash2, ExternalLink, Edit2 } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ProjectForm {
  title: string;
  description: string;
  thumbnail_url: string;
  category: string;
  project_type: string;
  tags: string;
  external_link: string;
  case_study_link: string;
  thinking_process: string;
}

const initialFormState: ProjectForm = {
  title: "",
  description: "",
  thumbnail_url: "",
  category: "UI/UX",
  project_type: "Web",
  tags: "",
  external_link: "",
  case_study_link: "",
  thinking_process: "",
};

const projectTypes = ["Web", "Mobile", "UI/UX", "Branding", "Dashboard", "E-commerce"];
const categories = ["UI/UX", "Web Development", "Mobile App", "Product Design", "Branding"];

const ProjectsAdmin = () => {
  const [formData, setFormData] = useState<ProjectForm>(initialFormState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const queryClient = useQueryClient();

  // Fetch projects
  const { data: projects, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("display_order", { ascending: true });
      
      if (error) throw error;
      return data;
    },
  });

  // Add project mutation
  const addMutation = useMutation({
    mutationFn: async (project: ProjectForm) => {
      const { error } = await supabase.from("projects").insert({
        title: project.title.trim(),
        description: project.description.trim(),
        thumbnail_url: project.thumbnail_url.trim() || null,
        category: project.category,
        project_type: project.project_type,
        tags: project.tags.split(",").map((t) => t.trim()).filter(Boolean),
        external_link: project.external_link.trim() || null,
        case_study_link: project.case_study_link.trim() || null,
        thinking_process: project.thinking_process.trim() || null,
        is_published: true,
        display_order: (projects?.length || 0) + 1,
      });
      
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project added successfully!");
      setFormData(initialFormState);
      setIsFormOpen(false);
    },
    onError: (error) => {
      console.error("Error adding project:", error);
      toast.error("Failed to add project. Please try again.");
    },
  });

  // Delete project mutation
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted successfully!");
    },
    onError: (error) => {
      console.error("Error deleting project:", error);
      toast.error("Failed to delete project.");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    addMutation.mutate(formData);
  };

  return (
    <div className="space-y-6">
      {/* Add New Project Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">
          Manage Projects ({projects?.length || 0})
        </h2>
        <Button
          onClick={() => setIsFormOpen(!isFormOpen)}
          className="flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Project
        </Button>
      </div>

      {/* Add Project Form */}
      {isFormOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="glass-card p-6"
        >
          <h3 className="text-lg font-medium text-foreground mb-4">New Project</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter project title"
                  required
                  maxLength={200}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="thumbnail_url">Thumbnail URL</Label>
                <Input
                  id="thumbnail_url"
                  type="url"
                  value={formData.thumbnail_url}
                  onChange={(e) => setFormData({ ...formData, thumbnail_url: e.target.value })}
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Short Description *</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Describe the project..."
                required
                maxLength={500}
                rows={3}
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
                <Label htmlFor="project_type">Project Type</Label>
                <Select
                  value={formData.project_type}
                  onValueChange={(value) => setFormData({ ...formData, project_type: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {projectTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, TypeScript, UI"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="external_link">External Link</Label>
                <Input
                  id="external_link"
                  type="url"
                  value={formData.external_link}
                  onChange={(e) => setFormData({ ...formData, external_link: e.target.value })}
                  placeholder="https://project-demo.com"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="case_study_link">Case Study Link</Label>
                <Input
                  id="case_study_link"
                  type="url"
                  value={formData.case_study_link}
                  onChange={(e) => setFormData({ ...formData, case_study_link: e.target.value })}
                  placeholder="https://case-study.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="thinking_process">Design Thinking / Process</Label>
              <Textarea
                id="thinking_process"
                value={formData.thinking_process}
                onChange={(e) => setFormData({ ...formData, thinking_process: e.target.value })}
                placeholder="Describe the design thinking behind this project..."
                rows={3}
                maxLength={1000}
              />
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
                    Saving...
                  </>
                ) : (
                  "Save Project"
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

      {/* Projects List */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : projects?.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">No projects yet. Add your first project!</p>
          </div>
        ) : (
          projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card p-4 flex items-center justify-between gap-4"
            >
              <div className="flex items-center gap-4 flex-1 min-w-0">
                {project.thumbnail_url && (
                  <img
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                  />
                )}
                <div className="min-w-0">
                  <h4 className="font-medium text-foreground truncate">{project.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {project.project_type}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {project.external_link && (
                  <a
                    href={project.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-lg bg-secondary/50 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="View project"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => {
                    if (confirm("Are you sure you want to delete this project?")) {
                      deleteMutation.mutate(project.id);
                    }
                  }}
                  disabled={deleteMutation.isPending}
                  aria-label="Delete project"
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

export default ProjectsAdmin;
