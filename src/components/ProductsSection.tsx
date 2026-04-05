import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import OptimizedImage from "@/components/OptimizedImage";
import { useTranslation } from "@/hooks/useLanguage";
import { fetchCategories, type Category } from "@/services/sheetsApi";
import { BookLoader } from "@/components/ui/BookLoader";

const ProductsSection = () => {
  const { t } = useTranslation();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories.');
    } finally {
      setLoading(false);
    }
  };

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

        {/* Loading State */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-10">
            <BookLoader />
            <span className="mt-4 text-muted-foreground">Loading categories...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center mb-10">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
            <p className="text-destructive font-medium mb-4">{error}</p>
            <Button onClick={loadCategories} variant="outline" size="sm">
              Retry
            </Button>
          </div>
        )}

        {/* Categories grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {categories.slice(0, 4).map((category) => (
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
                    <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4">
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        {category.name}
                      </h3>
                      <p className="text-white/80 text-xs sm:text-sm">
                        {category.itemCount}+ {t("itemsCount")}
                      </p>
                    </div>
                  </div>

                  {/* Category Footer */}
                  <div className="p-3 sm:p-4 flex items-center justify-between mt-auto">
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2">
                      {category.description}
                    </p>
                    <ArrowRight className="w-5 h-5 text-primary group-hover:translate-x-1 transition-transform flex-shrink-0 ml-2" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

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
