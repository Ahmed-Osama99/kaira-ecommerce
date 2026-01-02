import { memo } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";
import CategorySection from "../components/CategorySection";

const Shop = memo(({ props }) => {
  props = products.filter((p) => p.category);
  return (
    <section>
        <CategorySection />
      <div className="container mx-auto px-4 md:px-8 py-16 bg-transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Marcellus'] text-(--primary-black) mb-4 uppercase tracking-widest">
            All Our Products
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Check out our most products
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {props.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
});

export default Shop;
