import { useEffect, useState } from "react";
import "./productsPage.css";
import { IProduct } from "../../interfaces/IProduct";
import { getProducts } from "../../services/productsService";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";


export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getProducts().then((products) => {
          setProducts(products);
        });
    }, []);
    
    return (
        <div className="page">
            <div className="products-list">
            {products.map((product: IProduct) => (
                <Link to={`/store/${product._id}`}>
                <ProductCard {...product}></ProductCard>
                </Link>
            ))}
        </div>

        </div>
    );
}