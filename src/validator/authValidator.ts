import { body } from "express-validator";

export const authValidator = () => {
  return [
    body("email").isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage("password cannot be empty"),
  ];
};
