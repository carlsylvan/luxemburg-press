import React, { useContext } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productsService";
import { CartContext } from "../../contexts/CartContext";
import { ImageCarousel } from "../../components/ImageCarousel/ImageCarousel";
import "./productPage.css";
import { IProduct } from "../../interfaces/IProduct";
// import Loading from "../../components/Loading/Loading";

export default function ProductPage() {
  const { id } = useParams();
  const {
    data: product,
    // isLoading
    error,
  } = useQuery(["product", id], () => getProductById(id));

  const cart = useContext(CartContext);
  const setCart = cart.setCart;

  const addToCart = (productToAdd: IProduct) => {
    const newCartItems = [...(cart?.cart?.items || [])];
    const existingCartItemIndex = newCartItems.findIndex(
      (item) => item.product._id === productToAdd._id
    );

    if (existingCartItemIndex >= 0) {
      const existingCartItem = newCartItems[existingCartItemIndex];
      newCartItems[existingCartItemIndex] = {
        ...existingCartItem,
        quantity: existingCartItem.quantity + 1,
      };
    } else {
      newCartItems.push({
        product: productToAdd,
        quantity: 1,
      });
    }

    setCart({ items: newCartItems });
  };

  const renderDescription = () => {
    return product?.description
      .split("\n")
      .map((line: string, index: number) => (
        <React.Fragment key={index}>
          {line}
          <br />
        </React.Fragment>
      ));
  };

  // if (isLoading) {
  //     return <Loading></Loading>;
  // }

  if (error) {
    return <div className="error">Error fetching product</div>;
  }

  if (!product) {
    return <div className="no-product">No product found</div>;
  }

  const imageArray = Object.values(product.images || []) as string[];

  return (
    <div className="page">
      <div className="product-information">
        <div className="product-information-img-container">
          <img
            width={400}
            src={new URL(product.mainImage, import.meta.url).href}
          ></img>
          <ImageCarousel images={imageArray}></ImageCarousel>
        </div>
        <div className="product-information-info-container">
          <h2>{product.title}</h2>
          <p>by {product.author}</p>
          <p>{product.price} EUR</p>
          <p className="product-information-description">
            {renderDescription()}
          </p>
          <button
            className="product-information-cart-button"
            onClick={() => addToCart(product)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
