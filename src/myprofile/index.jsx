import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PRODUCTS } from "../data/products.js";

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

const AdminPaymentApproval = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* User head */}
    <circle cx="9" cy="7" r="4" />

    {/* User body */}
    <path d="M3 21c0-3.5 3-6 6-6s6 2.5 6 6" />

    {/* Gear (settings) */}
    <circle cx="18" cy="17" r="2.5" />
    <path d="M18 13v1" />
    <path d="M18 20v1" />
    <path d="M15.5 14.5l.7.7" />
    <path d="M19.8 18.8l.7.7" />
    <path d="M14 17h1" />
    <path d="M21 17h1" />
    <path d="M15.5 19.5l.7-.7" />
    <path d="M19.8 15.2l.7-.7" />
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
  { id: "adminapproval", label: "Admin Approval",  icon: <AdminPaymentApproval /> },
  { id: "packing",       label: "Being Packed",     icon: <IconBox /> },
  { id: "shipped",       label: "Shipped",          icon: <IconTruck /> },
  { id: "rateorder",     label: "Rate Order",       icon: <IconStar /> },
  { id: "setting",       label: "Settings",          icon: <IconSettings /> },
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

/* ── Order Section (adminapproval / Packing / Shipped / Rate Order) ── */
const MOCK_ORDERS = {
  adminapproval: [
    {
      id: "ORD-011",
      date: "15 Apr 2025",
      products: [
        { name: "Sunscreen Aqua Gel SPF 50",        size: "40ml", qty: 2, price: 99000,  image: "https://placehold.co/72x72/fce8e6/c4706a?text=SPF"  },
        { name: "5X Ceramide Barrier Moisture Gel", size: "30ml", qty: 1, price: 149000, image: "https://placehold.co/72x72/fdeaea/c4706a?text=Gel"  },
      ],
      deliveryFee: 15000,
      payment: { method: "BCA Transfer", account: "1234-5678-90" },
    },
    {
      id: "ORD-012",
      date: "15 Apr 2025",
      products: [
        { name: "Vitamin C Brightening Serum", size: "30ml", qty: 1, price: 195000, image: "https://placehold.co/72x72/fff3e0/c4706a?text=VitC" },
      ],
      deliveryFee: 10000,
      payment: { method: "GoPay", account: "0812-3456-7890" },
    },
  ],
  packing: [
    {
      id: "ORD-013",
      date: "14 Apr 2025",
      packedBy: "Warehouse Team B",
      estimatedShip: "16 Apr 2025",
      products: [
        { name: "Retinol Night Cream",       size: "50ml", qty: 1, price: 210000, image: "https://placehold.co/72x72/fce8e6/c4706a?text=Ret"  },
        { name: "Hydra Boost Toner",         size: "200ml", qty: 1, price: 125000, image: "https://placehold.co/72x72/fdeaea/c4706a?text=Ton"  },
      ],
      deliveryFee: 15000,
      payment: { method: "BNI Transfer", account: "0987-6543-21" },
    },
    {
      id: "ORD-014",
      date: "13 Apr 2025",
      packedBy: "Warehouse Team A",
      estimatedShip: "15 Apr 2025",
      products: [
        { name: "Niacinamide 10% + Zinc Serum", size: "30ml", qty: 2, price: 135000, image: "https://placehold.co/72x72/fce8e6/c4706a?text=Nia" },
      ],
      deliveryFee: 10000,
      payment: { method: "OVO", account: "0812-3456-7890" },
    },
  ],
  shipped: [
    {
      id: "ORD-015",
      date: "12 Apr 2025",
      courier: "JNE Regular",
      tracking: "JNE20250412005123",
      estimatedArrival: "17 Apr 2025",
      products: [
        { name: "AHA BHA Exfoliating Toner",   size: "200ml", qty: 1, price: 135000, image: "https://placehold.co/72x72/fce8e6/c4706a?text=AHA"  },
        { name: "SPF 50 UV Defense Serum",     size: "30ml",  qty: 1, price: 225000, image: "https://placehold.co/72x72/fdeaea/c4706a?text=SPF"  },
      ],
      deliveryFee: 0,
      payment: { method: "BCA Transfer", account: "1234-5678-90" },
    },
    {
      id: "ORD-016",
      date: "11 Apr 2025",
      courier: "SiCepat HALU",
      tracking: "SICP20250411007890",
      estimatedArrival: "14 Apr 2025",
      products: [
        { name: "Peptide Eye Cream", size: "15ml", qty: 1, price: 185000, image: "https://placehold.co/72x72/fff3e0/c4706a?text=Eye" },
      ],
      deliveryFee: 8000,
      payment: { method: "DANA", account: "0812-3456-7890" },
    },
  ],
  rateorder: [
    {
      id: "ORD-007",
      date: "5 Apr 2025",
      deliveredDate: "7 Apr 2025",
      products: [
        { name: "Sunscreen Aqua Gel SPF 50",       brand: "Skintific", size: "40ml", qty: 2, price: 99000,  image: "https://placehold.co/72x72/fce8e6/c4706a?text=SPF"  },
        { name: "5X Ceramide Barrier Moisture Gel", brand: "Skintific", size: "30ml", qty: 1, price: 149000, image: "https://placehold.co/72x72/fdeaea/c4706a?text=Gel"  },
      ],
      deliveryFee: 15000,
      delivery: { courier: "JNE Regular",   tracking: "JNE2025040500123",  address: "123 Main Street, New York, NY 10001, USA",     recipient: "Sara Tancredi", phone: "(+98) 9123728167" },
      payment:  { method: "BCA",  type: "bank",   account: "1234-5678-90",    holder: "Careofyou Store" },
      rating: null,
    },
    {
      id: "ORD-008",
      date: "3 Apr 2025",
      deliveredDate: "5 Apr 2025",
      products: [
        { name: "Snail Truecica Miracle Repair Toner", brand: "Some By Mi", size: "150ml", qty: 1, price: 185000, image: "https://placehold.co/72x72/fdeaea/c4706a?text=Toner" },
      ],
      deliveryFee: 8000,
      delivery: { courier: "SiCepat HALU", tracking: "SICP2025040300456", address: "456 Business Ave, Manhattan, NY 10002, USA",    recipient: "Sara Tancredi", phone: "(+98) 9123728167" },
      payment:  { method: "GoPay", type: "ewallet", account: "0812-3456-7890", holder: "Careofyou Store" },
      rating: 4,
    },
    {
      id: "ORD-005",
      date: "15 Mar 2025",
      deliveredDate: "18 Mar 2025",
      products: [
        { name: "Real Floral Toner — Rose Edition", brand: "Nacific", size: "180ml", qty: 1, price: 210000, image: "https://placehold.co/72x72/fce8e6/c4706a?text=Rose"  },
        { name: "Vitamin C Brightening Serum",      brand: "Nacific", size: "30ml",  qty: 1, price: 195000, image: "https://placehold.co/72x72/fff3e0/c4706a?text=VitC"  },
        { name: "SPF 50 Daily Sun Cream",           brand: "Nacific", size: "50ml",  qty: 2, price: 89000,  image: "https://placehold.co/72x72/fce8e6/c4706a?text=Sun"   },
      ],
      deliveryFee: 0,
      delivery: { courier: "JNT Express",   tracking: "JNT2025031500789",  address: "123 Main Street, New York, NY 10001, USA",     recipient: "Sara Tancredi", phone: "(+98) 9123728167" },
      payment:  { method: "BNI",  type: "bank",   account: "0987-6543-21",    holder: "Careofyou Store" },
      rating: 5,
    },
    {
      id: "ORD-003",
      date: "22 Feb 2025",
      deliveredDate: "24 Feb 2025",
      products: [
        { name: "Lightening Face Moisturizer SPF 30", brand: "Wardah", size: "40ml", qty: 1, price: 69000, image: "https://placehold.co/72x72/e8f5e9/4caf50?text=SPF" },
      ],
      deliveryFee: 8000,
      delivery: { courier: "SiCepat REG",  tracking: "SICP2025022200321", address: "456 Business Ave, Manhattan, NY 10002, USA",    recipient: "Sara Tancredi", phone: "(+98) 9123728167" },
      payment:  { method: "DANA", type: "ewallet", account: "0812-3456-7890", holder: "Careofyou Store" },
      rating: 3,
    },
  ],
};

const STATUS_LABEL = {
  adminapproval: { text: "Admin Approval", color: "#e07a73", bg: "#fff5f5" },
  packing:   { text: "Being Packed",     color: "#e09a3a", bg: "#fffaf0" },
  shipped:   { text: "On Delivery",      color: "#4a9fd4", bg: "#f0f8ff" },
  rateorder: { text: "Delivered",        color: "#5aab6d", bg: "#f0faf3" },
};

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

function OrderSection({ sectionKey, title }) {
  const [query, setQuery]     = useState("");
  const [selected, setSelected] = useState(null);
  const orders = MOCK_ORDERS[sectionKey] ?? [];
  const status = STATUS_LABEL[sectionKey];
  const q      = query.toLowerCase();
  const filtered = orders.filter(o =>
    o.id.toLowerCase().includes(q) ||
    o.products.some(p => p.name.toLowerCase().includes(q))
  );

  const orderTotal = (order) =>
    order.products.reduce((s, p) => s + p.price * p.qty, 0) + order.deliveryFee;

  const statusEmoji = sectionKey === "adminapproval" ? "⏳" : sectionKey === "packing" ? "📦" : "🚚";

  return (
    <div className="pr-order-section">
      <div className="pr-order-header">
        <div>
          <h2 className="pr-section-title">{title}</h2>
          <p className="pr-section-sub">{orders.length} order{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      <div className="pr-search-wrap">
        <span className="pr-search-icon"><IconSearch /></span>
        <input
          className="pr-search-input"
          type="text"
          placeholder="Search by order ID or product…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && <button className="pr-search-clear" onClick={() => setQuery("")}>✕</button>}
      </div>

      {filtered.length === 0 ? (
        <div className="pr-placeholder">
          <p className="pr-placeholder-title">No orders found</p>
          <p className="pr-placeholder-sub">Try a different keyword.</p>
        </div>
      ) : (
        <div className="pr-order-list">
          {filtered.map(order => {
            const total = orderTotal(order);
            const itemCount = order.products.reduce((s, p) => s + p.qty, 0);
            return (
              <div
                key={order.id}
                className="pr-order-card pr-order-card--clickable"
                onClick={() => setSelected(order)}
              >
                <div className="pr-order-top">
                  <span className="pr-order-status" style={{ color: status.color, background: status.bg }}>
                    {statusEmoji} {status.text}
                  </span>
                  <span className="pr-order-date">{order.date}</span>
                </div>

                <div className="pr-order-thumbs">
                  {order.products.slice(0, 3).map((p, i) => (
                    <img key={i} src={p.image} alt={p.name} className="pr-order-thumb" />
                  ))}
                  {order.products.length > 3 && (
                    <span className="pr-order-thumb-more">+{order.products.length - 3}</span>
                  )}
                </div>

                <p className="pr-order-summary">
                  {order.products[0].name}
                  {order.products.length > 1 && (
                    <span className="pr-order-summary-more"> &amp; {order.products.length - 1} more item{order.products.length > 2 ? "s" : ""}</span>
                  )}
                </p>

                {sectionKey === "adminapproval" && (
                  <div className="pr-order-info-row">
                    <span className="pr-order-info-label">Payment</span>
                    <span className="pr-order-info-value">{order.payment.method} · {order.payment.account}</span>
                  </div>
                )}
                {sectionKey === "packing" && (
                  <div className="pr-order-info-row">
                    <span className="pr-order-info-label">Est. ship date</span>
                    <span className="pr-order-info-value">{order.estimatedShip}</span>
                  </div>
                )}
                {sectionKey === "shipped" && (
                  <>
                    <div className="pr-order-info-row">
                      <span className="pr-order-info-label">Courier</span>
                      <span className="pr-order-info-value">{order.courier}</span>
                    </div>
                    <div className="pr-order-info-row">
                      <span className="pr-order-info-label">Tracking</span>
                      <span className="pr-order-info-value pr-order-tracking">{order.tracking}</span>
                    </div>
                    <div className="pr-order-info-row">
                      <span className="pr-order-info-label">Est. arrival</span>
                      <span className="pr-order-info-value" style={{ color: "#5aab6d", fontWeight: 600 }}>{order.estimatedArrival}</span>
                    </div>
                  </>
                )}

                <div className="pr-order-bottom">
                  <div className="pr-order-bottom-left">
                    <span className="pr-order-id">{order.id}</span>
                    <span className="pr-order-meta">· {itemCount} item{itemCount !== 1 ? "s" : ""}</span>
                  </div>
                  <div className="pr-order-bottom-right">
                    <span className="pr-order-unrated">Tap for detail ›</span>
                    <span className="pr-order-total">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Detail Modal ── */}
      {selected && (
        <div className="pr-modal-overlay" onClick={() => setSelected(null)}>
          <div className="pr-modal" onClick={e => e.stopPropagation()}>

            {/* Header */}
            <div className="pr-modal-header">
              <div>
                <p className="pr-modal-order-id">{selected.id} · {selected.date}</p>
                <h3 className="pr-modal-title">Order Details</h3>
              </div>
              <div className="pr-modal-header-right">
                <span className="pr-modal-status-badge" style={{ color: status.color, background: status.bg }}>
                  {statusEmoji} {status.text}
                </span>
                <button className="pr-modal-close" onClick={() => setSelected(null)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="pr-modal-body">
              {/* Products */}
              <div className="pr-modal-section">
                <p className="pr-modal-section-title">Ordered Products</p>
                <div className="pr-modal-products">
                  {selected.products.map((p, i) => (
                    <div key={i} className="pr-modal-product">
                      <img src={p.image} alt={p.name} className="pr-modal-product-img" />
                      <div className="pr-modal-product-info">
                        <p className="pr-modal-product-name">{p.name}</p>
                        <p className="pr-modal-product-meta">{p.size} · Qty {p.qty}</p>
                      </div>
                      <span className="pr-modal-product-price">{fmt(p.price * p.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="pr-modal-cost-rows">
                  <div className="pr-modal-cost-row">
                    <span>Delivery fee</span><span>{fmt(selected.deliveryFee)}</span>
                  </div>
                  <div className="pr-modal-cost-row pr-modal-cost-row--total">
                    <span>Total</span><span>{fmt(orderTotal(selected))}</span>
                  </div>
                </div>
              </div>

              {/* Status-specific info */}
              {sectionKey === "adminapproval" && (
                <div className="pr-modal-section">
                  <p className="pr-modal-section-title">Order Status</p>
                  <div className="pr-modal-info-grid">
                    <div className="pr-modal-info-item pr-modal-info-item--full">
                      <span className="pr-modal-info-label">Next update</span>
                      <span className="pr-modal-info-value">Your payment is being verified by our admin. Please wait up to 1x24 hours.</span>
                    </div>
                  </div>
                </div>
              )}

              {sectionKey === "packing" && (
                <div className="pr-modal-section">
                  <p className="pr-modal-section-title">Packing Information</p>
                  <div className="pr-modal-info-grid">
                    <div className="pr-modal-info-item">
                      <span className="pr-modal-info-label">Packed by</span>
                      <span className="pr-modal-info-value">{selected.packedBy}</span>
                    </div>
                    <div className="pr-modal-info-item">
                      <span className="pr-modal-info-label">Est. ship date</span>
                      <span className="pr-modal-info-value">{selected.estimatedShip}</span>
                    </div>
                  </div>
                </div>
              )}

              {sectionKey === "shipped" && (
                <div className="pr-modal-section">
                  <p className="pr-modal-section-title">Delivery Information</p>
                  <div className="pr-modal-info-grid">
                    <div className="pr-modal-info-item">
                      <span className="pr-modal-info-label">Courier</span>
                      <span className="pr-modal-info-value">{selected.courier}</span>
                    </div>
                    <div className="pr-modal-info-item">
                      <span className="pr-modal-info-label">Tracking No.</span>
                      <span className="pr-modal-info-value pr-modal-info-track">{selected.tracking}</span>
                    </div>
                    <div className="pr-modal-info-item">
                      <span className="pr-modal-info-label">Est. arrival</span>
                      <span className="pr-modal-info-value">{selected.estimatedArrival}</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Payment */}
              <div className="pr-modal-section">
                <p className="pr-modal-section-title">Payment Method</p>
                <div className="pr-modal-payment">
                  <div className="pr-modal-payment-badge">{selected.payment.method}</div>
                  <div>
                    <p className="pr-modal-payment-account">{selected.payment.account}</p>
                    <p className="pr-modal-payment-holder">
                      {selected.payment.holder ? `a.n. ${selected.payment.holder}` : "Payment account used for this order"}
                    </p>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Notifications Section ──────────────────────────────── */
const MOCK_NOTIFICATIONS = [
  { id: 1,  type: "order",    title: "Order placed",                  body: "ORD-011 confirmed. Rp 362,000 via BCA Transfer.",                   time: "Just now",   read: false },
  { id: 2,  type: "order",    title: "Order placed",                  body: "ORD-012 confirmed. Rp 205,000 via GoPay.",                          time: "5 min ago",  read: false },
  { id: 3,  type: "payment",  title: "Payment approved",              body: "Admin has verified your BNI Transfer for ORD-013.",                 time: "30 min ago", read: false },
  { id: 4,  type: "payment",  title: "Payment approved",              body: "Admin has verified your OVO payment for ORD-014.",                  time: "1 hr ago",   read: false },
  { id: 5,  type: "packing",  title: "Your order is being packed",    body: "ORD-013 is now being prepared by our team. Est. ship: 16 Apr.",     time: "2 hr ago",   read: false },
  { id: 6,  type: "packing",  title: "Your order is being packed",    body: "ORD-014 is now being packaged. Est. ship: 15 Apr.",                 time: "3 hr ago",   read: true  },
  { id: 7,  type: "shipped",  title: "Your order is on the way!",     body: "ORD-015 shipped via JNE Regular. Tracking: JNE20250412005123.",     time: "Yesterday",  read: true  },
  { id: 8,  type: "shipped",  title: "Your order is on the way!",     body: "ORD-016 shipped via SiCepat HALU. Est. arrival: 14 Apr.",           time: "2 days ago", read: true  },
  { id: 9,  type: "promo",    title: "Special offer just for you",    body: "Get 15% off your next purchase. Use code CARE15 at checkout.",      time: "3 days ago", read: true  },
  { id: 10, type: "delivered","title": "Order delivered",             body: "ORD-007 has arrived. How was your experience? Leave a review!",     time: "8 days ago", read: true  },
];

const NOTIF_META = {
  order:     { icon: "🛍️", color: "#e09a3a", bg: "rgba(224,154,58,0.1)"  },
  payment:   { icon: "✅", color: "#22c55e", bg: "rgba(34,197,94,0.1)"   },
  packing:   { icon: "📦", color: "#4a9fd4", bg: "rgba(74,159,212,0.1)"  },
  shipped:   { icon: "🚚", color: "#8b5cf6", bg: "rgba(139,92,246,0.1)"  },
  delivered: { icon: "🎉", color: "#5aab6d", bg: "rgba(90,171,109,0.1)"  },
  promo:     { icon: "🏷️", color: "#d6867c", bg: "rgba(214,134,124,0.1)" },
};

function NotificationsSection() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const unread   = notifs.filter(n => !n.read).length;
  const filters  = ["all", "order", "payment", "packing", "shipped", "promo"];
  const filtered = filter === "all" ? notifs : notifs.filter(n => n.type === filter);

  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss     = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  return (
    <div className="pr-order-section">
      <div className="pr-order-header">
        <div>
          <h2 className="pr-section-title">Notifications</h2>
          <p className="pr-section-sub">{unread} unread · {notifs.length} total</p>
        </div>
        {unread > 0 && (
          <button className="pr-notif-markall" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      {/* Filter pills */}
      <div className="pr-notif-filters">
        {filters.map(f => (
          <button
            key={f}
            className={`pr-notif-pill${filter === f ? " pr-notif-pill--active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f === "all" ? "All" : f.charAt(0).toUpperCase() + f.slice(1)}
            <span className="pr-notif-pill-count">
              {f === "all" ? notifs.length : notifs.filter(n => n.type === f).length}
            </span>
          </button>
        ))}
      </div>

      {/* List */}
      <div className="pr-notif-list">
        {filtered.length === 0 ? (
          <div className="pr-placeholder">
            <p className="pr-placeholder-title">No notifications</p>
            <p className="pr-placeholder-sub">Nothing in this category yet.</p>
          </div>
        ) : filtered.map(n => {
          const meta = NOTIF_META[n.type] ?? NOTIF_META.order;
          return (
            <div
              key={n.id}
              className={`pr-notif-item${n.read ? "" : " pr-notif-item--unread"}`}
              onClick={() => markRead(n.id)}
            >
              <div className="pr-notif-icon" style={{ background: meta.bg }}>
                <span>{meta.icon}</span>
              </div>
              <div className="pr-notif-body">
                <div className="pr-notif-top">
                  <span className="pr-notif-title">{n.title}</span>
                  <span className="pr-notif-time">{n.time}</span>
                </div>
                <p className="pr-notif-desc">{n.body}</p>
              </div>
              <div className="pr-notif-actions">
                {!n.read && <span className="pr-notif-dot" />}
                <button
                  className="pr-notif-dismiss"
                  onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                >✕</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ── Rate Order Section ─────────────────────────────────── */
function RateOrderSection() {
  const [query, setQuery]       = useState("");
  const [orders, setOrders]     = useState(MOCK_ORDERS.rateorder);
  const [selected, setSelected] = useState(null);
  const [hoverStar, setHoverStar] = useState(0);
  const [returnStep, setReturnStep]     = useState(null); // null | "picking" | "done"
  const [returnItems, setReturnItems]   = useState([]);   // selected product indices
  const [returnReason, setReturnReason] = useState("");
  const [returnMsg, setReturnMsg]       = useState("");
  const [activeTab, setActiveTab]       = useState("all");

  const q = query.toLowerCase();
  const filtered = orders
    .filter(o => {
      if (activeTab === "rated")   return o.rating !== null;
      if (activeTab === "unrated") return o.rating === null;
      return true;
    })
    .filter(o =>
      o.id.toLowerCase().includes(q) ||
      o.products.some(p => p.name.toLowerCase().includes(q))
    );

  const setRating = (orderId, rating) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, rating } : o));
    setSelected(prev => prev ? { ...prev, rating } : prev);
  };

  const handleDownload = (order) => {
    const lines = [
      "==============================",
      "  CAREOFYOU — ORDER RECEIPT",
      "==============================",
      `Order ID   : ${order.id}`,
      `Order Date : ${order.date}`,
      `Delivered  : ${order.deliveredDate}`,
      "",
      "── PRODUCTS ──────────────────",
      ...order.products.map(p =>
        `${p.brand} ${p.name} (${p.size})  x${p.qty}  ${fmt(p.price * p.qty)}`
      ),
      "",
      `Delivery Fee : ${fmt(order.deliveryFee)}`,
      `TOTAL        : ${fmt(order.total)}`,
      "",
      "── PAYMENT ───────────────────",
      `Method  : ${order.payment.method}`,
      `Account : ${order.payment.account}`,
      `Holder  : a.n. ${order.payment.holder}`,
      "",
      "── DELIVERY ──────────────────",
      `Courier   : ${order.delivery.courier}`,
      `Tracking  : ${order.delivery.tracking}`,
      `Recipient : ${order.delivery.recipient}  ${order.delivery.phone}`,
      `Address   : ${order.delivery.address}`,
      "",
      "Thank you for shopping at Careofyou!",
    ];
    const blob = new Blob([lines.join("\n")], { type: "text/plain" });
    const url  = URL.createObjectURL(blob);
    const a    = document.createElement("a");
    a.href     = url;
    a.download = `bill-${order.id}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const orderTotal = (order) =>
    order.products.reduce((s, p) => s + p.price * p.qty, 0) + order.deliveryFee;

  const toggleReturnItem = (idx) =>
    setReturnItems(prev => prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]);

  const submitReturn = () => {
    const names = returnItems.map(i => selected.products[i].name).join(", ");
    setReturnMsg(`Return request submitted for: ${names}. Our team will contact you within 24 hours.`);
    setReturnStep("done");
    setReturnItems([]);
    setReturnReason("");
  };

  const openModal = (order) => {
    setSelected(order);
    setHoverStar(0);
    setReturnMsg("");
    setReturnStep(null);
    setReturnItems([]);
    setReturnReason("");
  };

  return (
    <div className="pr-order-section">

      {/* Header */}
      <div className="pr-order-header">
        <div>
          <h2 className="pr-section-title">Order History</h2>
          <p className="pr-section-sub">{orders.length} completed order{orders.length !== 1 ? "s" : ""}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="pr-rate-tabs">
        {[["all", "All"], ["unrated", "Not Rated"], ["rated", "Rated"]].map(([key, label]) => (
          <button
            key={key}
            className={`pr-rate-tab${activeTab === key ? " pr-rate-tab--active" : ""}`}
            onClick={() => setActiveTab(key)}
          >
            {label}
            <span className="pr-rate-tab-count">
              {key === "all"
                ? orders.length
                : orders.filter(o => key === "rated" ? o.rating !== null : o.rating === null).length}
            </span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="pr-search-wrap">
        <span className="pr-search-icon"><IconSearch /></span>
        <input
          className="pr-search-input"
          type="text"
          placeholder="Search by order ID or product…"
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
        {query && <button className="pr-search-clear" onClick={() => setQuery("")}>✕</button>}
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="pr-placeholder">
          <p className="pr-placeholder-title">No orders found</p>
          <p className="pr-placeholder-sub">Try a different keyword.</p>
        </div>
      ) : (
        <div className="pr-order-list">
          {filtered.map(order => {
            const total = orderTotal(order);
            const itemCount = order.products.reduce((s, p) => s + p.qty, 0);
            return (
              <div
                key={order.id}
                className="pr-order-card pr-order-card--clickable"
                onClick={() => openModal(order)}
              >
                {/* top: status */}
                <div className="pr-order-top">
                  <span className="pr-order-status" style={{ color: "#5aab6d", background: "#f0faf3" }}>
                    ✓ Completed
                  </span>
                </div>

                {/* thumbnail strip */}
                <div className="pr-order-thumbs">
                  {order.products.slice(0, 3).map((p, i) => (
                    <img key={i} src={p.image} alt={p.name} className="pr-order-thumb" />
                  ))}
                  {order.products.length > 3 && (
                    <span className="pr-order-thumb-more">+{order.products.length - 3}</span>
                  )}
                </div>

                {/* item summary */}
                <p className="pr-order-summary">
                  {order.products[0].name}
                  {order.products.length > 1 && (
                    <span className="pr-order-summary-more"> &amp; {order.products.length - 1} more item{order.products.length > 2 ? "s" : ""}</span>
                  )}
                </p>

                {/* bottom: id + date + rating + total */}
                <div className="pr-order-bottom">
                  <div className="pr-order-bottom-left">
                    <span className="pr-order-id">{order.id}</span>
                    <span className="pr-order-meta">· {itemCount} item{itemCount !== 1 ? "s" : ""} · Delivered {order.deliveredDate}</span>
                  </div>
                  <div className="pr-order-bottom-right">
                    {order.rating ? (
                      <span className="pr-order-rated">{"★".repeat(order.rating)}{"☆".repeat(5 - order.rating)}</span>
                    ) : (
                      <span className="pr-order-unrated">Tap to rate ›</span>
                    )}
                    <span className="pr-order-total">{fmt(total)}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Modal ── */}
      {selected && (
        <div className="pr-modal-overlay" onClick={() => setSelected(null)}>
          <div className="pr-modal" onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div className="pr-modal-header">
              <div>
                <p className="pr-modal-order-id">{selected.id} · {selected.date}</p>
                <h3 className="pr-modal-title">Order Details</h3>
              </div>
              <div className="pr-modal-header-right">
                <span className="pr-modal-status-badge">✓ Completed</span>
                <button className="pr-modal-close" onClick={() => setSelected(null)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            </div>

            <div className="pr-modal-body">

              {/* Products */}
              <div className="pr-modal-section">
                <p className="pr-modal-section-title">Ordered Products</p>
                <div className="pr-modal-products">
                  {selected.products.map((p, i) => (
                    <div key={i} className="pr-modal-product">
                      <img src={p.image} alt={p.name} className="pr-modal-product-img" />
                      <div className="pr-modal-product-info">
                        <span className="pr-modal-product-brand">{p.brand}</span>
                        <p className="pr-modal-product-name">{p.name}</p>
                        <p className="pr-modal-product-meta">{p.size} · Qty {p.qty}</p>
                      </div>
                      <span className="pr-modal-product-price">{fmt(p.price * p.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="pr-modal-cost-rows">
                  <div className="pr-modal-cost-row">
                    <span>Delivery fee</span><span>{fmt(selected.deliveryFee)}</span>
                  </div>
                  <div className="pr-modal-cost-row pr-modal-cost-row--total">
                    <span>Total</span><span>{fmt(orderTotal(selected))}</span>
                  </div>
                </div>
              </div>

              {/* Delivery */}
              <div className="pr-modal-section">
                <p className="pr-modal-section-title">Delivery Information</p>
                <div className="pr-modal-info-grid">
                  <div className="pr-modal-info-item">
                    <span className="pr-modal-info-label">Courier</span>
                    <span className="pr-modal-info-value">{selected.delivery.courier}</span>
                  </div>
                  <div className="pr-modal-info-item">
                    <span className="pr-modal-info-label">Tracking No.</span>
                    <span className="pr-modal-info-value pr-modal-info-track">{selected.delivery.tracking}</span>
                  </div>
                  <div className="pr-modal-info-item">
                    <span className="pr-modal-info-label">Delivered On</span>
                    <span className="pr-modal-info-value">{selected.deliveredDate}</span>
                  </div>
                  <div className="pr-modal-info-item">
                    <span className="pr-modal-info-label">Recipient</span>
                    <span className="pr-modal-info-value">{selected.delivery.recipient} · {selected.delivery.phone}</span>
                  </div>
                  <div className="pr-modal-info-item pr-modal-info-item--full">
                    <span className="pr-modal-info-label">Address</span>
                    <span className="pr-modal-info-value">{selected.delivery.address}</span>
                  </div>
                </div>
              </div>

              {/* Payment */}
              <div className="pr-modal-section">
                <p className="pr-modal-section-title">Payment Method</p>
                <div className="pr-modal-payment">
                  <div className="pr-modal-payment-badge">{selected.payment.method}</div>
                  <div>
                    <p className="pr-modal-payment-account">{selected.payment.account}</p>
                    <p className="pr-modal-payment-holder">a.n. {selected.payment.holder}</p>
                  </div>
                </div>
              </div>

              {/* Star rating */}
              <div className="pr-modal-section">
                <p className="pr-modal-section-title">Rate This Order</p>
                <div className="pr-stars">
                  {[1,2,3,4,5].map(n => (
                    <button
                      key={n}
                      className={`pr-star${(hoverStar || selected.rating || 0) >= n ? " pr-star--filled" : ""}`}
                      onMouseEnter={() => setHoverStar(n)}
                      onMouseLeave={() => setHoverStar(0)}
                      onClick={() => setRating(selected.id, n)}
                    >★</button>
                  ))}
                </div>
                {selected.rating && (
                  <p className="pr-rating-label">You rated {selected.rating}/5 — Thank you!</p>
                )}
              </div>

              {/* ── Return flow ── */}
              {returnStep === "picking" && (
                <div className="pr-modal-section pr-return-picker">
                  <p className="pr-modal-section-title">Select Items to Return</p>
                  {selected.products.map((p, i) => (
                    <label key={i} className={`pr-return-item-row${returnItems.includes(i) ? " pr-return-item-row--checked" : ""}`}>
                      <input
                        type="checkbox"
                        className="pr-return-checkbox"
                        checked={returnItems.includes(i)}
                        onChange={() => toggleReturnItem(i)}
                      />
                      <img src={p.image} alt={p.name} className="pr-return-item-img" />
                      <div className="pr-return-item-info">
                        <span className="pr-return-item-name">{p.name}</span>
                        <span className="pr-return-item-meta">{p.size} · Qty {p.qty}</span>
                      </div>
                    </label>
                  ))}
                  <select
                    className="pr-setting-select pr-return-reason-select"
                    value={returnReason}
                    onChange={e => setReturnReason(e.target.value)}
                  >
                    <option value="">Select a reason…</option>
                    <option value="damaged">Item arrived damaged</option>
                    <option value="wrong">Wrong item received</option>
                    <option value="not_as_described">Not as described</option>
                    <option value="changed_mind">Changed my mind</option>
                    <option value="other">Other</option>
                  </select>
                  <div className="pr-modal-actions">
                    <button className="pr-modal-btn pr-modal-btn--return" onClick={() => setReturnStep(null)}>Cancel</button>
                    <button
                      className="pr-modal-btn pr-modal-btn--download"
                      disabled={returnItems.length === 0 || !returnReason}
                      onClick={submitReturn}
                    >Submit Return</button>
                  </div>
                </div>
              )}

              {returnMsg && <div className="pr-return-toast">{returnMsg}</div>}

              {/* Actions */}
              {returnStep !== "picking" && (
              <div className="pr-modal-actions">
                <button
                  className="pr-modal-btn pr-modal-btn--return"
                  disabled={returnStep === "done"}
                  onClick={() => setReturnStep("picking")}
                >
                  Return Item
                </button>
                <button
                  className="pr-modal-btn pr-modal-btn--download"
                  onClick={() => handleDownload(selected)}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginRight:6,verticalAlign:"middle"}}>
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Download Bill
                </button>
              </div>
              )}

            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Settings Section ───────────────────────────────────── */
function SettingSection() {
  const navigate = useNavigate();

  // Password
  const [showPw, setShowPw]   = useState(false);
  const [pwForm, setPwForm]   = useState({ current: "", next: "", confirm: "" });
  const [pwError, setPwError] = useState("");
  const [pwSaved, setPwSaved] = useState(false);

  // Toggles
  const [twoFA, setTwoFA] = useState(false);
  const [notifs, setNotifs] = useState({
    orderUpdates: true,
    promotions:   true,
    newArrivals:  false,
  });

  // Language
  const [language, setLanguage] = useState("en");

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (!pwForm.current || !pwForm.next || !pwForm.confirm) {
      setPwError("Please fill in all fields."); return;
    }
    if (pwForm.next.length < 8) {
      setPwError("New password must be at least 8 characters."); return;
    }
    if (pwForm.next !== pwForm.confirm) {
      setPwError("New passwords do not match."); return;
    }
    setPwError("");
    setPwSaved(true);
    setPwForm({ current: "", next: "", confirm: "" });
    setShowPw(false);
    setTimeout(() => setPwSaved(false), 3500);
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      className={`pr-toggle${checked ? " pr-toggle--on" : ""}`}
      onClick={() => onChange(!checked)}
    >
      <span className="pr-toggle-knob" />
    </button>
  );

  return (
    <div className="pr-setting-section">

      <div className="pr-setting-header">
        <h2 className="pr-section-title">Settings</h2>
        <p className="pr-section-sub">Manage your account preferences</p>
      </div>

      {pwSaved && (
        <div className="pr-setting-toast">✓ Password updated successfully.</div>
      )}

      {/* ── Account & Security ── */}
      <div className="pr-setting-group">
        <p className="pr-setting-group-label">Account &amp; Security</p>

        <div className="pr-setting-row">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Password</span>
            <span className="pr-setting-row-sub">Last changed 3 months ago</span>
          </div>
          <button
            className="pr-setting-action-btn"
            onClick={() => { setShowPw(v => !v); setPwError(""); }}
          >
            {showPw ? "Cancel" : "Change"}
          </button>
        </div>

        {showPw && (
          <form className="pr-setting-subform" onSubmit={handlePasswordSubmit}>
            <div className="pr-form-group">
              <label className="pr-form-label">Current Password</label>
              <input className="pr-input" type="password" placeholder="••••••••"
                value={pwForm.current} onChange={e => setPwForm({ ...pwForm, current: e.target.value })} />
            </div>
            <div className="pr-form-row">
              <div className="pr-form-group">
                <label className="pr-form-label">New Password</label>
                <input className="pr-input" type="password" placeholder="Min. 8 characters"
                  value={pwForm.next} onChange={e => setPwForm({ ...pwForm, next: e.target.value })} />
              </div>
              <div className="pr-form-group">
                <label className="pr-form-label">Confirm Password</label>
                <input className="pr-input" type="password" placeholder="Repeat new password"
                  value={pwForm.confirm} onChange={e => setPwForm({ ...pwForm, confirm: e.target.value })} />
              </div>
            </div>
            {pwError && <p className="pr-addr-error">{pwError}</p>}
            <button type="submit" className="pr-save-btn" style={{ padding: "11px 32px", marginTop: 2 }}>
              Update Password
            </button>
          </form>
        )}

        <div className="pr-setting-row">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Two-Factor Authentication</span>
            <span className="pr-setting-row-sub">
              {twoFA ? "Enabled — extra layer of protection active" : "Add an extra layer of login protection"}
            </span>
          </div>
          <Toggle checked={twoFA} onChange={setTwoFA} />
        </div>

        <div className="pr-setting-row">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Linked Account</span>
            <span className="pr-setting-row-sub">sara.tancredi@gmail.com</span>
          </div>
          <span className="pr-setting-chip pr-setting-chip--green">Verified</span>
        </div>
      </div>

      {/* ── Notifications ── */}
      <div className="pr-setting-group">
        <p className="pr-setting-group-label">Notifications</p>
        {[
          { key: "orderUpdates", title: "Order Updates",     sub: "Shipping, delivery & status changes" },
          { key: "promotions",   title: "Promotions & Deals", sub: "Discounts, vouchers & special offers" },
          { key: "newArrivals",  title: "New Arrivals",       sub: "Be first to know about new products" },
        ].map(item => (
          <div key={item.key} className="pr-setting-row">
            <div className="pr-setting-row-info">
              <span className="pr-setting-row-title">{item.title}</span>
              <span className="pr-setting-row-sub">{item.sub}</span>
            </div>
            <Toggle checked={notifs[item.key]} onChange={v => setNotifs({ ...notifs, [item.key]: v })} />
          </div>
        ))}
      </div>

      {/* ── Language & Region ── */}
      <div className="pr-setting-group">
        <p className="pr-setting-group-label">Language &amp; Region</p>
        <div className="pr-setting-row">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Language</span>
            <span className="pr-setting-row-sub">Choose your preferred display language</span>
          </div>
          <select
            className="pr-setting-select"
            value={language}
            onChange={e => setLanguage(e.target.value)}
          >
            <option value="en">English</option>
            <option value="id">Bahasa Indonesia</option>
          </select>
        </div>
        <div className="pr-setting-row">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Currency</span>
            <span className="pr-setting-row-sub">Used for all price displays</span>
          </div>
          <span className="pr-setting-chip">IDR — Rp</span>
        </div>
        <div className="pr-setting-row">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Time Zone</span>
            <span className="pr-setting-row-sub">All times shown in your local zone</span>
          </div>
          <span className="pr-setting-chip">WITA (UTC+8)</span>
        </div>
      </div>

      {/* ── Danger Zone ── */}
      <div className="pr-setting-group pr-setting-group--danger">
        <p className="pr-setting-group-label pr-setting-group-label--danger">Danger Zone</p>
        <div className="pr-setting-row pr-setting-row--last">
          <div className="pr-setting-row-info">
            <span className="pr-setting-row-title">Delete Account</span>
            <span className="pr-setting-row-sub">Permanently remove your account and all data. This cannot be undone.</span>
          </div>
          <button className="pr-setting-danger-btn" onClick={() => navigate("/")}>Delete</button>
        </div>
      </div>

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
      case "adminapproval": return <OrderSection sectionKey="adminapproval" title="Admin Approval" />;
      case "packing":       return <OrderSection sectionKey="packing" title="Being Packed" />;
      case "shipped":       return <OrderSection sectionKey="shipped" title="Shipped" />;
      case "rateorder":     return <RateOrderSection />;
      case "setting":       return <SettingSection />;
      case "notifications": return <NotificationsSection />;
      default:              return null;
    }
  };

  return (
    <div className="pr-page">

      {/* ── NAVBAR ── */}
      <Navbar
        activePage="myprofile"
        allProducts={PRODUCTS}
        onHomeClick={() => navigate("/")}
        onProductsClick={() => navigate("/products")}
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

          <Footer />
        </main>
      </div>

    </div>
  );
}
