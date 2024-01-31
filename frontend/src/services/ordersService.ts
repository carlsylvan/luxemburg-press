import axios from "axios";
import { IOrder } from "../interfaces/IOrder"; // Assuming you have an IOrder interface

export const URL = "http://localhost:3000"; // Consider moving this to an environment variable

export const getOrders = async () => {
  try {
    const response = await axios.get(URL + "/orders");
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    throw error;
  }
};

export const getOrderById = async (id: string | undefined) => {
  try {
    const response = await axios.get(URL + "/orders/" + id);
    return response.data;
  } catch (error) {
    console.error("Error fetching order by ID:", error);
    throw error;
  }
};

export const createOrder = async (newOrder: unknown) => {
  try {
    const response = await axios.post(URL + "/orders", newOrder, {
      headers: { "Content-Type": "application/json" },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating a new order:", error);
    throw error;
  }
};

export const deleteOrderById = async (id: string) => {
  try {
    const response = await axios.delete(URL + "/orders/" + id);
    return response.data;
  } catch (error) {
    console.error("Error deleting order by ID:", error);
    throw error;
  }
};

export const editOrderById = async (id: string, updatedOrder: IOrder) => {
  try {
    // Destructure to exclude _id and get the rest of the properties
    const { _id, ...orderDataWithoutId } = updatedOrder;
    console.log(_id);

    const response = await axios.put(
      URL + "/orders/" + id,
      orderDataWithoutId,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating order by ID:", error);
    throw error;
  }
};
