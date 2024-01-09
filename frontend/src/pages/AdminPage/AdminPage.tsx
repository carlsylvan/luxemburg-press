import { useState } from "react";
import "./adminPage.css";
import { INewProduct } from "../../interfaces/INewProduct";
import { IProduct } from "../../interfaces/IProduct";

export default function AdminPage() {
    const [newProduct, setNewProduct] = useState<INewProduct>();
    const [editProduct, setEditProduct] = useState<IProduct>();

    return(<div id="admin-page">
        <div className="create-product-form">

        </div>

        <div className="edit-product-form">

        </div>
    </div>)
}