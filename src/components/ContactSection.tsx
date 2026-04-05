import { MapPin, Phone, Clock, MessageCircle, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SHOP_INFO, getWhatsAppUrl, getGeneralInquiryMessage } from "@/lib/whatsapp";
import { useTranslation } from "@/hooks/useLanguage";

const GOOGLE_MAPS_LINK = "https://www.google.com/maps/place/Nandi+stationary+and+general+stores/@17.6156365,78.0786505,17z/data=!3m1!4b1!4m6!3m5!1s0x3bcbf946ea52c95f:0xb0efcd58c3956710!8m2!3d17.6156365!4d78.0812254!16s%2Fg%2F11kq3v9mst?entry=ttu&g_ep=EgoyMDI2MDIwNC4wIKXMDSoASAFQAw%3D%3D";

const ContactSection = () => {
  const { t } = useTranslation();

  const handleDirections = () => {
    window.open(GOOGLE_MAPS_LINK, "_blank");
  };

  return (
    <section id="contact" className="py-12 sm:py-16 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-3">
            📍 {t("visitUs")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {t("findOurShop")}
          </h2>
          <p className="text-muted-foreground">
            {t("contactDesc")}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact details card */}
            <div className="bg-card rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl font-bold text-foreground mb-6">{SHOP_INFO.name}</h3>

              <div className="space-y-5">
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-0.5">{t("address")}</p>
                    <p className="text-sm text-muted-foreground">{SHOP_INFO.address}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-0.5">{t("phoneWhatsApp")}</p>
                    <p className="text-sm text-muted-foreground">{SHOP_INFO.phone}</p>
                  </div>
                </div>

                {/* Timings */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground mb-0.5">{t("shopTimings")}</p>
                    <p className="text-sm text-muted-foreground">{SHOP_INFO.timings}</p>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="whatsapp"
                  className="flex-1"
                  onClick={() => window.open(getWhatsAppUrl(getGeneralInquiryMessage()), "_blank")}
                >
                  <MessageCircle className="w-4 h-4" />
                  {t("chatOnWhatsApp")}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleDirections}
                >
                  <Navigation className="w-4 h-4" />
                  {t("getDirections")}
                </Button>
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-secondary rounded-xl border border-border overflow-hidden min-h-[300px]">
              <a
                href={GOOGLE_MAPS_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className="block relative w-full h-full min-h-[300px] group"
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15224.997576283592!2d78.3979038!3d17.4477887!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb9158f201b205%3A0x11bbe7be7792411b!2sNANDI%20STATIONERY%20%26%20GENERAL%20STORES!5e0!3m2!1sen!2sin!4v1709400000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 w-full h-full pointer-events-none"
                ></iframe>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium flex items-center gap-2">
                    <Navigation className="w-4 h-4" />
                    {t("openInGoogleMaps")}
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
