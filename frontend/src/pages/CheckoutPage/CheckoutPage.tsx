import { 
        useContext,
    } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ProductCard from "../../components/ProductCard/ProductCard";

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);

    if (!cart || cart.items.length === 0) {
        return <div className="checkout-no-items">Add products</div>;
    }
    

    const totalCost = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
            <div className="page">
            <div className="checkout">
                {cart.items.map((item, index) => (
                    <div key={index} className="checkout-item">
                        <ProductCard
                        title={item.product.title} 
                        author={item.product.author}
                        price={item.product.price}
                        mainImage={item.product.mainImage}
                        ></ProductCard>
                    </div>
                ))}
                <div id="checkout-total-cost">{totalCost} kr</div>
            <div className="checkout-form-container">
                    <PayPalButtons></PayPalButtons>
            </div>
            </div>
            </div>

    );
}
