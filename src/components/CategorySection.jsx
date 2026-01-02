import { Link } from "react-router-dom";
import menImg from "../assets/products/cat-item1.jpg";
import womenImg from "../assets/products/cat-item2.jpg";
import accessImg from "../assets/products/cat-item3.jpg";
import kidsImg from "../assets/products/banner-image-6.jpg";

const categories = [
  { title: "For Men", image: menImg, path: "men" },
  { title: "For Women", image: womenImg, path: "women" },
  { title: "Accessories", image: accessImg, path: "accessories" },
  { title: "For Kids", image: kidsImg, path: "kids" },
];

const CategorySection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, index) => (
            <Link
              key={index}
              to={`/shop/${cat.path}`}
              className="group relative h-96 overflow-hidden block"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/40">
                <h3 className="text-3xl font-['Marcellus'] text-white uppercase tracking-widest border-b-2 border-transparent group-hover:border-white pb-1 transition-all">
                  {cat.title}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
