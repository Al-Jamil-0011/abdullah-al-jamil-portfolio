import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, Loader2, ArrowUpRight, Copy, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const lastSubmitRef = useRef<number>(0);

  const email = "aljamil248@gmail.com";
  const phone = "+880 1580881664";
  const location = "Dhaka, Bangladesh";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Try sending via edge function
      const { error: fnError } = await supabase.functions.invoke("send-contact-email", {
        body: {
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
        },
      });

      // 2. Also record in contact_messages table if edge function fails or as audit
      if (fnError) {
        const { error: dbError } = await supabase
          .from("contact_messages")
          .insert({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
          });
        if (dbError) throw dbError;
      }

      toast.success("Message sent successfully! I'll reply within 24 hours.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      toast.error(err?.message || "Failed to send message. Please email directly at aljamil248@gmail.com");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 border-t border-border/80">
      <div className="container-editorial space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-2xl">
          <span className="section-eyebrow">
            Get in Touch • 05
          </span>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-[1.15]">
            Have a product challenge or an opportunity to collaborate? Let's talk.
          </h2>
          <p className="editorial-lead text-sm sm:text-base">
            I'm always open to discussing new digital products, design systems, UX audits, or full-time product design roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Direct Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="swiss-card p-6 sm:p-7 space-y-5">
              <h3 className="font-display text-lg font-bold text-foreground">
                Direct Channels
              </h3>

              {/* Email item */}
              <div className="flex items-start justify-between gap-3 p-3.5 rounded-xl bg-secondary/50 border border-border/60">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-card text-accent">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </div>

                <button
                  onClick={handleCopyEmail}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-card"
                  aria-label="Copy email address"
                >
                  {copiedEmail ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              {/* Phone item */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-secondary/50 border border-border/60">
                <div className="p-2 rounded-lg bg-card text-accent">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                    Phone / WhatsApp
                  </span>
                  <a
                    href="tel:+8801580881664"
                    className="text-sm font-medium text-foreground hover:text-accent transition-colors"
                  >
                    {phone}
                  </a>
                </div>
              </div>

              {/* Location item */}
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-secondary/50 border border-border/60">
                <div className="p-2 rounded-lg bg-card text-accent">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[11px] font-mono text-muted-foreground uppercase block">
                    Location & Timezone
                  </span>
                  <p className="text-sm font-medium text-foreground">
                    {location} (UTC+6)
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links Cards */}
            <div className="grid grid-cols-2 gap-4">
              <a
                href="https://www.linkedin.com/in/al-jamil-b817442a2/"
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-card p-4 flex items-center justify-between hover:border-accent group"
              >
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase">Network</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent">LinkedIn</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              <a
                href="https://www.behance.net/abdullahaljamil1"
                target="_blank"
                rel="noopener noreferrer"
                className="swiss-card p-4 flex items-center justify-between hover:border-accent group"
              >
                <div>
                  <p className="text-xs font-mono text-muted-foreground uppercase">Portfolio</p>
                  <p className="text-sm font-semibold text-foreground group-hover:text-accent">Behance</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Contact Message Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="swiss-card p-7 sm:p-9 space-y-5">
              <h3 className="font-display text-lg font-bold text-foreground">
                Send a Direct Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Sarah Jenkins"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                    Your Email *
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    maxLength={255}
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="sarah@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-muted-foreground block">
                  Project or Opportunity Details *
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  maxLength={2000}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell me a bit about your product, timeline, or design challenge..."
                  className="w-full px-4 py-3 rounded-xl border border-border bg-secondary/50 text-foreground text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-editorial-primary w-full sm:w-auto text-sm !px-8 !py-3.5 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-4 h-4 ml-2" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
