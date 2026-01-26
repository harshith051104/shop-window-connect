import { useState } from "react";
import { Send, Search, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, getRequestItemMessage } from "@/lib/whatsapp";
import { useTranslation } from "@/hooks/useLanguage";

const RequestItemSection = () => {
  const { t } = useTranslation();
  const [itemName, setItemName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [urgency, setUrgency] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!itemName.trim()) {
      alert("Please enter the item name");
      return;
    }

    const message = getRequestItemMessage(itemName.trim(), quantity.trim(), urgency);
    window.open(getWhatsAppUrl(message), "_blank");
    
    // Reset form
    setItemName("");
    setQuantity("");
    setUrgency("");
  };

  return (
    <section className="py-12 sm:py-16 bg-secondary/30">
      <div className="container">
        <div className="max-w-xl mx-auto">
          {/* Section header */}
          <div className="text-center mb-8">
            <span className="inline-block bg-card text-foreground px-4 py-1 rounded-full text-sm font-medium mb-3 border border-border">
              <Search className="w-4 h-4 inline mr-1" />
              {t("cantFindSomething")}
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
              {t("requestAnyItem")}
            </h2>
            <p className="text-muted-foreground">
              {t("requestItemDesc")}
            </p>
          </div>
          
          {/* Request form */}
          <form onSubmit={handleSubmit} className="bg-card rounded-xl border border-border p-5 sm:p-6 shadow-sm">
            {/* Item name */}
            <div className="mb-4">
              <label htmlFor="itemName" className="block text-sm font-medium text-foreground mb-1.5">
                {t("itemName")} <span className="text-destructive">*</span>
              </label>
              <input
                type="text"
                id="itemName"
                value={itemName}
                onChange={(e) => setItemName(e.target.value)}
                placeholder="e.g., Parker Jotter Pen, A3 Chart Paper..."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
                required
              />
            </div>
            
            {/* Quantity */}
            <div className="mb-4">
              <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-1.5">
                {t("quantityNeeded")} <span className="text-muted-foreground">({t("optional")})</span>
              </label>
              <input
                type="text"
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g., 5 pieces, 1 box, 50 sheets..."
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              />
            </div>
            
            {/* Urgency */}
            <div className="mb-6">
              <label htmlFor="urgency" className="block text-sm font-medium text-foreground mb-1.5">
                {t("howUrgent")} <span className="text-muted-foreground">({t("optional")})</span>
              </label>
              <select
                id="urgency"
                value={urgency}
                onChange={(e) => setUrgency(e.target.value)}
                className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-colors"
              >
                <option value="">{t("selectUrgency")}</option>
                <option value="Not urgent - within 1 week">{t("notUrgent")}</option>
                <option value="Moderate - within 3-4 days">{t("moderateUrgent")}</option>
                <option value="Urgent - within 1-2 days">{t("urgent")}</option>
              </select>
            </div>
            
            {/* Submit button */}
            <Button 
              type="submit" 
              variant="whatsapp" 
              size="lg" 
              className="w-full"
            >
              <Send className="w-5 h-5" />
              {t("sendRequest")}
            </Button>
            
            {/* Disclaimer */}
            <div className="mt-4 flex items-start gap-2 text-xs text-muted-foreground bg-secondary/50 p-3 rounded-lg">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                <strong>{t("requestNote").split(":")[0]}:</strong> {t("requestNote").split(":").slice(1).join(":")}
              </p>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default RequestItemSection;
