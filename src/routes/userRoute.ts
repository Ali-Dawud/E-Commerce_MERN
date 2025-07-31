import express, { request, response } from "express";
import { login, register } from "../service/userService";

const router = express.Router();

router.post("/register", async (request, response) => {
  const { firstName, lastName, email, password } = request.body;
  const { data, statusCode } = await register({
    firstName,
    lastName,
    email,
    password,
  });
  response.status(statusCode).json(data);
});

router.post("/login", async (request, response) => {
  const { email, password } = request.body;
  const { data, statusCode } = await login({
    email,
    password,
  });
  response.status(statusCode).json(data);
});

export default router;
