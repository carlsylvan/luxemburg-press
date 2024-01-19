import { IProduct } from "../../interfaces/IProduct";
import "./productCard.css";

export default function ProductCard({ title, author, price, mainImage }: IProduct) {
    return (
        <div className="product-card">
            <p>{title}</p>
            <p>{author}</p>
            <p>{price} kr</p>
            <img width={400} src={new URL(mainImage, import.meta.url).href}></img>
        </div>
    );
}
