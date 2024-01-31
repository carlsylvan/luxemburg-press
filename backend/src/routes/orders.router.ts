import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Order from "../models/order"; // Replace with your actual Order model

export const ordersRouter = express.Router();

ordersRouter.use(express.json());

// GET - Retrieve all orders
ordersRouter.get("/", async (_req: Request, res: Response) => {
    try {
        if (!collections.orders) {
            res.status(500).send("Database not initialized correctly");
            return;
        }
        const orders = (await collections.orders.find({}).toArray()) as unknown as Order[];
        res.status(200).send(orders);
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(500).send(errorMessage);
    }
});

// GET - Retrieve a specific order by id
ordersRouter.get("/:id", async (req: Request, res: Response) => {
    const id = req.params.id;

    if (!id || !ObjectId.isValid(id)) {
        res.status(400).send("Invalid or missing ID");
        return;
    }

    try {
        if (!collections.orders) {
            res.status(500).send("Database not initialized correctly");
            return;
        }

        const query = { _id: new ObjectId(id) };
        const order = await collections.orders.findOne(query);

        order
            ? res.status(200).send(order)
            : res.status(404).send(`Unable to find matching order with id: ${id}`);
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(500).send(errorMessage);
    }
});

// POST - Create a new order
ordersRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newOrder = req.body as Order;
        const result = await collections.orders?.insertOne(newOrder);

        result
            ? res.status(201).send(`Successfully created a new order with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new order.");
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});

// PUT - Update an order
ordersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).send("Invalid order ID");
        return;
    }

    try {
        const updatedOrder: Order = req.body as Order;
        const query = { _id: new ObjectId(id) };
        const result = await collections.orders?.updateOne(query, { $set: updatedOrder });

        result
            ? res.status(200).send(`Successfully updated order with id ${id}`)
            : res.status(304).send(`Order with id: ${id} not updated`);
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});

// DELETE - Delete an order
ordersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    if (!ObjectId.isValid(id)) {
        res.status(400).send("Invalid order ID");
        return;
    }

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.orders?.deleteOne(query);

        result && result.deletedCount
            ? res.status(202).send(`Successfully deleted order with id ${id}`)
            : result && !result.deletedCount
            ? res.status(404).send(`Order with id ${id} does not exist`)
            : res.status(500).send(`Failed to delete order with id ${id}`);
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});

export default ordersRouter;
