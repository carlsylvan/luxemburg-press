import { ICustomerDetails, IOrderItem, IPaymentDetails } from "./IOrder";

export interface INewOrder {
    customerDetails: ICustomerDetails;
    items: IOrderItem[];
    paymentDetails: IPaymentDetails;
    status: string;
    totalAmount: number;
    orderDate: Date;
}