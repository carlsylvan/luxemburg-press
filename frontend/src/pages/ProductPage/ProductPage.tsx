import { useEffect, useState } from "react";
import "./productPage.css";
import { getProductById } from "../../services/productsService";
import { IProduct } from "../../interfaces/IProduct";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
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
        <div className="page">
                <ProductCard {...product}></ProductCard>
        </div>
    );
}