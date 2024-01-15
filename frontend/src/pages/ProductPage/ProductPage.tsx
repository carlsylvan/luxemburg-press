import React, { useEffect, useState, useContext } from "react";
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
      ISBN: "string",
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

    const renderDescription = () => {
      return product.description.split('\n').map((line, index) => (
          <React.Fragment key={index}>
              {line}
              <br />
          </React.Fragment>
      ));
  };
    

    return (
        <div className="page">
        <div className="product-information">
          <div className="product-information-img-container">
          <img width={400} src={new URL(product.imgUrl, import.meta.url).href}></img>
          <div className="product-information-img-carousel"></div>
          </div>
          <div className="product-information-info-container">
          <h2>{product.title}</h2>
            <p>by {product.author}</p>
            <p>{product.price} kr</p>
            <p className="product-information-description">{renderDescription()}</p>
            <button onClick={() => addToCart(product)}>Add to cart</button>

          </div>
        </div>            
        </div>
    );
}
