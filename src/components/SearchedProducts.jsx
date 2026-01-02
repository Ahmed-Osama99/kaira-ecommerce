import { useState, useMemo, useTransition } from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";

function SearchedProducts({ isOpen, onClose }) {
  const [query, setQuery] = useState("");
  const [isPending, startTransition] = useTransition();

  const filterdProducts = useMemo(() => {
    if (!query) return [];
    return products
      .filter((p) => p.title.toLowerCase().includes(query.toLowerCase()))
      .sort((a, b) => a.price - b.price);
  }, [query]);

  const handleSearch = (e) => {
    const value = e.target.value;
    startTransition(() => {
      setQuery(value);
    });
  };

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col bg-[var(--primary-offwhite)]/90 backdrop-blur-sm transition-transform duration-500 ease-in-out ${
        isOpen ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <button
        onClick={onClose}
        className="absolute top-8 right-8 text-4xl text-[var(--primary-black)] hover:text-gray-600 focus:outline-none z-10"
        aria-label="Close search"
      >
        <FontAwesomeIcon icon={faXmark} />
      </button>

      <div className="w-full h-full overflow-y-auto px-4 md:px-8 py-20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex justify-center mb-12">
            <div className="w-full max-w-4xl relative bg-white/10 rounded-lg p-4 shadow-lg">
              <input
                type="text"
                placeholder="Search products..."
                onChange={handleSearch}
                value={query}
                className="w-full bg-transparent px-4 py-2 rounded-md text-3xl md:text-5xl font-light text-[var(--primary-black)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus={isOpen}
              />
              <button aria-label="search for products" className="absolute right-4 top-1/2 transform -translate-y-1/2 text-3xl text-[var(--primary-black)]">
                <FontAwesomeIcon icon={faSearch} />
              </button>
            </div>
          </div>

          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${
              isPending ? "opacity-50" : "opacity-100"
            }`}
          >
            {query && filterdProducts.length > 0 ? (
              filterdProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : query && filterdProducts.length === 0 ? (
              <p className="col-span-full text-center text-gray-500 text-lg">
                No products found matching your search.
              </p>
            ) : (
              <p className="col-span-full text-center text-gray-500 text-sm uppercase tracking-wide">
                Type to search
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchedProducts;
