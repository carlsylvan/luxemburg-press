import { useContext, useState } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { createOrder } from "../../services/ordersService";
import { INewOrder } from "../../interfaces/INewOrder";

export default function CheckoutPage() {
  const { cart, setCart } = useContext(CartContext);

  const [message, setMessage] = useState<string>("");
  type MessageProps = {
    content: string;
  };
  function Message({ content }: MessageProps) {
    return <p>{content}</p>;
  }

  if (!cart || cart.items.length === 0) {
    return <div className="checkout-no-items">Add products</div>;
  }
  const createNewOrder = async (orderData: INewOrder) => {
    createOrder(orderData);
    setCart(null);
  };

  const totalCost = cart.items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0
  );

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
        <div id="checkout-total-cost">{totalCost} EUR</div>
        <div className="checkout-form-container">
          <PayPalButtons
            style={{
              shape: "rect",

              layout: "vertical",
            }}
            createOrder={async () => {
              try {
                const response = await fetch(
                  "http://localhost:8888/api/orders",
                  {
                    method: "POST",

                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      cart: [
                        {
                          id: "YOUR_PRODUCT_ID",

                          quantity: "YOUR_PRODUCT_QUANTITY",
                        },
                      ],
                    }),
                  }
                );

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
            onApprove={async (data) => {
              try {
                const captureResponse = await fetch(
                  `http://localhost:8888/api/orders/${data.orderID}/capture`,
                  {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                  }
                );

                const captureResult = await captureResponse.json();
                console.log(captureResult);

                if (captureResult.error) {
                  throw new Error(
                    `Error capturing payment: ${captureResult.error}`
                  );
                }

                const paymentDetails = {
                  method: "PayPal",
                  transactionId: captureResult.id,
                  status: captureResult.status,
                };

                const newOrderData = {
                  customerDetails: {
                    name: `${captureResult.payer.name.given_name} ${captureResult.payer.name.surname}`,
                    email: captureResult.payer.email_address,
                    address: {
                      street:
                        captureResult.purchase_units[0].shipping.address
                          .address_line_1,
                      city: captureResult.purchase_units[0].shipping.address
                        .admin_area_2,
                      postalCode:
                        captureResult.purchase_units[0].shipping.address
                          .postal_code,
                      country:
                        captureResult.purchase_units[0].shipping.address
                          .country_code,
                    },
                  },
                  items: cart.items.map((item) => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                  })),
                  paymentDetails: {
                    method: "PayPal",
                    transactionId: captureResult.id,
                    status: captureResult.status,
                  },
                  status: "completed",
                  totalAmount: totalCost,
                  orderDate: new Date(),
                };

                await createNewOrder(newOrderData);

                setMessage(
                  `Transaction ${paymentDetails.status}: ${paymentDetails.transactionId}.`
                );
              } catch (error) {
                setMessage(
                  `Sorry, your transaction could not be processed...${error}`
                );
              }
            }}
          />{" "}
        </div>
        <Message content={message} />
      </div>
    </div>
  );
}
