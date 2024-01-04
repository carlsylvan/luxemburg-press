// External dependencies

import { ObjectId } from "mongodb";

// Class Implementation

export default class Product {
    constructor(public name: string, public price: number, public category: string, public id?: ObjectId) {}
}