import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const CartProduct = ({ product }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const quantity = product.quantity || 1;
  const totalPrice = (product.price * quantity).toFixed(2);

  const handleIncrease = () => {
    updateQuantity(product.id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(product.id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeFromCart(product.id);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow">
      {/* Product Image */}
      <div className="w-full md:w-32 h-32 shrink-0">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover rounded-md"
        />
      </div>

      {/* Product Details */}
      <div className="grow flex flex-col justify-between">
        <div>
          <h3 className="text-lg font-semibold text-(--primary-black) mb-1">
            {product.title}
          </h3>
          <p className="text-sm text-gray-500 line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price and Quantity Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
          {/* Quantity Controls */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600 font-medium">Quantity:</span>
            <div className="flex items-center border border-gray-300 rounded-md">
              <button
                onClick={handleDecrease}
                className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600"
                aria-label="Decrease quantity"
              >
                <FontAwesomeIcon icon={faMinus} className="text-sm" />
              </button>
              <span className="px-4 py-2 min-w-12 text-center font-medium text-(--primary-black)">
                {quantity}
              </span>
              <button
                onClick={handleIncrease}
                className="px-3 py-2 hover:bg-gray-100 transition-colors text-gray-600"
                aria-label="Increase quantity"
              >
                <FontAwesomeIcon icon={faPlus} className="text-sm" />
              </button>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between sm:justify-end gap-6">
            <div className="flex flex-col items-end">
              <span className="text-xs text-gray-500">
                ${product.price.toFixed(2)} each
              </span>
              <span className="text-xl font-bold text-(--primary-black)">
                ${totalPrice}
              </span>
            </div>

            {/* Remove Button */}
            <button
              onClick={handleRemove}
              className="text-red-500 hover:text-red-700 transition-colors p-2"
              aria-label="Remove from cart"
            >
              <FontAwesomeIcon icon={faTrash} className="text-lg" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartProduct;
