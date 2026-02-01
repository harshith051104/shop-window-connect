import { Link } from "react-router-dom";
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import { useCart } from "@/hooks/useCart";
import { useTranslation, useLanguage } from "@/hooks/useLanguage";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { getCartMessageBilingual } from "@/lib/translations";

const CartPage = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotalItems } = useCart();
  const { t } = useTranslation();
  const { language } = useLanguage();

  const handlePlaceOrder = () => {
    const message = getCartMessageBilingual(items, getTotalItems(), language);
    window.open(getWhatsAppUrl(message), "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <ShoppingCart className="w-20 h-20 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t("emptyCartMessage")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("emptyCartSubtext")}
            </p>
            <Link to="/items">
              <Button>
                <ShoppingBag className="w-4 h-4 mr-2" />
                {t("browseItems")}
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Cart Header */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/30 py-6 sm:py-8">
          <div className="container">
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{t("cart")}</span>
            </nav>

            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-1">
                  🛒 {t("yourCart")}
                </h1>
                <p className="text-muted-foreground">
                  {getTotalItems()} {t("itemsCount")}
                </p>
              </div>
              <Link to="/items">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("continueShopping")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Cart Items */}
        <section className="py-6 sm:py-8">
          <div className="container">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Items List */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item, index) => (
                  <div
                    key={`${item.id}-${item.color || 'default'}-${index}`}
                    className="bg-card rounded-xl border border-border p-4 flex gap-4"
                  >
                    {/* Image */}
                    <div className="w-20 h-20 sm:w-24 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden">
                      <OptimizedImage
                        src={item.image}
                        alt={item.name}
                        aspectRatio="square"
                      />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-1 line-clamp-2">
                        {item.name}
                      </h3>
                      {item.color && (
                        <p className="text-xs text-muted-foreground mb-1">
                          {language === "te" ? "రంగు" : "Color"}: {item.color}
                        </p>
                      )}
                      <p className="text-primary font-bold mb-3">{item.price}</p>

                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <div className="flex items-center border border-border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-2 hover:bg-muted transition-colors rounded-l-lg"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-muted transition-colors rounded-r-lg"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart */}
                <div className="text-center pt-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearCart}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t("clearCart")}
                  </Button>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-card rounded-xl border border-border p-4 sm:p-5 sticky top-20 lg:top-24">
                  <h2 className="text-base sm:text-lg font-bold mb-4">{t("orderSummary")}</h2>

                  {/* Items List */}
                  <div className="space-y-2 mb-4 max-h-40 sm:max-h-48 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.id} className="flex justify-between text-xs sm:text-sm">
                        <span className="text-muted-foreground truncate flex-1 mr-2">
                          {item.name}
                        </span>
                        <span className="font-medium">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>

                  <hr className="my-4 border-border" />

                  {/* Total */}
                  <div className="flex justify-between items-center mb-4 sm:mb-6">
                    <span className="font-semibold text-sm sm:text-base">{t("totalItems")}</span>
                    <span className="text-lg sm:text-xl font-bold text-primary">
                      {getTotalItems()}
                    </span>
                  </div>

                  {/* Note */}
                  <div className="bg-secondary/50 rounded-lg p-2.5 sm:p-3 mb-4 text-xs text-muted-foreground">
                    <p>
                      {language === "te" 
                        ? "💡 దుకాణం ద్వారా తుది ధర నిర్ధారించబడుతుంది. ధర బ్రాండ్ మరియు అందుబాటుపై ఆధారపడి ఉంటుంది."
                        : "💡 Final price will be confirmed by the shop. Price depends on brand and availability."}
                    </p>
                  </div>

                  {/* Place Order Button */}
                  <Button
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                    size="lg"
                    onClick={handlePlaceOrder}
                  >
                    <MessageCircle className="w-5 h-5 mr-2" />
                    {t("placeOrder")}
                  </Button>

                  <p className="text-xs text-center text-muted-foreground mt-3">
                    {language === "te" 
                      ? "📍 నిర్ధారణ తర్వాత దుకాణం నుండి తీసుకోండి"
                      : "📍 Pick up from shop after confirmation"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;
