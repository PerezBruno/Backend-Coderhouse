import { Schema, model } from "mongoose";

const ticketSchema = new Schema({
    code: {
        type: String,
        required: true,
        unique: true,
      },
    purchase_datetime: { // inserta la fecha y la hora de la operacion
        type: Date,
        default: Date.now,
      },
    amount: { // toma el total de la compra
        type: Number,
        required: true,
      },
    purchaser: { //toma el email del usuario que realiza la compra
        type: Schema.Types.String,
        ref: "users"
      },
});

ticketSchema.pre("findOne", function () {
  this.populate("users.email");
});

export const ticketModel = model("ticket", ticketSchema);
