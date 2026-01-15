import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Default route redirects to /about */}
            <Route path="/" element={<Navigate to="/about" replace />} />
            
            {/* SEO-friendly routes */}
            <Route path="/about" element={<Index section="about" />} />
            <Route path="/resume" element={<Index section="resume" />} />
            <Route path="/projects" element={<Index section="projects" />} />
            <Route path="/blogs" element={<Index section="blogs" />} />
            <Route path="/services" element={<Index section="services" />} />
            <Route path="/testimonials" element={<Index section="testimonials" />} />
            <Route path="/contact" element={<Index section="contact" />} />
            
            {/* Catch-all 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
