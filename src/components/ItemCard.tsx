import { Plus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
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

  const cartItem = items.find((i) => i.id === item.id);
  const quantityInCart = cartItem?.quantity || 0;

  const handleAddToCart = () => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      category: item.category,
    });
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1500);
  };

  const inCartLabel = language === "te" ? `${quantityInCart} కార్ట్‌లో` : `${quantityInCart} in cart`;

  return (
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
          onClick={handleAddToCart}
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
  );
};

export default ItemCard;
