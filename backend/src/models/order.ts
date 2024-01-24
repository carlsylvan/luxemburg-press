
import { ICart } from "../interfaces/ICart";
import { ICustomer } from "../interfaces/ICustomer";

export interface IOrder {
    id: string;
    cart: ICart;
    customer: ICustomer;
}

export default class Order implements IOrder {
    id: string;
    cart: ICart;
    customer: ICustomer;

    constructor(id: string, cart: ICart, customer: ICustomer) {
        this.id = id;
        this.cart = cart;
        this.customer = customer;
    }
}