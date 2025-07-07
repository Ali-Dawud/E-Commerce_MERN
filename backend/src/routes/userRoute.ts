import express, { request, response } from "express";
import { login, register } from "../service/userService";

const router = express.Router();

router.post("/register", async (request, response) => {
  try {
    const { firstName, lastName, email, password } = request.body;
    const { data, statusCode } = await register({
      firstName,
      lastName,
      email,
      password,
    });
    response.status(statusCode).send(data);
  } catch {
    response.status(500).send("Someing went wrong!");
  }
});

router.post("/login", async (request, response) => {
  try {
    const { email, password } = request.body;
    const { data, statusCode } = await login({
      email,
      password,
    });
    response.status(statusCode).send(data);
  } catch {
    response.status(500).send("Someing went wrong!");
  }
});

export default router;
