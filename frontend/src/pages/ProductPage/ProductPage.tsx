import { useEffect, useState } from "react";
import "./productPage.css";
import { getProductById } from "../../services/productsService";
import { IProduct } from "../../interfaces/IProduct";

export default function ProductPage() {
    const [product, setProduct] = useState<IProduct>({
        _id: "0",
        name: "Produkt",
        price: 0,
        category: "Kategori"
      });

    useEffect(() => {
        getProductById(product._id).then((product) => {
          setProduct(product);
        });
    }, [product]);
    
    return (
        <div className="product-page">
                <div className="product-card">
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                </div>
        </div>
    );
}