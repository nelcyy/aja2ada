import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import "./index.css";

/* ═══════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════ */
const MOCK_ORDERS = [
  { id: "ORD-011", customer: "Sara Tancredi",    email: "sara@gmail.com",   products: ["Vitamin C Serum", "Sunscreen Aqua Gel"],            total: 294000, date: "15 Apr 2025", status: "pending",    payment: "BCA Transfer",   address: "Jl. Sudirman No. 12, Jakarta" },
  { id: "ORD-012", customer: "Maya Sari",        email: "maya@gmail.com",   products: ["Daily Moisturizer SPF 30", "Hydra Boost Toner"],    total: 260000, date: "15 Apr 2025", status: "pending",    payment: "GoPay",          address: "Jl. Gatot Subroto No. 5, Jakarta" },
  { id: "ORD-013", customer: "Hana Lestari",     email: "hana@gmail.com",   products: ["5X Ceramide Barrier Moisture Gel"],                 total: 149000, date: "14 Apr 2025", status: "pending",    payment: "BNI Transfer",   address: "Perumahan Indah Blok C No. 3, Surabaya" },
  { id: "ORD-014", customer: "Rina Kusuma",      email: "rina@gmail.com",   products: ["Retinol Night Cream"],                              total: 210000, date: "15 Apr 2025", status: "packing",    payment: "OVO",            address: "Jl. Malioboro No. 88, Yogyakarta" },
  { id: "ORD-015", customer: "Tiara Putri",      email: "tiara@gmail.com",  products: ["Gentle Foaming Cleanser", "Rose Water Mist"],       total: 174000, date: "14 Apr 2025", status: "packing",    payment: "BCA Transfer",   address: "Jl. Pemuda No. 21, Semarang" },
  { id: "ORD-016", customer: "Ayu Rahayu",       email: "ayu@gmail.com",    products: ["Niacinamide 10% + Zinc Serum", "Pore Tightening Toner"], total: 318000, date: "13 Apr 2025", status: "packing", payment: "DANA",        address: "Jl. A. Yani No. 44, Bandung" },
  { id: "ORD-017", customer: "Dewi Larasati",    email: "dewi@gmail.com",   products: ["Hyaluronic Acid Serum", "Ceramide Barrier Cream"],  total: 335000, date: "14 Apr 2025", status: "shipped",    payment: "BNI Transfer",   address: "Jl. Diponegoro No. 7, Medan" },
  { id: "ORD-018", customer: "Fitri Handayani",  email: "fitri@gmail.com",  products: ["SPF 50 UV Defense Serum", "Peptide Eye Cream"],     total: 410000, date: "13 Apr 2025", status: "shipped",    payment: "GoPay",          address: "Komplek Griya Permai No. 15, Makassar" },
  { id: "ORD-019", customer: "Sari Dewi",        email: "saridewi@gmail.com", products: ["AHA BHA Exfoliating Toner"],                     total: 135000, date: "12 Apr 2025", status: "shipped",    payment: "BCA Transfer",   address: "Jl. Raya Bogor KM 30, Depok" },
  { id: "ORD-001", customer: "Bunga Citra",      email: "bunga@gmail.com",  products: ["Brightening Facial Mask"],                          total: 45000,  date: "14 Apr 2025", status: "delivered",  payment: "OVO",            address: "Jl. Kartini No. 9, Surabaya" },
  { id: "ORD-002", customer: "Nadia Rahman",     email: "nadia@gmail.com",  products: ["AHA BHA Exfoliating Toner"],                        total: 135000, date: "12 Apr 2025", status: "delivered",  payment: "BCA Transfer",   address: "Jl. Imam Bonjol No. 3, Semarang" },
  { id: "ORD-003", customer: "Lilis Permata",    email: "lilis@gmail.com",  products: ["Niacinamide Essence"],                              total: 130000, date: "11 Apr 2025", status: "delivered",  payment: "DANA",           address: "Jl. Veteran No. 11, Bandung" },
  { id: "ORD-004", customer: "Sinta Wulandari",  email: "sinta@gmail.com",  products: ["Collagen Sleeping Pack", "Tea Tree Spot Gel"],      total: 233000, date: "11 Apr 2025", status: "delivered",  payment: "GoPay",          address: "Jl. Pahlawan No. 6, Malang" },
];

const MOCK_NOTIFICATIONS = [
  { id: 1,  type: "order",    title: "New order received",            body: "ORD-011 from Sara Tancredi — Rp 294,000 via BCA Transfer",       time: "2 min ago",  read: false },
  { id: 2,  type: "order",    title: "New order received",            body: "ORD-012 from Maya Sari — Rp 260,000 via GoPay",                   time: "8 min ago",  read: false },
  { id: 3,  type: "order",    title: "New order received",            body: "ORD-013 from Hana Lestari — Rp 149,000 via BNI Transfer",         time: "15 min ago", read: false },
  { id: 4,  type: "payment",  title: "Payment confirmed",             body: "ORD-014 — Rina Kusuma's OVO payment has been verified",           time: "32 min ago", read: false },
  { id: 5,  type: "payment",  title: "Payment confirmed",             body: "ORD-015 — Tiara Putri's BCA transfer verified (Rp 174,000)",      time: "1 hr ago",   read: false },
  { id: 6,  type: "shipped",  title: "Order marked as shipped",       body: "ORD-017 — JNE tracking JNE20250414001 sent to Dewi Larasati",     time: "2 hr ago",   read: true  },
  { id: 7,  type: "shipped",  title: "Order marked as shipped",       body: "ORD-018 — SiCepat HALU tracking dispatched to Fitri Handayani",  time: "3 hr ago",   read: true  },
  { id: 8,  type: "return",   title: "Return request submitted",      body: "ORD-007 — Sara Tancredi requested a return: Item arrived damaged", time: "5 hr ago",   read: true  },
  { id: 9,  type: "review",   title: "New product review",            body: "5★ review on 5X Ceramide Barrier Moisture Gel by Rina Kusuma",   time: "Yesterday",  read: true  },
  { id: 10, type: "review",   title: "New product review",            body: "4★ review on Retinol Night Cream by Tiara Putri",                 time: "Yesterday",  read: true  },
  { id: 11, type: "shipped",  title: "Delivery confirmed",            body: "ORD-001 — Bunga Citra confirmed receipt of her order",            time: "2 days ago", read: true  },
  { id: 12, type: "order",    title: "Order cancelled",               body: "ORD-020 — Wulandari Putri cancelled before payment (BCA)",       time: "2 days ago", read: true  },
];

const MOCK_CUSTOMERS = [
  { id: 1, name: "Sara Tancredi",   email: "sara@gmail.com",  orders: 3, spent: 629000,  joined: "Jan 2025", status: "active" },
  { id: 2, name: "Rina Kusuma",     email: "rina@gmail.com",  orders: 1, spent: 210000,  joined: "Feb 2025", status: "active" },
  { id: 3, name: "Dewi Larasati",   email: "dewi@gmail.com",  orders: 2, spent: 670000,  joined: "Mar 2025", status: "active" },
  { id: 4, name: "Bunga Citra",     email: "bunga@gmail.com", orders: 5, spent: 890000,  joined: "Nov 2024", status: "active" },
  { id: 5, name: "Maya Sari",       email: "maya@gmail.com",  orders: 1, spent: 260000,  joined: "Apr 2025", status: "new"    },
  { id: 6, name: "Tiara Putri",     email: "tiara@gmail.com", orders: 2, spent: 348000,  joined: "Mar 2025", status: "active" },
  { id: 7, name: "Nadia Rahman",    email: "nadia@gmail.com", orders: 4, spent: 540000,  joined: "Dec 2024", status: "active" },
  { id: 8, name: "Fitri Handayani", email: "fitri@gmail.com", orders: 1, spent: 410000,  joined: "Apr 2025", status: "new"    },
];

const MOCK_MESSAGES = [
  { id: 1, name: "Anisa Putri",   email: "anisa@gmail.com",  phone: "081234567890", message: "Halo kak, apakah Vitamin C Serum cocok untuk kulit sensitif? Kulit aku cenderung merah-merah kalau pakai produk baru.", date: "15 Apr 2025", read: false },
  { id: 2, name: "Budi Santoso",  email: "budi@gmail.com",   phone: "082345678901", message: "Saya mau tanya soal pengiriman ke luar kota Manado. Apakah bisa dikirim ke Kotamobagu?",                                  date: "14 Apr 2025", read: false },
  { id: 3, name: "Clara Indah",   email: "clara@gmail.com",  phone: null,           message: "Kak ada promo untuk pembelian pertama? Saya mau order beberapa produk sekaligus.",                                         date: "13 Apr 2025", read: true  },
  { id: 4, name: "Diana Sari",    email: "diana@gmail.com",  phone: "084567890123", message: "Produknya bagus banget kak! Kulit aku jadi lebih cerah setelah pakai Vitamin C Serum 2 minggu. Terima kasih ya!",          date: "12 Apr 2025", read: true  },
  { id: 5, name: "Eka Wulandari", email: "eka@gmail.com",    phone: "085678901234", message: "Mau tanya, untuk kulit berminyak dan berjerawat produk yang cocok apa ya kak?",                                            date: "11 Apr 2025", read: true  },
];

const WEEKLY_REVENUE = [
  { day: "Sen", val: 420000 },
  { day: "Sel", val: 860000 },
  { day: "Rab", val: 340000 },
  { day: "Kam", val: 1200000 },
  { day: "Jum", val: 780000 },
  { day: "Sab", val: 1540000 },
  { day: "Min", val: 960000 },
];

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

const STATUS_META = {
  pending:   { label: "Awaiting Approval", color: "#e09a3a", bg: "rgba(224,154,58,0.1)"  },
  packing:   { label: "Being Packed",      color: "#4a9fd4", bg: "rgba(74,159,212,0.1)"  },
  shipped:   { label: "Shipped",           color: "#8b5cf6", bg: "rgba(139,92,246,0.1)"  },
  delivered: { label: "Delivered",         color: "#22c55e", bg: "rgba(34,197,94,0.1)"   },
  cancelled: { label: "Cancelled",         color: "#ef4444", bg: "rgba(239,68,68,0.1)"   },
};

/* ═══════════════════════════════════════════════════════════
   SVG ICONS
   ═══════════════════════════════════════════════════════════ */
const IcGrid       = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
const IcOrders     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2"/><rect x="9" y="3" width="6" height="4" rx="1"/><path d="M9 12h6M9 16h4"/></svg>;
const IcProducts   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IcCustomers  = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
const IcMessages   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>;
const IcSettings   = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09a1.65 1.65 0 001.51-1 1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>;
const IcLogOut     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>;
const IcSearch     = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcBell       = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
const IcArrowUp    = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"/></svg>;
const IcEdit       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>;
const IcTrash      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>;
const IcCheck      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>;
const IcTruck      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="3" width="15" height="13" rx="1"/><path d="M16 8h4l3 5v3h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></svg>;
const IcRevenue    = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>;
const IcPlus       = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>;
const IcMail       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>;
const IcPhone      = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.8a19.79 19.79 0 01-3.07-8.67A2 2 0 012 1h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.91 8.09a16 16 0 006 6l1.46-1.46a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/></svg>;
const IcStore      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcStar       = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcPackage    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IcNotif      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;

/* ═══════════════════════════════════════════════════════════
   HELPER: Avatar initials
   ═══════════════════════════════════════════════════════════ */
function Avatar({ name, size = 32 }) {
  const parts = name.trim().split(" ");
  const initials = (parts[0]?.[0] ?? "") + (parts[1]?.[0] ?? "");
  const colors = ["#e07a73","#8b5cf6","#4a9fd4","#22c55e","#f59e0b","#ec4899"];
  const idx = name.charCodeAt(0) % colors.length;
  return (
    <div className="adm-avatar" style={{ width: size, height: size, background: colors[idx], fontSize: size * 0.36 }}>
      {initials.toUpperCase()}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: DASHBOARD
   ═══════════════════════════════════════════════════════════ */
function Dashboard({ setActive }) {
  const totalRevenue = MOCK_ORDERS.reduce((s, o) => s + o.total, 0);
  const totalOrders  = MOCK_ORDERS.length;
  const totalCustomers = MOCK_CUSTOMERS.length;
  const maxVal = Math.max(...WEEKLY_REVENUE.map(d => d.val));

  const stats = [
    { label: "Total Revenue",   value: fmt(totalRevenue), sub: "+18% bulan ini",  icon: <IcRevenue />,   color: "rose"   },
    { label: "Total Orders",    value: totalOrders,        sub: "+4 hari ini",     icon: <IcOrders />,    color: "violet" },
    { label: "Total Products",  value: PRODUCTS.length,    sub: "20 aktif",        icon: <IcProducts />,  color: "blue"   },
    { label: "Total Customers", value: totalCustomers,     sub: "+2 minggu ini",   icon: <IcCustomers />, color: "green"  },
  ];

  const recentOrders = MOCK_ORDERS.slice(0, 5);
  const topProducts  = [...PRODUCTS].sort((a, b) => b.reviews - a.reviews).slice(0, 4);
  const pendingCount = MOCK_ORDERS.filter(o => o.status === "pending").length;

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Dashboard</h2>
          <p className="adm-section-sub">Selamat datang kembali, Admin! Ini ringkasan hari ini.</p>
        </div>
        <div className="adm-date-badge">15 Apr 2025</div>
      </div>

      {/* Stat cards */}
      <div className="adm-stat-grid">
        {stats.map((s, i) => (
          <div key={i} className={`adm-stat-card adm-stat-card--${s.color}`}>
            <div className="adm-stat-top">
              <div className={`adm-stat-icon adm-stat-icon--${s.color}`}>{s.icon}</div>
              <span className="adm-stat-trend"><IcArrowUp /> {s.sub}</span>
            </div>
            <div className="adm-stat-val">{s.value}</div>
            <div className="adm-stat-label">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="adm-dash-grid">
        {/* Weekly revenue chart */}
        <div className="adm-card adm-chart-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Revenue Mingguan</h3>
            <span className="adm-card-tag">Apr 2025</span>
          </div>
          <div className="adm-chart">
            {WEEKLY_REVENUE.map((d, i) => (
              <div key={i} className="adm-bar-col">
                <div className="adm-bar-val">{(d.val / 1000).toFixed(0)}K</div>
                <div className="adm-bar-wrap">
                  <div className="adm-bar" style={{ height: `${(d.val / maxVal) * 100}%` }} />
                </div>
                <div className="adm-bar-label">{d.day}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending alert */}
        <div className="adm-card adm-pending-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Perlu Perhatian</h3>
          </div>
          <div className="adm-pending-list">
            <div className="adm-alert-item adm-alert-item--warn">
              <span className="adm-alert-dot" />
              <div>
                <p className="adm-alert-title">{pendingCount} Orders Awaiting Approval</p>
                <p className="adm-alert-sub">Payment confirmation pending</p>
              </div>
              <button className="adm-alert-btn" onClick={() => setActive("orders")}>View</button>
            </div>
            <div className="adm-alert-item adm-alert-item--blue">
              <span className="adm-alert-dot adm-alert-dot--blue" />
              <div>
                <p className="adm-alert-title">{MOCK_MESSAGES.filter(m => !m.read).length} Pesan Baru</p>
                <p className="adm-alert-sub">Dari halaman contact</p>
              </div>
              <button className="adm-alert-btn" onClick={() => setActive("messages")}>Lihat</button>
            </div>
            <div className="adm-alert-item adm-alert-item--green">
              <span className="adm-alert-dot adm-alert-dot--green" />
              <div>
                <p className="adm-alert-title">Stok Produk Normal</p>
                <p className="adm-alert-sub">Semua {PRODUCTS.length} produk tersedia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="adm-dash-row2">
        {/* Recent orders */}
        <div className="adm-card adm-recent-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Pesanan Terbaru</h3>
            <button className="adm-link-btn" onClick={() => setActive("orders")}>Lihat semua →</button>
          </div>
          <table className="adm-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(o => {
                const st = STATUS_META[o.status];
                return (
                  <tr key={o.id}>
                    <td><span className="adm-order-id">{o.id}</span></td>
                    <td>
                      <div className="adm-customer-cell">
                        <Avatar name={o.customer} size={28} />
                        <span>{o.customer}</span>
                      </div>
                    </td>
                    <td><strong>{fmt(o.total)}</strong></td>
                    <td>
                      <span className="adm-status-pill" style={{ color: st.color, background: st.bg }}>
                        {st.label}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Top products */}
        <div className="adm-card adm-top-products-card">
          <div className="adm-card-header">
            <h3 className="adm-card-title">Produk Terlaris</h3>
            <button className="adm-link-btn" onClick={() => setActive("products")}>Lihat semua →</button>
          </div>
          <div className="adm-top-products">
            {topProducts.map((p, i) => (
              <div key={p.id} className="adm-top-product-item">
                <span className="adm-rank">#{i + 1}</span>
                <img src={p.image} alt={p.name} className="adm-top-product-img" />
                <div className="adm-top-product-info">
                  <p className="adm-top-product-name">{p.name}</p>
                  <p className="adm-top-product-cat">{p.category}</p>
                </div>
                <div className="adm-top-product-right">
                  <span className="adm-top-product-rating"><IcStar /> {p.rating}</span>
                  <span className="adm-top-product-reviews">{p.reviews} reviews</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: ORDERS
   ═══════════════════════════════════════════════════════════ */
function Orders() {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [tab, setTab]       = useState("all");
  const [query, setQuery]   = useState("");

  const tabs = ["all", "pending", "packing", "shipped", "delivered"];

  const filtered = orders.filter(o => {
    const matchTab = tab === "all" || o.status === tab;
    const q = query.toLowerCase();
    const matchQ = !q || o.id.toLowerCase().includes(q) || o.customer.toLowerCase().includes(q) || o.products.some(p => p.toLowerCase().includes(q));
    return matchTab && matchQ;
  });

  const advance = (id) => {
    const flow = { pending: "packing", packing: "shipped", shipped: "delivered" };
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: flow[o.status] ?? o.status } : o));
  };

  const cancel = (id) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: "cancelled" } : o));
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Manajemen Pesanan</h2>
          <p className="adm-section-sub">{orders.length} total pesanan</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        {tabs.map(t => (
          <button key={t} className={`adm-tab${tab === t ? " adm-tab--active" : ""}`} onClick={() => setTab(t)}>
            {t === "all" ? "Semua" : STATUS_META[t]?.label}
            <span className="adm-tab-count">{t === "all" ? orders.length : orders.filter(o => o.status === t).length}</span>
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="adm-search-bar">
        <IcSearch />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari order ID, customer, produk…" className="adm-search-input" />
        {query && <button className="adm-search-clear" onClick={() => setQuery("")}>✕</button>}
      </div>

      {/* Table */}
      <div className="adm-card adm-table-card">
        <table className="adm-table adm-table--orders">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Produk</th>
              <th>Total</th>
              <th>Tanggal</th>
              <th>Status</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={7} className="adm-empty-row">Tidak ada pesanan ditemukan.</td></tr>
            ) : filtered.map(o => {
              const st = STATUS_META[o.status];
              const canAdvance = ["pending","packing","shipped"].includes(o.status);
              return (
                <tr key={o.id}>
                  <td><span className="adm-order-id">{o.id}</span></td>
                  <td>
                    <div className="adm-customer-cell">
                      <Avatar name={o.customer} size={30} />
                      <div>
                        <p className="adm-customer-name">{o.customer}</p>
                        <p className="adm-customer-email">{o.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="adm-products-cell">
                      {o.products.map((p, i) => <span key={i} className="adm-product-tag">{p}</span>)}
                    </div>
                  </td>
                  <td><strong>{fmt(o.total)}</strong></td>
                  <td className="adm-date-cell">{o.date}</td>
                  <td>
                    <span className="adm-status-pill" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                  </td>
                  <td>
                    <div className="adm-action-btns">
                      {canAdvance && (
                        <button className="adm-act-btn adm-act-btn--primary" title="Next step" onClick={() => advance(o.id)}>
                          {o.status === "pending" ? <IcCheck /> : o.status === "packing" ? <IcTruck /> : <IcCheck />}
                          {o.status === "pending" ? "Approve" : o.status === "packing" ? "Ship" : "Delivered"}
                        </button>
                      )}
                      {o.status !== "delivered" && o.status !== "cancelled" && (
                        <button className="adm-act-btn adm-act-btn--danger" title="Cancel" onClick={() => cancel(o.id)}>✕</button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: PRODUCTS
   ═══════════════════════════════════════════════════════════ */
function Products() {
  const [products, setProducts] = useState(PRODUCTS);
  const [query, setQuery]       = useState("");
  const [catFilter, setCat]     = useState("all");
  const [showAdd, setShowAdd]   = useState(false);
  const [newProd, setNewProd]   = useState({ name: "", category: "", price: "", image: "" });

  const cats = ["all", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = products.filter(p => {
    const matchCat = catFilter === "all" || p.category === catFilter;
    const q = query.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const remove = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.category || !newProd.price) return;
    setProducts(prev => [...prev, {
      id: Date.now(),
      name: newProd.name,
      category: newProd.category,
      price: Number(newProd.price),
      image: newProd.image || `https://placehold.co/300x300/f9f0ef/c87a74?text=${encodeURIComponent(newProd.name)}`,
      rating: 0,
      reviews: 0,
    }]);
    setNewProd({ name: "", category: "", price: "", image: "" });
    setShowAdd(false);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Manajemen Produk</h2>
          <p className="adm-section-sub">{products.length} produk terdaftar</p>
        </div>
        <button className="adm-primary-btn" onClick={() => setShowAdd(v => !v)}>
          <IcPlus /> Tambah Produk
        </button>
      </div>

      {/* Add Product Form */}
      {showAdd && (
        <div className="adm-card adm-add-form-card">
          <h3 className="adm-card-title" style={{ marginBottom: 20 }}>Produk Baru</h3>
          <form className="adm-add-form" onSubmit={handleAdd}>
            <div className="adm-form-row">
              <div className="adm-form-group">
                <label>Nama Produk *</label>
                <input placeholder="e.g. Vitamin C Serum" value={newProd.name} onChange={e => setNewProd(p => ({ ...p, name: e.target.value }))} className="adm-input" />
              </div>
              <div className="adm-form-group">
                <label>Kategori *</label>
                <input placeholder="e.g. Serum" value={newProd.category} onChange={e => setNewProd(p => ({ ...p, category: e.target.value }))} className="adm-input" />
              </div>
            </div>
            <div className="adm-form-row">
              <div className="adm-form-group">
                <label>Harga (Rp) *</label>
                <input type="number" placeholder="e.g. 150000" value={newProd.price} onChange={e => setNewProd(p => ({ ...p, price: e.target.value }))} className="adm-input" />
              </div>
              <div className="adm-form-group">
                <label>URL Gambar</label>
                <input placeholder="https://..." value={newProd.image} onChange={e => setNewProd(p => ({ ...p, image: e.target.value }))} className="adm-input" />
              </div>
            </div>
            <div className="adm-form-actions">
              <button type="submit" className="adm-primary-btn">Simpan Produk</button>
              <button type="button" className="adm-ghost-btn" onClick={() => setShowAdd(false)}>Batal</button>
            </div>
          </form>
        </div>
      )}

      {/* Filters */}
      <div className="adm-filter-row">
        <div className="adm-search-bar">
          <IcSearch />
          <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari produk…" className="adm-search-input" />
          {query && <button className="adm-search-clear" onClick={() => setQuery("")}>✕</button>}
        </div>
        <div className="adm-cat-pills">
          {cats.map(c => (
            <button key={c} className={`adm-cat-pill${catFilter === c ? " adm-cat-pill--active" : ""}`} onClick={() => setCat(c)}>
              {c === "all" ? "Semua" : c}
            </button>
          ))}
        </div>
      </div>

      {/* Product table */}
      <div className="adm-card adm-table-card">
        <table className="adm-table adm-table--products">
          <thead>
            <tr>
              <th>Produk</th>
              <th>Kategori</th>
              <th>Harga</th>
              <th>Rating</th>
              <th>Reviews</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map(p => (
              <tr key={p.id}>
                <td>
                  <div className="adm-product-cell">
                    <img src={p.image} alt={p.name} className="adm-product-thumb" />
                    <span className="adm-product-name">{p.name}</span>
                  </div>
                </td>
                <td><span className="adm-cat-badge">{p.category}</span></td>
                <td><strong>{fmt(p.price)}</strong></td>
                <td>
                  <span className="adm-rating-cell"><IcStar /> {p.rating}</span>
                </td>
                <td className="adm-date-cell">{p.reviews}</td>
                <td>
                  <div className="adm-action-btns">
                    <button className="adm-act-btn adm-act-btn--edit" title="Edit"><IcEdit /></button>
                    <button className="adm-act-btn adm-act-btn--danger" title="Hapus" onClick={() => remove(p.id)}><IcTrash /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: CUSTOMERS
   ═══════════════════════════════════════════════════════════ */
function Customers() {
  const [query, setQuery] = useState("");
  const filtered = MOCK_CUSTOMERS.filter(c => {
    const q = query.toLowerCase();
    return !q || c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q);
  });

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Data Pelanggan</h2>
          <p className="adm-section-sub">{MOCK_CUSTOMERS.length} pelanggan terdaftar</p>
        </div>
      </div>

      <div className="adm-search-bar" style={{ marginBottom: 20 }}>
        <IcSearch />
        <input value={query} onChange={e => setQuery(e.target.value)} placeholder="Cari nama atau email…" className="adm-search-input" />
        {query && <button className="adm-search-clear" onClick={() => setQuery("")}>✕</button>}
      </div>

      <div className="adm-customer-grid">
        {filtered.map(c => (
          <div key={c.id} className="adm-customer-card">
            <div className="adm-customer-card-top">
              <Avatar name={c.name} size={44} />
              <span className={`adm-status-pill adm-status-pill--${c.status}`} style={c.status === "new" ? { color: "#8b5cf6", background: "rgba(139,92,246,0.1)" } : { color: "#22c55e", background: "rgba(34,197,94,0.1)" }}>
                {c.status === "new" ? "Baru" : "Aktif"}
              </span>
            </div>
            <div className="adm-customer-card-info">
              <h4 className="adm-customer-card-name">{c.name}</h4>
              <p className="adm-customer-card-email"><IcMail /> {c.email}</p>
            </div>
            <div className="adm-customer-card-stats">
              <div className="adm-cust-stat">
                <span className="adm-cust-stat-val">{c.orders}</span>
                <span className="adm-cust-stat-label">Pesanan</span>
              </div>
              <div className="adm-cust-stat-divider" />
              <div className="adm-cust-stat">
                <span className="adm-cust-stat-val" style={{ fontSize: 12 }}>{fmt(c.spent)}</span>
                <span className="adm-cust-stat-label">Total Belanja</span>
              </div>
              <div className="adm-cust-stat-divider" />
              <div className="adm-cust-stat">
                <span className="adm-cust-stat-val" style={{ fontSize: 11 }}>{c.joined}</span>
                <span className="adm-cust-stat-label">Bergabung</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: MESSAGES
   ═══════════════════════════════════════════════════════════ */
function Messages() {
  const [msgs, setMsgs] = useState(MOCK_MESSAGES);
  const [active, setActive] = useState(msgs[0]);

  const markRead = (id) => setMsgs(prev => prev.map(m => m.id === id ? { ...m, read: true } : m));
  const unread = msgs.filter(m => !m.read).length;

  const open = (m) => {
    setActive(m);
    markRead(m.id);
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Pesan Masuk</h2>
          <p className="adm-section-sub">{unread} pesan belum dibaca · {msgs.length} total</p>
        </div>
      </div>

      <div className="adm-messages-layout">
        {/* List */}
        <div className="adm-msg-list">
          {msgs.map(m => (
            <div
              key={m.id}
              className={`adm-msg-item${active?.id === m.id ? " adm-msg-item--active" : ""}${!m.read ? " adm-msg-item--unread" : ""}`}
              onClick={() => open(m)}
            >
              <Avatar name={m.name} size={36} />
              <div className="adm-msg-item-body">
                <div className="adm-msg-item-top">
                  <span className="adm-msg-sender">{m.name}</span>
                  <span className="adm-msg-date">{m.date}</span>
                </div>
                <p className="adm-msg-preview">{m.message.slice(0, 55)}…</p>
              </div>
              {!m.read && <span className="adm-msg-dot" />}
            </div>
          ))}
        </div>

        {/* Detail */}
        {active ? (
          <div className="adm-card adm-msg-detail">
            <div className="adm-msg-detail-header">
              <Avatar name={active.name} size={44} />
              <div>
                <h3 className="adm-msg-detail-name">{active.name}</h3>
                <div className="adm-msg-detail-meta">
                  <span><IcMail /> {active.email}</span>
                  {active.phone && <span><IcPhone /> {active.phone}</span>}
                </div>
              </div>
              <span className="adm-msg-detail-date">{active.date}</span>
            </div>
            <div className="adm-msg-detail-body">
              <p>{active.message}</p>
            </div>
            <div className="adm-msg-detail-actions">
              <a href={`https://wa.me/${active.phone?.replace(/\D/g, "")}`} target="_blank" rel="noreferrer" className="adm-primary-btn" style={{ textDecoration: "none" }}>
                Balas via WhatsApp
              </a>
              <a href={`mailto:${active.email}`} className="adm-ghost-btn" style={{ textDecoration: "none" }}>
                Balas via Email
              </a>
            </div>
          </div>
        ) : (
          <div className="adm-card adm-msg-empty">
            <p>Pilih pesan untuk melihat detail.</p>
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: SETTINGS
   ═══════════════════════════════════════════════════════════ */
function Settings() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    storeName: "Careofyou",
    storeEmail: "hello@careofyou.id",
    storePhone: "+62 812-3456-7890",
    storeAddress: "Manado, Sulawesi Utara",
    storeIG: "@careofyou.id",
    storeShopee: "careofyou.id",
    payBCA: "1234-5678-90",
    payBNI: "0987-6543-21",
    payDANA: "0812-3456-7890",
  });

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSave = e => { e.preventDefault(); setSaved(true); setTimeout(() => setSaved(false), 2500); };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Pengaturan Toko</h2>
          <p className="adm-section-sub">Kelola informasi dan konfigurasi toko.</p>
        </div>
      </div>

      <form onSubmit={handleSave}>
        <div className="adm-settings-grid">
          {/* Store Info */}
          <div className="adm-card adm-settings-card">
            <div className="adm-card-header">
              <h3 className="adm-card-title"><IcStore /> Info Toko</h3>
            </div>
            <div className="adm-settings-fields">
              {[
                { label: "Nama Toko", name: "storeName" },
                { label: "Email", name: "storeEmail" },
                { label: "No. WhatsApp", name: "storePhone" },
                { label: "Alamat", name: "storeAddress" },
              ].map(f => (
                <div key={f.name} className="adm-form-group">
                  <label>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} className="adm-input" />
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="adm-card adm-settings-card">
            <div className="adm-card-header">
              <h3 className="adm-card-title">Sosial Media & Toko Online</h3>
            </div>
            <div className="adm-settings-fields">
              {[
                { label: "Instagram", name: "storeIG" },
                { label: "Shopee", name: "storeShopee" },
              ].map(f => (
                <div key={f.name} className="adm-form-group">
                  <label>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} className="adm-input" />
                </div>
              ))}
            </div>
            <div className="adm-card-header" style={{ marginTop: 24 }}>
              <h3 className="adm-card-title">Rekening Pembayaran</h3>
            </div>
            <div className="adm-settings-fields">
              {[
                { label: "BCA", name: "payBCA" },
                { label: "BNI", name: "payBNI" },
                { label: "DANA", name: "payDANA" },
              ].map(f => (
                <div key={f.name} className="adm-form-group">
                  <label>{f.label}</label>
                  <input name={f.name} value={form[f.name]} onChange={handleChange} className="adm-input" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="adm-settings-save">
          <button type="submit" className={`adm-primary-btn${saved ? " adm-primary-btn--saved" : ""}`}>
            {saved ? "✓ Tersimpan!" : "Simpan Perubahan"}
          </button>
        </div>
      </form>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: NOTIFICATIONS
   ═══════════════════════════════════════════════════════════ */
const NOTIF_TYPE_META = {
  order:   { label: "Order",    color: "#e09a3a", bg: "rgba(224,154,58,0.08)",   icon: "🛍️" },
  payment: { label: "Payment",  color: "#22c55e", bg: "rgba(34,197,94,0.08)",    icon: "💳" },
  shipped: { label: "Shipping", color: "#8b5cf6", bg: "rgba(139,92,246,0.08)",  icon: "🚚" },
  return:  { label: "Return",   color: "#ef4444", bg: "rgba(239,68,68,0.08)",    icon: "↩️" },
  review:  { label: "Review",   color: "#4a9fd4", bg: "rgba(74,159,212,0.08)",  icon: "⭐" },
};

function Notifications() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);
  const [filter, setFilter] = useState("all");

  const unread = notifs.filter(n => !n.read).length;
  const types  = ["all", "order", "payment", "shipped", "return", "review"];

  const filtered = notifs.filter(n => filter === "all" || n.type === filter);

  const markRead = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const dismiss = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Notifications</h2>
          <p className="adm-section-sub">{unread} unread · {notifs.length} total</p>
        </div>
        {unread > 0 && (
          <button className="adm-ghost-btn" onClick={markAllRead}>Mark all as read</button>
        )}
      </div>

      {/* Filter pills */}
      <div className="adm-notif-filters">
        {types.map(t => (
          <button
            key={t}
            className={`adm-cat-pill${filter === t ? " adm-cat-pill--active" : ""}`}
            onClick={() => setFilter(t)}
          >
            {t === "all" ? "All" : NOTIF_TYPE_META[t].label}
            {t === "all"
              ? <span className="adm-tab-count">{notifs.length}</span>
              : <span className="adm-tab-count">{notifs.filter(n => n.type === t).length}</span>
            }
          </button>
        ))}
      </div>

      {/* Notification list */}
      <div className="adm-notif-list">
        {filtered.length === 0 ? (
          <div className="adm-card adm-notif-empty">
            <p>No notifications in this category.</p>
          </div>
        ) : filtered.map(n => {
          const meta = NOTIF_TYPE_META[n.type];
          return (
            <div
              key={n.id}
              className={`adm-notif-item${n.read ? "" : " adm-notif-item--unread"}`}
              onClick={() => markRead(n.id)}
            >
              <div className="adm-notif-icon" style={{ background: meta.bg, color: meta.color }}>
                <span>{meta.icon}</span>
              </div>
              <div className="adm-notif-body">
                <div className="adm-notif-top">
                  <span className="adm-notif-title">{n.title}</span>
                  <span className="adm-notif-time">{n.time}</span>
                </div>
                <p className="adm-notif-desc">{n.body}</p>
              </div>
              <div className="adm-notif-actions">
                {!n.read && <span className="adm-notif-dot" />}
                <button
                  className="adm-notif-dismiss"
                  title="Dismiss"
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

/* ═══════════════════════════════════════════════════════════
   SIDEBAR NAV CONFIG
   ═══════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "dashboard",     label: "Dashboard",      icon: <IcGrid />      },
  { id: "orders",        label: "Pesanan",         icon: <IcOrders />    },
  { id: "products",      label: "Produk",          icon: <IcProducts />  },
  { id: "customers",     label: "Pelanggan",       icon: <IcCustomers /> },
  { id: "messages",      label: "Pesan",           icon: <IcMessages />  },
  { id: "notifications", label: "Notifications",   icon: <IcNotif />     },
  { id: "settings",      label: "Pengaturan",      icon: <IcSettings />  },
];

/* ═══════════════════════════════════════════════════════════
   MAIN ADMIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [query,  setQuery]  = useState("");

  const unreadMsgs    = MOCK_MESSAGES.filter(m => !m.read).length;
  const pendingOrders = MOCK_ORDERS.filter(o => o.status === "pending").length;
  const unreadNotifs  = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const renderSection = () => {
    switch (active) {
      case "dashboard": return <Dashboard setActive={setActive} />;
      case "orders":    return <Orders />;
      case "products":  return <Products />;
      case "customers": return <Customers />;
      case "messages":       return <Messages />;
      case "notifications":  return <Notifications />;
      case "settings":       return <Settings />;
      default:          return <Dashboard setActive={setActive} />;
    }
  };

  return (
    <div className="adm-root">

      {/* ── SIDEBAR ── */}
      <aside className="adm-sidebar">
        {/* Logo */}
        <div className="adm-sidebar-logo">
          <img src="/logo-careofyou.png" alt="Careofyou" className="adm-sidebar-logo-img" />
          <div>
            <span className="adm-sidebar-brand">careofyou</span>
            <span className="adm-sidebar-role">Admin Panel</span>
          </div>
        </div>

        {/* Nav */}
        <nav className="adm-sidebar-nav">
          <p className="adm-nav-group-label">Menu</p>
          {NAV_ITEMS.map(item => (
            <button
              key={item.id}
              className={`adm-nav-item${active === item.id ? " adm-nav-item--active" : ""}`}
              onClick={() => setActive(item.id)}
            >
              <span className="adm-nav-icon">{item.icon}</span>
              <span className="adm-nav-label">{item.label}</span>
              {item.id === "messages" && unreadMsgs > 0 && (
                <span className="adm-nav-badge">{unreadMsgs}</span>
              )}
              {item.id === "orders" && pendingOrders > 0 && (
                <span className="adm-nav-badge adm-nav-badge--amber">{pendingOrders}</span>
              )}
              {item.id === "notifications" && unreadNotifs > 0 && (
                <span className="adm-nav-badge adm-nav-badge--rose">{unreadNotifs}</span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom: visit store + logout */}
        <div className="adm-sidebar-bottom">
          <button className="adm-nav-item adm-nav-item--store" onClick={() => navigate("/")}>
            <span className="adm-nav-icon"><IcStore /></span>
            <span className="adm-nav-label">Lihat Toko</span>
          </button>
          <button className="adm-nav-item adm-nav-item--logout" onClick={() => navigate("/")}>
            <span className="adm-nav-icon"><IcLogOut /></span>
            <span className="adm-nav-label">Keluar</span>
          </button>
        </div>
      </aside>

      {/* ── MAIN ── */}
      <div className="adm-main">
        {/* Topbar */}
        <header className="adm-topbar">
          <div className="adm-topbar-search">
            <IcSearch />
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Cari apapun…"
              className="adm-topbar-input"
            />
          </div>

          <div className="adm-topbar-right">
            {/* Notification bell */}
            <button className="adm-topbar-icon-btn">
              <IcBell />
              {(unreadMsgs + pendingOrders) > 0 && (
                <span className="adm-notif-dot">{unreadMsgs + pendingOrders}</span>
              )}
            </button>

            {/* Admin profile */}
            <div className="adm-topbar-profile">
              <img src="/logo-careofyou.png" alt="Admin" className="adm-topbar-avatar-img" />
              <div className="adm-topbar-info">
                <span className="adm-topbar-name">Admin</span>
                <span className="adm-topbar-email">admin@careofyou.id</span>
              </div>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="adm-content">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
