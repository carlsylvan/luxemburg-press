export interface ICustomerDetails {
  name: string;
  email: string;
  address: {
    street: string;
    city: string;
    postalCode: string;
    country: string;
  };
}

export interface IOrderItem {
  productId: string;
  quantity: number;
  price: number;
}

export interface IPaymentDetails {
  method: string;
  transactionId?: string;
  status: string;
}

export interface IOrder {
  customerDetails: ICustomerDetails;
  items: IOrderItem[];
  paymentDetails: IPaymentDetails;
  status: string;
  totalAmount: number;
  orderDate: Date;
  _id?: string;
}
