import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PRODUCTS } from "../data/products.js";
import "./index.css";

/* ═══════════════════════════════════════════════════════════
   MOCK DATA
   ═══════════════════════════════════════════════════════════ */
const MOCK_ORDERS = [
  { id: "ORD-011", customer: "Sara Tancredi",    email: "sara@gmail.com",     products: ["Vitamin C Serum", "Sunscreen Aqua Gel"],                 total: 294000, date: "15 Apr 2025", status: "pending",   payment: "BCA Transfer",  address: "Jl. Sudirman No. 12, Jakarta" },
  { id: "ORD-012", customer: "Maya Sari",        email: "maya@gmail.com",     products: ["Daily Moisturizer SPF 30", "Hydra Boost Toner"],         total: 260000, date: "15 Apr 2025", status: "pending",   payment: "GoPay",         address: "Jl. Gatot Subroto No. 5, Jakarta" },
  { id: "ORD-013", customer: "Hana Lestari",     email: "hana@gmail.com",     products: ["5X Ceramide Barrier Moisture Gel"],                      total: 149000, date: "14 Apr 2025", status: "pending",   payment: "BNI Transfer",  address: "Perumahan Indah Blok C No. 3, Surabaya" },
  { id: "ORD-014", customer: "Rina Kusuma",      email: "rina@gmail.com",     products: ["Retinol Night Cream"],                                   total: 210000, date: "15 Apr 2025", status: "packing",   payment: "OVO",           address: "Jl. Malioboro No. 88, Yogyakarta" },
  { id: "ORD-015", customer: "Tiara Putri",      email: "tiara@gmail.com",    products: ["Gentle Foaming Cleanser", "Rose Water Mist"],            total: 174000, date: "14 Apr 2025", status: "packing",   payment: "BCA Transfer",  address: "Jl. Pemuda No. 21, Semarang" },
  { id: "ORD-016", customer: "Ayu Rahayu",       email: "ayu@gmail.com",      products: ["Niacinamide 10% + Zinc Serum", "Pore Tightening Toner"], total: 318000, date: "13 Apr 2025", status: "packing",   payment: "DANA",          address: "Jl. A. Yani No. 44, Bandung" },
  { id: "ORD-017", customer: "Dewi Larasati",    email: "dewi@gmail.com",     products: ["Hyaluronic Acid Serum", "Ceramide Barrier Cream"],       total: 335000, date: "14 Apr 2025", status: "shipped",   payment: "BNI Transfer",  address: "Jl. Diponegoro No. 7, Medan" },
  { id: "ORD-018", customer: "Fitri Handayani",  email: "fitri@gmail.com",    products: ["SPF 50 UV Defense Serum", "Peptide Eye Cream"],          total: 410000, date: "13 Apr 2025", status: "shipped",   payment: "GoPay",         address: "Komplek Griya Permai No. 15, Makassar" },
  { id: "ORD-019", customer: "Sari Dewi",        email: "saridewi@gmail.com", products: ["AHA BHA Exfoliating Toner"],                             total: 135000, date: "12 Apr 2025", status: "shipped",   payment: "BCA Transfer",  address: "Jl. Raya Bogor KM 30, Depok" },
  { id: "ORD-001", customer: "Bunga Citra",      email: "bunga@gmail.com",    products: ["Brightening Facial Mask"],                               total: 45000,  date: "14 Apr 2025", status: "delivered", payment: "OVO",           address: "Jl. Kartini No. 9, Surabaya" },
  { id: "ORD-002", customer: "Nadia Rahman",     email: "nadia@gmail.com",    products: ["AHA BHA Exfoliating Toner"],                             total: 135000, date: "12 Apr 2025", status: "delivered", payment: "BCA Transfer",  address: "Jl. Imam Bonjol No. 3, Semarang" },
  { id: "ORD-003", customer: "Lilis Permata",    email: "lilis@gmail.com",    products: ["Niacinamide Essence"],                                   total: 130000, date: "11 Apr 2025", status: "delivered", payment: "DANA",          address: "Jl. Veteran No. 11, Bandung" },
  { id: "ORD-004", customer: "Sinta Wulandari",  email: "sinta@gmail.com",    products: ["Collagen Sleeping Pack", "Tea Tree Spot Gel"],           total: 233000, date: "11 Apr 2025", status: "delivered", payment: "GoPay",         address: "Jl. Pahlawan No. 6, Malang" },
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

const MOCK_RETURN_REQUESTS = [
  {
    id: "RET-001", orderId: "ORD-001", customer: "Bunga Citra", email: "bunga@gmail.com",
    date: "14 Apr 2025", reason: "Product received damaged",
    status: "pending", monitoringFlag: null,
    products: [{ name: "Brightening Facial Mask", qty: 1, price: 45000 }],
    conditionNote: "Box arrived crushed, product was leaking from the seal.",
    photos: ["photo1.jpg", "photo2.jpg"],
    qrCode: "PROD-UNIT-20250401-0001", scannedQr: "PROD-UNIT-20250401-0001", qrStatus: null, total: 45000,
  },
  {
    id: "RET-002", orderId: "ORD-002", customer: "Nadia Rahman", email: "nadia@gmail.com",
    date: "13 Apr 2025", reason: "Wrong item received",
    status: "pending", monitoringFlag: "Return abuse risk",
    products: [{ name: "AHA BHA Exfoliating Toner", qty: 1, price: 135000 }],
    conditionNote: "Received a different product than what was ordered.",
    photos: ["photo3.jpg"],
    qrCode: "PROD-UNIT-20250330-0042", scannedQr: "PROD-UNIT-20250405-0017", qrStatus: null, total: 135000,
  },
  {
    id: "RET-003", orderId: "ORD-003", customer: "Lilis Permata", email: "lilis@gmail.com",
    date: "12 Apr 2025", reason: "Product does not match description",
    status: "flagged", monitoringFlag: "Unusual login activity",
    products: [{ name: "Niacinamide Essence", qty: 1, price: 130000 }],
    conditionNote: "Product texture and scent differ from store description.",
    photos: ["photo4.jpg"],
    qrCode: "PROD-UNIT-20250311-0089", scannedQr: "PROD-UNIT-20250312-0099", qrStatus: "invalid", total: 130000,
  },
  {
    id: "RET-004", orderId: "ORD-004", customer: "Sinta Wulandari", email: "sinta@gmail.com",
    date: "11 Apr 2025", reason: "Allergic reaction to product",
    status: "approved", monitoringFlag: null,
    products: [
      { name: "Collagen Sleeping Pack", qty: 1, price: 155000 },
      { name: "Tea Tree Spot Gel",      qty: 1, price: 78000 },
    ],
    conditionNote: "Developed rash after first use, stopped immediately.",
    photos: ["photo5.jpg", "photo6.jpg"],
    qrCode: "PROD-UNIT-20250311-0088", scannedQr: "PROD-UNIT-20250311-0088", qrStatus: "valid", total: 233000,
  },
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
const IcReturn     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg>;
const IcReceipt    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
const IcShield     = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const IcHistory    = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/><polyline points="12 7 12 12 15 14"/></svg>;
const IcCreditCard = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>;
const IcQr         = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="5" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="5" width="3" height="3" fill="currentColor" stroke="none"/><rect x="16" y="16" width="3" height="3" fill="currentColor" stroke="none"/><rect x="5" y="16" width="3" height="3" fill="currentColor" stroke="none"/></svg>;

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
                      {["pending","packing","shipped"].includes(o.status) && (
                        <button className="adm-act-btn adm-act-btn--primary" onClick={() => advance(o.id)}>
                          {o.status === "pending" ? <><IcCheck /> Approve</> : o.status === "packing" ? <><IcTruck /> Ship</> : <><IcCheck /> Delivered</>}
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
   HELPER: Mock QR visual (deterministic SVG)
   ═══════════════════════════════════════════════════════════ */
function MockQr({ value, size = 120 }) {
  const GRID = 21;
  const cell = size / GRID;

  // Finder patterns at three corners
  const finderCells = [];
  [[0,0],[14,0],[0,14]].forEach(([dr,dc]) => {
    for (let r = 0; r < 7; r++) for (let c = 0; c < 7; c++) {
      if (r===0||r===6||c===0||c===6||(r>=2&&r<=4&&c>=2&&c<=4))
        finderCells.push([dr+r, dc+c]);
    }
  });

  // Reserve finder + separator + timing zones
  const reserved = new Set();
  [[0,0],[14,0],[0,14]].forEach(([dr,dc]) => {
    for (let r=dr-1;r<=dr+7;r++) for (let c=dc-1;c<=dc+7;c++)
      if (r>=0&&r<GRID&&c>=0&&c<GRID) reserved.add(`${r},${c}`);
  });
  for (let i=8;i<13;i++) { reserved.add(`6,${i}`); reserved.add(`${i},6`); }

  // Timing dots
  const timingCells = [];
  for (let i=8;i<13;i+=2) { timingCells.push([6,i]); timingCells.push([i,6]); }

  // Deterministic data cells seeded from value
  let hash = 0;
  for (let i=0;i<value.length;i++) hash = ((hash<<5)-hash+value.charCodeAt(i))|0;
  const dataCells = [];
  for (let r=0;r<GRID;r++) for (let c=0;c<GRID;c++) {
    if (reserved.has(`${r},${c}`)) continue;
    const seed = (hash^(r*31+c*17))|0;
    if ((seed^(seed>>>7))&1) dataCells.push([r,c]);
  }

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="white" />
      {[...finderCells, ...timingCells, ...dataCells].map(([r,c],i) => (
        <rect key={i} x={c*cell} y={r*cell} width={cell} height={cell} fill="#1a1a1a" />
      ))}
    </svg>
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
  const [qrView,  setQrView]    = useState(null);

  const cats = ["all", ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
  const filtered = products.filter(p => {
    const matchCat = catFilter === "all" || p.category === catFilter;
    const q = query.toLowerCase();
    const matchQ = !q || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q);
    return matchCat && matchQ;
  });

  const remove = (id) => setProducts(prev => prev.filter(p => p.id !== id));

  const genQrCode = (id, category, name) => {
    const catCode = category.replace(/\s+/g, "").toUpperCase().slice(0, 3);
    let hash = 0;
    const str = `${id}-${name}`;
    for (let i = 0; i < str.length; i++) hash = ((hash << 5) - hash + str.charCodeAt(i)) | 0;
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let suffix = "";
    let h = Math.abs(hash) || 7919;
    for (let i = 0; i < 8; i++) { suffix += chars[h % chars.length]; h = Math.floor(h / chars.length) || 7919; }
    return `PROD-NEW-${catCode}-QR-${suffix}`;
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.category || !newProd.price) return;
    const id = Date.now();
    const qrCode = genQrCode(id, newProd.category, newProd.name);
    setProducts(prev => [...prev, {
      id,
      name: newProd.name,
      category: newProd.category,
      price: Number(newProd.price),
      image: newProd.image || `https://placehold.co/300x300/f9f0ef/c87a74?text=${encodeURIComponent(newProd.name)}`,
      rating: 0,
      reviews: 0,
      qrCode,
    }]);
    setNewProd({ name: "", category: "", price: "", image: "" });
    setShowAdd(false);
  };

  return (
    <>
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
                      <button className="adm-act-btn adm-act-btn--qr" title="View QR" onClick={() => setQrView(p)}><IcQr /></button>
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

      {/* QR View Modal */}
      {qrView && (
        <div className="adm-modal-overlay" onClick={() => setQrView(null)}>
          <div className="adm-modal adm-pqr-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div className="adm-modal-header-info">
                <div className="adm-modal-header-row">
                  <h3 className="adm-modal-title">Product QR Code</h3>
                  <span className="adm-cat-badge">{qrView.category}</span>
                </div>
                <p className="adm-modal-sub">{qrView.name}</p>
              </div>
              <button className="adm-modal-close" onClick={() => setQrView(null)}>✕</button>
            </div>
            <div className="adm-pqr-body">
              <div className="adm-pqr-visual">
                <MockQr value={qrView.qrCode || qrView.name} size={160} />
              </div>
              <div className="adm-pqr-info">
                <p className="adm-pqr-label">QR Code</p>
                <code className="adm-qr-code-chip adm-qr-code-chip--neutral">{qrView.qrCode || "–"}</code>
                <p className="adm-pqr-desc">
                  Auto-generated when this product was added. Print and attach to product packaging to enable return verification.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
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
   SECTION: RETURNS — QR-Based Return Verification
   ═══════════════════════════════════════════════════════════ */
const RETURN_STATUS_META = {
  pending:  { label: "Pending Review", color: "#e09a3a", bg: "rgba(224,154,58,0.1)"  },
  flagged:  { label: "Flagged",        color: "#ef4444", bg: "rgba(239,68,68,0.1)"   },
  approved: { label: "Approved",       color: "#22c55e", bg: "rgba(34,197,94,0.1)"   },
  rejected: { label: "Rejected",       color: "#7a7a7a", bg: "rgba(122,122,122,0.1)" },
};

function Returns() {
  const [requests,     setRequests]     = useState(MOCK_RETURN_REQUESTS);
  const [tab,          setTab]          = useState("all");
  const [selected,     setSelected]     = useState(null);
  const [scanning,     setScanning]     = useState(false);
  const [verifyResult, setVerifyResult] = useState(null); // null | "valid" | "invalid" | "used"

  const tabs = ["all", "pending", "flagged", "approved", "rejected"];
  const filtered = tab === "all" ? requests : requests.filter(r => r.status === tab);

  const openDetail = (r) => { setSelected(r); setScanning(false); setVerifyResult(null); };
  const closeDetail = () => { setSelected(null); setScanning(false); setVerifyResult(null); };

  const scanQR = () => {
    if (!selected || scanning) return;
    setScanning(true);
    setVerifyResult(null);
    setTimeout(() => {
      setScanning(false);
      if (selected.status === "approved" || selected.status === "rejected") {
        setVerifyResult("used");
        return;
      }
      const matched = selected.scannedQr === selected.qrCode;
      if (matched) {
        setVerifyResult("valid");
        setRequests(prev => prev.map(r => r.id === selected.id ? { ...r, qrStatus: "valid" } : r));
        setSelected(prev => ({ ...prev, qrStatus: "valid" }));
      } else {
        setVerifyResult("invalid");
        setRequests(prev => prev.map(r =>
          r.id === selected.id
            ? { ...r, qrStatus: "invalid", status: r.status === "pending" ? "flagged" : r.status }
            : r
        ));
        setSelected(prev => ({
          ...prev, qrStatus: "invalid",
          status: prev.status === "pending" ? "flagged" : prev.status,
        }));
      }
    }, 1400);
  };

  const approveReturn = () => {
    setRequests(prev => prev.map(r => r.id === selected.id ? { ...r, status: "approved" } : r));
    setSelected(prev => ({ ...prev, status: "approved" }));
  };

  const rejectReturn = () => {
    setRequests(prev => prev.map(r => r.id === selected.id ? { ...r, status: "rejected" } : r));
    setSelected(prev => ({ ...prev, status: "rejected" }));
  };

  const pendingCount = requests.filter(r => r.status === "pending").length;
  const flaggedCount = requests.filter(r => r.status === "flagged").length;

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Return Verification</h2>
          <p className="adm-section-sub">
            {requests.length} total · {pendingCount} pending · {flaggedCount} flagged
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="adm-tabs">
        {tabs.map(t => (
          <button key={t} className={`adm-tab${tab === t ? " adm-tab--active" : ""}`} onClick={() => setTab(t)}>
            {t === "all" ? "Semua" : RETURN_STATUS_META[t]?.label}
            <span className="adm-tab-count">
              {t === "all" ? requests.length : requests.filter(r => r.status === t).length}
            </span>
          </button>
        ))}
      </div>

      {/* Return request list */}
      <div className="adm-return-list">
        {filtered.length === 0 ? (
          <div className="adm-card adm-notif-empty"><p>No return requests in this category.</p></div>
        ) : filtered.map(r => {
          const st = RETURN_STATUS_META[r.status];
          return (
            <div key={r.id} className={`adm-card adm-return-card adm-return-card--${r.status}`} onClick={() => openDetail(r)}>
              <div className="adm-return-card-left">
                <div className="adm-return-card-id">
                  <span className="adm-order-id">{r.id}</span>
                  <span className="adm-return-order-ref">→ {r.orderId}</span>
                </div>
                <div className="adm-customer-cell" style={{ marginTop: 8 }}>
                  <Avatar name={r.customer} size={28} />
                  <div>
                    <p className="adm-customer-name">{r.customer}</p>
                    <p className="adm-customer-email">{r.email}</p>
                  </div>
                </div>
                <p className="adm-return-reason-preview">"{r.reason}"</p>
              </div>
              <div className="adm-return-card-right">
                <div className="adm-return-card-meta">
                  <span className="adm-status-pill" style={{ color: st.color, background: st.bg }}>{st.label}</span>
                  {r.monitoringFlag && <span className="adm-return-flag">⚠ {r.monitoringFlag}</span>}
                </div>
                <p className="adm-return-date">{r.date}</p>
                <p className="adm-return-total"><strong>{fmt(r.total)}</strong></p>
                <button
                  className="adm-act-btn adm-act-btn--primary"
                  style={{ marginTop: 10 }}
                  onClick={e => { e.stopPropagation(); openDetail(r); }}
                >
                  Review →
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail Modal */}
      {selected && (
        <div className="adm-modal-overlay" onClick={closeDetail}>
          <div className="adm-modal adm-return-modal" onClick={e => e.stopPropagation()}>

            {/* Modal header */}
            <div className="adm-modal-header">
              <div className="adm-modal-header-info">
                <div className="adm-modal-header-row">
                  <h3 className="adm-modal-title">{selected.id}</h3>
                  <span className="adm-status-pill" style={{ color: RETURN_STATUS_META[selected.status].color, background: RETURN_STATUS_META[selected.status].bg, fontSize: 12, padding: "3px 10px" }}>
                    {RETURN_STATUS_META[selected.status].label}
                  </span>
                  {selected.monitoringFlag && (
                    <span className="adm-return-flag">⚠ {selected.monitoringFlag}</span>
                  )}
                </div>
                <p className="adm-modal-sub">{selected.customer} · {selected.orderId} · {selected.date}</p>
              </div>
              <button className="adm-modal-close" onClick={closeDetail}>✕</button>
            </div>

            <div className="adm-return-modal-body">

              {/* Left column: order & customer info */}
              <div className="adm-return-modal-info">

                {/* Customer */}
                <div className="adm-return-info-block">
                  <p className="adm-return-info-label">Customer</p>
                  <div className="adm-customer-cell">
                    <Avatar name={selected.customer} size={32} />
                    <div>
                      <p className="adm-customer-name">{selected.customer}</p>
                      <p className="adm-customer-email">{selected.email}</p>
                    </div>
                  </div>
                </div>

                {/* Monitoring flag warning */}
                {selected.monitoringFlag && (
                  <div className="adm-return-flag-block">
                    <span className="adm-return-flag adm-return-flag--lg">⚠ {selected.monitoringFlag}</span>
                    <p className="adm-return-flag-note">
                      Fraud monitoring flagged this customer's return activity. Review carefully before approving.
                    </p>
                  </div>
                )}

                {/* Products */}
                <div className="adm-return-info-block">
                  <p className="adm-return-info-label">Items to Return</p>
                  {selected.products.map((p, i) => (
                    <div key={i} className="adm-return-product-row">
                      <span className="adm-product-tag">{p.name}</span>
                      <span className="adm-return-product-qty">×{p.qty}</span>
                      <span className="adm-return-product-price">{fmt(p.price)}</span>
                    </div>
                  ))}
                  <div className="adm-return-total-row">
                    <span>Total Refund</span>
                    <strong>{fmt(selected.total)}</strong>
                  </div>
                </div>

                {/* Return reason */}
                <div className="adm-return-info-block">
                  <p className="adm-return-info-label">Return Reason</p>
                  <p className="adm-return-reason-text">{selected.reason}</p>
                  {selected.conditionNote && (
                    <p className="adm-return-condition-note">{selected.conditionNote}</p>
                  )}
                </div>

                {/* Customer photos */}
                <div className="adm-return-info-block">
                  <p className="adm-return-info-label">Customer Photos ({selected.photos.length})</p>
                  <div className="adm-return-photos">
                    {selected.photos.map((_, i) => (
                      <div key={i} className="adm-return-photo-placeholder">
                        <span style={{ fontSize: 22 }}>📷</span>
                        <span>Photo {i + 1}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right column: QR verification panel */}
              <div className="adm-return-modal-qr">
                <div className="adm-qr-panel">

                  {/* Panel header */}
                  <div className="adm-qr-panel-hdr">
                    <div className="adm-qr-icon-wrap"><IcQr /></div>
                    <div>
                      <p className="adm-qr-panel-title">QR Verification</p>
                      <p className="adm-qr-panel-sub">Verify the returned item's authenticity</p>
                    </div>
                  </div>

                  {/* Step-by-step verification */}
                  <div className="adm-qr-steps">

                    {/* Step 1: System record */}
                    <div className="adm-qr-step">
                      <div className="adm-qr-step-num">1</div>
                      <div className="adm-qr-step-body">
                        <p className="adm-qr-step-lbl">Registered QR (System Record)</p>
                        <code className="adm-qr-code-chip">{selected.qrCode}</code>
                      </div>
                    </div>

                    {/* Step 2: Scan */}
                    <div className="adm-qr-step">
                      <div className={`adm-qr-step-num${(verifyResult || selected.qrStatus) ? " adm-qr-step-num--done" : ""}`}>
                        {(verifyResult || selected.qrStatus) ? "✓" : "2"}
                      </div>
                      <div className="adm-qr-step-body">
                        <p className="adm-qr-step-lbl">Scan Returned Item</p>
                        {!verifyResult && !selected.qrStatus ? (
                          <button
                            className={`adm-qr-scan-btn${scanning ? " adm-qr-scan-btn--scanning" : ""}`}
                            onClick={scanQR}
                            disabled={scanning || selected.status === "approved" || selected.status === "rejected"}
                          >
                            {scanning
                              ? <><span className="adm-qr-scan-spinner" /> Scanning…</>
                              : <><IcQr /> Scan QR Code</>}
                          </button>
                        ) : (
                          <div className="adm-qr-scanned-row">
                            <code className={`adm-qr-code-chip adm-qr-code-chip--${
                              (verifyResult || selected.qrStatus) === "valid" ? "valid" : "invalid"
                            }`}>
                              {selected.scannedQr}
                            </code>
                            {verifyResult === "invalid" && (
                              <button className="adm-qr-rescan-btn" onClick={() => setVerifyResult(null)}>↺ Re-scan</button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Step 3: Result */}
                    {(verifyResult || selected.qrStatus) && (() => {
                      const res     = verifyResult || selected.qrStatus;
                      const isMatch = res === "valid";
                      const isUsed  = res === "used";
                      return (
                        <div className="adm-qr-step adm-qr-step--last">
                          <div className={`adm-qr-step-num ${isMatch ? "adm-qr-step-num--match" : isUsed ? "adm-qr-step-num--used" : "adm-qr-step-num--mismatch"}`}>
                            {isUsed ? "—" : isMatch ? "✓" : "✗"}
                          </div>
                          <div className="adm-qr-step-body">
                            <p className="adm-qr-step-lbl">Verification Result</p>
                            <div className={`adm-qr-result-card adm-qr-result-card--${isMatch ? "match" : isUsed ? "used" : "mismatch"}`}>
                              <p className="adm-qr-result-card-title">
                                {isUsed
                                  ? `Already ${selected.status}`
                                  : isMatch
                                    ? "QR Match — Item Verified"
                                    : "QR Mismatch — Item Not Verified"}
                              </p>
                              <p className="adm-qr-result-card-desc">
                                {isUsed
                                  ? "This return has already been resolved. No further action needed."
                                  : isMatch
                                    ? "Scanned code matches the registered unit. This item is genuine."
                                    : "Scanned code does not match. Return has been flagged as suspicious."}
                              </p>
                            </div>
                          </div>
                        </div>
                      );
                    })()}
                  </div>

                  {/* Decision footer */}
                  <div className="adm-qr-footer">
                    {(selected.status === "approved" || selected.status === "rejected") ? (
                      <div className={`adm-qr-resolved adm-qr-resolved--${selected.status}`}>
                        <div className="adm-qr-resolved-ico">
                          {selected.status === "approved" ? "✓" : "✗"}
                        </div>
                        <div>
                          <p className="adm-qr-resolved-title">
                            Return {selected.status === "approved" ? "Approved" : "Rejected"}
                          </p>
                          <p className="adm-qr-resolved-sub">This request has been resolved and closed.</p>
                        </div>
                      </div>
                    ) : (
                      <>
                        <p className={`adm-qr-footer-hint${(verifyResult === "valid" || selected.qrStatus === "valid") ? " adm-qr-footer-hint--ready" : ""}`}>
                          {(verifyResult === "valid" || selected.qrStatus === "valid")
                            ? "✓ QR verified — you may now approve or reject."
                            : "Scan the QR code above to enable the decision."}
                        </p>
                        <div className="adm-qr-footer-btns">
                          <button
                            className="adm-qr-approve-btn"
                            disabled={verifyResult !== "valid" && selected.qrStatus !== "valid"}
                            onClick={approveReturn}
                          >
                            <IcCheck /> Approve Return
                          </button>
                          <button className="adm-qr-reject-btn" onClick={rejectReturn}>
                            ✕ Reject
                          </button>
                        </div>
                      </>
                    )}
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

/* ═══════════════════════════════════════════════════════════
   MOCK DATA: Payment Approval & Receipt Verification
   ═══════════════════════════════════════════════════════════ */
const PENDING_PAYMENT_ORDER = {
  id: "ORD-015",
  customer: "Tiara Putri",
  email: "tiara@gmail.com",
  phone: "082198765432",
  date: "14 Apr 2025",
  items: [
    { name: "Gentle Foaming Cleanser", qty: 1, price: 89000 },
    { name: "Rose Water Mist",         qty: 1, price: 85000 },
  ],
  total: 174000,
  payment: "BCA Transfer",
  address: "Jl. Pemuda No. 21, Semarang",
  fraud: { status: "safe" },
};

const VALID_RECEIPT_DATA = {
  orderId:         "ORD-017",
  customer:        "Dewi Larasati",
  total:           335000,
  date:            "14 April 2025",
  verifiedAt:      "16 April 2025, 16:08",
  signatureStatus: "Cocok dengan database ✓",
};

const VERIFY_HISTORY_DATA = [
  { id: "VRF-001", orderId: "ORD-017", customer: "Dewi Larasati",   date: "16 Apr 2025 16:08", result: "valid",   admin: "Admin", file: "receipt-ORD-017.pdf"           },
  { id: "VRF-002", orderId: "ORD-012", customer: "Maya Sari",       date: "15 Apr 2025 09:30", result: "invalid", admin: "Admin", file: "bukti-transfer-edited.pdf"      },
  { id: "VRF-003", orderId: "ORD-018", customer: "Fitri Handayani", date: "14 Apr 2025 14:22", result: "valid",   admin: "Admin", file: "receipt-ORD-018.pdf"           },
  { id: "VRF-004", orderId: "ORD-011", customer: "Sara Tancredi",   date: "13 Apr 2025 11:15", result: "invalid", admin: "Admin", file: "receipt-modified.pdf"          },
  { id: "VRF-005", orderId: "ORD-001", customer: "Bunga Citra",     date: "12 Apr 2025 08:45", result: "valid",   admin: "Admin", file: "receipt-ORD-001.pdf"           },
  { id: "VRF-006", orderId: "ORD-016", customer: "Ayu Rahayu",      date: "11 Apr 2025 16:50", result: "valid",   admin: "Admin", file: "receipt-ORD-016.pdf"           },
];

/* ═══════════════════════════════════════════════════════════
   SECTION: PAYMENT APPROVAL
   ═══════════════════════════════════════════════════════════ */
function PaymentApproval() {
  const [approveModal, setApproveModal] = useState(false);
  const [rejectModal,  setRejectModal]  = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [approveStep,  setApproveStep]  = useState("confirm"); // confirm | loading | success

  const handleApprove = () => {
    setApproveStep("loading");
    setTimeout(() => setApproveStep("success"), 2500);
  };

  const order = PENDING_PAYMENT_ORDER;

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Verifikasi Pembayaran</h2>
          <p className="adm-section-sub">Review dan setujui pembayaran customer</p>
        </div>
        <div className="adm-pa-pending-badge">
          <IcCreditCard /> 1 pesanan menunggu persetujuan
        </div>
      </div>

      {/* ── Order Ticket ── */}
      <div className="adm-pa-ticket">

        {/* Ticket header bar */}
        <div className="adm-pa-ticket-bar">
          <div className="adm-pa-ticket-bar-left">
            <span className="adm-pa-ticket-id">#{order.id}</span>
            <span className="adm-pa-ticket-date">{order.date}</span>
          </div>
          <span className="adm-status-pill" style={{ color: "#b45309", background: "rgba(224,154,58,0.12)", fontSize: 12.5, fontWeight: 700 }}>
            ● Menunggu Persetujuan
          </span>
        </div>

        {/* Ticket body */}
        <div className="adm-pa-ticket-body">

          {/* ── LEFT: customer + items + address ── */}
          <div className="adm-pa-body-left">

            <div className="adm-pa-block">
              <p className="adm-pa-block-label">Informasi Customer</p>
              <div className="adm-pa-customer">
                <Avatar name={order.customer} size={48} />
                <div>
                  <p className="adm-pa-customer-name">{order.customer}</p>
                  <p className="adm-pa-customer-sub">{order.email}</p>
                  <p className="adm-pa-customer-sub">{order.phone}</p>
                </div>
              </div>
            </div>

            <div className="adm-pa-block">
              <p className="adm-pa-block-label">Produk Dipesan</p>
              <div className="adm-pa-items">
                {order.items.map((item, i) => (
                  <div key={i} className="adm-pa-item">
                    <div className="adm-pa-item-info">
                      <span className="adm-pa-item-name">{item.name}</span>
                      <span className="adm-pa-item-qty">×{item.qty}</span>
                    </div>
                    <span className="adm-pa-item-price">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="adm-pa-total-row">
                <span>Total Pembayaran</span>
                <span className="adm-pa-total-val">{fmt(order.total)}</span>
              </div>
            </div>

            <div className="adm-pa-block adm-pa-block--last">
              <p className="adm-pa-block-label">Alamat Pengiriman</p>
              <p className="adm-pa-shipping-val">{order.address}</p>
            </div>
          </div>

          {/* ── Vertical divider ── */}
          <div className="adm-pa-vdivider" />

          {/* ── RIGHT: proof + fraud + actions ── */}
          <div className="adm-pa-body-right">

            <div className="adm-pa-block">
              <p className="adm-pa-block-label">Bukti Transfer</p>
              <div className="adm-pa-proof">
                <div className="adm-pa-proof-icon-wrap">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>
                  </svg>
                </div>
                <div>
                  <p className="adm-pa-proof-method">{order.payment}</p>
                  <p className="adm-pa-proof-time">15 Apr 2025 · 14:32 WIB</p>
                  <p className="adm-pa-proof-amount">{fmt(order.total)}</p>
                </div>
              </div>
            </div>

            <div className="adm-pa-block">
              <p className="adm-pa-block-label">Fraud Monitoring</p>
              {order.fraud.status === "safe" ? (
                <div className="adm-pa-fraud adm-pa-fraud--safe">
                  <div className="adm-pa-fraud-ico">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/></svg>
                  </div>
                  <div>
                    <p className="adm-pa-fraud-title">Transaksi Aman</p>
                    <p className="adm-pa-fraud-desc">Tidak ada aktivitas mencurigakan terdeteksi</p>
                  </div>
                </div>
              ) : (
                <div className="adm-pa-fraud adm-pa-fraud--flagged">
                  <div className="adm-pa-fraud-ico">
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  </div>
                  <div>
                    <p className="adm-pa-fraud-title">Peringatan Fraud</p>
                    <p className="adm-pa-fraud-desc">{order.fraud.reason}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="adm-pa-block adm-pa-block--last">
              <p className="adm-pa-block-label">Keputusan</p>
              <div className="adm-pa-actions">
                <button
                  className="adm-pa-approve-btn"
                  onClick={() => { setApproveModal(true); setApproveStep("confirm"); }}
                >
                  <IcCheck /> Approve Pembayaran
                </button>
                <button className="adm-pa-reject-btn" onClick={() => setRejectModal(true)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  Tolak Pembayaran
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ════ MODAL APPROVE ════ */}
      {approveModal && (
        <div className="adm-modal-overlay" onClick={() => approveStep !== "loading" && setApproveModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>

            {approveStep === "confirm" && <>
              <div className="adm-modal-header">
                <h3>Konfirmasi Persetujuan</h3>
                <button className="adm-modal-close" onClick={() => setApproveModal(false)}>✕</button>
              </div>
              <div className="adm-modal-body">
                <p>Yakin ingin menyetujui pembayaran <strong>{fmt(order.total)}</strong> dari <strong>{order.customer}</strong>?</p>
                <p className="adm-modal-hint">E-Receipt akan otomatis digenerate dan siap diunduh oleh customer setelah approval.</p>
              </div>
              <div className="adm-modal-footer">
                <button className="adm-pa-approve-btn" onClick={handleApprove}><IcCheck /> Ya, Setujui</button>
                <button className="adm-ghost-btn" onClick={() => setApproveModal(false)}>Batal</button>
              </div>
            </>}

            {approveStep === "loading" && (
              <div className="adm-modal-center">
                <div className="adm-modal-spinner" />
                <p className="adm-modal-loading-title">Memproses pembayaran…</p>
                <p className="adm-modal-loading-sub">Sedang generate E-Receipt untuk customer</p>
              </div>
            )}

            {approveStep === "success" && (
              <div className="adm-modal-center">
                <div className="adm-modal-success-icon">
                  <IcCheck />
                </div>
                <h3 className="adm-modal-success-title">Pembayaran Disetujui!</h3>
                <p className="adm-modal-success-sub">E-Receipt berhasil digenerate dan tersedia untuk customer.</p>
                <div className="adm-modal-receipt-badge">
                  <IcReceipt /> E-Receipt #{order.id} siap
                </div>
                <div className="adm-modal-footer" style={{marginTop:20}}>
                  <button className="adm-pa-approve-btn" onClick={() => setApproveModal(false)}>
                    <IcReceipt /> Lihat Receipt
                  </button>
                  <button className="adm-ghost-btn" onClick={() => setApproveModal(false)}>
                    Kembali ke Dashboard
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ════ MODAL REJECT ════ */}
      {rejectModal && (
        <div className="adm-modal-overlay" onClick={() => setRejectModal(false)}>
          <div className="adm-modal" onClick={e => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3>Tolak Pembayaran</h3>
              <button className="adm-modal-close" onClick={() => setRejectModal(false)}>✕</button>
            </div>
            <div className="adm-modal-body">
              <p style={{marginBottom:12}}>Masukkan alasan penolakan pembayaran:</p>
              <textarea
                className="adm-modal-textarea"
                rows={4}
                placeholder="Contoh: Bukti transfer tidak sesuai, nominal tidak cocok, dll."
                value={rejectReason}
                onChange={e => setRejectReason(e.target.value)}
              />
            </div>
            <div className="adm-modal-footer">
              <button
                className="adm-pa-reject-btn"
                onClick={() => setRejectModal(false)}
                disabled={!rejectReason.trim()}
              >
                Konfirmasi Tolak
              </button>
              <button className="adm-ghost-btn" onClick={() => setRejectModal(false)}>Batal</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: RECEIPT VERIFY  ← HALAMAN PALING PENTING
   Admin upload PDF receipt → sistem ekstrak hidden signature
   → tampilkan hasil VALID atau INVALID
   ═══════════════════════════════════════════════════════════ */
function ReceiptVerify() {
  const [file,      setFile]      = useState(null);
  const [dragOver,  setDragOver]  = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [result,    setResult]    = useState(null); // null | "valid" | "invalid"

  /* Simulasi proses verifikasi */
  const runVerify = (simulatedResult) => {
    setVerifying(true);
    setResult(null);
    setTimeout(() => {
      setVerifying(false);
      setResult(simulatedResult);
    }, 2200);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const f = e.dataTransfer.files[0];
    if (f) { setFile(f); setResult(null); }
  };

  const handleFileInput = (e) => {
    const f = e.target.files[0];
    if (f) { setFile(f); setResult(null); }
  };

  const handleVerify = () => runVerify("valid"); // default: anggap valid bila upload manual

  const simulateValid   = () => { setFile({ name: "receipt-ORD-2024-001.pdf" }); runVerify("valid"); };
  const simulateInvalid = () => { setFile({ name: "receipt-tampered.pdf" });     runVerify("invalid"); };

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Verifikasi Keaslian E-Receipt</h2>
          <p className="adm-section-sub">Upload e-receipt untuk memverifikasi keaslian tanda tangan digital</p>
        </div>
      </div>

      <div className="adm-rv-layout">

        {/* ── Upload area ── */}
        <div className="adm-card adm-rv-upload-card">
          <h3 className="adm-card-title" style={{marginBottom:20}}>Upload E-Receipt</h3>

          {/* Drag & drop zone */}
          <div
            className={`adm-rv-dropzone${dragOver ? " adm-rv-dropzone--over" : ""}`}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => document.getElementById("rv-file-input").click()}
          >
            <div className="adm-rv-drop-icon">
              <svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            </div>
            <p className="adm-rv-drop-text">Drag &amp; drop file PDF di sini</p>
            <p className="adm-rv-drop-sub">atau klik untuk pilih file</p>
            <button className="adm-rv-browse-btn" type="button" onClick={e => { e.stopPropagation(); document.getElementById("rv-file-input").click(); }}>
              Pilih File
            </button>
            <p className="adm-rv-drop-hint">Hanya file PDF yang diterima</p>
          </div>
          <input
            id="rv-file-input"
            type="file"
            accept=".pdf"
            style={{ display: "none" }}
            onChange={handleFileInput}
          />

          {/* File terpilih */}
          {file && !verifying && (
            <div className="adm-rv-file-preview">
              <IcReceipt />
              <span className="adm-rv-file-name">{file.name}</span>
              <button className="adm-rv-file-remove" onClick={() => { setFile(null); setResult(null); }}>✕</button>
            </div>
          )}

          {/* Tombol verifikasi */}
          {file && !verifying && !result && (
            <button className="adm-rv-verify-btn" onClick={handleVerify}>
              Verifikasi Sekarang
            </button>
          )}

          {/* Loading state */}
          {verifying && (
            <div className="adm-rv-verifying">
              <div className="adm-modal-spinner" />
              <span>Mengekstrak digital signature…</span>
            </div>
          )}

          {/* ── Demo/Testing toggle buttons ── */}
          <div className="adm-rv-demo">
            <p className="adm-rv-demo-label">Demo / Testing:</p>
            <div className="adm-rv-demo-row">
              <button className="adm-rv-sim-btn adm-rv-sim--valid"   onClick={simulateValid}>Simulasi Valid</button>
              <button className="adm-rv-sim-btn adm-rv-sim--invalid" onClick={simulateInvalid}>Simulasi Invalid</button>
            </div>
          </div>
        </div>

        {/* ── Hasil Verifikasi ── */}
        {result && (
          <div className="adm-rv-result">

            {result === "valid" ? (
              <>
                {/* Banner VALID */}
                <div className="adm-rv-banner adm-rv-banner--valid">
                  <div className="adm-rv-banner-icon">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                  <div>
                    <h2 className="adm-rv-result-title">E-Receipt VALID ✓</h2>
                    <p className="adm-rv-result-sub">Tanda tangan digital berhasil diverifikasi</p>
                  </div>
                </div>

                {/* Detail terverifikasi */}
                <div className="adm-card adm-rv-detail-card">
                  <h3 className="adm-card-title" style={{marginBottom:16}}>Informasi Terverifikasi</h3>
                  {[
                    ["Order ID",           VALID_RECEIPT_DATA.orderId],
                    ["Nama Customer",      VALID_RECEIPT_DATA.customer],
                    ["Total Pembayaran",   fmt(VALID_RECEIPT_DATA.total)],
                    ["Tanggal Transaksi",  VALID_RECEIPT_DATA.date],
                    ["Diverifikasi pada",  VALID_RECEIPT_DATA.verifiedAt],
                    ["Status Signature",   VALID_RECEIPT_DATA.signatureStatus],
                  ].map(([label, val]) => (
                    <div key={label} className="adm-rv-detail-row">
                      <span className="adm-rv-detail-label">{label}</span>
                      <span className="adm-rv-detail-val">{val}</span>
                    </div>
                  ))}
                </div>

                <p className="adm-rv-footer-text adm-rv-footer--valid">
                  ✓ Receipt ini asli dan dikeluarkan oleh sistem careofyou
                </p>
              </>
            ) : (
              <>
                {/* Banner INVALID */}
                <div className="adm-rv-banner adm-rv-banner--invalid">
                  <div className="adm-rv-banner-icon">
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                  </div>
                  <div>
                    <h2 className="adm-rv-result-title">E-Receipt INVALID ✗</h2>
                    <p className="adm-rv-result-sub">Tanda tangan digital tidak ditemukan atau tidak cocok</p>
                  </div>
                </div>

                {/* Detail pemeriksaan */}
                <div className="adm-card adm-rv-detail-card">
                  <h3 className="adm-card-title" style={{marginBottom:16}}>Detail Pemeriksaan</h3>
                  <div className="adm-rv-detail-row">
                    <span className="adm-rv-detail-label">Status</span>
                    <span className="adm-rv-detail-val" style={{color:"#ef4444",fontWeight:700}}>Signature tidak ditemukan dalam file</span>
                  </div>
                  <div style={{marginTop:16}}>
                    <p className="adm-rv-causes-title">Kemungkinan penyebab:</p>
                    <ul className="adm-rv-causes-list">
                      <li>Receipt telah dimodifikasi atau diedit</li>
                      <li>Receipt bukan berasal dari sistem careofyou</li>
                      <li>File PDF telah dikompresi atau dikonversi ulang</li>
                    </ul>
                  </div>
                </div>

                <p className="adm-rv-footer-text adm-rv-footer--invalid">
                  ✗ Receipt ini tidak dapat dipercaya — lakukan investigasi manual
                </p>

                <button className="adm-rv-report-btn">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                  Laporkan ke Log
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SECTION: VERIFY HISTORY
   Riwayat semua verifikasi receipt yang pernah dilakukan admin.
   ═══════════════════════════════════════════════════════════ */
function VerifyHistory() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [query,        setQuery]        = useState("");

  const filtered = VERIFY_HISTORY_DATA.filter(v => {
    const matchStatus = statusFilter === "all" || v.result === statusFilter;
    const q = query.toLowerCase();
    const matchQ = !q || v.orderId.toLowerCase().includes(q) || v.customer.toLowerCase().includes(q);
    return matchStatus && matchQ;
  });

  const validCount   = VERIFY_HISTORY_DATA.filter(v => v.result === "valid").length;
  const invalidCount = VERIFY_HISTORY_DATA.filter(v => v.result === "invalid").length;

  const validRate = Math.round((validCount / VERIFY_HISTORY_DATA.length) * 100);
  const circleLen = 2 * Math.PI * 20; // r=20

  return (
    <div className="adm-section">
      <div className="adm-section-header">
        <div>
          <h2 className="adm-section-title">Riwayat Verifikasi Receipt</h2>
          <p className="adm-section-sub">{VERIFY_HISTORY_DATA.length} verifikasi tercatat</p>
        </div>
      </div>

      {/* ── Stat cards ── */}
      <div className="adm-vh-stats">
        <div className="adm-vh-stat-card adm-vh-stat-card--total">
          <div className="adm-vh-stat-icon-wrap adm-vh-stat-icon--brand">
            <IcHistory />
          </div>
          <div>
            <span className="adm-vh-stat-num">{VERIFY_HISTORY_DATA.length}</span>
            <span className="adm-vh-stat-lbl">Total Verifikasi</span>
          </div>
        </div>
        <div className="adm-vh-stat-card adm-vh-stat-card--valid">
          <div className="adm-vh-stat-icon-wrap adm-vh-stat-icon--green">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <div>
            <span className="adm-vh-stat-num">{validCount}</span>
            <span className="adm-vh-stat-lbl">Receipt Valid</span>
          </div>
        </div>
        <div className="adm-vh-stat-card adm-vh-stat-card--invalid">
          <div className="adm-vh-stat-icon-wrap adm-vh-stat-icon--red">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </div>
          <div>
            <span className="adm-vh-stat-num">{invalidCount}</span>
            <span className="adm-vh-stat-lbl">Receipt Invalid</span>
          </div>
        </div>
        <div className="adm-vh-stat-card adm-vh-stat-card--rate">
          <div className="adm-vh-rate-circle">
            <svg width="52" height="52" viewBox="0 0 52 52">
              <circle cx="26" cy="26" r="20" fill="none" stroke="#f0e0de" strokeWidth="5"/>
              <circle
                cx="26" cy="26" r="20" fill="none"
                stroke="#22c55e" strokeWidth="5"
                strokeDasharray={`${circleLen * validRate / 100} ${circleLen}`}
                strokeLinecap="round"
                transform="rotate(-90 26 26)"
              />
              <text x="26" y="30" textAnchor="middle" fontSize="12" fontWeight="800" fill="#2d2d2d">{validRate}%</text>
            </svg>
          </div>
          <div>
            <span className="adm-vh-stat-num" style={{color:"#15803d"}}>{validRate}%</span>
            <span className="adm-vh-stat-lbl">Tingkat Valid</span>
          </div>
        </div>
      </div>

      {/* ── Filter bar ── */}
      <div className="adm-vh-filter-row">
        <div className="adm-search-bar" style={{flex:1}}>
          <IcSearch />
          <input
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Cari Order ID atau nama customer…"
            className="adm-search-input"
          />
          {query && <button className="adm-search-clear" onClick={() => setQuery("")}>✕</button>}
        </div>
        <div className="adm-vh-filter-pills">
          {[["all","Semua"],["valid","Valid"],["invalid","Invalid"]].map(([val, lbl]) => (
            <button
              key={val}
              className={`adm-vh-pill${statusFilter === val ? " adm-vh-pill--active" : ""}${val !== "all" ? ` adm-vh-pill--${val}` : ""}`}
              onClick={() => setStatusFilter(val)}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* ── Card list ── */}
      <div className="adm-vh-list">
        {filtered.length === 0 ? (
          <div className="adm-card" style={{padding:"32px", textAlign:"center", color:"var(--adm-text-3)"}}>
            Tidak ada data ditemukan.
          </div>
        ) : filtered.map((v, i) => (
          <div key={v.id} className={`adm-vh-item adm-vh-item--${v.result}`}>
            <span className="adm-vh-item-num">{String(i + 1).padStart(2, "0")}</span>
            <div className="adm-vh-item-customer">
              <Avatar name={v.customer} size={36} />
              <div>
                <p className="adm-vh-item-name">{v.customer}</p>
                <p className="adm-vh-item-sub">{v.orderId} · {v.file}</p>
              </div>
            </div>
            <div className="adm-vh-item-date">
              <p className="adm-vh-item-date-val">{v.date.split(" ").slice(0, 3).join(" ")}</p>
              <p className="adm-vh-item-date-time">{v.date.split(" ").slice(3).join(" ")}</p>
            </div>
            <div className={`adm-vh-result-badge adm-vh-result-badge--${v.result}`}>
              {v.result === "valid"
                ? <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> Valid</>
                : <><svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg> Invalid</>
              }
            </div>
            <button className="adm-act-btn adm-act-btn--edit" title="Lihat Detail">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════
   SIDEBAR NAV CONFIG
   ═══════════════════════════════════════════════════════════ */
const NAV_ITEMS = [
  { id: "dashboard",       label: "Dashboard",        icon: <IcGrid />       },
  { id: "orders",          label: "Pesanan",           icon: <IcOrders />     },
  { id: "payment-approval",label: "Approval Bayar",   icon: <IcCreditCard /> },
  { id: "products",        label: "Produk",            icon: <IcProducts />   },
  { id: "customers",       label: "Pelanggan",         icon: <IcCustomers />  },
  { id: "returns",         label: "Return Verify",     icon: <IcReturn />     },
  { id: "receipt-verify",  label: "Verifikasi Receipt",icon: <IcShield />     },
  { id: "verify-history",  label: "Riwayat Verifikasi",icon: <IcHistory />    },
  { id: "notifications",   label: "Notifications",     icon: <IcNotif />      },
  { id: "settings",        label: "Pengaturan",        icon: <IcSettings />   },
];

/* ═══════════════════════════════════════════════════════════
   MAIN ADMIN PAGE
   ═══════════════════════════════════════════════════════════ */
export default function AdminPage() {
  const navigate = useNavigate();
  const [active, setActive] = useState("dashboard");
  const [query,  setQuery]  = useState("");

  const pendingOrders  = MOCK_ORDERS.filter(o => o.status === "pending").length;
  const unreadNotifs   = MOCK_NOTIFICATIONS.filter(n => !n.read).length;
  const pendingReturns = MOCK_RETURN_REQUESTS.filter(r => r.status === "pending" || r.status === "flagged").length;

  const renderSection = () => {
    switch (active) {
      case "dashboard": return <Dashboard setActive={setActive} />;
      case "orders":    return <Orders />;
      case "products":  return <Products />;
      case "customers": return <Customers />;
      case "payment-approval": return <PaymentApproval />;
      case "receipt-verify":   return <ReceiptVerify />;
      case "verify-history":   return <VerifyHistory />;
      case "returns":          return <Returns />;
      case "notifications":    return <Notifications />;
      case "settings":         return <Settings />;
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
              {item.id === "returns" && pendingReturns > 0 && (
                <span className="adm-nav-badge adm-nav-badge--rose">{pendingReturns}</span>
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
              {pendingOrders > 0 && (
                <span className="adm-notif-dot">{pendingOrders}</span>
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
