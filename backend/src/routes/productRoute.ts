import express, { request, response } from "express";
import { getAllProducts } from "../service/productService";

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await getAllProducts();
    response.status(200).send(products);
  } catch {
    response.status(500).send("Someing went wrong!");
  }
});

export default router;
