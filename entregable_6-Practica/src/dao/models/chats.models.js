import { Schema, model } from "mongoose";

const chatsSchema = new Schema({
    user:{
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

export const chatsModel = model("chats", chatsSchema);