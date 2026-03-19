import { Suspense, lazy, type ReactNode } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Layout from "@/components/layout/Layout";
import PageTransition from "./components/animation/PageTransition";

const Index = lazy(() => import("./pages/Index"));
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Cart = lazy(() => import("./pages/Cart"));
const About = lazy(() => import("./pages/About"));
const Contact = lazy(() => import("./pages/Contact"));
const Careers = lazy(() => import("./pages/Careers"));
const ShippingReturns = lazy(() => import("./pages/ShippingReturns"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const Checkout = lazy(() => import("./pages/Checkout"));
const CheckoutSuccess = lazy(() => import("./pages/CheckoutSuccess"));
const CheckoutCancel = lazy(() => import("./pages/CheckoutCancel"));
const NotFound = lazy(() => import("./pages/NotFound"));

const RouteFallback = () => (
  <div className="container px-4 pb-16 pt-10 md:pb-20 md:pt-14">
    <div className="surface-panel h-[52vh] animate-pulse" />
  </div>
);

const AnimatedRoutes = () => {
  const location = useLocation();
  const withTransition = (element: ReactNode) => (
    <PageTransition>
      <Suspense fallback={<RouteFallback />}>{element}</Suspense>
    </PageTransition>
  );

  return (
    <Layout>
      <AnimatePresence mode="wait" initial={false}>
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
  <HelmetProvider>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AnimatedRoutes />
      </BrowserRouter>
    </TooltipProvider>
  </HelmetProvider>
);

export default App;
