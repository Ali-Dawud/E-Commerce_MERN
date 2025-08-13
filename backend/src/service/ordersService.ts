import { cartModel, ICartItem } from "../models/cartModel";
import { IOrderItem, orderModel } from "../models/orderModel";
import productModel from "../models/productModel";

interface MyOrdersParams {
  userId: string;
}

export const getMyOrders = async ({ userId }: MyOrdersParams) => {
    try {
        const orders = orderModel.find({userId})
         return { data: await orders , statusCode: 200 };
    } catch (err) {
        throw err
    }
};
