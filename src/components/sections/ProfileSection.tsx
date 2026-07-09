"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Mail,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const profiles = [
  {
    id: "tazar",
    name: "TAZAR",
    surname: "Al Ghaffar",
    skills: [
      "After Effects",
      "CapCut Pro",
      "Canva",
      "Next.js",
      "TypeScript",
      "UI/UX",
    ],
    photo: "/images/profile/profileTazar.webp",
    bg: "/images/background/Gallery/Gallery8.webp",
    github: "https://github.com/Tazarag",
    instagram: "https://instagram.com/tazarag_",
    email: "mailto:papatazar@gmail.com",
  },
  {
    id: "hafidz",
    name: "HAFIDZ",
    surname: "CHAIRUL L",
    skills: [
      "Creative Direction",
      "Client Relations",
      "Branding",
      "Graphic Design",
      "Visual Storytelling",
      "Photography",
      "Speaking",
    ],
    photo: "/images/profile/profileTara.webp",
    bg: "/images/background/Gallery/Gallery9.webp",
    github: "https://github.com/lestarahmanh",
    instagram: "https://instagram.com/taraavanjava",
    email: "mailto:lestarahmanh@gmail.com",
  },
  {
    id: "clara",
    name: "CLARA",
    surname: "DELTA GENIOVA",
    skills: [
      "Videography",
      "DaVinci Resolve",
      "After Effects",
      "Color Grading",
      "Drone",
      "Storytelling",
    ],
    photo: "/images/profile/profileClara.webp",
    bg: "/images/background/Gallery/Gallery10.webp",
    github: "https://github.com/Geniova12",
    instagram: "https://instagram.com/claradeltagenio_",
    email: "mailto:geniova12@gmail.com",
  },
  {
    id: "fathir",
    name: "FATHIR",
    surname: "IBNU ABDILLAH",
    skills: [
      "Hardware PC",
      "Laptop Repair",
      "Troubleshooting",
      "Canva",
      "Photoshop",
      "CapCut Pro",
    ],
    photo: "/images/profile/profileFatir.webp",
    bg: "/images/background/Gallery/Gallery7.webp",
    github: "https://github.com/fathiribnuabdillah",
    instagram: "https://instagram.com/fthr_ibnu12",
    email: "mailto:fathiribnu.abdillah12@gmail.com",
  },
  {
    id: "valerian",
    name: "VALERIAN",
    surname: "AHMAD FAUZIAN",
    skills: [
      "Laravel",
      "Next.js",
      "PostgreSQL",
      "Python",
      "UI/UX",
      "System Architecture",
    ],
    photo: "/images/profile/profileVale.webp",
    bg: "/images/background/Gallery/Gallery12.webp",
    github: "https://github.com/valeriaanaf",
    instagram: "https://instagram.com/valeriaanaf",
    email: "mailto:valerianahmdahmad@gmail.com",
  },
  {
    id: "bima",
    name: "BIMA",
    surname: "KHAIRUN NAIM",
    skills: [
      "Blender 3D",
      "CapCut Pro",
      "UI/UX Design",
      "Balsamiq",
      "Canva",
      "Acting",
    ],
    photo: "/images/profile/profileBima.webp",
    bg: "/images/background/Gallery/Gallery11.webp",
    github: "https://github.com/Bimakhaii",
    instagram: "https://instagram.com/bimakhaii",
    email: "mailto:bimakhairun90@gmail.com",
  },
];

export default function ProfileSection() {
  const { t } = useLanguage();
  const [bgVisible, setBgVisible] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setContentVisible(false);

      setTimeout(() => {
        setCurrent(index);
      }, 50);

      setTimeout(() => {
        setContentVisible(true);
        setIsTransitioning(false);
      }, 1000);
    },
    [isTransitioning],
  );

  const next = useCallback(
    () => goTo((current + 1) % profiles.length),
    [current, goTo],
  );
  const prev = useCallback(
    () => goTo((current - 1 + profiles.length) % profiles.length),
    [current, goTo],
  );

  const handlePrev = () => prev();
  const handleNext = () => next();
  const handleDot = (i: number) => goTo(i);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBgVisible(true);
          setTimeout(() => {
            setContentVisible(true);
          }, 1000);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const profile = profiles[current];
  const role = t(`profile_${profile.id}_role`);
  const description1 = t(`profile_${profile.id}_desc1`);
  const description2 = t(`profile_${profile.id}_desc2`);

  return (
    <section
      id="profile"
      ref={sectionRef}
      className="w-full min-h-screen relative flex flex-col justify-center px-8 md:px-20 lg:px-32 py-24 overflow-hidden"
    >
      {profiles.map((p, i) => (
        <div
          key={i}
          className="absolute inset-0 z-0 pointer-events-none select-none"
          style={{
            opacity: bgVisible ? (i === current ? 1 : 0) : 0,
            transition:
              i === current
                ? "opacity 1.8s cubic-bezier(0.25,0.1,0.25,1)"
                : "opacity 0.5s ease",
          }}
        >
          <Image
            src={p.bg}
            alt="Background"
            fill
            className="object-cover object-center"
            priority={i === 0}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
        </div>
      ))}

      <button
        onClick={handlePrev}
        aria-label="Previous profile"
        className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 active:scale-95 backdrop-blur-sm"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={handleNext}
        aria-label="Next profile"
        className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all duration-200 active:scale-95 backdrop-blur-sm"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      <div
        className="absolute top-8 right-10 z-20 text-white/40 text-xs font-mono tracking-widest select-none transition-all duration-1000"
        style={{ opacity: contentVisible ? 1 : 0 }}
      >
        {String(current + 1).padStart(2, "0")} /{" "}
        {String(profiles.length).padStart(2, "0")}
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12 lg:gap-20">
          <div className="flex-1">
            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible
                  ? "translateY(0)"
                  : "translateY(32px)",
                transition: contentVisible
                  ? "opacity 700ms ease-out 0ms, transform 700ms ease-out 0ms"
                  : "none",
              }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white leading-none mb-10 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]">
                {profile.name}
                <br />
                {profile.surname}
              </h1>
            </div>

            <div
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible
                  ? "translateY(0)"
                  : "translateY(32px)",
                transition: contentVisible
                  ? "opacity 700ms ease-out 100ms, transform 700ms ease-out 100ms"
                  : "none",
              }}
            >
              <span className="inline-block text-[10px] font-bold uppercase tracking-widest text-white/50 border border-white/20 rounded-full px-3 py-1 mb-5 lang-text">
                {role}
              </span>
              <p className="text-white/75 text-sm leading-relaxed mb-4 lang-text">
                {description1}
              </p>
              <p className="text-white/75 text-sm leading-relaxed mb-7 lang-text">
                {description2}
              </p>
              <div className="flex flex-wrap gap-2 mb-10">
                {profile.skills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-white/10 border border-white/15 text-white/75 text-[11px] font-medium px-3 py-1.5 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="flex flex-wrap items-center gap-4"
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible
                  ? "translateY(0)"
                  : "translateY(32px)",
                transition: contentVisible
                  ? "opacity 700ms ease-out 200ms, transform 700ms ease-out 200ms"
                  : "none",
              }}
            >
              <a
                href="#project"
                className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm"
              >
                <ChevronUp
                  size={16}
                  className="transform group-hover:-translate-y-1 transition-transform duration-300 text-teal-200"
                />
                <span className="lang-text">{t("btn_back")}</span>
              </a>
              <a
                href="#gallery"
                className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(28,100,255,0.3)] hover:shadow-[0_0_30px_rgba(28,100,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase"
              >
                <ChevronDown
                  size={16}
                  className="transform group-hover:translate-y-1 transition-transform duration-300 text-teal-200"
                />
                <span className="lang-text">{t("btn_viewGallery")}</span>
              </a>
            </div>

            <div className="flex items-center gap-2 mt-6">
              {profiles.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDot(i)}
                  aria-label={`Go to profile ${i + 1}`}
                  className="transition-all duration-300"
                  style={{
                    width: i === current ? "28px" : "8px",
                    height: "8px",
                    borderRadius: "9999px",
                    background:
                      i === current
                        ? "rgba(255,255,255,0.9)"
                        : "rgba(255,255,255,0.3)",
                  }}
                />
              ))}
            </div>
          </div>

          <div
            style={{
              opacity: contentVisible ? 1 : 0,
              transform: contentVisible
                ? "translateY(0) scale(1)"
                : "translateY(40px) scale(0.97)",
              transition: contentVisible
                ? "opacity 900ms ease-out 80ms, transform 900ms ease-out 80ms"
                : "none",
            }}
          >
            <div className="relative w-[260px] sm:w-[320px] lg:w-[360px]">
              <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] border border-white/15">
                <Image
                  src={profile.photo}
                  alt={`${profile.name} ${profile.surname}`}
                  fill
                  className="object-cover object-top transition-opacity duration-500"
                  sizes="(max-width: 640px) 260px, (max-width: 1024px) 320px, 360px"
                />
              </div>
            </div>
          </div>
        </div>

        <div
          className="mt-16 flex items-center justify-start sm:justify-start gap-5"
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? "translateY(0)" : "translateY(24px)",
            transition: contentVisible
              ? "opacity 700ms ease-out 300ms, transform 700ms ease-out 300ms"
              : "none",
          }}
        >
          <a
            href={profiles[current].github || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95"
            aria-label="GitHub"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
              <path d="M9 18c-4.51 2-5-2-7-2" />
            </svg>
          </a>
          <a
            href={profiles[current].instagram || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95"
            aria-label="Instagram"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-6 h-6"
            >
              <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
              <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
            </svg>
          </a>
          <a
            href={profiles[current].email || "#"}
            target="_blank"
            rel="noopener noreferrer"
            className="w-14 h-14 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white transition-all duration-300 backdrop-blur-md hover:-translate-y-1 hover:shadow-[0_10px_20px_rgba(255,255,255,0.1)] active:scale-95"
            aria-label="Email"
          >
            <Mail className="w-6 h-6" />
          </a>
        </div>
      </div>
    </section>
  );
}
