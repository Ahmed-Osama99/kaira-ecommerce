import React from "react";
import ProductCard from "./ProductCard";
import { products } from "../data/products";
const BestSellingItems = () => {
  // Dummy data for best selling items
  const bestSellItems = products.filter(p => p.bestsell === true)

  return (
    <section id="best-selling" className="py-16 bg-transparent">
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Marcellus'] text-(--primary-black) mb-4 uppercase tracking-widest">
            Best Selling Items
          </h2>
          <p className="text-gray-500 max-w-2xl mx-auto">
            Check out our most popular products this week
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellItems.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSellingItems;
