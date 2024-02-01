import { Schema, model } from "mongoose";
import { cartsModel } from "./carts.models.js";

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
    index: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: "User",
  },
  cart: {
    type: Schema.Types.ObjectId,
    ref: "carts",
  },
  last_connection: {
    type: Date,
    default: Date.now,
  },
});

userSchema.pre("save", async function (next) {
  try {
    const newCart = await cartsModel.create({});
    this.cart = newCart._id;
  } catch (error) {
    console.log(
      "🚀 ~ file: users.models.js:41 ~ userSchema.pre ~ error:",
      error
    );
    next(error);
  }
});

export const UsersModel = model("users", userSchema);
