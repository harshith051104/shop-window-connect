import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import FloatingCartButton from "@/components/FloatingCartButton";
import { getCategoryBySlug, getProductsByCategory } from "@/data/products";
import { useTranslation } from "@/hooks/useLanguage";

const CategoryPage = () => {
  const { t } = useTranslation();
  const { slug } = useParams<{ slug: string }>();
  const category = getCategoryBySlug(slug || "");
  const products = getProductsByCategory(slug || "");

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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2">
                  {category.name}
                </h1>
                <p className="text-sm sm:text-base text-muted-foreground">
                  {category.description} • {products.length} {t("itemsCount")}
                </p>
              </div>
              <Link to="/items" className="self-start sm:self-center">
                <Button variant="outline" size="sm">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("allCategories")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Products Grid */}
        <section className="py-6 sm:py-8">
          <div className="container">
            {products.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingCart className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
                <h2 className="text-xl font-semibold mb-2">{t("noItemsFound")}</h2>
                <p className="text-muted-foreground">
                  {t("itemsWillBeAddedSoon")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {products.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
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
