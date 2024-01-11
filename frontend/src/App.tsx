import { RouterProvider } from 'react-router-dom';
import { router } from './router';
import "./index.css"
import { CartContext } from './contexts/CartContext';
import { useState } from 'react';
import { ICart } from './interfaces/ICart';


function App() {
  const [cart, setCart] = useState<ICart | null>(null);
  console.log(cart);

  return (
    <>
    <CartContext.Provider value={ {cart, setCart} }>
      <RouterProvider router={router}></RouterProvider>
      </CartContext.Provider>
      </>
  )
}

export default App
