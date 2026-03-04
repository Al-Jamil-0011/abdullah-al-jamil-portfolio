import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Mail, MapPin, Send, Phone, MessageSquare, Loader2, ExternalLink } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useSiteContent } from "@/hooks/use-site-content";
import { toast } from "sonner";
import mapImage from "@/assets/map-dhaka.jpg";

const ContactContent = () => {
  const { data: contactData } = useSiteContent("contact");
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const lastSubmitRef = useRef<number>(0);

  const email = contactData?.email || "aljamil248@gmail.com";
  const phone = contactData?.phone || "+880 1580881664";
  const location = contactData?.location || "Dhaka, Bangladesh";
  const availability = contactData?.availability || "Open for freelance projects 24/7";
  const mapsLink = contactData?.maps_link || "https://maps.app.goo.gl/9NoaEa57XRUWAQKe9";
  const introText = contactData?.intro_text || "Have a project in mind? Let's work together to bring your ideas to life.";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const now = Date.now();
    if (now - lastSubmitRef.current < 3000) return;
    lastSubmitRef.current = now;
    setIsSubmitting(true);

    try {
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert({ name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() });
      if (dbError) console.error("DB save error:", dbError);

      const { error } = await supabase.functions.invoke('send-contact-email', {
        body: { name: formData.name.trim(), email: formData.email.trim(), message: formData.message.trim() }
      });
      if (error) throw error;

      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          Get in <span className="text-primary">Touch</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">{introText}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.1 }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10"><Mail className="w-5 h-5 text-primary" /></div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Email</h4>
              <a href={`mailto:${email}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{email}</a>
            </div>
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10"><Phone className="w-5 h-5 text-primary" /></div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Phone</h4>
              <a href={`tel:${phone.replace(/\s/g, "")}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">{phone}</a>
            </div>
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.3 }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10"><MapPin className="w-5 h-5 text-primary" /></div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Location</h4>
              <p className="text-sm text-muted-foreground">{location}</p>
            </div>
          </motion.div>

          <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.4 }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10"><MessageSquare className="w-5 h-5 text-primary" /></div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Availability</h4>
              <p className="text-sm text-muted-foreground">{availability}</p>
            </div>
          </motion.div>

          {/* Google Map Preview */}
          <motion.a
            href={mapsLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.5 }}
            className="glass-card-hover block overflow-hidden group cursor-pointer"
            aria-label="View location on Google Maps"
          >
            <div className="relative h-40 overflow-hidden">
              <img src={mapImage} alt={`Map showing ${location}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" loading="lazy" />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 via-card/30 to-transparent" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="p-4 rounded-full bg-card/80 backdrop-blur-sm group-hover:bg-primary/20 transition-colors">
                  <MapPin className="w-8 h-8 text-primary" />
                </div>
              </div>
              <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-medium">
                  <span>Open in Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <p className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">{location}</p>
              <p className="text-xs text-muted-foreground">Click to view on Google Maps</p>
            </div>
          </motion.a>
        </div>

        {/* Contact Form */}
        <motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ duration: 0.4, delay: 0.2 }} className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">Your Name</label>
              <input type="text" id="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="input-field" placeholder="John Doe" required maxLength={100} />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">Email Address</label>
              <input type="email" id="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="input-field" placeholder="john@example.com" required maxLength={255} />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">Your Message</label>
              <textarea id="message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={5} className="input-field resize-none" placeholder="Tell me about your project..." required maxLength={2000} />
            </div>
            <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 animate-spin" /><span>Sending...</span></>
              ) : (
                <><span>Send Message</span><Send className="w-4 h-4" /></>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactContent;
