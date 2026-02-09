import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Trash2, Pencil, X } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface ServiceForm {
  title: string;
  description: string;
  icon: string;
}

const initialForm: ServiceForm = { title: "", description: "", icon: "Palette" };

const iconOptions = ["Palette", "Layout", "Code", "Layers", "MessageCircle", "Briefcase", "Globe", "Smartphone", "PenTool", "Zap"];

const ServicesAdmin = () => {
  const [formData, setFormData] = useState<ServiceForm>(initialForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: services, isLoading } = useQuery({
    queryKey: ["admin-services"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (service: ServiceForm) => {
      const { error } = await supabase.from("services").insert({
        title: service.title.trim(),
        description: service.description.trim(),
        icon: service.icon,
        display_order: (services?.length || 0) + 1,
        is_published: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-service-count"] });
      toast.success("Service added successfully!");
      resetForm();
    },
    onError: () => toast.error("Failed to add service."),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...service }: ServiceForm & { id: string }) => {
      const { error } = await supabase.from("services").update({
        title: service.title.trim(),
        description: service.description.trim(),
        icon: service.icon,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated!");
      resetForm();
    },
    onError: () => toast.error("Failed to update service."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("services").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-services"] });
      queryClient.invalidateQueries({ queryKey: ["services"] });
      queryClient.invalidateQueries({ queryKey: ["admin-service-count"] });
      toast.success("Service deleted!");
    },
    onError: () => toast.error("Failed to delete service."),
  });

  const resetForm = () => {
    setFormData(initialForm);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const startEdit = (service: any) => {
    setFormData({ title: service.title, description: service.description, icon: service.icon || "Palette" });
    setEditingId(service.id);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (editingId) {
      updateMutation.mutate({ ...formData, id: editingId });
    } else {
      addMutation.mutate(formData);
    }
  };

  const isPending = addMutation.isPending || updateMutation.isPending;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-foreground">
          Manage Services ({services?.length || 0})
        </h2>
        <Button onClick={() => { resetForm(); setIsFormOpen(!isFormOpen); }} className="flex items-center gap-2">
          {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isFormOpen ? "Close" : "Add Service"}
        </Button>
      </div>

      {isFormOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="glass-card p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">
            {editingId ? "Edit Service" : "New Service"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label>Service Title *</Label>
              <Input value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} placeholder="e.g. UI/UX Design" required maxLength={100} />
            </div>
            <div className="space-y-2">
              <Label>Description *</Label>
              <Textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} placeholder="Describe the service..." required maxLength={500} rows={3} />
            </div>
            <div className="space-y-2">
              <Label>Icon</Label>
              <div className="flex flex-wrap gap-2">
                {iconOptions.map((icon) => (
                  <button
                    key={icon}
                    type="button"
                    onClick={() => setFormData({ ...formData, icon })}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      formData.icon === icon
                        ? "bg-primary text-primary-foreground"
                        : "bg-secondary/50 text-muted-foreground hover:bg-secondary"
                    }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : editingId ? "Update Service" : "Save Service"}
              </Button>
              <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : services?.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">No services yet. Add your first service!</p>
          </div>
        ) : (
          services?.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 flex items-center justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <h4 className="font-medium text-foreground">{service.title}</h4>
                <p className="text-sm text-muted-foreground truncate">{service.description}</p>
                <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary mt-1 inline-block">
                  {service.icon}
                </span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="icon" onClick={() => startEdit(service)} aria-label="Edit service">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => { if (confirm("Delete this service?")) deleteMutation.mutate(service.id); }}
                  disabled={deleteMutation.isPending}
                  aria-label="Delete service"
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

export default ServicesAdmin;
