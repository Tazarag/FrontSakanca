"use client";

import React from "react";
import { useServices } from "@/hooks/useServices";
import { useSiteSettings } from "@/hooks/useSiteSettings";

export default function FooterSection() {
  const { data: services } = useServices();
  const { data: settings } = useSiteSettings();

  const brandName = settings?.site_name || "Sakanca Alliance";

  return (
    <footer className="w-full bg-[#e9e0cf] text-[#2D2A26] px-8 md:px-16 pt-8 pb-5 font-sans overflow-hidden">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-6 max-w-7xl mx-auto w-full">
        {/* Column 1: Services (Dinamis dari Database) */}
        <div className="flex flex-col">
          <div className="border-t border-[#2D2A26] pt-3 mb-4">
            <h4 className="font-bold text-xs tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D2A26] block"></span>
              SERVICES
            </h4>
          </div>
          <ul className="flex flex-col gap-2 text-base font-semibold text-[#2D2A26]/80">
            {services && services.length > 0 ? (
              services.map((service) => (
                <li key={service.id}>
                  <a
                    href="#services"
                    className="hover:text-[#111844] transition-colors"
                  >
                    {service.name}
                  </a>
                </li>
              ))
            ) : (
              <>
                <li>
                  <a href="#services" className="hover:text-[#111844]">
                    Sakanca Visual
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#111844]">
                    Sakanca Auto
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#111844]">
                    Sakanca Escape
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#111844]">
                    Sakanca Tech
                  </a>
                </li>
                <li>
                  <a href="#services" className="hover:text-[#111844]">
                    Sakanca Dev
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>

        {/* Column 2: Projects */}
        <div className="flex flex-col">
          <div className="border-t border-[#2D2A26] pt-3 mb-4">
            <h4 className="font-bold text-xs tracking-widest flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L22 20H2L12 2Z" />
              </svg>
              PROJECTS
            </h4>
          </div>
          <ul className="flex flex-col gap-2 text-base font-semibold text-[#2D2A26]/80">
            <li>
              <a
                href="#project"
                className="hover:text-[#111844] transition-colors"
              >
                Our Portfolio
              </a>
            </li>
            <li>
              <a
                href="#project"
                className="hover:text-[#111844] transition-colors"
              >
                Recent Works
              </a>
            </li>
          </ul>
        </div>

        {/* Column 3: Company */}
        <div className="flex flex-col">
          <div className="border-t border-[#2D2A26] pt-3 mb-4">
            <h4 className="font-bold text-xs tracking-widest flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#2D2A26] block"></span>
              COMPANY
            </h4>
          </div>
          <ul className="flex flex-col gap-2 text-base font-semibold text-[#2D2A26]/80">
            <li>
              <a
                href="#about"
                className="hover:text-[#111844] transition-colors"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href="#profile"
                className="hover:text-[#111844] transition-colors"
              >
                Our Team
              </a>
            </li>
            <li>
              <a
                href="#gallery"
                className="hover:text-[#111844] transition-colors"
              >
                Gallery
              </a>
            </li>
          </ul>
        </div>

        {/* Column 4: Social & Contact (Dinamis dari SiteSetting) */}
        <div className="flex flex-col">
          <div className="border-t border-[#2D2A26] pt-3 mb-4">
            <h4 className="font-bold text-xs tracking-widest flex items-center gap-2">
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2L22 20H2L12 2Z" />
              </svg>
              SOCIAL & CONTACT
            </h4>
          </div>
          <ul className="flex flex-col gap-2 text-base font-semibold text-[#2D2A26]/80">
            {settings?.social_instagram && (
              <li>
                <a
                  href={settings.social_instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111844] transition-colors"
                >
                  Instagram
                </a>
              </li>
            )}
            {settings?.social_tiktok && (
              <li>
                <a
                  href={settings.social_tiktok}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111844] transition-colors"
                >
                  TikTok
                </a>
              </li>
            )}
            {settings?.social_linkedin && (
              <li>
                <a
                  href={settings.social_linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111844] transition-colors"
                >
                  LinkedIn
                </a>
              </li>
            )}
            {settings?.contact_email && (
              <li>
                <a
                  href={`mailto:${settings.contact_email}`}
                  className="hover:text-[#111844] transition-colors"
                >
                  Email
                </a>
              </li>
            )}
            {settings?.contact_phone && (
              <li>
                <a
                  href={`https://wa.me/${settings.contact_phone.replace(/[^0-9]/g, "")}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#111844] transition-colors"
                >
                  WhatsApp
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>

      {/* Bottom Footer Info */}
      <div className="max-w-7xl mx-auto w-full flex justify-between items-center text-[10px] sm:text-xs font-bold text-[#2D2A26]/50 border-t border-[#2D2A26]/20 pt-4">
        <p className="hover:text-[#2D2A26] transition-colors cursor-pointer">
          {settings?.footer_copyright || "All Rights Reserved"}
        </p>
        <p>
          © {brandName} {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
