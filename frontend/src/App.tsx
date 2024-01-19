import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import "./index.css"
import { CartContext } from './contexts/CartContext';
import { useEffect, useState } from 'react';
import { ICart } from './interfaces/ICart';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';


function App() {
  const [cart, setCart] = useState<ICart | null>(null);
  const [clientToken, setClientToken] = useState(null);

  useEffect(() => {

    (async () => {

      const response = await fetch("/api/token", {

        method: "POST",

      });

      const { client_token } = await response.json();

      setClientToken(client_token);

    })();

  }, []);



  const initialOptions = {
    "clientId": "test",
    "enable-funding": "",
    "disable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_ac",
    "data-client-token": clientToken,
    components: "hosted-fields,buttons",
  };


  return (
    <>
    <PayPalScriptProvider options={initialOptions}>
    <CartContext.Provider value={ {cart, setCart} }>
      <RouterProvider router={router}></RouterProvider>
      </CartContext.Provider>
      </PayPalScriptProvider>
      </>
  )
}

export default App
