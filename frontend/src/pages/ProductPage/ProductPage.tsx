import { useEffect, useState, useContext } from "react";
import "./productPage.css";
import { getProductById } from "../../services/productsService";
import { IProduct } from "../../interfaces/IProduct";
import { useParams } from "react-router-dom";
import { CartContext } from '../../contexts/CartContext';

export default function ProductPage() {
    const [product, setProduct] = useState<IProduct>({
      _id: "string",
      title: "string",
      author: "string",
      year: 0,
      price: 0,
      ISBN: 0,
      publisher: "string",
      category: "string",
      language: "string",
      pageCount: 0,
      // images: { [key: string]: string };
      description: "string",
      imgUrl: "string",
    });

    const { id } = useParams();

    const cart = useContext(CartContext);
    const setCart = cart.setCart;

    useEffect(() => {
        getProductById(id).then((product) => {
          setProduct(product);
        });
    }, [id]);
    const addToCart = (productToAdd: IProduct) => {

      const newCartItems = [...(cart?.cart?.items || [])];
    
      const existingCartItemIndex = newCartItems.findIndex(
        item => item.product._id === productToAdd._id
      );
    
      if (existingCartItemIndex >= 0) {
        const existingCartItem = newCartItems[existingCartItemIndex];
        newCartItems[existingCartItemIndex] = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1
        };
      } else {
        newCartItems.push({
          product: productToAdd,
          quantity: 1
        });
      }
    
      setCart({ items: newCartItems });
    };
    

    return (
        <div className="page">
        <div className="product-information">
            <p>Title: {product.title}</p>
            <p>Author: {product.author}</p>
            <p>Price: {product.price} kr</p>
            <p>{product.description}</p>
            <img width={400} src={new URL(product.imgUrl, import.meta.url).href}></img>
            <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>            
        </div>
    );
}
