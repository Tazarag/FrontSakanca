"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function About() {
  const { t } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <div
      id="about"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center px-8 md:px-24 py-20 overflow-hidden bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: "url('/images/background/About/bgAbout.jpg')" }}
    >
      <div className="absolute inset-0 bg-linear-to-b from-black/90 via-[#0c1947]/50 to-black/95 z-0"></div>
      <div className="max-w-6xl mx-auto w-full relative z-10 mt-16 md:mt-24">
        <div className="flex flex-col md:flex-row items-center md:items-stretch gap-10 md:gap-16 mb-16">
          <div
            className={`w-48 h-48 sm:w-64 sm:h-64 flex items-center justify-center shrink-0 p-4 bg-black/20 backdrop-blur-[2px] border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] ${isVisible ? "animate-fade-in-up-slow [animation-fill-mode:both]" : "opacity-0"}`}
            style={{ animationDelay: isVisible ? "200ms" : "0ms" }}
          >
            <Image
              src="/images/logo/logoSakanca.png"
              alt="Sakanca Logo"
              width={256}
              height={256}
              className="w-full h-full object-contain rounded-2xl"
            />
          </div>
          <div
            className={`flex flex-col justify-center py-4 ${isVisible ? "animate-fade-in-up-slow [animation-fill-mode:both]" : "opacity-0"}`}
            style={{ animationDelay: isVisible ? "800ms" : "0ms" }}
          >
            <h1 className="text-[#E6DAC3] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.4] tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
              <span className="lang-text">{t("about_title1")}</span>
              <br />
              <span className="lang-text">{t("about_title2")}</span>
            </h1>
          </div>
        </div>

        <div
          className={`max-w-5xl ${isVisible ? "animate-fade-in-up-slow [animation-fill-mode:both]" : "opacity-0"}`}
          style={{ animationDelay: isVisible ? "1400ms" : "0ms" }}
        >
          <p className="text-gray-300/90 text-sm sm:text-base md:text-lg leading-[2.2] text-justify md:text-left font-medium tracking-widest drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]">
            <span className="lang-text">
              {t("about_desc1")} {t("about_desc2")}
            </span>
          </p>
        </div>

        {/* Navigation Buttons */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 pb-20 relative z-20">
          <a
            href="#home"
            className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm"
          >
            <ChevronUp
              size={16}
              className="transform group-hover:-translate-y-1 transition-transform duration-300 text-teal-200"
            />
            <span className="lang-text">{t("btn_back")}</span>
          </a>
          <a
            href="#services"
            className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(28,100,255,0.3)] hover:shadow-[0_0_30px_rgba(28,100,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase"
          >
            <ChevronDown
              size={16}
              className="transform group-hover:translate-y-1 transition-transform duration-300 text-teal-200"
            />
            <span className="lang-text">{t("btn_viewService")}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
