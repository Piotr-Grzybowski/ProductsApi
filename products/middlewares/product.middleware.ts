import { Request, Response, NextFunction } from "express";
import productsService from "../services/products.service";

export async function checkIfProductExist(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const product = await productsService.readById(req.params.productId);
  if (product) next();
  else {
    res
      .status(404)
      .json({ error: `Product with id ${req.params.productId} not found` });
  }
}
