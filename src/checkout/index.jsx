import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { PRODUCTS } from "../data/products.js";

/* ─── Icons ──────────────────────────────────────────────── */
const IconClock = () => (
  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"/>
    <polyline points="12 6 12 12 16 14"/>
  </svg>
);

const IconMapPin = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 1 1 18 0z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);

const IconTag = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
    <line x1="7" y1="7" x2="7.01" y2="7"/>
  </svg>
);
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12"/>
  </svg>
);
const IconStore = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
    <polyline points="9 22 9 12 15 12 15 22"/>
  </svg>
);

/* ─── Static data ────────────────────────────────────────── */
const SAVED_ADDRESSES = [
  { id: 1, label: "Home", name: "Sara Tancredi", phone: "(+98) 9123728167", address: "123 Main Street, New York, NY 10001, USA", isMain: true },
  { id: 2, label: "Office", name: "Sara Tancredi", phone: "(+98) 9123728167", address: "456 Business Ave, Manhattan, NY 10002, USA", isMain: false },
];

const ORDER_ITEMS = [
  { id: 1, brand: "Skintific", name: "5X Ceramide Barrier Repair Moisture Gel", size: "30ml", qty: 1, price: 149000, image: "https://placehold.co/72x72/fce8e6/c4706a?text=Skin" },
  { id: 2, brand: "Some By Mi", name: "AHA BHA PHA 30 Days Miracle Toner", size: "150ml", qty: 1, price: 185000, image: "https://placehold.co/72x72/fdeaea/c4706a?text=Toner" },
];

const DELIVERY_OPTIONS = [
  { id: "instant",  label: "Instant",  desc: "Arrives in 2–4 hours",  fee: 35000 },
  { id: "sameday",  label: "Same Day", desc: "Arrives today by 9 PM", fee: 25000 },
  { id: "regular",  label: "Regular",  desc: "2–3 working days",       fee: 15000 },
  { id: "economy",  label: "Economy",  desc: "4–7 working days",       fee: 8000  },
];

const PAYMENT_METHODS = [
  { id: "bca",   label: "BCA",   type: "bank",   account: "1234-5678-90",    holder: "Careofyou Store" },
  { id: "bni",   label: "BNI",   type: "bank",   account: "0987-6543-21",    holder: "Careofyou Store" },
  { id: "dana",  label: "DANA",  type: "ewallet", account: "0812-3456-7890", holder: "Careofyou Store" },
  { id: "ovo",   label: "OVO",   type: "ewallet", account: "0812-3456-7890", holder: "Careofyou Store" },
  { id: "gopay", label: "GoPay", type: "ewallet", account: "0812-3456-7890", holder: "Careofyou Store" },
];

const fmt = (n) => "Rp " + n.toLocaleString("id-ID");

/* ─── Main component ─────────────────────────────────────── */
export default function CheckoutPage() {
  const navigate = useNavigate();
  const location = useLocation();

  const cartItems = location.state?.cartItems ?? ORDER_ITEMS;

  // Address
  const [addresses, setAddresses] = useState(SAVED_ADDRESSES);
  const [selectedAddr, setSelectedAddr] = useState(SAVED_ADDRESSES.find(a => a.isMain)?.id ?? 1);
  const [showAddrForm, setShowAddrForm] = useState(false);
  const [newAddr, setNewAddr] = useState({ label: "", name: "", phone: "", address: "" });
  const [addrError, setAddrError] = useState("");

  // Delivery
  const [delivery, setDelivery] = useState("regular");

  // Voucher
  const [voucher, setVoucher] = useState("");
  const [appliedVoucher, setAppliedVoucher] = useState(null);
  const [voucherMsg, setVoucherMsg] = useState("");

  // Payment
  const [payment, setPayment] = useState("");

  // Checkout
  const [ordered, setOrdered] = useState(false);

  /* handlers */
  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddr.label || !newAddr.name || !newAddr.phone || !newAddr.address) {
      setAddrError("Please fill in all fields.");
      return;
    }
    const added = { id: Date.now(), ...newAddr, isMain: false };
    setAddresses((prev) => [...prev, added]);
    setSelectedAddr(added.id);
    setNewAddr({ label: "", name: "", phone: "", address: "" });
    setShowAddrForm(false);
    setAddrError("");
  };

  const applyVoucher = () => {
    const code = voucher.trim().toUpperCase();
    if (code === "CARES10") {
      setAppliedVoucher({ code, discount: 0.1, label: "10% off" });
      setVoucherMsg("Voucher applied! 10% discount.");
    } else if (code === "HEMAT20K") {
      setAppliedVoucher({ code, discount: 20000, label: "Rp 20.000 off", flat: true });
      setVoucherMsg("Voucher applied! Rp 20.000 discount.");
    } else {
      setAppliedVoucher(null);
      setVoucherMsg("Invalid voucher code.");
    }
  };

  const removeVoucher = () => { setAppliedVoucher(null); setVoucher(""); setVoucherMsg(""); };

  const subtotal     = cartItems.reduce((s, i) => s + i.price * i.qty, 0);
  const deliveryFee  = DELIVERY_OPTIONS.find(d => d.id === delivery)?.fee ?? 0;
  const discount     = appliedVoucher
    ? (appliedVoucher.flat ? appliedVoucher.discount : Math.round(subtotal * appliedVoucher.discount))
    : 0;
  const total        = subtotal + deliveryFee - discount;

  const handleCheckout = () => {
    if (!payment) { alert("Please select a payment method."); return; }
    setOrdered(true);
  };

  const selectedPayment = PAYMENT_METHODS.find(p => p.id === payment);
  const selectedAddress  = addresses.find(a => a.id === selectedAddr);

  if (ordered) {
    return (
      <div className="co-page">
        <Navbar 
          activePage="checkout"
          allProducts={PRODUCTS}
          onHomeClick={() => navigate("/")}
          onProductsClick={() => navigate("/products")}
        />
        <div className="co-success">
          <div className="co-success-icon"><IconClock /></div>
          <span className="co-success-badge">Pending Review</span>
          <h2 className="co-success-title">Waiting for Admin<br/>Payment Approval</h2>
          <p className="co-success-sub">Please transfer <strong>{fmt(total)}</strong> to:</p>
          <div className="co-success-payment">
            <p className="co-success-bank">{selectedPayment?.label}</p>
            <p className="co-success-account">{selectedPayment?.account}</p>
            <p className="co-success-holder">a.n. {selectedPayment?.holder}</p>
          </div>
          <p className="co-success-note">Once your payment is confirmed by our team, your order will be processed.</p>
          <button className="co-success-home-btn" onClick={() => navigate("/")}>← Home</button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="co-page">

      {/* NAVBAR */}
      <Navbar 
        allProducts={PRODUCTS}
        activePage="checkout"
        onHomeClick={() => navigate("/")}
        onProductsClick={() => navigate("/products")}
      />

      {/* ── MAIN ── */}
      <main className="co-main">
        <div className="co-container">
          <h1 className="co-page-title">Checkout</h1>

          <div className="co-layout">

            {/* ════ LEFT COLUMN ════ */}
            <div className="co-left">

              {/* 1 · SHIPPING ADDRESS */}
              <section className="co-card">
                <div className="co-card-heading">
                  <span className="co-card-icon"><IconMapPin /></span>
                  <h2 className="co-card-title">Shipping Address</h2>
                </div>

                <div className="co-addr-list">
                  {addresses.map((addr) => (
                    <label key={addr.id} className={`co-addr-option${selectedAddr === addr.id ? " co-addr-option--active" : ""}`}>
                      <input
                        type="radio"
                        name="address"
                        className="co-radio"
                        checked={selectedAddr === addr.id}
                        onChange={() => setSelectedAddr(addr.id)}
                      />
                      <div className="co-addr-body">
                        <div className="co-addr-top">
                          <span className="co-addr-label">{addr.label}</span>
                          {addr.isMain && <span className="co-addr-badge">Main</span>}
                        </div>
                        <p className="co-addr-name">{addr.name} · {addr.phone}</p>
                        <p className="co-addr-text">{addr.address}</p>
                      </div>
                    </label>
                  ))}
                </div>

                <button
                  className="co-add-addr-btn"
                  onClick={() => { setShowAddrForm(v => !v); setAddrError(""); }}
                >
                  {showAddrForm ? "Cancel" : "+ Use a different address"}
                </button>

                {showAddrForm && (
                  <form className="co-addr-form" onSubmit={handleAddAddress}>
                    <div className="co-form-row">
                      <div className="co-form-group">
                        <label className="co-form-label">Label</label>
                        <input className="co-input" name="label" placeholder="e.g. Home" value={newAddr.label} onChange={e => setNewAddr({...newAddr, label: e.target.value})} />
                      </div>
                      <div className="co-form-group">
                        <label className="co-form-label">Recipient Name</label>
                        <input className="co-input" name="name" placeholder="Full name" value={newAddr.name} onChange={e => setNewAddr({...newAddr, name: e.target.value})} />
                      </div>
                    </div>
                    <div className="co-form-group">
                      <label className="co-form-label">Phone Number</label>
                      <input className="co-input" name="phone" placeholder="+62 812 3456 7890" value={newAddr.phone} onChange={e => setNewAddr({...newAddr, phone: e.target.value})} />
                    </div>
                    <div className="co-form-group">
                      <label className="co-form-label">Full Address</label>
                      <textarea className="co-input co-textarea" placeholder="Street, City, ZIP, Country" value={newAddr.address} onChange={e => setNewAddr({...newAddr, address: e.target.value})} rows={3}/>
                    </div>
                    {addrError && <p className="co-error">{addrError}</p>}
                    <button type="submit" className="co-save-addr-btn">Save & Use This Address</button>
                  </form>
                )}
              </section>

              {/* 2 · ORDER DETAILS */}
              <section className="co-card">
                <div className="co-card-heading">
                  <span className="co-card-icon"><IconStore /></span>
                  <h2 className="co-card-title">Order Details</h2>
                </div>
                <div className="co-store-name">Careofyou Official Store</div>
                <div className="co-item-list">
                  {cartItems.map(item => (
                    <div key={item.id} className="co-item">
                      <img src={item.image} alt={item.name} className="co-item-img"/>
                      <div className="co-item-info">
                        <p className="co-item-brand">{item.brand ?? item.category}</p>
                        <p className="co-item-name">{item.name}</p>
                        {item.size && <p className="co-item-size">Size: {item.size}</p>}
                      </div>
                      <div className="co-item-right">
                        <p className="co-item-price">{fmt(item.price)}</p>
                        <p className="co-item-qty">Qty: {item.qty}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {/* 3 · DELIVERY */}
              <section className="co-card">
                <h2 className="co-card-title" style={{ marginBottom: 16 }}>Delivery Option</h2>
                <div className="co-delivery-list">
                  {DELIVERY_OPTIONS.map(opt => (
                    <label key={opt.id} className={`co-delivery-option${delivery === opt.id ? " co-delivery-option--active" : ""}`}>
                      <input
                        type="radio"
                        name="delivery"
                        className="co-radio"
                        checked={delivery === opt.id}
                        onChange={() => setDelivery(opt.id)}
                      />
                      <div className="co-delivery-body">
                        <span className="co-delivery-label">{opt.label}</span>
                        <span className="co-delivery-desc">{opt.desc}</span>
                      </div>
                      <span className="co-delivery-fee">{fmt(opt.fee)}</span>
                    </label>
                  ))}
                </div>
              </section>

              {/* 4 · VOUCHER */}
              <section className="co-card">
                <div className="co-card-heading">
                  <span className="co-card-icon"><IconTag /></span>
                  <h2 className="co-card-title">Voucher</h2>
                </div>
                {appliedVoucher ? (
                  <div className="co-voucher-applied">
                    <div className="co-voucher-check"><IconCheck /></div>
                    <div>
                      <p className="co-voucher-code">{appliedVoucher.code}</p>
                      <p className="co-voucher-label">{appliedVoucher.label}</p>
                    </div>
                    <button className="co-voucher-remove" onClick={removeVoucher}>Remove</button>
                  </div>
                ) : (
                  <div className="co-voucher-row">
                    <input
                      className="co-input co-voucher-input"
                      placeholder="Enter voucher code"
                      value={voucher}
                      onChange={e => { setVoucher(e.target.value); setVoucherMsg(""); }}
                      onKeyDown={e => e.key === "Enter" && applyVoucher()}
                    />
                    <button className="co-voucher-btn" onClick={applyVoucher}>Apply</button>
                  </div>
                )}
                {voucherMsg && (
                  <p className={`co-voucher-msg${appliedVoucher ? " co-voucher-msg--ok" : " co-voucher-msg--err"}`}>
                    {voucherMsg}
                  </p>
                )}
                <p className="co-voucher-hint">Try: <code>CARES10</code> or <code>HEMAT20K</code></p>
              </section>

              {/* 5 · PAYMENT METHOD */}
              <section className="co-card">
                <h2 className="co-card-title" style={{ marginBottom: 16 }}>Payment Method</h2>

                <p className="co-payment-group-label">Bank Transfer</p>
                <div className="co-payment-grid">
                  {PAYMENT_METHODS.filter(p => p.type === "bank").map(p => (
                    <label key={p.id} className={`co-payment-option${payment === p.id ? " co-payment-option--active" : ""}`}>
                      <input type="radio" name="payment" className="co-radio" checked={payment === p.id} onChange={() => setPayment(p.id)}/>
                      <span className="co-payment-label">{p.label}</span>
                    </label>
                  ))}
                </div>

                <p className="co-payment-group-label" style={{ marginTop: 16 }}>E-Wallet</p>
                <div className="co-payment-grid">
                  {PAYMENT_METHODS.filter(p => p.type === "ewallet").map(p => (
                    <label key={p.id} className={`co-payment-option${payment === p.id ? " co-payment-option--active" : ""}`}>
                      <input type="radio" name="payment" className="co-radio" checked={payment === p.id} onChange={() => setPayment(p.id)}/>
                      <span className="co-payment-label">{p.label}</span>
                    </label>
                  ))}
                </div>

                {selectedPayment && (
                  <div className="co-payment-detail">
                    <p className="co-payment-detail-title">Transfer to:</p>
                    <p className="co-payment-detail-bank">{selectedPayment.label}</p>
                    <p className="co-payment-detail-account">{selectedPayment.account}</p>
                    <p className="co-payment-detail-holder">a.n. {selectedPayment.holder}</p>
                  </div>
                )}
              </section>

            </div>{/* end left */}

            {/* ════ RIGHT COLUMN — SUMMARY ════ */}
            <div className="co-right">
              <div className="co-summary">
                <h2 className="co-summary-title">Order Summary</h2>

                <div className="co-summary-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="co-summary-item">
                      <span className="co-summary-item-name">{item.name} <span className="co-summary-item-qty">×{item.qty}</span></span>
                      <span className="co-summary-item-price">{fmt(item.price * item.qty)}</span>
                    </div>
                  ))}
                </div>

                <div className="co-summary-divider"/>

                <div className="co-summary-row">
                  <span>Subtotal</span>
                  <span>{fmt(subtotal)}</span>
                </div>
                <div className="co-summary-row">
                  <span>Delivery ({DELIVERY_OPTIONS.find(d => d.id === delivery)?.label})</span>
                  <span>{fmt(deliveryFee)}</span>
                </div>
                {appliedVoucher && (
                  <div className="co-summary-row co-summary-row--discount">
                    <span>Voucher ({appliedVoucher.code})</span>
                    <span>−{fmt(discount)}</span>
                  </div>
                )}

                <div className="co-summary-divider"/>

                <div className="co-summary-total">
                  <span>Total</span>
                  <span>{fmt(total)}</span>
                </div>

                {selectedAddress && (
                  <div className="co-summary-addr">
                    <p className="co-summary-addr-label">Ship to</p>
                    <p className="co-summary-addr-name">{selectedAddress.name}</p>
                    <p className="co-summary-addr-text">{selectedAddress.address}</p>
                  </div>
                )}

                <button
                  className="co-checkout-btn"
                  onClick={handleCheckout}
                  disabled={!payment}
                >
                  {payment ? "Place Order" : "Select Payment Method"}
                </button>

                <p className="co-checkout-note">
                  By placing your order you agree to our terms and conditions.
                </p>
              </div>
            </div>

          </div>{/* end layout */}
        </div>
      </main>

      <Footer />

    </div>
  );
}
