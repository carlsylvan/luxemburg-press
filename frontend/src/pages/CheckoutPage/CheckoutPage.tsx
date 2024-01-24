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

    interface PayPalApprovalData {
      orderID: string;
      // include other properties that PayPal returns
  }

  function createOrder() {
    // Assuming `cart.items` is an array of your cart items
    const orderItems = cart?.items.map(item => ({
        id: item.product._id, // or any unique identifier of your product
        quantity: item.quantity
    }));

    return fetch("/orders/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart: orderItems }),
    })
    .then(response => response.json())
    .then(order => order.id); // Assuming your backend responds with the order id
}

function onApprove(data: PayPalApprovalData) {
    return fetch("/orders/capture/", { // Adjust this endpoint as per your backend API
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ orderID: data.orderID })
    })
    .then(response => response.json())
    .then(orderData => {
        // Assuming 'orderData' contains the necessary information after capturing the order
        const name = orderData.payer.name.given_name;
        alert(`Transaction completed by ${name}`);
        // You might want to handle additional post-transaction logic here
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
