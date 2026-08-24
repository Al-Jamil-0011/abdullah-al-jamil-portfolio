import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useSiteContent, useUpdateSiteContent } from "@/hooks/use-site-content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, Save, Plus, Trash2, ChevronDown, ChevronUp, Upload } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

interface CollapsibleSectionProps {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

const CollapsibleSection = ({ title, children, defaultOpen = false }: CollapsibleSectionProps) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-4 md:p-6 text-left hover:bg-secondary/30 transition-colors"
      >
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {open ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
      </button>
      {open && <div className="px-4 pb-4 md:px-6 md:pb-6 space-y-4">{children}</div>}
    </div>
  );
};

// ─── Hero Section Editor ───
const HeroEditor = () => {
  const { data, isLoading } = useSiteContent("hero");
  const updateMutation = useUpdateSiteContent();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const handleSave = () => {
    updateMutation.mutate({ sectionKey: "hero", content: form }, {
      onSuccess: () => toast.success("Hero section updated!"),
      onError: () => toast.error("Failed to update"),
    });
  };

  const updateStat = (index: number, field: string, value: string) => {
    const stats = [...form.stats];
    stats[index] = { ...stats[index], [field]: value };
    setForm({ ...form, stats });
  };

  return (
    <CollapsibleSection title="🏠 Hero Section" defaultOpen>
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Headline</label>
          <Input value={form.headline || ""} onChange={e => setForm({ ...form, headline: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Subheadline</label>
          <Textarea value={form.subheadline || ""} onChange={e => setForm({ ...form, subheadline: e.target.value })} rows={3} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Stats</label>
          <div className="space-y-3">
            {form.stats?.map((stat: any, i: number) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 p-3 rounded-lg bg-secondary/30">
                <Input placeholder="Icon (e.g. Briefcase)" value={stat.icon} onChange={e => updateStat(i, "icon", e.target.value)} />
                <Input placeholder="Number (e.g. 30+)" value={stat.number} onChange={e => updateStat(i, "number", e.target.value)} />
                <Input placeholder="Label" value={stat.label} onChange={e => updateStat(i, "label", e.target.value)} />
              </div>
            ))}
          </div>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full sm:w-auto">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Hero
        </Button>
      </div>
    </CollapsibleSection>
  );
};

// ─── About Section Editor ───
const AboutEditor = () => {
  const { data, isLoading } = useSiteContent("about");
  const updateMutation = useUpdateSiteContent();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const handleSave = () => {
    updateMutation.mutate({ sectionKey: "about", content: form }, {
      onSuccess: () => toast.success("About section updated!"),
      onError: () => toast.error("Failed to update"),
    });
  };

  const updateParagraph = (index: number, value: string) => {
    const paragraphs = [...form.paragraphs];
    paragraphs[index] = value;
    setForm({ ...form, paragraphs });
  };

  const addParagraph = () => setForm({ ...form, paragraphs: [...form.paragraphs, ""] });
  const removeParagraph = (i: number) => setForm({ ...form, paragraphs: form.paragraphs.filter((_: any, idx: number) => idx !== i) });

  const updateWhatIDo = (index: number, field: string, value: string) => {
    const items = [...form.what_i_do];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, what_i_do: items });
  };

  const addWhatIDo = () => setForm({ ...form, what_i_do: [...form.what_i_do, { title: "", description: "" }] });
  const removeWhatIDo = (i: number) => setForm({ ...form, what_i_do: form.what_i_do.filter((_: any, idx: number) => idx !== i) });

  return (
    <CollapsibleSection title="📋 About Section">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">About Paragraphs</label>
          {form.paragraphs?.map((p: string, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <Textarea value={p} onChange={e => updateParagraph(i, e.target.value)} rows={2} className="flex-1" />
              <Button variant="ghost" size="icon" onClick={() => removeParagraph(i)} className="text-destructive shrink-0">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addParagraph}><Plus className="w-4 h-4 mr-1" /> Add Paragraph</Button>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">What I Do</label>
          {form.what_i_do?.map((item: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2 p-3 rounded-lg bg-secondary/30">
              <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={item.title} onChange={e => updateWhatIDo(i, "title", e.target.value)} />
                <Textarea placeholder="Description" value={item.description} onChange={e => updateWhatIDo(i, "description", e.target.value)} rows={2} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeWhatIDo(i)} className="text-destructive shrink-0">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addWhatIDo}><Plus className="w-4 h-4 mr-1" /> Add Item</Button>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full sm:w-auto">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save About
        </Button>
      </div>
    </CollapsibleSection>
  );
};

// ─── Resume Section Editor ───
const ResumeEditor = () => {
  const { data, isLoading } = useSiteContent("resume");
  const updateMutation = useUpdateSiteContent();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const handleSave = () => {
    updateMutation.mutate({ sectionKey: "resume", content: form }, {
      onSuccess: () => toast.success("Resume section updated!"),
      onError: () => toast.error("Failed to update"),
    });
  };

  const updateArrayItem = (arrayKey: string, index: number, field: string, value: string) => {
    const items = [...form[arrayKey]];
    items[index] = { ...items[index], [field]: value };
    setForm({ ...form, [arrayKey]: items });
  };

  const addExperience = () => setForm({ ...form, experiences: [...form.experiences, { title: "", company: "", location: "", period: "", description: "" }] });
  const removeExperience = (i: number) => setForm({ ...form, experiences: form.experiences.filter((_: any, idx: number) => idx !== i) });

  const addEducation = () => setForm({ ...form, education: [...form.education, { degree: "", institution: "", period: "", gpa: "", description: "" }] });
  const removeEducation = (i: number) => setForm({ ...form, education: form.education.filter((_: any, idx: number) => idx !== i) });

  const addAchievement = () => setForm({ ...form, achievements: [...form.achievements, { title: "", description: "" }] });
  const removeAchievement = (i: number) => setForm({ ...form, achievements: form.achievements.filter((_: any, idx: number) => idx !== i) });

  const handleResumeUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "application/pdf") {
      toast.error("Only PDF files are allowed");
      return;
    }
    setUploading(true);
    try {
      const path = `resume-${Date.now()}.pdf`;
      const { error } = await supabase.storage.from("resume").upload(path, file, {
        contentType: "application/pdf",
        upsert: true,
      });
      if (error) throw error;
      const next = { ...form, resume_path: path, resume_name: file.name };
      setForm(next);
      updateMutation.mutate({ sectionKey: "resume", content: next }, {
        onSuccess: () => toast.success("Resume PDF uploaded!"),
        onError: () => toast.error("Uploaded but failed to save"),
      });
    } catch (err: any) {
      toast.error(err.message || "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <CollapsibleSection title="📄 Resume Section">
      <div className="space-y-6">
        {/* Resume PDF */}
        <div className="p-3 rounded-lg bg-secondary/30 space-y-2">
          <label className="text-sm font-bold text-foreground block">Resume PDF (opens from the website Resume button)</label>
          {form.resume_path ? (
            <p className="text-xs text-primary break-all">Current file: {form.resume_name || form.resume_path}</p>
          ) : (
            <p className="text-xs text-muted-foreground">No PDF uploaded yet — the button uses the default file.</p>
          )}
          <label className="inline-flex w-full sm:w-auto">
            <input type="file" accept="application/pdf" className="hidden" onChange={handleResumeUpload} disabled={uploading} />
            <span className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2 rounded-md border border-border bg-background text-sm font-medium cursor-pointer hover:bg-secondary/50 transition-colors">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
              {uploading ? "Uploading..." : "Upload Resume PDF"}
            </span>
          </label>
        </div>


        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Experience</label>
          {form.experiences?.map((exp: any, i: number) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30 mb-2 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input placeholder="Title" value={exp.title} onChange={e => updateArrayItem("experiences", i, "title", e.target.value)} />
                <Input placeholder="Company" value={exp.company} onChange={e => updateArrayItem("experiences", i, "company", e.target.value)} />
                <Input placeholder="Location" value={exp.location} onChange={e => updateArrayItem("experiences", i, "location", e.target.value)} />
                <Input placeholder="Period" value={exp.period} onChange={e => updateArrayItem("experiences", i, "period", e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Textarea placeholder="Description" value={exp.description} onChange={e => updateArrayItem("experiences", i, "description", e.target.value)} rows={2} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => removeExperience(i)} className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addExperience}><Plus className="w-4 h-4 mr-1" /> Add Experience</Button>
        </div>

        {/* Education */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Education</label>
          {form.education?.map((edu: any, i: number) => (
            <div key={i} className="p-3 rounded-lg bg-secondary/30 mb-2 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <Input placeholder="Degree" value={edu.degree} onChange={e => updateArrayItem("education", i, "degree", e.target.value)} />
                <Input placeholder="Institution" value={edu.institution} onChange={e => updateArrayItem("education", i, "institution", e.target.value)} />
                <Input placeholder="Period" value={edu.period} onChange={e => updateArrayItem("education", i, "period", e.target.value)} />
                <Input placeholder="GPA" value={edu.gpa} onChange={e => updateArrayItem("education", i, "gpa", e.target.value)} />
              </div>
              <div className="flex gap-2">
                <Textarea placeholder="Description" value={edu.description} onChange={e => updateArrayItem("education", i, "description", e.target.value)} rows={2} className="flex-1" />
                <Button variant="ghost" size="icon" onClick={() => removeEducation(i)} className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
              </div>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addEducation}><Plus className="w-4 h-4 mr-1" /> Add Education</Button>
        </div>

        {/* Achievements */}
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Achievements</label>
          {form.achievements?.map((a: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2 p-3 rounded-lg bg-secondary/30">
              <div className="flex-1 space-y-2">
                <Input placeholder="Title" value={a.title} onChange={e => updateArrayItem("achievements", i, "title", e.target.value)} />
                <Input placeholder="Description" value={a.description} onChange={e => updateArrayItem("achievements", i, "description", e.target.value)} />
              </div>
              <Button variant="ghost" size="icon" onClick={() => removeAchievement(i)} className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addAchievement}><Plus className="w-4 h-4 mr-1" /> Add Achievement</Button>
        </div>

        <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full sm:w-auto">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Resume
        </Button>
      </div>
    </CollapsibleSection>
  );
};

// ─── Contact Section Editor ───
const ContactEditor = () => {
  const { data, isLoading } = useSiteContent("contact");
  const updateMutation = useUpdateSiteContent();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const handleSave = () => {
    updateMutation.mutate({ sectionKey: "contact", content: form }, {
      onSuccess: () => toast.success("Contact info updated!"),
      onError: () => toast.error("Failed to update"),
    });
  };

  return (
    <CollapsibleSection title="📞 Contact Info">
      <div className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Email</label>
            <Input value={form.email || ""} onChange={e => setForm({ ...form, email: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Phone</label>
            <Input value={form.phone || ""} onChange={e => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Location</label>
            <Input value={form.location || ""} onChange={e => setForm({ ...form, location: e.target.value })} />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground mb-1 block">Availability</label>
            <Input value={form.availability || ""} onChange={e => setForm({ ...form, availability: e.target.value })} />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Google Maps Link</label>
          <Input value={form.maps_link || ""} onChange={e => setForm({ ...form, maps_link: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Intro Text</label>
          <Textarea value={form.intro_text || ""} onChange={e => setForm({ ...form, intro_text: e.target.value })} rows={2} />
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full sm:w-auto">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Contact
        </Button>
      </div>
    </CollapsibleSection>
  );
};

// ─── Profile Section Editor ───
const ProfileEditor = () => {
  const { data, isLoading } = useSiteContent("profile");
  const updateMutation = useUpdateSiteContent();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const handleSave = () => {
    updateMutation.mutate({ sectionKey: "profile", content: form }, {
      onSuccess: () => toast.success("Profile updated!"),
      onError: () => toast.error("Failed to update"),
    });
  };

  const updateSocial = (index: number, field: string, value: string) => {
    const links = [...form.social_links];
    links[index] = { ...links[index], [field]: value };
    setForm({ ...form, social_links: links });
  };

  const addSocial = () => setForm({ ...form, social_links: [...(form.social_links || []), { platform: "", url: "" }] });
  const removeSocial = (i: number) => setForm({ ...form, social_links: form.social_links.filter((_: any, idx: number) => idx !== i) });

  return (
    <CollapsibleSection title="👤 Profile Card">
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Name</label>
          <Input value={form.name || ""} onChange={e => setForm({ ...form, name: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-1 block">Title / Subtitle</label>
          <Input value={form.title || ""} onChange={e => setForm({ ...form, title: e.target.value })} />
        </div>
        <div>
          <label className="text-sm font-medium text-foreground mb-2 block">Social Links</label>
          {form.social_links?.map((link: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2">
              <Input placeholder="Platform (e.g. LinkedIn)" value={link.platform} onChange={e => updateSocial(i, "platform", e.target.value)} className="w-1/3" />
              <Input placeholder="URL" value={link.url} onChange={e => updateSocial(i, "url", e.target.value)} className="flex-1" />
              <Button variant="ghost" size="icon" onClick={() => removeSocial(i)} className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addSocial}><Plus className="w-4 h-4 mr-1" /> Add Link</Button>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full sm:w-auto">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Profile
        </Button>
      </div>
    </CollapsibleSection>
  );
};

// ─── Skills Section Editor ───
const SkillsEditor = () => {
  const { data, isLoading } = useSiteContent("skills");
  const updateMutation = useUpdateSiteContent();
  const [form, setForm] = useState<any>(null);

  useEffect(() => { if (data) setForm(data); }, [data]);

  if (isLoading || !form) return <Loader2 className="w-6 h-6 animate-spin text-primary mx-auto" />;

  const handleSave = () => {
    updateMutation.mutate({ sectionKey: "skills", content: form }, {
      onSuccess: () => toast.success("Skills updated!"),
      onError: () => toast.error("Failed to update"),
    });
  };

  const updateSkill = (index: number, field: string, value: string | number) => {
    const skills = [...form.core_skills];
    skills[index] = { ...skills[index], [field]: value };
    setForm({ ...form, core_skills: skills });
  };

  const addSkill = () => setForm({ ...form, core_skills: [...form.core_skills, { name: "", percentage: 50, icon: "Code2" }] });
  const removeSkill = (i: number) => setForm({ ...form, core_skills: form.core_skills.filter((_: any, idx: number) => idx !== i) });

  return (
    <CollapsibleSection title="🎯 Skills">
      <div className="space-y-4">
        <div>
          <label className="text-sm font-bold text-foreground mb-2 block">Core Skills</label>
          {form.core_skills?.map((skill: any, i: number) => (
            <div key={i} className="flex gap-2 mb-2 p-3 rounded-lg bg-secondary/30 items-center">
              <Input placeholder="Icon" value={skill.icon} onChange={e => updateSkill(i, "icon", e.target.value)} className="w-24" />
              <Input placeholder="Name" value={skill.name} onChange={e => updateSkill(i, "name", e.target.value)} className="flex-1" />
              <Input type="number" min={0} max={100} value={skill.percentage} onChange={e => updateSkill(i, "percentage", parseInt(e.target.value) || 0)} className="w-20" />
              <Button variant="ghost" size="icon" onClick={() => removeSkill(i)} className="text-destructive shrink-0"><Trash2 className="w-4 h-4" /></Button>
            </div>
          ))}
          <Button variant="outline" size="sm" onClick={addSkill}><Plus className="w-4 h-4 mr-1" /> Add Skill</Button>
        </div>
        <Button onClick={handleSave} disabled={updateMutation.isPending} className="w-full sm:w-auto">
          {updateMutation.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
          Save Skills
        </Button>
      </div>
    </CollapsibleSection>
  );
};

// ─── Main CMS Admin Component ───
const SiteContentAdmin = () => {
  return (
    <div className="space-y-4">
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-xl font-bold text-foreground mb-1">Content Management</h2>
        <p className="text-sm text-muted-foreground">Edit all portfolio website content from here.</p>
      </motion.div>

      <ProfileEditor />
      <HeroEditor />
      <AboutEditor />
      <ResumeEditor />
      <ContactEditor />
      <SkillsEditor />
    </div>
  );
};

export default SiteContentAdmin;
