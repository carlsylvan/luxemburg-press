import { useState } from "react";
import "./adminPage.css";
import { INewProduct } from "../../interfaces/INewProduct";
import { createProduct } from "../../services/productsService";
// import { IProduct } from "../../interfaces/IProduct";

export default function AdminPage() {
    const [newProduct, setNewProduct] = useState<INewProduct>({ name: '', price: 0, category: '', imgUrl: '' });
    // const [editProduct, setEditProduct] = useState<IProduct>();

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value
        });
    };

    const handleNewProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createProduct(newProduct);
    };

    return(<div id="admin-page">
            <form className="create-product-form" onSubmit={handleNewProductSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={newProduct.price}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="category"
                    placeholder="Category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    name="imgUrl"
                    placeholder="Image URL"
                    value={newProduct.imgUrl}
                    onChange={handleInputChange}
                />
                <button type="submit">Create Product</button>
            </form>

        <div className="edit-product-form">

        </div>
    </div>)
}