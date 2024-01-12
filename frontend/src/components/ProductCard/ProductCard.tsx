import { IProduct } from "../../interfaces/IProduct";
import "./productCard.css";

export default function ProductCard({ title, author, price, imgUrl }: IProduct) {
    return (
        <div className="product-card">
            <marquee>Featured Product!</marquee>
            <p>Title: {title}</p>
            <p>Author: {author}</p>
            <p>Price: {price} kr</p>
            <img width={400} src={new URL(imgUrl, import.meta.url).href}></img>
        </div>
    );
}
