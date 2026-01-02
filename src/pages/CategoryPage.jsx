import { useParams } from "react-router-dom";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { categoryName } = useParams();

  const filteredProducts = products.filter((p) => p.category === categoryName);

  return (
    <section>
      <div className="container mx-auto px-4 md:px-8 py-16 bg-transparent">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-['Marcellus'] text-(--primary-black) mb-4 uppercase tracking-widest">
            Browsing: {categoryName}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryPage;
