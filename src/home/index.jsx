import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { PRODUCTS } from "../data/products.js";

const SHOP_CATEGORIES = [
  { id: "skincare", name: "Skincare", emoji: "✨", desc: "Glow essentials" },
  { id: "makeup", name: "Makeup", emoji: "💄", desc: "Look stunning" },
  { id: "haircare", name: "Haircare", emoji: "🌿", desc: "Nourish & shine" },
  { id: "tools", name: "Tools", emoji: "🪄", desc: "Perfect finish" },
];

const BEST_SELLERS = [PRODUCTS[2], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]];

const TRUST_ITEMS = [
  { icon: "✅", title: "Produk Original", sub: "Terjamin keasliannya" },
  { icon: "💰", title: "Harga Terjangkau", sub: "Cocok untuk semua kalangan" },
  { icon: "🏪", title: "Bisa Ambil di Toko", sub: "Atau kami antar ke lokasimu" },
  { icon: "💳", title: "Bayar Mudah", sub: "Transfer bank & e-wallet" },
];

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart, cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();
  const { favorites, toggleFavorite, addToWishlist } = useWishlist();

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
          <p className="hero-sub">Toko Beauty Product · Tondano</p>
          <h1 className="hero-title">
            Beauty products <span>pilihan</span>, harga terjangkau
          </h1>
          <p className="hero-desc">
            Temukan produk skincare dan makeup original pilihanmu dengan harga terjangkau. Pesan sekarang langsung dari website kami.
          </p>
          <div className="hero-actions">
            <button className="hero-cta" onClick={goToProducts}>
              Shop Now
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
            <div className="hero-rating-badge">
              <span className="hero-stars">★★★★★</span>
              <span className="hero-rating-text">Produk original & terpercaya</span>
            </div>
          </div>
        </div>
        <div className="hero-img-wrap">
          <img src="/logo-careofyou.png" alt="hero" className="hero-img" />
          <div className="hero-float-badge">
            <span className="hero-float-icon">📍</span>
            <div>
              <p className="hero-float-title">Lokasi Toko</p>
              <p className="hero-float-sub">Tondano, Minahasa</p>
            </div>
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

      <section className="home-section">
        <div className="home-section-header">
          <h2 className="home-section-title">Shop by category</h2>
        </div>
        <div className="category-grid">
          {SHOP_CATEGORIES.map((cat) => (
            <div key={cat.id} className="cat-card" onClick={goToProducts}>
              <div className="cat-card-img-wrap">
                <span className="cat-card-emoji">{cat.emoji}</span>
                <div className="cat-card-overlay">Browse →</div>
              </div>
              <div className="cat-card-footer">
                <p className="cat-card-name">{cat.name}</p>
                <p className="cat-card-desc">{cat.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="promo-banner-wrap">
        <div className="promo-banner">
          <div className="promo-text">
            <span className="promo-label">Cara Order ✨</span>
            <h3 className="promo-title">Pesan Langsung dari Website Kami!</h3>
            <p className="promo-sub">
              Pilih produk, tambah ke keranjang, dan checkout. Pesananmu langsung kami proses dan siapkan.
            </p>
          </div>
          <button className="promo-btn" onClick={goToProducts}>
            Lihat Produk →
          </button>
          <div className="promo-blob promo-blob-1" />
          <div className="promo-blob promo-blob-2" />
        </div>
      </section>

      <section className="home-section" style={{ marginBottom: 60 }}>
        <div className="home-section-header">
          <h2 className="home-section-title">Best Sellers</h2>
          <button className="section-view-all" onClick={goToProducts}>
            View All →
          </button>
        </div>
        <div className="bestseller-grid">
          {BEST_SELLERS.map((product, i) => (
            <div key={product.id} className="bestseller-card">
              {i === 0 && <span className="product-badge product-badge--hot">🔥 Top Pick</span>}
              {i === 2 && <span className="product-badge product-badge--new">✨ New</span>}
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
          <h2 className="how-title">Cara pesan di website kami</h2>
          <p className="how-sub">Cukup 3 langkah, pesananmu langsung kami proses.</p>
        </div>
        <div className="how-steps">
          <div className="how-step">
            <div className="how-step-num">1</div>
            <div className="how-step-icon">🔍</div>
            <h3 className="how-step-title">Pilih Produk</h3>
            <p className="how-step-desc">Browse koleksi kami dan pilih produk yang kamu mau. Semua katalog sekarang ada di page Products.</p>
          </div>
          <div className="how-step-arrow">→</div>
          <div className="how-step">
            <div className="how-step-num">2</div>
            <div className="how-step-icon">🛒</div>
            <h3 className="how-step-title">Tambah ke Keranjang</h3>
            <p className="how-step-desc">Klik "Add to Bag", pilih jumlah yang kamu butuhkan, lalu lanjut ke checkout.</p>
          </div>
          <div className="how-step-arrow">→</div>
          <div className="how-step">
            <div className="how-step-num">3</div>
            <div className="how-step-icon">✅</div>
            <h3 className="how-step-title">Checkout & Bayar</h3>
            <p className="how-step-desc">Isi data pengiriman dan selesaikan pembayaran. Pesananmu langsung kami proses.</p>
          </div>
        </div>
      </section>

      <Footer />

      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}

      <div className={`cart-sidebar ${cartOpen ? "cart-sidebar-open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>×</button>
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
                  <button className="item-remove" onClick={() => removeItem(item.id)}>×</button>
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
