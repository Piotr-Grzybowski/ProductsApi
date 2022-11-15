import { body } from "express-validator";

export const validateName = body("name")
  .isString()
  .withMessage("Name has to be a string")
  .notEmpty()
  .withMessage("Name can not be empty")
  .isLength({ min: 1, max: 100 })
  .withMessage("Name length should be between 1 and 100")
  .trim()
  .escape();
