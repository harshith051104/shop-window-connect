import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Gift } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ItemCard from "@/components/ItemCard";
import FloatingCartButton from "@/components/FloatingCartButton";
import { getGiftsByCategory, getGiftCategoryBySlug } from "@/data/products";
import { useTranslation, useLanguage } from "@/hooks/useLanguage";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const GiftCategoryPage = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  const { slug } = useParams<{ slug: string }>();
  const category = slug ? getGiftCategoryBySlug(slug) : undefined;
  const items = slug ? getGiftsByCategory(slug) : [];

  if (!category) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Gift className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h1 className="text-2xl font-bold mb-2">{t("giftCategoryNotFound")}</h1>
            <p className="text-muted-foreground mb-4">
              {t("giftCategoryNotFoundDesc")}
            </p>
            <Link
              to="/gifts"
              className="text-primary hover:underline font-medium"
            >
              ← {t("backToGifts")}
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
        {/* Breadcrumb */}
        <div className="bg-secondary/30 border-b border-border">
          <div className="container py-3">
            <nav className="flex items-center gap-2 text-sm">
              <Link
                to="/"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("home")}
              </Link>
              <span className="text-muted-foreground">/</span>
              <Link
                to="/gifts"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {t("gifts")}
              </Link>
              <span className="text-muted-foreground">/</span>
              <span className="text-foreground font-medium">{category.name}</span>
            </nav>
          </div>
        </div>

        {/* Category Header */}
        <section className="bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 py-6 sm:py-8">
          <div className="container">
            <Link
              to="/gifts"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToGifts")}
            </Link>
            <div className="flex items-center gap-3">
              <Gift className="w-8 h-8 text-pink-500" />
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold text-foreground">
                  {category.name}
                </h1>
                <p className="text-muted-foreground mt-1">
                  {category.description} • {items.length} {t("itemsCount")}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Items Grid */}
        <section className="py-6 sm:py-10">
          <div className="container">
            {items.length === 0 ? (
              <div className="text-center py-12">
                <Gift className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <p className="text-muted-foreground">
                  {t("noItemsAvailable")}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5">
                {items.map((item) => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Bulk Order CTA */}
        <section className="py-8 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/10 dark:to-purple-900/10">
          <div className="container text-center">
            <h3 className="text-xl font-bold mb-2">{t("needBulkQuantities")}</h3>
            <p className="text-muted-foreground mb-4">
              {t("specialPricesFor25Plus")}
            </p>
            <a
              href={getWhatsAppUrl(
                language === "te"
                  ? `📦 *బల్క్ ఆర్డర్ విచారణ - ${category.name}*\n\nహలో! నాకు బల్క్ పరిమాణాలలో బహుమతి వస్తువులు కావాలి.\n\nదయచేసి బల్క్ ధరల వివరాలు షేర్ చేయండి.`
                  : `📦 *Bulk Order Inquiry - ${category.name}*\n\nHello! I need gift items in bulk quantities.\n\nPlease share bulk pricing details.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
            >
              <Gift className="w-4 h-4" />
              {t("enquireBulkOrder")}
            </a>
          </div>
        </section>
      </main>

      <FloatingCartButton />
      <Footer />
    </div>
  );
};

export default GiftCategoryPage;
