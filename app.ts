import express from "express";
import productsRouter from "./products/products.routes";

const app: express.Application = express();

app.use(`/products`, productsRouter);

export default app;
