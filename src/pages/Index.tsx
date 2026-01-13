import { useState } from "react";
import { ThemeProvider } from "@/hooks/use-theme";
import Sidebar from "@/components/dashboard/Sidebar";
import ProfileCard from "@/components/dashboard/ProfileCard";
import IntroSection from "@/components/dashboard/IntroSection";
import SkillsSection from "@/components/dashboard/SkillsSection";
import AboutContent from "@/components/dashboard/sections/AboutContent";
import ResumeContent from "@/components/dashboard/sections/ResumeContent";
import ProjectsContent from "@/components/dashboard/sections/ProjectsContent";
import BlogsContent from "@/components/dashboard/sections/BlogsContent";
import ContactContent from "@/components/dashboard/sections/ContactContent";

const DashboardLayout = () => {
  const [activeSection, setActiveSection] = useState("about");

  const renderContent = () => {
    switch (activeSection) {
      case "about":
        return (
          <div className="space-y-6">
            <IntroSection />
            <SkillsSection />
          </div>
        );
      case "resume":
        return <ResumeContent />;
      case "projects":
        return <ProjectsContent />;
      case "blogs":
        return <BlogsContent />;
      case "contact":
        return <ContactContent />;
      default:
        return <AboutContent />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="ml-20 md:ml-24 min-h-screen p-4 md:p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-[340px_1fr] gap-6">
            {/* Left Column - Profile Card */}
            <div className="lg:sticky lg:top-6 lg:h-fit">
              <ProfileCard onContactClick={() => setActiveSection("contact")} />
            </div>

            {/* Right Column - Content */}
            <div className="custom-scrollbar">
              {renderContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <DashboardLayout />
    </ThemeProvider>
  );
};

export default Index;
