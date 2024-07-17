import { body } from "express-validator";

export const registerValidator = () => {
  return [
    body("name").notEmpty().withMessage("name cannot be empty"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
};

export const updateValidator = () => {
  return [
    body("email").optional().isEmail().withMessage("Invalid email format"),
    body("password")
      .optional()
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters long"),
  ];
};
