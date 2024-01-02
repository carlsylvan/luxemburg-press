export class Product {

    name: string;
    category: string;
    price: number;
    constructor(name: string, category: string, price: number) {
        this.name = name;
        this.category = category;
        this.price = price;
    }

};


let bok = new Product(
    "en bok",
    "bok",
    199,
)

console.log(bok);