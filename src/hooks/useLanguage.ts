import { useContext } from "react";
import { LanguageContext } from "@/context/LanguageContext";
import { t, translations, Language } from "@/lib/translations";

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}

// Hook that returns a translation function bound to current language
export function useTranslation() {
  const { language } = useLanguage();
  
  const translate = (key: keyof typeof translations): string => {
    return t(key, language);
  };

  return { t: translate, language };
}
