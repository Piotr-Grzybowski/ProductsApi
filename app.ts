import "reflect-metadata";
import express from "express";
import productsRouter from "./products/products.routes";
import { errorHandler } from "./common/middleware/error.middleware";
import { notFoundHandler } from "./common/middleware/notFound.middleware";
import helmet from "helmet";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import dotenv from "dotenv";

dotenv.config();

const app: express.Application = express();

app.use(helmet());
app.use(express.json());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
  if (typeof global.test === "function") {
    loggerOptions.level = "http";
  }
}

app.use(expressWinston.logger(loggerOptions));
app.use(`/products`, productsRouter);
app.use(errorHandler);
app.use(notFoundHandler);

export default app;
