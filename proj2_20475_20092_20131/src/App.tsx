// App.tsx
import React, { useEffect, useMemo, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import type { Cart, Product, User } from "./lib/types";
import { products as initialProducts, reasons } from "./lib/data";
import { loadLocalStorage, useLocalStorage } from "./hooks/useLocalStorage";
import api from "./lib/api";

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
import Payment from "./components/Payment";
import OrderHistory from "./components/OrderHistory";

const App: React.FC = () => {
  // --------- STATE ---------
  const [cart, setCart] = useState<Cart>(() => loadLocalStorage<Cart>("cart", {}));
  useLocalStorage("cart", cart);

  const [remoteProducts, setRemoteProducts] = useState<Product[] | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const [recommendedPlant, setRecommendedPlant] = useState<Product | null>(null);
  const [recommendedReason, setRecommendedReason] = useState("");
  const [isRecommendOpen, setIsRecommendOpen] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<"all" | "low" | "high">("all");

  const navigate = useNavigate();

  // --------- CART HANDLERS ---------
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

  // --------- AUTH HANDLERS ---------
  const handleLogin = async (email: string, pass: string) => {
    const { data: u } = await api.post("/auth/login", { email, password: pass }); // ✅ แก้ตรงนี้
    localStorage.setItem("token", u.token);
    localStorage.setItem("user", JSON.stringify({ _id: u._id, username: u.username, email: u.email }));
    setCurrentUser({ _id: u._id, username: u.username, email: u.email });
    setIsLoginModalOpen(false);
  };
  const handleRegister = async (username: string, email: string, pass: string) => {
    const { data: u } = await api.post('/auth/register', { username, email, password: pass });
    localStorage.setItem('token', u.token);
    localStorage.setItem('user', JSON.stringify({ _id: u._id, username: u.username, email: u.email }));
    setCurrentUser({ _id: u._id, username: u.username, email: u.email });
    setIsLoginModalOpen(false); // ปิด modal ถ้ามี
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null);
  };

  const productList = useMemo(() => {
    const remote = Array.isArray(remoteProducts) ? remoteProducts : [];
    if (remote.length === 0) return initialProducts;
    const supplement = initialProducts.filter(p => !remote.some(r => r.id === p.id));
    return [...remote, ...supplement];
  }, [remoteProducts]);


  const filteredProducts = useMemo(() => {
    let list = [...productList];
    if (searchTerm) {
      list = list.filter((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filter === "low") list.sort((a, b) => a.price - b.price);
    if (filter === "high") list.sort((a, b) => b.price - a.price);
    return list;
  }, [searchTerm, filter, productList]);

  const handleRecommend = () => {
    const randPlant = initialProducts[Math.floor(Math.random() * initialProducts.length)];
    const randReason = reasons[Math.floor(Math.random() * reasons.length)];
    setRecommendedPlant(randPlant);
    setRecommendedReason(randReason);
    setIsRecommendOpen(true);
  };
  const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    if (!currentUser) {
      setIsLoginModalOpen(true);
      return null;
    }
    return <>{children}</>;
  };

  // --------- EFFECTS ---------
  useEffect(() => {
    api.get('/products')
      .then((res) => {
        const data = Array.isArray(res.data) ? res.data : [];
        const normalized = data.map((p: any) => ({
          ...p,
          img: p.img ?? p.imageUrl ?? "",
        }));
        setRemoteProducts(normalized);
      })
      .catch(() => setRemoteProducts(null));
  }, []);


  useEffect(() => {
    const saved = localStorage.getItem("user");
    if (saved) setCurrentUser(JSON.parse(saved));
  }, []);

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

  // --------- DERIVED ---------
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
              products={productList}
              onChangeQty={handleChangeQty}
              onSetQty={handleSetQty}
              onRemove={handleRemoveFromCart}
              onCheckout={() => {
                // ถ้ายังไม่ได้ล็อกอิน ให้เปิด Login ก่อน
                if (!currentUser) {
                  setIsCartOpen(false);
                  setIsLoginModalOpen(true);
                  return;
                }
                setIsCartOpen(false);
                navigate("/payment");
              }}
            />
          </>
        }
      />
      <Route
        path="/payment"
        element={
          <RequireAuth>
            <Payment cart={cart} products={productList} />
          </RequireAuth>
        }
      />
      {/* 💰 Payment Page */}
      <Route
        path="/payment"
        element={
          <Payment
            cart={cart}
            products={productList}   // ตัวเดียวกับที่ใช้แสดงรายการสินค้า
            onGoToTransport={() => navigate("/delivery")}  // พาไปหน้า delivery จริง
          />
        }
      />


      <Route path="/orders" element={<OrderHistory />} />
    </Routes>

  );
};

export default App;
