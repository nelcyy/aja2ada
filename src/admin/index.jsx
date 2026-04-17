import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import {
  ACCOUNT_TRUST_META,
  ADMIN_AUDIT_LOGS,
  ADMIN_LOGIN_CONTROL_USERS,
  ADMIN_MONITORING_FLAGS,
  ADMIN_SECURITY_STATE,
  ADMIN_SENSITIVE_ACTIONS,
  ADMIN_TRUSTED_DEVICES,
  OTP_DEMO_CODE,
} from "./mockData";
import AccountTrustDrawer from "./components/AccountTrustDrawer";
import MonitoringSection from "./components/MonitoringSection";
import SecuritySection from "./components/SecuritySection";
import StepUpOtpModal from "./components/StepUpOtpModal";
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

const DAILY_REVENUE = [
  { label: "Sen", val: 420000 },
  { label: "Sel", val: 860000 },
  { label: "Rab", val: 340000 },
  { label: "Kam", val: 1200000 },
  { label: "Jum", val: 780000 },
  { label: "Sab", val: 1540000 },
  { label: "Min", val: 960000 },
];
const MONTHLY_REVENUE = [
  { label: "Jan", val: 4200000 },
  { label: "Feb", val: 5800000 },
  { label: "Mar", val: 3900000 },
  { label: "Apr", val: 7200000 },
  { label: "Mei", val: 6100000 },
  { label: "Jun", val: 8400000 },
  { label: "Jul", val: 7800000 },
  { label: "Agt", val: 9200000 },
  { label: "Sep", val: 6800000 },
  { label: "Okt", val: 10500000 },
  { label: "Nov", val: 12000000 },
  { label: "Des", val: 15400000 },
];
const YEARLY_REVENUE = [
  { label: "2020", val: 48000000 },
  { label: "2021", val: 72000000 },
  { label: "2022", val: 95000000 },
  { label: "2023", val: 130000000 },
  { label: "2024", val: 168000000 },
  { label: "2025", val: 92000000 },
];

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");
const stampNow = () =>
  new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date()).replace(",", "");

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
const IcStore      = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
const IcStar       = () => <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>;
const IcPackage    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"/><path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>;
const IcNotif      = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>;
const IcShield     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
const IcMonitor    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/><path d="M7 9h2l2-3 2 6 2-3h2"/></svg>;

/* ═══════════════════════════════════════════════════════════
   COMPONENT: Revenue Chart (modern SVG area chart)
   ═══════════════════════════════════════════════════════════ */
function RevenueChart() {
  const [period, setPeriod] = useState("daily");
  const [tooltip, setTooltip] = useState(null);

  const data = period === "daily" ? DAILY_REVENUE
    : period === "monthly" ? MONTHLY_REVENUE
    : YEARLY_REVENUE;

  const W = 560, H = 200;
  const PAD = { top: 24, right: 16, bottom: 32, left: 52 };
  const cW = W - PAD.left - PAD.right;
  const cH = H - PAD.top - PAD.bottom;
  const maxVal = Math.max(...data.map(d => d.val));

  const pts = data.map((d, i) => ({
    x: PAD.left + (i / (data.length - 1)) * cW,
    y: PAD.top + cH - (d.val / maxVal) * cH,
    val: d.val,
    label: d.label,
  }));

  const linePath = pts.reduce((acc, p, i) => {
    if (i === 0) return `M ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
    const prev = pts[i - 1];
    const cx = ((prev.x + p.x) / 2).toFixed(1);
    return acc + ` C ${cx},${prev.y.toFixed(1)} ${cx},${p.y.toFixed(1)} ${p.x.toFixed(1)},${p.y.toFixed(1)}`;
  }, "");

  const areaPath = linePath
    + ` L ${pts[pts.length - 1].x.toFixed(1)},${(PAD.top + cH).toFixed(1)}`
    + ` L ${pts[0].x.toFixed(1)},${(PAD.top + cH).toFixed(1)} Z`;

  const gridVals = [0.25, 0.5, 0.75, 1].map(pct => ({
    y: PAD.top + cH - pct * cH,
    val: maxVal * pct,
  }));

  const fmtTick = v =>
    v >= 1_000_000 ? (v / 1_000_000).toFixed(1) + "M" : (v / 1_000).toFixed(0) + "K";

  const periodLabel = period === "daily" ? "Minggu Ini" : period === "monthly" ? "2025" : "All Time";

  return (
    <div className="adm-card adm-chart-card">
      <div className="adm-card-header">
        <div>
          <h3 className="adm-card-title">Revenue</h3>
          <span className="adm-card-tag">{periodLabel}</span>
        </div>
        <div className="adm-chart-period-btns">
          {[["daily", "Harian"], ["monthly", "Bulanan"], ["yearly", "Tahunan"]].map(([key, lbl]) => (
            <button
              key={key}
              className={`adm-period-btn${period === key ? " adm-period-btn--active" : ""}`}
              onClick={() => setPeriod(key)}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      <div className="adm-chart-svg-wrap">
        <svg viewBox={`0 0 ${W} ${H}`} className="adm-chart-svg">
          <defs>
            <linearGradient id="rcGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#c97269" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#c97269" stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Grid lines */}
          {gridVals.map((g, i) => (
            <g key={i}>
              <line
                x1={PAD.left} y1={g.y.toFixed(1)}
                x2={W - PAD.right} y2={g.y.toFixed(1)}
                stroke="#f3e8e7" strokeWidth="1" strokeDasharray="5,5"
              />
              <text x={PAD.left - 6} y={g.y + 4} textAnchor="end" fontSize="9" fill="#bbb">
                {fmtTick(g.val)}
              </text>
            </g>
          ))}

          {/* Baseline */}
          <line
            x1={PAD.left} y1={PAD.top + cH}
            x2={W - PAD.right} y2={PAD.top + cH}
            stroke="#f0e0df" strokeWidth="1"
          />

          {/* Area fill */}
          <path d={areaPath} fill="url(#rcGrad)" />

          {/* Line */}
          <path
            d={linePath} fill="none"
            stroke="url(#lineGrad)" strokeWidth="2.5"
            strokeLinecap="round" strokeLinejoin="round"
          />
          <defs>
            <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e07a73" />
              <stop offset="100%" stopColor="#c97269" />
            </linearGradient>
          </defs>

          {/* Dots + x labels */}
          {pts.map((p, i) => (
            <g key={i}>
              {/* hover hit area */}
              <circle
                cx={p.x} cy={p.y} r={16}
                fill="transparent"
                style={{ cursor: "pointer" }}
                onMouseEnter={() => setTooltip(p)}
                onMouseLeave={() => setTooltip(null)}
              />
              {/* outer glow */}
              <circle cx={p.x} cy={p.y} r={6} fill="#c97269" opacity="0.15" />
              {/* dot */}
              <circle cx={p.x} cy={p.y} r={4} fill="white" stroke="#c97269" strokeWidth="2" />
              {/* x label */}
              <text
                x={p.x} y={H - 6}
                textAnchor="middle" fontSize="9.5" fill="#aaa" fontWeight="600"
              >
                {p.label}
              </text>
            </g>
          ))}

          {/* Tooltip */}
          {tooltip && (() => {
            const tx = Math.min(Math.max(tooltip.x, 44), W - 44);
            const ty = tooltip.y > 50 ? tooltip.y - 40 : tooltip.y + 14;
            return (
              <g>
                <rect x={tx - 46} y={ty} width={92} height={28} rx={8} fill="#1e1e1e" opacity="0.9" />
                <text x={tx} y={ty + 18} textAnchor="middle" fontSize="10.5" fill="white" fontWeight="700">
                  {fmt(tooltip.val)}
                </text>
              </g>
            );
          })()}
        </svg>
      </div>
    </div>
  );
}

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
        <RevenueChart />

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
function Orders({ accountProfiles, monitoringFlags, onOpenAccount, onSensitiveAudit }) {
  const [orders, setOrders] = useState(MOCK_ORDERS);
  const [tab, setTab] = useState("all");
  const [query, setQuery] = useState("");
  const [otpAction, setOtpAction] = useState(null);

  const tabs = ["all", "pending", "packing", "shipped", "delivered"];

  const filtered = orders.filter((order) => {
    const matchTab = tab === "all" || order.status === tab;
    const loweredQuery = query.toLowerCase();
    const matchQuery = !loweredQuery
      || order.id.toLowerCase().includes(loweredQuery)
      || order.customer.toLowerCase().includes(loweredQuery)
      || order.products.some((product) => product.toLowerCase().includes(loweredQuery));
    return matchTab && matchQuery;
  });

  const advance = (id) => {
    const flow = { pending: "packing", packing: "shipped", shipped: "delivered" };
    setOrders((prev) => prev.map((order) => (
      order.id === id ? { ...order, status: flow[order.status] ?? order.status } : order
    )));
  };

  const cancel = (id) => {
    setOrders((prev) => prev.map((order) => (
      order.id === id ? { ...order, status: "cancelled" } : order
    )));
  };

  const openOtpForOrder = (order, kind) => {
    const account = accountProfiles.find((profile) => profile.email === order.email);
    const title = kind === "approve-payment"
      ? `Approve Payment for ${order.id}`
      : `Reject Payment for ${order.id}`;
    const description = kind === "approve-payment"
      ? `Verify OTP before approving ${order.customer}'s payment and moving the order forward.`
      : `Verify OTP before rejecting ${order.customer}'s payment confirmation.`;

    const trustWarning = account
      ? ` Account status: ${ACCOUNT_TRUST_META[account.trust_status].label}. ${account.suggestion}`
      : "";

    setOtpAction({ order, kind, title, description: description + trustWarning });
  };

  const verifyOrderOtp = async (code) => {
    if (code !== OTP_DEMO_CODE) {
      onSensitiveAudit?.({
        action_type: "otp verification",
        result_status: "failed",
        note: otpAction?.title || "Order verification",
        syncVerification: true,
      });
      return { ok: false, message: "OTP salah. Gunakan 123456 untuk demo." };
    }

    if (!otpAction) {
      return { ok: false, message: "Aksi sensitif tidak ditemukan." };
    }

    onSensitiveAudit?.({
      action_type: "otp verified",
      note: otpAction.title,
      syncVerification: false,
    });

    if (otpAction.kind === "approve-payment") {
      advance(otpAction.order.id);
      onSensitiveAudit?.({
        action_type: "payment approved",
        note: otpAction.title,
        syncVerification: true,
      });
      return { ok: true, message: `${otpAction.order.id} berhasil dipindah ke tahap packing.` };
    }

    cancel(otpAction.order.id);
    onSensitiveAudit?.({
      action_type: "payment rejected",
      result_status: "warning",
      note: otpAction.title,
      syncVerification: true,
    });
    return { ok: true, message: `${otpAction.order.id} berhasil ditandai sebagai rejected.` };
  };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Manajemen Pesanan</h2>
          <p className="adm-section-sub">{orders.length} total pesanan</p>
        </div>
      </div>

      <div className="adm-tabs">
        {tabs.map((status) => (
          <button
            key={status}
            className={`adm-tab${tab === status ? " adm-tab--active" : ""}`}
            onClick={() => setTab(status)}
          >
            {status === "all" ? "Semua" : STATUS_META[status]?.label}
            <span className="adm-tab-count">
              {status === "all" ? orders.length : orders.filter((order) => order.status === status).length}
            </span>
          </button>
        ))}
      </div>

      <div className="adm-search-bar">
        <IcSearch />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cari order ID, customer, atau produk..."
          className="adm-search-input"
        />
        {query && <button className="adm-search-clear" onClick={() => setQuery("")}>x</button>}
      </div>

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
              <th>Trust Check</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr><td colSpan={8} className="adm-empty-row">Tidak ada pesanan ditemukan.</td></tr>
            ) : (
              filtered.map((order) => {
                const st = STATUS_META[order.status];
                const canAdvance = ["packing", "shipped"].includes(order.status);
                const account = accountProfiles.find((profile) => profile.email === order.email);
                const trustMeta = account ? ACCOUNT_TRUST_META[account.trust_status] : null;
                const linkedFlags = monitoringFlags.filter((flag) => flag.related_user === order.email || flag.related_order === order.id);
                return (
                  <tr key={order.id}>
                    <td><span className="adm-order-id">{order.id}</span></td>
                    <td>
                      <div className="adm-customer-cell">
                        <Avatar name={order.customer} size={30} />
                        <div>
                          <p className="adm-customer-name">{order.customer}</p>
                          <p className="adm-customer-email">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="adm-products-cell">
                        {order.products.map((product, index) => <span key={index} className="adm-product-tag">{product}</span>)}
                      </div>
                    </td>
                    <td><strong>{fmt(order.total)}</strong></td>
                    <td className="adm-date-cell">{order.date}</td>
                    <td>
                      <span className="adm-status-pill" style={{ color: st.color, background: st.bg }}>
                        {st.label}
                      </span>
                    </td>
                    <td>
                      {account ? (
                        <div className="adm-order-risk-cell">
                          <span className="adm-status-pill" style={{ color: trustMeta.color, background: trustMeta.bg }}>
                            {trustMeta.label}
                          </span>
                          <p className="adm-order-risk-meta">
                            {linkedFlags.length} flag{linkedFlags.length === 1 ? "" : "s"} - {account.failed_logins_24h} login fail
                          </p>
                          <button className="adm-link-btn" onClick={() => onOpenAccount(order.email, `Risk review for ${order.id}`)}>
                            Review risk
                          </button>
                        </div>
                      ) : (
                        <span className="adm-date-cell">No data</span>
                      )}
                    </td>
                    <td>
                      <div className="adm-action-btns">
                        {order.status === "pending" ? (
                          <>
                            <button
                              className="adm-act-btn adm-act-btn--primary"
                              onClick={() => openOtpForOrder(order, "approve-payment")}
                            >
                              <IcCheck />
                              Approve Payment
                            </button>
                            <button
                              className="adm-act-btn adm-act-btn--danger adm-act-btn--danger-text"
                              onClick={() => openOtpForOrder(order, "reject-payment")}
                            >
                              Reject Payment
                            </button>
                          </>
                        ) : (
                          <>
                            {canAdvance && (
                              <button className="adm-act-btn adm-act-btn--primary" onClick={() => advance(order.id)}>
                                {order.status === "packing" ? <IcTruck /> : <IcCheck />}
                                {order.status === "packing" ? "Ship" : "Delivered"}
                              </button>
                            )}
                            {order.status !== "delivered" && order.status !== "cancelled" && (
                              <button className="adm-act-btn adm-act-btn--danger" title="Cancel" onClick={() => cancel(order.id)}>
                                x
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      <StepUpOtpModal
        open={Boolean(otpAction)}
        title={otpAction?.title}
        description={otpAction?.description}
        demoCode={OTP_DEMO_CODE}
        onVerify={verifyOrderOtp}
        onClose={() => setOtpAction(null)}
      />
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
  { id: "dashboard",     label: "Dashboard",       icon: <IcGrid />      },
  { id: "orders",        label: "Pesanan",         icon: <IcOrders />    },
  { id: "products",      label: "Produk",          icon: <IcProducts />  },
  { id: "customers",     label: "Pelanggan",       icon: <IcCustomers /> },
  { id: "security",      label: "Security",        icon: <IcShield />    },
  { id: "monitoring",    label: "Monitoring",      icon: <IcMonitor />   },
  { id: "notifications", label: "Notifications",   icon: <IcNotif />     },
  { id: "settings",      label: "Pengaturan",      icon: <IcSettings />  },
];

/* ═══════════════════════════════════════════════════════════
   MAIN ADMIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [query, setQuery] = useState("");
  const [securityState, setSecurityState] = useState(ADMIN_SECURITY_STATE);
  const [trustedDevices, setTrustedDevices] = useState(ADMIN_TRUSTED_DEVICES);
  const [loginUsers, setLoginUsers] = useState(ADMIN_LOGIN_CONTROL_USERS);
  const [monitoringFlags, setMonitoringFlags] = useState(ADMIN_MONITORING_FLAGS);
  const [auditLogs, setAuditLogs] = useState(ADMIN_AUDIT_LOGS);
  const [otpRequest, setOtpRequest] = useState(null);
  const [accountDrawer, setAccountDrawer] = useState({ email: null, contextLabel: "" });

  const pendingOrders = MOCK_ORDERS.filter((order) => order.status === "pending").length;
  const unreadNotifs = MOCK_NOTIFICATIONS.filter((notif) => !notif.read).length;
  const openFlags = monitoringFlags.filter((flag) => flag.status === "open").length;
  const deviceWarnings = trustedDevices.filter((device) => device.status === "new").length;
  const topbarAlerts = pendingOrders + openFlags;
  const getAccountProfile = (email) => loginUsers.find((user) => user.email === email) || null;
  const getRelatedFlags = (email) => monitoringFlags.filter((flag) => flag.related_user === email);

  const pushAuditLog = ({
    action_type,
    actor = "Admin",
    result_status = "success",
    ip_address = "36.77.120.45",
  }) => {
    setAuditLogs((prev) => [
      {
        id: `AUD-${Date.now()}`,
        action_type,
        actor,
        timestamp: stampNow(),
        result_status,
        ip_address,
      },
      ...prev,
    ]);
  };

  const syncLastVerification = (label, status = "verified") => {
    setSecurityState((prev) => ({
      ...prev,
      last_verification: {
        label,
        time: stampNow(),
        method: "OTP step-up",
        status,
      },
    }));
  };

  const handleSensitiveAudit = ({
    action_type,
    actor,
    result_status = "success",
    ip_address,
    note,
    syncVerification = false,
  }) => {
    pushAuditLog({ action_type, actor, result_status, ip_address });
    if (syncVerification) {
      syncLastVerification(note || action_type, result_status === "failed" ? "failed" : "verified");
    }
  };

  const handleTrustDevice = (deviceId) => {
    const targetDevice = trustedDevices.find((device) => device.id === deviceId);
    if (!targetDevice) return;

    setTrustedDevices((prev) => prev.map((device) => (
      device.id === deviceId
        ? { ...device, status: "trusted", trusted_since: stampNow(), last_active: "Just now" }
        : device
    )));

    setSecurityState((prev) => ({
      ...prev,
      new_device_warning: prev.new_device_warning?.device_id === deviceId ? null : prev.new_device_warning,
    }));

    handleSensitiveAudit({
      action_type: "device trusted",
      note: `Trust Device ${targetDevice.name}`,
      syncVerification: false,
    });
  };

  const openAccountReview = (email, contextLabel = "Account trust review") => {
    setAccountDrawer({ email, contextLabel });
  };

  const handleRequireReverifyUser = (userId) => {
    const targetUser = loginUsers.find((user) => user.id === userId);
    if (!targetUser) return;

    setLoginUsers((prev) => prev.map((user) => (
      user.id === userId ? { ...user, session_status: "reverification" } : user
    )));

    handleSensitiveAudit({
      action_type: "user session reverification",
      note: `Require Reverify for ${targetUser.email}`,
      result_status: "warning",
      syncVerification: false,
    });
  };

  const handleForceLogoutUser = (userId) => {
    const targetUser = loginUsers.find((user) => user.id === userId);
    if (!targetUser) return;

    setLoginUsers((prev) => prev.map((user) => (
      user.id === userId ? { ...user, session_status: "logged_out", last_activity: "Session closed by admin" } : user
    )));

    handleSensitiveAudit({
      action_type: "user force logout",
      note: `Force Logout for ${targetUser.email}`,
      result_status: "warning",
      syncVerification: false,
    });
  };

  const handleMarkAccountTrusted = (userId) => {
    const targetUser = loginUsers.find((user) => user.id === userId);
    if (!targetUser) return;

    setLoginUsers((prev) => prev.map((user) => (
      user.id === userId
        ? {
            ...user,
            trust_status: "trusted",
            suspicious_signals: ["Admin marked this account as trusted for the current demo review."],
            suggestion: "Admin already reviewed this account and marked it as trusted for manual approval flow.",
          }
        : user
    )));

    handleSensitiveAudit({
      action_type: "account marked trusted",
      note: `Mark Trusted for ${targetUser.email}`,
      result_status: "success",
      syncVerification: false,
    });
  };

  const requestSecurityAction = (action) => {
    setOtpRequest({
      title: action.label,
      description: action.description,
      successMessage: action.success_message,
      auditAction: action.audit_action,
      onSuccess: () => {
        if (action.id === "resolve-flag") {
          setMonitoringFlags((prev) => {
            const firstOpenFlag = prev.find((flag) => flag.status === "open");
            if (!firstOpenFlag) return prev;
            return prev.map((flag) => (
              flag.id === firstOpenFlag.id ? { ...flag, status: "resolved" } : flag
            ));
          });
        }
      },
    });
  };

  const requestFlagResolution = (flag) => {
    setOtpRequest({
      title: `Resolve Flag ${flag.id}`,
      description: `Verify OTP before resolving ${flag.rule_code} and closing the monitoring case.`,
      successMessage: `${flag.id} resolved in demo mode.`,
      auditAction: "monitoring flag resolved",
      onSuccess: () => {
        setMonitoringFlags((prev) => prev.map((item) => (
          item.id === flag.id ? { ...item, status: "resolved" } : item
        )));
      },
    });
  };

  const verifyGlobalOtp = async (code) => {
    if (code !== OTP_DEMO_CODE) {
      handleSensitiveAudit({
        action_type: "otp verification",
        result_status: "failed",
        note: otpRequest?.title || "Step-up verification",
        syncVerification: true,
      });
      return { ok: false, message: "OTP salah. Gunakan 123456 untuk demo." };
    }

    otpRequest?.onSuccess?.();

    handleSensitiveAudit({
      action_type: "otp verified",
      note: otpRequest?.title || "Step-up verification",
      syncVerification: false,
    });

    if (otpRequest?.auditAction) {
      handleSensitiveAudit({
        action_type: otpRequest.auditAction,
        note: otpRequest.title,
        result_status: "success",
        syncVerification: true,
      });
    }

    return {
      ok: true,
      message: otpRequest?.successMessage || "Sensitive action verified successfully.",
    };
  };

  const handleMarkReviewed = (flag) => {
    setMonitoringFlags((prev) => prev.map((item) => (
      item.id === flag.id ? { ...item, status: "reviewed" } : item
    )));
    handleSensitiveAudit({
      action_type: "monitoring flag reviewed",
      note: `Mark Reviewed for ${flag.id}`,
      result_status: "success",
      syncVerification: false,
    });
  };

  const handleEscalateFlag = (flag) => {
    setMonitoringFlags((prev) => prev.map((item) => (
      item.id === flag.id ? { ...item, status: "escalated" } : item
    )));
    handleSensitiveAudit({
      action_type: "monitoring flag escalated",
      note: `Escalate ${flag.id}`,
      result_status: "warning",
      syncVerification: false,
    });
  };

  const renderSection = () => {
    switch (active) {
      case "dashboard": return <Dashboard setActive={setActive} />;
      case "orders":
        return (
          <Orders
            accountProfiles={loginUsers}
            monitoringFlags={monitoringFlags}
            onOpenAccount={openAccountReview}
            onSensitiveAudit={handleSensitiveAudit}
          />
        );
      case "products":  return <Products />;
      case "customers": return <Customers />;
      case "security":
        return (
          <SecuritySection
            securityState={securityState}
            devices={trustedDevices}
            loginUsers={loginUsers}
            actionTemplates={ADMIN_SENSITIVE_ACTIONS}
            onRequestAction={requestSecurityAction}
            onTrustDevice={handleTrustDevice}
            onOpenAccount={openAccountReview}
            onRequireReverify={handleRequireReverifyUser}
            onForceLogout={handleForceLogoutUser}
          />
        );
      case "monitoring":
        return (
          <MonitoringSection
            flags={monitoringFlags}
            auditLogs={auditLogs}
            accountProfiles={loginUsers}
            onOpenAccount={openAccountReview}
            onMarkReviewed={handleMarkReviewed}
            onResolve={requestFlagResolution}
            onEscalate={handleEscalateFlag}
          />
        );
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
              {item.id === "orders" && pendingOrders > 0 && (
                <span className="adm-nav-badge adm-nav-badge--amber">{pendingOrders}</span>
              )}
              {item.id === "security" && deviceWarnings > 0 && (
                <span className="adm-nav-badge adm-nav-badge--amber">{deviceWarnings}</span>
              )}
              {item.id === "monitoring" && openFlags > 0 && (
                <span className="adm-nav-badge adm-nav-badge--rose">{openFlags}</span>
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
              {topbarAlerts > 0 && (
                <span className="adm-notif-dot">{topbarAlerts}</span>
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

      <StepUpOtpModal
        open={Boolean(otpRequest)}
        title={otpRequest?.title}
        description={otpRequest?.description}
        demoCode={OTP_DEMO_CODE}
        onVerify={verifyGlobalOtp}
        onClose={() => setOtpRequest(null)}
      />

      <AccountTrustDrawer
        open={Boolean(accountDrawer.email)}
        account={getAccountProfile(accountDrawer.email)}
        relatedFlags={getRelatedFlags(accountDrawer.email)}
        contextLabel={accountDrawer.contextLabel}
        onClose={() => setAccountDrawer({ email: null, contextLabel: "" })}
        onRequireReverify={handleRequireReverifyUser}
        onForceLogout={handleForceLogoutUser}
        onMarkTrusted={handleMarkAccountTrusted}
      />
    </div>
  );
}
