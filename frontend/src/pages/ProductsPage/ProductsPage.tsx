import { useEffect, useState } from "react";
import "./productsPage.css";
import "../../index.css";
import { IProduct } from "../../interfaces/IProduct";
import { getProducts } from "../../services/productsService";

export default function ProductsPage() {
    const [products, setProducts] = useState<IProduct[]>([]);

    useEffect(() => {
        getProducts().then((products) => {
          setProducts(products);
        });
    }, []);
    
    return (
        <div className="products-page">
            {products.map((product: IProduct) => (
                <a href={`/store/${product._id}`}>
                <div className="product-card" key={product._id}>
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                </div>
                </a>
            ))}
        </div>
    );
}