export interface Localized {
  ID: string;
  EN: string;
  JPN: string;
}

export interface Button {
  url: string;
  text: Localized;  
}

export interface HeroImage {
  src: string;
  alt: string;
  zoomType: "in" | "out";
}

export interface Hero {
  id: number;
  title1: string;
  title2: string;
  subtitle: Localized;
  cta_primary: { url: string; text: Localized };
  background_images: HeroImage[];
  is_active: boolean;
}

export interface About {
  id: number;
  title1: string;
  title2: string;
  description: Localized;
  logo: string;
  background_image: string;
}

export interface Service {
  id: number;
  name: string;
  slug: string;
  logo: string;
  col: "left" | "right";
  order: number;
  is_active: boolean;
}

export interface DetailedService {
  id: number;
  service_id: number;
  title_line1: string;
  title_line2: string;
  background_image: string;
  description: Localized;
  order: number;
  is_active: boolean;
  service?: Service;
}

export interface Project {
  id: number;
  service_id: number;
  name: Localized;
  description: Localized;
  thumbnail: string;
  url: string | null;
  order: number;
  is_active: boolean;
  service?: Service;
}

export interface Testimonial {
  id: number;
  client_name: string;
  content: Localized;
  rating: number;
  order: number;
  is_active: boolean;
}

export interface TeamMember {
  id: number;
  name: string;
  surname: string;
  focus: Localized;
  description1: Localized;
  description2: Localized;
  skills: string[];
  photo: string;
  background_image: string;
  instagram_url: string | null;
  email: string | null;
  github_url: string | null;
  linkedin_url: string | null;
  order: number;
  is_active: boolean;
}

export interface GalleryImage {
  src: string;
  alt: string;
  zoomType: "in" | "out";
}

export interface GalleryItem {
  id: number;
  title: Localized;
  subtitle: Localized;
  text_kicker: Localized;
  images: GalleryImage[];
  order: number;
  is_active: boolean;
}

export interface SiteSetting {
  id: number;
  site_name: string;
  site_logo: string;
  footer_copyright: string | null;
  social_instagram: string | null;
  social_tiktok: string | null;
  social_linkedin: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  services_section_bg: string | null;
  projects_section_bg: string | null;
  testimonials_section_bg: string | null;
}

export interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}
