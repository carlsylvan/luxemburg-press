import "./productCard.css";

interface IProductCardProps {
  title: string;
  author: string;
  price: number;
  mainImage: string;
}

export default function ProductCard({
  title,
  author,
  price,
  mainImage,
}: IProductCardProps) {
  return (
    <div className="product-card">
      <p>{title}</p>
      <p>{author}</p>
      <p>{price} EUR</p>
      <img width={400} src={new URL(mainImage, import.meta.url).href}></img>
    </div>
  );
}
