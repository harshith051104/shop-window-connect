import { MessageCircle, ShoppingBag, Gift } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOP_INFO, getWhatsAppUrl, getGeneralInquiryMessage } from "@/lib/whatsapp";
import { useTranslation } from "@/hooks/useLanguage";

const Hero = () => {
  const { t } = useTranslation();
  
  const handleWhatsAppClick = () => {
    window.open(getWhatsAppUrl(getGeneralInquiryMessage()), "_blank");
  };

  return (
    <section className="relative paper-texture py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 left-5 text-4xl sm:text-5xl opacity-20 animate-float">✏️</div>
      <div className="absolute top-20 right-10 text-3xl sm:text-4xl opacity-20 animate-float" style={{ animationDelay: "1s" }}>📐</div>
      <div className="absolute bottom-10 left-1/4 text-3xl opacity-20 animate-float" style={{ animationDelay: "2s" }}>📎</div>
      
      <div className="container relative">
        <div className="max-w-2xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 text-primary-foreground px-4 py-1.5 rounded-full text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse"></span>
            {t("openNow")} • {t("orderViaWhatsApp")}
          </div>
          
          {/* Main heading */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground mb-4 leading-tight text-balance">
            {t("heroTitle")}
          </h1>
          
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto text-balance px-2">
            {t("heroDesc")}
            <strong className="text-foreground"> {t("orderOnWhatsAppPickup")}</strong>
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-8">
            <Button 
              variant="whatsapp" 
              size="xl" 
              onClick={handleWhatsAppClick}
              className="w-full sm:w-auto"
            >
              <MessageCircle className="w-5 h-5" />
              {t("orderOnWhatsApp")}
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild
              className="w-full sm:w-auto"
            >
              <a href="#products">
                <ShoppingBag className="w-4 h-4" />
                {t("viewProducts")}
              </a>
            </Button>
          </div>
          
          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <span className="text-lg">✅</span> {t("noOnlinePayment")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-lg">🏪</span> {t("shopPickup")}
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-lg">📦</span> {t("bulkDeliveryAvailable")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
