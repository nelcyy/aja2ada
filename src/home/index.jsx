import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";

const PRODUCTS = [
  {
    id: 1,
    name: "Gentle Foaming Cleanser",
    category: "Cleanser",
    price: 89000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Cleanser",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    name: "Hydra Boost Toner",
    category: "Toner",
    price: 115000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Toner",
    rating: 4.7,
    reviews: 98,
  },
  {
    id: 3,
    name: "Vitamin C Serum",
    category: "Serum",
    price: 195000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Serum",
    rating: 4.9,
    reviews: 203,
  },
  {
    id: 4,
    name: "Daily Moisturizer SPF 30",
    category: "Moisturizer",
    price: 145000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Moisturizer",
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 5,
    name: "Niacinamide Essence",
    category: "Essence",
    price: 130000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Essence",
    rating: 4.7,
    reviews: 156,
  },
  {
    id: 6,
    name: "Retinol Night Cream",
    category: "Night Care",
    price: 210000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Night+Cream",
    rating: 4.8,
    reviews: 74,
  },
  {
    id: 7,
    name: "Lip & Eye Makeup Remover",
    category: "Cleanser",
    price: 75000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Remover",
    rating: 4.5,
    reviews: 61,
  },
  {
    id: 8,
    name: "Sunscreen Aqua Gel",
    category: "Sunscreen",
    price: 99000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Sunscreen",
    rating: 4.9,
    reviews: 312,
  },
  {
    id: 9,
    name: "AHA BHA Exfoliating Toner",
    category: "Toner",
    price: 135000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=AHA+BHA",
    rating: 4.8,
    reviews: 189,
  },
  {
    id: 10,
    name: "Ceramide Barrier Cream",
    category: "Moisturizer",
    price: 175000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Ceramide",
    rating: 4.7,
    reviews: 143,
  },
  {
    id: 11,
    name: "Hyaluronic Acid Serum",
    category: "Serum",
    price: 160000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=HA+Serum",
    rating: 4.8,
    reviews: 276,
  },
  {
    id: 12,
    name: "Rose Water Mist",
    category: "Essence",
    price: 85000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Rose+Mist",
    rating: 4.5,
    reviews: 92,
  },
  {
    id: 13,
    name: "Micellar Cleansing Water",
    category: "Cleanser",
    price: 65000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Micellar",
    rating: 4.6,
    reviews: 211,
  },
  {
    id: 14,
    name: "SPF 50 UV Defense Serum",
    category: "Sunscreen",
    price: 185000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=UV+Serum",
    rating: 4.9,
    reviews: 134,
  },
  {
    id: 15,
    name: "Peptide Eye Cream",
    category: "Night Care",
    price: 225000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Eye+Cream",
    rating: 4.7,
    reviews: 68,
  },
  {
    id: 16,
    name: "Brightening Facial Mask",
    category: "Essence",
    price: 45000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Mask",
    rating: 4.6,
    reviews: 308,
  },
  {
    id: 17,
    name: "Tea Tree Spot Gel",
    category: "Serum",
    price: 78000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Tea+Tree",
    rating: 4.5,
    reviews: 175,
  },
  {
    id: 18,
    name: "Collagen Sleeping Pack",
    category: "Night Care",
    price: 155000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Sleeping+Pack",
    rating: 4.8,
    reviews: 99,
  },
  {
    id: 19,
    name: "Squalane Facial Oil",
    category: "Moisturizer",
    price: 195000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=Squalane",
    rating: 4.7,
    reviews: 112,
  },
  {
    id: 20,
    name: "pH Balancing Cleanser",
    category: "Cleanser",
    price: 92000,
    image: "https://placehold.co/300x300/f9f0ef/c87a74?text=pH+Cleanser",
    rating: 4.6,
    reviews: 147,
  },
];

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
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="home-root">
      {/* NAVBAR */}
      <Navbar
        activePage="home"
        onHomeClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onProductsClick={() => {
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
                  className={`cat-fav-btn${favorites.includes(product.id) ? " cat-fav-btn--active" : ""}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <HeartIcon filled={favorites.includes(product.id)} />
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

      {/* ALL PRODUCTS */}
      <section className="home-section" style={{ marginBottom: 60 }} ref={allProductsRef}>
        <div className="home-section-header">
          <h2 className="home-section-title">All Products</h2>
        </div>
        <div className="all-products-grid">
          {PRODUCTS.map((product) => (
            <div key={product.id} className="bestseller-card">
              <div className="bestseller-img-wrap">
                <img src={product.image} alt={product.name} className="bestseller-img" />
                <button
                  className={`cat-fav-btn${favorites.includes(product.id) ? " cat-fav-btn--active" : ""}`}
                  onClick={() => toggleFavorite(product.id)}
                >
                  <HeartIcon filled={favorites.includes(product.id)} />
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
