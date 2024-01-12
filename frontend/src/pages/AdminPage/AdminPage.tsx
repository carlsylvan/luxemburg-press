import { useState, useEffect } from "react";
import "./adminPage.css";
import { IProduct } from "../../interfaces/IProduct";
import { createProduct, deleteProductById, editProductById, getProducts } from "../../services/productsService";

export default function AdminPage() {
    const initialProductState = {
        _id: '',
        title: '',
        author: '',
        year: 0,
        price: 0,
        ISBN: '',
        publisher: '',
        category: '',
        language: '',
        pageCount: 0,
        description: '',
        imgUrl: ''
    };

    const [newProduct, setNewProduct] = useState<IProduct>(initialProductState);
    const [products, setProducts] = useState<IProduct[]>([]);
    const [editProduct, setEditProduct] = useState<IProduct | null>(null);

    useEffect(() => {
        const fetchProducts = async () => {
            const fetchedProducts = await getProducts();
            setProducts(fetchedProducts);
        };
        fetchProducts();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
        setNewProduct({
            ...newProduct,
            [name]: name === 'year' || name === 'price' || name === 'pageCount' ? parseFloat(value) || 0 : value
        });
    };
    
    const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (editProduct) {
            const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
            setEditProduct({
                ...editProduct,
                [name]: name === 'year' || name === 'price' || name === 'pageCount' ? parseFloat(value) || 0 : value
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

    const renderProductForm = (product: IProduct, handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void) => (
        <>
            <input type="text" name="title" placeholder="Title" value={product.title} onChange={handleInputChange} />
            <input type="text" name="author" placeholder="Author" value={product.author} onChange={handleInputChange} />
            <input type="number" name="year" placeholder="Year" value={product.year} onChange={handleInputChange} />
            <input type="number" name="price" placeholder="Price" value={product.price} onChange={handleInputChange} />
            <input type="text" name="ISBN" placeholder="ISBN" value={product.ISBN} onChange={handleInputChange} />
            <input type="text" name="publisher" placeholder="Publisher" value={product.publisher} onChange={handleInputChange} />
            <input type="text" name="category" placeholder="Category" value={product.category} onChange={handleInputChange} />
            <input type="text" name="language" placeholder="Language" value={product.language} onChange={handleInputChange} />
            <input type="number" name="pageCount" placeholder="Page Count" value={product.pageCount} onChange={handleInputChange} />
            <textarea name="description" placeholder="Description" value={product.description} onChange={handleInputChange} />
            <input type="text" name="imgUrl" placeholder="Image URL" value={product.imgUrl} onChange={handleInputChange} />
        </>
    );

    return (
        <div className="page">
            <form className="create-product-form" onSubmit={handleNewProductSubmit}>
                {renderProductForm(newProduct, handleInputChange)}
                <button type="submit">Create Product</button>
            </form>

            <select onChange={(e) => setEditProduct(products.find(p => p._id === e.target.value) || null)}>
                <option value="">Select a Product</option>
                {products.map(product => (
                    <option key={product._id} value={product._id}>{product.title}: {product._id}</option>
                ))}
            </select>
            {editProduct && (
                <form className="edit-product-form" onSubmit={handleEditProductSubmit}>
                    {renderProductForm(editProduct, handleEditInputChange)}
                    <button type="submit">Update Product</button>
                    <button type="button" onClick={handleRemoveProduct}>Remove Product</button>
                </form>
            )}
        </div>
    );
}
