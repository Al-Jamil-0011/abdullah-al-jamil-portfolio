import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2, ExternalLink, X, Upload, Award } from "lucide-react";

interface Certificate {
  id: string;
  title: string;
  organization: string | null;
  issue_date: string | null;
  image_url: string | null;
  credential_link: string | null;
  display_order: number | null;
  is_published: boolean | null;
  created_at: string;
  updated_at: string;
}

const CertificatesAdmin = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [organization, setOrganization] = useState("");
  const [issueDate, setIssueDate] = useState("");
  const [credentialLink, setCredentialLink] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const { data: certificates = [], isLoading } = useQuery({
    queryKey: ["admin-certificates"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("certificates")
        .select("*")
        .order("display_order", { ascending: true });
      if (error) throw error;
      return data as Certificate[];
    },
  });

  const resetForm = () => {
    setTitle("");
    setOrganization("");
    setIssueDate("");
    setCredentialLink("");
    setImageFile(null);
    setImagePreview(null);
    setEditingId(null);
    setShowForm(false);
  };

  const uploadImage = async (file: File): Promise<string> => {
    const ext = file.name.split(".").pop();
    const fileName = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage
      .from("certificates")
      .upload(fileName, file, { contentType: file.type });
    if (error) throw error;
    const { data: urlData } = supabase.storage
      .from("certificates")
      .getPublicUrl(fileName);
    return urlData.publicUrl;
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPEG and PNG images are allowed");
      return;
    }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      toast.error("Certificate title is required");
      return;
    }
    setSubmitting(true);
    try {
      let imageUrl: string | null = imagePreview && !imageFile ? imagePreview : null;
      if (imageFile) {
        imageUrl = await uploadImage(imageFile);
      }

      const payload: Record<string, unknown> = {
        title: title.trim(),
        organization: organization.trim() || null,
        issue_date: issueDate || null,
        credential_link: credentialLink.trim() || null,
      };
      if (imageUrl) payload.image_url = imageUrl;

      if (editingId) {
        const { error } = await supabase
          .from("certificates")
          .update(payload as any)
          .eq("id", editingId);
        if (error) throw error;
        toast.success("Certificate updated");
      } else {
        const { error } = await supabase
          .from("certificates")
          .insert([payload as any]);
        if (error) throw error;
        toast.success("Certificate added");
      }

      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      resetForm();
    } catch (err: any) {
      toast.error(err.message || "Failed to save certificate");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("certificates").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-certificates"] });
      queryClient.invalidateQueries({ queryKey: ["certificates"] });
      toast.success("Certificate deleted");
    },
    onError: (err: any) => toast.error(err.message || "Failed to delete"),
  });

  const startEdit = (cert: Certificate) => {
    setEditingId(cert.id);
    setTitle(cert.title);
    setOrganization(cert.organization || "");
    setIssueDate(cert.issue_date || "");
    setCredentialLink(cert.credential_link || "");
    setImagePreview(cert.image_url);
    setImageFile(null);
    setShowForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-foreground">Certificates</h2>
        {!showForm && (
          <Button onClick={() => setShowForm(true)} className="gap-2">
            <Plus className="w-4 h-4" /> Add Certificate
          </Button>
        )}
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="bg-card border border-border/50 rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-foreground">
              {editingId ? "Edit Certificate" : "New Certificate"}
            </h3>
            <Button type="button" variant="ghost" size="icon" onClick={resetForm}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Title *</Label>
              <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Certificate title" required />
            </div>
            <div className="space-y-2">
              <Label>Issuing Organization</Label>
              <Input value={organization} onChange={(e) => setOrganization(e.target.value)} placeholder="e.g. Google, Coursera" />
            </div>
            <div className="space-y-2">
              <Label>Issue Date</Label>
              <Input type="date" value={issueDate} onChange={(e) => setIssueDate(e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label>Credential Link</Label>
              <Input value={credentialLink} onChange={(e) => setCredentialLink(e.target.value)} placeholder="https://..." />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Certificate Image (JPEG/PNG)</Label>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 px-4 py-2 rounded-lg border border-dashed border-border cursor-pointer hover:bg-secondary/30 transition-colors">
                <Upload className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Choose file</span>
                <input type="file" accept="image/jpeg,image/png" className="hidden" onChange={handleImageChange} />
              </label>
              {imagePreview && (
                <img src={imagePreview} alt="Preview" className="h-16 w-24 object-cover rounded-lg border border-border" />
              )}
            </div>
          </div>

          <div className="flex gap-3 pt-2">
            <Button type="submit" disabled={submitting}>
              {submitting ? "Saving..." : editingId ? "Update" : "Add Certificate"}
            </Button>
            <Button type="button" variant="outline" onClick={resetForm}>Cancel</Button>
          </div>
        </form>
      )}

      {isLoading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : certificates.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          <Award className="w-12 h-12 mx-auto mb-3 opacity-50" />
          <p>No certificates yet. Add your first one!</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert) => (
            <div key={cert.id} className="bg-card border border-border/50 rounded-xl overflow-hidden group">
              {cert.image_url ? (
                <img src={cert.image_url} alt={cert.title} className="w-full h-40 object-cover" />
              ) : (
                <div className="w-full h-40 bg-secondary/30 flex items-center justify-center">
                  <Award className="w-10 h-10 text-muted-foreground/40" />
                </div>
              )}
              <div className="p-4 space-y-1">
                <h4 className="font-semibold text-foreground text-sm">{cert.title}</h4>
                {cert.organization && <p className="text-xs text-muted-foreground">{cert.organization}</p>}
                {cert.issue_date && <p className="text-xs text-muted-foreground">{cert.issue_date}</p>}
                <div className="flex gap-2 pt-2">
                  <Button size="sm" variant="outline" onClick={() => startEdit(cert)} className="gap-1">
                    <Pencil className="w-3 h-3" /> Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => deleteMutation.mutate(cert.id)} disabled={deleteMutation.isPending} className="gap-1">
                    <Trash2 className="w-3 h-3" /> Delete
                  </Button>
                  {cert.credential_link && (
                    <a href={cert.credential_link} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="ghost" className="gap-1">
                        <ExternalLink className="w-3 h-3" />
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CertificatesAdmin;
