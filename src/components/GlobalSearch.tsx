import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchProducts, type ProductItem } from "@/services/sheetsApi";
import { BookLoader } from "@/components/ui/BookLoader";

const GlobalSearch = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ProductItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Debounced search
  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        // Search across all products (no category filter)
        const response = await fetchProducts("", 1, 10, query);
        setResults(response.data);
        setIsOpen(true);
      } catch (error) {
        console.error("Search error:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (product: ProductItem) => {
    setQuery("");
    setIsOpen(false);
    // Navigate to the category page with search query
    navigate(`/category/${product.category}?search=${encodeURIComponent(product.name)}`);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (query.trim().length < 2) return;

    // Navigate to items page with search query to show all matching products
    setIsOpen(false);
    navigate(`/items?search=${encodeURIComponent(query)}`);
  };

  const handleViewAllResults = () => {
    handleSubmit();
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative w-full max-w-xl mx-auto">
      <form onSubmit={handleSubmit}>
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-600" />
          <Input
            ref={inputRef}
            type="text"
            placeholder="Search for pens, notebooks, gifts..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length >= 2 && setIsOpen(true)}
            className="pl-12 pr-12 h-12 text-base bg-white border-2 border-gray-800 text-gray-900 placeholder:text-gray-500 focus:border-primary"
          />
          {query && (
            <button
              type="button"
              onClick={clearSearch}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              {loading ? (
                <BookLoader className="my-0 scale-[0.3] origin-center w-10" />
              ) : (
                <X className="w-5 h-5" />
              )}
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
          {results.map((product) => (
            <button
              key={product.id}
              onClick={() => handleSelect(product)}
              className="w-full px-4 py-3 flex items-center gap-3 hover:bg-muted transition-colors text-left border-b border-border last:border-b-0"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-10 h-10 object-cover rounded"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/placeholders/product.webp";
                }}
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {product.name}
                </p>
                <p className="text-xs text-muted-foreground">
                  {product.category.replace(/-/g, " ").replace(/\b\w/g, l => l.toUpperCase())} • {product.price}
                </p>
              </div>
            </button>
          ))}

          {/* View All Results */}
          <button
            onClick={handleViewAllResults}
            className="w-full px-4 py-3 text-sm text-primary font-medium hover:bg-primary/10 transition-colors"
          >
            View all results for "{query}"
          </button>
        </div>
      )}

      {/* No Results */}
      {isOpen && query.length >= 2 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-card border border-border rounded-lg shadow-lg z-50 p-4 text-center">
          <p className="text-sm text-muted-foreground">No products found for "{query}"</p>
        </div>
      )}
    </div>
  );
};

export default GlobalSearch;
