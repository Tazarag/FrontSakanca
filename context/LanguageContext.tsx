"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'ID' | 'EN' | 'JPN';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: string) => string;
    isTransitioning: boolean;
}

const translations: Record<Language, Record<string, string>> = {
    ID: {
        // Navbar
        nav_home: "Home",
        nav_about: "About",
        nav_services: "Work Services",
        nav_project: "Projects",
        nav_gallery: "Gallery",
        nav_achievement: "Achievement",
        nav_testimonials: "Testimonials",
        nav_contact: "Contact",

        // Hero
        hero_title_1: "Shared Ideas",
        hero_title_2: "One Alliance",
        hero_subtitle: "Your Collective Expert Creating Solutions That Matter",
        hero_cta: "Mulai Sekarang",

        // Common Buttons
        btn_back: "Kembali",
        btn_next: "Lanjut",
        btn_more_about: "More About",
        btn_view_gallery: "Lihat Galeri",
        btn_view_project: "Lihat Project",
        btn_view_profile: "Lihat Profil Tim",
        btn_contact_me: "Hubungi Saya",

        // About Section
        about_title_1: "S A K A N C A",
        about_title_2: "A L L I A N C E",
        about_desc_1: "Sakanca Alliance berasal dari kata \"Sakanca\" yang berarti teman seperjalanan, sahabat, atau rekan yang berjalan bersama, sedangkan \"Alliance\" berarti kolaborasi. Sakanca Alliance merepresentasikan sebuah ekosistem yang menyatukan berbagai layanan kreatif, teknologi, otomotif, dan pengalaman wisata dalam satu jaringan kolaboratif.",
        about_desc_2: "Kami percaya bahwa setiap ide, kebutuhan, dan impian layak diwujudkan bersama partner yang tepat. Oleh karena itu, Sakanca Alliance hadir sebagai rumah bagi berbagai unit bisnis yang saling mendukung untuk memberikan solusi terbaik bagi individu, bisnis, maupun komunitas.",

        // Services Section
        services_title: "Our Services",
        service_visual_name: "Sakanca Visual",
        service_auto_name: "Sakanca Auto",
        service_escape_name: "Sakanca Escape",
        service_tech_name: "Sakanca Tech",
        service_dev_name: "Sakanca Dev",
        service_pet_name: "Sakanca Pet",

        // Detailed Services Section
        det_visual_desc: "Sakanca Visual adalah divisi yang bergerak di bidang videografi, fotografi, dan produksi konten kreatif. Kami membantu mengabadikan setiap momen sekaligus menciptakan visual yang menarik untuk kebutuhan promosi, branding, dokumentasi acara, hingga media sosial dengan hasil yang profesional dan berkualitas.",
        det_auto_desc: "Sakanca Auto menyediakan berbagai layanan di bidang otomotif, mulai dari modifikasi motor, pemasangan aksesori, hingga konsultasi kebutuhan kendaraan. Kami mengutamakan kualitas, ketelitian, dan kepuasan pelanggan untuk menghadirkan hasil yang sesuai dengan karakter dan gaya setiap pengendara.",
        det_escape_desc: "Sakanca Escape percaya bahwa setiap perjalanan selalu punya cerita. Kami menghadirkan pengalaman yang nyaman dan penuh perhatian agar setiap langkah terasa lebih berkesan. Bersama kami, jelajahi tempat baru, nikmati setiap momen, bangun kebersamaan, dan bawa pulang kenangan indah yang akan selalu dikenang, bukan sekadar perjalanan, tetapi pengalaman yang berarti.",
        det_tech_desc: "S-Tech adalah layanan profesional yang menggabungkan keahlian di bidang hardware komputer dengan kreativitas desain visual. Mulai dari perbaikan dan perakitan perangkat hingga pembuatan desain grafis dan video editing, setiap layanan dikerjakan dengan standar kualitas tinggi untuk memberikan hasil terbaik bagi setiap klien.",
        det_dev_desc: "Sakanca Dev berfokus pada pengembangan website, aplikasi, dan sistem informasi yang inovatif. Kami menyediakan solusi digital yang dirancang sesuai kebutuhan pengguna untuk membantu bisnis maupun organisasi meningkatkan efisiensi, produktivitas, dan kualitas layanan di era digital.",
        det_pet_desc: "Sakanca Pet berfokus pada penyediaan makanan kucing berkualitas serta layanan open adopt untuk membantu kucing menemukan rumah yang aman, nyaman, dan penuh kasih sayang. Kami percaya bahwa setiap kucing berhak mendapatkan kehidupan yang lebih baik, sehingga kami berkomitmen mendukung para pecinta kucing melalui produk terpercaya, proses adopsi yang bertanggung jawab, serta pelayanan yang ramah dan mengutamakan kesejahteraan setiap kucing.",

        // Gallery Section
        gallery_journey: "Visual Journey",
        gallery_title: "Galeri Sakanca",
        gallery_desc: "Koleksi momen terbaik dan perjalanan visual yang penuh inspirasi.",

        // Profile Section
        profile_tazar_role: "Creative Developer & Visual Storyteller",
        profile_tazar_desc1: "Kreator kreatif yang memadukan keahlian teknis dan visual. Berpengalaman dalam video editing menggunakan Adobe After Effects dan CapCut Pro, serta desain grafis melalui Canva.",
        profile_tazar_desc2: "Front-end developer yang membangun antarmuka web modern menggunakan Next.js dan TypeScript. Menghadirkan estetika visual yang dinamis dan fungsionalitas kode yang efisien.",
        profile_tazar_card1_label: "FOKUS", profile_tazar_card1_val: "Front End Dev",
        profile_tazar_card2_label: "TOOLS", profile_tazar_card2_val: "Next.js / AE",
        profile_tazar_card3_label: "GAYA", profile_tazar_card3_val: "Modern & Clean",

        profile_hafidz_role: "Creative Director & Client Relations",
        profile_hafidz_desc1: "Creative Director & Client Relations yang berfokus pada pengembangan identitas visual melalui perpaduan strategi, desain, dan komunikasi. Berpengalaman dalam branding, graphic design, dan creative layout menggunakan Canva dan Adobe Photoshop, serta didukung kemampuan fotografi dan public communication sebagai tour guide.",
        profile_hafidz_desc2: "Percaya bahwa desain yang baik tidak hanya menarik secara visual, tetapi juga mampu membangun koneksi dan menyampaikan cerita yang bermakna.",
        profile_hafidz_card1_label: "FOKUS", profile_hafidz_card1_val: "Creative Direction",
        profile_hafidz_card2_label: "TOOLS", profile_hafidz_card2_val: "Canva / Photoshop",
        profile_hafidz_card3_label: "GAYA", profile_hafidz_card3_val: "Visual Storytelling",

        profile_clara_role: "UI/UX Designer & Event Organizer",
        profile_clara_desc1: "Berkomitmen untuk terus berkembang dengan memadukan teknologi, kreativitas, dan pengalaman organisasi. Memiliki ketertarikan pada bidang UI/UX Design dan event organizing, dengan pengalaman mengembangkan ide melalui Figma untuk perancangan antarmuka serta Canva untuk desain visual.",
        profile_clara_desc2: "Di luar aktivitas tersebut, saya menikmati menulis, menggambar menggunakan Ibis Paint, dan bernyanyi sebagai media untuk menyalurkan kreativitas dan terus mengembangkan perspektif.",
        profile_clara_card1_label: "FOKUS", profile_clara_card1_val: "UI/UX",
        profile_clara_card2_label: "PENGALAMAN", profile_clara_card2_val: "Organization & Event",
        profile_clara_card3_label: "NILAI", profile_clara_card3_val: "Collaborative & Creative",

        profile_fathir_role: "Hardware Specialist & Graphic Designer",
        profile_fathir_desc1: "Saya memiliki keahlian di bidang hardware komputer dan laptop, mencakup perakitan, perawatan, upgrade, troubleshooting, hingga servis berbagai jenis perangkat. Dengan pengalaman dan ketelitian dalam setiap proses, saya berkomitmen menghadirkan solusi yang efektif dan berkualitas.",
        profile_fathir_desc2: "Selain hardware, saya juga berpengalaman dalam desain grafis dan editing video. Menggunakan Canva, Adobe Photoshop, dan CapCut Pro, saya menciptakan berbagai karya visual seperti poster, banner, konten media sosial, serta video yang menarik dan profesional.",
        profile_fathir_card1_label: "FOKUS", profile_fathir_card1_val: "Hardware & Design",
        profile_fathir_card2_label: "TOOLS", profile_fathir_card2_val: "PS / Canva / AE",
        profile_fathir_card3_label: "GAYA", profile_fathir_card3_val: "Presisi & Kreatif",

        profile_valerian_role: "Full-Stack Developer & Technical Leader",
        profile_valerian_desc1: "Saya adalah Full-Stack Developer dan Technical Leader yang memadukan arsitektur kode dengan solusi digital modern. Berpengalaman memimpin tim rekayasa perangkat lunak, saya berfokus pada pengembangan sistem end-to-end menggunakan Laravel, Next.js, dan PostgreSQL.",
        profile_valerian_desc2: "Saya mengintegrasikan keahlian engineering, analisis data Python, serta insting visual UI/UX untuk mengeksekusi proyek berstandar industri.",
        profile_valerian_card1_label: "FOKUS", profile_valerian_card1_val: "Full-Stack Dev",
        profile_valerian_card2_label: "STACK", profile_valerian_card2_val: "Laravel / Next.js",
        profile_valerian_card3_label: "DATA", profile_valerian_card3_val: "Python & PostgreSQL",

        profile_bima_role: "Digital Creator & Actor",
        profile_bima_desc1: "Saya adalah kreator digital yang memadukan keahlian teknis dan visual. Berpengalaman dalam desain 3D menggunakan Blender, editing video melalui CapCut Pro, serta perancangan desain UI/UX dengan Balsamiq dan Canva.",
        profile_bima_desc2: "Selain itu, saya aktor terampil yang menghadirkan karakter dinamis dalam berbagai proyek. Menggabungkan estetika visual dan kemampuan akting, saya siap menciptakan karya yang mendalam, profesional, serta memberikan dampak yang sangat kuat.",
        profile_bima_card1_label: "FOKUS", profile_bima_card1_val: "3D & Video",
        profile_bima_card2_label: "TOOLS", profile_bima_card2_val: "Blender / CapCut",
        profile_bima_card3_label: "EXTRA", profile_bima_card3_val: "Acting & UI/UX",
    },
    EN: {
        // Navbar
        nav_home: "Home",
        nav_about: "About",
        nav_services: "Work Services",
        nav_project: "Projects",
        nav_gallery: "Gallery",
        nav_achievement: "Achievement",
        nav_testimonials: "Testimonials",
        nav_contact: "Contact",

        // Hero
        hero_title_1: "Shared Ideas",
        hero_title_2: "One Alliance",
        hero_subtitle: "Your Collective Expert Creating Solutions That Matter",
        hero_cta: "Get Started",

        // Common Buttons
        btn_back: "Back",
        btn_next: "Next",
        btn_more_about: "More About",
        btn_view_gallery: "View Gallery",
        btn_view_project: "View Project",
        btn_view_profile: "View Team Profile",
        btn_contact_me: "Contact Me",

        // About Section
        about_title_1: "S A K A N C A",
        about_title_2: "A L L I A N C E",
        about_desc_1: "Sakanca Alliance stems from the word \"Sakanca\", meaning traveling companions, close friends, or partners walking together, while \"Alliance\" signifies collaboration. Sakanca Alliance represents an ecosystem uniting creative services, technology, automotive, and travel experiences within a collaborative network.",
        about_desc_2: "We believe that every idea, need, and dream deserves to be realized with the right partner. Therefore, Sakanca Alliance stands as a home for mutually supportive business units dedicated to delivering the best solutions for individuals, businesses, and communities.",

        // Services Section
        services_title: "Our Services",
        service_visual_name: "Sakanca Visual",
        service_auto_name: "Sakanca Auto",
        service_escape_name: "Sakanca Escape",
        service_tech_name: "Sakanca Tech",
        service_dev_name: "Sakanca Dev",
        service_pet_name: "Sakanca Pet",

        // Detailed Services Section
        det_visual_desc: "Sakanca Visual specializes in videography, photography, and creative content production. We help capture every moment while producing compelling visuals for promotion, branding, event documentation, and social media with professional, high-quality results.",
        det_auto_desc: "Sakanca Auto offers comprehensive automotive services, from motorcycle modifications and accessory installations to vehicle consultation. We prioritize quality, precision, and customer satisfaction to deliver results tailored to each rider's character.",
        det_escape_desc: "Sakanca Escape delivers curated travel and tour services in Yogyakarta designed to create memorable experiences. From city tours to customized itineraries, we ensure comfortable, safe, and enjoyable journeys.",
        det_tech_desc: "Sakanca Tech focuses on selling hardware technology including laptops, computers, PC components, and accessories. We provide top-quality products alongside expert consultation for learning, work, or business needs.",
        det_dev_desc: "Sakanca Dev centers on developing innovative websites, applications, and information systems. We deliver custom digital solutions helping businesses and organizations enhance efficiency, productivity, and service quality.",
        det_pet_desc: "Sakanca Pet serves as a trusted companion for your pets, offering holistic grooming, fully equipped pet hotel facilities, and premium nutritional food. We are committed to giving ultimate comfort and care to your beloved pets.",

        // Gallery Section
        gallery_journey: "Visual Journey",
        gallery_title: "Sakanca Gallery",
        gallery_desc: "A curated collection of memorable moments and inspirational visual journeys.",

        // Profile Section
        profile_tazar_role: "Creative Developer & Visual Storyteller",
        profile_tazar_desc1: "Creative creator combining technical and visual expertise. Experienced in video editing using Adobe After Effects and CapCut Pro, as well as graphic design via Canva.",
        profile_tazar_desc2: "Front-end developer building modern web interfaces with Next.js and TypeScript. Delivering dynamic visual aesthetics alongside efficient code functionality.",
        profile_tazar_card1_label: "FOCUS", profile_tazar_card1_val: "Front End Dev",
        profile_tazar_card2_label: "TOOLS", profile_tazar_card2_val: "Next.js / AE",
        profile_tazar_card3_label: "STYLE", profile_tazar_card3_val: "Modern & Clean",

        profile_hafidz_role: "Creative Director & Brand Strategist",
        profile_hafidz_desc1: "Creative director with over 5 years of experience in building strong brand identities. Expert in crafting compelling and consistent visual strategies.",
        profile_hafidz_desc2: "Blending deep research with aesthetic intuition to produce impactful campaigns across various industries.",
        profile_hafidz_card1_label: "FOCUS", profile_hafidz_card1_val: "Brand Identity",
        profile_hafidz_card2_label: "TOOLS", profile_hafidz_card2_val: "AI / Figma",
        profile_hafidz_card3_label: "STYLE", profile_hafidz_card3_val: "Bold & Impactful",

        profile_clara_role: "Videographer & Motion Designer",
        profile_clara_desc1: "Professional videographer specializing in cinematic content production. Master of creative shooting techniques with diverse cameras and lenses.",
        profile_clara_desc2: "Motion graphics and visual effects expert using After Effects and DaVinci Resolve. Infusing emotion and deep storytelling into every project.",
        profile_clara_card1_label: "FOCUS", profile_clara_card1_val: "Videography",
        profile_clara_card2_label: "TOOLS", profile_clara_card2_val: "DaVinci / AE",
        profile_clara_card3_label: "STYLE", profile_clara_card3_val: "Cinematic",

        profile_fathir_role: "Hardware Specialist & Graphic Designer",
        profile_fathir_desc1: "Computer and laptop hardware specialist covering assembly, maintenance, upgrades, troubleshooting, and repairs. Committed to delivering effective and reliable solutions.",
        profile_fathir_desc2: "Experienced in graphic design and video editing using Canva, Photoshop, and CapCut Pro to create engaging posters, banners, and social media media content.",
        profile_fathir_card1_label: "FOCUS", profile_fathir_card1_val: "Hardware & Design",
        profile_fathir_card2_label: "TOOLS", profile_fathir_card2_val: "PS / Canva / AE",
        profile_fathir_card3_label: "STYLE", profile_fathir_card3_val: "Precision & Creative",

        profile_valerian_role: "Graphic Designer & Illustrator",
        profile_valerian_desc1: "Skilled graphic designer creating aesthetic and functional visual artwork across various design styles from minimalist to illustrative.",
        profile_valerian_desc2: "Experienced in branding, packaging design, and digital illustration crafted with meticulous attention to detail and visual harmony.",
        profile_valerian_card1_label: "FOCUS", profile_valerian_card1_val: "Graphic Design",
        profile_valerian_card2_label: "TOOLS", profile_valerian_card2_val: "AI / Procreate",
        profile_valerian_card3_label: "STYLE", profile_valerian_card3_val: "Artistic",

        profile_bima_role: "Full-Stack Developer & Tech Lead",
        profile_bima_desc1: "Full-stack developer experienced in building scalable web and mobile applications, mastering modern JavaScript ecosystems from frontend to backend.",
        profile_bima_desc2: "Tech lead guiding teams in adopting latest technologies and development best practices with a passion for open-source and knowledge sharing.",
        profile_bima_card1_label: "FOCUS", profile_bima_card1_val: "Full-Stack",
        profile_bima_card2_label: "STACK", profile_bima_card2_val: "React / Node",
        profile_bima_card3_label: "STYLE", profile_bima_card3_val: "Scalable",
    },
    JPN: {
        // Navbar
        nav_home: "ホーム",
        nav_about: "概要",
        nav_services: "事業内容",
        nav_project: "プロジェクト",
        nav_gallery: "ギャラリー",
        nav_achievement: "実績",
        nav_testimonials: "お客様の声",
        nav_contact: "お問い合わせ",

        // Hero
        hero_title_1: "Shared Ideas",
        hero_title_2: "One Alliance",
        hero_subtitle: "価値あるソリューションを創出するプロフェッショナル集団",
        hero_cta: "今すぐ始める",

        // Common Buttons
        btn_back: "戻る",
        btn_next: "次へ",
        btn_more_about: "詳細を見る",
        btn_view_gallery: "ギャラリーを見る",
        btn_view_project: "プロジェクトを見る",
        btn_view_profile: "チームを見る",
        btn_contact_me: "お問い合わせ",

        // About Section
        about_title_1: "S A K A N C A",
        about_title_2: "A L L I A N C E",
        about_desc_1: "サカンカン・アライアンス（Sakanca Alliance）は、「旅の仲間」「親友」「共に歩むパートナー」を意味する「サカンカン（Sakanca）」と、協働を意味する「アライアンス（Alliance）」に由来しています。クリエイティブ、テクノロジー、自動車、旅行体験を統合したコラボレーションネットワークです。",
        about_desc_2: "すべてのアイデアや夢は、最適なパートナーと共に実現されるべきだと私たちは信じています。個人の皆様、企業、コミュニティへ最高のソリューションを提供するため、相互に支え合う事業ユニットの拠点として存在しています。",

        // Services Section
        services_title: "事業内容",
        service_visual_name: "Sakanca Visual",
        service_auto_name: "Sakanca Auto",
        service_escape_name: "Sakanca Escape",
        service_tech_name: "Sakanca Tech",
        service_dev_name: "Sakanca Dev",
        service_pet_name: "Sakanca Pet",

        // Detailed Services Section
        det_visual_desc: "Sakanca Visualはビデオグラフィー、写真撮影、クリエイティブコンテンツ制作を担当しています。プロモーション、ブランディング、イベント記録、SNS用に高品質で魅力的なビジュアルを提供します。",
        det_auto_desc: "Sakanca Autoは、バイクのカスタマイズ、アクセサリー取り付け、車両のご相談まで自動車関連サービスを提供します。品質と精度を最優先し、お客様のスタイルに合わせた仕上がりをお届けします。",
        det_escape_desc: "Sakanca Escapeは、ジョグジャカルタでの印象的な旅行・ツアーサービスを提供します。シティツアーからカスタム旅程まで、快適で安全かつ楽しい旅をサポートします。",
        det_tech_desc: "Sakanca Techは、ノートPC、デスクトップ、PCパーツ、周辺機器の販売を行っています。学習、仕事、ビジネスに最適な機器選びを専門的なコンサルティングと共にサポートします。",
        det_dev_desc: "Sakanca Devは、革新的なウェブサイト、アプリケーション、情報システムの開発に特化しています。デジタル時代におけるビジネスの効率化と品質向上を実現するカスタムソリューションを提供します。",
        det_pet_desc: "Sakanca Petは、ペットのグルーミング、充実した設備を備えたペットホテル、プレミアムフードを提供し、大切なペットに最高の快適さと愛情をお届けします。",

        // Gallery Section
        gallery_journey: "ビジュアルジャーニー",
        gallery_title: "サカンカン ギャラリー",
        gallery_desc: "インスピレーションに満ちた最高の瞬間とビジュアルの軌跡。",

        // Profile Section
        profile_tazar_role: "クリエイティブデベロッパー & ビジュアルストーリテラー",
        profile_tazar_desc1: "技術とビジュアルを融合させるクリエイター。After EffectsやCapCut Proによる動画編集、Canvaによるグラフィックデザインに精通。",
        profile_tazar_desc2: "Next.jsとTypeScriptを用いたモダンなフロントエンド開発者。動的なビジュアル美と効率的なコード機能を両立させます。",
        profile_tazar_card1_label: "FOCUS", profile_tazar_card1_val: "Front End Dev",
        profile_tazar_card2_label: "TOOLS", profile_tazar_card2_val: "Next.js / AE",
        profile_tazar_card3_label: "STYLE", profile_tazar_card3_val: "Modern & Clean",

        profile_hafidz_role: "クリエイティブディレクター & ブランドストラテジスト",
        profile_hafidz_desc1: "強力なブランドアイデンティティ構築において5年以上の実績を持つクリエイティブディレクター。一貫したビジュアル戦略を設計。",
        profile_hafidz_desc2: "深いリサーチと美的直感を組み合わせ、様々な業界のクライアントにインパクトあるキャンペーンを提供します。",
        profile_hafidz_card1_label: "FOCUS", profile_hafidz_card1_val: "Brand Identity",
        profile_hafidz_card2_label: "TOOLS", profile_hafidz_card2_val: "AI / Figma",
        profile_hafidz_card3_label: "STYLE", profile_hafidz_card3_val: "Bold & Impactful",

        profile_clara_role: "ビデオグラファー & モーションデザイナー",
        profile_clara_desc1: "シネマティックな映像制作を専門とするプロビデオグラファー。多様なカメラとレンズを駆使したクリエイティブな撮影技術。",
        profile_clara_desc2: "After EffectsやDaVinci Resolveを使用したモーションプログラミングとVFXのスペシャリスト。感情と物語を映像に込めます。",
        profile_clara_card1_label: "FOCUS", profile_clara_card1_val: "Videography",
        profile_clara_card2_label: "TOOLS", profile_clara_card2_val: "DaVinci / AE",
        profile_clara_card3_label: "STYLE", profile_clara_card3_val: "Cinematic",

        profile_fathir_role: "ハードウェアスペシャリスト & グラフィックデザイナー",
        profile_fathir_desc1: "PC・ノートPCの組み立て、メンテナンス、アップグレード、トラブルシューティング、修理全般を担当。確かな技術で最適なソリューションを提供。",
        profile_fathir_desc2: "Canva、Photoshop、CapCut Proを使用したデザイン・動画編集経験も豊富で、ポスターやSNS用コンテンツを制作します。",
        profile_fathir_card1_label: "FOCUS", profile_fathir_card1_val: "Hardware & Design",
        profile_fathir_card2_label: "TOOLS", profile_fathir_card2_val: "PS / Canva / AE",
        profile_fathir_card3_label: "STYLE", profile_fathir_card3_val: "Precision & Creative",

        profile_valerian_role: "グラフィックデザイナー & イラストレーター",
        profile_valerian_desc1: "ミニマルからイラストまで多彩なスタイルで、美的かつ機能的なビジュアルを制作するグラフィックデザイナー。",
        profile_valerian_desc2: "ブランディング、パッケージデザイン、デジタルイラストに長けており、細部と視覚的調和にこだわった制作を行います。",
        profile_valerian_card1_label: "FOCUS", profile_valerian_card1_val: "Graphic Design",
        profile_valerian_card2_label: "TOOLS", profile_valerian_card2_val: "AI / Procreate",
        profile_valerian_card3_label: "STYLE", profile_valerian_card3_val: "Artistic",

        profile_bima_role: "フルスタックデベロッパー & テックリード",
        profile_bima_desc1: "スケーラブルなウェブおよびモバイルアプリ構築経験を持つフルスタックエンジニア。モダンなJavaScriptエコシステムを網羅。",
        profile_bima_desc2: "チームの最新技術導入と開発プラクティスを指導するテックリード。オープンソースとナレッジ共有に情熱を注いでいます。",
        profile_bima_card1_label: "FOCUS", profile_bima_card1_val: "Full-Stack",
        profile_bima_card2_label: "STACK", profile_bima_card2_val: "React / Node",
        profile_bima_card3_label: "STYLE", profile_bima_card3_val: "Scalable",
    }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
    const [language, setLanguageState] = useState<Language>('ID');
    const [isFading, setIsFading] = useState(false);

    const setLanguage = (newLang: Language) => {
        if (newLang === language || isFading) return;
        setIsFading(true);
        setTimeout(() => {
            setLanguageState(newLang);
            setTimeout(() => {
                setIsFading(false);
            }, 80);
        }, 300);
    };

    const t = (key: string): string => {
        return translations[language][key] || translations['ID'][key] || key;
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning: isFading }}>
            <div className={`w-full min-h-full ${isFading ? 'lang-fading' : 'lang-normal'}`}>
                {children}
            </div>
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}
