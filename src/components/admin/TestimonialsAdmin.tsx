import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Loader2, Trash2, Pencil, X, Star } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface TestimonialForm {
  client_name: string;
  client_role: string;
  feedback: string;
  avatar_url: string;
  rating: number;
}

const initialForm: TestimonialForm = {
  client_name: "",
  client_role: "",
  feedback: "",
  avatar_url: "",
  rating: 5,
};

const TestimonialsAdmin = () => {
  const [formData, setFormData] = useState<TestimonialForm>(initialForm);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const queryClient = useQueryClient();

  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const addMutation = useMutation({
    mutationFn: async (t: TestimonialForm) => {
      const { error } = await supabase.from("testimonials").insert({
        client_name: t.client_name.trim(),
        client_role: t.client_role.trim(),
        feedback: t.feedback.trim(),
        avatar_url: t.avatar_url.trim() || null,
        rating: t.rating,
        display_order: (testimonials?.length || 0) + 1,
        is_published: true,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["admin-testimonial-count"] });
      toast.success("Testimonial added!");
      resetForm();
    },
    onError: () => toast.error("Failed to add testimonial."),
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...t }: TestimonialForm & { id: string }) => {
      const { error } = await supabase.from("testimonials").update({
        client_name: t.client_name.trim(),
        client_role: t.client_role.trim(),
        feedback: t.feedback.trim(),
        avatar_url: t.avatar_url.trim() || null,
        rating: t.rating,
      }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      toast.success("Testimonial updated!");
      resetForm();
    },
    onError: () => toast.error("Failed to update testimonial."),
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["testimonials"] });
      queryClient.invalidateQueries({ queryKey: ["admin-testimonial-count"] });
      toast.success("Testimonial deleted!");
    },
    onError: () => toast.error("Failed to delete testimonial."),
  });

  const resetForm = () => {
    setFormData(initialForm);
    setIsFormOpen(false);
    setEditingId(null);
  };

  const startEdit = (t: any) => {
    setFormData({
      client_name: t.client_name,
      client_role: t.client_role,
      feedback: t.feedback,
      avatar_url: t.avatar_url || "",
      rating: t.rating || 5,
    });
    setEditingId(t.id);
    setIsFormOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.client_name.trim() || !formData.client_role.trim() || !formData.feedback.trim()) {
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
          Manage Testimonials ({testimonials?.length || 0})
        </h2>
        <Button onClick={() => { resetForm(); setIsFormOpen(!isFormOpen); }} className="flex items-center gap-2">
          {isFormOpen ? <X className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          {isFormOpen ? "Close" : "Add Testimonial"}
        </Button>
      </div>

      {isFormOpen && (
        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="glass-card p-6">
          <h3 className="text-lg font-medium text-foreground mb-4">
            {editingId ? "Edit Testimonial" : "New Testimonial"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Client Name *</Label>
                <Input value={formData.client_name} onChange={(e) => setFormData({ ...formData, client_name: e.target.value })} placeholder="e.g. Sarah Johnson" required maxLength={100} />
              </div>
              <div className="space-y-2">
                <Label>Client Role *</Label>
                <Input value={formData.client_role} onChange={(e) => setFormData({ ...formData, client_role: e.target.value })} placeholder="e.g. CEO, TechStart Inc." required maxLength={150} />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Feedback *</Label>
              <Textarea value={formData.feedback} onChange={(e) => setFormData({ ...formData, feedback: e.target.value })} placeholder="What did the client say..." required maxLength={1000} rows={4} />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Avatar URL (optional)</Label>
                <Input type="url" value={formData.avatar_url} onChange={(e) => setFormData({ ...formData, avatar_url: e.target.value })} placeholder="https://example.com/avatar.jpg" />
              </div>
              <div className="space-y-2">
                <Label>Rating</Label>
                <div className="flex gap-1 pt-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({ ...formData, rating: star })}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`w-6 h-6 ${star <= formData.rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isPending}>
                {isPending ? <><Loader2 className="w-4 h-4 animate-spin mr-2" />Saving...</> : editingId ? "Update" : "Save Testimonial"}
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
        ) : testimonials?.length === 0 ? (
          <div className="glass-card p-8 text-center">
            <p className="text-muted-foreground">No testimonials yet. Add your first one!</p>
          </div>
        ) : (
          testimonials?.map((t, index) => (
            <motion.div
              key={t.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: index * 0.05 }}
              className="glass-card p-4 flex items-start justify-between gap-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3 mb-1">
                  {t.avatar_url ? (
                    <img src={t.avatar_url} alt={t.client_name} className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-sm font-semibold text-primary">
                      {t.client_name.split(" ").map((n: string) => n[0]).join("").slice(0, 2)}
                    </div>
                  )}
                  <div>
                    <h4 className="font-medium text-foreground">{t.client_name}</h4>
                    <p className="text-xs text-muted-foreground">{t.client_role}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mt-2 line-clamp-2 italic">"{t.feedback}"</p>
                <div className="flex gap-0.5 mt-2">
                  {Array.from({ length: t.rating || 5 }).map((_, i) => (
                    <Star key={i} className="w-3 h-3 fill-primary text-primary" />
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <Button variant="outline" size="icon" onClick={() => startEdit(t)} aria-label="Edit">
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  variant="destructive"
                  size="icon"
                  onClick={() => { if (confirm("Delete this testimonial?")) deleteMutation.mutate(t.id); }}
                  disabled={deleteMutation.isPending}
                  aria-label="Delete"
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

export default TestimonialsAdmin;
