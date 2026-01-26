import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, Menu, X } from "lucide-react";
import { SHOP_INFO } from "@/lib/whatsapp";
import { useCart } from "@/hooks/useCart";
import { useTranslation } from "@/hooks/useLanguage";
import { LanguageToggleCompact } from "@/components/LanguageToggle";
import { useState } from "react";

const Header = () => {
  const { getTotalItems } = useCart();
  const { t } = useTranslation();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemCount = getTotalItems();

  const navLinks = [
    { href: "/", labelKey: "home" as const },
    { href: "/items", labelKey: "items" as const },
    { href: "/gifts", labelKey: "gifts" as const },
  ];

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border shadow-sm">
      {/* Main header */}
      <div className="container py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">
              <img 
                src="/images/nandi-logo.png" 
                alt="Nandi Stationery Logo" 
                className="w-full h-full object-contain drop-shadow-md"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold text-foreground leading-tight">
                {t("welcomeTitle")}
              </h1>
              <p className="text-xs text-muted-foreground hidden sm:block">
                {SHOP_INFO.tagline}
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                  isActive(link.href)
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                {t(link.labelKey)}
              </Link>
            ))}

            {/* Cart Icon */}
            <Link
              to="/cart"
              className="relative ml-2 p-2 rounded-lg hover:bg-muted transition-colors"
              title={t("cart")}
            >
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Mobile Navigation */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Language Toggle - Mobile */}
            <LanguageToggleCompact />

            {/* Cart Icon - Mobile */}
            <Link to="/cart" className="relative p-2">
              <ShoppingCart className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount > 9 ? "9+" : itemCount}
                </span>
              )}
            </Link>

            {/* Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 pb-2 border-t border-border mt-3">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
                    isActive(link.href)
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:text-primary hover:bg-muted"
                  }`}
                >
                  {t(link.labelKey)}
                </Link>
              ))}
              <Link
                to="/cart"
                onClick={() => setMobileMenuOpen(false)}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors flex items-center gap-2 ${
                  location.pathname === "/cart"
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:text-primary hover:bg-muted"
                }`}
              >
                <ShoppingCart className="w-4 h-4" />
                {t("cart")} {itemCount > 0 && `(${itemCount})`}
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
