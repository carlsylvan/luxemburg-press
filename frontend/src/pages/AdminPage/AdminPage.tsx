import { useState, useEffect } from "react";
import "./adminPage.css";
import { IProduct } from "../../interfaces/IProduct";
import {
  createProduct,
  deleteProductById,
  editProductById,
  getProducts,
} from "../../services/productsService";
import { INewProduct } from "../../interfaces/INewProduct";
import { getOrders } from "../../services/ordersService";
import { IOrder } from "../../interfaces/IOrder";

export default function AdminPage() {
  const initialProductState = {
    _id: null,
    title: "",
    author: "",
    year: 0,
    price: 0,
    ISBN: "",
    publisher: "",
    category: "",
    language: "",
    pageCount: 0,
    description: "",
    images: [],
    mainImage: "",
  };

  const [newProduct, setNewProduct] =
    useState<INewProduct>(initialProductState);
  const [products, setProducts] = useState<IProduct[]>([]);
  const [editProduct, setEditProduct] = useState<IProduct | null>(null);

  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const fetchedOrders = await getOrders();
      setOrders(fetchedOrders);
    };
    fetchOrders();
  }, []);

  const renderOrders = () => {
    return orders.map((order) => (
      <div key={order._id} className="order-card">
        <h3>Order ID: {order._id}</h3>
        <h4>Customer Details:</h4>
        <p>Name: {order.customerDetails.name}</p>
        <p>Email: {order.customerDetails.email}</p>
        <p>
          Address:{" "}
          {`${order.customerDetails.address.street}, ${order.customerDetails.address.city}, ${order.customerDetails.address.postalCode}, ${order.customerDetails.address.country}`}
        </p>

        <h4>Items:</h4>
        <ul>
          {order.items.map((item, index) => (
            <li key={index}>
              Product ID: {item.productId} - Quantity: {item.quantity} - Price:
              ${item.price.toFixed(2)}
            </li>
          ))}
        </ul>

        <h4>Payment Details:</h4>
        <p>Method: {order.paymentDetails.method}</p>
        {order.paymentDetails.transactionId && (
          <p>Transaction ID: {order.paymentDetails.transactionId}</p>
        )}
        <p>Status: {order.paymentDetails.status}</p>

        <p>Order Status: {order.status}</p>
        <p>Total Amount: ${order.totalAmount.toFixed(2)}</p>
        <p>Order Date: {new Date(order.orderDate).toLocaleDateString()}</p>
      </div>
    ));
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };
    fetchProducts();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement;
    setNewProduct({
      ...newProduct,
      [name]:
        name === "year" || name === "price" || name === "pageCount"
          ? parseFloat(value) || 0
          : value,
    });
  };

  const handleEditInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (editProduct) {
      const { name, value } = e.target as
        | HTMLInputElement
        | HTMLTextAreaElement;
      setEditProduct({
        ...editProduct,
        [name]:
          name === "year" || name === "price" || name === "pageCount"
            ? parseFloat(value) || 0
            : value,
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

  const renderProductForm = (
    product: IProduct | INewProduct,
    handleInputChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => void
  ) => (
    <>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        name="title"
        className="admin-input"
        placeholder="Title"
        value={product.title}
        onChange={handleInputChange}
      />

      <label htmlFor="author">Author</label>
      <input
        type="text"
        id="author"
        name="author"
        className="admin-input"
        placeholder="Author"
        value={product.author}
        onChange={handleInputChange}
      />

      <label htmlFor="year">Year</label>
      <input
        type="number"
        id="year"
        name="year"
        className="admin-input"
        placeholder="Year"
        value={product.year}
        onChange={handleInputChange}
      />

      <label htmlFor="price">Price</label>
      <input
        type="number"
        id="price"
        name="price"
        className="admin-input"
        placeholder="Price"
        value={product.price}
        onChange={handleInputChange}
      />

      <label htmlFor="isbn">ISBN</label>
      <input
        type="text"
        id="isbn"
        name="ISBN"
        className="admin-input"
        placeholder="ISBN"
        value={product.ISBN}
        onChange={handleInputChange}
      />

      <label htmlFor="publisher">Publisher</label>
      <input
        type="text"
        id="publisher"
        name="publisher"
        className="admin-input"
        placeholder="Publisher"
        value={product.publisher}
        onChange={handleInputChange}
      />

      <label htmlFor="category">Category</label>
      <input
        type="text"
        id="category"
        name="category"
        className="admin-input"
        placeholder="Category"
        value={product.category}
        onChange={handleInputChange}
      />

      <label htmlFor="language">Language</label>
      <input
        type="text"
        id="language"
        name="language"
        className="admin-input"
        placeholder="Language"
        value={product.language}
        onChange={handleInputChange}
      />

      <label htmlFor="pageCount">Page Count</label>
      <input
        type="number"
        id="pageCount"
        name="pageCount"
        className="admin-input"
        placeholder="Page Count"
        value={product.pageCount}
        onChange={handleInputChange}
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        name="description"
        className="admin-textarea"
        placeholder="Description"
        value={product.description}
        onChange={handleInputChange}
      ></textarea>

      <label htmlFor="imgUrl">Image URL</label>
      <input
        type="text"
        id="imgUrl"
        name="imgUrl"
        className="admin-input"
        placeholder="Image URL"
        value={product.mainImage}
        onChange={handleInputChange}
      />
    </>
  );

  return (
    <div className="page">
      <div className="admin-container">
        <div className="orders-container">
          <h2>Orders</h2>
          {renderOrders()}
        </div>
        <form className="admin-form" onSubmit={handleNewProductSubmit}>
          {renderProductForm(newProduct, handleInputChange)}
          <button className="admin-button" type="submit">
            Create Product
          </button>
        </form>
        <select
          className="admin-select"
          onChange={(e) =>
            setEditProduct(
              products.find((p) => p._id === e.target.value) || null
            )
          }
        >
          <option value="">Select a Product</option>
          {products.map((product) => (
            <option key={product._id} value={product._id}>
              {`${product.title} - ${product.author} (${product.year})`}
            </option>
          ))}
        </select>{" "}
        {editProduct && (
          <form className="admin-form" onSubmit={handleEditProductSubmit}>
            {renderProductForm(editProduct, handleEditInputChange)}
            <button className="admin-button" type="submit">
              Update Product
            </button>
            <button
              className="admin-button admin-button-remove"
              type="button"
              onClick={handleRemoveProduct}
            >
              Remove Product
            </button>
          </form>
        )}
      </div>{" "}
    </div>
  );
}
