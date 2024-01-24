import { useContext, useState } from "react";
import "./checkoutPage.css";
import { CartContext } from "../../contexts/CartContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import ProductCard from "../../components/ProductCard/ProductCard";
import { Link } from "react-router-dom";
import { createOrder } from "../../services/ordersService";
import { INewOrder } from "../../interfaces/INewOrder";
import { ICustomerDetails } from "../../interfaces/IOrder";

export default function CheckoutPage() {
  const { cart } = useContext(CartContext);

  const [customer, setCustomer] = useState<ICustomerDetails>({
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      postalCode: "",
      country: "",
    },
  });

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

  const createNewOrder = async (orderData: INewOrder) => {
    createOrder(orderData);
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
        <div id="checkout-total-cost">{totalCost} kr</div>
        <div className="checkout-form-container">
          <form>
            <div className="form-group">
              <label>Name:</label>
              <input
                type="text"
                value={customer.name}
                onChange={(e) =>
                  setCustomer({ ...customer, name: e.target.value })
                }
                placeholder="Name"
              />
            </div>

            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={customer.email}
                onChange={(e) =>
                  setCustomer({ ...customer, email: e.target.value })
                }
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label>Street:</label>
              <input
                type="text"
                value={customer.address.street}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, street: e.target.value },
                  })
                }
                placeholder="Street"
              />
            </div>

            <div className="form-group">
              <label>City:</label>
              <input
                type="text"
                value={customer.address.city}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, city: e.target.value },
                  })
                }
                placeholder="City"
              />
            </div>

            <div className="form-group">
              <label>Postal Code:</label>
              <input
                type="text"
                value={customer.address.postalCode}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: {
                      ...customer.address,
                      postalCode: e.target.value,
                    },
                  })
                }
                placeholder="Postal Code"
              />
            </div>

            <div className="form-group">
              <label>Country:</label>
              <input
                type="text"
                value={customer.address.country}
                onChange={(e) =>
                  setCustomer({
                    ...customer,
                    address: { ...customer.address, country: e.target.value },
                  })
                }
                placeholder="Country"
              />
            </div>
          </form>
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

                if (captureResult.error) {
                  // Handle errors
                  throw new Error(
                    `Error capturing payment: ${captureResult.error}`
                  );
                }

                // Extract necessary details from PayPal response for INewOrder
                const paymentDetails = {
                  method: "PayPal",
                  transactionId: captureResult.id,
                  status: captureResult.status,
                };

                // Construct INewOrder object
                const newOrderData = {
                  customerDetails: {
                    name: customer.name,
                    email: customer.email,
                    address: {
                      street: customer.address.street,
                      city: customer.address.city,
                      postalCode: customer.address.postalCode,
                      country: customer.address.country,
                    },
                  },
                  items: cart.items.map((item) => ({
                    productId: item.product._id,
                    quantity: item.quantity,
                    price: item.product.price,
                  })),
                  paymentDetails,
                  status: "completed", // Update the status as per your application logic
                  totalAmount: totalCost,
                  orderDate: new Date(),
                };

                // Call your service function to create the new order
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
