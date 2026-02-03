import { useParams, Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ArrowLeft, ShoppingCart, AlertCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import FloatingCartButton from "@/components/FloatingCartButton";
import { fetchCategories, fetchProducts, clearApiCache, type Category, type ProductItem } from "@/services/sheetsApi";
import { useTranslation } from "@/hooks/useLanguage";
import { BookLoader } from "@/components/ui/BookLoader";

const CategoryPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const [searchParams] = useSearchParams();

  // Clear API cache on mount to ensure fresh data
  useEffect(() => {
    clearApiCache();
  }, []);

  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");
  const ITEMS_PER_PAGE = 50;

  // Update search query if URL param changes
  useEffect(() => {
    const urlSearch = searchParams.get("search");
    if (urlSearch) {
      setSearchQuery(urlSearch);
    }
  }, [searchParams]);

  // Load category and products
  useEffect(() => {
    loadCategoryAndProducts();
  }, [slug, currentPage, searchQuery]);

  async function loadCategoryAndProducts() {
    try {
      setLoading(true);
      setError(null);

      console.log('🔍 Loading category:', slug);

      // Fetch categories to find current category
      const categories = await fetchCategories();
      console.log('📂 Categories loaded:', categories.length, categories.map(c => c.slug));

      const foundCategory = categories.find(cat => cat.slug === slug);
      console.log('🎯 Found category:', foundCategory);
      setCategory(foundCategory || null);

      if (!foundCategory) {
        console.warn('⚠️ Category not found for slug:', slug);
        setLoading(false);
        return;
      }

      // Fetch products for this category
      console.log('📦 Fetching products for category:', slug);
      const response = await fetchProducts(
        slug || "",
        currentPage,
        ITEMS_PER_PAGE,
        searchQuery
      );

      console.log('📦 Products response:', response);
      console.log('📦 Products count:', response.data?.length, 'Total:', response.totalItems);

      setProducts(response.data);
      setTotalPages(response.totalPages);
      setTotalItems(response.totalItems);
    } catch (err) {
      console.error('Error loading category products:', err);
      setError('Failed to load products. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to first page on search
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="flex flex-col items-center">
            <BookLoader />
            <p className="text-muted-foreground mt-4">Loading category...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center p-8">
            <h1 className="text-2xl font-bold mb-4">{t("categoryNotFound")}</h1>
            <p className="text-muted-foreground mb-6">
              {t("categoryNotFoundDesc")}
            </p>
            <Link to="/items">
              <Button>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t("backToItems")}
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
        {/* Category Header */}
        <section className="bg-gradient-to-r from-primary/10 to-secondary/30 py-6 sm:py-8">
          <div className="container">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
              <Link to="/" className="hover:text-primary transition-colors">
                {t("home")}
              </Link>
              <span>/</span>
              <Link to="/items" className="hover:text-primary transition-colors">
                {t("items")}
              </Link>
              <span>/</span>
              <span className="text-foreground font-medium">{category.name}</span>
            </nav>

            {/* Category Info */}
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                    {category?.name}
                  </h1>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    {category?.description} • {totalItems} {t("itemsCount")}
                  </p>
                </div>
                <Link to="/items" className="self-start sm:self-center">
                  <Button variant="outline" size="sm">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    {t("allCategories")}
                  </Button>
                </Link>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearch} className="flex gap-2 max-w-md">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button type="submit" variant="secondary">
                  Search
                </Button>
              </form>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-6 sm:py-8">
          <div className="container">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <BookLoader />
                <p className="text-muted-foreground mt-4">Loading products...</p>
              </div>
            ) : error ? (
              <div className="flex flex-col items-center justify-center py-16">
                <AlertCircle className="w-12 h-12 text-destructive mb-4" />
                <h2 className="text-xl font-semibold mb-2">Error Loading Products</h2>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={loadCategoryAndProducts} variant="outline">
                  Try Again
                </Button>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">{t("noItemsFound")}</h2>
                <p className="text-muted-foreground">
                  {searchQuery ? 'No products match your search.' : t("itemsWillBeAddedSoon")}
                </p>
              </div>
            ) : (
              <>
                {/* Results Info */}
                <div className="mb-4 text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} - {Math.min(currentPage * ITEMS_PER_PAGE, totalItems)} of {totalItems} products
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                  {products.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-8 flex items-center justify-center gap-2 flex-wrap">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      Previous
                    </Button>

                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Help Section */}
        <section className="py-6 bg-secondary/30">
          <div className="container text-center">
            <p className="text-sm text-muted-foreground">
              💡 <strong>{t("cantFindHelp")}</strong>
            </p>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingCartButton />
    </div>
  );
};

export default CategoryPage;
