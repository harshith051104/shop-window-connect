import { Link } from "react-router-dom";
import { MessageCircle, Gift, Package, Users, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import FloatingCartButton from "@/components/FloatingCartButton";
import { giftCategories } from "@/data/products";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useTranslation, useLanguage } from "@/hooks/useLanguage";

const GiftsPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handleBulkInquiry = () => {
    const message = language === "te"
      ? `🎁 *బల్క్ గిఫ్ట్ ఆర్డర్ విచారణ*\n*Bulk Gift Order Inquiry*\n\nనమస్కారం! నాకు బల్క్ గిఫ్ట్ ఆర్డర్లపై ఆసక్తి ఉంది.\n\n📦 దయచేసి షేర్ చేయండి:\n- అందుబాటులో ఉన్న గిఫ్ట్ ప్యాక్స్\n- బల్క్ ధరలు\n- కస్టమైజేషన్ ఆప్షన్లు\n\nధన్యవాదాలు!`
      : `🎁 *Bulk Gift Order Inquiry*\n\nHello! I'm interested in bulk gift orders.\n\n📦 Please share:\n- Available gift packs\n- Bulk pricing\n- Customization options\n\nThank you!`;
    window.open(getWhatsAppUrl(message), "_blank");
  };

  const handleCustomGift = () => {
    const message = language === "te"
      ? `🎁 *కస్టమ్ గిఫ్ట్ హంపర్ అభ్యర్థన*\n*Custom Gift Hamper Request*\n\nనమస్కారం! నేను కస్టమ్ గిఫ్ట్ హంపర్ తయారు చేయాలనుకుంటున్నాను.\n\n📋 దయచేసి సహాయం చేయండి:\n- హంపర్ కోసం అందుబాటులో ఉన్న వస్తువులు\n- ప్యాకింగ్ ఆప్షన్లు\n- ధర పరిధి\n\nధన్యవాదాలు!`
      : `🎁 *Custom Gift Hamper Request*\n\nHello! I'd like to create a custom gift hamper.\n\n📋 Please help me with:\n- Available items for hamper\n- Packing options\n- Price range\n\nThank you!`;
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 py-8 sm:py-12">
          <div className="container text-center">
            <span className="inline-block bg-pink-200 dark:bg-pink-800 text-pink-800 dark:text-pink-200 px-4 py-1 rounded-full text-sm font-medium mb-3">
              🎁 {t("giftItems")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {t("perfectGifts")}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {language === "te" 
                ? "పుట్టినరోజు రిటర్న్ గిఫ్ట్స్, స్కూల్ ప్రైజులు, కార్పొరేట్ గిఫ్ట్స్, మరియు కస్టమ్ గిఫ్ట్ హంపర్లు అందుబాటు ధరల్లో."
                : "Birthday return gifts, school prizes, corporate gifts, and custom gift hampers at affordable prices."}
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-8 sm:py-10 bg-secondary/30">
          <div className="container">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Gift className="w-10 h-10 mx-auto text-pink-500 mb-3" />
                <h3 className="font-semibold mb-1">{t("returnGifts")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("returnGiftsDesc")}
                </p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Package className="w-10 h-10 mx-auto text-purple-500 mb-3" />
                <h3 className="font-semibold mb-1">{t("giftPacking")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("giftPackingDesc")}
                </p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Users className="w-10 h-10 mx-auto text-blue-500 mb-3" />
                <h3 className="font-semibold mb-1">{t("bulkOrders")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("bulkOrdersDesc")}
                </p>
              </div>
              <div className="bg-card rounded-xl p-5 border border-border text-center">
                <Phone className="w-10 h-10 mx-auto text-green-500 mb-3" />
                <h3 className="font-semibold mb-1">{t("customHampers")}</h3>
                <p className="text-sm text-muted-foreground">
                  {t("customHampersDesc")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Gift Items Grid */}
        {/* Gift Categories Grid */}
        <section className="py-8 sm:py-12">
          <div className="container">
            <h2 className="text-2xl font-bold mb-6 text-center">{t("browseGiftCategories")}</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {giftCategories.map((category) => (
                <Link
                  key={category.id}
                  to={`/gifts/${category.slug}`}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:border-pink-300"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden">
                    <OptimizedImage
                      src={category.image}
                      alt={category.name}
                      aspectRatio="video"
                      className="group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 right-3">
                      <span className="bg-white/90 text-pink-600 text-xs font-medium px-2 py-1 rounded-full">
                        {category.itemCount} {t("itemsCount")}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-bold text-foreground mb-1 group-hover:text-pink-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                      {category.description}
                    </p>
                    <div className="flex items-center text-pink-600 font-medium text-sm">
                      {t("browseItems")}
                      <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bulk Order CTA */}
        <section className="py-10 sm:py-14 bg-gradient-to-r from-pink-500 to-purple-600 text-white">
          <div className="container text-center">
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              {t("needBulkOrders")}
            </h2>
            <p className="text-white/90 max-w-md mx-auto mb-6">
              {t("bulkOrderInfo")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                size="lg"
                variant="secondary"
                onClick={handleBulkInquiry}
                className="bg-white text-purple-600 hover:bg-white/90"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                {t("bulkInquiry")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={handleCustomGift}
                className="border-white text-white hover:bg-white/10"
              >
                <Gift className="w-5 h-5 mr-2" />
                {t("customHamper")}
              </Button>
            </div>
          </div>
        </section>

        {/* Pricing Info */}
        <section className="py-8 sm:py-10">
          <div className="container">
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h2 className="text-xl font-bold mb-4 text-center">
                💰 {t("bulkPricingGuide")}
              </h2>
              <div className="grid sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">10-25 pcs</div>
                  <p className="text-sm text-muted-foreground">5% {t("discount")}</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">25-50 pcs</div>
                  <p className="text-sm text-muted-foreground">10% {t("discount")}</p>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary mb-1">50+ pcs</div>
                  <p className="text-sm text-muted-foreground">{t("specialPricing")}</p>
                </div>
              </div>
              <p className="text-center text-sm text-muted-foreground mt-6">
                {language === "te" 
                  ? "* తగ్గింపులు వస్తువుల ప్రకారం మారుతాయి. ఖచ్చితమైన ధరల కోసం మమ్మల్ని సంప్రదించండి."
                  : "* Discounts vary by item. Contact us for exact pricing."}
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCartButton />
    </div>
  );
};

export default GiftsPage;
