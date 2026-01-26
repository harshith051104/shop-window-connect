import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProductsSection from "@/components/ProductsSection";
import GiftsSection from "@/components/GiftsSection";
import RequestItemSection from "@/components/RequestItemSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppFAB from "@/components/WhatsAppFAB";
import FloatingCartButton from "@/components/FloatingCartButton";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <ProductsSection />
        <GiftsSection />
        <RequestItemSection />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppFAB />
      <FloatingCartButton />
    </div>
  );
};

export default Index;
