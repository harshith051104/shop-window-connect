import { MessageCircle, Heart } from "lucide-react";
import { SHOP_INFO, getWhatsAppUrl, getGeneralInquiryMessage } from "@/lib/whatsapp";
import { useTranslation } from "@/hooks/useLanguage";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-foreground text-background py-8">
      <div className="container">
        <div className="flex flex-col items-center text-center">
          {/* Shop name */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img 
                src="/images/nandi-logo.png" 
                alt="Nandi Stationery Logo" 
                className="w-full h-full object-contain brightness-0 invert"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold">{SHOP_INFO.name}</span>
          </div>
          
          {/* Quick contact */}
          <p className="text-background/70 text-sm mb-4">
            {t("qualityStationeryGifts")}
          </p>
          
          {/* WhatsApp button */}
          <a
            href={getWhatsAppUrl(getGeneralInquiryMessage())}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-whatsapp hover:bg-whatsapp-hover text-white px-5 py-2.5 rounded-lg font-medium transition-colors mb-6"
          >
            <MessageCircle className="w-5 h-5" />
            {t("chatWithUsOnWhatsApp")}
          </a>
          
          {/* Divider */}
          <div className="w-full max-w-xs h-px bg-background/20 mb-6"></div>
          
          {/* Copyright */}
          <p className="text-background/50 text-xs flex items-center gap-1">
            {t("madeWithLove").split("love")[0]} <Heart className="w-3 h-3 text-destructive fill-destructive" /> {t("madeWithLove").split("love")[1] || "for our valued customers"}
          </p>
          <p className="text-background/40 text-xs mt-1">
            © {new Date().getFullYear()} {SHOP_INFO.name}. {t("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
