import { useEffect, useState } from "react";
import "./productPage.css";
import { getProductById } from "../../services/productsService";
import { IProduct } from "../../interfaces/IProduct";
import { useParams } from "react-router-dom";

export default function ProductPage() {
    const [product, setProduct] = useState<IProduct>({
        _id: "0",
        name: "Produkt",
        price: 0,
        category: "Kategori",
        imgUrl: ""
      });

      const { id } = useParams();


    useEffect(() => {
        getProductById(id).then((product) => {
          setProduct(product);
        });
    });
    
    return (
        <div className="product-page">
                <div className="product-card">
                    <p>{product.name}</p>
                    <p>{product.category}</p>
                    <p>{product.price}</p>
                    <img width={400} src={new URL(product.imgUrl, import.meta.url).href}></img>
                </div>
        </div>
    );
}