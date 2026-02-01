import { Plus, Check, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import OptimizedImage from "@/components/OptimizedImage";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/hooks/useLanguage";
import { ProductItem } from "@/data/products";
import { useState } from "react";

interface ItemCardProps {
  item: ProductItem;
}

const ItemCard = ({ item }: ItemCardProps) => {
  const { addItem, items } = useCart();
  const { t, language } = useTranslation();
  const [justAdded, setJustAdded] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(item.colors?.[0] || "");

  const cartItem = items.find((i) => i.id === item.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
      color: selectedColor || undefined,
      quantity: selectedQuantity,
    });
    setJustAdded(true);
    setShowDialog(false);
    setSelectedQuantity(1);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const handleOpenDialog = () => {
    setSelectedQuantity(1);
    setSelectedColor(item.colors?.[0] || "");
    setShowDialog(true);
  };

  const incrementQuantity = () => setSelectedQuantity(prev => prev + 1);
  const decrementQuantity = () => setSelectedQuantity(prev => Math.max(1, prev - 1));

  const inCartLabel = language === "te" ? `${quantityInCart} కార్ట్‌లో` : `${quantityInCart} in cart`;

  return (
    <>
      <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-md transition-all duration-300 group">
        {/* Product Image */}
        <div className="relative">
          <OptimizedImage
            src={item.image}
            alt={item.name}
            aspectRatio="square"
            className="group-hover:scale-105 transition-transform duration-300"
          />
          {quantityInCart > 0 && (
            <div className="absolute top-2 right-2 bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
              {inCartLabel}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 sm:p-4">
          <h3 className="text-sm sm:text-base font-semibold text-foreground mb-1 line-clamp-2">
            {item.name}
          </h3>

          {/* Price */}
          <div className="text-primary font-bold text-base sm:text-lg mb-3">
            {item.price}
          </div>

          {/* Add to Cart button */}
          <Button
            variant={justAdded ? "default" : "outline"}
            size="sm"
            onClick={handleOpenDialog}
            className="w-full transition-all"
          >
            {justAdded ? (
              <>
                <Check className="w-4 h-4 mr-1" />
                {t("added")}
              </>
            ) : (
              <>
                <Plus className="w-4 h-4 mr-1" />
                {t("addToCart")}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Add to Cart Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{item.name}</DialogTitle>
            <DialogDescription className="text-primary font-bold text-lg">
              {item.price}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Quantity Selector */}
            <div>
              <label className="text-sm font-medium mb-2 block">
                {language === "te" ? "పరిమాణం" : "Quantity"}
              </label>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={decrementQuantity}
                  disabled={selectedQuantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-xl font-semibold min-w-[3rem] text-center">
                  {selectedQuantity}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={incrementQuantity}
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Color Selector */}
            {item.colors && item.colors.length > 0 && (
              <div>
                <label className="text-sm font-medium mb-2 block">
                  {language === "te" ? "రంగు" : "Color"}
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {item.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-2 rounded-lg border text-sm font-medium transition-all ${
                        selectedColor === color
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <Button
            onClick={handleAddToCart}
            className="w-full"
            size="lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            {language === "te" ? "కార్ట్‌కు జోడించండి" : "Add to Cart"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ItemCard;
