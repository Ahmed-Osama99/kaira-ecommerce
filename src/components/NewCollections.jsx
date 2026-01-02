import ProductCard from "./ProductCard";
import { products } from "../data/products";

const NewCollections = () => {
  return (
    <section className="py-16 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Marcellus'] text-(--primary-black) mb-4 uppercase tracking-widest">
            New Collections
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
          </p>
        </div>

        {/* Mobile Slider / Desktop Grid */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 lg:grid lg:grid-cols-4 lg:gap-8 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
          {products.map((product) => (
            <div
              key={product.id}
              className="snap-center flex-shrink-0 w-[85vw] sm:w-[45vw] lg:w-auto"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewCollections;
