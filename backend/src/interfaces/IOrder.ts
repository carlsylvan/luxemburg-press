import { ICart } from "./ICart";

export interface IOrder {
    id: string;
    cart: ICart;
    customer: ICustomer;
  }