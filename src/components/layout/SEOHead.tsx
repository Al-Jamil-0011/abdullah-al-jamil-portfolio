import { Helmet } from "react-helmet-async";

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  canonicalUrl?: string;
  section?: string;
}

const defaultMeta = {
  title: "Abdullah Al Jamil | Product Designer & UX/UI Developer",
  description: "Product Designer, UX/UI Specialist, and Software Developer crafting user-centered digital experiences. 30+ projects, 22+ happy clients. Based in Bangladesh.",
  keywords: "Product Designer, UX Designer, UI Designer, Software Developer, Bangladesh, Freelance Designer",
  ogImage: "/favicon.png",
  ogType: "website",
};

const sectionMeta: Record<string, Partial<typeof defaultMeta>> = {
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
  contact: {
    title: "Contact | Abdullah Al Jamil - Get in Touch",
    description: "Get in touch with Abdullah Al Jamil for freelance design projects, collaborations, or inquiries. Based in Dhaka, Bangladesh.",
    keywords: "Contact Abdullah Al Jamil, Hire UX Designer, Freelance Designer Bangladesh",
  },
};

const SEOHead = ({ section = "about", ...overrides }: SEOHeadProps) => {
  const sectionConfig = sectionMeta[section] || {};
  
  const meta = {
    title: overrides.title || sectionConfig.title || defaultMeta.title,
    description: overrides.description || sectionConfig.description || defaultMeta.description,
    keywords: overrides.keywords || sectionConfig.keywords || defaultMeta.keywords,
    ogImage: overrides.ogImage || sectionConfig.ogImage || defaultMeta.ogImage,
    ogType: overrides.ogType || sectionConfig.ogType || defaultMeta.ogType,
  };

  const currentUrl = typeof window !== "undefined" ? window.location.href : "";

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      <meta name="author" content="Abdullah Al Jamil" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={meta.ogType} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.ogImage} />
      <meta property="og:url" content={currentUrl || overrides.canonicalUrl} />
      <meta property="og:site_name" content="Abdullah Al Jamil Portfolio" />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={meta.title} />
      <meta name="twitter:description" content={meta.description} />
      <meta name="twitter:image" content={meta.ogImage} />
      
      {/* Canonical URL */}
      {overrides.canonicalUrl && <link rel="canonical" href={overrides.canonicalUrl} />}
      
      {/* Preconnect to external domains */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
    </Helmet>
  );
};

export default SEOHead;
