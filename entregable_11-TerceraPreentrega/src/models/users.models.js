import { Schema, model } from "mongoose";
import { cartsModel } from "./carts.models.js"

const userSchema = new Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
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
    ref: "carts"
  }
});

userSchema.pre("save", async function(next){
  try {
    const newCart = await cartsModel.create({})
    console.log("🚀 ~ file: users.models.js:39 ~ userSchema.pre ~ newCart:", newCart)
    this.cart = newCart._id
  } catch (error) {
    console.log("🚀 ~ file: users.models.js:41 ~ userSchema.pre ~ error:", error)
    next(error)
  }
})

export const UsersModel = model('users', userSchema)