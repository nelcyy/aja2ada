import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

/* ── Icons ─────────────────────────────────────────────── */
const IconMenu = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <line x1="3" y1="6"  x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);
const IconBellTop = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconChevron = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const IconUser = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4" />
    <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
  </svg>
);
const IconHeart = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);
const IconStar = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const IconSettings = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
    <path d="M13.73 21a2 2 0 0 1-3.46 0" />
  </svg>
);
const IconLogOut = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);
const IconEdit = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

/* ── Nav config ─────────────────────────────────────────── */
const navItems = [
  { id: "userinfo",       label: "User info",      icon: <IconUser /> },
  { id: "favorites",      label: "Favorites",      icon: <IconHeart /> },
  { id: "watchlist",      label: "Watchlist",      icon: <IconStar /> },
  { id: "setting",        label: "Setting",        icon: <IconSettings /> },
  { id: "notifications",  label: "Notifications",  icon: <IconBell /> },
];

/* ── Page sections ──────────────────────────────────────── */
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
      <div className="profile-header">
        <div className="avatar-wrapper">
          <img src="/logo-careofyou.png" alt="avatar" className="avatar" />
          <button className="avatar-edit-btn" type="button"><IconEdit /></button>
        </div>
        <div className="profile-info">
          <h3 className="profile-name">{form.firstName} {form.lastName}</h3>
          <p className="profile-location">{form.location}</p>
        </div>
      </div>

      <form className="profile-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name</label>
            <input className="profile-input" name="firstName" value={form.firstName} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input className="profile-input" name="lastName" value={form.lastName} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input className="profile-input" name="email" type="email" value={form.email} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Phone Number</label>
            <input className="profile-input" name="phone" value={form.phone} onChange={handleChange} />
          </div>
        </div>
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Location</label>
            <input className="profile-input" name="location" value={form.location} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label className="form-label">Postal Code</label>
            <input className="profile-input" name="postalCode" value={form.postalCode} onChange={handleChange} />
          </div>
        </div>
        <div className="save-btn-wrapper">
          <button type="submit" className={`save-btn${saved ? " save-btn--saved" : ""}`}>
            {saved ? "Saved!" : "Save Changes"}
          </button>
        </div>
      </form>
    </>
  );
}

function PlaceholderSection({ title }) {
  return (
    <div className="placeholder-section">
      <p className="placeholder-title">{title}</p>
      <p className="placeholder-sub">Nothing here yet.</p>
    </div>
  );
}

/* ── Main component ─────────────────────────────────────── */
export default function MyProfile() {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState("userinfo");
  const [sidebarOpen, setSidebarOpen] = useState(true);

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
    <div className="profile-page">

      {/* ── Top bar ── */}
      <header className="topbar">
        <button className="topbar-menu" onClick={() => setSidebarOpen(o => !o)} type="button">
          <IconMenu />
        </button>
        <div className="topbar-right">
          <button className="topbar-bell" type="button"><IconBellTop /></button>
          <div className="topbar-user">
            <img src="/logo-careofyou.png" alt="avatar" className="topbar-avatar" />
            <span className="topbar-name">Sara Tancredi</span>
            <IconChevron />
          </div>
        </div>
      </header>

      {/* ── Body row ── */}
      <div className="profile-body">

        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="sidebar">
            <h2 className="sidebar-title">User Profile</h2>
            <nav className="sidebar-nav">
              {navItems.map((item) => (
                <div
                  key={item.id}
                  className={`nav-item${activeNav === item.id ? " nav-item--active" : ""}`}
                  onClick={() => setActiveNav(item.id)}
                >
                  <span className="nav-icon">{item.icon}</span>
                  <span className="nav-label">{item.label}</span>
                </div>
              ))}
            </nav>
            <div className="sidebar-logout" onClick={() => navigate("/")}>
              <span className="nav-icon"><IconLogOut /></span>
              <span>Log out</span>
            </div>
          </aside>
        )}

        {sidebarOpen && <div className="sidebar-divider" />}

        {/* Main */}
        <main className="profile-main">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
