import { useLanguage } from "@/hooks/useLanguage";
import { Globe } from "lucide-react";

const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center gap-1 bg-secondary/50 rounded-full p-1 text-sm">
      <button
        onClick={() => setLanguage("en")}
        className={`px-3 py-1 rounded-full transition-all font-medium ${
          language === "en"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="Switch to English"
      >
        EN
      </button>
      <button
        onClick={() => setLanguage("te")}
        className={`px-3 py-1 rounded-full transition-all font-medium ${
          language === "te"
            ? "bg-primary text-primary-foreground shadow-sm"
            : "text-muted-foreground hover:text-foreground"
        }`}
        aria-label="తెలుగులో మార్చండి"
      >
        తెలుగు
      </button>
    </div>
  );
};

// Compact version for mobile
export const LanguageToggleCompact = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center gap-1.5 px-3 py-1.5 bg-secondary/50 hover:bg-secondary rounded-full transition-colors text-sm font-medium"
      aria-label={language === "en" ? "Switch to Telugu" : "Switch to English"}
    >
      <Globe className="w-4 h-4" />
      <span>{language === "en" ? "తెలుగు" : "EN"}</span>
    </button>
  );
};

export default LanguageToggle;
