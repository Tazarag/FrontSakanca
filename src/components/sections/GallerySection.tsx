"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { useGalleryItems } from "@/hooks/useGallery";
import { resolveImage } from "@/lib/api";

const variants = {
  enter: (isOdd: boolean) => ({
    opacity: 0,
    scale: isOdd ? 1.0 : 1.08,
  }),
  center: (isOdd: boolean) => ({
    zIndex: 1,
    opacity: 1,
    scale: isOdd ? 1.08 : 1.0,
    transition: {
      opacity: { duration: 0.5, ease: "easeInOut" as const },
      scale: { duration: 3.0, ease: "easeOut" as const },
    },
  }),
  exit: {
    zIndex: 0,
    opacity: 0,
    transition: {
      opacity: { duration: 0.5, ease: "easeInOut" as const },
    },
  },
};

export default function GalleryPage() {
  const { t, language } = useLanguage();
  const { data: galleryItems, isLoading, error } = useGalleryItems();
  const [[page, direction], setPage] = useState([0, 0]);

  const slides = (galleryItems ?? [])
    .slice()
    .sort((a, b) => a.order - b.order)
    .flatMap((item) =>
      item.images.map((img) => ({
        src: resolveImage(img.src),
        alt: img.alt,
        kicker: item.text_kicker[language],
        title: item.title[language],
        subtitle: item.subtitle[language],
      })),
    );

  const imageIndex = slides.length > 0 ? Math.abs(page % slides.length) : 0;
  const isOddPhoto = (imageIndex + 1) % 2 !== 0;
  const currentSlide = slides[imageIndex];

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  useEffect(() => {
    if (slides.length === 0) return;
    const timer = setInterval(() => paginate(1), 3000);
    return () => clearInterval(timer);
  }, [page, slides.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") paginate(1);
      else if (e.key === "ArrowLeft") paginate(-1);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [page]);

  if (isLoading) {
    return (
      <section className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-white/50">Memuat...</p>
      </section>
    );
  }

  if (error || slides.length === 0) {
    return (
      <section className="w-full h-screen bg-black flex items-center justify-center">
        <p className="text-red-400">Gagal memuat galeri.</p>
      </section>
    );
  }

  return (
    <section
      id="gallery"
      className="relative w-full h-screen bg-black overflow-hidden select-none"
    >
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false} custom={isOddPhoto}>
          <motion.div
            key={page}
            custom={isOddPhoto}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={currentSlide.src}
              alt={currentSlide.alt}
              fill
              className="object-cover"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/75 z-10 pointer-events-none" />

      <div className="absolute top-12 right-6 md:right-16 z-20 max-w-xl pointer-events-none text-right">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-xs uppercase tracking-widest text-teal-400 font-semibold mb-2 block lang-text"
        >
          {currentSlide.kicker}
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2 uppercase lang-text"
        >
          {currentSlide.title}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-300 text-sm md:text-base leading-relaxed line-clamp-2 lang-text"
        >
          {currentSlide.subtitle}
        </motion.p>
      </div>

      <div className="absolute inset-x-4 md:inset-x-8 top-1/2 -translate-y-1/2 flex justify-between items-center z-20 pointer-events-none">
        <button
          onClick={() => paginate(-1)}
          className="pointer-events-auto bg-black/40 hover:bg-teal-500/20 hover:border-teal-500/50 backdrop-blur-md border border-white/10 text-white p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft size={28} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="pointer-events-auto bg-black/40 hover:bg-teal-500/20 hover:border-teal-500/50 backdrop-blur-md border border-white/10 text-white p-3 rounded-full transition-all duration-300 ease-in-out transform hover:scale-110 focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight size={28} />
        </button>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
        <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-teal-400 shadow-lg">
          {imageIndex + 1} <span className="text-white/40">/</span>{" "}
          {slides.length}
        </div>

        <div className="flex justify-center gap-3">
          <a
            href="#profile"
            className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm pointer-events-auto"
          >
            <ChevronUp
              size={16}
              className="transform group-hover:-translate-y-1 transition-transform duration-300 text-teal-200"
            />
            <span className="lang-text">{t("btn_back")}</span>
          </a>
        </div>
      </div>
    </section>
  );
}
