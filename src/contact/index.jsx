import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products.js";

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

/* ─── SVG Icons ───────────────────────────────────────────── */
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
);

const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);


const PhoneIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
  </svg>
);

const EmailIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LocationIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const ClockIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12,6 12,12 16,14"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/>
    <polyline points="12,5 19,12 12,19"/>
  </svg>
);


/* ─── Main Component ──────────────────────────────────────── */
export default function ContactPage() {
  const navigate = useNavigate();
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();


  return (
    <div className="ct-root">
      {/* NAVBAR — outside ct-body so sticky works */}
      <Navbar
        activePage="contact"
        allProducts={PRODUCTS}
        onHomeClick={() => navigate("/")}
        onProductsClick={() => navigate("/products")}
      />

      <div className="ct-body">

      {/* Ambient background orbs */}
      <div className="ct-orb ct-orb-1" />
      <div className="ct-orb ct-orb-2" />
      <div className="ct-orb ct-orb-3" />

      {/* ══════════════ HERO ══════════════ */}
      <section className="ct-hero">
        <div className="ct-hero-grid" />
        <div className="ct-hero-noise" />

        {/* Left content */}
        <div className="ct-hero-left">
          <span className="ct-eyebrow">
            <span className="ct-eyebrow-dot" />
            Contact Us
          </span>
          <h1 className="ct-hero-title">
            Let's<br />
            <span className="ct-hero-grad">Talk</span>
            <br />Together
          </h1>
          <p className="ct-hero-desc">
            Have a question, a special order, or just want to say hi?
            The Careofyou team is here to help you anytime 💌
          </p>

          <div className="ct-hero-stats">
            <div className="ct-stat">
              <span className="ct-stat-val">~30 Min</span>
              <span className="ct-stat-label">Avg Response</span>
            </div>
            <div className="ct-stat-divider" />
            <div className="ct-stat">
              <span className="ct-stat-val">4.9★</span>
              <span className="ct-stat-label">Rating</span>
            </div>
            <div className="ct-stat-divider" />
            <div className="ct-stat">
              <span className="ct-stat-val">2017</span>
              <span className="ct-stat-label">Trusted Since</span>
            </div>
          </div>

          <div className="ct-hero-actions">
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noreferrer"
              className="ct-btn-primary"
            >
              <WhatsAppIcon />
              Chat WhatsApp
            </a>
            <a href="mailto:hello@careofyou.id" className="ct-btn-outline">
              Send Email
              <ArrowIcon />
            </a>
          </div>
        </div>

        {/* Right visual */}
        <div className="ct-hero-right">
          <div className="ct-rings">
            <div className="ct-ring ct-ring-1" />
            <div className="ct-ring ct-ring-2" />
            <div className="ct-ring ct-ring-3" />
            <div className="ct-ring-center">
              <span className="ct-ring-emoji">💌</span>
            </div>
          </div>

          <div className="ct-float-card ct-fc-1">
            <span className="ct-fc-icon">⚡</span>
            <div className="ct-fc-info">
              <span className="ct-fc-val">Fast Reply</span>
              <span className="ct-fc-sub">Avg 30 min</span>
            </div>
          </div>
          <div className="ct-float-card ct-fc-2">
            <span className="ct-fc-icon">🛡️</span>
            <div className="ct-fc-info">
              <span className="ct-fc-val">100% Safe</span>
              <span className="ct-fc-sub">Guaranteed</span>
            </div>
          </div>
          <div className="ct-float-card ct-fc-3">
            <span className="ct-fc-icon">🚚</span>
            <div className="ct-fc-info">
              <span className="ct-fc-val">Free Shipping</span>
              <span className="ct-fc-sub">Min. Rp 150K</span>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ INFO CARDS ══════════════ */}
      <section className="ct-info-section">
        <div className="ct-info-grid">
          {[
            {
              icon: <PhoneIcon />,
              color: "green",
              label: "WhatsApp",
              desc: "Chat directly for the fastest & friendliest response!",
              value: "+62 812-3456-7890",
              href: "https://wa.me/6281234567890",
            },
            {
              icon: <EmailIcon />,
              color: "blue",
              label: "Email",
              desc: "Send detailed inquiries or business partnership requests.",
              value: "hello@careofyou.id",
              href: "mailto:hello@careofyou.id",
            },
            {
              icon: <LocationIcon />,
              color: "rose",
              label: "Location",
              desc: "Serving Manado, Tondano, Tomohon & surrounding areas.",
              value: "Manado, North Sulawesi",
              href: null,
            },
            {
              icon: <ClockIcon />,
              color: "amber",
              label: "Business Hours",
              desc: "We're always ready to help you every day.",
              value: "08:00 – 21:00 WITA",
              href: null,
            },
          ].map((item, i) => (
            <div key={i} className={`ct-info-card ct-info-card--${item.color}`}>
              <div className={`ct-info-icon-wrap ct-info-icon-wrap--${item.color}`}>
                {item.icon}
              </div>
              <div className="ct-info-body">
                <h3 className="ct-info-label">{item.label}</h3>
                <p className="ct-info-desc">{item.desc}</p>
                {item.href ? (
                  <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer" className="ct-info-val ct-info-val--link">
                    {item.value} <ArrowIcon />
                  </a>
                ) : (
                  <span className="ct-info-val">{item.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════ INFO SIDEBAR ══════════════ */}
      <section className="ct-main ct-main--solo">

        {/* Map */}
        <div className="ct-map-card">
          <div className="ct-map-header">
            <LocationIcon />
            <div>
              <h3 className="ct-map-title">Our Location</h3>
              <p className="ct-map-sub">Manado, North Sulawesi</p>
            </div>
          </div>
          <div className="ct-map-wrap">
            <iframe
              title="Careofyou Location Manado"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63874.36706540688!2d124.80235!3d1.47420!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x328726b9b5e5bc4b%3A0x7a0bba4c41d7e020!2sManado%2C%20Kota%20Manado%2C%20Sulawesi%20Utara!5e0!3m2!1sid!2sid!4v1700000000000!5m2!1sid!2sid"
              width="100%"
              height="220"
              style={{ border: 0, display: "block" }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        {/* Social */}
        <div className="ct-social-card">
          <h3 className="ct-social-title">Follow & Shop</h3>
          <div className="ct-social-list">
            <a href="https://instagram.com/careofyou.id" target="_blank" rel="noreferrer" className="ct-social-item ct-social-item--ig">
              <span className="ct-social-ico"><InstagramIcon /></span>
              <div className="ct-social-info">
                <span className="ct-social-name">Instagram</span>
                <span className="ct-social-handle">@careofyou.id</span>
              </div>
              <span className="ct-social-arrow"><ArrowIcon /></span>
            </a>

            <a href="https://wa.me/6281234567890" target="_blank" rel="noreferrer" className="ct-social-item ct-social-item--wa">
              <span className="ct-social-ico"><WhatsAppIcon /></span>
              <div className="ct-social-info">
                <span className="ct-social-name">WhatsApp</span>
                <span className="ct-social-handle">Chat now</span>
              </div>
              <span className="ct-social-arrow"><ArrowIcon /></span>
            </a>
          </div>
        </div>

        {/* Payment */}
        <div className="ct-payment-card">
          <h3 className="ct-payment-title">Payment Methods</h3>
          <div className="ct-payment-grid">
            {["BCA", "BNI", "DANA", "COD"].map((p) => (
              <div key={p} className="ct-payment-chip">{p}</div>
            ))}
          </div>
        </div>

      </section>

      <Footer />
      </div>{/* end ct-body */}

      {/* CART OVERLAY */}
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}

      {/* CART SIDEBAR */}
      <div className={`cart-sidebar ${cartOpen ? "cart-sidebar-open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛍️</span>
            <p>Your cart is empty</p>
            <button className="cart-shop-btn" onClick={() => { setCartOpen(false); navigate("/"); }}>
              Start Shopping
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
