import axios from "axios";

import { INewProduct } from "../interfaces/INewProduct";
// import { IProduct } from "../interfaces/IProduct";

export const URL = "http://localhost:3000";

export const getProducts = async () => {
  try {
    const response = await axios.get(URL + "/products");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const getProductById = async (id: string | undefined) => {
  try {
    const response = await axios.get(URL + "/products/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching rune by ID:", error);
    throw error;
  }
};

export const createProduct = async (newProduct: INewProduct) => {
  try {
    const response = await axios.post(URL + "/products", newProduct, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating a new product:", error);
    throw error;
  }
};

export const deleteProductById = async (id: string) => {
  try {
    const response = await axios.delete(URL + "/products/" + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting product by ID:", error);
    throw error;
  }
};