import { useContext } from "react";
import { CartContext } from "../../contexts/CartContext";
import "./cart.css";
import { Link } from "react-router-dom";

interface ICartProps {
    closeCart: () => void;
}

export default function Cart({closeCart}: ICartProps) {
    const { cart, setCart } = useContext(CartContext);

    if (!cart || cart.items.length === 0) {
        return <div className="cart">
                    <button className="cart-close-button" onClick={closeCart}>X</button>
            <div>Your cart is empty.</div>
            </div>;
    }

    const totalCost = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    const handleQuantityChange = (index: number, delta: number) => {
        const newCart = { ...cart };
        newCart.items[index].quantity += delta;
    
        if (newCart.items[index].quantity <= 0) {
            newCart.items.splice(index, 1);
        }
    
        setCart(newCart);
    };
    

    return (
        <div className="cart">
            <button className="cart-close-button" onClick={closeCart}>X</button>
            {cart.items.map((item, index) => (
                <div key={index} className="cart-item">
                    <Link to={`/store/${item.product._id}`}>
                        <div id="cart-item-product-name">{item.product.title}</div>
                    </Link>
                    <div>
                        Quantity
                        <button className="cart-item-quantity-button" onClick={() => handleQuantityChange(index, -1)}>-</button>
                        {item.quantity} 
                        <button className="cart-item-quantity-button" onClick={() => handleQuantityChange(index, 1)}>+</button>
                    </div>
                </div>
            ))}

            <div id="cart-total-cost">
                Total: {totalCost} kr
            </div>

            <Link to="/checkout">
                <button className="cart-checkout-button">Checkout</button>
            </Link>
        </div>
    );
}
