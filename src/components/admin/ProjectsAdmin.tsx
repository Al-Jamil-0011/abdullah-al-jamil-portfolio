import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Trash2, ExternalLink, Upload, FileSpreadsheet, CheckCircle, AlertCircle } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";

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
  progress_status: string;
  completion_date: string;
  live_link: string;
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
  progress_status: "Processing",
  completion_date: "",
  live_link: "",
};

const projectTypes = ["Web", "Mobile", "UI/UX", "Branding", "Dashboard", "E-commerce", "WEB-APP", "WEBSITE"];
const categories = ["UI/UX", "Web Development", "Mobile App", "Product Design", "Branding", "General"];
const statusOptions = ["Processing", "Running", "Complete", "Live"];

interface ImportResult {
  success: boolean;
  imported: number;
  skipped: number;
  errors: string[];
}

const ProjectsAdmin = () => {
  const [formData, setFormData] = useState<ProjectForm>(initialFormState);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
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
        progress_status: project.progress_status,
        completion_date: project.completion_date.trim() || null,
        live_link: project.live_link.trim() || null,
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

  // Handle Excel file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
      toast.error("Please upload an Excel file (.xlsx or .xls)");
      return;
    }

    setIsImporting(true);
    setImportResult(null);

    try {
      // Get auth session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        toast.error("Please log in to import projects");
        return;
      }

      // Create form data
      const formData = new FormData();
      formData.append('file', file);

      // Call edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/import-projects`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${session.access_token}`,
          },
          body: formData,
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Import failed');
      }

      setImportResult(result);
      
      if (result.imported > 0) {
        toast.success(`Successfully imported ${result.imported} projects!`);
        queryClient.invalidateQueries({ queryKey: ["admin-projects"] });
        queryClient.invalidateQueries({ queryKey: ["projects"] });
      } else if (result.skipped > 0) {
        toast.info(`All ${result.skipped} projects already exist.`);
      }

    } catch (error) {
      console.error("Import error:", error);
      toast.error(error instanceof Error ? error.message : "Failed to import projects");
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const getStatusColor = (status: string) => {
    const s = status?.toLowerCase() || '';
    if (s.includes('live')) return 'bg-green-500/20 text-green-400';
    if (s.includes('complete') || s.includes('complate')) return 'bg-blue-500/20 text-blue-400';
    if (s.includes('running') || s.includes('runing')) return 'bg-yellow-500/20 text-yellow-400';
    return 'bg-muted text-muted-foreground';
  };

  return (
    <div className="space-y-6">
      {/* Header with Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h2 className="text-lg font-semibold text-foreground">
          Manage Projects ({projects?.length || 0})
        </h2>
        <div className="flex items-center gap-3">
          {/* Excel Import Button */}
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".xlsx,.xls"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              disabled={isImporting}
            />
            <Button
              variant="outline"
              className="flex items-center gap-2"
              disabled={isImporting}
            >
              {isImporting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Importing...
                </>
              ) : (
                <>
                  <FileSpreadsheet className="w-4 h-4" />
                  Import Excel
                </>
              )}
            </Button>
          </div>
          
          <Button
            onClick={() => setIsFormOpen(!isFormOpen)}
            className="flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Project
          </Button>
        </div>
      </div>

      {/* Import Result */}
      {importResult && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-4"
        >
          <div className="flex items-start gap-3">
            {importResult.imported > 0 ? (
              <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
            )}
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">
                Import Complete: {importResult.imported} imported, {importResult.skipped} skipped
              </p>
              {importResult.errors.length > 0 && (
                <div className="mt-2 space-y-1">
                  {importResult.errors.slice(0, 5).map((err, idx) => (
                    <p key={idx} className="text-xs text-muted-foreground">{err}</p>
                  ))}
                  {importResult.errors.length > 5 && (
                    <p className="text-xs text-muted-foreground">
                      ...and {importResult.errors.length - 5} more
                    </p>
                  )}
                </div>
              )}
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setImportResult(null)}
              className="text-muted-foreground"
            >
              Dismiss
            </Button>
          </div>
        </motion.div>
      )}

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

            <div className="grid md:grid-cols-4 gap-4">
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
                <Label htmlFor="progress_status">Status</Label>
                <Select
                  value={formData.progress_status}
                  onValueChange={(value) => setFormData({ ...formData, progress_status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status} value={status}>{status}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="completion_date">Completion Date</Label>
                <Input
                  id="completion_date"
                  value={formData.completion_date}
                  onChange={(e) => setFormData({ ...formData, completion_date: e.target.value })}
                  placeholder="e.g., March 2025"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="tags">Tags (comma separated)</Label>
                <Input
                  id="tags"
                  value={formData.tags}
                  onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                  placeholder="React, TypeScript, UI"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="live_link">Live Project Link</Label>
                <Input
                  id="live_link"
                  type="url"
                  value={formData.live_link}
                  onChange={(e) => setFormData({ ...formData, live_link: e.target.value })}
                  placeholder="https://play.google.com/..."
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
            <FileSpreadsheet className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-2">No projects yet.</p>
            <p className="text-sm text-muted-foreground">Add your first project or import from Excel!</p>
          </div>
        ) : (
          projects?.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
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
                <div className="min-w-0 flex-1">
                  <h4 className="font-medium text-foreground truncate">{project.title}</h4>
                  <p className="text-sm text-muted-foreground truncate">{project.description}</p>
                  <div className="flex flex-wrap items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                      {project.project_type}
                    </span>
                    <span className="text-xs text-muted-foreground">{project.category}</span>
                    {project.progress_status && (
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getStatusColor(project.progress_status)}`}>
                        {project.progress_status}
                      </span>
                    )}
                    {project.completion_date && (
                      <span className="text-xs text-muted-foreground">
                        📅 {project.completion_date}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {(project.live_link || project.external_link) && (
                  <a
                    href={project.live_link || project.external_link}
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
