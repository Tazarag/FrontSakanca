"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useServices } from "@/hooks/useServices";
import { useDetailedServices } from "@/hooks/useDetailedService";
import { getServiceUiMeta } from "@/lib/serviceUiMeta";
import { resolveImage } from "@/lib/api";

export default function DetailedServicesSection() {
  const { t, language } = useLanguage();
  const { data: services } = useServices();
  const { data: detailedServices, isLoading, error } = useDetailedServices();
  const [activeIndex, setActiveIndex] = useState(0);
  const [bgIndex, setBgIndex] = useState(0);
  const [animate, setAnimate] = useState(true);
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
      { threshold: 0.15 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const servicesDetailList = (detailedServices ?? [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((ds) => {
      const service = services?.find((s) => s.id === ds.service_id);
      const meta = service ? getServiceUiMeta(service) : undefined;
      return {
        id: String(ds.id),
        name: service?.name ?? "",
        titleLine1: ds.title_line1,
        titleLine2: ds.title_line2,
        icon: meta?.icon,
        image: service?.logo ? resolveImage(service.logo) : "",
        bgImage: resolveImage(ds.background_image),
        description: ds.description[language],
      };
    });

  useEffect(() => {
    const handleSelectSlide = (e: Event) => {
      const customEvent = e as CustomEvent;
      if (customEvent.detail && typeof customEvent.detail.index === "number") {
        handleSlideChange(customEvent.detail.index);
      }
    };
    window.addEventListener("select-service-slide", handleSelectSlide);
    return () =>
      window.removeEventListener("select-service-slide", handleSelectSlide);
  }, []);

  function handleSlideChange(newIndex: number) {
    setAnimate(false);
    setBgIndex(newIndex);
    setTimeout(() => {
      setActiveIndex(newIndex);
      setAnimate(true);
    }, 350);
  }

  const nextSlide = () =>
    handleSlideChange((activeIndex + 1) % servicesDetailList.length);
  const prevSlide = () =>
    handleSlideChange(
      (activeIndex - 1 + servicesDetailList.length) % servicesDetailList.length,
    );

  if (isLoading) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-[#0a1334]">
        <p className="text-white/50">Memuat...</p>
      </section>
    );
  }

  if (error || servicesDetailList.length === 0) {
    return (
      <section className="w-full min-h-screen flex items-center justify-center bg-[#0a1334]">
        <p className="text-red-400">Gagal memuat detail layanan.</p>
      </section>
    );
  }

  const activeService = servicesDetailList[activeIndex];
  const ActiveIcon = activeService.icon;

  return (
    <section
      id="detailed-services"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center px-8 md:px-24 py-24 overflow-hidden relative bg-[#0a1334] z-10 border-t border-white/5"
    >
      <div className="absolute inset-0 z-0 overflow-hidden">
        {servicesDetailList.map((service, index) => (
          <div
            key={service.id}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-700 ease-in-out"
            style={{
              backgroundImage: `url('${service.bgImage}')`,
              opacity: index === bgIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-linear-to-b from-black/90 via-[#0a1334]/80 to-black/95 z-0 pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full relative z-10 flex flex-col justify-center min-h-125">
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-24 mb-12">
          <div
            className={`flex flex-col justify-center text-right min-w-70 sm:min-w-[320px] md:min-w-120 transition-all ${animate ? "opacity-100 translate-x-0 scale-100 blur-none duration-1000 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [transition-delay:1000ms]" : "opacity-0 translate-x-[200px] sm:translate-x-[280px] md:translate-x-[360px] scale-75 blur-[8px] duration-[250ms] ease-in"}`}
          >
            <h2 className="text-[#E6DAC3] font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.2] tracking-[0.2em] uppercase select-none drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)] text-right">
              <span className="block">{activeService.titleLine1}</span>
              <span className="block mt-2 text-[#E6DAC3]">
                {activeService.titleLine2}
              </span>
            </h2>
          </div>

          <div
            className={`flex justify-center items-center shrink-0 transition-all ${animate ? "opacity-100 translate-x-0 scale-100 rotate-0 blur-none duration-[1200ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)]" : "opacity-0 translate-x-12 scale-90 rotate-3 blur-[4px] duration-[250ms] ease-in"}`}
          >
            <div className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 bg-transparent border-[2px] border-white/30 rounded-[40px] flex items-center justify-center shadow-[0_0_40px_rgba(255,255,255,0.15),inset_0_0_20px_rgba(255,255,255,0.1)] relative overflow-hidden group hover:scale-105 hover:border-white/50 hover:shadow-[0_0_60px_rgba(255,255,255,0.3),inset_0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500">
              {activeService.image ? (
                <div className="w-full h-full relative flex items-center justify-center">
                  <Image
                    src={activeService.image}
                    alt={`${activeService.name} Logo`}
                    fill
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center w-full h-full p-4">
                  <div className="p-4 rounded-2xl bg-slate-50 text-[#0a1334] shadow-sm transform group-hover:scale-110 transition-transform duration-300">
                    {ActiveIcon && (
                      <ActiveIcon className="w-8 h-8 sm:w-10 sm:h-10 text-[#0a1334]" />
                    )}
                  </div>
                  <span className="text-[#0a1334]/50 font-bold text-xs sm:text-sm tracking-wider uppercase mt-4">
                    Logo
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`max-w-4xl mx-auto w-full mb-8 transition-all ${animate ? "opacity-100 translate-y-0 blur-none duration-[900ms] [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] [transition-delay:1600ms]" : "opacity-0 translate-y-16 blur-[4px] duration-[250ms] ease-in"}`}
        >
          <p className="text-gray-300/90 text-sm sm:text-base md:text-lg leading-[2.2] text-center font-medium tracking-[0.1em] px-4 sm:px-8 lang-text">
            {activeService.description}
          </p>
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-2 md:left-[-80px] top-1/2 -translate-y-1/2 bg-white/5 hover:bg-[#E6DAC3] hover:text-[#0a1334] hover:border-transparent active:scale-95 border border-white/10 rounded-full p-4 text-white transition-all duration-300 z-20 cursor-pointer shadow-xl backdrop-blur-sm"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-2 md:right-[-80px] top-1/2 -translate-y-1/2 bg-white/5 hover:bg-[#E6DAC3] hover:text-[#0a1334] hover:border-transparent active:scale-95 border border-white/10 rounded-full p-4 text-white transition-all duration-300 z-20 cursor-pointer shadow-xl backdrop-blur-sm"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5 sm:w-7 sm:h-7" />
        </button>

        <div className="flex justify-center space-x-3 mt-8">
          {servicesDetailList.map((_, index) => (
            <button
              key={index}
              onClick={() => handleSlideChange(index)}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === activeIndex ? "w-10 bg-[#E6DAC3] shadow-[0_0_8px_rgba(230,218,195,0.6)]" : "w-2 bg-white/20 hover:bg-white/50"}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 pb-20 relative z-20">
          <a
            href="#services"
            className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm"
          >
            <ChevronUp
              size={16}
              className="transform group-hover:-translate-y-1 transition-transform duration-300 text-teal-200"
            />
            <span className="lang-text">{t("btn_back")}</span>
          </a>
          <a
            href="#project"
            className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(28,100,255,0.3)] hover:shadow-[0_0_30px_rgba(28,100,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase"
          >
            <ChevronDown
              size={16}
              className="transform group-hover:translate-y-1 transition-transform duration-300 text-teal-200"
            />
            <span className="lang-text">{t("btn_viewProject")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
