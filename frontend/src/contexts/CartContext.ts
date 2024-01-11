import { createContext, Dispatch, SetStateAction } from "react";
import { ICart } from "../interfaces/ICart";

interface CartContextType {
  cart: ICart | null;
  setCart: Dispatch<SetStateAction<ICart | null>>;
}

const initialState: CartContextType = {
  cart: null,
  setCart: () => {},
};

export const CartContext = createContext<CartContextType>(initialState);
