"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { resolveImage } from "@/lib/api";

export default function Navbar() {
  const { language, setLanguage, t } = useLanguage();
  const { data: settings } = useSiteSettings();
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const handleScroll = () => {
      setIsNavbarVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 5000);
    };

    timeoutId = setTimeout(() => {
      setIsNavbarVisible(false);
    }, 5000);

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Resolusi logo dari API atau fallback ke logo bawaan
  const logoUrl = settings?.site_logo
    ? resolveImage(settings.site_logo)
    : resolveImage("/storage/logos/logoSakanca.webp");

  const brandName = settings?.site_name || "Sakanca Alliance";

  return (
    <header
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-6 pt-6 z-50 transition-all duration-500 ease-out ${
        isNavbarVisible || isHovered
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-4 pointer-events-none"
      }`}
    >
      <div className="max-w-7xl mx-auto bg-[#0a0c14]/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        {/* Brand Logo & Name */}
        <a href="#home" className="flex items-center space-x-3 shrink-0 group">
          <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-sm group-hover:border-teal-400/50 transition-colors duration-300">
            <Image
              src={logoUrl}
              alt={`${brandName} Logo`}
              fill
              className="object-cover"
              unoptimized
            />
          </div>
          <span className="text-xl font-bold text-white tracking-wide whitespace-nowrap group-hover:text-teal-300 transition-colors duration-300">
            {brandName}
          </span>
        </a>

        {/* Navigation Links & Language Switcher */}
        <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto no-scrollbar py-1 pr-1 max-w-[75%] md:max-w-none">
          {(
            [
              ["#home", t("nav_home")],
              ["#about", t("nav_about")],
              ["#services", t("nav_service")],
              ["#project", t("nav_project")],
              ["#testimonial", t("nav_testimonial")],
              ["#profile", t("nav_contact")],
              ["#gallery", t("nav_gallery")],
            ] as [string, string][]
          ).map(([href, label]) => (
            <a
              key={href}
              href={href}
              className="bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300 hover:text-teal-300 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap"
            >
              {label}
            </a>
          ))}

          {/* Switcher Bahasa */}
          <div className="flex items-center bg-white/5 border border-white/10 p-0.5 rounded-full text-[10px] font-bold text-gray-400 shrink-0">
            {(["ID", "EN", "JPN"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setLanguage(lang)}
                className={`${
                  language === lang
                    ? "bg-teal-500/30 text-teal-300"
                    : "hover:text-white"
                } px-3 py-1 rounded-full transition-all duration-200 cursor-pointer`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
