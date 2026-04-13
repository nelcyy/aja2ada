import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./wishlist.css";

const initialItems = [
  {
    id: 1,
    brand: "Skintific",
    name: "5X Ceramide Barrier Repair Moisture Gel",
    price: "Rp 149.000",
    size: "30ml",
    image: "https://placehold.co/110x110/fce8e6/c4706a?text=Skincare",
  },
  {
    id: 2,
    brand: "Some By Mi",
    name: "AHA BHA PHA 30 Days Miracle Toner",
    price: "Rp 185.000",
    size: "150ml",
    image: "https://placehold.co/110x110/fdeaea/c4706a?text=Toner",
  },
  {
    id: 3,
    brand: "Wardah",
    name: "Lightening Face Moisturizer SPF 30",
    price: "Rp 69.000",
    size: "40ml",
    image: "https://placehold.co/110x110/f9e0df/c4706a?text=Moisturizer",
  },
  {
    id: 4,
    brand: "Nacific",
    name: "Real Floral Toner — Rose Edition",
    price: "Rp 210.000",
    size: "200ml",
    image: "https://placehold.co/110x110/fce8e6/c4706a?text=Rose+Toner",
  },
];

export default function WishlistPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState(initialItems);
  const [addedIds, setAddedIds] = useState([]);

  const removeItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    setAddedIds((prev) => prev.filter((i) => i !== id));
  };

  const addToBag = (id) => {
    if (!addedIds.includes(id)) {
      setAddedIds((prev) => [...prev, id]);
    }
  };

  const addAllToBag = () => {
    setAddedIds(items.map((i) => i.id));
  };

  return (
    <div className="wl-page">
      {/* NAVBAR */}
      <header className="wl-nav">
        <div className="wl-nav-inner">
          <div className="wl-logo" onClick={() => navigate("/")}>
            <img src="/logo-careofyou.png" alt="Careofyou" className="wl-logo-img" />
            <span className="wl-logo-text">careofyou</span>
          </div>

          <nav className="wl-nav-links">
            <span onClick={() => navigate("/")}>Home</span>
            <span>Products</span>
            <span>Skincare</span>
            <span>About</span>
          </nav>

          <div className="wl-nav-icons">
            <button className="wl-icon-btn" title="Search">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </button>
            <button className="wl-icon-btn wl-icon-active" title="Favorites" onClick={() => navigate("/wishlist")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </button>
            <button className="wl-icon-btn wl-cart-btn" title="Cart">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <span className="wl-cart-badge">{addedIds.length}</span>
            </button>
            <button className="wl-icon-btn" title="Profile" onClick={() => navigate("/myprofile")}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* PAGE CONTENT */}
      <main className="wl-main">
        <div className="wl-container">
          {/* HEADER */}
          <div className="wl-header">
            <div>
              <h1 className="wl-title">Your Favorite</h1>
              <p className="wl-subtitle">{items.length} item{items.length !== 1 ? "s" : ""} saved</p>
            </div>
            {items.length > 0 && (
              <button className="wl-add-all-btn" onClick={addAllToBag}>
                Add all to bag
              </button>
            )}
          </div>

          {/* DIVIDER */}
          <div className="wl-divider" />

          {/* EMPTY STATE */}
          {items.length === 0 && (
            <div className="wl-empty">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#e0b0ac" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              <p className="wl-empty-text">Your wishlist is empty</p>
              <p className="wl-empty-sub">Save your favorite products here</p>
              <button className="wl-browse-btn" onClick={() => navigate("/")}>Browse Products</button>
            </div>
          )}

          {/* ITEM LIST */}
          <div className="wl-list">
            {items.map((item) => (
              <div key={item.id} className="wl-card">
                <div className="wl-card-img-wrap">
                  <img src={item.image} alt={item.name} className="wl-card-img" />
                </div>

                <div className="wl-card-info">
                  <p className="wl-card-brand">{item.brand}</p>
                  <p className="wl-card-name">{item.name}</p>
                  <p className="wl-card-price">{item.price}</p>
                  <p className="wl-card-size">Size: {item.size}</p>

                  <button
                    className={`wl-add-btn ${addedIds.includes(item.id) ? "wl-add-btn--added" : ""}`}
                    onClick={() => addToBag(item.id)}
                    disabled={addedIds.includes(item.id)}
                  >
                    {addedIds.includes(item.id) ? "Added to bag ✓" : "Add to bag"}
                  </button>
                </div>

                <button
                  className="wl-remove-btn"
                  onClick={() => removeItem(item.id)}
                  title="Remove from wishlist"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="wl-footer">
        <div className="wl-footer-inner">
          <div className="wl-footer-brand">
            <img src="/logo-careofyou.png" alt="Careofyou" className="wl-footer-logo" />
            <span className="wl-footer-name">careofyou</span>
          </div>

          <div className="wl-footer-links">
            <span>About Us</span>
            <span>Products</span>
            <span>Skincare Guide</span>
            <span>Contact</span>
          </div>

          <p className="wl-footer-copy">© 2025 Careofyou. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
