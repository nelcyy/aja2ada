import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products.js";

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

/* ─── Real SVG Icons ─────────────────────────────────────── */
const InstagramIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const ShopeeIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.274 5.753a7.274 7.274 0 00-14.548 0H2.25a1.5 1.5 0 00-1.494 1.355l-1.5 16.5A1.5 1.5 0 00.75 25.25h22.5a1.5 1.5 0 001.494-1.642l-1.5-16.5A1.5 1.5 0 0021.75 5.753h-2.476zm-7.274-4a4.774 4.774 0 014.774 4H7.226a4.774 4.774 0 014.774-4zm3.5 11.5a3.5 3.5 0 01-7 0 1.25 1.25 0 012.5 0 1 1 0 002 0 1.25 1.25 0 012.5 0z"/>
  </svg>
);

export default function ContactPage() {
  const navigate = useNavigate();
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();

  /* ── cursor glow ── */
  const [cursor, setCursor] = useState({ x: -999, y: -999 });

  useEffect(() => {
    const move = (e) => setCursor({ x: e.clientX, y: e.clientY });
    const touch = (e) => {
      const t = e.touches[0];
      if (t) setCursor({ x: t.clientX, y: t.clientY });
    };
    window.addEventListener("mousemove", move);
    window.addEventListener("touchmove", touch, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("touchmove", touch);
    };
  }, []);

  /* ── form state ── */
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) return;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="contact-root">
      {/* cursor glow layer */}
      <div
        className="contact-cursor-glow"
        style={{
          background: `radial-gradient(600px circle at ${cursor.x}px ${cursor.y}px,
            rgba(214,134,124,0.20) 0%,
            rgba(249,180,172,0.12) 30%,
            rgba(255,220,215,0.06) 55%,
            transparent 70%)`,
        }}
      />

      {/* NAVBAR */}
      <Navbar
        activePage="contact"
        allProducts={PRODUCTS}
        onHomeClick={() => navigate("/")}
        onProductsClick={() => navigate("/#all-products")}
      />

      {/* ── HERO ── */}
      <section className="contact-hero">
        <div className="contact-hero-blob contact-hero-blob--1" />
        <div className="contact-hero-blob contact-hero-blob--2" />
        <div className="contact-hero-text">
          <span className="contact-hero-sub">We'd love to hear from you</span>
          <h1 className="contact-hero-title">
            Get in <span>Touch</span>
          </h1>
          <p className="contact-hero-desc">
            Ada pertanyaan, pesanan khusus, atau sekedar mau say hi? Kami siap membantu kamu
            setiap saat 💌
          </p>
        </div>
        <div className="contact-hero-badges">
          <div className="contact-badge">
            <span className="contact-badge-icon">✨</span>
            <span>Trusted since 2017</span>
          </div>
          <div className="contact-badge">
            <span className="contact-badge-icon">💳</span>
            <span>BCA · BNI · DANA · COD</span>
          </div>
          <div className="contact-badge">
            <span className="contact-badge-icon">📍</span>
            <span>Manado · Tondano · Tomohon</span>
          </div>
        </div>
      </section>

      {/* ── INFO CARDS ── */}
      <section className="contact-section">
        <div className="contact-info-grid">
          <div className="contact-info-card">
            <div className="contact-info-icon">📞</div>
            <h3>WhatsApp</h3>
            <p>Chat kami langsung via WhatsApp untuk respons lebih cepat!</p>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="contact-info-link"
            >
              +62 812-3456-7890
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">📧</div>
            <h3>Email</h3>
            <p>Kirim pertanyaan detail atau kerjasama bisnis lewat email kami.</p>
            <a href="mailto:hello@careofyou.id" className="contact-info-link">
              hello@careofyou.id
            </a>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">📍</div>
            <h3>Lokasi</h3>
            <p>Kami melayani area Manado, Tondano, dan Tomohon, Sulawesi Utara.</p>
            <span className="contact-info-link">Manado, Sulawesi Utara</span>
          </div>

          <div className="contact-info-card">
            <div className="contact-info-icon">📸</div>
            <h3>Instagram</h3>
            <p>Follow kami untuk update produk terbaru dan promo menarik!</p>
            <a
              href="https://instagram.com/careofyou.id"
              target="_blank"
              rel="noreferrer"
              className="contact-info-link"
            >
              @careofyou.id
            </a>
          </div>
        </div>
      </section>

      {/* ── FORM + MAP ── */}
      <section className="contact-section contact-main-section">
        {/* FORM */}
        <div className="contact-form-card">
          <h2 className="contact-form-title">Kirim Pesan 💬</h2>
          <p className="contact-form-sub">
            Isi form di bawah dan kami akan segera menghubungi kamu!
          </p>

          {submitted && (
            <div className="contact-success">
              ✅ Pesan terkirim! Kami akan segera menghubungi kamu ya 💕
            </div>
          )}

          <div className="contact-form-fields">
            <div className="contact-field-row">
              <div className="contact-field">
                <label>Nama Lengkap *</label>
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Nama kamu..."
                  className="contact-input"
                />
              </div>
              <div className="contact-field">
                <label>Email *</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="email@kamu.com"
                  className="contact-input"
                />
              </div>
            </div>

            <div className="contact-field">
              <label>No. WhatsApp</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+62..."
                className="contact-input"
              />
            </div>

            <div className="contact-field">
              <label>Pesan *</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Tulis pesanmu di sini..."
                className="contact-input contact-textarea"
                rows={5}
              />
            </div>

            <button className="contact-submit-btn" onClick={handleSubmit}>
              Kirim Pesan ✨
            </button>
          </div>
        </div>

        {/* MAP + SOCIAL */}
        <div className="contact-map-col">
          {/* MAP — Manado, Sulawesi Utara */}
          <div className="contact-map-card">
            <h2 className="contact-map-title">Lokasi Kami 📍</h2>
            <p className="contact-map-sub">Manado, Sulawesi Utara — Indonesia</p>
            <div className="contact-map-wrap">
              <iframe
                title="Careofyou Location Manado"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63874.36706540688!2d124.80235!3d1.47420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x328726b9b5e5bc4b%3A0x7a0bba4c41d7e020!2sManado%2C%20Kota%20Manado%2C%20Sulawesi%20Utara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
                width="100%"
                height="240"
                style={{ border: 0, borderRadius: "12px", display: "block" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* SOCIAL with real icons */}
          <div className="contact-social-card">
            <h3 className="contact-social-title">Follow Us 💕</h3>
            <div className="contact-social-links">
              <a
                href="https://instagram.com/careofyou.id"
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
              >
                <span className="contact-social-icon contact-social-icon--ig">
                  <InstagramIcon />
                </span>
                <span className="contact-social-btn-label">
                  Instagram
                  <span className="contact-social-btn-sub">@careofyou.id</span>
                </span>
              </a>

              <a
                href="https://shopee.co.id/careofyou.id"
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
              >
                <span className="contact-social-icon contact-social-icon--shopee">
                  🛍️
                </span>
                <span className="contact-social-btn-label">
                  Shopee
                  <span className="contact-social-btn-sub">careofyou.id</span>
                </span>
              </a>

              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noreferrer"
                className="contact-social-btn"
              >
                <span className="contact-social-icon contact-social-icon--wa">
                  <WhatsAppIcon />
                </span>
                <span className="contact-social-btn-label">
                  WhatsApp
                  <span className="contact-social-btn-sub">Chat langsung</span>
                </span>
              </a>
            </div>
          </div>

          {/* PAYMENT */}
          <div className="contact-payment-card">
            <h3 className="contact-payment-title">Metode Pembayaran 💳</h3>
            <div className="contact-payment-tags">
              {["BCA", "BNI", "DANA", "COD"].map((p) => (
                <span key={p} className="contact-payment-tag">{p}</span>
              ))}
            </div>
          </div>
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
            <span onClick={() => navigate("/")}>About Us</span>
            <span onClick={() => navigate("/")}>Products</span>
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
            <button className="cart-shop-btn" onClick={() => { setCartOpen(false); navigate("/"); }}>
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