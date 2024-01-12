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
        <label htmlFor="title">Title</label>
        <input type="text" id="title" name="title" className="admin-input" placeholder="Title" value={product.title} onChange={handleInputChange} />

        <label htmlFor="author">Author</label>
        <input type="text" id="author" name="author" className="admin-input" placeholder="Author" value={product.author} onChange={handleInputChange} />

        <label htmlFor="year">Year</label>
        <input type="number" id="year" name="year" className="admin-input" placeholder="Year" value={product.year} onChange={handleInputChange} />

        <label htmlFor="price">Price</label>
        <input type="number" id="price" name="price" className="admin-input" placeholder="Price" value={product.price} onChange={handleInputChange} />

        <label htmlFor="isbn">ISBN</label>
        <input type="text" id="isbn" name="ISBN" className="admin-input" placeholder="ISBN" value={product.ISBN} onChange={handleInputChange} />

        <label htmlFor="publisher">Publisher</label>
        <input type="text" id="publisher" name="publisher" className="admin-input" placeholder="Publisher" value={product.publisher} onChange={handleInputChange} />

        <label htmlFor="category">Category</label>
        <input type="text" id="category" name="category" className="admin-input" placeholder="Category" value={product.category} onChange={handleInputChange} />

        <label htmlFor="language">Language</label>
        <input type="text" id="language" name="language" className="admin-input" placeholder="Language" value={product.language} onChange={handleInputChange} />

        <label htmlFor="pageCount">Page Count</label>
        <input type="number" id="pageCount" name="pageCount" className="admin-input" placeholder="Page Count" value={product.pageCount} onChange={handleInputChange} />

        <label htmlFor="description">Description</label>
        <textarea id="description" name="description" className="admin-textarea" placeholder="Description" value={product.description} onChange={handleInputChange}></textarea>

        <label htmlFor="imgUrl">Image URL</label>
        <input type="text" id="imgUrl" name="imgUrl" className="admin-input" placeholder="Image URL" value={product.imgUrl} onChange={handleInputChange} />
    </>    );

    return (
        <div className="page">
        <div className="admin-container">
            <form className="admin-form" onSubmit={handleNewProductSubmit}>
                {renderProductForm(newProduct, handleInputChange)}
                <button className="admin-button" type="submit">Create Product</button>
            </form>

            <select className="admin-select" onChange={(e) => setEditProduct(products.find(p => p._id === e.target.value) || null)}>
    <option value="">Select a Product</option>
    {products.map(product => (
        <option key={product._id} value={product._id}>
            {`${product.title} - ${product.author} (${product.year})`}
        </option>
    ))}
</select>            {editProduct && (
                <form className="admin-form" onSubmit={handleEditProductSubmit}>
                    {renderProductForm(editProduct, handleEditInputChange)}
                    <button className="admin-button" type="submit">Update Product</button>
                    <button className="admin-button admin-button-remove" type="button" onClick={handleRemoveProduct}>Remove Product</button>
                </form>
            )}
        </div>        </div>
    );
}
