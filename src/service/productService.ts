import productModel from "../models/productModel";

interface ProductParams {
  title: string;
  image: string;
  price: number;
  stock: number;
}

export const getAllProducts = async () => {
  return await productModel.find();
};

export const seedInitialProducts = async () => {
  const products = [
    { title: "Product 1", image: "image1.jpg", price: 10, stock: 100 },
  ];

  const existingProducts = await getAllProducts();
  if (existingProducts.length === 0) {
    await productModel.insertMany(products);
  }
};
