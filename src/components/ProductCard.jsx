import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCartPlus,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const ProductCard = ({ product }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();
  const { addToCart } = useCart();
  const isFav = isInWishlist(product.id);
  // boolean state to toggle cart icon with check mark
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    // reverse it after 2 seconds
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="group relative border border-gray-200 rounded-lg overflow-hidden bg-gray-100 flex flex-col h-full">
      {/* Image Container */}
      <div className="relative aspect-square md:aspect-3/4 overflow-hidden bg-gray-100">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Fav Icon */}
        <button
          onClick={() => toggleWishlist(product)}
          className={`absolute top-3 right-3 h-8 w-8 flex items-center justify-center rounded-full bg-(--primary-offwhite) shadow-md transition-colors ${
            isFav ? "text-red-500" : "text-gray-400 hover:text-red-500"
          }`}
          aria-label="Toggle Wishlist"
        >
          <FontAwesomeIcon icon={faHeart} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col grow">
        <h3 className="text-lg font-medium text-(--primary-black) truncate">
          {product.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 mt-1 mb-3 grow">
          {product.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-lg font-semibold text-(--primary-black)">
            ${product.price}
          </span>
          <button
            onClick={() => handleAddToCart()}
            className={`hover:text-gray-600 transition-colors text-xl ${
              added ? "text-green-400" : "text-(--primary-black)"
            }`}
            aria-label="Add to Cart"
          >
            <FontAwesomeIcon icon={added ? faCheck : faCartPlus} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
