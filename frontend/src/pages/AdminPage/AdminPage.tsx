
import { useState, useEffect } from "react";
import "./adminPage.css";
import { INewProduct } from "../../interfaces/INewProduct";
import { IProduct } from "../../interfaces/IProduct";
import { createProduct, deleteProductById, editProductById, getProducts } from "../../services/productsService";

export default function AdminPage() {
    const [newProduct, setNewProduct] = useState<INewProduct>({ name: '', price: 0, category: '', imgUrl: '' });
    const [products, setProducts] = useState<IProduct[]>([]);
    const [editProduct, setEditProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewProduct({
            ...newProduct,
            [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value
        });
    };

    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (editProduct) {
            setEditProduct({
                ...editProduct,
                [e.target.name]: e.target.name === 'price' ? parseFloat(e.target.value) : e.target.value
            });
        }
    };

    const handleNewProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        createProduct(newProduct);
    };

    const handleEditProductSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editProduct) {
            editProductById(editProduct._id, editProduct);
        }
    };

    const handleRemoveProduct = async () => {
        if (editProduct && editProduct._id) {
            await deleteProductById(editProduct._id);
            // Optionally, update your products list or UI state here
        }
    };

    return (
        <div className="page">
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

            <select onChange={(e) => setEditProduct(products.find(p => p._id.toString() === e.target.value) || null)}>
                <option value="">Välj en produkt</option>
                {products.map(product => (
                    <option key={product._id} value={product._id}>{product.name}: {product._id}</option>
                ))}
            </select>
            {editProduct && (
                <form className="edit-product-form" onSubmit={handleEditProductSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={editProduct.name}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={editProduct.price}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        value={editProduct.category}
                        onChange={handleEditInputChange}
                    />
                    <input
                        type="string"
                        name="imgUrl"
                        placeholder="imgUrl"
                        value={editProduct.imgUrl}
                        onChange={handleEditInputChange}
                    />

                    <button type="submit">Update Product</button>
                    <button type="button" onClick={handleRemoveProduct}>Remove Product</button>
                </form>
            )}
        </div>
    );
}
