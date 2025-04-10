import mongoose, { Schema } from "mongoose";

const CartItemSchema = new Schema(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product" },
    name: String,
    price: Number,
    count: Number
  },
  { timestamps: true }
);

export const CartItem = mongoose.model("CartItem", CartItemSchema);


const orderSchema = new Schema(
  {
    products: [CartItemSchema],
    transaction_id: {},
    amount: { type: Number },
    address: String,
    status: {
      type: String,
      default: "Not processed",
      enum: ["Not processed", "Processing", "Shipped", "Delivered", "Cancelled"] // enum means string objects
    },
    updated: Date,
    user: { type: Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

 
const Order = mongoose.model("Order", orderSchema);

export default Order