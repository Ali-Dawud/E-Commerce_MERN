import mongoose, {Schema ,Document ,ObjectId} from "mongoose";
import { IProduct } from "./productModel";

enum CartStatusEnum {
    "active",
    "completed"
}

export interface ICartItem extends Document {
    product: IProduct,
    unitPrice: number,
    quantity: number,
}

export interface ICart extends Document {
    userId: ObjectId | string,
    items: ICartItem[],
    totalAmount: number,
    status: { type: string, enum: CartStatusEnum, defaults:"active"}
}

const cartItemSchema = new Schema<ICartItem>({
    product: {type: Schema.Types.ObjectId ,ref:"Product", required:true},
    quantity: {type: Number , required: true, default: 1},
    unitPrice: {type: Number, required:true}
})

const cartSchema = new Schema<ICart>({
    userId:{type: Schema.Types.ObjectId ,ref:"User", required:true},
    items: [cartItemSchema],
    totalAmount: {type: Number , required: true, default: 1},
    status: { type: String, enum: CartStatusEnum, defaults:"active"}

})

export const cartModel =mongoose.model<ICart>("Cart",cartSchema)