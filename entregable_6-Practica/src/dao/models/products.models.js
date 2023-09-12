import { Schema, model } from "mongoose";

const productsSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  thumbnail: {
    default: [],
  },
  code: {
    type: Number,
    required: true,
    unique: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    default: true,
  },
  category: {
    type: String,
    required: true,
  },
});

export const productsModel = model("products", productsSchema);
