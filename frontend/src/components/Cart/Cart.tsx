import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./cart.css";
import { Link } from "react-router-dom";

export default function Cart() {
    const { cart } = useContext(CartContext);

    if (!cart || cart.items.length === 0) {
        return <div className="cart">Your cart is empty.</div>;
    }

    const totalCost = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
        <div className="cart">
            {cart.items.map((item, index) => (
                <div key={index} className="cart-item">

                    <Link to={`/store/${item.product._id}`}>
                    <div id="cart-item-product-name">{item.product.title}</div>
                    </Link>
                    <div>Antal: {item.quantity}</div>
                    {/* <div>Pris: {item.product.price} kr</div> */}
                </div>
            ))}

            <div id="cart-total-cost">
                {totalCost} kr
            </div>

            <Link to="/checkout">
                <button className="cart-checkout-button">Checkout</button>
            </Link>
        </div>
    );
}
