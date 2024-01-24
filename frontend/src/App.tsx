import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import "./index.css"
import { CartContext } from './contexts/CartContext';
import { useEffect, useState } from 'react';
import { ICart } from './interfaces/ICart';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { QueryClient, QueryClientProvider } from 'react-query';


function App() {
  const [cart, setCart] = useState<ICart | null>(null);
  const [clientToken, setClientToken] = useState(null);
  const queryClient = new QueryClient(
    {
      defaultOptions: {
        queries: {
          suspense: true,
        },
      },
    }
  )

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
    "clientId": "AUR88W8mVuWgY9BlGRqYjk0XMaMEdV3LkAx_OsTfPCiNeOndV-JJQMy_DBXjJ3jlrs7KNw2sbHG8n7NA",
    "enable-funding": "",
    "currency": "EUR",
    "disable-funding": "paylater,venmo",
    "data-sdk-integration-source": "integrationbuilder_ac",
    "data-client-token": clientToken,
    components: "hosted-fields,buttons",
  };


  return (
    <>
    <QueryClientProvider client={queryClient}>
    <PayPalScriptProvider options={initialOptions}>
    <CartContext.Provider value={ {cart, setCart} }>
      <RouterProvider router={router}></RouterProvider>
      </CartContext.Provider>
      </PayPalScriptProvider>
      </QueryClientProvider>
      </>
  )
}

export default App
