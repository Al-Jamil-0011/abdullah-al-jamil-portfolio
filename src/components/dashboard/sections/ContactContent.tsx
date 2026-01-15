import { motion } from "framer-motion";
import { useState } from "react";
import { Mail, MapPin, Send, Phone, MessageSquare, Loader2 } from "lucide-react";
const ContactContent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log("Form submitted:", formData);
    setIsSubmitting(false);
    setFormData({
      name: "",
      email: "",
      message: ""
    });
  };
  return <motion.div initial={{
    y: 20,
    opacity: 0
  }} animate={{
    y: 0,
    opacity: 1
  }} transition={{
    duration: 0.5
  }} className="space-y-6">
      {/* Header */}
      <div className="glass-card p-6 md:p-8">
        <h3 className="text-xl font-semibold text-foreground mb-2">
          Get in <span className="text-primary">Touch</span>
        </h3>
        <div className="w-12 h-1 bg-primary rounded-full mb-4" />
        <p className="text-muted-foreground">
          Have a project in mind? Let's work together to bring your ideas to life. 
          I'm always open to discussing new opportunities.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Contact Info */}
        <div className="space-y-4">
          <motion.div initial={{
          x: -20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          duration: 0.4,
          delay: 0.1
        }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Mail className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Email</h4>
              <a href="mailto:hello@abdullahaljamil.com" className="text-sm text-muted-foreground hover:text-primary transition-colors">aljamil248@gmail.com</a>
            </div>
          </motion.div>

          <motion.div initial={{
          x: -20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          duration: 0.4,
          delay: 0.2
        }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Phone</h4>
              <a href="tel:+8801712345678" className="text-sm text-muted-foreground hover:text-primary transition-colors">+880 1580881664</a>
            </div>
          </motion.div>

          <motion.div initial={{
          x: -20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          duration: 0.4,
          delay: 0.3
        }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Location</h4>
              <p className="text-sm text-muted-foreground">
                Dhaka, Bangladesh
              </p>
            </div>
          </motion.div>

          <motion.div initial={{
          x: -20,
          opacity: 0
        }} animate={{
          x: 0,
          opacity: 1
        }} transition={{
          duration: 0.4,
          delay: 0.4
        }} className="glass-card p-5 flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10">
              <MessageSquare className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h4 className="text-foreground font-medium mb-1">Availability</h4>
              <p className="text-sm text-muted-foreground">Open for freelance projects 24/7</p>
            </div>
          </motion.div>
        </div>

        {/* Contact Form */}
        <motion.div initial={{
        x: 20,
        opacity: 0
      }} animate={{
        x: 0,
        opacity: 1
      }} transition={{
        duration: 0.4,
        delay: 0.2
      }} className="glass-card p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
                Your Name
              </label>
              <input type="text" id="name" value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} className="input-field" placeholder="John Doe" required />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                Email Address
              </label>
              <input type="email" id="email" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} className="input-field" placeholder="john@example.com" required />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                Your Message
              </label>
              <textarea id="message" value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} rows={5} className="input-field resize-none" placeholder="Tell me about your project..." required />
            </div>

            <button type="submit" disabled={isSubmitting} className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-70">
              {isSubmitting ? <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </> : <>
                  <span>Send Message</span>
                  <Send className="w-4 h-4" />
                </>}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.div>;
};
export default ContactContent;