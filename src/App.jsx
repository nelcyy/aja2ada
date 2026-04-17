import './App.css'
import { useEffect, useRef } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import AuthPage from './auth/index.jsx'
import TwoFAPage from './2fa/index.jsx'
import MyProfilePage from './myprofile/index.jsx'
import HomePage from './home/index.jsx'
import ProductPage from './product/index.jsx'
import WishlistPage from './wishlist/wishlist.jsx'
import ContactPage from './contact/index.jsx'
import CheckoutPage from './checkout/index.jsx'
import AdminPage from './admin/index.jsx'
import OrderDetailPage from './orderdetail/index.jsx'
import { CartProvider } from './context/CartContext.jsx'
import { WishlistProvider } from './context/WishlistContext.jsx'
import { SearchProvider } from './context/SearchContext.jsx'
import CartSidebar from './components/CartSidebar.jsx'

function ParticleCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let particles = [];
    let animId;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();

    const spawn = (x, y) => {
      for (let i = 0; i < 5; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 2.5 + 0.5;
        const hue = Math.random() < 0.5
          ? Math.random() * 20 + 340
          : Math.random() * 20 + 10;
        particles.push({
          x, y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 1,
          size: Math.random() * 5 + 2,
          alpha: Math.random() * 0.55 + 0.35,
          hue,
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles = particles.filter(p => p.alpha > 0.01 && p.size > 0.3);
      for (const p of particles) {
        ctx.beginPath();
        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
        g.addColorStop(0, `hsla(${p.hue}, 80%, 75%, ${p.alpha})`);
        g.addColorStop(1, `hsla(${p.hue}, 80%, 75%, 0)`);
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = g;
        ctx.fill();
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.06;
        p.alpha *= 0.92;
        p.size *= 0.97;
      }
      animId = requestAnimationFrame(animate);
    };

    const onMove = (e) => {
      const x = e.clientX ?? e.touches?.[0]?.clientX;
      const y = e.clientY ?? e.touches?.[0]?.clientY;
      if (x == null) return;
      spawn(x, y);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onMove, { passive: true });
    window.addEventListener("resize", resize);
    animate();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onMove);
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}

function App() {
  return (
    <>
    <ParticleCanvas />
    <CartProvider>
      <WishlistProvider>
        <SearchProvider>
          <Router>
            <Routes>
              <Route path="/login" element={<AuthPage />} />
              <Route path="/register" element={<AuthPage />} />
              <Route path="/2fa" element={<TwoFAPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/myprofile" element={<MyProfilePage />} />
              <Route path="/" element={<HomePage />} />
              <Route path="/products" element={<ProductPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/orderdetail" element={<OrderDetailPage />} />
            </Routes>
            <CartSidebar />
          </Router>
        </SearchProvider>
      </WishlistProvider>
    </CartProvider>
    </>
  )
}

export default App
