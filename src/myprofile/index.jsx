import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";

/* ── Icons ─────────────────────────────────────────────── */
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconMapPin = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconWallet = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="5" width="20" height="14" rx="2"/>
    <path d="M16 12h2"/>
    <path d="M2 10h20"/>
  </svg>
);
const IconBox = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
    <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
    <line x1="12" y1="22.08" x2="12" y2="12"/>
  </svg>
);
const IconTruck = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <rect x="1" y="3" width="15" height="13" rx="1"/>
    <path d="M16 8h4l3 5v3h-7V8z"/>
    <circle cx="5.5" cy="18.5" r="2.5"/>
    <circle cx="18.5" cy="18.5" r="2.5"/>
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>
);
const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3"/>
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
  </svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
    <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
  </svg>
);
const IconLogOut = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
    <polyline points="16 17 21 12 16 7"/>
    <line x1="21" y1="12" x2="9" y2="12"/>
  </svg>
);

/* ── Nav config ─────────────────────────────────────────── */
const navItems = [
  { id: "userinfo",      label: "User info",       icon: <IconUser /> },
  { id: "myaddress",     label: "My Address",      icon: <IconMapPin /> },
  { id: "unpaid",        label: "Unpaid",           icon: <IconWallet /> },
  { id: "packing",       label: "Being Packed",     icon: <IconBox /> },
  { id: "shipped",       label: "Shipped",          icon: <IconTruck /> },
  { id: "rateorder",     label: "Rate Order",       icon: <IconStar /> },
  { id: "setting",       label: "Setting",          icon: <IconSettings /> },
  { id: "notifications", label: "Notifications",    icon: <IconBell /> },
];

/* ── Sections ───────────────────────────────────────────── */
function UserInfoSection() {
  const [form, setForm] = useState({
    firstName: "Sara",
    lastName: "Tancredi",
    email: "Sara Tancredi@gmail.com",
    phone: "(+98) 9123728167",
    location: "New York, USA",
    postalCode: "23728167",
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setSaved(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <>
      <div className="pr-profile-header">
        <div className="pr-profile-initial">
          {form.firstName.charAt(0)}{form.lastName.charAt(0)}
        </div>
        <div className="pr-profile-info">
          <h3 className="pr-profile-name">{form.firstName} {form.lastName}</h3>
          <p className="pr-profile-location">{form.location}</p>
        </div>
      </div>

      <form className="pr-form" onSubmit={handleSubmit}>
        <div className="pr-form-row">
          <div className="pr-form-group">
            <label className="pr-form-label">Name</label>
            <input className="pr-input" name="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          <div className="pr-form-group">
            <label className="pr-form-label">Full Name</label>
            <input className="pr-input" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="pr-form-row">
          <div className="pr-form-group">
            <label className="pr-form-label">Email Address</label>
            <input className="pr-input" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="pr-form-group">
            <label className="pr-form-label">Phone Number</label>
            <input className="pr-input" name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="pr-form-row">
          <div className="pr-form-group">
            <label className="pr-form-label">Location</label>
            <input className="pr-input" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="pr-form-group">
            <label className="pr-form-label">Postal Code</label>
            <input className="pr-input" name="postalCode" value={form.postalCode} onChange={handleChange} />
          </div>
        </div>
        <div className="pr-save-wrapper">
          <button type="submit" className={`pr-save-btn${saved ? " pr-save-btn--saved" : ""}`}>
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

/* ── My Address Section ─────────────────────────────────── */
const initialAddresses = [
  {
    id: 1,
    label: "Home",
    name: "Sara Tancredi",
    phone: "(+98) 9123728167",
    address: "123 Main Street, New York, NY 10001, USA",
    isMain: true,
  },
];

function MyAddressSection() {
  const [addresses, setAddresses] = useState(initialAddresses);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ label: "", name: "", phone: "", address: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!form.label || !form.name || !form.phone || !form.address) {
      setError("Please fill in all fields.");
      return;
    }
    const newAddr = {
      id: Date.now(),
      ...form,
      isMain: addresses.length === 0,
    };
    setAddresses([...addresses, newAddr]);
    setForm({ label: "", name: "", phone: "", address: "" });
    setShowForm(false);
    setError("");
  };

  const setMain = (id) => {
    setAddresses(addresses.map((a) => ({ ...a, isMain: a.id === id })));
  };

  const remove = (id) => {
    const updated = addresses.filter((a) => a.id !== id);
    if (updated.length > 0 && !updated.some((a) => a.isMain)) {
      updated[0].isMain = true;
    }
    setAddresses(updated);
  };

  return (
    <div className="pr-addr-section">
      <div className="pr-addr-header">
        <div>
          <h2 className="pr-section-title">My Address</h2>
          <p className="pr-section-sub">{addresses.length} saved address{addresses.length !== 1 ? "es" : ""}</p>
        </div>
        <button className="pr-addr-add-btn" onClick={() => { setShowForm((v) => !v); setError(""); }}>
          {showForm ? "Cancel" : "+ Add Address"}
        </button>
      </div>

      {/* Add form */}
      {showForm && (
        <form className="pr-addr-form" onSubmit={handleAdd}>
          <div className="pr-form-row">
            <div className="pr-form-group">
              <label className="pr-form-label">Label (e.g. Home, Office)</label>
              <input className="pr-input" name="label" placeholder="Home" value={form.label} onChange={handleChange} />
            </div>
            <div className="pr-form-group">
              <label className="pr-form-label">Recipient Name</label>
              <input className="pr-input" name="name" placeholder="Full name" value={form.name} onChange={handleChange} />
            </div>
          </div>
          <div className="pr-form-group">
            <label className="pr-form-label">Phone Number</label>
            <input className="pr-input" name="phone" placeholder="+1 234 567 8900" value={form.phone} onChange={handleChange} />
          </div>
          <div className="pr-form-group">
            <label className="pr-form-label">Full Address</label>
            <textarea className="pr-input pr-textarea" name="address" placeholder="Street, City, ZIP, Country" value={form.address} onChange={handleChange} rows={3} />
          </div>
          {error && <p className="pr-addr-error">{error}</p>}
          <div className="pr-save-wrapper" style={{ justifyContent: "flex-start" }}>
            <button type="submit" className="pr-save-btn">Save Address</button>
          </div>
        </form>
      )}

      {/* Address cards */}
      <div className="pr-addr-list">
        {addresses.map((addr) => (
          <div key={addr.id} className={`pr-addr-card${addr.isMain ? " pr-addr-card--main" : ""}`}>
            <div className="pr-addr-card-top">
              <div className="pr-addr-label-row">
                <span className="pr-addr-label">{addr.label}</span>
                {addr.isMain && <span className="pr-addr-badge">Main</span>}
              </div>
              <button className="pr-addr-delete" onClick={() => remove(addr.id)} title="Delete address">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>
                </svg>
              </button>
            </div>
            <p className="pr-addr-name">{addr.name} · {addr.phone}</p>
            <p className="pr-addr-text">{addr.address}</p>
            {!addr.isMain && (
              <button className="pr-addr-set-main" onClick={() => setMain(addr.id)}>
                Set as main address
              </button>
            )}
          </div>
        ))}
      </div>

      {addresses.length === 0 && (
        <div className="pr-placeholder">
          <p className="pr-placeholder-title">No addresses yet</p>
          <p className="pr-placeholder-sub">Add a shipping address to get started.</p>
        </div>
      )}
    </div>
  );
}

/* ── Order Section (Unpaid / Packing / Shipped / Rate Order) ── */
const MOCK_ORDERS = {
  unpaid: [
    { id: "ORD-001", store: "Careofyou Official", product: "5X Ceramide Barrier Repair Moisture Gel", qty: 1, total: 149000, date: "14 Apr 2025" },
    { id: "ORD-002", store: "Skintific Store",    product: "AHA BHA PHA 30 Days Miracle Toner",      qty: 2, total: 370000, date: "13 Apr 2025" },
  ],
  packing: [
    { id: "ORD-003", store: "Careofyou Official", product: "Vitamin C Brightening Serum",            qty: 1, total: 195000, date: "12 Apr 2025" },
    { id: "ORD-004", store: "Wardah Store",        product: "Lightening Face Moisturizer SPF 30",    qty: 1, total: 69000,  date: "11 Apr 2025" },
  ],
  shipped: [
    { id: "ORD-005", store: "Careofyou Official", product: "Retinol Night Cream",                   qty: 1, total: 210000, date: "10 Apr 2025" },
    { id: "ORD-006", store: "Nacific Store",       product: "Real Floral Toner — Rose Edition",      qty: 1, total: 210000, date: "9 Apr 2025"  },
  ],
  rateorder: [
    { id: "ORD-007", store: "Careofyou Official", product: "Sunscreen Aqua Gel SPF 50",             qty: 2, total: 198000, date: "5 Apr 2025"  },
    { id: "ORD-008", store: "Some By Mi Store",    product: "Snail Truecica Miracle Repair Toner",   qty: 1, total: 185000, date: "3 Apr 2025"  },
  ],
};

const STATUS_LABEL = {
  unpaid:    { text: "Awaiting Payment", color: "#e07a73", bg: "#fff5f5" },
  packing:   { text: "Being Packed",     color: "#e09a3a", bg: "#fffaf0" },
  shipped:   { text: "On Delivery",      color: "#4a9fd4", bg: "#f0f8ff" },
  rateorder: { text: "Delivered",        color: "#5aab6d", bg: "#f0faf3" },
};

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

function OrderSection({ sectionKey, title }) {
  const [query, setQuery] = useState("");
  const orders  = MOCK_ORDERS[sectionKey] ?? [];
  const status  = STATUS_LABEL[sectionKey];
  const q       = query.toLowerCase();
  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(q) ||
    o.product.toLowerCase().includes(q) ||
    o.store.toLowerCase().includes(q)
  );

  return (
    <div className="pr-order-section">
      {/* Header */}
      <div className="pr-order-header">
        <div>
          <h2 className="pr-section-title">{title}</h2>
          <p className="pr-section-sub">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Search bar */}
      <div className="pr-search-wrap">
        <span className="pr-search-icon"><IconSearch /></span>
        <input
          className="pr-search-input"
          type="text"
          placeholder="Search by order ID, product, or store…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && (
          <button className="pr-search-clear" onClick={() => setQuery("")}>✕</button>
        )}
      </div>

      {/* Order list */}
      {filtered.length === 0 ? (
        <div className="pr-placeholder">
          <p className="pr-placeholder-title">No orders found</p>
          <p className="pr-placeholder-sub">Try a different keyword.</p>
        </div>
      ) : (
        <div className="pr-order-list">
          {filtered.map(order => (
            <div key={order.id} className="pr-order-card">
              <div className="pr-order-top">
                <span className="pr-order-store">{order.store}</span>
                <span
                  className="pr-order-status"
                  style={{ color: status.color, background: status.bg }}
                >
                  {status.text}
                </span>
              </div>
              <div className="pr-order-mid">
                <p className="pr-order-product">{order.product}</p>
                <p className="pr-order-meta">Qty: {order.qty} · {order.date}</p>
              </div>
              <div className="pr-order-bottom">
                <span className="pr-order-id">{order.id}</span>
                <span className="pr-order-total">{fmt(order.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function PlaceholderSection({ title }) {
  return (
    <div className="pr-placeholder">
      <p className="pr-placeholder-title">{title}</p>
      <p className="pr-placeholder-sub">Nothing here yet.</p>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function MyProfile() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("userinfo");

  const renderContent = () => {
    switch (activeNav) {
      case "userinfo":      return <UserInfoSection />;
      case "myaddress":     return <MyAddressSection />;
      case "unpaid":        return <PlaceholderSection title="Unpaid" />;
      case "packing":       return <PlaceholderSection title="Being Packed" />;
      case "shipped":       return <PlaceholderSection title="Shipped" />;
      case "rateorder":     return <PlaceholderSection title="Rate Order" />;
      case "setting":       return <PlaceholderSection title="Setting" />;
      case "notifications": return <PlaceholderSection title="Notifications" />;
      default:              return null;
    }
  };

  return (
    <div className="pr-page">

      {/* ── NAVBAR ── */}
      <Navbar 
        activePage="myprofile"
        onHomeClick={() => navigate("/")}
        onProductsClick={() => navigate("/")}
      />

      {/* ── BODY ── */}
      <div className="pr-body">

        {/* Sidebar */}
        <aside className="pr-sidebar">
          <h2 className="pr-sidebar-title">User Profile</h2>
          <nav className="pr-sidebar-nav">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`pr-nav-item${activeNav === item.id ? " pr-nav-item--active" : ""}`}
                onClick={() => setActiveNav(item.id)}
              >
                <span className="pr-nav-icon">{item.icon}</span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          <div className="pr-sidebar-logout" onClick={() => navigate("/")}>
            <span className="pr-nav-icon"><IconLogOut /></span>
            <span>Log out</span>
          </div>
        </aside>

        <div className="pr-sidebar-divider" />

        {/* Main + Footer */}
        <main className="pr-main">
          <div className="pr-content">
            {renderContent()}
          </div>

          {/* ── FOOTER (same as wishlist) ── */}
          <footer className="pr-footer">
            <div className="pr-footer-inner">
              <div className="pr-footer-brand">
                <img src="/logo-careofyou.png" alt="Careofyou" className="pr-footer-logo" />
                <span className="pr-footer-name">careofyou</span>
              </div>
              <div className="pr-footer-links">
                <span>About Us</span>
                <span>Products</span>
                <span>Skincare Guide</span>
                <span>Contact</span>
              </div>
              <p className="pr-footer-copy">© 2025 Careofyou. All rights reserved.</p>
            </div>
          </footer>
        </main>
      </div>

    </div>
  );
}
