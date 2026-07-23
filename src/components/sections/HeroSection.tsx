"use client";

import React, { useEffect, useState, useRef } from "react";
import HeroSlideshow from "@/components/ui/HeroSlideshow";
import { useLanguage } from "@/context/LanguageContext";
import { useHero } from "@/hooks/useHero";
import { resolveImage } from "@/lib/api";

export default function HeroSection() {
  const { language } = useLanguage();
  const { data: hero, isLoading, error } = useHero();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (isLoading) {
    return (
      <div className="relative min-h-screen w-full flex flex-col justify-center items-start overflow-hidden bg-black px-6 sm:px-12 max-w-7xl mx-auto animate-pulse">
        <div className="h-16 sm:h-24 w-3/4 bg-white/10 rounded-lg mb-5" />
        <div className="h-16 sm:h-24 w-1/2 bg-white/10 rounded-lg mb-8" />
        <div className="h-4 w-full max-w-xl bg-white/10 rounded mb-3" />
        <div className="h-4 w-2/3 max-w-xl bg-white/10 rounded mb-12" />
        <div className="h-14 w-40 bg-white/10 rounded-2xl" />
      </div>
    );
  }

  if (error || !hero) {
    return (
      <div className="relative min-h-screen w-full flex flex-col justify-center items-center overflow-hidden bg-black px-6 text-center">
        <p className="text-white/60 text-sm tracking-wide">
          {error ?? "Konten Hero belum tersedia."}
        </p>
      </div>
    );
  }

  // hero sudah pasti ada di titik ini (sudah lolos loading & error check di atas)
  const resolvedSlides = hero.background_images.map((img) => ({
    ...img,
    src: resolveImage(img.src),
  }));

  return (
    <div
      ref={heroRef}
      className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden"
    >
      <HeroSlideshow slides={resolvedSlides} />

      <div
        className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-10 animate-hero-fade-in"
        style={{
          background:
            "radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)",
          top: "5%",
          left: "-10%",
          transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -12}px)`,
          transition: "transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      <div
        className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-10 animate-hero-fade-in"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)",
          bottom: "0%",
          right: "-5%",
          transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 10}px)`,
          transition: "transform 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />
      <div
        className="absolute w-[280px] h-[280px] rounded-full pointer-events-none z-10 animate-hero-fade-in"
        style={{
          background:
            "radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)",
          top: "38%",
          right: "22%",
          transform: `translate(${mousePos.x * 9}px, ${mousePos.y * -7}px)`,
          transition: "transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      />

      <section
        id="home"
        className="flex-grow flex flex-col justify-center items-start text-left max-w-7xl mx-auto w-full px-6 sm:px-12 pt-28 pb-20 z-20"
        style={{
          transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -3}px)`,
          transition: "transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        }}
      >
        <h1 className="font-heading text-6xl sm:text-8xl font-black tracking-tight mb-5 max-w-5xl text-left leading-[0.9] uppercase animate-hero-slide-up">
          <span
            className="block text-white lang-text"
            style={{ textShadow: "0 0 80px rgba(255,255,255,0.08)" }}
          >
            {hero.title1}
          </span>
          <span
            className="block mt-2 lang-text"
            style={{
              background:
                "linear-gradient(135deg, #818cf8 0%, #a78bfa 35%, #f472b6 70%, #fb923c 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "300% 300%",
              animation: "gradientShift 5s ease infinite",
            }}
          >
            {hero.title2}
          </span>
        </h1>

        <div
          className="mb-6 h-px rounded-full animate-hero-line-grow"
          style={{
            background:
              "linear-gradient(90deg, rgba(99,102,241,0.8), rgba(168,85,247,0.5), transparent)",
          }}
        />

        <p className="text-lg sm:text-xl text-gray-300/90 max-w-xl mb-12 leading-relaxed font-medium tracking-wide lang-text animate-hero-slide-up">
          {hero.subtitle[language]}
        </p>

        <div className="animate-hero-slide-up">
          <a
            href="#about"
            className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-9 py-4 font-bold text-white text-sm tracking-wide cursor-pointer select-none"
            style={{
              background: "linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)",
              boxShadow:
                "0 0 0 1px rgba(99,102,241,0.35), 0 8px 32px rgba(99,102,241,0.3)",
              transition: "box-shadow 0.3s ease, transform 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(99,102,241,0.6), 0 12px 40px rgba(99,102,241,0.55), 0 0 80px rgba(99,102,241,0.2)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(-2px) scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 1px rgba(99,102,241,0.35), 0 8px 32px rgba(99,102,241,0.3)";
              (e.currentTarget as HTMLElement).style.transform =
                "translateY(0) scale(1)";
            }}
          >
            <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
            <span className="lang-text relative z-10">
              {hero.cta_primary.text[language]}
            </span>
            <svg
              className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </section>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none animate-hero-fade-in">
        <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">
          Scroll
        </span>
        <div
          className="w-px h-10 origin-top"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.4), transparent)",
          }}
        />
      </div>
    </div>
  );
}
