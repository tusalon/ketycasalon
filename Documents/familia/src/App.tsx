import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { SiteLayout } from "@/components/layout/SiteLayout";
import Combos from "@/pages/Combos";
import CartCheckout from "@/pages/CartCheckout";
import Faq from "@/pages/Faq";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Install from "@/pages/Install";
import { CartProvider } from "@/context/cart";
import { MunicipalityProvider } from "@/context/municipality";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <MunicipalityProvider>
          <CartProvider>
            <Routes>
              <Route element={<SiteLayout />}>
                <Route path="/" element={<Index />} />
                {/* Catálogo principal */}
                <Route path="/tienda" element={<Combos />} />
                {/* Alias histórico */}
                <Route path="/combos" element={<Combos />} />
                <Route path="/carrito" element={<CartCheckout />} />
                <Route path="/preguntas" element={<Faq />} />
                <Route path="/nosotros" element={<About />} />
                <Route path="/contacto" element={<Contact />} />
                <Route path="/instalar" element={<Install />} />
              </Route>
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </CartProvider>
        </MunicipalityProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
