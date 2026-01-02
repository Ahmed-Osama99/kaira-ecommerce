import { useCart } from "../context/CartContext";
import CartProduct from "../components/CartProduct";
export default function Cart() {
  const { cart } = useCart();

  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <h2 className="text-center text-3xl md:text-4xl font-['Marcellus'] text-(--primary-black) mb-4 uppercase tracking-widest">
          My Cart
        </h2>
        {cart && cart.length > 0 ? (
          <div className="space-y-4">
            {cart.map((product) => (
              <CartProduct key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              Your Cart is currently empty.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
