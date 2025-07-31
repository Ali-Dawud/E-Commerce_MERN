import express from "express";
import { getActiveCartForUser } from "../service/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT, async (req: any, res) => {
  // TO DO: get userId the jwt
    const userId = req.user._id;
    const cart = await getActiveCartForUser({ userId });
    res.status(200).send(cart);
});



export default router;