"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

import album1 from '@/components/image/album1.jpg';
import album2 from '@/components/image/album2.jpg';
import album3 from '@/components/image/album3.jpg';
import album4 from '@/components/image/album4.jpg';
import album5 from '@/components/image/album5.jpg';
import album6 from '@/components/image/album6.jpg';
import album7 from '@/components/image/album7.jpg';
import album8 from '@/components/image/album8.jpg';
import album9 from '@/components/image/album9.jpg';
import album10 from '@/components/image/album10.jpg';
import album11 from '@/components/image/album11.jpg';
import album12 from '@/components/image/album12.jpg';
import album13 from '@/components/image/album13.jpg';

const images = [
    album1, album2, album3, album4, album5, album6, album7,
    album8, album9, album10, album11, album12, album13
];

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
            scale: { duration: 3.0, ease: "easeOut" as const }
        }
    }),
    exit: {
        zIndex: 0,
        opacity: 0,
        transition: {
            opacity: { duration: 0.5, ease: "easeInOut" as const }
        }
    }
};

export default function GalleryPage() {
    const { t } = useLanguage();
    const [[page, direction], setPage] = useState([0, 0]);

    // We only have 13 images, so we wrap the index
    const imageIndex = Math.abs(page % images.length);
    const isOddPhoto = (imageIndex + 1) % 2 !== 0;

    const paginate = (newDirection: number) => {
        setPage([page + newDirection, newDirection]);
    };

    // Autoplay: Move slide every 3 seconds (3000ms)
    // Dependencies on [page] resets the interval timer when user manually navigates
    useEffect(() => {
        const timer = setInterval(() => {
            paginate(1);
        }, 3000);
        return () => clearInterval(timer);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowRight') {
                paginate(1);
            } else if (e.key === 'ArrowLeft') {
                paginate(-1);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [page]);

    return (
        <section id="gallery" className="relative w-full h-screen bg-black overflow-hidden select-none">
            {/* Background Fullscreen Slideshow Image */}
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
                            src={images[imageIndex]}
                            alt={`Sakanca Gallery - Photo ${imageIndex + 1}`}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                            placeholder="blur"
                        />
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Premium Cinematic Vignette & Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/10 to-black/75 z-10 pointer-events-none" />

            {/* Immersive Floating Title & Header Info */}
            <div className="absolute top-12 right-6 md:right-16 z-20 max-w-xl pointer-events-none text-right">
                <motion.span
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xs uppercase tracking-widest text-teal-400 font-semibold mb-2 block lang-text"
                >
                    {t('gallery_journey')}
                </motion.span>
                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-3xl md:text-5xl font-black tracking-tight text-white mb-2 uppercase lang-text"
                >
                    {t('gallery_title')}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-neutral-300 text-sm md:text-base leading-relaxed line-clamp-2 lang-text"
                >
                    {t('gallery_desc')}
                </motion.p>
            </div>

            {/* Minimalist Floating Controls */}
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

            {/* Bottom Controls Area (Counter and Navigation Buttons) */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-4">
                {/* Counter Badge */}
                <div className="bg-black/60 backdrop-blur-md border border-white/10 px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider text-teal-400 shadow-lg">
                    {imageIndex + 1} <span className="text-white/40">/</span> {images.length}
                </div>

                {/* Navigation Buttons */}
                <div className="flex justify-center gap-3">
                    <a
                        href="#profile"
                        className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm pointer-events-auto"
                    >
                        <span className="lang-text">{t('btn_back')}</span>
                    </a>
                </div>
            </div>
        </section>
    );
}
