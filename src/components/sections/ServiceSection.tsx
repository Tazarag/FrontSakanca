"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Camera, Compass, Code, Car, Cpu, Heart } from "lucide-react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

const servicesList = [
  {
    id: "visual",
    nameKey: "service_visual",
    icon: Camera,
    image: "/images/logo/logoSakancaVisual.png",
    color: "from-amber-400 to-orange-500",
    col: "left",
  },
  {
    id: "auto",
    nameKey: "service_auto",
    icon: Car,
    image: "/images/logo/logoSakancaAuto.png",
    color: "from-blue-400 to-indigo-600",
    col: "right",
  },
  {
    id: "escape",
    nameKey: "service_escape",
    icon: Compass,
    image: "/images/logo/logoSakancaEscape.png",
    color: "from-emerald-400 to-teal-600",
    col: "left",
  },
  {
    id: "tech",
    nameKey: "service_tech",
    icon: Cpu,
    image: "/images/logo/logoSakancaTech.png",
    color: "from-cyan-400 to-blue-500",
    col: "right",
  },
  {
    id: "dev",
    nameKey: "service_dev",
    icon: Code,
    image: "/images/logo/logoSakancadev.png",
    color: "from-pink-500 to-purple-600",
    col: "left",
  },
  {
    id: "pet",
    nameKey: "service_pet",
    icon: Heart,
    image: "/images/logo/logoSakancaPet.png",
    color: "from-rose-400 to-red-500",
    col: "right",
  },
];

export default function ServicesSection() {
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
      { threshold: 0.1 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-24 overflow-hidden relative z-10"
    >
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/background/Gallery/Gallery1.jpg"
          alt="Background"
          fill
          className="object-cover opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-linear-to-b from-black/75 via-[#0c1947]/45 to-black/80"></div>
      </div>

      <div className="max-w-6xl mx-auto w-full relative z-10">
        <div
          className={`text-center mb-20 ${isVisible ? "animate-fade-in-up-slow [animation-fill-mode:both]" : "opacity-0"}`}
          style={{ animationDelay: "100ms" }}
        >
          <h2 className="text-[#E6DAC3] font-bold text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
            <span className="lang-text">{t("service_title")}</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">
          {servicesList.map((service, index) => {
            const Icon = service.icon;
            const logoDelay = `${300 + Math.floor(index / 2) * 200}ms`;
            const contentDelay = `${300 + Math.floor(index / 2) * 200 + 800}ms`;
            const serviceName = t(service.nameKey);

            if (service.col === "left") {
              return (
                <div
                  key={service.id}
                  className="flex items-center relative gap-4"
                >
                  <div
                    className={`w-28 h-28 sm:w-36 sm:h-36 bg-white/15 backdrop-blur-md rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center border-2 border-white/25 shadow-[inset_0_4px_8px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.45)] z-10 shrink-0 transform-gpu hover:scale-105 transition-all duration-300 group ${isVisible ? "animate-logo-entry [animation-fill-mode:both]" : "opacity-0"} overflow-hidden [will-change:transform]`}
                    style={{ animationDelay: logoDelay }}
                  >
                    {service.image ? (
                      <div className="w-full h-full relative p-2 flex items-center justify-center">
                        <Image
                          src={service.image}
                          alt={`${serviceName} Logo`}
                          fill
                          className="object-contain p-4 rounded-[24px] sm:rounded-[32px]"
                        />
                      </div>
                    ) : (
                      <>
                        <div
                          className={`p-3 rounded-2xl bg-linear-to-br ${service.color} text-white shadow-md transform group-hover:rotate-6 transition-transform duration-300`}
                        >
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <span className="text-white/40 font-bold text-[9px] sm:text-[11px] tracking-wider uppercase mt-2">
                          Logo
                        </span>
                      </>
                    )}
                  </div>

                  <div
                    className={`flex flex-col gap-3 -ml-10 sm:-ml-12 z-0 flex-grow ${isVisible ? "animate-slide-out-right [animation-fill-mode:both]" : "opacity-0"}`}
                    style={{ animationDelay: contentDelay }}
                  >
                    <div className="bg-white border border-white/20 rounded-full py-2.5 sm:py-3.5 pl-14 sm:pl-16 pr-6 sm:pr-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:bg-white/90 transition-colors duration-300 transform-gpu [will-change:transform]">
                      <span className="text-[#0c1947] font-bold text-sm sm:text-lg tracking-wider block truncate lang-text">
                        {serviceName}
                      </span>
                    </div>
                    <div className="pl-14 sm:pl-16">
                      <a
                        href="#detailed-services"
                        onClick={() => {
                          const event = new CustomEvent(
                            "select-service-slide",
                            { detail: { index } },
                          );
                          window.dispatchEvent(event);
                        }}
                        className="bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold text-[10px] sm:text-xs px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_4px_15px_rgba(28,100,255,0.4)] active:scale-95 transition-all duration-150 inline-block text-center cursor-pointer"
                      >
                        <span className="lang-text">{t("btn_moreAbout")}</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            } else {
              return (
                <div
                  key={service.id}
                  className="flex items-center relative gap-4 justify-end"
                >
                  <div
                    className={`flex flex-col gap-3 -mr-10 sm:-mr-12 z-0 flex-grow text-right items-end ${isVisible ? "animate-slide-out-left [animation-fill-mode:both]" : "opacity-0"}`}
                    style={{ animationDelay: contentDelay }}
                  >
                    <div className="bg-white border border-white/20 rounded-full py-2.5 sm:py-3.5 pr-14 sm:pr-16 pl-6 sm:pl-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:bg-white/90 transition-colors duration-300 w-full text-right transform-gpu [will-change:transform]">
                      <span className="text-[#0c1947] font-bold text-sm sm:text-lg tracking-wider block truncate lang-text">
                        {serviceName}
                      </span>
                    </div>
                    <div className="pr-14 sm:pr-16">
                      <a
                        href="#detailed-services"
                        onClick={() => {
                          const event = new CustomEvent(
                            "select-service-slide",
                            { detail: { index } },
                          );
                          window.dispatchEvent(event);
                        }}
                        className="bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold text-[10px] sm:text-xs px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_4px_15px_rgba(28,100,255,0.4)] active:scale-95 transition-all duration-150 inline-block text-center cursor-pointer"
                      >
                        <span className="lang-text">{t("btn_moreAbout")}</span>
                      </a>
                    </div>
                  </div>

                  <div
                    className={`w-28 h-28 sm:w-36 sm:h-36 bg-white/15 backdrop-blur-md rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center border-2 border-white/25 shadow-[inset_0_4px_8px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.45)] z-10 shrink-0 transform-gpu hover:scale-105 transition-all duration-300 group ${isVisible ? "animate-logo-entry [animation-fill-mode:both]" : "opacity-0"} overflow-hidden [will-change:transform]`}
                    style={{ animationDelay: logoDelay }}
                  >
                    {service.image ? (
                      <div className="w-full h-full relative p-2 flex items-center justify-center">
                        <Image
                          src={service.image}
                          alt={`${serviceName} Logo`}
                          fill
                          className="object-contain p-4 rounded-[24px] sm:rounded-[32px]"
                        />
                      </div>
                    ) : (
                      <>
                        <div
                          className={`p-3 rounded-2xl bg-linear-to-br ${service.color} text-white shadow-md transform group-hover:-rotate-6 transition-transform duration-300`}
                        >
                          <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                        </div>
                        <span className="text-white/40 font-bold text-[9px] sm:text-[11px] tracking-wider uppercase mt-2">
                          Logo
                        </span>
                      </>
                    )}
                  </div>
                </div>
              );
            }
          })}
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
            <span className="lang-text">{t("btn_viewDetService")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
