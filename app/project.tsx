"use client";

import React, { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage } from '@/context/LanguageContext';

interface Project {
    id: number;
    titleKey: string;
    descKey: string;
    defaultTitle: string;
    defaultDesc: string;
    image: string;
    category: string;
}

const projectsList: Project[] = [
    {
        id: 11,
        titleKey: 'proj_escape_citytour_title',
        descKey: 'proj_escape_citytour_desc',
        defaultTitle: 'SAKANCA ESCAPE × GEWD VACATION CITY TOUR',
        defaultDesc: 'City Tour hasil kolaborasi Sakanca Escape × Gewd Vacation menyusuri spot tersembunyi diluar dari jalan Malioboro. Mulai dari kuliner hingga hidden gems tempat yang tidak banyak orang kunjungi.',
        image: '/porto2.jpeg',
        category: 'Sakanca Escape'
    },
    {
        id: 12,
        titleKey: 'proj_tech_pcbuild_title',
        descKey: 'proj_tech_pcbuild_desc',
        defaultTitle: 'SAKANCA TECH CUSTOM PC BUILD',
        defaultDesc: 'Merakit komputer desktop sesuai kebutuhan pengguna dengan memperhatikan performa, estetika, dan manajemen kabel. Proyek ini mencakup pemasangan seluruh komponen, konfigurasi hardware, optimalisasi airflow, serta pengujian sistem untuk memastikan komputer berjalan stabil dan siap digunakan.',
        image: '/techporto1.jpeg',
        category: 'Sakanca Tech'
    },
    {
        id: 13,
        titleKey: 'proj_tech_laptop_maintenance_title',
        descKey: 'proj_tech_laptop_maintenance_desc',
        defaultTitle: 'SAKANCA TECH LAPTOP MAINTENANCE',
        defaultDesc: 'Melakukan pembongkaran laptop untuk proses pembersihan, penggantian thermal paste, upgrade komponen seperti SSD dan RAM, serta pemeriksaan kondisi hardware. Setiap perangkat diuji kembali setelah perawatan guna memastikan performa meningkat dan sistem bekerja secara optimal.',
        image: '/techporto2.jpeg',
        category: 'Sakanca Tech'
    },
    {
        id: 14,
        titleKey: 'proj_porsimaptar_2025_title',
        descKey: 'proj_porsimaptar_2025_desc',
        defaultTitle: 'JUARA 2 LOMBA PORSIMAPTAR 2025',
        defaultDesc: 'juara 2 lomba videografi yang diadakan oleh akademi kepolisian semarang pada tahun 2025 tingkat nasional',
        image: '/fotoporsi.png',
        category: 'Sakanca Visual'
    },

    {
        id: 16,
        titleKey: 'proj_sugi_ac_mobil_title',
        descKey: 'proj_sugi_ac_mobil_desc',
        defaultTitle: 'Sugi AC Mobil',
        defaultDesc: 'Sugi AC Mobil adalah website company profile yang menampilkan informasi layanan servis AC mobil, galeri, testimoni, dan kontak untuk memudahkan pelanggan mengenal bisnis serta melakukan konsultasi. Website ini dibangun menggunakan Next.js, TypeScript, dan Tailwind CSS dengan deployment di Vercel, sehingga menghasilkan tampilan modern, responsif, cepat, dan SEO-friendly.',
        image: '/bengkelac.jpeg',
        category: 'Sakanca Dev'
    },
    {
        id: 17,
        titleKey: 'proj_c_minor_title',
        descKey: 'proj_c_minor_desc',
        defaultTitle: 'C Minor',
        defaultDesc: 'C Minor adalah website landing page yang dirancang untuk menyampaikan informasi mengenai komunitas secara profesional melalui desain yang sederhana, responsif, dan mudah digunakan. Website ini dikembangkan menggunakan HTML, CSS, dan JavaScript, kemudian dideploy menggunakan Vercel sehingga memiliki performa yang ringan dan mudah diakses dari berbagai perangkat.',
        image: '/cminor.jpeg',
        category: 'Sakanca Dev'
    },
    {
        id: 18,
        titleKey: 'proj_mayarasa_unisba_title',
        descKey: 'proj_mayarasa_unisba_desc',
        defaultTitle: 'Lomba Video Kreatif UNISBA 2026',
        defaultDesc: 'Lomba Video Kreatif yang di adakan oleh Universitas Islam Bandung Tahun 2026. Maya Rasa menceritakan tentang seorang perantau yang terjebak dalam judi online hingga menghabiskan uang yang dimilikinya. Saat keadaan mulai sulit, ia berusaha bertahan hidup dengan mencari pekerjaan di perantauan dan kembali menemukan semangat untuk bangkit.',
        image: '/mayarasa.jpeg',
        category: 'Sakanca Visual'
    },
    {
        id: 19,
        titleKey: 'proj_bnn_2025_title',
        descKey: 'proj_bnn_2025_desc',
        defaultTitle: 'Lomba Video Pendek BNN 2025',
        defaultDesc: 'Lomba Video Pendek yang di adakan oleh Badan Narkotika Nasional Tahun 2025. Ruang Silam menceritakan sepenggak realita anak muda yang dihadapkan oleh ujung skripsi dan patah hati, sehingga hampir tersesat ke narkoba hingga suara ibu membawanya pulang',
        image: '/bnn.jpeg',
        category: 'Sakanca Visual'
    },
    {
        id: 20,
        titleKey: 'proj_matic150_title',
        descKey: 'proj_matic150_desc',
        defaultTitle: 'TOP 5 Motor Matic 150cc Terbaik 2026 – Versi Sakanca Auto!',
        defaultDesc: 'Pembuatan Video mengenai motor : Mencari motor matic 150cc yang tepat untuk kebutuhan harian maupun hobi di tahun 2026? Di video kali ini, kami telah mengurasi 5 pilihan motor matic kelas 150cc terbaik versi Sakanca Auto. Kami membahas keunggulan performa, desain, dan fitur-fitur yang membuat kelima motor ini layak menjadi pilihan utama bagi kamu tahun ini. ',
        image: '/kelasmatic.jpeg',
        category: 'Sakanca Auto'
    },
    {
        id: 21,
        titleKey: 'proj_bioleaf_title',
        descKey: 'proj_bioleaf_desc',
        defaultTitle: 'Juara 2 Lomba Videografi Bioleaf UNS Tahun 2025',
        defaultDesc: 'Juara 2 Lomba Videografi yang diselenggarakan oleh HMP Biosfer FKIP UNS : BIOLEAF Tahun 2025.',
        image: '/bioleaf.png',
        category: 'Sakanca Visual'
    }
];

export default function ProjectSection() {
    const { t } = useLanguage();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    const handleScroll = useCallback(() => {
        const container = scrollContainerRef.current;
        if (!container) return;

        const { scrollLeft, scrollWidth, clientWidth } = container;
        const maxScroll = scrollWidth - clientWidth;
        setScrollProgress(maxScroll <= 0 ? 0 : (scrollLeft / maxScroll) * 100);
    }, []);

    useEffect(() => {
        const container = scrollContainerRef.current;
        if (!container) return;
        container.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // initial sync
        return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);

    return (
        <section id="project" className="w-full min-h-screen py-24 flex flex-col items-center justify-center select-none relative overflow-hidden"
            style={{ backgroundImage: "url('/porsi.png')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
        >
            {/* Dark overlay for readability */}
            <div className="absolute inset-0 bg-black/70 z-0 pointer-events-none" />
            {/* Title "PROJECTS" with glowing effect */}
            <h2 className="relative z-10 text-center font-bold text-4xl sm:text-5xl tracking-[0.35em] uppercase text-[#E6DAC3] mb-16 drop-shadow-[0_0_15px_rgba(230,218,195,0.4)] px-6">
                PROJECTS
            </h2>

            {/* Horizontal scrollable container — full width, edge-to-edge */}
            <div
                ref={scrollContainerRef}
                className="relative z-10 w-full flex overflow-x-auto gap-8 py-6 px-8 snap-x snap-mandatory no-scrollbar scroll-smooth"
                style={{ WebkitOverflowScrolling: 'touch' }}
            >
                {projectsList.map((project) => {
                    // Check translation context for values, default to standard if not found
                    const title = t(project.titleKey) !== project.titleKey ? t(project.titleKey) : project.defaultTitle;
                    const desc = t(project.descKey) !== project.descKey ? t(project.descKey) : project.defaultDesc;

                    return (
                        <div
                            key={project.id}
                            className="flex-shrink-0 w-[290px] sm:w-[350px] h-[590px] sm:h-[660px] bg-white/10 backdrop-blur-lg border border-white/20 rounded-[32px] p-5 flex flex-col items-center snap-center cursor-pointer hover:bg-white/20"
                            style={{
                                boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
                                transition: 'transform 300ms ease-out, box-shadow 300ms ease-out',
                            }}
                            onMouseEnter={e => {
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(-8px)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 24px 64px rgba(0,0,0,0.45)';
                            }}
                            onMouseLeave={e => {
                                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                                (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(0,0,0,0.25)';
                            }}
                        >
                            {/* Image Container with aspect ratio and rounded corners */}
                            <div className="relative shrink-0 w-full h-[180px] sm:h-[220px] rounded-[24px] overflow-hidden mb-6">
                                <Image
                                    src={project.image}
                                    alt={title}
                                    fill
                                    className="object-cover"
                                />
                            </div>

                            {/* Content */}
                            <div className="w-full flex flex-col flex-grow items-center text-center">
                                <h3 className="w-full font-bold italic text-white text-lg sm:text-xl uppercase mb-4 tracking-wide leading-tight px-2 h-[80px] sm:h-[90px] flex-shrink-0 drop-shadow-md">
                                    {title}
                                </h3>
                                <p className="text-white/90 text-xs sm:text-sm leading-relaxed px-3 pb-6">
                                    {desc}
                                </p>
                                <p className="text-[#E6DAC3] font-semibold italic text-xs sm:text-sm tracking-wide pb-2 mt-auto drop-shadow-sm">
                                    -{project.category}-
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Custom Progress Bar / Indicator */}
            <div className="relative z-10 mt-8 flex justify-center w-full px-6">
                <div className="w-[180px] sm:w-[240px] h-[6px] bg-white/10 rounded-full overflow-hidden relative">
                    <div
                        className="h-full bg-white/70 rounded-full absolute top-0"
                        style={{
                            width: '35%',
                            left: `${scrollProgress * 0.65}%`,
                            transition: 'left 80ms ease-out',
                        }}
                    />
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="relative z-10 mt-12 flex justify-center gap-4 w-full px-6">
                <a
                    href="#detailed-services"
                    className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-transparent hover:bg-white/10 text-white font-bold rounded-xl border border-white/40 shadow-[0_0_15px_rgba(255,255,255,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase backdrop-blur-sm"
                >
                    <span className="lang-text">{t('btn_back')}</span>
                </a>
                <a
                    href="#testimoni"
                    className="group w-[160px] sm:w-[180px] py-3.5 flex items-center justify-center gap-2 bg-[#1c64ff] hover:bg-[#1c64ff]/90 text-white font-bold rounded-xl shadow-[0_0_20px_rgba(28,100,255,0.3)] hover:shadow-[0_0_30px_rgba(28,100,255,0.5)] transition-all duration-300 transform hover:-translate-y-0.5 active:scale-95 cursor-pointer text-xs sm:text-sm tracking-widest uppercase"
                >
                    <span className="lang-text">Lihat Testimoni</span>
                </a>
            </div>
        </section>
    );
}
