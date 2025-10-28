// App.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { Cart, Product, User } from "./lib/types";
import { products as initialProducts, reasons } from "./lib/data";
import { loadLocalStorage, useLocalStorage } from "./hooks/useLocalStorage";

import BackgroundVideo from "./components/BackgroundVideo";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Features from "./components/Features";
import ProductsSection from "./components/ProductsSection";
import Newsletter from "./components/Newsletter";
import Footer from "./components/Footer";
import CartDrawer from "./components/CartDrawer";
import RecommendModal from "./components/RecommendModal";
import LoginModal from "./components/LoginModal";
import Payment from "./components/Payment"; // ✅ import payment page

const App: React.FC = () => {
  const [cart, setCart] = useState<Cart>(() => loadLocalStorage<Cart>("cart", {}));
  useLocalStorage("cart", cart);

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [recommendedPlant, setRecommendedPlant] = useState<Product | null>(null);
  const [recommendedReason, setRecommendedReason] = useState("");
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "high">("all");

  const navigate = useNavigate(); // ✅ add navigation hook

  const handleAddToCart = (id: number) =>
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));

  const handleRemoveFromCart = (id: number) =>
    setCart((c) => {
      const nc = { ...c };
      delete nc[id];
      return nc;
    });

  const handleChangeQty = (id: number, delta: number) =>
    setCart((c) => {
      const newQty = (c[id] || 1) + delta;
      if (newQty < 1) {
        const nc = { ...c };
        delete nc[id];
        return nc;
      }
      return { ...c, [id]: newQty };
    });

  const handleSetQty = (id: number, qty: number) =>
    setCart((c) => ({ ...c, [id]: Math.max(1, qty || 1) }));

  const handleLogin = async (email: string, pass: string) => {
    await new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        if (email === "user@example.com" && pass === "password123") {
          setCurrentUser({ _id: "60d5f1...", username: "BloomUser", email });
          setIsLoginModalOpen(false);
          resolve();
        } else reject(new Error("Invalid email or password. (Mock)"));
      }, 800);
    });
  };

  const handleLogout = () => setCurrentUser(null);

  const filteredProducts = useMemo(() => {
    let list = [...initialProducts];
    if (searchTerm) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter === "low") list.sort((a, b) => a.price - b.price);
    if (filter === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [searchTerm, filter]);

  const handleRecommend = () => {
    const randPlant =
      initialProducts[Math.floor(Math.random() * initialProducts.length)];
    const randReason = reasons[Math.floor(Math.random() * reasons.length)];
    setRecommendedPlant(randPlant);
    setRecommendedReason(randReason);
    setIsRecommendOpen(true);
  };

  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsRecommendOpen(false);
        setIsLoginModalOpen(false);
        setIsCartOpen(false);
      }
    };
    document.addEventListener("keydown", onEsc);
    return () => document.removeEventListener("keydown", onEsc);
  }, []);

  const cartEntries = useMemo(() => Object.entries(cart), [cart]);
  const cartItemCount = useMemo(
    () => cartEntries.reduce((s, [, q]) => s + q, 0),
    [cartEntries]
  );

  return (
    <Routes>
      {/* 🏠 Main Shop Page */}
      <Route
        path="/"
        element={
          <>
            <BackgroundVideo />
            <Header
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              onRecommend={handleRecommend}
              onOpenCart={() => setIsCartOpen(true)}
              cartCount={cartItemCount}
              currentUser={currentUser}
              onLoginOpen={() => setIsLoginModalOpen(true)}
              onLogout={handleLogout}
            />
            <Hero />
            <Features />
            <ProductsSection
              products={filteredProducts}
              onAddToCart={handleAddToCart}
              filter={filter}
              setFilter={setFilter}
            />
            <Newsletter />
            <Footer />
            <RecommendModal
              open={isRecommendOpen}
              onClose={() => setIsRecommendOpen(false)}
              plant={recommendedPlant}
              reason={recommendedReason}
            />
            <LoginModal
              isOpen={isLoginModalOpen}
              onClose={() => setIsLoginModalOpen(false)}
              onLoginSubmit={handleLogin}
            />
            <CartDrawer
              open={isCartOpen}
              onClose={() => setIsCartOpen(false)}
              cart={cart}
              products={initialProducts}
              onChangeQty={handleChangeQty}
              onSetQty={handleSetQty}
              onRemove={handleRemoveFromCart}
              // ✅ navigate to payment
              onCheckout={() => {
                setIsCartOpen(false);
                navigate("/payment");
              }}
            />
          </>
        }
      />

      {/* 💰 Payment Page */}
      <Route path="/payment" element={<Payment cart={cart} products={initialProducts} />} />
    </Routes>
  );
};

export default App;
