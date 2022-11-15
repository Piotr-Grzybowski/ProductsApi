import { body } from "express-validator";

export const validatePrice = body("price")
  .isNumeric()
  .withMessage("Price has to be number")
  .notEmpty()
  .withMessage("Price can not be empty")
  .custom((price) => {
    if (price > 0) return true;
    return false;
  })
  .withMessage("Price has to be bigger than zero");
