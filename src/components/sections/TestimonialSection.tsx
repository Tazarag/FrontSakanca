"use client";

import React, { useState, useCallback } from "react";
import {
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface Testimonial {
  id: number;
  content: string;
  client_name: string;
  rating: number;
}

const baseTestimonials: Omit<Testimonial, "id">[] = [
  {
    content: "Tampilan web-nya classy banget! Flow-nya enak, navigasi dari halaman ke halaman mulus. Baru kali ini nemu web yang desainnya senyaman ini.",
    client_name: "@EdyPamungkas",
    rating: 5,
  },
  {
    content: "Gacorr, ini web loading-nya cepet banget! Fitur-fitur yang ada di dalamnya juga fungsional dan nggak bikin bingung. Developer-nya juara sih.",
    client_name: "@Baktisakti",
    rating: 5,
  },
  {
    content: "Suka banget sama interface-nya. Modern dan minimalis, bener-bener enak dilihat lama lama. User experiencenya dapet banget, nggak bikin pusing.",
    client_name: "@Br4mast4",
    rating: 4,
  },
  {
    content: "awalnya buka web di desktop trus pas buka webnya di mobile, tampilannya tetep rapi. Responsive nya jempolan, nggak ada elemen yang kepotong. Mantap banget buat dev nya",
    client_name: "@citradwi",
    rating: 5,
  },
  {
    content: "Struktur data di web ini rapi ya, mau cari info apa aja gampang ketemu. Backendnya kayaknya solid banget karena nggak pernah kerasa lag.",
    client_name: "@Sari4330",
    rating: 5,
  },
  {
    content: "Desainnya estetik, pemilihan font sama warnanya bikin web ini kelihatan mahal. Clean banget, beda sama web lain yang terlalu ramai setuju banget sama yg kaya ginii",
    client_name: "@Dikaprazz",
    rating: 5,
  },
  {
    content: "Pelayanan dari sistem webnya bagus, proses dari awal sampai bagian web paling akhir cepet banget nggak ada error. Problem solving-nya bener-bener dipikirin.",
    client_name: "@Kurniaa_fian",
    rating: 4,
  },
  {
    content: "Fitur pencariannya akurat. Sering banget pakai web ini buat cari refrensi, dan sejauh ini performanya stabil banget. Sangat membantu produktivitas guee",
    client_name: "@DanielDiJakarta",
    rating: 5,
  },
  {
    content: "Integrasi datanya cepet banget, update an terbaru selalu sinkron. Bener-bener terstruktur, pengerjaannya pasti niat banget nih yang buat.",
    client_name: "@indahPratiwi",
    rating: 5,
  },
  {
    content: "Tampilannya simpel tapi fungsional. Jarang nemu web yang UI nya seintuitif ini. Overall, sangat memuaskan buat pengalaman pengguna kayak gue",
    client_name: "@ahmdHad1",
    rating: 5,
  },
];

// Use testimonials directly with ratings defined per item
const testimonials: Testimonial[] = baseTestimonials.map((t, i) => ({
  id: i + 1,
  ...t,
}));

export default function TestimoniSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(2);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  }, []);

  const handlePrev = useCallback(() => {
    setCurrentIndex(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length,
    );
  }, []);

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    if ("touches" in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };

  const handleDragEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    let endX = 0;
    if ("changedTouches" in e) {
      endX = e.changedTouches[0].clientX;
    } else {
      endX = (e as React.MouseEvent).clientX;
    }

    const diff = startX - endX;

    if (diff > 50) {
      handleNext();
    } else if (diff < -50) {
      handlePrev();
    }
  };

  return (
    <section
      id="testimoni"
      className="w-full min-h-screen bg-[#0B122A] py-24 flex flex-col items-center justify-center overflow-hidden select-none"
    >
      {/* Title */}
      <h2 className="text-center font-bold text-4xl sm:text-5xl tracking-[0.35em] uppercase text-[#E6DAC3] mb-20 drop-shadow-[0_0_15px_rgba(230,218,195,0.4)] px-6">
        {t("testimonial_title")}
      </h2>

      {/* Slider Container */}
      <div
        className="relative w-full max-w-6xl h-112.5 flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleDragStart}
        onTouchEnd={handleDragEnd}
      >
        {testimonials.map((testimoni, index) => {
          // Calculate relative position based on currentIndex
          let offset = index - currentIndex;

          // Handle wrap around for infinite looping visual effect
          if (offset > Math.floor(testimonials.length / 2)) {
            offset -= testimonials.length;
          } else if (offset < -Math.floor(testimonials.length / 2)) {
            offset += testimonials.length;
          }

          // Compute styles based on offset
          const absOffset = Math.abs(offset);
          const isCenter = offset === 0;

          // Dynamic translation: progressively less spacing for elements further away
          let translateX = offset * 220;
          if (absOffset > 1) {
            translateX = Math.sign(offset) * (220 + (absOffset - 1) * 160);
          }
          if (typeof window !== "undefined" && window.innerWidth < 640) {
            translateX = offset * 110;
            if (absOffset > 1) {
              translateX = Math.sign(offset) * (110 + (absOffset - 1) * 80);
            }
          }

          // Dynamic scale, z-index, and opacity
          let scale = Math.max(0.3, 1 - absOffset * 0.15);
          const zIndex = 50 - absOffset;
          const opacity = 1;

          // Background color for queue items
          let bgColor = "bg-white/5 backdrop-blur-sm border border-white/10";
          let textColor = "text-white/40"; // Make queue text faded (hint)

          if (isCenter) {
            scale = 1.15; // Enlarge center preview
            bgColor = "bg-white/10 backdrop-blur-lg border border-white/20";
            textColor = "text-white/90 drop-shadow-sm"; // Full text color for center
          }

          return (
            <div
              key={testimoni.id}
              onClick={() => {
                if (offset !== 0) setCurrentIndex(index);
              }}
              className={`absolute w-[320px] sm:w-100 p-8 rounded-3xl flex flex-col justify-center shadow-2xl transition-all duration-500 ease-out ${bgColor} ${isCenter ? "cursor-default" : "cursor-pointer"}`}
              style={{
                transform: `translateX(${translateX}px) scale(${scale})`,
                zIndex,
                opacity,
                boxShadow: isCenter
                  ? "0 20px 40px rgba(0,0,0,0.4)"
                  : "0 10px 20px rgba(0,0,0,0.2)",
              }}
            >
              <p
                className={`text-center text-sm sm:text-base font-semibold leading-relaxed mb-6 ${textColor}`}
              >
                {testimoni.content}
              </p>
              <div className={`text-center font-bold mb-4 ${textColor}`}>
                {testimoni.client_name}
              </div>
              {/* Stars */}
              <div className="flex justify-center gap-1 mt-2">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-6 h-6 ${i < testimoni.rating ? "text-[#FFC107] fill-current" : "text-[#FFC107] stroke-current fill-transparent"}`}
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
                    />
                  </svg>
                ))}
              </div>
            </div>
          );
        })}

        {/* Left Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handlePrev();
          }}
          className="absolute left-2 sm:left-10 z-60 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Right Navigation Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleNext();
          }}
          className="absolute right-2 sm:right-10 z-60 w-12 h-12 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 hover:border-white/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(255,255,255,0.05)] hover:shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Progress Bar / Indicator */}
      <div className="mt-12 flex justify-center w-full px-6">
        <div className="w-45 sm:w-60 h-[6px] bg-white/10 rounded-full overflow-hidden relative">
          <div
            className="h-full bg-white/70 rounded-full absolute top-0 transition-all duration-300"
            style={{
              width: `${100 / testimonials.length}%`,
              left: `${(currentIndex / testimonials.length) * 100}%`,
            }}
          />
        </div>
      </div>

      {/* Navigation Buttons */}
      <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-6 pb-20 relative z-20">
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
          href="#profile"
          className="group w-max px-6 py-3.5 flex items-center justify-center gap-2 bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(28,100,255,0.3)] hover:shadow-[0_0_30px_rgba(28,100,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase"
        >
          <ChevronDown
            size={16}
            className="transform group-hover:translate-y-1 transition-transform duration-300 text-teal-200"
          />
          <span className="lang-text">{t("btn_viewProfile")}</span>
        </a>
      </div>
    </section>
  );
}
