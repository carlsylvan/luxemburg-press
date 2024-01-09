import { useState } from "react";
import "./adminPage.css";
import { INewProduct } from "../../interfaces/INewProduct";
import { IProduct } from "../../interfaces/IProduct";

export default function AdminPage() {
    const [newProduct, setNewProduct] = useState<INewProduct>({ name: '', price: 0, category: '', imgUrl: '' });
    const [editProduct, setEditProduct] = useState<IProduct>();

    return(<div id="admin-page">
            <form className="create-product-form" onSubmit={handleSubmit}>
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