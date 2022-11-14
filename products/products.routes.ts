import express from "express";

const productsRouter = express.Router();

productsRouter.route("/").get().post();

productsRouter.route(`/:productId`).get().put().delete();

export default productsRouter;
