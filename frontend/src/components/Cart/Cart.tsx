import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./cart.css"

export default function Cart() {
    const { cart } = useContext(CartContext);

    if (!cart || cart.items.length === 0) {
        return <div className="cart">Your cart is empty.</div>;
    }

    return (
        <div className="cart">
            {cart.items.map((item, index) => (
                <div key={index} className="cart-item">
                    <div>{item.product.name}</div>
                    <div>Quantity: {item.quantity}</div>
                    <div>Pris: {item.product.price} kr</div>
                    <div>Totalkostnad {item.product.price * item.quantity} kr</div>
                </div>
            ))}
        </div>
    );
}
