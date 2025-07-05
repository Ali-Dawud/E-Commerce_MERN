import express, { request, response } from "express";
import { getActiveCartForUser } from "../service/cartService";
import validateJWT from "../middlewares/validateJWT";

const router = express.Router();

router.get("/", validateJWT , async (request, response) => {
    // TO DO: get userId the jwt
    const userId = (request as any).user._id;
    const cart = await getActiveCartForUser({userId});
    response.status(200).send(cart);
});


export default router;
