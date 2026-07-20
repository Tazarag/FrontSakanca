"use client";

import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useProjects } from "@/hooks/useProjects";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { resolveImage } from "@/lib/api";

export default function ProjectSection() {
  const { t, language } = useLanguage();
  const { data: projects, isLoading, error } = useProjects();
  const { data: siteSettings } = useSiteSettings();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = useCallback(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScroll = scrollWidth - clientWidth;
    setScrollProgress(maxScroll <= 0 ? 0 : (scrollLeft / maxScroll) * 100);
  }, []);

  const projectsList = React.useMemo(() => {
    if (!projects) return [];
    return projects
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((p) => ({
        id: p.id,
        name: p.name[language],
        desc: p.description[language],
        image: resolveImage(p.thumbnail),
        category: p.service?.name ?? "",
      }));
  }, [projects, language]);

  // Recalculate progress saat data project selesai dimuat atau window di-resize
  useEffect(() => {
    handleScroll();
    window.addEventListener("resize", handleScroll);
    return () => window.removeEventListener("resize", handleScroll);
  }, [handleScroll, projectsList]);

  if (isLoading) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-white/50">Memuat...</p>
      </section>
    );
  }

  if (error || !projects) {
    return (
      <section className="min-h-screen flex items-center justify-center bg-black">
        <p className="text-red-400">Gagal memuat data project.</p>
      </section>
    );
  }

  return (
    <section
      id="project"
      className="w-full min-h-screen py-24 flex flex-col items-center justify-center select-none relative overflow-hidden"
    >
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        {siteSettings?.projects_section_bg ? (
          <Image
            src={resolveImage(siteSettings.projects_section_bg)}
            alt="Background Projects"
            fill
            className="object-cover opacity-85"
          />
        ) : (
          <div className="absolute inset-0 bg-black" />
        )}
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <h2 className="relative z-10 text-center font-bold text-4xl sm:text-5xl tracking-[0.35em] uppercase text-[#E6DAC3] mb-16 drop-shadow-[0_0_15px_rgba(230,218,195,0.4)] px-6">
        {t("project_title")}
      </h2>

      {/* CONTAINER CARDS DENGAN EVENT ON-SCROLL DEDIKATED */}
      <div
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="relative z-10 w-full flex overflow-x-auto gap-8 py-6 px-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {projectsList.map((project) => {
          return (
            <div
              key={project.id}
              className="flex-shrink-0 w-[290px] sm:w-[350px] h-[590px] sm:h-[660px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-[32px] p-5 flex flex-col items-center snap-center cursor-pointer hover:bg-white/20"
              style={{
                boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
                transition:
                  "transform 300ms ease-out, box-shadow 300ms ease-out",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(-8px)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 24px 64px rgba(0,0,0,0.45)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform =
                  "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 8px 32px rgba(0,0,0,0.25)";
              }}
            >
              <div className="relative shrink-0 w-full h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden mb-6">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="w-full flex flex-col flex-grow items-center text-center">
                <h3 className="w-full font-bold italic text-white text-lg sm:text-xl uppercase mb-4 tracking-wide leading-tight px-2 h-[80px] sm:h-[90px] flex-shrink-0 drop-shadow-md">
                  {project.name}
                </h3>
                <p className="text-white/90 text-xs sm:text-sm leading-relaxed px-3 pb-6">
                  {project.desc}
                </p>
                <p className="text-[#E6DAC3] font-semibold italic text-xs sm:text-sm tracking-wide pb-2 mt-auto drop-shadow-sm">
                  -{project.category}-
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* INDIKATOR SCROLLBAR TRACK & THUMB */}
      <div className="relative z-10 mt-8 flex justify-center w-full px-6">
        <div className="w-[180px] sm:w-[240px] h-[6px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white/70 rounded-full absolute top-0"
            style={{
              width: "35%",
              left: `${scrollProgress * 0.65}%`,
            }}
          />
        </div>
      </div>

      <div className="relative z-10 mt-12 flex justify-center gap-4 w-full px-6">
        <a
          href="#detailed-services"
          className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm"
        >
          <ChevronUp
            size={16}
            className="transform group-hover:-translate-y-1 transition-transform duration-300 text-teal-200"
          />
          <span className="lang-text">{t("btn_back")}</span>
        </a>
        <a
          href="#testimonial"
          className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(28,100,255,0.3)] hover:shadow-[0_0_30px_rgba(28,100,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase"
        >
          <ChevronDown
            size={16}
            className="transform group-hover:translate-y-1 transition-transform duration-300 text-teal-200"
          />
          <span className="lang-text">{t("btn_viewTestimonial")}</span>
        </a>
      </div>
    </section>
  );
}
