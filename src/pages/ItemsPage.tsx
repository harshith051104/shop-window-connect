import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowRight, Loader2, AlertCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import OptimizedImage from "@/components/OptimizedImage";
import FloatingCartButton from "@/components/FloatingCartButton";
import { fetchCategories, fetchProducts, type Category, type ProductItem } from "@/services/sheetsApi";
import { useTranslation, useLanguage } from "@/hooks/useLanguage";
import ItemCard from "@/components/ItemCard";

const ItemsPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search');
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (searchQuery) {
      loadSearchResults();
    } else {
      loadCategories();
    }
  }, [searchQuery]);

  async function loadCategories() {
    try {
      setLoading(true);
      setError(null);
      const data = await fetchCategories();
      setCategories(data);
    } catch (err) {
      console.error('Error loading categories:', err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  async function loadSearchResults() {
    try {
      setLoading(true);
      setError(null);
      const response = await fetchProducts("", 1, 100, searchQuery || "");
      setProducts(response.data);
    } catch (err) {
      console.error('Error loading search results:', err);
      setError('Failed to load search results. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Page Header */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/30 py-8 sm:py-12">
          <div className="container text-center">
            <span className="inline-block bg-secondary text-secondary-foreground px-4 py-1 rounded-full text-sm font-medium mb-3">
              📦 {t("ourProducts")}
            </span>
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground mb-3">
              {searchQuery ? `Search Results for "${searchQuery}"` : t("browseCategories")}
            </h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              {searchQuery 
                ? `Found ${products.length} product${products.length !== 1 ? 's' : ''} matching "${searchQuery}"`
                : (language === "te" 
                  ? "మా పూర్తి స్టేషనరీ వస్తువుల సేకరణను బ్రౌజ్ చేయండి. అందుబాటులో ఉన్న అన్ని ఉత్పత్తులను చూడటానికి వర్గంపై క్లిక్ చేయండి."
                  : "Browse our complete collection of stationery items. Click on a category to see all available products.")}
            </p>
          </div>
        </section>

        {/* Categories Grid */}
        <section className="py-6 sm:py-8 md:py-12">
          <div className="container">
            {/* Loading State */}
            {loading && (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-3 text-muted-foreground">Loading categories...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="max-w-md mx-auto bg-destructive/10 border border-destructive/20 rounded-lg p-6 text-center">
                <AlertCircle className="w-12 h-12 mx-auto mb-3 text-destructive" />
                <p className="text-destructive font-medium mb-4">{error}</p>
                <button
                  onClick={searchQuery ? loadSearchResults : loadCategories}
                  className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Retry
                </button>
              </div>
            )}

            {/* Search Results */}
            {!loading && !error && searchQuery && (
              <div>
                {products.length > 0 ? (
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                    {products.map((product) => (
                      <ItemCard key={product.id} item={product} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground text-lg mb-4">No products found matching "{searchQuery}"</p>
                    <Link
                      to="/items"
                      className="inline-flex items-center text-primary hover:underline"
                    >
                      Browse all categories
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Categories */}
            {!loading && !error && !searchQuery && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
                {categories.map((category) => (
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
          </div>
        </section>

        {/* Info Section */}
        <section className="py-8 bg-secondary/30">
          <div className="container">
            <div className="grid sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-3xl mb-2">🏪</div>
                <h3 className="font-semibold mb-1">
                  {language === "te" ? "దుకాణం నుండి తీసుకోండి" : "Pick Up from Shop"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "te" ? "ఆన్‌లైన్‌లో ఆర్డర్ చేయండి, మా స్టోర్ నుండి సేకరించండి" : "Order online, collect from our store"}
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💬</div>
                <h3 className="font-semibold mb-1">
                  {language === "te" ? "WhatsApp ఆర్డరింగ్" : "WhatsApp Ordering"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "te" ? "WhatsApp చాట్ ద్వారా సులభంగా ఆర్డర్ చేయండి" : "Easy ordering via WhatsApp chat"}
                </p>
              </div>
              <div>
                <div className="text-3xl mb-2">💰</div>
                <h3 className="font-semibold mb-1">
                  {language === "te" ? "ఉత్తమ ధరలు" : "Best Prices"}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {language === "te" ? "అన్ని వస్తువులకు పోటీ ధరలు" : "Competitive prices for all items"}
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCartButton />
    </div>
  );
};

export default ItemsPage;
