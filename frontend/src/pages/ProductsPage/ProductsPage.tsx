import { useQuery } from "react-query";
import "./productsPage.css";
import { getProducts } from "../../services/productsService";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { IProduct } from "../../interfaces/IProduct";

export default function ProductsPage() {
  const { data: products, error } = useQuery("products", getProducts);

  if (error) {
    return <div>Error fetching products.</div>;
  }

  return (
    <div className="page">
      <div className="products-page">
        <div className="products-list">
          {products.map((product: IProduct) => (
            <Link key={product._id} to={`/store/${product._id}`}>
              <ProductCard {...product} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
