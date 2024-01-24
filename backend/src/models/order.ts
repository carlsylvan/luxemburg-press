import { ObjectId } from "mongodb";

export default class Order {
    constructor(
        public customerDetails: {
            name: string,
            email: string,
            address: {
                street: string,
                city: string,
                postalCode: string,
                country: string
            }
        },
        public items: Array<{
            productId: ObjectId,
            quantity: number,
            price: number
        }>,
        public paymentDetails: {
            method: string,
            transactionId?: string,
            status: string
        },
        public status: string,
        public totalAmount: number,
        public orderDate: Date,
        public id?: ObjectId
    ) {}
}
