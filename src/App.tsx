import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { LanguageProvider } from "@/context/LanguageContext";
import Index from "./pages/Index";
import ItemsPage from "./pages/ItemsPage";
import CategoryPage from "./pages/CategoryPage";
import CartPage from "./pages/CartPage";
import GiftsPage from "./pages/GiftsPage";
import GiftCategoryPage from "./pages/GiftCategoryPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/items" element={<ItemsPage />} />
              <Route path="/category/:slug" element={<CategoryPage />} />
              <Route path="/cart" element={<CartPage />} />
              <Route path="/gifts" element={<GiftsPage />} />
              <Route path="/gifts/:slug" element={<GiftCategoryPage />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
