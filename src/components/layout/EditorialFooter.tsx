import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

export const EditorialFooter = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/al-jamil-b817442a2/" },
    { label: "Behance", href: "https://www.behance.net/abdullahaljamil1" },
    { label: "Instagram", href: "https://www.instagram.com/al.jamil.9022" },
    { label: "Facebook", href: "https://www.facebook.com/share/1AAiyinQkK/" },
  ];

  const sitemapLinks = [
    { label: "Selected Work", href: "/#work" },
    { label: "Process", href: "/#process" },
    { label: "Capabilities", href: "/#capabilities" },
    { label: "About Me", href: "/about" },
    { label: "Resume", href: "/resume" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="border-t border-border bg-card/40 py-16 text-muted-foreground" role="contentinfo">
      <div className="container-editorial">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16 pb-12 border-b border-border/70">
          {/* Brand & Positioning */}
          <div className="md:col-span-5 space-y-4">
            <Link to="/" className="inline-block">
              <span className="font-display text-xl font-bold tracking-tight text-foreground">
                Abdullah Al Jamil
              </span>
            </Link>
            <p className="text-sm leading-relaxed max-w-sm text-muted-foreground">
              Product Designer focused on UX, UI, user research, and product thinking — turning complex requirements into clear, useful, and intuitive digital experiences.
            </p>
            <div className="pt-2 text-xs font-mono text-muted-foreground">
              Based in Dhaka, Bangladesh • Available for remote & on-site product collaboration
            </div>
          </div>

          {/* Sitemap Navigation */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {sitemapLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.href}
                    className="hover:text-foreground transition-colors inline-block py-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Verified Channels */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-foreground font-semibold">
              Connect
            </h4>
            <ul className="space-y-2 text-sm">
              {socialLinks.map((channel) => (
                <li key={channel.label}>
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-1.5 hover:text-foreground transition-colors py-0.5"
                  >
                    <span>{channel.label}</span>
                    <ArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </li>
              ))}
              <li className="pt-1">
                <a
                  href="mailto:aljamil248@gmail.com"
                  className="text-xs font-mono text-accent hover:underline"
                >
                  aljamil248@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Metadata */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>© {currentYear} Abdullah Al Jamil. All rights reserved.</p>
          <p className="text-muted-foreground/80">
            Designed with Swiss editorial discipline & modern product craft.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default EditorialFooter;
