import express from "express";
import productsController from "./controllers/products.controller";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(productsController.listProducts)
  .post(productsController.createProduct);

productsRouter
  .route(`/:productId`)
  .get(productsController.getProductById)
  .put(productsController.updateProduct)
  .delete(productsController.deleteProduct);

export default productsRouter;
