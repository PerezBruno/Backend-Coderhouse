import { Schema, model } from "mongoose";
import paginate from "mongoose-paginate-v2"

const fakeProductsSchema = new Schema({
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
  thumbnail: [],
  code: {
    type: String,
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

//implementando paginate en el Schema
fakeProductsSchema.plugin(paginate)

export const fakeProductsModel = model("fakeProducts", fakeProductsSchema);
