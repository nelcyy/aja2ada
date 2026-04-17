import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { PRODUCTS, FALLBACK_IMG } from "../data/products.js";

// Top 3 by review count (most reviews = best seller)
const TOP3 = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 3);

const SHOP_CATEGORIES = [
  { id: "skincare", name: "Skincare", label: "Glow", desc: "Cleansers, toners, serums & moisturizers", img: "https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=600&h=450&q=80" },
  { id: "makeup", name: "Makeup", label: "Tint", desc: "Easy everyday picks for lips, base & more", img: "https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?auto=format&fit=crop&w=600&h=450&q=80" },
  { id: "haircare", name: "Haircare", label: "Care", desc: "Scalp, strands & styling support", img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=600&h=450&q=80" },
  { id: "tools", name: "Tools", label: "Tools", desc: "Little extras that complete the routine", img: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?auto=format&fit=crop&w=600&h=450&q=80" },
];

const BEST_SELLERS = [PRODUCTS[2], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]];

const TRUST_ITEMS = [
  { icon: "Original", title: "Produk Original", sub: "Pilihan aman untuk beauty routine harian" },
  { icon: "Trusted", title: "Belanja Terpercaya", sub: "Kurasi yang terasa lebih aman untuk beauty routine" },
  { icon: "Fresh", title: "Fresh Picks", sub: "Favorit lama dan temuan baru terus masuk" },
  { icon: "Easy", title: "Checkout Gampang", sub: "Wishlist, add to bag, lalu langsung bayar" },
];

const MARQUEE_ITEMS = [
  "Cleanser staples",
  "Daily sunscreen",
  "Hydrating toner",
  "Barrier cream",
  "Night repair",
  "Makeup basics",
  "Budget-friendly picks",
  "Trending formulas",
];

const STORE_HIGHLIGHTS = [
  {
    label: "Why It Feels Trusted",
    title: "Original picks you can count on",
    desc: "Pilihan di toko ini diarahkan ke produk yang terasa aman buat dicari, dicoba, dan dipakai dalam beauty routine sehari-hari.",
  },
  {
    label: "Worth Coming Back To",
    title: "Staples with fresh finds",
    desc: "Ada produk yang selalu kepakai, tapi juga ada temuan baru yang tetap terasa relevan buat rutinitas.",
  },
  {
    label: "Built for Everyday Use",
    title: "Belanja yang terasa aman dan praktis",
    desc: "Fokusnya bukan sekadar pajangan. Toko ini dibentuk buat bantu orang nemu produk beauty yang trusted dan masuk ke rutinitas harian.",
  },
  {
    label: "Small Store Energy",
    title: "Warm, practical, and trusted",
    desc: "Tetap terasa personal seperti toko pilihan sendiri, tapi dengan kurasi yang bikin belanja terasa lebih yakin.",
  },
];

const BEAUTY_EDITS = [
  {
    eyebrow: "Daily reset",
    title: "Fresh Morning Shelf",
    desc: "Untuk rutinitas pagi yang ringan, praktis, dan gampang diulang tiap hari.",
    accent: "rose",
    items: [PRODUCTS[0], PRODUCTS[7], PRODUCTS[3]],
  },
  {
    eyebrow: "Glow lineup",
    title: "Hydration and Brightening",
    desc: "Kalau kamu suka kulit terasa plump dan tampil lebih fresh, edit ini pas buat dilihat duluan.",
    accent: "peach",
    items: [PRODUCTS[1], PRODUCTS[2], PRODUCTS[10]],
  },
  {
    eyebrow: "Night care",
    title: "PM Recovery Picks",
    desc: "Isi shelf malam dengan produk yang fokus bantu menutup hari dengan nyaman.",
    accent: "sand",
    items: [PRODUCTS[5], PRODUCTS[14], PRODUCTS[17]],
  },
];

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

const CartPlusIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
    <line x1="12" y1="10" x2="12" y2="16"/><line x1="9" y1="13" x2="15" y2="13"/>
  </svg>
);

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart, cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();
  const { favorites, toggleFavorite, addToWishlist } = useWishlist();
  const [quickView, setQuickView] = useState(null);

  const categoryCount = new Set(PRODUCTS.map((product) => product.category)).size;
  const budgetCount = PRODUCTS.filter((product) => product.price <= 100000).length;

  const handleToggleFavorite = (product) => {
    if (favorites.has(product.id)) {
      toggleFavorite(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const goToProducts = () => navigate("/products");

  return (
    <div className="home-root">
      <Navbar
        activePage="home"
        allProducts={PRODUCTS}
        onHomeClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        onProductsClick={goToProducts}
      />

      <section className="hero">
        <div className="hero-text">
          <p className="hero-sub">Trusted beauty essentials</p>
          <h1 className="hero-title">
            Original beauty picks for <span>everyday care</span>
          </h1>
          <p className="hero-desc">
            Dari skincare basics sampai makeup favorites, website ini dibuat untuk toko beauty yang menekankan produk original, trusted, dan nyaman buat belanja rutin.
          </p>

          <div className="hero-chip-row">
            <span className="hero-chip">Original beauty picks</span>
            <span className="hero-chip">Trusted for daily beauty needs</span>
            <span className="hero-chip">Curated for real routines</span>
          </div>

          <div className="hero-actions">
            <button className="hero-cta" onClick={goToProducts}>
              Explore Products
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div className="hero-rating-badge">
              <span className="hero-stars">Original and trusted</span>
              <span className="hero-rating-text">Beauty essentials chosen for everyday confidence</span>
            </div>
          </div>

          <div className="hero-stat-grid">
            <div className="hero-stat-card">
              <strong>{PRODUCTS.length}+</strong>
              <span>ready-to-shop picks</span>
            </div>
            <div className="hero-stat-card">
              <strong>{categoryCount}</strong>
              <span>main beauty categories</span>
            </div>
            <div className="hero-stat-card">
              <strong>{budgetCount}</strong>
              <span>picks under Rp 100K</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit hero-orbit--one" />
          <div className="hero-orbit hero-orbit--two" />
          <div className="hero-orbit hero-orbit--three" />
          <div className="hero-visual-glow" />
          <div className="hero-pill hero-pill--top">
            <span className="hero-pill-tag">Easy</span>
            <strong>Easy to browse</strong>
          </div>
          <div className="hero-pill hero-pill--left">
            <span className="hero-pill-tag">Trust</span>
            <strong>Original picks</strong>
          </div>
          <div className="hero-pill hero-pill--right">
            <span className="hero-pill-tag">Ready</span>
            <strong>Daily shelf ready</strong>
          </div>
          <div className="hero-img-wrap">
            <img src="/logo-careofyou.png" alt="Careofyou store" className="hero-img" />
          </div>
          <div className="hero-visual-caption">
            <span className="hero-float-icon">Beauty selection</span>
            <p className="hero-visual-caption-text">Original picks and fresh finds</p>
          </div>
        </div>
      </section>

      <section className="trust-strip">
        <div className="trust-strip-inner">
          {TRUST_ITEMS.map((item) => (
            <div key={item.title} className="trust-item">
              <span className="trust-icon">{item.icon}</span>
              <div>
                <p className="trust-title">{item.title}</p>
                <p className="trust-sub">{item.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-marquee">
        <div className="home-marquee-shell">
          <div className="home-marquee-track">
            {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, index) => (
              <span key={`${item}-${index}`} className="home-marquee-pill">
                {item}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section home-story">
        <div className="home-story-panel">
          <div className="home-story-copy">
            <span className="home-story-kicker">Built on trusted picks</span>
            <h2 className="home-section-title home-section-title--plain">
              A homepage that feels like a well-stocked beauty shelf
            </h2>
            <p className="home-story-desc">
              Karena katalog sekarang ada di page Products, home ini fokus jadi landing page yang ngenalin karakter toko: original, trusted, enak dijelajahi, dan terasa curated buat kebutuhan nyata.
            </p>
            <div className="home-story-points">
              <span className="home-story-point">Original beauty picks</span>
              <span className="home-story-point">Trusted for repeat orders</span>
              <span className="home-story-point">Curated for real routines</span>
            </div>
            <button className="home-story-btn" onClick={goToProducts}>
              See full catalog
            </button>
          </div>

          <div className="home-story-grid">
            {STORE_HIGHLIGHTS.map((item) => (
              <article key={item.title} className="home-story-card">
                <span className="home-story-card-label">{item.label}</span>
                <h3 className="home-story-card-title">{item.title}</h3>
                <p className="home-story-card-desc">{item.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Shop by category</h2>
        </div>
        <div className="category-grid">
          {SHOP_CATEGORIES.map((cat) => (
            <div key={cat.id} className="cat-card" onClick={goToProducts}>
              <div className="cat-card-img-wrap" style={{ backgroundImage: `url(${cat.img})` }}>
                <div className="cat-card-dim" />
                <span className="cat-card-label">{cat.label}</span>
                <div className="cat-card-overlay">Browse now</div>
              </div>
              <div className="cat-card-footer">
                <p className="cat-card-name">{cat.name}</p>
                <p className="cat-card-desc">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="home-section home-edits">
        <div className="home-section-header home-section-header--stacked">
          <div>
            <h2 className="home-section-title">Curated beauty edits</h2>
            <p className="home-section-sub">
              Beberapa ide shelf yang bisa bantu pengunjung langsung kebayang mau belanja apa.
            </p>
          </div>
        </div>

        <div className="home-edit-grid">
          {BEAUTY_EDITS.map((edit) => (
            <article key={edit.title} className={`home-edit-card home-edit-card--${edit.accent}`}>
              <span className="home-edit-eyebrow">{edit.eyebrow}</span>
              <h3 className="home-edit-title">{edit.title}</h3>
              <p className="home-edit-desc">{edit.desc}</p>

              <div className="home-edit-products">
                {edit.items.map((item) => (
                  <div key={item.id} className="home-edit-product">
                    <img src={item.image} alt={item.name} className="home-edit-product-img" />
                    <div className="home-edit-product-copy">
                      <span className="home-edit-product-name">{item.name}</span>
                      <span className="home-edit-product-meta">{item.category}</span>
                    </div>
                  </div>
                ))}
              </div>

              <button className="home-edit-btn" onClick={goToProducts}>
                Open Products page
              </button>
            </article>
          ))}
        </div>
      </section>

      <section className="promo-banner-wrap">
        <div className="promo-banner">
          <div className="promo-text">
            <span className="promo-label">Trusted beauty store</span>
            <h3 className="promo-title">Original picks untuk kebutuhan beauty harian, seru untuk lihat temuan baru</h3>
            <p className="promo-sub">
              Home sekarang lebih fokus jadi halaman yang ngajak orang masuk, lihat suasana toko yang terasa aman dan terpercaya, lalu lanjut belanja ke katalog utama.
            </p>
          </div>
          <button className="promo-btn" onClick={goToProducts}>
            Go to Products
          </button>
          <div className="promo-blob promo-blob-1" />
          <div className="promo-blob promo-blob-2" />
        </div>
      </section>

      {/* ══ TOP 3 TERLARIS ══ */}
      <section className="top3-section">
        <div className="top3-section-head">
          <div>
            <p className="top3-eyebrow">🏆 Produk Terlaris</p>
            <h2 className="top3-title">Top 3 Pilihan Pelanggan</h2>
          </div>
          <button className="section-view-all" onClick={goToProducts}>Lihat semua →</button>
        </div>
        <div className="top3-grid">
          {TOP3.map((product, idx) => {
            const rank = idx + 1;
            const rankEmoji = rank === 1 ? "🥇" : rank === 2 ? "🥈" : "🥉";
            const maxReviews = TOP3[0].reviews;
            return (
              <div
                key={product.id}
                className={`top3-card${rank === 1 ? " top3-card--1" : ""}`}
                onClick={() => setQuickView(product)}
              >
                <div className={`top3-rank-badge top3-rank-badge--${rank}`}>{rankEmoji}</div>
                <button
                  className={`top3-fav-btn${favorites.has(product.id) ? " top3-fav-btn--active" : ""}`}
                  onClick={e => { e.stopPropagation(); handleToggleFavorite(product); }}
                >
                  <HeartIcon filled={favorites.has(product.id)} />
                </button>
                <div className="top3-img-wrap">
                  <img src={product.image} alt={product.name} onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} />
                </div>
                <div className="top3-info">
                  <p className="top3-brand">{product.brand}</p>
                  <p className="top3-name">{product.name}</p>
                  <div className="top3-meta">
                    <span className="top3-stars">★ {product.rating}</span>
                    <span className="top3-reviews">{product.reviews.toLocaleString("id-ID")} reviews</span>
                  </div>
                  <div className="top3-reviews-bar">
                    <div className="top3-reviews-fill" style={{ width: `${(product.reviews / maxReviews) * 100}%` }} />
                  </div>
                  <div className="top3-bottom" style={{ marginTop: 12 }}>
                    <span className="top3-price">Rp {product.price.toLocaleString("id-ID")}</span>
                    <button
                      className="top3-add-btn"
                      onClick={e => { e.stopPropagation(); addToCart(product); }}
                    >
                      <CartPlusIcon /> Beli
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ══ HORIZONTAL SCROLL — BROWSE SEMUA PRODUK ══ */}
      <section className="hscroll-section">
        <div className="hscroll-head">
          <div>
            <p className="top3-eyebrow">✨ Semua Produk</p>
            <h2 className="top3-title">Browse & Geser →</h2>
          </div>
          <button className="section-view-all" onClick={goToProducts}>Lihat halaman produk →</button>
        </div>
        <div className="hscroll-track-wrap">
          <div className="hscroll-track">
            {PRODUCTS.map(product => (
              <div
                key={product.id}
                className="hscroll-card"
                onClick={() => setQuickView(product)}
              >
                <div className="hscroll-img-wrap">
                  {product.bestseller && (
                    <span className="hscroll-bestseller-tag">Best Seller</span>
                  )}
                  <img src={product.image} alt={product.name} onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} />
                </div>
                <div className="hscroll-info">
                  <p className="hscroll-brand">{product.brand}</p>
                  <p className="hscroll-name">{product.name}</p>
                  <p className="hscroll-stars">★ {product.rating} <span style={{ color: "#b0a8a6", fontWeight: 400 }}>({product.reviews})</span></p>
                  <div className="hscroll-bottom">
                    <span className="hscroll-price">Rp {product.price.toLocaleString("id-ID")}</span>
                    <button
                      className="hscroll-cart-btn"
                      onClick={e => { e.stopPropagation(); addToCart(product); }}
                      title="Tambah ke keranjang"
                    >+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="home-section" style={{ marginBottom: 60 }}>
        <div className="home-section-header">
          <h2 className="home-section-title">Best Sellers</h2>
          <button className="section-view-all" onClick={goToProducts}>
            View all products
          </button>
        </div>
        <div className="bestseller-grid">
          {BEST_SELLERS.map((product, index) => (
            <div key={product.id} className="bestseller-card">
              {index === 0 && <span className="product-badge product-badge--hot">Top Pick</span>}
              {index === 2 && <span className="product-badge product-badge--new">Just In</span>}
              <div className="bestseller-img-wrap">
                <img src={product.image} alt={product.name} className="bestseller-img" onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} />
                <button
                  className={`cat-fav-btn${favorites.has(product.id) ? " cat-fav-btn--active" : ""}`}
                  onClick={() => handleToggleFavorite(product)}
                >
                  <HeartIcon filled={favorites.has(product.id)} />
                </button>
              </div>
              <div className="bestseller-info">
                <p className="bestseller-category-tag">{product.category}</p>
                <p className="bestseller-name">{product.name}</p>
                <p className="bestseller-reviews">
                  ★ {product.rating} <span>({product.reviews} reviews)</span>
                </p>
                <p className="bestseller-price">{formatRupiah(product.price)}</p>
                <button className="add-to-bag-btn" onClick={() => addToCart(product)}>
                  Add to Bag
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="how-section">
        <div className="how-header">
          <p className="how-label">Mudah & Cepat</p>
          <h2 className="how-title">Cara belanja di website kami</h2>
          <p className="how-sub">Masuk ke katalog, pilih produk, lalu checkout dengan langkah yang simple.</p>
        </div>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-num">1</div>
            <div className="how-step-icon">Pick</div>
            <h3 className="how-step-title">Browse Produk</h3>
            <p className="how-step-desc">Masuk ke page Products dan lihat kategori, search, atau item favorit yang lagi kamu cari.</p>
          </div>
          <div className="how-step-arrow">→</div>
          <div className="how-step">
            <div className="how-step-num">2</div>
            <div className="how-step-icon">Bag</div>
            <h3 className="how-step-title">Tambah ke Bag</h3>
            <p className="how-step-desc">Simpan ke wishlist kalau masih galau, atau langsung tambahkan ke keranjang kalau sudah yakin.</p>
          </div>
          <div className="how-step-arrow">→</div>
          <div className="how-step">
            <div className="how-step-num">3</div>
            <div className="how-step-icon">Done</div>
            <h3 className="how-step-title">Checkout</h3>
            <p className="how-step-desc">Isi data, pilih metode pembayaran, dan pesananmu siap masuk ke proses berikutnya.</p>
          </div>
        </div>
      </section>

      <Footer />

      {/* ══ QUICK VIEW MODAL ══ */}
      {quickView && (
        <div className="qv-overlay" onClick={() => setQuickView(null)}>
          <div className="qv-modal" onClick={e => e.stopPropagation()}>
            <button className="qv-close" onClick={() => setQuickView(null)}>✕</button>
            <div className="qv-body">
              <div className="qv-img-wrap">
                <img src={quickView.image} alt={quickView.name} onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }} />
                {quickView.bestseller && (
                  <span className="qv-img-badge">Best Seller</span>
                )}
              </div>
              <div className="qv-info">
                <p className="qv-brand">{quickView.brand}</p>
                <h3 className="qv-name">{quickView.name}</h3>
                <span className="qv-category-tag">{quickView.category}</span>
                <div className="qv-stars-row">
                  <span className="qv-stars">★ {quickView.rating}</span>
                  <span className="qv-review-count">({quickView.reviews.toLocaleString("id-ID")} reviews)</span>
                </div>
                <p className="qv-desc">{quickView.desc}</p>
                <p className="qv-price">Rp {quickView.price.toLocaleString("id-ID")}</p>
                <div className="qv-actions">
                  <button
                    className="qv-add-btn"
                    onClick={() => { addToCart(quickView); setQuickView(null); }}
                  >
                    + Tambah ke Keranjang
                  </button>
                  <button
                    className={`qv-fav-btn${favorites.has(quickView.id) ? " qv-fav-btn--active" : ""}`}
                    onClick={() => handleToggleFavorite(quickView)}
                    title="Simpan ke wishlist"
                  >
                    <HeartIcon filled={favorites.has(quickView.id)} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}

      <div className={`cart-sidebar ${cartOpen ? "cart-sidebar-open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>x</button>
        </div>

        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">Bag</span>
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
                      <button className="qty-btn" onClick={() => updateQty(item.id, -1)}>-</button>
                      <span className="qty-val">{item.qty}</span>
                      <button className="qty-btn" onClick={() => updateQty(item.id, 1)}>+</button>
                    </div>
                  </div>
                  <button className="item-remove" onClick={() => removeItem(item.id)}>x</button>
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
                onClick={() => {
                  setCartOpen(false);
                  navigate("/checkout", { state: { cartItems: cart } });
                }}
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
