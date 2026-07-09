"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import idTranslations from "@/locales/id.json";
import enTranslations from "@/locales/en.json";
import jpnTranslations from "@/locales/jpn.json";

export type Language = "ID" | "EN" | "JPN";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const translations: Record<Language, Record<string, string>> = {
  ID: idTranslations as Record<string, string>,
  EN: enTranslations as Record<string, string>,
  JPN: jpnTranslations as Record<string, string>,
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("ID");
  const [isFading, setIsFading] = useState(false);

  const setLanguage = (newLang: Language) => {
    if (newLang === language || isFading) return;
    setIsFading(true);
    setTimeout(() => {
      setLanguageState(newLang);
      setTimeout(() => setIsFading(false), 80);
    }, 300);
  };

  const t = (key: string): string => {
    return translations[language][key] ?? translations["ID"][key] ?? key;
  };

  return (
    <LanguageContext.Provider
      value={{ language, setLanguage, t, isTransitioning: isFading }}
    >
      <div
        className={`w-full min-h-full ${isFading ? "lang-fading" : "lang-normal"}`}
      >
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider");
  return context;
}
