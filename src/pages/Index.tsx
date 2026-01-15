import { lazy, Suspense, useEffect, useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ThemeProvider } from "@/hooks/use-theme";
import Sidebar from "@/components/dashboard/Sidebar";
import MobileBottomNav from "@/components/dashboard/MobileBottomNav";
import ProfileCard from "@/components/dashboard/ProfileCard";
import IntroSection from "@/components/dashboard/IntroSection";
import SkillsSection from "@/components/dashboard/SkillsSection";
import SEOHead from "@/components/layout/SEOHead";
import Footer from "@/components/layout/Footer";
import SplashScreen from "@/components/SplashScreen";

// Lazy load non-critical sections for performance
const AboutContent = lazy(() => import("@/components/dashboard/sections/AboutContent"));
const ResumeContent = lazy(() => import("@/components/dashboard/sections/ResumeContent"));
const ProjectsContent = lazy(() => import("@/components/dashboard/sections/ProjectsContent"));
const BlogsContent = lazy(() => import("@/components/dashboard/sections/BlogsContent"));
const ServicesContent = lazy(() => import("@/components/dashboard/sections/ServicesContent"));
const TestimonialsContent = lazy(() => import("@/components/dashboard/sections/TestimonialsContent"));
const ContactContent = lazy(() => import("@/components/dashboard/sections/ContactContent"));

// Loading fallback component
const SectionLoader = () => (
  <div className="flex items-center justify-center min-h-[300px]" role="status" aria-label="Loading content">
    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    <span className="sr-only">Loading...</span>
  </div>
);

interface DashboardLayoutProps {
  section: string;
}

const DashboardLayout = ({ section }: DashboardLayoutProps) => {
  const navigate = useNavigate();

  // Handle section change with URL update
  const handleSectionChange = useCallback((newSection: string) => {
    navigate(`/${newSection}`);
  }, [navigate]);

  // Scroll to top on section change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [section]);

  const renderContent = () => {
    switch (section) {
      case "about":
        return (
          <article className="space-y-6" aria-labelledby="about-heading">
            <h1 id="about-heading" className="sr-only">About Abdullah Al Jamil</h1>
            <IntroSection />
            <SkillsSection />
          </article>
        );
      case "resume":
        return (
          <Suspense fallback={<SectionLoader />}>
            <article aria-labelledby="resume-heading">
              <h1 id="resume-heading" className="sr-only">Resume - Experience & Education</h1>
              <ResumeContent />
            </article>
          </Suspense>
        );
      case "projects":
        return (
          <Suspense fallback={<SectionLoader />}>
            <article aria-labelledby="projects-heading">
              <h1 id="projects-heading" className="sr-only">Featured Projects & Case Studies</h1>
              <ProjectsContent />
            </article>
          </Suspense>
        );
      case "blogs":
        return (
          <Suspense fallback={<SectionLoader />}>
            <article aria-labelledby="blogs-heading">
              <h1 id="blogs-heading" className="sr-only">Blog Posts & Articles</h1>
              <BlogsContent />
            </article>
          </Suspense>
        );
      case "services":
        return (
          <Suspense fallback={<SectionLoader />}>
            <article aria-labelledby="services-heading">
              <h1 id="services-heading" className="sr-only">Professional Services</h1>
              <ServicesContent />
            </article>
          </Suspense>
        );
      case "testimonials":
        return (
          <Suspense fallback={<SectionLoader />}>
            <article aria-labelledby="testimonials-heading">
              <h1 id="testimonials-heading" className="sr-only">Client Testimonials</h1>
              <TestimonialsContent />
            </article>
          </Suspense>
        );
      case "contact":
        return (
          <Suspense fallback={<SectionLoader />}>
            <article aria-labelledby="contact-heading">
              <h1 id="contact-heading" className="sr-only">Contact Information</h1>
              <ContactContent />
            </article>
          </Suspense>
        );
      default:
        return (
          <Suspense fallback={<SectionLoader />}>
            <AboutContent />
          </Suspense>
        );
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead section={section} />
      
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg"
      >
        Skip to main content
      </a>

      {/* Desktop/Tablet Sidebar Navigation */}
      <nav 
        className="hidden md:block" 
        role="navigation" 
        aria-label="Main navigation"
      >
        <Sidebar activeSection={section} onSectionChange={handleSectionChange} />
      </nav>
      
      <main 
        id="main-content"
        className="md:ml-20 lg:ml-24 min-h-screen p-4 md:p-6 lg:p-8 pb-24 md:pb-8"
        role="main"
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[340px_1fr] gap-6">
            {/* Left Column - Profile Card */}
            <aside 
              className="lg:sticky lg:top-6 lg:h-fit"
              aria-label="Profile information"
            >
              <ProfileCard onContactClick={() => handleSectionChange("contact")} />
            </aside>

            {/* Right Column - Content with custom scrollbar */}
            <section className="custom-scrollbar lg:max-h-[calc(100vh-4rem)] lg:overflow-y-auto lg:pr-2">
              {renderContent()}
            </section>
          </div>
          
          {/* Footer */}
          <Footer />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav 
        className="md:hidden" 
        role="navigation" 
        aria-label="Mobile navigation"
      >
        <MobileBottomNav activeSection={section} onSectionChange={handleSectionChange} />
      </nav>
    </div>
  );
};

interface IndexProps {
  section?: string;
}

const Index = ({ section = "about" }: IndexProps) => {
  const [showSplash, setShowSplash] = useState(() => {
    // Check if splash was already shown this session
    if (typeof window !== 'undefined') {
      return !sessionStorage.getItem('splashShown');
    }
    return true;
  });

  const handleSplashComplete = useCallback(() => {
    setShowSplash(false);
    sessionStorage.setItem('splashShown', 'true');
  }, []);

  return (
    <ThemeProvider>
      {showSplash && <SplashScreen onComplete={handleSplashComplete} />}
      <motion.div
        initial={{ opacity: showSplash ? 0 : 1 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: showSplash ? 1.2 : 0 }}
      >
        <DashboardLayout section={section} />
      </motion.div>
    </ThemeProvider>
  );
};

export default Index;
