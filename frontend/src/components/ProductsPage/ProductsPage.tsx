import { useEffect, useState } from "react";
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
        <div>
            {products.map((product: IProduct) => (
                <div key={product._id}>
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                </div>
            ))}
        </div>
    );
}