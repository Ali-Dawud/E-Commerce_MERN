import express, { request, response } from "express";
import validateJWT from "../middlewares/validateJWT";
import { ExtendRequest } from "../types/extendedRequest";
import { getMyOrders } from "../service/ordersService";

const router = express.Router();

router.get("/", validateJWT, async (req: ExtendRequest, res) => {
  try {
    // TO DO: get userId the jwt
    const userId = req.user._id;
    const {data, statusCode} = await getMyOrders({ userId });
    res.status(statusCode).send(data);
  } catch {
    res.status(500).send("Someing went wrong!");
  }
});

export default router;