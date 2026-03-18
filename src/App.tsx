import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import ShippingReturns from "./pages/ShippingReturns";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Checkout from "./pages/Checkout";
import CheckoutSuccess from "./pages/CheckoutSuccess";
import CheckoutCancel from "./pages/CheckoutCancel";
import NotFound from "./pages/NotFound";
import PageTransition from "./components/animation/PageTransition";

const AnimatedRoutes = () => {
  const location = useLocation();
  const withTransition = (element: JSX.Element) => <PageTransition>{element}</PageTransition>;

  return (
    <Layout>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={withTransition(<Index />)} />
          <Route path="/shop" element={withTransition(<Shop />)} />
          <Route path="/shop/:slug" element={withTransition(<ProductDetail />)} />
          <Route path="/cart" element={withTransition(<Cart />)} />
          <Route path="/about" element={withTransition(<About />)} />
          <Route path="/contact" element={withTransition(<Contact />)} />
          <Route path="/careers" element={withTransition(<Careers />)} />
          <Route path="/shipping-returns" element={withTransition(<ShippingReturns />)} />
          <Route path="/privacy" element={withTransition(<Privacy />)} />
          <Route path="/terms" element={withTransition(<Terms />)} />
          <Route path="/checkout" element={withTransition(<Checkout />)} />
          <Route path="/checkout/success" element={withTransition(<CheckoutSuccess />)} />
          <Route path="/checkout/cancel" element={withTransition(<CheckoutCancel />)} />
          <Route path="*" element={withTransition(<NotFound />)} />
        </Routes>
      </AnimatePresence>
    </Layout>
  );
};

const App = () => (
  <TooltipProvider>
    <Toaster />
    <Sonner />
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  </TooltipProvider>
);

export default App;
