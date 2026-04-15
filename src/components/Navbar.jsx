import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";

export default function Navbar({
  activePage = "home",
  onHomeClick = null,
  onProductsClick = null,
  onSearchClick = null,
  allProducts = [],
  searchOpen: externalSearchOpen = null,
  setSearchOpen: externalSetSearchOpen = null,
}) {
  const navigate = useNavigate();
  const { cartCount, setCartOpen } = useCart();
  const { searchQuery, performSearch, openSearchPanel } = useSearch();
  const [internalSearchOpen, setInternalSearchOpen] = useState(false);
  
  // Use external state if provided, otherwise use internal state
  const searchOpen = externalSearchOpen !== null ? externalSearchOpen : internalSearchOpen;
  const setSearchOpen = externalSetSearchOpen !== null ? externalSetSearchOpen : setInternalSearchOpen;

  const handleHome = () => {
    if (onHomeClick) onHomeClick();
    else navigate("/");
  };

  const handleProducts = () => {
    if (onProductsClick) onProductsClick();
    else navigate("/products");
  };

  const handleSearchClick = () => {
    if (activePage === "products") {
      if (searchOpen) {
        setSearchOpen(false);
      } else {
        if (onSearchClick) onSearchClick();
        setSearchOpen(true);
      }
    } else {
      openSearchPanel();
      navigate("/products");
    }
  };

  const handleSearch = (value) => {
    performSearch(value, allProducts);
    if (value.trim() && activePage !== "products") {
      navigate("/products");
    }
  };

  const handleSearchKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch(e.target.value);
      setSearchOpen(false);
    }
  };

  return (
    <header className="navbar">
      <div className="navbar-inner">
        {/* Logo */}
        <div className="navbar-logo" onClick={handleHome}>
          <img src="/logo-careofyou.png" alt="Careofyou" className="navbar-logo-img" />
          <span className="navbar-logo-text">careofyou</span>
        </div>

        {/* Center links */}
        <nav className="navbar-links">
          <span className={activePage === "home" ? "navbar-link--active" : ""} onClick={handleHome}>Home</span>
          <span className={activePage === "products" ? "navbar-link--active" : ""} onClick={handleProducts}>Products</span>
          <span className={activePage === "contact" ? "navbar-link--active" : ""} onClick={() => navigate("/contact")}>Contact Us</span>
        </nav>

        {/* Right icons */}
        <div className="navbar-icons">
          <button className="navbar-icon-btn" title="Search" onClick={handleSearchClick}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </button>

          <button
            className={`navbar-icon-btn${activePage === "wishlist" ? " navbar-icon-active" : ""}`}
            title="Wishlist"
            onClick={() => navigate("/wishlist")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill={activePage === "wishlist" ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>

          <button
            className={`navbar-icon-btn navbar-cart-btn${activePage === "checkout" ? " navbar-icon-active" : ""}`}
            title="Cart"
            onClick={() => setCartOpen(true)}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {cartCount > 0 && <span className="navbar-cart-badge">{cartCount}</span>}
          </button>

          <button
            className={`navbar-icon-btn${activePage === "myprofile" ? " navbar-icon-active" : ""}`}
            title="Profile"
            onClick={() => navigate("/myprofile")}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Search bar dropdown */}
      {searchOpen && (
        <div className="navbar-search-bar">
          <div className="navbar-search-wrap">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              className="navbar-search-input"
              type="text"
              placeholder="Cari produk..."
              value={searchQuery}
              onChange={e => handleSearch(e.target.value)}
              onKeyPress={handleSearchKeyPress}
              onBlur={() => setSearchOpen(false)}
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
}
