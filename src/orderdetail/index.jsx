import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { PRODUCTS } from "../data/products.js";

/* ─── Helper ───────────────────────────────────────────────── */
function fmt(n) {
  return "Rp " + n.toLocaleString("id-ID");
}

/* ─── Dummy Order Data ─────────────────────────────────────── */
const ORDER = {
  id: "ORD-017",
  status: "Approved",
  date: "14 April 2025",
  items: [
    { name: "Hyaluronic Acid Serum",   qty: 1, price: 189000 },
    { name: "Ceramide Barrier Cream",  qty: 1, price: 146000 },
  ],
  total: 335000,
  recipient: "Dewi Larasati",
  address: "Jl. Diponegoro No. 7, Medan",
  payment: "BNI Transfer",
};

/* ─── Status Config ────────────────────────────────────────── */
const STATUS_CONFIG = {
  Approved:  { label: "Disetujui",  color: "#22c55e", bg: "rgba(34,197,94,0.12)"   },
  Packaging: { label: "Dikemas",    color: "#4a9fd4", bg: "rgba(74,159,212,0.12)"  },
  Shipped:   { label: "Dikirim",    color: "#8b5cf6", bg: "rgba(139,92,246,0.12)"  },
  Delivered: { label: "Terkirim",   color: "#22c55e", bg: "rgba(34,197,94,0.12)"   },
  Pending:   { label: "Menunggu",   color: "#e09a3a", bg: "rgba(224,154,58,0.12)"  },
};

const ORDER_STEPS = [
  { key: "Pending",   label: "Menunggu",  icon: "🕐" },
  { key: "Approved",  label: "Disetujui", icon: "✓"  },
  { key: "Packaging", label: "Dikemas",   icon: "📦" },
  { key: "Shipped",   label: "Dikirim",   icon: "🚚" },
  { key: "Delivered", label: "Sampai",    icon: "🎉" },
];
const STEP_ORDER = ORDER_STEPS.map(s => s.key);

const isReceiptAvailable = (status) =>
  ["Approved", "Packaging", "Shipped", "Delivered"].includes(status);

/* ─── Download E-Receipt ───────────────────────────────────── */
function buildReceiptHtml(order, logoDataUrl = "") {
  const subtotal = order.items.reduce((s, i) => s + i.price * i.qty, 0);
  const fmtID = (n) => "Rp " + n.toLocaleString("id-ID");
  const logoTag = logoDataUrl
    ? `<img src="${logoDataUrl}" alt="careofyou" class="rc-logo-img" />`
    : `<div class="rc-logo-text">careofyou</div>`;

  const itemRows = order.items
    .map(
      (item) => `
      <div class="rc-item">
        <div class="rc-item-dot"></div>
        <div class="rc-item-left">
          <span class="rc-item-name">${item.name}</span>
          <span class="rc-item-qty">${item.qty} pcs × ${fmtID(item.price)}</span>
        </div>
        <span class="rc-item-total">${fmtID(item.price * item.qty)}</span>
      </div>`
    )
    .join("");

  return `<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8" />
  <title>E-Receipt careofyou — ${order.id}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: linear-gradient(135deg, #fdf0ef 0%, #fff5f3 50%, #fdf0ef 100%);
      min-height: 100vh;
      display: flex;
      justify-content: center;
      align-items: flex-start;
      padding: 32px 16px 48px;
    }
    .receipt {
      background: white;
      width: 100%;
      max-width: 480px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 8px 48px rgba(201,114,105,0.2), 0 2px 12px rgba(0,0,0,0.08);
    }
    @media print {
      html, body {
        margin: 0; padding: 0;
        background: white !important;
        display: block;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
      }
      .receipt {
        box-shadow: none;
        border-radius: 0;
        max-width: 100%;
        width: 100%;
        page-break-inside: avoid;
      }
    }
    /* ── Header ── */
    .rc-head {
      background: linear-gradient(135deg, #d6867c 0%, #c97269 40%, #b05a52 100%);
      padding: 28px 24px 20px;
      text-align: center;
      color: white;
      position: relative;
      overflow: hidden;
    }
    .rc-head::before {
      content: "";
      position: absolute;
      top: -40px; right: -40px;
      width: 130px; height: 130px;
      border-radius: 50%;
      background: rgba(255,255,255,0.08);
    }
    .rc-head::after {
      content: "";
      position: absolute;
      bottom: -25px; left: -25px;
      width: 90px; height: 90px;
      border-radius: 50%;
      background: rgba(255,255,255,0.06);
    }
    .rc-logo-img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      object-fit: cover;
      display: block;
      margin: 0 auto 10px;
      position: relative; z-index: 1;
      box-shadow: 0 4px 20px rgba(0,0,0,0.2), 0 0 0 4px rgba(255,255,255,0.3);
    }
    .rc-logo-text {
      font-size: 26px;
      font-weight: 900;
      letter-spacing: 1.5px;
      margin-bottom: 6px;
      position: relative; z-index: 1;
    }
    .rc-tagline {
      font-size: 10px;
      letter-spacing: 2.5px;
      text-transform: uppercase;
      opacity: 0.85;
      position: relative; z-index: 1;
    }
    .rc-head-id {
      display: inline-block;
      margin-top: 10px;
      background: rgba(255,255,255,0.18);
      border: 1px solid rgba(255,255,255,0.3);
      border-radius: 50px;
      padding: 4px 14px;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.5px;
      position: relative; z-index: 1;
    }
    /* ── Success banner ── */
    .rc-success {
      background: linear-gradient(90deg, #f0fdf4, #ecfdf5);
      border-bottom: 1.5px dashed #86efac;
      padding: 14px 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      color: #15803d;
      font-size: 13.5px;
      font-weight: 700;
    }
    .rc-success-dot {
      width: 24px; height: 24px;
      background: linear-gradient(135deg, #22c55e, #16a34a);
      border-radius: 50%;
      display: flex; align-items: center; justify-content: center;
      color: white;
      font-size: 13px;
      font-weight: 900;
      flex-shrink: 0;
      box-shadow: 0 2px 8px rgba(34,197,94,0.35);
    }
    /* ── Info grid ── */
    .rc-body { padding: 20px 20px 0; }
    .rc-section-label {
      font-size: 10px;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      color: #c97269;
      margin-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .rc-section-label::after {
      content: "";
      flex: 1;
      height: 1px;
      background: #f0d5d2;
    }
    .rc-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
      margin-bottom: 18px;
    }
    .rc-info-box {
      background: linear-gradient(135deg, #fffaf9, #fdf5f3);
      border-radius: 10px;
      padding: 11px 13px;
      border: 1.5px solid #f0d5d2;
    }
    .rc-info-box-label { font-size: 10px; color: #b0a8a6; font-weight: 700; text-transform: uppercase; letter-spacing: 0.4px; margin-bottom: 4px; }
    .rc-info-box-val   { font-size: 12.5px; font-weight: 800; color: #2d2d2d; line-height: 1.3; }
    /* ── Items ── */
    .rc-items { margin-bottom: 14px; display: flex; flex-direction: column; gap: 7px; }
    .rc-item {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 11px 14px;
      background: linear-gradient(135deg, #fffaf9, #fdf5f3);
      border-radius: 10px;
      border: 1.5px solid #f0d5d2;
    }
    .rc-item-dot {
      width: 8px; height: 8px;
      border-radius: 50%;
      background: linear-gradient(135deg, #d6867c, #c97269);
      flex-shrink: 0;
    }
    .rc-item-left { display: flex; flex-direction: column; gap: 2px; flex: 1; }
    .rc-item-name  { font-size: 13px; font-weight: 700; color: #2d2d2d; }
    .rc-item-qty   { font-size: 11px; color: #b0a8a6; font-weight: 500; }
    .rc-item-total { font-size: 13.5px; font-weight: 900; color: #c97269; white-space: nowrap; }
    /* ── Summary ── */
    .rc-summary {
      border-top: 1.5px dashed #f0d5d2;
      padding: 12px 0;
      margin: 0 20px;
    }
    .rc-summary-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 13px;
      color: #7a7a7a;
      margin-bottom: 6px;
    }
    .rc-summary-row:last-child { margin-bottom: 0; }
    /* ── Total ── */
    .rc-total-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 16px 20px;
      background: linear-gradient(135deg, rgba(201,114,105,0.1) 0%, rgba(201,114,105,0.05) 100%);
      border-top: 2px solid #f0d5d2;
      margin-top: 4px;
    }
    .rc-total-label { font-size: 14px; font-weight: 700; color: #2d2d2d; }
    .rc-total-val   { font-size: 24px; font-weight: 900; color: #c97269; letter-spacing: -0.5px; }
    /* ── Barcode ── */
    .rc-barcode-wrap {
      padding: 18px 20px 14px;
      text-align: center;
      border-top: 1px solid #f5eeec;
      background: #fffcfb;
    }
    .rc-barcode {
      display: flex;
      justify-content: center;
      align-items: flex-end;
      gap: 1.5px;
      height: 44px;
      margin-bottom: 8px;
    }
    .rc-bar { background: #2d2d2d; border-radius: 1px; }
    .rc-order-ref {
      font-size: 10.5px;
      color: #b0a8a6;
      font-weight: 600;
      letter-spacing: 2px;
      font-variant-numeric: tabular-nums;
    }
    /* ── Footer ── */
    .rc-footer {
      background: linear-gradient(135deg, #fdf0ef, #fff5f3);
      border-top: 1.5px solid #f0d5d2;
      padding: 16px 24px;
      text-align: center;
    }
    .rc-footer-main { font-size: 13.5px; color: #2d2d2d; font-weight: 700; margin-bottom: 4px; }
    .rc-footer-sub  { font-size: 11px; color: #b0a8a6; font-weight: 500; }
    .rc-footer-brand {
      margin-top: 10px;
      font-size: 10px;
      color: #c97269;
      font-weight: 700;
      letter-spacing: 1px;
      text-transform: uppercase;
      opacity: 0.7;
    }
  </style>
</head>
<body>
  <div class="receipt">
    <!-- Header -->
    <div class="rc-head">
      ${logoTag}
      <div class="rc-tagline">Struk Pembelian Resmi</div>
      <div class="rc-head-id">${order.id}</div>
    </div>

    <!-- Success -->
    <div class="rc-success">
      <div class="rc-success-dot">✓</div>
      Pembayaran Berhasil Dikonfirmasi
    </div>

    <!-- Body -->
    <div class="rc-body">
      <p class="rc-section-label">Info Transaksi</p>
      <div class="rc-info-grid">
        <div class="rc-info-box">
          <div class="rc-info-box-label">No. Pesanan</div>
          <div class="rc-info-box-val">${order.id}</div>
        </div>
        <div class="rc-info-box">
          <div class="rc-info-box-label">Tanggal</div>
          <div class="rc-info-box-val">${order.date}</div>
        </div>
        <div class="rc-info-box">
          <div class="rc-info-box-label">Metode Bayar</div>
          <div class="rc-info-box-val">${order.payment}</div>
        </div>
        <div class="rc-info-box">
          <div class="rc-info-box-label">Penerima</div>
          <div class="rc-info-box-val">${order.recipient}</div>
        </div>
      </div>

      <p class="rc-section-label">Produk Dipesan</p>
      <div class="rc-items">${itemRows}</div>
    </div>

    <!-- Summary -->
    <div class="rc-summary">
      <div class="rc-summary-row"><span>Subtotal</span><span style="font-weight:700;color:#2d2d2d">${fmtID(subtotal)}</span></div>
      <div class="rc-summary-row"><span>Ongkos Kirim</span><span style="color:#22c55e;font-weight:700">Gratis ✓</span></div>
    </div>

    <div class="rc-total-row">
      <span class="rc-total-label">Total Pembayaran</span>
      <span class="rc-total-val">${fmtID(order.total)}</span>
    </div>

    <!-- Barcode -->
    <div class="rc-barcode-wrap">
      <div class="rc-barcode" id="bcBars"></div>
      <div class="rc-order-ref">${order.id.replace(/-/g, "")} 0 1 7 5 8 3</div>
    </div>

    <!-- Footer -->
    <div class="rc-footer">
      <div class="rc-footer-main">Terima kasih sudah belanja di careofyou 🌸</div>
      <div class="rc-footer-sub">Simpan struk ini sebagai bukti pembelian resmi kamu</div>
      <div class="rc-footer-brand">careofyou.id</div>
    </div>
  </div>

  <script>
    const wrap = document.getElementById('bcBars');
    const seed = "${order.id}".split('').reduce((h,c)=>((h<<5)-h+c.charCodeAt(0))|0, 0);
    const BARS = 58;
    for (let i = 0; i < BARS; i++) {
      const v = Math.abs(seed ^ (i * 2654435761)) % 100;
      const h = 14 + (v % 30);
      const w = v % 3 === 0 ? 3 : v % 2 === 0 ? 2 : 1;
      const bar = document.createElement('div');
      bar.className = 'rc-bar';
      bar.style.cssText = 'width:' + w + 'px;height:' + h + 'px';
      wrap.appendChild(bar);
    }
    window.onload = function() { setTimeout(function() { window.print(); }, 500); };
  </script>
</body>
</html>`;
}

async function handleDownload(order) {
  let logoDataUrl = "";
  try {
    const resp = await fetch("/logo-careofyou.png");
    const blob = await resp.blob();
    logoDataUrl = await new Promise((res) => {
      const r = new FileReader();
      r.onloadend = () => res(r.result);
      r.readAsDataURL(blob);
    });
  } catch (_) {}
  const html = buildReceiptHtml(order, logoDataUrl);
  const win = window.open("", "_blank");
  if (!win) return;
  win.document.write(html);
  win.document.close();
}

/* ─── SVG Icons ────────────────────────────────────────────── */
const DownloadIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

const EyeIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
    <circle cx="12" cy="12" r="3"/>
  </svg>
);

const PDFIcon = () => (
  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
    <polyline points="14 2 14 8 20 8"/>
    <line x1="16" y1="13" x2="8" y2="13"/>
    <line x1="16" y1="17" x2="8" y2="17"/>
  </svg>
);

const BackIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const CheckIcon = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);

/* ── Fake barcode SVG (deterministic) ── */
function Barcode({ value, width = 200, height = 44 }) {
  const BARS = 64;
  const seed = value.split("").reduce((h, c) => ((h << 5) - h + c.charCodeAt(0)) | 0, 0);
  const bars = Array.from({ length: BARS }, (_, i) => {
    const v = Math.abs(seed ^ (i * 2654435761)) % 100;
    return { h: 14 + (v % 30), w: v % 3 === 0 ? 3 : v % 2 === 0 ? 2 : 1 };
  });
  const totalW = bars.reduce((s, b) => s + b.w + 1, 0);
  const scale = width / totalW;

  let x = 0;
  const rects = bars.map((b, i) => {
    const el = (
      <rect
        key={i}
        x={x * scale}
        y={height - b.h}
        width={Math.max(1, b.w * scale - 0.5)}
        height={b.h}
        fill="#2d2d2d"
        rx="0.5"
      />
    );
    x += b.w + 1;
    return el;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} style={{ display: "block" }}>
      {rects}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ════════════════════════════════════════════════════════════ */
export default function OrderDetailPage() {
  const navigate = useNavigate();
  const { cart, cartOpen, setCartOpen, updateQty, removeItem, cartTotal } = useCart();
  const [previewOpen, setPreviewOpen] = useState(false);

  const status       = STATUS_CONFIG[ORDER.status] ?? STATUS_CONFIG.Pending;
  const subtotal     = ORDER.items.reduce((s, i) => s + i.price * i.qty, 0);
  const receiptReady = isReceiptAvailable(ORDER.status);

  return (
    <div className="od-root">
      <Navbar
        activePage=""
        allProducts={PRODUCTS}
        onHomeClick={() => navigate("/")}
        onProductsClick={() => navigate("/products")}
      />

      <main className="od-main">

        {/* ── Back button ── */}
        <button className="od-back-btn" onClick={() => navigate(-1)}>
          <BackIcon /> Kembali ke Pesanan Saya
        </button>

        {/* ── Page header ── */}
        <div className="od-header">
          <div className="od-header-left">
            <h1 className="od-title">Detail Pesanan</h1>
            <p className="od-order-id">#{ORDER.id}</p>
          </div>
          <span
            className="od-status-badge"
            style={{ color: status.color, background: status.bg }}
          >
            <CheckIcon /> {status.label}
          </span>
        </div>

        {/* ── Status Timeline ── */}
        <div className="od-card od-timeline-card">
          <h2 className="od-card-title" style={{ marginBottom: 16 }}>Status Pesanan</h2>
          <div className="od-steps">
            {ORDER_STEPS.map((step, i) => {
              const currentIdx = STEP_ORDER.indexOf(ORDER.status);
              const stepIdx    = STEP_ORDER.indexOf(step.key);
              const isDone     = stepIdx < currentIdx;
              const isActive   = stepIdx === currentIdx;
              const dotClass   = isDone ? "od-step-dot--done" : isActive ? "od-step-dot--active" : "od-step-dot--pending";
              const lblClass   = isDone ? "od-step-label--done" : isActive ? "od-step-label--active" : "od-step-label--pending";
              const lineClass  = i < ORDER_STEPS.length - 1
                ? stepIdx < currentIdx ? "od-step-line--done"
                  : stepIdx === currentIdx ? "od-step-line--active"
                  : "od-step-line--pending"
                : null;
              return (
                <React.Fragment key={step.key}>
                  <div className="od-step">
                    <div className={`od-step-dot ${dotClass}`}>{step.icon}</div>
                    <span className={`od-step-label ${lblClass}`}>{step.label}</span>
                  </div>
                  {i < ORDER_STEPS.length - 1 && (
                    <div className={`od-step-line ${lineClass}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="od-grid">

          {/* ══ LEFT COLUMN ══ */}
          <div className="od-col-main">

            {/* Produk card */}
            <div className="od-card">
              <h2 className="od-card-title">Produk yang Dipesan</h2>
              <div className="od-items">
                {ORDER.items.map((item, i) => (
                  <div key={i} className="od-item">
                    <div className="od-item-img">
                      <span>{item.name[0]}</span>
                    </div>
                    <div className="od-item-info">
                      <p className="od-item-name">{item.name}</p>
                      <p className="od-item-qty">Qty: {item.qty}</p>
                    </div>
                    <div className="od-item-right">
                      <p className="od-item-unit">{fmt(item.price)} / pcs</p>
                      <p className="od-item-subtotal">{fmt(item.price * item.qty)}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ringkasan pembayaran */}
            <div className="od-card">
              <h2 className="od-card-title">Ringkasan Pembayaran</h2>
              <div className="od-summary">
                <div className="od-summary-row">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="od-summary-row">
                  <span>Ongkos Kirim</span>
                  <span className="od-free-ship">Gratis</span>
                </div>
                <div className="od-summary-divider" />
                <div className="od-summary-row od-summary-total">
                  <span>Total</span>
                  <span>{fmt(ORDER.total)}</span>
                </div>
                <div className="od-summary-row od-summary-payment-method">
                  <span>Metode Pembayaran</span>
                  <span>{ORDER.payment}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ══ RIGHT COLUMN ══ */}
          <div className="od-col-side">

            {/* Info pengiriman */}
            <div className="od-card">
              <h2 className="od-card-title">Informasi Pengiriman</h2>
              <div className="od-shipping">
                {[
                  ["Penerima",       ORDER.recipient],
                  ["Alamat",         ORDER.address],
                  ["Tanggal Pesan",  ORDER.date],
                ].map(([label, val]) => (
                  <div key={label} className="od-shipping-row">
                    <span className="od-shipping-label">{label}</span>
                    <span className="od-shipping-val">{val}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* ── E-Receipt section ── */}
            {receiptReady && (
              <div className="od-card od-receipt-card">
                <div className="od-receipt-header">
                  <div className="od-receipt-icon-wrap">
                    <PDFIcon />
                  </div>
                  <div>
                    <h2 className="od-card-title" style={{ marginBottom: 2 }}>E-Receipt</h2>
                    <p className="od-receipt-avail">Tersedia untuk pesanan ini</p>
                  </div>
                </div>

                <p className="od-receipt-desc">
                  Struk pembelian resmi pesananmu sudah siap. Simpan sebagai bukti transaksi.
                </p>

                <div className="od-receipt-actions">
                  <button className="od-btn-download" onClick={() => handleDownload(ORDER)}>
                    <DownloadIcon />
                    Download Struk
                  </button>
                  <button className="od-btn-preview" onClick={() => setPreviewOpen(true)}>
                    <EyeIcon />
                    Preview
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ════════════════════════════════════════════════════
          PREVIEW MODAL
          ════════════════════════════════════════════════════ */}
      {previewOpen && (
        <div className="od-modal-overlay" onClick={() => setPreviewOpen(false)}>
          <div className="od-modal" onClick={e => e.stopPropagation()}>
            <div className="od-modal-header">
              <h3>Preview Struk Belanja</h3>
              <button className="od-modal-close" onClick={() => setPreviewOpen(false)}>✕</button>
            </div>
            <div className="od-modal-body">
              <div className="od-receipt-preview">

                {/* Header */}
                <div className="od-rp-head">
                  <img src="/logo-careofyou.png" alt="careofyou" className="od-rp-logo-img" />
                  <p className="od-rp-tagline">Struk Pembelian Resmi</p>
                  <div className="od-rp-head-id">{ORDER.id}</div>
                </div>

                {/* Success badge */}
                <div className="od-rp-success">
                  <span className="od-rp-success-dot">✓</span>
                  Pembayaran Berhasil Dikonfirmasi
                </div>

                {/* Info grid */}
                <div className="od-rp-info-grid">
                  {[
                    ["No. Pesanan", `#${ORDER.id}`],
                    ["Tanggal",     ORDER.date],
                    ["Metode",      ORDER.payment],
                    ["Penerima",    ORDER.recipient],
                  ].map(([lbl, val]) => (
                    <div key={lbl} className="od-rp-info-box">
                      <p className="od-rp-info-label">{lbl}</p>
                      <p className="od-rp-info-val">{val}</p>
                    </div>
                  ))}
                </div>

                {/* Divider */}
                <div className="od-rp-divider" />

                {/* Items */}
                <p className="od-rp-items-label">Produk</p>
                {ORDER.items.map((item, i) => (
                  <div key={i} className="od-rp-item">
                    <div className="od-rp-item-dot" />
                    <div className="od-rp-item-left">
                      <p className="od-rp-item-name">{item.name}</p>
                      <p className="od-rp-item-qty">{item.qty} pcs × {fmt(item.price)}</p>
                    </div>
                    <span className="od-rp-item-total">{fmt(item.price * item.qty)}</span>
                  </div>
                ))}

                <div className="od-rp-divider" />

                {/* Summary */}
                <div className="od-rp-row">
                  <span>Subtotal</span><span>{fmt(subtotal)}</span>
                </div>
                <div className="od-rp-row">
                  <span>Ongkos Kirim</span>
                  <span style={{ color: "#22c55e", fontWeight: 700 }}>Gratis</span>
                </div>

                {/* Total */}
                <div className="od-rp-total-row">
                  <span>Total Pembayaran</span>
                  <span className="od-rp-total-val">{fmt(ORDER.total)}</span>
                </div>

                {/* Barcode */}
                <div className="od-rp-barcode-wrap">
                  <Barcode value={ORDER.id} width={200} height={40} />
                  <p className="od-rp-barcode-num">{ORDER.id.replace(/-/g, "")} 0 1 7 5</p>
                </div>

                {/* Footer */}
                <div className="od-rp-footer">
                  <p className="od-rp-footer-text">Terima kasih sudah belanja di careofyou 🌸</p>
                  <p className="od-rp-footer-sub">Simpan struk ini sebagai bukti pembelian resmi</p>
                  <p className="od-rp-footer-brand">careofyou.id</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}

      {/* Cart sidebar */}
      {cartOpen && <div className="cart-overlay" onClick={() => setCartOpen(false)} />}
      <div className={`cart-sidebar ${cartOpen ? "cart-sidebar-open" : ""}`}>
        <div className="cart-header">
          <h2 className="cart-title">Shopping Cart</h2>
          <button className="cart-close" onClick={() => setCartOpen(false)}>✕</button>
        </div>
        {cart.length === 0 ? (
          <div className="cart-empty">
            <span className="cart-empty-icon">🛍️</span>
            <p>Keranjangmu kosong</p>
            <button className="cart-shop-btn" onClick={() => { setCartOpen(false); navigate("/"); }}>
              Mulai Belanja
            </button>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <img src={item.image} alt={item.name} className="cart-item-img" />
                  <div className="cart-item-info">
                    <p className="cart-item-name">{item.name}</p>
                    <p className="cart-item-price">{fmt(item.price)}</p>
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
                <span className="cart-total-val">{fmt(cartTotal)}</span>
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

      <Footer />
    </div>
  );
}
