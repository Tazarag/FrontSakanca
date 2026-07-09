"use client";

import React, { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import AboutSection from "@/components/sections/AboutSection";
import ServicesSection from "@/components/sections/ServiceSection";
import DetailedServicesSection from "@/components/sections/DetailedServiceSection";
import ProjectSection from "@/components/sections/ProjectSection";
import TestimoniSection from "@/components/sections/TestimonialSection";
import ProfileSection from "@/components/sections/ProfileSection";
import GallerySection from "@/components/sections/GallerySection";
import FooterSection from "@/components/layout/Footer";

export default function HomePage() {
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest("a");
      if (!anchor) return;
      const href = anchor.getAttribute("href");
      if (href && href.startsWith("#")) {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          const targetPosition =
            element.getBoundingClientRect().top + window.scrollY;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          let startTime: number | null = null;
          const duration = 1500;
          const ease = (t: number) =>
            t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
          const step = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            window.scrollTo(
              0,
              startPosition + distance * ease(Math.min(elapsed / duration, 1)),
            );
            if (elapsed < duration) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          window.history.pushState(null, "", href);
        }
      }
    };
    document.addEventListener("click", handleAnchorClick);
    return () => document.removeEventListener("click", handleAnchorClick);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in window.history)
      window.history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    if (window.location.hash)
      window.history.replaceState(
        null,
        "",
        window.location.pathname + window.location.search,
      );
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-x-hidden font-sans">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <DetailedServicesSection />
      <ProjectSection />
      <TestimoniSection />
      <ProfileSection />
      <GallerySection />
      <FooterSection />
    </div>
  );
}
