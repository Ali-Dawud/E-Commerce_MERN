import express from "express";
import mongoose from "mongoose";
import userRoute from "./routes/userRoute";
import productRoute from "./routes/productRoute";
import { seedInitialProducts } from "./service/productService";
import productModel from "./models/productModel";

const app = express();
const port = 3001;
app.use(express.json())


mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {console.log("Mongo connected!");})
  .catch((err) => {console.log("Failed to connect!", err);});

  seedInitialProducts()

app.use('/user', userRoute)
app.use('/products', productRoute)

app.listen(port , ()=>{
    console.log(`Server is running at: http://localhost:${port}`)
})
