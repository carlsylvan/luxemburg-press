import { useEffect, useState, useContext } from "react";
import "./productPage.css";
import { getProductById } from "../../services/productsService";
import { IProduct } from "../../interfaces/IProduct";
import { useParams } from "react-router-dom";
import ProductCard from "../../components/ProductCard/ProductCard";
import { CartContext } from '../../contexts/CartContext';

export default function ProductPage() {
    const [product, setProduct] = useState<IProduct>({
        _id: "0",
        name: "Produkt",
        price: 0,
        category: "Kategori",
        imgUrl: ""
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
            <ProductCard {...product}></ProductCard>
            <button onClick={() => addToCart(product)}>Add to cart</button>
        </div>
    );
}
