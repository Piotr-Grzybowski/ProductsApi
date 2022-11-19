import { Request, Response } from "express";
import productsService from "../services/products.service";
import debug from "debug";

const log: debug.IDebugger = debug("app:products-controller");

class ProductsController {
  async listProducts(req: Request, res: Response) {
    try {
      const products = await productsService.list();
      res.status(200).send(products);
    } catch (err) {
      res.status(500).send({
        errors: "Sorry but something went wrong",
      });
    }
  }

  async getProductById(req: Request, res: Response) {
    try {
      const product = await productsService.readById(req.params.productId);
      res.status(200).send(product);
    } catch (err) {
      res.status(500).send({
        errors: "Sorry but something went wrong",
      });
    }
  }

  async createProduct(req: Request, res: Response) {
    try {
      const product = await productsService.create(req.body);
      res.status(201).send(product);
    } catch (err) {
      res.status(500).send({
        errors: "Sorry but something went wrong",
      });
    }
  }

  async updateProduct(req: Request, res: Response) {
    try {
      await productsService.updateById(req.params.productId, req.body);
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        errors: "Sorry but something went wrong",
      });
    }
  }

  async deleteProduct(req: Request, res: Response) {
    try {
      await productsService.deleteById(req.params.productId);
      res.status(204).send();
    } catch (err) {
      res.status(500).send({
        errors: "Sorry but something went wrong",
      });
    }
  }
}

export default new ProductsController();
