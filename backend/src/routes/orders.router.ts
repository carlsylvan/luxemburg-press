// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Order from "../models/order"; // Make sure you have an Order model similar to the Product model

// Global Config
export const ordersRouter = express.Router();

ordersRouter.use(express.json());

// GET

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
        const document = await collections.orders.findOne(query);

        if (document) {
            const order = document as unknown as Order;
            res.status(200).send(order);
        } else {
            res.status(404).send(`Unable to find matching document with id: ${id}`);
        }
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(500).send(errorMessage);
    }
});

// POST

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

// PUT

ordersRouter.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

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

// DELETE

ordersRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.orders?.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed order with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove order with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Order with id ${id} does not exist`);
        }
    } catch (error) {
        const errorMessage = (error instanceof Error) ? error.message : 'An unknown error occurred';
        console.error(errorMessage);
        res.status(400).send(errorMessage);
    }
});
