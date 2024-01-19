import { 
    // ChangeEvent, 
    // FormEvent, 
    useContext,
     useEffect,
     useState } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);
    const [clientToken, setClientToken] = useState(null);


    const initialOptions = {
  
      "clientId": "test",
  
      "enable-funding": "",
  
      "disable-funding": "paylater,venmo",
  
      "data-sdk-integration-source": "integrationbuilder_ac",
  
      "data-client-token": clientToken,
  
      components: "hosted-fields,buttons",
  
    };

    useEffect(() => {

        (async () => {
    
          const response = await fetch("/api/token", {
    
            method: "POST",
    
          });
    
          const { client_token } = await response.json();
    
          setClientToken(client_token);
    
        })();
    
      }, []);

    // const [formData, setFormData] = useState({
    //     name: '',
    //     address: '',
    //     phoneNumber: '',
    //     email: ''
    // });

    // const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    //     setFormData({
    //         ...formData,
    //         [e.target.name]: e.target.value
    //     });
    // };

    // const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    //     e.preventDefault();
    //     console.log(formData);
    // };

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
            <PayPalScriptProvider options={initialOptions}>
                    <PayPalButtons></PayPalButtons>
                </PayPalScriptProvider>

                {/* <form onSubmit={handleSubmit}>
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
                    <button type="submit">Order</button>
                </form> */}
            </div>
            </div>
            </div>

    );
}
