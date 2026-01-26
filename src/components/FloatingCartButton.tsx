import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/hooks/useLanguage";

const FloatingCartButton = () => {
  const { getTotalItems } = useCart();
  const { t } = useTranslation();
  const itemCount = getTotalItems();

  // Don't show if cart is empty
  if (itemCount === 0) return null;

  return (
    <Link
      to="/cart"
      className="fixed bottom-20 right-4 z-50 sm:bottom-6 sm:right-6 safe-bottom safe-right"
    >
      <div className="relative">
        {/* Button */}
        <div className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-4 sm:px-5 py-2.5 sm:py-3 shadow-lg flex items-center gap-2 transition-all hover:scale-105 active:scale-95">
          <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
          <span className="font-semibold text-sm sm:text-base">{t("goToCart")}</span>
        </div>

        {/* Badge */}
        <div className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs font-bold rounded-full w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
          {itemCount > 99 ? "99+" : itemCount}
        </div>
      </div>
    </Link>
  );
};

export default FloatingCartButton;
