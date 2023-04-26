import { Router, Request, Response } from "express";
const router = Router();
import {
  addProductController,
  readProductController,
  updateProductController,
  deleteProductController,
} from "../Controllers/Product_Controller";
import { authenticate } from "../Middlewares/Authentication";

router.get("/readAllProducts", readProductController);

router.post("/addProduct", authenticate, addProductController);

router.put("/updateproduct/:product_id", authenticate, updateProductController);

router.delete(
  "/deleteProduct/:product_id",
  authenticate,
  deleteProductController
);

export default router;
