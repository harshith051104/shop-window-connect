import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getWhatsAppUrl, getOrderMessage } from "@/lib/whatsapp";
import OptimizedImage from "@/components/OptimizedImage";

interface ProductCardProps {
  title: string;
  description: string;
  priceRange: string;
  items: string[];
  imagePath: string;
  imageAlt: string;
}

const ProductCard = ({ title, description, priceRange, items, imagePath, imageAlt }: ProductCardProps) => {
  const handleOrderClick = () => {
    const message = getOrderMessage(`Category: ${title}\nPlease share available options and prices.`);
    window.open(getWhatsAppUrl(message), "_blank");
  };

  return (
    <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group">
      {/* Product Image */}
      <OptimizedImage 
        src={imagePath}
        alt={imageAlt}
        aspectRatio="video"
        className="group-hover:scale-105 transition-transform duration-300"
      />
      
      {/* Content */}
      <div className="p-5 sm:p-6">
        <h3 className="text-lg font-bold text-foreground mb-1">{title}</h3>
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
        
        {/* Price range */}
        <div className="bg-primary/10 text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-semibold inline-block mb-4">
          {priceRange}
        </div>
        
        {/* Items list */}
        <ul className="text-sm text-muted-foreground space-y-1 mb-4">
          {items.slice(0, 4).map((item, index) => (
            <li key={index} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
              {item}
            </li>
          ))}
        </ul>
        
        {/* Order button */}
        <Button 
          variant="whatsappOutline" 
          size="sm" 
          onClick={handleOrderClick}
          className="w-full"
        >
          <MessageCircle className="w-4 h-4" />
          Enquire Now
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;
