import { 
        useContext } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);

    if (!cart || cart.items.length === 0) {
        return <div className="checkout-no-items">Add products</div>;
    }


        function createOrder() {
        return fetch("/my-server/create-paypal-order", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            body: JSON.stringify({
                cart: [
                    {
                        id: "YOUR_PRODUCT_ID",
                        quantity: "YOUR_PRODUCT_QUANTITY",
                    },
                ],
            }),
        })
            .then((response) => response.json())
            .then((order) => order.id);
    }
    function onApprove(data: ) {
          return fetch("/my-server/capture-paypal-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
          });    

    }

    const totalCost = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
            <div className="page">
            <div className="checkout">
                {cart.items.map((item, index) => (
                    <div key={index} className="checkout-item">
                        <Link to={`/store/${item.product._id}`}>
                        <ProductCard
                        title={item.product.title} 
                        author={item.product.author}
                        price={item.product.price}
                        mainImage={item.product.mainImage}
                        ></ProductCard>
                        </Link>
                         <div className="product-quantity">Quantity: {item.quantity}</div>
                    </div>
                ))}
                <div id="checkout-total-cost">{totalCost} kr</div>
            <div className="checkout-form-container">
            <PayPalButtons
              onApprove={onApprove}
              createOrder={createOrder}
            />      
             </div>
            </div>
            </div>

    );
}
