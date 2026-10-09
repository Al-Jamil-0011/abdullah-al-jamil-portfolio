import { ReactNode } from "react";
import { HeaderNav } from "./HeaderNav";
import { EditorialFooter } from "./EditorialFooter";
import SEOHead from "./SEOHead";

interface MainLayoutProps {
  children: ReactNode;
  activeSection?: string;
  seoSection?: string;
}

export const MainLayout = ({ children, activeSection, seoSection = "about" }: MainLayoutProps) => {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col selection:bg-accent/20 selection:text-foreground">
      <SEOHead section={seoSection} />

      {/* Accessible Skip Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-accent"
      >
        Skip to main content
      </a>

      {/* Sticky Header Navigation */}
      <HeaderNav activeSection={activeSection} />

      {/* Primary Page Content (Document-level vertical scroll) */}
      <main id="main-content" className="flex-1 w-full pt-20 md:pt-24" role="main">
        {children}
      </main>

      {/* Minimal Editorial Footer */}
      <EditorialFooter />
    </div>
  );
};

export default MainLayout;
