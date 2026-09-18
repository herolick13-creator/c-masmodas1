import React, { useState, useEffect } from "react";
import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import FloatingWhatsApp from "@/components/common/FloatingWhatsApp";
import CurtainEntrance from "@/components/common/CurtainEntrance";

// Pages
import Home from "@/pages/Home";
import Shop from "@/pages/Shop";
import ProductDetail from "@/pages/ProductDetail";
import Checkout from "@/pages/Checkout";
import AdminDashboard from "@/pages/admin/AdminDashboard";
import CustomerAccount from "@/pages/CustomerAccount";
import AuthLogin from "@/pages/AuthLogin";
import AuthRegister from "@/pages/AuthRegister";
import Wishlist from "@/pages/Wishlist";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Support from "@/pages/Support";
import Policies from "@/pages/Policies";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname]);
  return null;
}

export default function App() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCurtain, setShowCurtain] = useState(() => {
    // Show curtain once per session
    const seen = sessionStorage.getItem("cmas_curtain_seen");
    return !seen;
  });

  const handleCurtainComplete = () => {
    sessionStorage.setItem("cmas_curtain_seen", "true");
    setShowCurtain(false);
  };

  return (
    <HashRouter>
      <ScrollToTop />

      {/* Gala Opening Animation on first entrance */}
      {showCurtain && <CurtainEntrance onComplete={handleCurtainComplete} />}

      <div className="min-h-screen flex flex-col bg-[#F8F5F3] text-slate-900 font-sans selection:bg-[#720018] selection:text-white">
        {/* Luxury Navbar */}
        <Navbar onOpenCart={() => setIsCartOpen(true)} />

        {/* Dynamic Route Pages */}
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/loja" element={<Shop onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/produto/:slug" element={<ProductDetail onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/cliente" element={<CustomerAccount onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/login" element={<AuthLogin />} />
            <Route path="/cadastro" element={<AuthRegister />} />
            <Route path="/favoritos" element={<Wishlist onOpenCart={() => setIsCartOpen(true)} />} />
            <Route path="/sobre" element={<About />} />
            <Route path="/contato" element={<Contact />} />
            <Route path="/suporte" element={<Support />} />
            <Route path="/politicas" element={<Policies />} />
            <Route path="*" element={<Home onOpenCart={() => setIsCartOpen(true)} />} />
          </Routes>
        </main>

        {/* Luxury Footer */}
        <Footer />

        {/* Global Slide-Over Shopping Cart */}
        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

        {/* WhatsApp Floating Contact Widget */}
        <FloatingWhatsApp />
      </div>
    </HashRouter>
  );
}
