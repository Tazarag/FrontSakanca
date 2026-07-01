"use client";

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Camera, Compass, Code, Car, Cpu, Heart } from 'lucide-react';
import album1 from '@/components/image/album1.jpg';
import SakancaAuto from '@/components/image/SakancaAuto.png';
import { useLanguage } from '@/context/LanguageContext';

const servicesList = [
    {
        id: 'visual',
        nameKey: 'service_visual_name',
        icon: Camera,
        image: '/logosakancavisual.png',
        color: 'from-amber-400 to-orange-500',
        col: 'left',
    },
    {
        id: 'auto',
        nameKey: 'service_auto_name',
        icon: Car,
        image: SakancaAuto,
        color: 'from-blue-400 to-indigo-600',
        col: 'right',
    },
    {
        id: 'escape',
        nameKey: 'service_escape_name',
        icon: Compass,
        image: '/escapefix.png',
        color: 'from-emerald-400 to-teal-600',
        col: 'left',
    },
    {
        id: 'tech',
        nameKey: 'service_tech_name',
        icon: Cpu,
        image: '/logotech.png',
        color: 'from-cyan-400 to-blue-500',
        col: 'right',
    },
    {
        id: 'dev',
        nameKey: 'service_dev_name',
        icon: Code,
        image: '/logosakancadev.png',
        color: 'from-pink-500 to-purple-600',
        col: 'left',
    },
    {
        id: 'pet',
        nameKey: 'service_pet_name',
        icon: Heart,
        image: '/logopet.png',
        color: 'from-rose-400 to-red-500',
        col: 'right',
    },
];

function Canvas3DBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationFrameId: number;
        let width = (canvas.width = window.innerWidth);
        let height = (canvas.height = window.innerHeight);

        // 3D Particles
        const numParticles = 45;
        const particles: Array<{ x: number; y: number; z: number }> = [];
        const FOV = 280; // Perspective depth projection factor

        for (let i = 0; i < numParticles; i++) {
            particles.push({
                x: (Math.random() - 0.5) * 1200,
                y: (Math.random() - 0.5) * 800,
                z: Math.random() * 600 - 300
            });
        }

        let angleX = 0.0008; // slow drift speed
        let angleY = 0.0012;

        const rotateX = (x: number, y: number, z: number, angle: number) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                y: y * cos - z * sin,
                z: z * cos + y * sin
            };
        };

        const rotateY = (x: number, y: number, z: number, angle: number) => {
            const cos = Math.cos(angle);
            const sin = Math.sin(angle);
            return {
                x: x * cos - z * sin,
                z: z * cos + x * sin
            };
        };

        const resize = () => {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resize);

        const render = () => {
            ctx.clearRect(0, 0, width, height);

            // Calculate perspective projection coordinates
            const projected: Array<{ x: number; y: number; size: number; alpha: number }> = [];

            for (let i = 0; i < numParticles; i++) {
                const p = particles[i];

                // Apply slow 3D rotation matrix
                const rotY = rotateY(p.x, p.y, p.z, angleY);
                p.x = rotY.x;
                p.z = rotY.z;

                const rotX = rotateX(p.x, p.y, p.z, angleX);
                p.y = rotX.y;
                p.z = rotX.z;

                const scale = FOV / (FOV + p.z + 400);
                const x2d = p.x * scale + width / 2;
                const y2d = p.y * scale + height / 2;

                const size = Math.max(0.5, scale * 2.5);
                const alpha = Math.min(0.6, Math.max(0.05, scale * 0.5));

                projected.push({ x: x2d, y: y2d, size, alpha });
            }

            // Draw faint glowing connecting lines
            for (let i = 0; i < numParticles; i++) {
                for (let j = i + 1; j < numParticles; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const dz = particles[i].z - particles[j].z;
                    const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    if (dist < 220) {
                        const alpha = (1 - dist / 220) * 0.12;
                        ctx.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
                        ctx.lineWidth = 0.5;
                        ctx.beginPath();
                        ctx.moveTo(projected[i].x, projected[i].y);
                        ctx.lineTo(projected[j].x, projected[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Draw soft glowing particle nodes
            for (let i = 0; i < numParticles; i++) {
                const p = projected[i];
                ctx.fillStyle = `rgba(129, 140, 248, ${p.alpha})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover z-0 pointer-events-none" />;
}

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
            { threshold: 0.1 }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    return (
        <section
            id="services"
            ref={sectionRef}
            className="w-full min-h-screen flex flex-col justify-center px-6 md:px-24 py-24 overflow-hidden relative z-10"
        >
            {/* Background Image */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <Image
                    src={album1}
                    alt="Background"
                    fill
                    className="object-cover opacity-85"
                    placeholder="blur"
                    priority
                />
                {/* Black gradient overlay to differentiate background, logo, and text */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-[#0c1947]/45 to-black/80"></div>
            </div>

            {/* Content Container */}
            <div className="max-w-6xl mx-auto w-full relative z-10">

                {/* Title */}
                <div
                    className={`text-center mb-20 ${isVisible ? 'animate-fade-in-up-slow [animation-fill-mode:both]' : 'opacity-0'}`}
                    style={{ animationDelay: '100ms' }}
                >
                    <h2 className="text-[#E6DAC3] font-bold text-4xl sm:text-5xl md:text-6xl tracking-widest uppercase drop-shadow-[0_4px_12px_rgba(0,0,0,0.9)]">
                        <span className="lang-text">{t('services_title')}</span>
                    </h2>
                </div>

                {/* Services Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-12">

                    {servicesList.map((service, index) => {
                        const Icon = service.icon;
                        const logoDelay = `${300 + Math.floor(index / 2) * 200}ms`;
                        const contentDelay = `${300 + Math.floor(index / 2) * 200 + 800}ms`;
                        const serviceName = t(service.nameKey);

                        if (service.col === 'left') {
                            return (
                                <div
                                    key={service.id}
                                    className="flex items-center relative gap-4"
                                >
                                    {/* Logo Container */}
                                    <div
                                        className={`w-28 h-28 sm:w-36 sm:h-36 bg-white/15 backdrop-blur-md rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center border-2 border-white/25 shadow-[inset_0_4px_8px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.45)] z-10 shrink-0 transform-gpu hover:scale-105 transition-all duration-300 group ${isVisible ? 'animate-logo-entry [animation-fill-mode:both]' : 'opacity-0'} overflow-hidden [will-change:transform]`}
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
                                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-md transform group-hover:rotate-6 transition-transform duration-300`}>
                                                    <Icon className="w-6 h-6 sm:w-8 sm:h-8" />
                                                </div>
                                                <span className="text-white/40 font-bold text-[9px] sm:text-[11px] tracking-wider uppercase mt-2">
                                                    Logo
                                                </span>
                                            </>
                                        )}
                                    </div>

                                    {/* Content wrapper (capsule + button) - Slides out to the right */}
                                    <div
                                        className={`flex flex-col gap-3 -ml-10 sm:-ml-12 z-0 flex-grow ${isVisible ? 'animate-slide-out-right [animation-fill-mode:both]' : 'opacity-0'}`}
                                        style={{ animationDelay: contentDelay }}
                                    >
                                        {/* Name Capsule */}
                                        <div className="bg-white border border-white/20 rounded-full py-2.5 sm:py-3.5 pl-14 sm:pl-16 pr-6 sm:pr-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:bg-white/90 transition-colors duration-300 transform-gpu [will-change:transform]">
                                            <span className="text-[#0c1947] font-bold text-sm sm:text-lg tracking-wider block truncate lang-text">
                                                {serviceName}
                                            </span>
                                        </div>

                                        {/* Button */}
                                        <div className="pl-14 sm:pl-16">
                                            <a
                                                href="#detailed-services"
                                                onClick={() => {
                                                    const event = new CustomEvent('select-service-slide', { detail: { index } });
                                                    window.dispatchEvent(event);
                                                }}
                                                className="bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold text-[10px] sm:text-xs px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_4px_15px_rgba(28,100,255,0.4)] active:scale-95 transition-all duration-150 inline-block text-center cursor-pointer"
                                            >
                                                <span className="lang-text">{t('btn_more_about')}</span>
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
                                    {/* Content wrapper (capsule + button) - Slides out to the left */}
                                    <div
                                        className={`flex flex-col gap-3 -mr-10 sm:-mr-12 z-0 flex-grow text-right items-end ${isVisible ? 'animate-slide-out-left [animation-fill-mode:both]' : 'opacity-0'}`}
                                        style={{ animationDelay: contentDelay }}
                                    >
                                        {/* Name Capsule */}
                                        <div className="bg-white border border-white/20 rounded-full py-2.5 sm:py-3.5 pr-14 sm:pr-16 pl-6 sm:pl-8 shadow-[0_10px_25px_-5px_rgba(0,0,0,0.3)] hover:bg-white/90 transition-colors duration-300 w-full text-right transform-gpu [will-change:transform]">
                                            <span className="text-[#0c1947] font-bold text-sm sm:text-lg tracking-wider block truncate lang-text">
                                                {serviceName}
                                            </span>
                                        </div>

                                        {/* Button */}
                                        <div className="pr-14 sm:pr-16">
                                            <a
                                                href="#detailed-services"
                                                onClick={() => {
                                                    const event = new CustomEvent('select-service-slide', { detail: { index } });
                                                    window.dispatchEvent(event);
                                                }}
                                                className="bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold text-[10px] sm:text-xs px-5 sm:px-6 py-2 sm:py-2.5 rounded-full shadow-[0_4px_15px_rgba(28,100,255,0.4)] active:scale-95 transition-all duration-150 inline-block text-center cursor-pointer"
                                            >
                                                <span className="lang-text">{t('btn_more_about')}</span>
                                            </a>
                                        </div>
                                    </div>

                                    {/* Logo Container */}
                                    <div
                                        className={`w-28 h-28 sm:w-36 sm:h-36 bg-white/15 backdrop-blur-md rounded-[24px] sm:rounded-[32px] flex flex-col items-center justify-center border-2 border-white/25 shadow-[inset_0_4px_8px_rgba(255,255,255,0.45),inset_0_-4px_8px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.45)] z-10 shrink-0 transform-gpu hover:scale-105 transition-all duration-300 group ${isVisible ? 'animate-logo-entry [animation-fill-mode:both]' : 'opacity-0'} overflow-hidden [will-change:transform]`}
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
                                                <div className={`p-3 rounded-2xl bg-gradient-to-br ${service.color} text-white shadow-md transform group-hover:-rotate-6 transition-transform duration-300`}>
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
                <div 
                    className={`mt-16 flex justify-center gap-4 ${isVisible ? 'animate-fade-in-up-slow [animation-fill-mode:both]' : 'opacity-0'}`}
                    style={{ animationDelay: '1200ms' }}
                >
                    <a
                        href="#about"
                        className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm"
                    >
                        <span className="lang-text">{t('btn_back')}</span>
                    </a>
                </div>

            </div>
        </section>
    );
}
