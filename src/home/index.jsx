import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSearch } from "../context/SearchContext";
import { PRODUCTS } from "../data/products.js";

const SHOP_CATEGORIES = [
  { id: "skincare", name: "Skincare", price: 89000, image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Skincare" },
  { id: "makeup",   name: "Makeup",   price: 115000, image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Makeup" },
  { id: "haircare", name: "Haircare", price: 75000, image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Haircare" },
  { id: "tools",    name: "Tools",    price: 55000, image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Tools" },
];

const BEST_SELLERS = [PRODUCTS[2], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]];

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
);

export default function HomePage() {
  const navigate = useNavigate();
  const allProductsRef = useRef(null);
  const { addToCart, cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();
  const { favorites, toggleFavorite, addToWishlist } = useWishlist();
  const { searchQuery, searchResults, shouldOpenSearch, closeSearchPanel } = useSearch();
  const [searchOpen, setSearchOpen] = useState(false);

  const handleToggleFavorite = (product) => {
    if (favorites.has(product.id)) {
      toggleFavorite(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const displayProducts = searchQuery.trim() ? searchResults : PRODUCTS;

  // Auto scroll to All Products section if hash is present
  useEffect(() => {
    if (window.location.hash === "#all-products" && allProductsRef.current) {
      const top = allProductsRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  // Auto open search if shouldOpenSearch is true, then auto-close after scroll
  useEffect(() => {
    if (shouldOpenSearch) {
      setSearchOpen(true);
      closeSearchPanel();
      // Auto-close search after 1.2 seconds (gives time for smooth scroll animation)
      const timer = setTimeout(() => {
        setSearchOpen(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [shouldOpenSearch, closeSearchPanel]);

  return (
    <div className="home-root">
      {/* NAVBAR */}
      <Navbar
        activePage="home"
        allProducts={PRODUCTS}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onProductsClick={() => {
          const el = allProductsRef.current;
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }}
        onSearchClick={() => {
          const el = allProductsRef.current;
          if (!el) return;
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        }}
      />

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-sub">Your daily skincare routine</p>
          <h1 className="hero-title">Glow starts with <span>self-care</span></h1>
          <p className="hero-desc">Produk skincare pilihan untuk kulitmu yang sehat dan bercahaya setiap hari.</p>
        </div>
        <div className="hero-img-wrap">
          <img src="/logo-careofyou.png" alt="hero" className="hero-img" />
        </div>
      </section>

      {/* SHOP BY CATEGORY */}
      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Shop by category</h2>
        </div>
        <div className="category-grid">
          {SHOP_CATEGORIES.map((cat) => (
            <div key={cat.id} className="cat-card">
              <div className="cat-card-img-wrap">
                <img src={cat.image} alt={cat.name} className="cat-card-img" />
              </div>
              <p className="cat-card-name">{cat.name}</p>
            </div>
          ))}
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="home-section" style={{ marginBottom: 60 }}>
        <div className="home-section-header">
          <h2 className="home-section-title">Best Sellers</h2>
        </div>
        <div className="bestseller-grid">
          {BEST_SELLERS.map((product) => (
            <div key={product.id} className="bestseller-card">
              <div className="bestseller-img-wrap">
                <img src={product.image} alt={product.name} className="bestseller-img" />
                <button
                  className={`cat-fav-btn${favorites.has(product.id) ? " cat-fav-btn--active" : ""}`}
                  onClick={() => handleToggleFavorite(product)}
                >
                  <HeartIcon filled={favorites.has(product.id)} />
                </button>
              </div>
              <div className="bestseller-info">
                <p className="bestseller-name">{product.name}</p>
                <p className="bestseller-reviews">★ {product.rating} · #{product.reviews}</p>
                <p className="bestseller-price">{formatRupiah(product.price)}</p>
                <button className="add-to-bag-btn" onClick={() => addToCart(product)}>
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ALL PRODUCTS or SEARCH RESULTS */}
      <section className="home-section" id="all-products" style={{ marginBottom: 60 }} ref={allProductsRef}>
        <div className="home-section-header">
          <h2 className="home-section-title">
            {searchQuery.trim() ? `Search Results for "${searchQuery}"` : "All Products"}
          </h2>
        </div>
        {searchQuery.trim() && searchResults.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px 20px", color: "#aaa" }}>
            <p style={{ fontSize: "16px", marginBottom: "8px" }}>No products found</p>
            <p style={{ fontSize: "14px" }}>Try searching with different keywords</p>
          </div>
        ) : (
          <div className="all-products-grid">
            {displayProducts.map((product) => (
              <div key={product.id} className="bestseller-card">
                <div className="bestseller-img-wrap">
                  <img src={product.image} alt={product.name} className="bestseller-img" />
                  <button
                    className={`cat-fav-btn${favorites.has(product.id) ? " cat-fav-btn--active" : ""}`}
                    onClick={() => handleToggleFavorite(product)}
                  >
                    <HeartIcon filled={favorites.has(product.id)} />
                  </button>
                </div>
                <div className="bestseller-info">
                  <p className="bestseller-name">{product.name}</p>
                  <p className="bestseller-reviews">★ {product.rating} · #{product.reviews}</p>
                  <p className="bestseller-price">{formatRupiah(product.price)}</p>
                  <button className="add-to-bag-btn" onClick={() => addToCart(product)}>
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="wl-footer">
        <div className="wl-footer-inner">
          <div className="wl-footer-brand">
            <img src="/logo-careofyou.png" alt="Careofyou" className="wl-footer-logo" />
            <span className="wl-footer-name">careofyou</span>
          </div>
          <div className="wl-footer-links">
            <span>About Us</span>
            <span>Products</span>
            <span>Skincare Guide</span>
            <span>Contact</span>
          </div>
          <p className="wl-footer-copy">© 2025 Careofyou. All rights reserved.</p>
        </div>
      </footer>

      {/* CART OVERLAY */}
      {cartOpen && (
        <div className="cart-overlay" onClick={() => setCartOpen(false)} />
      )}

      {/* CART SIDEBAR */}
      <div className={`cart-sidebar ${cartOpen ? "cart-sidebar-open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛍️</span>
            <p>Keranjang kamu kosong</p>
            <button className="cart-shop-btn" onClick={() => setCartOpen(false)}>
              Mulai Belanja
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item) => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{formatRupiah(item.price)}</p>
                    <div className="qty-control">
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>−</button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="item-remove" onClick={() => removeItem(item.id)}>✕</button>
                </div>
              ))}
            </div>

            <div className="cart-footer">
              <div className="cart-total-row">
                <span>Total</span>
                <span className="cart-total-val">{formatRupiah(cartTotal)}</span>
              </div>
              <button
                className="checkout-btn"
                onClick={() => { setCartOpen(false); navigate("/checkout", { state: { cartItems: cart } }); }}
              >
                Checkout
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
