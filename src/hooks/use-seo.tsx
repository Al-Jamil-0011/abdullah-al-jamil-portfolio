import { useEffect } from "react";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
}

const defaultSEO: SEOProps = {
  title: "Abdullah Al Jamil | Product Designer & UX/UI Developer",
  description: "Product Designer, UX/UI Specialist, and Software Developer crafting user-centered digital experiences. 30+ projects, 22+ happy clients. Based in Bangladesh.",
  keywords: "Product Designer, UX Designer, UI Designer, Software Developer, Bangladesh, Freelance Designer",
  ogImage: "/favicon.png",
  ogType: "website",
};

const seoConfig: Record<string, SEOProps> = {
  about: {
    title: "About | Abdullah Al Jamil - Product Designer",
    description: "Learn about Abdullah Al Jamil, a passionate UX/UI designer and software developer creating user-centered digital experiences.",
    keywords: "About Abdullah Al Jamil, Product Designer Bangladesh, UX Designer Background",
  },
  resume: {
    title: "Resume | Abdullah Al Jamil - Experience & Skills",
    description: "Professional experience, education, and certifications of Abdullah Al Jamil. Sr. UX/UI Designer with expertise in product design and development.",
    keywords: "Abdullah Al Jamil Resume, UX Designer Experience, Product Designer Portfolio",
  },
  projects: {
    title: "Projects | Abdullah Al Jamil - Case Studies & Work",
    description: "Explore featured projects and case studies by Abdullah Al Jamil. Real-world UX/UI design solutions and software development work.",
    keywords: "UX Design Projects, UI Design Portfolio, Case Studies Bangladesh",
  },
  blogs: {
    title: "Blog | Abdullah Al Jamil - Design Insights",
    description: "Read design insights, UX tips, and industry thoughts from Abdullah Al Jamil. Stay updated with the latest in product design.",
    keywords: "UX Design Blog, Product Design Articles, Design Insights",
  },
  services: {
    title: "Services | Abdullah Al Jamil - Professional Design",
    description: "Professional UI/UX Design, Product Design, Frontend Development, and Design Systems services by Abdullah Al Jamil.",
    keywords: "UX Design Services, Product Design Consultation, Frontend Development",
  },
  testimonials: {
    title: "Testimonials | Abdullah Al Jamil - Client Reviews",
    description: "Read what clients say about working with Abdullah Al Jamil. Testimonials and reviews from satisfied partners.",
    keywords: "Client Testimonials, UX Designer Reviews, Design Feedback",
  },
  contact: {
    title: "Contact | Abdullah Al Jamil - Get in Touch",
    description: "Get in touch with Abdullah Al Jamil for freelance design projects, collaborations, or inquiries. Based in Dhaka, Bangladesh.",
    keywords: "Contact Abdullah Al Jamil, Hire UX Designer, Freelance Designer Bangladesh",
  },
};

export const useSEO = (section: string = "about") => {
  useEffect(() => {
    const config = seoConfig[section] || defaultSEO;
    
    // Update document title
    document.title = config.title || defaultSEO.title!;
    
    // Update meta tags
    updateMetaTag("description", config.description || defaultSEO.description!);
    updateMetaTag("keywords", config.keywords || defaultSEO.keywords!);
    
    // Update Open Graph tags
    updateMetaProperty("og:title", config.title || defaultSEO.title!);
    updateMetaProperty("og:description", config.description || defaultSEO.description!);
    updateMetaProperty("og:image", config.ogImage || defaultSEO.ogImage!);
    updateMetaProperty("og:type", config.ogType || defaultSEO.ogType!);
    updateMetaProperty("og:url", window.location.href);
    
    // Update Twitter Card tags
    updateMetaTag("twitter:title", config.title || defaultSEO.title!, "name");
    updateMetaTag("twitter:description", config.description || defaultSEO.description!, "name");
    updateMetaTag("twitter:image", config.ogImage || defaultSEO.ogImage!, "name");
    
    // Update canonical URL
    updateCanonicalUrl(config.canonicalUrl || window.location.href);
    
  }, [section]);
};

const updateMetaTag = (name: string, content: string, attribute: "name" | "property" = "name") => {
  let meta = document.querySelector(`meta[${attribute}="${name}"]`);
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute(attribute, name);
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", content);
};

const updateMetaProperty = (property: string, content: string) => {
  updateMetaTag(property, content, "property");
};

const updateCanonicalUrl = (url: string) => {
  let link = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
  if (!link) {
    link = document.createElement("link");
    link.setAttribute("rel", "canonical");
    document.head.appendChild(link);
  }
  link.setAttribute("href", url);
};

export { seoConfig };
