import { createContext, useState, useEffect, ReactNode } from "react";
import { Language } from "@/lib/translations";

const LANGUAGE_STORAGE_KEY = "Nandi-stationery-lang";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  toggleLanguage: () => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Load saved language preference
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(LANGUAGE_STORAGE_KEY);
      if (saved === "te" || saved === "en") {
        return saved;
      }
    }
    return "en";
  });

  // Save language preference
  useEffect(() => {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
    // Update document lang attribute for accessibility
    document.documentElement.lang = language === "te" ? "te" : "en";
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const toggleLanguage = () => {
    setLanguageState((prev) => (prev === "en" ? "te" : "en"));
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}
