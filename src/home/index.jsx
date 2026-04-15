import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { PRODUCTS } from "../data/products.js";

const SHOP_CATEGORIES = [
  { id: "skincare", name: "Skincare", emoji: "Glow", desc: "Cleansers, toners, serums, and moisturizers" },
  { id: "makeup", name: "Makeup", emoji: "Tint", desc: "Easy everyday picks for lips, base, and more" },
  { id: "haircare", name: "Haircare", emoji: "Care", desc: "Scalp, strands, and styling support" },
  { id: "tools", name: "Tools", emoji: "Tools", desc: "Little extras that complete the routine" },
];

const BEST_SELLERS = [PRODUCTS[2], PRODUCTS[3], PRODUCTS[4], PRODUCTS[5]];

const TRUST_ITEMS = [
  { icon: "Original", title: "Produk Original", sub: "Pilihan aman untuk restock rutin" },
  { icon: "Trusted", title: "Belanja Terpercaya", sub: "Kurasi yang terasa lebih aman untuk beauty routine" },
  { icon: "Fresh", title: "Restock Rutin", sub: "Favorit lama dan temuan baru terus masuk" },
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
    desc: "Pilihan di toko ini diarahkan ke produk yang terasa aman buat dicari ulang, dicoba, dan dijadikan bagian dari restock rutin.",
  },
  {
    label: "Worth Coming Back To",
    title: "Staples with fresh restocks",
    desc: "Ada produk yang selalu kepakai, tapi juga ada restock dan temuan baru yang tetap terasa relevan buat rutinitas.",
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

export default function HomePage() {
  const navigate = useNavigate();
  const { addToCart, cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();
  const { favorites, toggleFavorite, addToWishlist } = useWishlist();

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
            Original beauty picks that make <span>restocking</span> feel easy
          </h1>
          <p className="hero-desc">
            Dari skincare basics sampai makeup favorites, website ini dibuat untuk toko beauty yang menekankan produk original, trusted, dan nyaman buat belanja rutin.
          </p>

          <div className="hero-chip-row">
            <span className="hero-chip">Original beauty picks</span>
            <span className="hero-chip">Trusted for daily restock</span>
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
              <span className="hero-rating-text">Beauty essentials chosen for repeat restock</span>
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
            <strong>Restock shelf ready</strong>
          </div>
          <div className="hero-img-wrap">
            <img src="/logo-careofyou.png" alt="Careofyou store" className="hero-img" />
          </div>
          <div className="hero-visual-caption">
            <span className="hero-float-icon">Beauty selection</span>
            <p className="hero-visual-caption-text">Original picks and fresh restocks</p>
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
              <div className="cat-card-img-wrap">
                <span className="cat-card-emoji">{cat.emoji}</span>
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
            <h3 className="promo-title">Original picks untuk daily restock, seru untuk lihat temuan baru</h3>
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
