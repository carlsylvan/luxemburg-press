import { useEffect, useState } from "react";
import "./productsPage.css";
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
                    <p>Produkt: {product.name}</p>
                    <p>Kategori: {product.category}</p>
                    <p>Pris: {product.price} kr</p>
                    <img width={400} src={new URL(product.imgUrl, import.meta.url).href}></img>
                </div>
                </a>
            ))}
        </div>
    );
}