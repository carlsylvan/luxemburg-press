import express from "express";
import cors from "cors";
import { connectToDatabase } from "./services/database.service";
import { productsRouter } from "./routes/products.router";
import { ordersRouter } from "./routes/orders.router";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

connectToDatabase()
  .then(() => {
    app.use("/products", productsRouter);
    app.use("/orders", ordersRouter);

    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit();
  });
