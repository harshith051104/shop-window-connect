import { Link } from "react-router-dom";
import { Gift, Package, Star, Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, getOrderMessage } from "@/lib/whatsapp";
import { useTranslation, useLanguage } from "@/hooks/useLanguage";

const GiftsSection = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const giftServices = [
    {
      icon: Gift,
      titleKey: "birthdayReturnGifts" as const,
      descKey: "birthdayReturnGiftsDesc" as const,
      priceRange: "₹25 - ₹150",
    },
    {
      icon: Heart,
      titleKey: "weddingReturnGifts" as const,
      descKey: "weddingReturnGiftsDesc" as const,
      priceRange: "₹50 - ₹300",
    },
    {
      icon: Star,
      titleKey: "schoolEventGifts" as const,
      descKey: "schoolEventGiftsDesc" as const,
      priceRange: "₹20 - ₹200",
    },
    {
      icon: Package,
      titleKey: "customGiftPacking" as const,
      descKey: "customGiftPackingDesc" as const,
      priceRange: "₹10 - ₹50",
    },
  ];

  const handleGiftInquiry = (service: string) => {
    const message = getOrderMessage(`Gift Service: ${service}\n\nI am interested in this service. Please share more details about:\n- Available options\n- Pricing for different quantities\n- Delivery/pickup timeline`);
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <section id="gifts" className="py-12 sm:py-16 paper-texture">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block bg-primary/20 text-primary-foreground px-4 py-1 rounded-full text-sm font-medium mb-3">
            🎁 {t("giftServices")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {t("returnGiftsPackingServices")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("giftServicesDesc")}
          </p>
        </div>
        
        {/* Services grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6 max-w-4xl mx-auto">
          {giftServices.map((service, index) => (
            <div 
              key={index}
              className="bg-card rounded-xl border border-border p-5 sm:p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <service.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-foreground mb-1">{t(service.titleKey)}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{t(service.descKey)}</p>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                    <span className="text-sm font-semibold text-primary">{service.priceRange} {t("perPack")}</span>
                    <Button 
                      variant="whatsappOutline" 
                      size="sm"
                      onClick={() => handleGiftInquiry(t(service.titleKey))}
                    >
                      {t("getQuote")}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Gifts Button */}
        <div className="text-center mt-8">
          <Link to="/gifts">
            <Button size="lg" variant="outline">
              {t("browseAllGiftItems")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
        
        {/* Bulk order note */}
        <div className="mt-10 bg-accent/10 border border-accent/30 rounded-xl p-5 sm:p-6 max-w-2xl mx-auto text-center">
          <h3 className="text-lg font-bold text-foreground mb-2 flex items-center justify-center gap-2">
            <Package className="w-5 h-5 text-accent" />
            {t("bulkOrdersWeDeliver")}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">
            {t("bulkDeliveryInfo")}
          </p>
          <Button 
            variant="whatsapp"
            onClick={() => {
              const message = language === "te" 
                ? `📦 *బల్క్ ఆర్డర్ విచారణ*\n\nహలో! నాకు ఈవెంట్ కోసం బల్క్ గిఫ్ట్ ప్యాక్‌లు కావాలి.\n\nదయచేసి బల్క్ ధరలు మరియు డెలివరీ ఆప్షన్ల గురించి వివరాలు షేర్ చేయండి.`
                : `📦 *Bulk Order Inquiry*\n\nHello! I need bulk gift packs for an event.\n\nPlease share details about bulk pricing and delivery options.`;
              window.open(getWhatsAppUrl(message), "_blank");
            }}
          >
            {t("enquireForBulkOrders")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default GiftsSection;
