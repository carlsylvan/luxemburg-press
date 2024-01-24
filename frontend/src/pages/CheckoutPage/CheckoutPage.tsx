import { 
        useContext, useState } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";

export default function CheckoutPage() {
    const { cart } = useContext(CartContext);

    const [message, setMessage] = useState<string>("");
    type MessageProps = {
      content: string; // Define the type for 'content'
    };
    function Message({ content }: MessageProps) {

      return <p>{content}</p>;
    
    }

    if (!cart || cart.items.length === 0) {
        return <div className="checkout-no-items">Add products</div>;
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

style={{

  shape: "rect",

  layout: "vertical",

}}

createOrder={async () => {

  try {

    const response = await fetch("http://localhost:8888/api/orders", {

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

    });


    const orderData = await response.json();


    if (orderData.id) {

      return orderData.id;

    } else {

      const errorDetail = orderData?.details?.[0];

      const errorMessage = errorDetail

        ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`

        : JSON.stringify(orderData);


      throw new Error(errorMessage);

    }

  } catch (error) {

    console.error(error);

    setMessage(`Could not initiate PayPal Checkout...${error}`);

  }

}}

onApprove={async (data, actions) => {

  try {

    const response = await fetch(

      `http://localhost:8888/api/orders/${data.orderID}/capture`,

      {

        method: "POST",

        headers: {

          "Content-Type": "application/json",

        },

      },

    );


    const orderData = await response.json();

    // Three cases to handle:

    //   (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

    //   (2) Other non-recoverable errors -> Show a failure message

    //   (3) Successful transaction -> Show confirmation or thank you message


    const errorDetail = orderData?.details?.[0];


    if (errorDetail?.issue === "INSTRUMENT_DECLINED") {

      // (1) Recoverable INSTRUMENT_DECLINED -> call actions.restart()

      // recoverable state, per https://developer.paypal.com/docs/checkout/standard/customize/handle-funding-failures/

      return actions.restart();

    } else if (errorDetail) {

      // (2) Other non-recoverable errors -> Show a failure message

      throw new Error(

        `${errorDetail.description} (${orderData.debug_id})`,

      );

    } else {

      // (3) Successful transaction -> Show confirmation or thank you message

      // Or go to another URL:  actions.redirect('thank_you.html');

      const transaction =

        orderData.purchase_units[0].payments.captures[0];

      setMessage(

        `Transaction ${transaction.status}: ${transaction.id}. See console for all available details`,

      );

      console.log(

        "Capture result",

        orderData,

        JSON.stringify(orderData, null, 2),

      );

    }

  } catch (error) {

    setMessage(

      `Sorry, your transaction could not be processed...${error}`,

    );

  }

}}

/> </div>
<Message content={message} />
            </div>
            </div>

    );
}
