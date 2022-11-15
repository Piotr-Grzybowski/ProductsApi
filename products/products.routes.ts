import express from "express";
import productsController from "./controllers/products.controller";
import { validateBody } from "../common/middleware/body.validator.middleware";
import { validateName } from "./validators/validateName";
import { validatePrice } from "./validators/validatePrice";
import { checkIfProductExist } from "./middlewares/product.middleware";

const productsRouter = express.Router();

productsRouter
  .route("/")
  .get(productsController.listProducts)
  .post(
    validateName,
    validatePrice,
    validateBody,
    productsController.createProduct
  );

productsRouter
  .route(`/:productId`)
  .all(checkIfProductExist)
  .get(productsController.getProductById)
  .put(
    validateName,
    validatePrice,
    validateBody,
    productsController.updateProduct
  )
  .delete(productsController.deleteProduct);

export default productsRouter;
