import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../home/index.css";
import "./index.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useSearch } from "../context/SearchContext";
import { PRODUCTS, FALLBACK_IMG } from "../data/products.js";

const PRODUCT_CATEGORIES = ["All", ...new Set(PRODUCTS.map((p) => p.category))];

function formatRupiah(number) {
  return "Rp " + number.toLocaleString("id-ID");
}

const HeartIcon = ({ filled }) => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
  </svg>
);

export default function ProductPage() {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { favorites, toggleFavorite, addToWishlist } = useWishlist();
  const { searchQuery, searchResults, shouldOpenSearch, closeSearchPanel, clearSearch } = useSearch();
  const [searchOpen, setSearchOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    if (shouldOpenSearch) {
      setSearchOpen(true);
      closeSearchPanel();
    }
  }, [shouldOpenSearch, closeSearchPanel]);

  const filteredProducts = searchQuery.trim()
    ? searchResults
    : activeCategory === "All"
    ? PRODUCTS
    : PRODUCTS.filter((p) => p.category === activeCategory);

  const handleToggleFavorite = (product) => {
    if (favorites.has(product.id)) {
      toggleFavorite(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const resultCount = filteredProducts.length;

  return (
    <div className="product-page">
      <Navbar
        activePage="products"
        allProducts={PRODUCTS}
        searchOpen={searchOpen}
        setSearchOpen={setSearchOpen}
        onHomeClick={() => navigate("/")}
        onProductsClick={() => {
          setSearchOpen(false);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
      />

      <section className="product-hero">
        <div className="product-hero-copy">
          <span className="product-kicker">Careofyou Catalog</span>
          <h1 className="product-title">
            {searchQuery.trim() ? `Results for "${searchQuery}"` : "Explore Our Products"}
          </h1>
          <p className="product-desc">
            Semua katalog sekarang ada di page khusus Products biar browsing, filter, dan search terasa lebih fokus.
          </p>
          <div className="product-stats">
            <div className="product-stat">
              <strong>{searchQuery.trim() ? resultCount : PRODUCTS.length}</strong>
              <span>{searchQuery.trim() ? "matching items" : "products ready"}</span>
            </div>
            <div className="product-stat">
              <strong>{PRODUCT_CATEGORIES.length - 1}</strong>
              <span>categories</span>
            </div>
            <div className="product-stat">
              <strong>4.9/5</strong>
              <span>customer picks</span>
            </div>
          </div>
        </div>

        <div className="product-hero-card">
          <p className="product-hero-card-label">Popular Categories</p>
          <div className="product-chip-list">
            {PRODUCT_CATEGORIES.slice(1, 5).map((category) => (
              <span key={category} className="product-chip">{category}</span>
            ))}
          </div>
          <p className="product-hero-card-note">
            Pakai tombol search di navbar kalau kamu mau cari produk, brand, atau kategori tertentu.
          </p>
        </div>
      </section>

      <section className="home-section product-catalog">
        <div className="home-section-header product-catalog-header">
          <div>
            <h2 className="home-section-title">
              {searchQuery.trim() ? `Results for "${searchQuery}"` : "All Products"}
            </h2>
            <p className="product-subline">
              {searchQuery.trim()
                ? `${resultCount} item${resultCount !== 1 ? "s" : ""} ditemukan`
                : "Browse semua produk beauty dalam satu halaman."}
            </p>
          </div>

          {searchQuery.trim() ? (
            <button className="product-clear-btn" onClick={clearSearch}>
              Show all products
            </button>
          ) : (
            <span className="products-count">{resultCount} products</span>
          )}
        </div>

        {!searchQuery.trim() && (
          <div className="category-tabs">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`category-tab${activeCategory === cat ? " category-tab--active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {searchQuery.trim() && searchResults.length === 0 ? (
          <div className="empty-search product-empty-search">
            <p className="empty-search-title">No products found</p>
            <p className="empty-search-sub">Try searching with a different keyword or show all products again.</p>
            <button className="product-clear-btn" onClick={clearSearch}>
              Reset search
            </button>
          </div>
        ) : (
          <div className="all-products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="prod-card">
                <div className="prod-img-wrap">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="prod-img"
                    onError={e => { e.target.onerror = null; e.target.src = FALLBACK_IMG; }}
                  />
                  {product.bestseller && <span className="prod-badge">Bestseller</span>}
                  <button
                    className={`cat-fav-btn${favorites.has(product.id) ? " cat-fav-btn--active" : ""}`}
                    onClick={() => handleToggleFavorite(product)}
                  >
                    <HeartIcon filled={favorites.has(product.id)} />
                  </button>
                </div>
                <div className="prod-info">
                  <p className="prod-brand">{product.brand}</p>
                  <p className="prod-name">{product.name}</p>
                  <p className="prod-cat-tag">{product.category}</p>
                  <div className="prod-bottom">
                    <div>
                      <p className="prod-rating">★ {product.rating} <span>({product.reviews})</span></p>
                      <p className="prod-price">{formatRupiah(product.price)}</p>
                    </div>
                    <button className="prod-cart-btn" onClick={() => addToCart(product)}>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
}
