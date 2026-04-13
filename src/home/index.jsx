import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

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
];

const CATEGORIES = ["All", "Cleanser", "Toner", "Serum", "Moisturizer", "Essence", "Night Care", "Sunscreen"];

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

function StarRating({ rating }) {
  return (
    <span className="stars">
      {[1, 2, 3, 4, 5].map((s) => (
        <span key={s} style={{ color: s <= Math.round(rating) ? "#e07a73" : "#ddd", fontSize: "13px" }}>
          ★
        </span>
      ))}
      <span className="rating-text">{rating}</span>
    </span>
  );
}

export default function HomePage() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [favorites, setFavorites] = useState([]);

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    );
  };

  const cartCount = cart.reduce((sum, item) => sum + item.qty, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((i) => i.id === product.id);
      if (existing) {
        return prev.map((i) => i.id === product.id ? { ...i, qty: i.qty + 1 } : i);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart((prev) =>
      prev
        .map((i) => i.id === id ? { ...i, qty: i.qty + delta } : i)
        .filter((i) => i.qty > 0)
    );
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((i) => i.id !== id));
  };

  const filtered = PRODUCTS.filter((p) => {
    const matchCat = activeCategory === "All" || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="home-root">
      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">
          <div className="navbar-logo">
            <img src="/logo-careofyou.png" alt="Careofyou" className="nav-logo-img" />
            <span className="nav-brand">careofyou</span>
          </div>

          <div className="search-wrap">
            <span className="search-icon">🔍</span>
            <input
              className="search-input"
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="navbar-right">
            <button className="nav-icon-btn" onClick={() => navigate("/favorites")} title="Favorites">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
              </svg>
            </button>
            <button className="nav-icon-btn" onClick={() => navigate("/profile")} title="Profile">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </button>
            <button className="cart-btn" onClick={() => setCartOpen(true)}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <path d="M16 10a4 4 0 01-8 0" />
              </svg>
              {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero">
        <div className="hero-text">
          <p className="hero-sub">Your daily skincare routine</p>
          <h1 className="hero-title">Glow starts with <span>self-care</span></h1>
          <p className="hero-desc">Produk skincare pilihan untuk kulitmu yang sehat dan bercahaya setiap hari.</p>
          <button className="hero-cta">Shop Now</button>
        </div>
        <div className="hero-img-wrap">
          <img src="/logo-careofyou.png" alt="hero" className="hero-img" />
        </div>
      </section>

      {/* CATEGORY FILTER */}
      <section className="category-section">
        <div className="category-scroll">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-chip ${activeCategory === cat ? "cat-chip-active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section className="products-section">
        <div className="products-header">
          <h2 className="section-title">
            {activeCategory === "All" ? "All Products" : activeCategory}
          </h2>
          <span className="products-count">{filtered.length} produk</span>
        </div>

        {filtered.length === 0 ? (
          <div className="empty-state">
            <p>Produk tidak ditemukan 😢</p>
          </div>
        ) : (
          <div className="products-grid">
            {filtered.map((product) => (
              <div key={product.id} className="product-card">
                <div className="product-img-wrap">
                  <img src={product.image} alt={product.name} className="product-img" />
                  <span className="product-category-badge">{product.category}</span>
                  <button
                    className={`fav-btn ${favorites.includes(product.id) ? "fav-btn-active" : ""}`}
                    onClick={() => toggleFavorite(product.id)}
                    title="Tambah ke Favorit"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={favorites.includes(product.id) ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="product-info">
                  <h3 className="product-name">{product.name}</h3>
                  <StarRating rating={product.rating} />
                  <p className="product-reviews">{product.reviews} reviews</p>
                  <div className="product-footer">
                    <span className="product-price">{formatRupiah(product.price)}</span>
                    <button
                      className="add-to-cart-btn"
                      onClick={() => addToCart(product)}
                    >
                      + Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/logo-careofyou.png" alt="Careofyou" className="footer-logo" />
            <div>
              <p className="footer-brand-name">careofyou</p>
              <p className="footer-brand-desc">Skincare terpercaya untuk kulit sehat dan bercahaya setiap hari.</p>
            </div>
          </div>

          <div className="footer-links">
            <div className="footer-col">
              <p className="footer-col-title">Produk</p>
              <ul>
                <li>Cleanser</li>
                <li>Toner</li>
                <li>Serum</li>
                <li>Moisturizer</li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Bantuan</p>
              <ul>
                <li>FAQ</li>
                <li>Cara Order</li>
                <li>Kebijakan Retur</li>
                <li>Hubungi Kami</li>
              </ul>
            </div>
            <div className="footer-col">
              <p className="footer-col-title">Ikuti Kami</p>
              <ul>
                <li>Instagram</li>
                <li>TikTok</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© 2025 careofyou. All rights reserved.</p>
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
              <button className="checkout-btn">Checkout</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
