import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

/* ── Icons ─────────────────────────────────────────────── */
const IconSearch = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
  </svg>
);
const IconBag = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
  </svg>
);
const IconAccount = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
  </svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
  </svg>
);
const IconHeartNav = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
  { id: "userinfo",      label: "User info",     icon: <IconUser /> },
  { id: "favorites",     label: "Favorites",     icon: <IconHeartNav /> },
  { id: "watchlist",     label: "Watchlist",     icon: <IconStar /> },
  { id: "setting",       label: "Setting",       icon: <IconSettings /> },
  { id: "notifications", label: "Notifications", icon: <IconBell /> },
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
      case "favorites":     return <PlaceholderSection title="Favorites" />;
      case "watchlist":     return <PlaceholderSection title="Watchlist" />;
      case "setting":       return <PlaceholderSection title="Setting" />;
      case "notifications": return <PlaceholderSection title="Notifications" />;
      default:              return null;
    }
  };

  return (
    <div className="pr-page">

      {/* ── NAVBAR (same as wishlist) ── */}
      <header className="pr-nav">
        <div className="pr-nav-inner">
          <div className="pr-logo" onClick={() => navigate("/")}>
            <img src="/logo-careofyou.png" alt="Careofyou" className="pr-logo-img" />
            <span className="pr-logo-text">careofyou</span>
          </div>

          <nav className="pr-nav-links">
            <span onClick={() => navigate("/")}>Home</span>
            <span>Products</span>
            <span>Skincare</span>
            <span>About</span>
          </nav>

          <div className="pr-nav-icons">
            <button className="pr-icon-btn" title="Search">
              <IconSearch />
            </button>
            <button className="pr-icon-btn" title="Favorites" onClick={() => navigate("/wishlist")}>
              <IconHeart />
            </button>
            <button className="pr-icon-btn" title="Cart">
              <IconBag />
            </button>
            <button className="pr-icon-btn pr-icon-active" title="Account" onClick={() => navigate("/myprofile")}>
              <IconAccount />
            </button>
          </div>
        </div>
      </header>

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
