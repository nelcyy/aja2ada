import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-brand">
          <img src="/logo-careofyou.png" alt="Careofyou" className="footer-logo" />
          <span className="footer-name">careofyou</span>
        </div>
        <p className="footer-tagline">Toko beauty product pilihan di Tondano. Produk original & terpercaya.</p>
        <div className="footer-socials">
          <span className="footer-social-btn" title="@careofyou.tondano">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor"/>
            </svg>
          </span>
          <span className="footer-social-btn" title="TikTok">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.67a8.18 8.18 0 004.78 1.52V6.73a4.85 4.85 0 01-1.01-.04z"/>
            </svg>
          </span>
          <span className="footer-social-btn" title="YouTube">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58A2.78 2.78 0 003.41 19.6C5.12 20.05 12 20.05 12 20.05s6.88 0 8.59-.45a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/>
            </svg>
          </span>
        </div>
      </div>

      <div className="footer-divider" />

      <div className="footer-links-row">
        <div className="footer-col">
          <p className="footer-col-title">Shop</p>
          <span>Skincare</span>
          <span>Makeup</span>
          <span>Haircare</span>
          <span>Tools & Accessories</span>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Help</p>
          <span>FAQ</span>
          <span>Shipping Info</span>
          <span>Return Policy</span>
          <span>Contact Us</span>
        </div>
        <div className="footer-col">
          <p className="footer-col-title">Company</p>
          <span>About Us</span>
          <span>Skincare Guide</span>
          <span>Blog</span>
          <span>Careers</span>
        </div>
      </div>

      <div className="footer-bottom">
        <p>© 2025 Careofyou. All rights reserved.</p>
        <div className="footer-legal">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </footer>
  );
}
