import { MessageCircle } from "lucide-react";
import { getWhatsAppUrl, getGeneralInquiryMessage } from "@/lib/whatsapp";

const WhatsAppFAB = () => {
  return (
    <a
      href={getWhatsAppUrl(getGeneralInquiryMessage())}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50 w-14 h-14 bg-whatsapp hover:bg-whatsapp-hover rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-7 h-7 text-white" />
      
      {/* Tooltip */}
      <span className="absolute right-full mr-3 bg-foreground text-background text-sm px-3 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Order on WhatsApp
      </span>
      
      {/* Ping animation */}
      <span className="absolute inset-0 rounded-full bg-whatsapp animate-ping opacity-30"></span>
    </a>
  );
};

export default WhatsAppFAB;
