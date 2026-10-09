import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/components/layout/MainLayout";
import EditorialHero from "@/components/home/EditorialHero";
import SelectedWork from "@/components/home/SelectedWork";
import HowIWork from "@/components/home/HowIWork";
import UXCapabilities from "@/components/home/UXCapabilities";
import ExperienceSnapshot from "@/components/home/ExperienceSnapshot";
import ContactSection from "@/components/home/ContactSection";

export const HomePage = () => {
  const location = useLocation();

  // Support smooth scrolling to hash anchors (e.g. /#work, /#process)
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const elem = document.getElementById(elementId);
      if (elem) {
        elem.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [location.hash]);

  return (
    <MainLayout activeSection="" seoSection="about">
      <EditorialHero />
      <SelectedWork />
      <HowIWork />
      <UXCapabilities />
      <ExperienceSnapshot />
      <ContactSection />
    </MainLayout>
  );
};

export default HomePage;
