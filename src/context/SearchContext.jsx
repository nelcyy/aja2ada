import { createContext, useContext, useState } from "react";

const SearchContext = createContext(null);

export function SearchProvider({ children }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [shouldOpenSearch, setShouldOpenSearch] = useState(false);

  const performSearch = (query, allProducts) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = allProducts.filter((product) =>
      product.name.toLowerCase().includes(lowerQuery) ||
      product.category?.toLowerCase().includes(lowerQuery) ||
      product.brand?.toLowerCase().includes(lowerQuery)
    );
    setSearchResults(results);
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSearchResults([]);
  };

  const openSearchPanel = () => {
    setShouldOpenSearch(true);
  };

  const closeSearchPanel = () => {
    setShouldOpenSearch(false);
  };

  return (
    <SearchContext.Provider
      value={{ 
        searchQuery, 
        searchResults, 
        performSearch, 
        clearSearch, 
        setSearchQuery,
        shouldOpenSearch,
        setShouldOpenSearch,
        openSearchPanel,
        closeSearchPanel
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => useContext(SearchContext);
