import { ChangeEvent, FormEvent, useContext, useState } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);

    // State to store form data
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        phoneNumber: '',
        email: ''
        // Add more fields as necessary
    });

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission, such as sending data to a server
        console.log(formData);
    };

    if (!cart || cart.items.length === 0) {
        return <div className="checkout-no-items">Add products</div>;
    }

    const totalCost = cart.items.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

    return (
            <div className="page">
            <div className="checkout">
                {cart.items.map((item, index) => (
                    <div key={index} className="checkout-item">
                        <div id="checkout-item-product-name">{item.product.title}</div>
                        <div>Quantity: {item.quantity}</div>
                    </div>
                ))}
                <div id="checkout-total-cost">{totalCost} kr</div>
            <div className="checkout-form-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Name"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        placeholder="Address"
                    />
                    <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleInputChange}
                        placeholder="Phone number"
                    />
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="E-mail"
                    />
                    {/* Add more input fields as needed */}
                    <button type="submit">Order</button>
                </form>
            </div>
            </div>
            </div>

    );
}
