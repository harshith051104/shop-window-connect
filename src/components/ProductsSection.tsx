import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { categories } from "@/data/products";
import { useTranslation } from "@/hooks/useLanguage";

const ProductsSection = () => {
  const { t } = useTranslation();

  return (
    <section id="products" className="py-12 sm:py-16 bg-background">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-12">
          <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-3">
            📦 {t("ourProducts")}
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            {t("stationeryForEveryone")}
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            {t("productsDesc")}
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
          {categories.slice(0, 6).map((category) => (
            <Link
              key={category.id}
              to={`/category/${category.slug}`}
              className="group"
            >
              <div className="bg-card rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full flex flex-col">
                {/* Category Image */}
                <div className="relative overflow-hidden">
                  <OptimizedImage
                    src={category.image}
                    alt={category.name}
                    aspectRatio="video"
                    className="group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-lg font-bold text-white mb-1">
                      {category.name}
                    </h3>
                    <p className="text-white/80 text-sm">
                      {category.itemCount}+ {t("itemsAvailable")}
                    </p>
                  </div>
                </div>

                {/* Category Footer */}
                <div className="p-4 flex items-center justify-between">
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {category.description}
                  </p>
                  <ArrowRight className="w-5 h-5 text-primary flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-8">
          <Link to="/items">
            <Button size="lg" variant="outline">
              {t("viewAllCategories")}
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Note */}
        <p className="text-center text-sm text-muted-foreground mt-6 bg-secondary/50 py-3 px-4 rounded-lg max-w-xl mx-auto">
          💡 {t("clickCategoryToView")}
        </p>
      </div>
    </section>
  );
};

export default ProductsSection;
