"use client";

import React, { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import HeroSlideshow from '@/components/HeroSlideshow';
import AboutSection from './about';
import ServicesSection from './services';
import DetailedServicesSection from './detservices';
import ProjectSection from './project';
import GalleryPage from './gallery';
import ProfileSection from './profile';
import TestimoniSection from './testimoni';
import FooterSection from './footer';
import { useLanguage } from '@/context/LanguageContext';

export default function HomePage() {
  const { language, setLanguage, t } = useLanguage();
  const heroRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isNavbarVisible, setIsNavbarVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Smooth scroll
  useEffect(() => {
    const handleAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a');
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#')) {
        const id = href.substring(1);
        const element = document.getElementById(id);
        if (element) {
          e.preventDefault();
          const targetPosition = element.getBoundingClientRect().top + window.scrollY;
          const startPosition = window.scrollY;
          const distance = targetPosition - startPosition;
          let startTime: number | null = null;
          const duration = 1500;
          const ease = (t: number) =>
            t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
          const step = (currentTime: number) => {
            if (startTime === null) startTime = currentTime;
            const elapsed = currentTime - startTime;
            window.scrollTo(0, startPosition + distance * ease(Math.min(elapsed / duration, 1)));
            if (elapsed < duration) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
          window.history.pushState(null, '', href);
        }
      }
    };
    document.addEventListener('click', handleAnchorClick);
    return () => document.removeEventListener('click', handleAnchorClick);
  }, []);

  // Navbar inactivity timeout (5 seconds)
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleScroll = () => {
      setIsNavbarVisible(true);
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsNavbarVisible(false);
      }, 5000);
    };

    // Set initial 5s timeout on mount
    timeoutId = setTimeout(() => {
      setIsNavbarVisible(false);
    }, 5000);

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if ('scrollRestoration' in window.history) window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);
    if (window.location.hash)
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col text-white overflow-x-hidden font-sans">

      {/* Navigation Bar */}
      <header
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={`fixed top-0 left-0 right-0 w-full px-4 sm:px-6 pt-6 z-50 transition-all duration-500 ease-out ${isNavbarVisible || isHovered
          ? 'opacity-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 -translate-y-4 pointer-events-none'
          }`}
      >
        <div className="max-w-7xl mx-auto bg-[#0a0c14]/50 backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3 flex items-center justify-between shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
          <div className="flex items-center space-x-3 shrink-0">
            <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-xl border border-white/15 shadow-sm">
              <Image src="/logosakanca.png" alt="Sakanca Alliance Logo" fill className="object-cover" />
            </div>
            <span className="text-xl font-bold text-white tracking-wide whitespace-nowrap">Sakanca Alliance</span>
          </div>
          <div className="flex items-center space-x-2 md:space-x-3 overflow-x-auto no-scrollbar py-1 pr-1 max-w-[75%] md:max-w-none">
            {([
              ['#home', t('nav_home')],
              ['#about', t('nav_about')],
              ['#services', t('nav_services')],
              ['#project', t('nav_project')],
              ['#testimonials', t('nav_testimonials')],
              ['#profile', t('nav_contact')],
              ['#gallery', t('nav_gallery')],
            ] as [string, string][]).map(([href, label]) => (
              <a
                key={href}
                href={href}
                className="bg-white/5 hover:bg-teal-500/20 border border-white/10 hover:border-teal-500/30 px-4 py-1.5 rounded-full text-xs font-semibold text-gray-300 hover:text-teal-300 active:scale-95 transition-all duration-200 cursor-pointer shrink-0 whitespace-nowrap"
              >
                {label}
              </a>
            ))}
            <div className="flex items-center bg-white/5 border border-white/10 p-0.5 rounded-full text-[10px] font-bold text-gray-400 shrink-0">
              {(['ID', 'EN', 'JPN'] as const).map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`${language === lang ? 'bg-teal-500/30 text-teal-300' : 'hover:text-white'} px-3 py-1 rounded-full transition-all duration-200 cursor-pointer`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <div ref={heroRef} className="relative min-h-screen w-full flex flex-col justify-center overflow-hidden">
        <HeroSlideshow />

        {/* Floating ambient orbs — CSS animated, using official class names to prevent purging */}
        <div
          className="absolute w-[600px] h-[600px] rounded-full pointer-events-none z-10 animate-hero-fade-in"
          style={{
            background: 'radial-gradient(circle, rgba(99,102,241,0.18) 0%, transparent 70%)',
            top: '5%', left: '-10%',
            transform: `translate(${mousePos.x * -18}px, ${mousePos.y * -12}px)`,
            transition: 'transform 1.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        <div
          className="absolute w-[500px] h-[500px] rounded-full pointer-events-none z-10 animate-hero-fade-in"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.14) 0%, transparent 70%)',
            bottom: '0%', right: '-5%',
            transform: `translate(${mousePos.x * 14}px, ${mousePos.y * 10}px)`,
            transition: 'transform 1.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />
        <div
          className="absolute w-[280px] h-[280px] rounded-full pointer-events-none z-10 animate-hero-fade-in"
          style={{
            background: 'radial-gradient(circle, rgba(20,184,166,0.12) 0%, transparent 70%)',
            top: '38%', right: '22%',
            transform: `translate(${mousePos.x * 9}px, ${mousePos.y * -7}px)`,
            transition: 'transform 2s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        />

        {/* Hero content */}
        <section
          id="home"
          className="flex-grow flex flex-col justify-center items-start text-left max-w-7xl mx-auto w-full px-6 sm:px-12 pt-28 pb-20 z-20"
          style={{
            transform: `translate(${mousePos.x * -4}px, ${mousePos.y * -3}px)`,
            transition: 'transform 1.8s cubic-bezier(0.25, 0.46, 0.45, 0.94)',
          }}
        >

          {/* Main heading */}
          <h1 className="font-heading text-6xl sm:text-8xl font-black tracking-tight mb-5 max-w-5xl text-left leading-[0.9] uppercase animate-hero-slide-up">
            <span className="block text-white lang-text" style={{ textShadow: '0 0 80px rgba(255,255,255,0.08)' }}>
              {t('hero_title_1')}
            </span>
            <span
              className="block mt-2 lang-text"
              style={{
                background: 'linear-gradient(135deg, #818cf8 0%, #a78bfa 35%, #f472b6 70%, #fb923c 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '300% 300%',
                animation: 'gradientShift 5s ease infinite',
              }}
            >
              {t('hero_title_2')}
            </span>
          </h1>

          {/* Animated divider */}
          <div
            className="mb-6 h-px rounded-full animate-hero-line-grow"
            style={{
              background: 'linear-gradient(90deg, rgba(99,102,241,0.8), rgba(168,85,247,0.5), transparent)',
            }}
          />

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-300/90 max-w-xl mb-12 leading-relaxed font-medium tracking-wide lang-text animate-hero-slide-up">
            {t('hero_subtitle')}
          </p>

          {/* CTA Button */}
          <div className="animate-hero-slide-up">
            <a
              href="#about"
              className="group relative inline-flex items-center gap-3 overflow-hidden rounded-2xl px-9 py-4 font-bold text-white text-sm tracking-wide cursor-pointer select-none"
              style={{
                background: 'linear-gradient(135deg, #4338ca 0%, #7c3aed 100%)',
                boxShadow: '0 0 0 1px rgba(99,102,241,0.35), 0 8px 32px rgba(99,102,241,0.3)',
                transition: 'box-shadow 0.3s ease, transform 0.2s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(99,102,241,0.6), 0 12px 40px rgba(99,102,241,0.55), 0 0 80px rgba(99,102,241,0.2)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px) scale(1.02)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 0 0 1px rgba(99,102,241,0.35), 0 8px 32px rgba(99,102,241,0.3)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0) scale(1)';
              }}
            >
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none" />
              <span className="lang-text relative z-10">{t('hero_cta')}</span>
              <svg className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </a>
          </div>
        </section>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 pointer-events-none animate-hero-fade-in">
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/40 font-bold">Scroll</span>
          <div className="w-px h-10 origin-top" style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)', animation: 'scrollPulse 2.2s ease-in-out infinite' }} />
        </div>
      </div>

      <AboutSection />
      <ServicesSection />
      <DetailedServicesSection />
      <ProjectSection />
      <TestimoniSection />
      <ProfileSection />
      <GalleryPage />
      <FooterSection />
    </div>
  );
}