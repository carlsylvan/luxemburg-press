import { IProduct } from "../../interfaces/IProduct";
import "./productCard.css";

export default function ProductCard({ title, category, price, imgUrl }: IProduct) {
    return (
        <div className="product-card">
            <p>Titel: {title}</p>
            <p>Kategori: {category}</p>
            <p>Pris: {price} kr</p>
            <img width={400} src={new URL(imgUrl, import.meta.url).href}></img>
        </div>
    );
}
