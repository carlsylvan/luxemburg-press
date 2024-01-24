// Interface for customer details
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
  
  // Interface for a single order item
 export interface IOrderItem {
    productId: string; // Represent ObjectId as string
    quantity: number;
    price: number;
  }
  
  // Interface for payment details
 export interface IPaymentDetails {
    method: string;
    transactionId?: string;
    status: string;
  }
  
  // Interface for a complete order
  export interface IOrder {
    customerDetails: ICustomerDetails;
    items: IOrderItem[];
    paymentDetails: IPaymentDetails;
    status: string;
    totalAmount: number;
    orderDate: Date;
    _id?: string; // Represent ObjectId as string
  }
